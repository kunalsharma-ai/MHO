#!/usr/bin/env python3
"""
Build the Healthcare Professional (HCP) app data from the raw MyHealthOpinions exports.

Input  : data-source/*.json  (exports shared by the MHO team)
Output : src/data/hcp.generated.json      -> profiles + questions + small option lists (bundled)
         public/data/states.json          -> { countryCode: [[stateCode, label], ...] }
         public/data/cities/<CC>.json     -> { stateCode: [cityLabel, ...] }
         public/data/income.json          -> { personal: {ruralValue: [[label, value]]}, household: {...} }
         public/data/ethnicity.json       -> { countryCode: [[label, value]] }
         public/data/joblevel.json        -> { specialization: [label, ...] }

Run:  python3 scripts/build_data.py
Re-run whenever the exports in data-source/ change. Overrides that fill gaps in the
exports live in scripts/overrides.json (documented in DATA.md).
"""
import json, os, re, collections, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "data-source")
OUT_SRC = os.path.join(ROOT, "src", "data")
OUT_PUB = os.path.join(ROOT, "public", "data")

def load(name):
    with open(os.path.join(SRC, name), encoding="utf-8") as f:
        return json.load(f)

def clean(s):
    return re.sub(r"\s+", " ", (s or "").replace(" ", " ")).strip()

profiles = load("myhealthopinions.HealthcareProfessional.Profile.json")
questions = {q["name"]: q for q in load("myhealthopinions.HealthcareProfessional.Question.json")}
options_raw = load("myhealthopinions.Option.json")
overrides = json.load(open(os.path.join(ROOT, "scripts", "overrides.json"), encoding="utf-8"))

opts = collections.defaultdict(list)
for o in options_raw:
    opts[o["question"]].append(o)

# ---------------------------------------------------------------- profiles
ORDER = ["basic", "professional-category", "professional", "educational", "experience",
         "professional-address", "technical", "survey-participation", "documents", "social-media"]
prof_by_slug = {p["slug"]: p for p in profiles}
out_profiles = []
for slug in ORDER:
    p = prof_by_slug[slug]
    page = p["pages"][0]
    out_profiles.append({"slug": slug, "name": clean(page[0]), "questions": page[1:]})
# authored "Additional Details" profile is appended last (bottom of the dashboard)
out_profiles.append({"slug": "additional-details", "name": "Additional Details",
                     "questions": [q["name"] for q in overrides["additionalQuestions"]]})

# ---------------------------------------------------------------- countries (86 panel countries)
countries = [(clean(o["label"]), o["value"]) for o in opts["country"]]
country_codes = {c for _, c in countries}

# ---------------------------------------------------------------- lazy geo files
states = collections.defaultdict(list)
state_country = {}
for o in opts["state"]:
    cc = o["parentValue"][0]
    if cc in country_codes:
        states[cc].append([o["value"], clean(o["label"])])
        state_country[o["value"]] = cc
for cc in states:
    states[cc].sort(key=lambda x: x[1].lower())

cities = collections.defaultdict(lambda: collections.defaultdict(list))
for o in opts["city"]:
    for sv in o["parentValue"]:
        cc = state_country.get(sv)
        if cc:
            cities[cc][sv].append(clean(o["label"]))

os.makedirs(os.path.join(OUT_PUB, "cities"), exist_ok=True)
for f in os.listdir(os.path.join(OUT_PUB, "cities")):
    os.remove(os.path.join(OUT_PUB, "cities", f))
for cc, m in cities.items():
    for sv in m:
        m[sv] = sorted(set(m[sv]), key=str.lower)
    with open(os.path.join(OUT_PUB, "cities", f"{cc}.json"), "w", encoding="utf-8") as f:
        json.dump(m, f, ensure_ascii=False, separators=(",", ":"))

def dump_pub(name, data):
    with open(os.path.join(OUT_PUB, name), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))

dump_pub("states.json", states)

def keyed(qname, key_filter=None):
    m = collections.defaultdict(list)
    for o in opts[qname]:
        for pv in o["parentValue"]:
            if key_filter is None or key_filter(pv):
                m[pv].append([clean(o["label"]), clean(o["value"]) if isinstance(o["value"], str) else o["value"]])
    return m

def income_sort(pair):
    return pair[1]  # values are "01-Subsistence" ... "07-Elite"

income = {"personal": keyed("personal-income"), "household": keyed("household-income")}
for k in income:
    for pv in income[k]:
        income[k][pv].sort(key=income_sort)
dump_pub("income.json", income)
dump_pub("ethnicity.json", keyed("ethnicity", lambda pv: pv in country_codes))

joblevel = collections.defaultdict(list)
for o in opts["doc-joblevel"]:
    for pv in o["parentValue"]:
        joblevel[clean(pv)].append(clean(o["label"]))
