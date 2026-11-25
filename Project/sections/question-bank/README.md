# MHO question bank

The profile question bank for all three panels, as exported from the database:

| File | What it holds |
|---|---|
| `Profile.json` | The profiles: which questions sit on which profile page (`pages: [[title, ...question names]]`), with each profile's `category` |
| `Question.json` | Every question: `name`, `label`, `type`, and `category` (the panels that ask it) |
| `Option.json` | Every answer option: `question`, `label`, `value`, and `parentValue` (the answers of the parent question that show it) |

A panel's profiles and questions are the ones whose `category` names it: `healthcare professional`, `care giver` or `patient`. Questions also tagged `minor patient` are the ones that may be asked of a teen member.

Records are read in the order they were created (ObjectId order), which is the order the options were written in. The exports may be sorted another way, for example by label.

## Who reads it

- `load.mjs`: the shared loader (`bank(category)`)
- `caregiver/scripts/build-data.mjs` and `patient/scripts/build-data.mjs` (`npm run data`)
- `hcp/scripts/build_data.py` (`npm run build:data`), which writes `hcp/src/data/hcp.generated.json`
- `tools/export-completion-rules.mjs`, which writes `backend/app/lib/sectionRules.json` so that profile completion counts the questions each questionnaire really asks

## After changing the bank

Replace the three files with a new export, then run:

```
cd sections/hcp && npm run build:data
cd ../caregiver && npm run data
cd ../patient && npm run data
cd .. && node tools/export-completion-rules.mjs
```

Each panel's own edits on top of the bank (duplicates no longer asked, follow-up rules, optional questions) live in `caregiver/src/lib/questions-2026.js`, `patient/src/lib/questions-2026.js` and `hcp/scripts/overrides.json` and `hcp/src/lib/overrides.json`.

The city lists are not part of this bank.
