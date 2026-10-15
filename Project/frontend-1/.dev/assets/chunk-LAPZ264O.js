import {
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/data/workforce.js
init_define_import_meta_env();
var FLOORS = [
  {
    id: "management",
    floor: 10,
    label: "Leadership & management",
    icon: "briefcase",
    color: "#7c3aed",
    titles: 32,
    core: ["Top Level Management", "Personnel Department", "Purchasing Department"],
    roles: ["Hospital CEO", "Chief Medical Officer", "Chief Nursing Officer", "Director of Clinical Operations", "Director of Quality & Compliance", "District Health Officer", "VP \u2013 Patient Services"]
  },
  {
    id: "doctors",
    floor: 9,
    label: "Doctors & physicians",
    icon: "stethoscope",
    color: "#2457f5",
    titles: 281,
    extra: "33 specialties",
    core: ["Medical Specialist", "Clinical Specialist"],
    roles: ["General Practitioners", "Cardiologists", "Oncologists", "Neurologists", "Endocrinologists", "Paediatricians", "Psychiatrists", "Dermatologists", "Radiologists", "Anaesthesiologists", "Emergency physicians", "Pathologists"]
  },
  {
    id: "surgeons",
    floor: 8,
    label: "Surgeons & operation theatre",
    icon: "scalpel",
    color: "#0ea5e9",
    titles: 33,
    core: ["Operation Theatre Complex", "Central Sterile Supply Department"],
    roles: ["General surgeons", "Cardiothoracic surgeons", "Neurosurgeons", "Orthopaedic surgeons", "Robotic & laparoscopic surgeons", "Transplant surgeons", "Surgical residents"]
  },
  {
    id: "nursing",
    floor: 7,
    label: "Nursing & midwifery",
    icon: "nurse",
    color: "#ec4899",
    titles: 443,
    extra: "34 specialties",
    core: ["Nursing Specialist", "Nurse Practitioner", "Licensed Practical Nurse", "Nursing Assistant"],
    roles: ["ICU & critical care nurses", "Oncology nurses", "Midwives", "Dialysis nurses", "Diabetes nurse specialists", "Theatre & scrub nurses", "Community nurses"]
  },
  {
    id: "pharmacy",
    floor: 6,
    label: "Pharmacy",
    icon: "pill",
    color: "#10b981",
    titles: 278,
    extra: "8 key areas",
    core: ["Pharmacy Department"],
    roles: ["Clinical pharmacists", "Hospital pharmacists", "Community pharmacists", "Oncology pharmacists", "Regulatory & pharmacovigilance", "Medical science liaisons", "Pharmacy technicians"]
  },
  {
    id: "lab",
    floor: 5,
    label: "Laboratory & diagnostics",
    icon: "microscope",
    color: "#f59e0b",
    titles: 123,
    core: ["Radiology Department", "Blood Circulation", "Technical Specialist"],
    roles: ["Medical lab scientists", "Radiographers & MRI technologists", "Sonographers", "Phlebotomists", "Blood bank technologists", "Genomics & NGS technologists", "Lab directors"]
  },
  {
    id: "allied",
    floor: 4,
    label: "Allied health & rehabilitation",
    icon: "pulse",
    color: "#ef4444",
    titles: 61,
    core: ["Therapist", "Physical Medicine & Rehabilitation", "Paramedical Specialist", "Dietary Specialist"],
    roles: ["Physiotherapists", "Occupational therapists", "Speech & language therapists", "Dietitians", "Respiratory therapists", "Paramedics", "Psychologists & counsellors"]
  },
  {
    id: "dental",
    floor: 3,
    label: "Dental care",
    icon: "tooth",
    color: "#06b6d4",
    titles: 12,
    core: [],
    roles: ["General dentists", "Orthodontists", "Periodontists", "Endodontists", "Oral & maxillofacial surgeons", "Paediatric dentists", "Implantologists"]
  },
  {
    id: "itadmin",
    floor: 2,
    label: "Health IT, admin & records",
    icon: "monitor",
    color: "#6366f1",
    titles: 77,
    core: ["Medical Record Department", "Non-Medical Specialist"],
    roles: ["EHR / EMR specialists", "Clinical coders", "Health data analysts", "Hospital administrators", "Practice managers", "Revenue cycle managers", "Health IT directors"]
  },
  {
    id: "support",
    floor: 1,
    label: "Support, facilities & ambulance",
    icon: "ambulance",
    color: "#64748b",
    titles: 66,
    core: ["Maintenance Department", "Security Department", "Non Professional Services", "Support Specialist"],
    roles: ["Front office & reception", "Patient services", "Medical billing", "Hospital stores & logistics", "Housekeeping supervisors", "Ambulance & EMS teams", "Dispatchers"]
  }
];
var CAREGIVER_HOUSE = {
  id: "caregivers",
  label: "Caregivers at home",
  icon: "hands",
  color: "#ff7a1a",
  roles: ["Family caregivers", "Adult children caring for parents", "Spouses & partners", "Parents of children with health needs", "Dementia caregivers", "Cancer caregivers", "Disability support carers", "Long-distance caregivers", "Home care aides", "Live-in carers", "Hospice & respite volunteers", "Foster & kinship carers", "Young adult carers", "Mental health caregivers"]
};
var TOTAL_TITLES = FLOORS.reduce((n, f) => n + f.titles, 0);

export {
  FLOORS,
  CAREGIVER_HOUSE
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2RhdGEvd29ya2ZvcmNlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBUaGUgaGVhbHRoY2FyZSB3b3JrZm9yY2Ugd2UgcmVjcnVpdCwgZmxvb3IgYnkgZmxvb3IgKGhvbWUgcGFnZSBcImhvc3BpdGFsIGxpZnRcIiBzZWN0aW9uKS5cbi8vIENvdW50cyBhcmUgdGhlIGRpc3RpbmN0IGpvYiB0aXRsZXMgaW4gdGhlIHByb2Zlc3Npb25hbCBwcm9maWxpbmcgcXVlc3Rpb25uYWlyZSAoc3JjL2RhdGEvaGNwUHJvZmlsZS5qcylcbi8vIFx1MjAxNCByZS1ydW4gdGhlIGNvdW50IGlmIHRoYXQgZmlsZSBjaGFuZ2VzLiBgY29yZWAgbGlzdHMgdGhlIG9yaWdpbmFsIDI1IHByb2Zlc3Npb25hbCBjYXRlZ29yaWVzIGZyb20gdGhlXG4vLyBvbGQgd2Vic2l0ZSBzbyBldmVyeSBvbmUgb2YgdGhlbSBzdGlsbCBhcHBlYXJzLiBDYXJlZ2l2ZXJzIGhhdmUgdGhlaXIgb3duIFwiaG91c2VcIiBuZXh0IHRvIHRoZSBob3NwaXRhbC5cbmV4cG9ydCBjb25zdCBGTE9PUlMgPSBbXG4gIHsgaWQ6ICdtYW5hZ2VtZW50JywgZmxvb3I6IDEwLCBsYWJlbDogJ0xlYWRlcnNoaXAgJiBtYW5hZ2VtZW50JywgaWNvbjogJ2JyaWVmY2FzZScsIGNvbG9yOiAnIzdjM2FlZCcsIHRpdGxlczogMzIsXG4gICAgY29yZTogWydUb3AgTGV2ZWwgTWFuYWdlbWVudCcsICdQZXJzb25uZWwgRGVwYXJ0bWVudCcsICdQdXJjaGFzaW5nIERlcGFydG1lbnQnXSxcbiAgICByb2xlczogWydIb3NwaXRhbCBDRU8nLCAnQ2hpZWYgTWVkaWNhbCBPZmZpY2VyJywgJ0NoaWVmIE51cnNpbmcgT2ZmaWNlcicsICdEaXJlY3RvciBvZiBDbGluaWNhbCBPcGVyYXRpb25zJywgJ0RpcmVjdG9yIG9mIFF1YWxpdHkgJiBDb21wbGlhbmNlJywgJ0Rpc3RyaWN0IEhlYWx0aCBPZmZpY2VyJywgJ1ZQIFx1MjAxMyBQYXRpZW50IFNlcnZpY2VzJ10gfSxcbiAgeyBpZDogJ2RvY3RvcnMnLCBmbG9vcjogOSwgbGFiZWw6ICdEb2N0b3JzICYgcGh5c2ljaWFucycsIGljb246ICdzdGV0aG9zY29wZScsIGNvbG9yOiAnIzI0NTdmNScsIHRpdGxlczogMjgxLCBleHRyYTogJzMzIHNwZWNpYWx0aWVzJyxcbiAgICBjb3JlOiBbJ01lZGljYWwgU3BlY2lhbGlzdCcsICdDbGluaWNhbCBTcGVjaWFsaXN0J10sXG4gICAgcm9sZXM6IFsnR2VuZXJhbCBQcmFjdGl0aW9uZXJzJywgJ0NhcmRpb2xvZ2lzdHMnLCAnT25jb2xvZ2lzdHMnLCAnTmV1cm9sb2dpc3RzJywgJ0VuZG9jcmlub2xvZ2lzdHMnLCAnUGFlZGlhdHJpY2lhbnMnLCAnUHN5Y2hpYXRyaXN0cycsICdEZXJtYXRvbG9naXN0cycsICdSYWRpb2xvZ2lzdHMnLCAnQW5hZXN0aGVzaW9sb2dpc3RzJywgJ0VtZXJnZW5jeSBwaHlzaWNpYW5zJywgJ1BhdGhvbG9naXN0cyddIH0sXG4gIHsgaWQ6ICdzdXJnZW9ucycsIGZsb29yOiA4LCBsYWJlbDogJ1N1cmdlb25zICYgb3BlcmF0aW9uIHRoZWF0cmUnLCBpY29uOiAnc2NhbHBlbCcsIGNvbG9yOiAnIzBlYTVlOScsIHRpdGxlczogMzMsXG4gICAgY29yZTogWydPcGVyYXRpb24gVGhlYXRyZSBDb21wbGV4JywgJ0NlbnRyYWwgU3RlcmlsZSBTdXBwbHkgRGVwYXJ0bWVudCddLFxuICAgIHJvbGVzOiBbJ0dlbmVyYWwgc3VyZ2VvbnMnLCAnQ2FyZGlvdGhvcmFjaWMgc3VyZ2VvbnMnLCAnTmV1cm9zdXJnZW9ucycsICdPcnRob3BhZWRpYyBzdXJnZW9ucycsICdSb2JvdGljICYgbGFwYXJvc2NvcGljIHN1cmdlb25zJywgJ1RyYW5zcGxhbnQgc3VyZ2VvbnMnLCAnU3VyZ2ljYWwgcmVzaWRlbnRzJ10gfSxcbiAgeyBpZDogJ251cnNpbmcnLCBmbG9vcjogNywgbGFiZWw6ICdOdXJzaW5nICYgbWlkd2lmZXJ5JywgaWNvbjogJ251cnNlJywgY29sb3I6ICcjZWM0ODk5JywgdGl0bGVzOiA0NDMsIGV4dHJhOiAnMzQgc3BlY2lhbHRpZXMnLFxuICAgIGNvcmU6IFsnTnVyc2luZyBTcGVjaWFsaXN0JywgJ051cnNlIFByYWN0aXRpb25lcicsICdMaWNlbnNlZCBQcmFjdGljYWwgTnVyc2UnLCAnTnVyc2luZyBBc3Npc3RhbnQnXSxcbiAgICByb2xlczogWydJQ1UgJiBjcml0aWNhbCBjYXJlIG51cnNlcycsICdPbmNvbG9neSBudXJzZXMnLCAnTWlkd2l2ZXMnLCAnRGlhbHlzaXMgbnVyc2VzJywgJ0RpYWJldGVzIG51cnNlIHNwZWNpYWxpc3RzJywgJ1RoZWF0cmUgJiBzY3J1YiBudXJzZXMnLCAnQ29tbXVuaXR5IG51cnNlcyddIH0sXG4gIHsgaWQ6ICdwaGFybWFjeScsIGZsb29yOiA2LCBsYWJlbDogJ1BoYXJtYWN5JywgaWNvbjogJ3BpbGwnLCBjb2xvcjogJyMxMGI5ODEnLCB0aXRsZXM6IDI3OCwgZXh0cmE6ICc4IGtleSBhcmVhcycsXG4gICAgY29yZTogWydQaGFybWFjeSBEZXBhcnRtZW50J10sXG4gICAgcm9sZXM6IFsnQ2xpbmljYWwgcGhhcm1hY2lzdHMnLCAnSG9zcGl0YWwgcGhhcm1hY2lzdHMnLCAnQ29tbXVuaXR5IHBoYXJtYWNpc3RzJywgJ09uY29sb2d5IHBoYXJtYWNpc3RzJywgJ1JlZ3VsYXRvcnkgJiBwaGFybWFjb3ZpZ2lsYW5jZScsICdNZWRpY2FsIHNjaWVuY2UgbGlhaXNvbnMnLCAnUGhhcm1hY3kgdGVjaG5pY2lhbnMnXSB9LFxuICB7IGlkOiAnbGFiJywgZmxvb3I6IDUsIGxhYmVsOiAnTGFib3JhdG9yeSAmIGRpYWdub3N0aWNzJywgaWNvbjogJ21pY3Jvc2NvcGUnLCBjb2xvcjogJyNmNTllMGInLCB0aXRsZXM6IDEyMyxcbiAgICBjb3JlOiBbJ1JhZGlvbG9neSBEZXBhcnRtZW50JywgJ0Jsb29kIENpcmN1bGF0aW9uJywgJ1RlY2huaWNhbCBTcGVjaWFsaXN0J10sXG4gICAgcm9sZXM6IFsnTWVkaWNhbCBsYWIgc2NpZW50aXN0cycsICdSYWRpb2dyYXBoZXJzICYgTVJJIHRlY2hub2xvZ2lzdHMnLCAnU29ub2dyYXBoZXJzJywgJ1BobGVib3RvbWlzdHMnLCAnQmxvb2QgYmFuayB0ZWNobm9sb2dpc3RzJywgJ0dlbm9taWNzICYgTkdTIHRlY2hub2xvZ2lzdHMnLCAnTGFiIGRpcmVjdG9ycyddIH0sXG4gIHsgaWQ6ICdhbGxpZWQnLCBmbG9vcjogNCwgbGFiZWw6ICdBbGxpZWQgaGVhbHRoICYgcmVoYWJpbGl0YXRpb24nLCBpY29uOiAncHVsc2UnLCBjb2xvcjogJyNlZjQ0NDQnLCB0aXRsZXM6IDYxLFxuICAgIGNvcmU6IFsnVGhlcmFwaXN0JywgJ1BoeXNpY2FsIE1lZGljaW5lICYgUmVoYWJpbGl0YXRpb24nLCAnUGFyYW1lZGljYWwgU3BlY2lhbGlzdCcsICdEaWV0YXJ5IFNwZWNpYWxpc3QnXSxcbiAgICByb2xlczogWydQaHlzaW90aGVyYXBpc3RzJywgJ09jY3VwYXRpb25hbCB0aGVyYXBpc3RzJywgJ1NwZWVjaCAmIGxhbmd1YWdlIHRoZXJhcGlzdHMnLCAnRGlldGl0aWFucycsICdSZXNwaXJhdG9yeSB0aGVyYXBpc3RzJywgJ1BhcmFtZWRpY3MnLCAnUHN5Y2hvbG9naXN0cyAmIGNvdW5zZWxsb3JzJ10gfSxcbiAgeyBpZDogJ2RlbnRhbCcsIGZsb29yOiAzLCBsYWJlbDogJ0RlbnRhbCBjYXJlJywgaWNvbjogJ3Rvb3RoJywgY29sb3I6ICcjMDZiNmQ0JywgdGl0bGVzOiAxMixcbiAgICBjb3JlOiBbXSxcbiAgICByb2xlczogWydHZW5lcmFsIGRlbnRpc3RzJywgJ09ydGhvZG9udGlzdHMnLCAnUGVyaW9kb250aXN0cycsICdFbmRvZG9udGlzdHMnLCAnT3JhbCAmIG1heGlsbG9mYWNpYWwgc3VyZ2VvbnMnLCAnUGFlZGlhdHJpYyBkZW50aXN0cycsICdJbXBsYW50b2xvZ2lzdHMnXSB9LFxuICB7IGlkOiAnaXRhZG1pbicsIGZsb29yOiAyLCBsYWJlbDogJ0hlYWx0aCBJVCwgYWRtaW4gJiByZWNvcmRzJywgaWNvbjogJ21vbml0b3InLCBjb2xvcjogJyM2MzY2ZjEnLCB0aXRsZXM6IDc3LFxuICAgIGNvcmU6IFsnTWVkaWNhbCBSZWNvcmQgRGVwYXJ0bWVudCcsICdOb24tTWVkaWNhbCBTcGVjaWFsaXN0J10sXG4gICAgcm9sZXM6IFsnRUhSIC8gRU1SIHNwZWNpYWxpc3RzJywgJ0NsaW5pY2FsIGNvZGVycycsICdIZWFsdGggZGF0YSBhbmFseXN0cycsICdIb3NwaXRhbCBhZG1pbmlzdHJhdG9ycycsICdQcmFjdGljZSBtYW5hZ2VycycsICdSZXZlbnVlIGN5Y2xlIG1hbmFnZXJzJywgJ0hlYWx0aCBJVCBkaXJlY3RvcnMnXSB9LFxuICB7IGlkOiAnc3VwcG9ydCcsIGZsb29yOiAxLCBsYWJlbDogJ1N1cHBvcnQsIGZhY2lsaXRpZXMgJiBhbWJ1bGFuY2UnLCBpY29uOiAnYW1idWxhbmNlJywgY29sb3I6ICcjNjQ3NDhiJywgdGl0bGVzOiA2NixcbiAgICBjb3JlOiBbJ01haW50ZW5hbmNlIERlcGFydG1lbnQnLCAnU2VjdXJpdHkgRGVwYXJ0bWVudCcsICdOb24gUHJvZmVzc2lvbmFsIFNlcnZpY2VzJywgJ1N1cHBvcnQgU3BlY2lhbGlzdCddLFxuICAgIHJvbGVzOiBbJ0Zyb250IG9mZmljZSAmIHJlY2VwdGlvbicsICdQYXRpZW50IHNlcnZpY2VzJywgJ01lZGljYWwgYmlsbGluZycsICdIb3NwaXRhbCBzdG9yZXMgJiBsb2dpc3RpY3MnLCAnSG91c2VrZWVwaW5nIHN1cGVydmlzb3JzJywgJ0FtYnVsYW5jZSAmIEVNUyB0ZWFtcycsICdEaXNwYXRjaGVycyddIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgQ0FSRUdJVkVSX0hPVVNFID0ge1xuICBpZDogJ2NhcmVnaXZlcnMnLCBsYWJlbDogJ0NhcmVnaXZlcnMgYXQgaG9tZScsIGljb246ICdoYW5kcycsIGNvbG9yOiAnI2ZmN2ExYScsXG4gIHJvbGVzOiBbJ0ZhbWlseSBjYXJlZ2l2ZXJzJywgJ0FkdWx0IGNoaWxkcmVuIGNhcmluZyBmb3IgcGFyZW50cycsICdTcG91c2VzICYgcGFydG5lcnMnLCAnUGFyZW50cyBvZiBjaGlsZHJlbiB3aXRoIGhlYWx0aCBuZWVkcycsICdEZW1lbnRpYSBjYXJlZ2l2ZXJzJywgJ0NhbmNlciBjYXJlZ2l2ZXJzJywgJ0Rpc2FiaWxpdHkgc3VwcG9ydCBjYXJlcnMnLCAnTG9uZy1kaXN0YW5jZSBjYXJlZ2l2ZXJzJywgJ0hvbWUgY2FyZSBhaWRlcycsICdMaXZlLWluIGNhcmVycycsICdIb3NwaWNlICYgcmVzcGl0ZSB2b2x1bnRlZXJzJywgJ0Zvc3RlciAmIGtpbnNoaXAgY2FyZXJzJywgJ1lvdW5nIGFkdWx0IGNhcmVycycsICdNZW50YWwgaGVhbHRoIGNhcmVnaXZlcnMnXSxcbn07XG5cbmV4cG9ydCBjb25zdCBUT1RBTF9USVRMRVMgPSBGTE9PUlMucmVkdWNlKChuLCBmKSA9PiBuICsgZi50aXRsZXMsIDApO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7QUFBQTtBQUlPLElBQU0sU0FBUztBQUFBLEVBQ3BCO0FBQUEsSUFBRSxJQUFJO0FBQUEsSUFBYyxPQUFPO0FBQUEsSUFBSSxPQUFPO0FBQUEsSUFBMkIsTUFBTTtBQUFBLElBQWEsT0FBTztBQUFBLElBQVcsUUFBUTtBQUFBLElBQzVHLE1BQU0sQ0FBQyx3QkFBd0Isd0JBQXdCLHVCQUF1QjtBQUFBLElBQzlFLE9BQU8sQ0FBQyxnQkFBZ0IseUJBQXlCLHlCQUF5QixtQ0FBbUMsb0NBQW9DLDJCQUEyQiw0QkFBdUI7QUFBQSxFQUFFO0FBQUEsRUFDdk07QUFBQSxJQUFFLElBQUk7QUFBQSxJQUFXLE9BQU87QUFBQSxJQUFHLE9BQU87QUFBQSxJQUF3QixNQUFNO0FBQUEsSUFBZSxPQUFPO0FBQUEsSUFBVyxRQUFRO0FBQUEsSUFBSyxPQUFPO0FBQUEsSUFDbkgsTUFBTSxDQUFDLHNCQUFzQixxQkFBcUI7QUFBQSxJQUNsRCxPQUFPLENBQUMseUJBQXlCLGlCQUFp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
