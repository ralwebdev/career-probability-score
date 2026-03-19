// Country → State/Province → Major Cities mapping

export const geoData: Record<string, Record<string, string[]>> = {
  "India": {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kakinada", "Rajahmundry", "Kurnool"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Junagadh"],
    "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar", "Rohtak"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Manali", "Kullu", "Solan", "Mandi"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belgaum", "Dharwad"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Kannur"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Navi Mumbai", "Kolhapur"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur"],
    "Meghalaya": ["Shillong", "Tura", "Jowai"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"],
    "Sikkim": ["Gangtok", "Namchi", "Pelling"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
    "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur", "Agra", "Varanasi", "Prayagraj", "Ghaziabad", "Meerut"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital", "Haldwani", "Roorkee"],
    "West Bengal": [
      "Kolkata", "Howrah", "Siliguri", "Durgapur", "Asansol", "Kharagpur",
      "Barasat", "Barrackpore", "Basirhat", "Bongaon", "Diamond Harbour",
      "North 24 Parganas", "South 24 Parganas",
      "Paschim Medinipur (West Midnapore)", "Purba Medinipur (East Midnapore)",
      "Uttar Dinajpur (North Dinajpur)", "Dakshin Dinajpur (South Dinajpur)",
      "Haldia", "Kalyani", "Krishnanagar", "Nabadwip",
      "Bankura", "Purulia", "Birbhum", "Bolpur",
      "Malda", "Raiganj", "Balurghat", "Jalpaiguri",
      "Cooch Behar", "Alipurduar", "Darjeeling", "Kalimpong",
      "Burdwan (Bardhaman)", "Hooghly", "Chinsurah", "Serampore",
      "Tamluk", "Contai", "Baharampur", "Nadia",
      "Habra", "Ranaghat", "Shantipur", "Midnapore"
    ],
    "Delhi": ["New Delhi", "Dwarka", "Rohini", "Saket", "Janakpuri"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
    "Ladakh": ["Leh", "Kargil"],
    "Chandigarh": ["Chandigarh"],
    "Puducherry": ["Puducherry", "Karaikal"],
    "Andaman and Nicobar Islands": ["Port Blair"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
    "Lakshadweep": ["Kavaratti"]
  },
  "United States": {
    "California": ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento"],
    "New York": ["New York City", "Buffalo", "Rochester", "Albany"],
    "Texas": ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
    "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville"],
    "Illinois": ["Chicago", "Springfield", "Naperville"],
    "Washington": ["Seattle", "Tacoma", "Spokane"],
    "Massachusetts": ["Boston", "Cambridge", "Worcester"],
    "Pennsylvania": ["Philadelphia", "Pittsburgh", "Harrisburg"],
    "Georgia": ["Atlanta", "Savannah", "Augusta"],
    "Virginia": ["Richmond", "Virginia Beach", "Arlington"],
    "Ohio": ["Columbus", "Cleveland", "Cincinnati"],
    "Michigan": ["Detroit", "Ann Arbor", "Grand Rapids"],
    "North Carolina": ["Charlotte", "Raleigh", "Durham"],
    "New Jersey": ["Newark", "Jersey City", "Princeton"],
    "Colorado": ["Denver", "Boulder", "Colorado Springs"],
    "Arizona": ["Phoenix", "Tucson", "Scottsdale"],
    "Maryland": ["Baltimore", "Bethesda", "Rockville"],
    "Minnesota": ["Minneapolis", "Saint Paul"],
    "Oregon": ["Portland", "Eugene", "Salem"],
    "Connecticut": ["Hartford", "New Haven", "Stamford"]
  },
  "United Kingdom": {
    "England": ["London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Bristol", "Oxford", "Cambridge"],
    "Scotland": ["Edinburgh", "Glasgow", "Aberdeen", "Dundee"],
    "Wales": ["Cardiff", "Swansea", "Newport"],
    "Northern Ireland": ["Belfast", "Derry", "Lisburn"]
  },
  "Canada": {
    "Ontario": ["Toronto", "Ottawa", "Mississauga", "Hamilton"],
    "British Columbia": ["Vancouver", "Victoria", "Surrey"],
    "Quebec": ["Montreal", "Quebec City", "Laval"],
    "Alberta": ["Calgary", "Edmonton", "Red Deer"],
    "Manitoba": ["Winnipeg", "Brandon"],
    "Saskatchewan": ["Saskatoon", "Regina"],
    "Nova Scotia": ["Halifax", "Sydney"]
  },
  "Australia": {
    "New South Wales": ["Sydney", "Newcastle", "Wollongong"],
    "Victoria": ["Melbourne", "Geelong", "Ballarat"],
    "Queensland": ["Brisbane", "Gold Coast", "Cairns"],
    "Western Australia": ["Perth", "Fremantle"],
    "South Australia": ["Adelaide", "Mount Gambier"],
    "Tasmania": ["Hobart", "Launceston"],
    "ACT": ["Canberra"]
  },
  "Germany": {
    "Bavaria": ["Munich", "Nuremberg", "Augsburg"],
    "Berlin": ["Berlin"],
    "North Rhine-Westphalia": ["Cologne", "Düsseldorf", "Dortmund", "Essen"],
    "Hesse": ["Frankfurt", "Wiesbaden", "Darmstadt"],
    "Baden-Württemberg": ["Stuttgart", "Heidelberg", "Karlsruhe"],
    "Hamburg": ["Hamburg"],
    "Saxony": ["Dresden", "Leipzig"]
  },
  "France": {
    "Île-de-France": ["Paris", "Versailles", "Boulogne-Billancourt"],
    "Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Cannes"],
    "Auvergne-Rhône-Alpes": ["Lyon", "Grenoble"],
    "Nouvelle-Aquitaine": ["Bordeaux", "Limoges"],
    "Occitanie": ["Toulouse", "Montpellier"]
  },
  "Singapore": {
    "Singapore": ["Singapore"]
  },
  "UAE": {
    "Abu Dhabi": ["Abu Dhabi", "Al Ain"],
    "Dubai": ["Dubai"],
    "Sharjah": ["Sharjah"],
    "Ajman": ["Ajman"],
    "Ras Al Khaimah": ["Ras Al Khaimah"]
  },
  "Saudi Arabia": {
    "Riyadh": ["Riyadh"],
    "Makkah": ["Mecca", "Jeddah", "Taif"],
    "Eastern Province": ["Dammam", "Dhahran", "Al Khobar"],
    "Madinah": ["Medina"]
  },
  "Japan": {
    "Tokyo": ["Tokyo", "Shibuya", "Shinjuku"],
    "Osaka": ["Osaka", "Sakai"],
    "Kanagawa": ["Yokohama", "Kawasaki"],
    "Aichi": ["Nagoya"],
    "Kyoto": ["Kyoto"],
    "Fukuoka": ["Fukuoka"]
  },
  "South Korea": {
    "Seoul": ["Seoul"],
    "Busan": ["Busan"],
    "Gyeonggi": ["Suwon", "Incheon", "Seongnam"],
    "Daegu": ["Daegu"]
  },
  "Netherlands": {
    "North Holland": ["Amsterdam", "Haarlem"],
    "South Holland": ["Rotterdam", "The Hague", "Leiden"],
    "Utrecht": ["Utrecht"],
    "North Brabant": ["Eindhoven", "Tilburg"]
  },
  "Sweden": {
    "Stockholm": ["Stockholm"],
    "Västra Götaland": ["Gothenburg"],
    "Skåne": ["Malmö", "Lund"]
  },
  "Switzerland": {
    "Zurich": ["Zurich"],
    "Bern": ["Bern"],
    "Geneva": ["Geneva"],
    "Basel-Stadt": ["Basel"],
    "Vaud": ["Lausanne"]
  },
  "New Zealand": {
    "Auckland": ["Auckland"],
    "Wellington": ["Wellington"],
    "Canterbury": ["Christchurch"],
    "Otago": ["Dunedin", "Queenstown"]
  },
  "Ireland": {
    "Leinster": ["Dublin", "Kilkenny"],
    "Munster": ["Cork", "Limerick", "Waterford"],
    "Connacht": ["Galway"]
  },
  "Malaysia": {
    "Kuala Lumpur": ["Kuala Lumpur"],
    "Selangor": ["Shah Alam", "Petaling Jaya"],
    "Penang": ["George Town"],
    "Johor": ["Johor Bahru"]
  },
  "South Africa": {
    "Gauteng": ["Johannesburg", "Pretoria"],
    "Western Cape": ["Cape Town", "Stellenbosch"],
    "KwaZulu-Natal": ["Durban", "Pietermaritzburg"]
  },
  "Brazil": {
    "São Paulo": ["São Paulo", "Campinas"],
    "Rio de Janeiro": ["Rio de Janeiro", "Niterói"],
    "Minas Gerais": ["Belo Horizonte"],
    "Bahia": ["Salvador"],
    "Paraná": ["Curitiba"]
  }
};

export const countries = Object.keys(geoData).sort();

export function getStatesForCountry(country: string): string[] {
  return Object.keys(geoData[country] ?? {});
}

export function getCitiesForState(country: string, state: string): string[] {
  return geoData[country]?.[state] ?? [];
}
