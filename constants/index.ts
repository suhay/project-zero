export const NAV_LINKS = [
  { href: "/products", key: "products", label: "Products" },
  { href: "/dashboard", key: "dashboard", label: "Dashboard" },
  { href: "/community", key: "community ", label: "Community " },
  { href: "/signup", key: "signup", label: "Sign Up" },
  { href: "/login", key: "signin", label: "Sign In" },
];

export const CATEGORIES = [
  { key: "laundry", label: "Laundry" },
  { key: "personal hygiene", label: "Personal Hygiene" },
  { key: "kitchen", label: "Kitchen" },
  { key: "living room", label: "Living Room" },
  { key: "bathroom", label: "Bathroom" },
];

export const GOODS = [
  {
    key: "Laundry",
    value: [
      "Laundry Detergent",
      "Fabric Softener",
      "Dryer Sheets",
      "Dryer Balls",
      "Scent Booster",
    ],
  },
  {
    key: "Personal Hygiene",
    value: ["Shampoo Conditioner", "Bath Soap", "Shaving Cream", "Toothpaste"],
  },
  {
    key: "Kitchen",
    value: [
      "Dish Soap",
      "Dish Scrubber",
      "Dishwasher Pods",
      "Paper Towels",
      "Surface Cleaner",
      "Floor Cleaner",
      "Tupperware",
      "Beeswax Wraps",
    ],
  },
  { key: "Living Room", value: ["Duster"] },
  { key: "Bathroom", value: ["Toilet Paper"] },
];

export const STATUS = ["No Started", "In Progress", "Hit all the basics"];

export const CATEGORY_STATUS = [
  { Laundry: ["No Started", "In Progress", "Hit all the basics"] },
  { "Personal Hygiene": ["No Started", "In Progress", "Hit all the basics"] },
  { Kitchen: "" },
  { "Living Room": "" },
  { Bathroom: "" },
];
