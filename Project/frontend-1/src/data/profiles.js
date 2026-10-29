// Profile coverage curated from the regional consumer and business profile workbooks.
// Deliberately contains NO counts or percentages — the site communicates breadth, not numbers.

export const REGIONS = [
  {
    id: 'apac',
    name: 'Asia-Pacific',
    color: '#FF8A00',
    countries: ['India', 'China', 'Japan', 'South Korea', 'Australia', 'New Zealand', 'Singapore', 'Hong Kong', 'Taiwan', 'Malaysia', 'Indonesia', 'Philippines', 'Thailand', 'Vietnam', 'Cambodia'],
  },
  {
    id: 'europe',
    name: 'Europe',
    color: '#2F6BFF',
    countries: ['United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Ireland', 'Portugal', 'Poland', 'Czech Republic', 'Romania', 'Bulgaria', 'Denmark', 'Sweden', 'Norway', 'Ukraine', 'Russia'],
  },
  {
    id: 'americas',
    name: 'North America',
    color: '#14C9B5',
    countries: ['United States', 'Canada', 'Mexico', 'Costa Rica'],
  },
  {
    id: 'latam',
    name: 'South America',
    color: '#FFC233',
    countries: ['Brazil', 'Colombia', 'Argentina', 'Peru', 'Chile'],
  },
  {
    id: 'mena',
    name: 'Middle East & Africa',
    color: '#FF5E7E',
    countries: ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Israel', 'Egypt', 'Iran', 'Algeria', 'Nigeria', 'Kenya', 'South Africa'],
  },
];

export const CONSUMER_DEMOGRAPHICS = [
  { label: 'Life stage', items: ['Gen Z', 'Millennials', 'Gen X', 'Baby Boomers', 'Retirees'] },
  { label: 'Education', items: ['High school graduates', 'Vocational & diploma holders', 'College students', 'Bachelor’s degree holders', 'Master’s & MBA holders', 'Doctorate & professional degrees'] },
  { label: 'Occupation', items: ['Full-time employees', 'Part-time workers', 'Self-employed & freelancers', 'Students', 'Homemakers', 'Stay-at-home parents', 'Retired members', 'Seasonal workers', 'Military families'] },
  { label: 'Household', items: ['Single households', 'Married couples', 'Homeowners', 'Renters', 'Living with family', 'Student housing'] },
  { label: 'Income bands', items: ['Entry-level earners', 'Middle-income households', 'Upper-middle income', 'Affluent households', 'High-net-worth individuals'] },
];

export const CONSUMER_INTERESTS = [
  { id: 'family', label: 'Parenting & Family', icon: 'heart', items: ['Expecting parents', 'New parents', 'Parents of toddlers', 'Parents of teens', 'Single parents', 'Primary grocery shoppers', 'Household budget managers'] },
  { id: 'shopping', label: 'Shopping Behaviour', icon: 'gift', items: ['Online shoppers', 'In-store shoppers', 'Omnichannel shoppers', 'Fashion & apparel buyers', 'Electronics shoppers', 'Luxury goods consumers', 'Home & lifestyle buyers'] },
  { id: 'tech', label: 'Technology', icon: 'mobile', items: ['Smartphone users', 'iPhone users', 'Android users', 'Smart-home owners', 'Wearable users', 'AI tool users', 'Smart TV owners'] },
  { id: 'auto', label: 'Automotive', icon: 'activity', items: ['Car owners', 'EV owners', 'Hybrid owners', 'Motorcycle owners', 'Luxury vehicle owners', 'Ride-share drivers', 'Car insurance holders'] },
  { id: 'finance', label: 'Banking & Finance', icon: 'coins', items: ['Credit card holders', 'Digital wallet users', 'Online banking users', 'Mutual fund investors', 'Stock traders', 'Crypto users', 'Home loan holders'] },
  { id: 'travel', label: 'Travel', icon: 'globe', items: ['International travellers', 'Business travellers', 'Family vacationers', 'Solo travellers', 'Hotel loyalty members', 'Airline loyalty members', 'Adventure travellers'] },
  { id: 'media', label: 'Media & Gaming', icon: 'sparkle', items: ['Streaming subscribers', 'Podcast listeners', 'Moviegoers', 'Mobile gamers', 'Console & PC gamers', 'Esports fans', 'Content creators'] },
  { id: 'beauty', label: 'Beauty & Personal Care', icon: 'star', items: ['Skincare consumers', 'Haircare consumers', 'Makeup buyers', 'Fragrance buyers', 'Men’s grooming', 'Natural & organic beauty', 'Salon & spa clients'] },
  { id: 'food', label: 'Food & Beverages', icon: 'coins', items: ['Snack & confectionery fans', 'Packaged food buyers', 'Health & wellness foods', 'Plant-based eaters', 'Food delivery users', 'Home cooks', 'Beverage consumers'] },
  { id: 'pets', label: 'Pets', icon: 'heart', items: ['Dog owners', 'Cat owners', 'Multi-pet households', 'First-time pet owners', 'Pet food buyers', 'Pet insurance holders', 'Aquarium owners'] },
  { id: 'sports', label: 'Sports & Fitness', icon: 'trend', items: ['Gym members', 'Runners', 'Cyclists', 'Yoga & Pilates', 'Cricket fans', 'Football fans', 'Fantasy sports players'] },
  { id: 'health', label: 'Health & Wellness', icon: 'shield', items: ['Preventive health consumers', 'Caregivers', 'Telehealth users', 'Health insurance holders', 'Senior health consumers', 'Wellness programme members', 'Fitness tracker users'] },
];