for spec, levels in overrides["extraJobLevels"].items():
    joblevel[spec].extend(levels)
for k in joblevel:
    seen = []
    [seen.append(x) for x in joblevel[k] if x not in seen]
    joblevel[k] = seen
dump_pub("joblevel.json", joblevel)

# ---------------------------------------------------------------- question types
LAZY = {
    "state": {"source": "states", "parent": "country"},
    "city": {"source": "cities", "parent": "state"},
    "practice-city": {"source": "cities", "parent": "state"},
    "ethnicity": {"source": "ethnicity", "parent": "country"},
    "personal-income": {"source": "income.personal", "parent": "rural"},
    "household-income": {"source": "income.household", "parent": "rural"},
    "doc-joblevel": {"source": "joblevel", "parent": "doc-specialization"},
}
TEXT_TYPES = overrides["textTypes"]          # name -> {type, ...validation}
MULTI = set(overrides["multiSelect"])
CONDITIONS = overrides["conditions"]          # name -> {"q": parent, "in": [values]}
OTHER_RE = re.compile(r"^(other|others)\b", re.I)

def is_other(label, value):
    return bool(OTHER_RE.match(clean(label)) or OTHER_RE.match(str(value)))

out_q = {}
for prof in out_profiles[:-1]:
    for name in prof["questions"]:
        if name in out_q:
            continue
        q = questions.get(name)
        if not q:
            print("WARN missing question", name, file=sys.stderr)
            continue
        item = {"label": clean(q["label"])}
        parent = (q.get("parent") or "").strip()
        if name in overrides.get("parentOverride", {}):
            parent = overrides["parentOverride"][name]
        if parent:
            item["parent"] = parent
        if name in LAZY:
            item.update({"type": "combo", **LAZY[name]})
            item["parent"] = LAZY[name]["parent"]
        elif name == "country":
            item["type"] = "country"
            item["options"] = [{"l": l, "v": v} for l, v in countries]
        elif name in TEXT_TYPES:
            item.update(TEXT_TYPES[name])
        elif opts.get(name):
            lst = []
            for o in opts[name]:
                v = clean(o["value"]) if isinstance(o["value"], str) else o["value"]
                e = {"l": clean(o["label"]), "v": v}
                pv = [clean(x) for x in o["parentValue"]]
                if pv:
                    e["p"] = pv
                if is_other(o["label"], v) or v in overrides["otherValues"]:
                    e["other"] = True
                lst.append(e)
            # supplementary options (e.g. surgeons / dental specialisations missing from export)
            for e in overrides["extraOptions"].get(name, []):
                lst.append(e)
            drop = set(overrides.get("removeOptions", {}).get(name, []))
            lst = [e for e in lst if e["v"] not in drop]
            # move options whose parent is wrong in the export
            for v, newp in overrides.get("reparent", {}).get(name, {}).items():
                for e in lst:
                    if e["v"] == v:
                        e["p"] = newp
            item["options"] = lst
            groups = collections.Counter(pv for e in lst for pv in e.get("p", ["*"]))
            biggest = max(groups.values()) if groups else 0
            item["type"] = "multi" if name in MULTI else ("select" if biggest > 12 else "single")
        else:
            item["type"] = "text"
        if name in CONDITIONS:
            item["when"] = CONDITIONS[name]
        if name in overrides.get("optional", []):
            item["optional"] = True
        if name in overrides.get("sensitive", []):
            item["sensitive"] = True
        out_q[name] = item

for aq in overrides["additionalQuestions"]:
    aq = dict(aq)
    name = aq.pop("name")
    if aq.get("options") == "@countries":
        aq["options"] = [{"l": l, "v": v} for l, v in countries]
    out_q[name] = aq

# drop parents that point at questions not used anywhere (treated as "always true")
used = {n for p in out_profiles for n in p["questions"]}
for name, q in out_q.items():
    if q.get("parent") and q["parent"] not in used:
        q["externalParent"] = q.pop("parent")

os.makedirs(OUT_SRC, exist_ok=True)
with open(os.path.join(OUT_SRC, "hcp.generated.json"), "w", encoding="utf-8") as f:
    json.dump({"profiles": out_profiles, "questions": out_q}, f, ensure_ascii=False, indent=1)

# strings that need translation (question labels + short option labels)
tr = {"questions": {n: q["label"] for n, q in out_q.items()}, "options": sorted({
    o["l"] for q in out_q.values() for o in q.get("options", [])
    if q.get("type") in ("single", "multi") or q.get("translateOptions")})}
with open(os.path.join(ROOT, "scripts", "strings-to-translate.json"), "w", encoding="utf-8") as f:
    json.dump(tr, f, ensure_ascii=False, indent=1)

print("profiles", len(out_profiles), "questions", len(out_q), "city files", len(cities),
      "translatable options", len(tr["options"]))
