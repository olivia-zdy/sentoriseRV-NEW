export interface CustomerStory {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  scenario: "rv" | "vanlife" | "solar" | "marine" | "camping" | "cabin";
  scenarioLabel: string;
  quote: string;
  fullStory: string;
  productsUsed: string[];
  images: string[];
  rating: number;
}

export const customerStories: CustomerStory[] = [
  {
    id: "marcus-sweden",
    name: "Marcus Eriksson",
    location: "Sweden",
    scenario: "vanlife",
    scenarioLabel: "Van Life",
    quote: "Our Sprinter has been powered by the Core 100Ah for 8 months now. We've crossed 15 countries, from the Norwegian fjords to the Greek islands. The Bluetooth monitoring is incredibly useful — I can check battery status from bed without going outside in the cold.",
    fullStory: "When we decided to go full-time van life, choosing the right battery was crucial. After extensive research, we chose Sentorise for its reputation in the European market. The Core 100Ah MINI fits perfectly under our bed platform, and the self-heating protection gives us peace of mind during Scandinavian winters. We've never had a single issue.",
    productsUsed: ["Core 12V 100Ah MINI", "Solar Controller 30A"],
    images: [],
    rating: 5,
  },
  {
    id: "sophie-france",
    name: "Sophie Laurent",
    location: "France",
    scenario: "cabin",
    scenarioLabel: "Off-Grid Cabin",
    quote: "We run our entire alpine cabin on two Plus 200Ah batteries with solar. Even in French Alps winters at -15°C, the self-heating feature keeps them charging perfectly. The investment paid for itself in reliability.",
    fullStory: "Our off-grid cabin in the French Alps was always a challenge to power. Lead-acid batteries would fail every winter. Since switching to Sentorise Plus series with self-heating, we've had zero cold-weather issues. The 200Ah capacity runs our lights, water pump, fridge, and even a small induction cooktop. Absolutely reliable.",
    productsUsed: ["Plus 12V 200Ah Heated", "Plus 12V 200Ah Heated"],
    images: [],
    rating: 5,
  },
  {
    id: "thomas-germany",
    name: "Thomas Müller",
    location: "Germany",
    scenario: "rv",
    scenarioLabel: "RV Professional",
    quote: "We've switched all our RV installations to Sentorise. The DIN H8 format fits perfectly in European motorhomes, and the 5-year warranty gives our customers peace of mind. It's now our standard recommendation.",
    fullStory: "As an RV dealer in Bavaria, we install dozens of battery systems every month. Sentorise's DIN H8 format solved our biggest headache — finding batteries that fit European under-seat compartments. The quality is consistent, the app works great, and we've had zero warranty claims. That says everything.",
    productsUsed: ["Core 12V 100Ah DIN H8"],
    images: [],
    rating: 5,
  },
  {
    id: "emma-netherlands",
    name: "Emma van der Berg",
    location: "Netherlands",
    scenario: "marine",
    scenarioLabel: "Marine",
    quote: "Our sailboat's electrical system has never been more reliable. The Core 100Ah handles the trolling motor, navigation, and cabin lights without breaking a sweat. And it's so much lighter than our old lead-acid setup!",
    fullStory: "Living on a sailboat in the Dutch waterways, weight and space are everything. The Sentorise Core 100Ah saved us nearly 15kg compared to our old batteries, and the capacity is actually usable to 100%. We can run our fridge overnight without worry. Best upgrade we've made to the boat.",
    productsUsed: ["Core 12V 100Ah Standard"],
    images: [],
    rating: 5,
  },
  {
    id: "james-uk",
    name: "James Wilson",
    location: "United Kingdom",
    scenario: "solar",
    scenarioLabel: "Off-Grid Solar",
    quote: "The efficiency is remarkable. We're getting nearly 95% round-trip efficiency from our solar system, compared to maybe 80% with lead-acid. That's significant when every watt counts in an off-grid setup.",
    fullStory: "Our smallholding in rural Scotland runs entirely on solar power. The Sentorise Plus 200Ah batteries store our daily solar harvest perfectly. Even on cloudy Scottish days, the system maintains power for our workshop, house, and electric fencing. The monitoring app helps us optimize our energy usage.",
    productsUsed: ["Plus 12V 200Ah Heated", "Core 12V 100Ah Standard"],
    images: [],
    rating: 5,
  },
  {
    id: "anna-norway",
    name: "Anna Johansen",
    location: "Norway",
    scenario: "camping",
    scenarioLabel: "Camping & Outdoor",
    quote: "The Lite 50Ah is the perfect companion for our camping trips. Light enough to carry, powerful enough to run our portable fridge, lights, and charge all our devices for a week in the wilderness.",
    fullStory: "We love wild camping in the Norwegian mountains, but we also like our creature comforts. The Lite 50Ah with a folding solar panel gives us complete energy independence. It's light enough to pack into remote locations and reliable enough that we never worry about power. The Bluetooth app is great for monitoring while away from camp.",
    productsUsed: ["Lite 12V 50Ah Lightweight"],
    images: [],
    rating: 5,
  },
];

export const getStoryById = (id: string): CustomerStory | undefined => {
  return customerStories.find(s => s.id === id);
};

export const getStoriesByScenario = (scenario: CustomerStory["scenario"]): CustomerStory[] => {
  return customerStories.filter(s => s.scenario === scenario);
};
