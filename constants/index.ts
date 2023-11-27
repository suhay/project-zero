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

export interface ProductDetails {
  image?: string;
  tag?: string;
  provider?: string;
  title?: string;
  environment?: string;
  quality?: string;
}

export interface Good {
  key: string;
  value: { key: string; product: ProductDetails[] }[];
}

export const GOODS: Good[] = [
  {
    key: "Laundry",
    value: [
      {
        key: "Laundry Detergent",
        product: [
          {
            image: "laundry_detergent_1.jpg",
            tag: "High Efficiency",
            provider: "EcoClean",
            title: "EcoClean Laundry Pods",
            environment: "60%",
            quality: "85%",
          },
          {
            image: "laundry_detergent_2.jpg",
            tag: "Gentle on Fabrics",
            provider: "PureWash",
            title: "PureWash Liquid Detergent",
            environment: "50%",
            quality: "88%",
          },
        ],
      },
      {
        key: "Laundry Stain Remover",
        product: [
          {
            image: "stain_remover_1.jpg",
            tag: "Powerful Stain Removal",
            provider: "StainAway",
            title: "StainAway Stain Remover",
            environment: "45%",
            quality: "90%",
          },
        ],
      },
    ],
  },
  {
    key: "Personal Hygiene",
    value: [
      {
        key: "Shampoo",
        product: [
          {
            image: "shampoo_1.jpg",
            tag: "Nourishing Formula",
            provider: "PureGlow",
            title: "PureGlow Moisture Shampoo",
            environment: "55%",
            quality: "82%",
          },
        ],
      },
      {
        key: "Toothpaste",
        product: [
          {
            image: "toothpaste_1.jpg",
            tag: "Fluoride-Free",
            provider: "EcoSmile",
            title: "EcoSmile Natural Toothpaste",
            environment: "70%",
            quality: "78%",
          },
        ],
      },
    ],
  },
  {
    key: "Kitchen",
    value: [
      {
        key: "Dish Soap",
        product: [
          {
            image: "dish_soap_1.jpg",
            tag: "Gentle on Hands",
            provider: "SoftSuds",
            title: "SoftSuds Dish Soap",
            environment: "65%",
            quality: "80%",
          },
        ],
      },
      {
        key: "Kitchen Cleaner",
        product: [
          {
            image: "kitchen_cleaner_1.jpg",
            tag: "All-Purpose Cleaner",
            provider: "GreenShine",
            title: "GreenShine Kitchen Cleaner",
            environment: "50%",
            quality: "85%",
          },
        ],
      },
    ],
  },
  {
    key: "Living Room",
    value: [
      {
        key: "Air Freshener",
        product: [
          {
            image: "air_freshener_1.jpg",
            tag: "Natural Fragrance",
            provider: "FreshBreeze",
            title: "FreshBreeze Natural Air Freshener",
            environment: "40%",
            quality: "88%",
          },
        ],
      },
      {
        key: "Couch Cleaner",
        product: [
          {
            image: "couch_cleaner_1.jpg",
            tag: "Fabric Care",
            provider: "FabricGuard",
            title: "FabricGuard Couch Cleaner",
            environment: "55%",
            quality: "82%",
          },
        ],
      },
    ],
  },
  {
    key: "Bathroom",
    value: [
      {
        key: "Hand Soap",
        product: [
          {
            image: "hand_soap_1.jpg",
            tag: "Moisturizing",
            provider: "SilkTouch",
            title: "SilkTouch Moisturizing Hand Soap",
            environment: "60%",
            quality: "78%",
          },
        ],
      },
      {
        key: "Toilet Bowl Cleaner",
        product: [
          {
            image: "toilet_cleaner_1.jpg",
            tag: "Powerful Cleaning",
            provider: "PureFlush",
            title: "PureFlush Toilet Bowl Cleaner",
            environment: "50%",
            quality: "85%",
          },
        ],
      },
    ],
  },
];

export enum JSTATUS {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  HIT_ALL_BASICS = "Hit all the basics",
}

export const CATEGORY_STATUS = [
  { key: "Laundry", status: "" },
  { key: "Personal Hygiene", status: "" },
  { key: "Kitchen", status: "" },
  { key: "Living Room", status: "" },
  { key: "Bathroom", status: "" },
];