export const INDUSTRIES = [
  { group: 'Technology & Digital', items: ['IT & Software', 'Semiconductors', 'Telecommunications', 'Internet Services', 'Digital Marketing', 'Industrial Robotics', 'AgTech'] },
  { group: 'Manufacturing & Energy', items: ['Automotive', 'Aerospace', 'Chemicals', 'Pharmaceuticals', 'Electronics', 'Steel', 'Textiles', 'Petroleum, Oil & Gas', 'Electric Power', 'Mining', 'Shipbuilding', 'Pulp & Paper'] },
  { group: 'Services', items: ['Financial Services', 'Insurance', 'Healthcare Services', 'Education', 'Hospitality', 'Real Estate', 'Retail', 'Transport & Logistics', 'Professional Services', 'Legal Services'] },
  { group: 'Media & Creative', items: ['Advertising', 'Broadcasting', 'Publishing', 'News Media', 'Film', 'Music', 'Video Games', 'Fashion', 'Sport'] },
  { group: 'Agriculture & Food', items: ['Agriculture', 'Horticulture', 'Fishing', 'Food Processing', 'Livestock', 'Seeds & Crop Protection', 'Farm Machinery'] },
  { group: 'Public Sector & Defence', items: ['Government', 'Public Administration', 'Public Utilities', 'Defence Contractors', 'Armed Forces', 'Public Sector Undertakings'] },
];

export const DEPARTMENTS = [
  'Strategic & Top Management', 'Mid-Level Management', 'Finance & Accounts', 'Banking, Investments & Trading', 'Sales & Business Development',
  'Marketing & Proposals', 'Advertising', 'Project & Programme Management', 'Procurement', 'Supply Chain & Cold Chain', 'Information Technology',
  'Human Resources', 'Administration & Facilities', 'Quality & Inspection', 'Production', 'UX, Design & Architecture', 'Maintenance & Utilities',
  'Research & Development', 'Packaging', 'Dispatch & Logistics', 'Store & Warehousing', 'Security', 'Customer Success & Operations',
  'Teaching & Training', 'Consulting', 'Construction & Site Engineering', 'Medical & Health Services', 'Content, Editorial & Journalism', 'Legal & Compliance',
];

export const JOB_TITLES = [
  { tier: 'C-Suite & Leadership', color: '#FF8A00', items: ['CEO', 'Managing Director', 'President', 'COO', 'CFO', 'CMO', 'CIO', 'CTO', 'CHRO', 'Chief Procurement Officer', 'Chief Supply Chain Officer', 'Vice President', 'Country Head', 'Regional Director', 'Plant Director'] },
  { tier: 'Management', color: '#2F6BFF', items: ['General Manager', 'Operations Manager', 'Finance Manager', 'Marketing Manager', 'Brand Manager', 'HR Manager', 'IT Manager', 'Product Manager', 'Project Manager', 'Procurement Manager', 'Plant Manager', 'Research Manager', 'Insights Manager'] },
  { tier: 'Specialists & Engineers', color: '#14C9B5', items: ['Software Developer', 'Cloud Architect', 'Data Scientist', 'Cybersecurity Manager', 'DevOps Engineer', 'Mechanical Engineer', 'Electrical Engineer', 'Automation Engineer', 'Quality Engineer', 'HSE Officer', 'GIS Specialist', 'SEO Manager'] },
  { tier: 'Professionals', color: '#8B5CF6', items: ['Chartered Accountant', 'Legal Counsel', 'Compliance Officer', 'Medical Director', 'Hospital Administrator', 'Pharmacy Manager', 'Teacher & Trainer', 'Architect', 'Consultant', 'Wealth Manager', 'Underwriter', 'Journalist'] },
  { tier: 'Owners & Entrepreneurs', color: '#FF5E7E', items: ['Business Owner', 'Founder', 'Co-Founder', 'Franchise Owner', 'Agency Owner', 'Practice Owner', 'Independent Consultant', 'Farm Owner', 'AgTech Founder'] },
  { tier: 'Public Service & Defence', color: '#FFC233', items: ['Civil Servant', 'Policy Planner', 'Revenue & Taxation Officer', 'Public Procurement Officer', 'Army Officer', 'Navy Officer', 'Air Force Officer', 'Homeland Security'] },
];

export const COMPANY_SIZES = ['Solo founders & micro-businesses', 'Small businesses', 'Mid-sized companies', 'Large enterprises', 'Global corporations'];
