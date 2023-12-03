export const NAV_LINKS = [
  { href: "/#", key: "products", label: "Products" },
  { href: "/dashboard", key: "dashboard", label: "Dashboard" },
  { href: "/#", key: "community ", label: "Community " },
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
  environment?: number | string;
  quality?: number | string;
  status?: string;
}

export interface Good {
  key: string;
  value: { key: string; product: ProductDetails[]; status?: string }[];
  status?: string;
}

export enum STATUS {
  NONE = "",
  ACTIVE = "Active Improvements!",
  COMPLETED = "Completed Improvements!",
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
            status: "",
          },
          {
            image: "laundry_detergent_2.jpg",
            tag: "Gentle on Fabrics",
            provider: "PureWash",
            title: "PureWash Liquid Detergent",
            environment: "50%",
            quality: "88%",
            status: "",
          },
        ],
        status: "",
      },
      {
        key: "Stain Remover",
        product: [
          {
            image: "stain_remover_1.jpg",
            tag: "Powerful Stain Removal",
            provider: "StainAway",
            title: "StainAway Stain Remover",
            environment: "45%",
            quality: "90%",
            status: "",
          },
        ],
        status: "",
      },
      {
        key: "Dryer Sheets",
        product: [
          {
            image: "dryer_sheets_1.jpg",
            tag: "xxx",
            provider: "StainAway",
            title: "Dryer Sheets xx",
            environment: "25%",
            quality: "90%",
            status: "",
          },
          {
            image: "dryer_sheets_2.jpg",
            tag: "xxx",
            provider: "StainAway",
            title: "Dryer Sheets xx",
            environment: "25%",
            quality: "90%",
            status: "",
          },
        ],
        status: "",
      },

      {
        key: "Dryer Balls",
        product: [
          {
            image: "dryer_balls_1.jpg",
            tag: "xxx",
            provider: "StainAway",
            title: "Dryer balls xx",
            environment: "25%",
            quality: "90%",
            status: "",
          },
          {
            image: "dryer_balls_2.jpg",
            tag: "xxx",
            provider: "StainAway",
            title: "Dryer balls xxxx",
            environment: "25%",
            quality: "90%",
            status: "",
          },
        ],
        status: "",
      },
      {
        key: "Scent Booster",
        product: [
          {
            image: "scent_booster_1.jpg",
            tag: "xxx",
            provider: "StainAway",
            title: "Scent Booster xx",
            environment: "25%",
            quality: "90%",
            status: "",
          },
          {
            image: "scent_booster_2.jpg",
            tag: "xxx",
            provider: "StainAway",
            title: "Scent Booster xxxx",
            environment: "25%",
            quality: "90%",
            status: "",
          },
        ],
        status: "",
      },
    ],
    status: "",
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

export const CATEGORY_STATUS = [
  { key: "Laundry", status: STATUS.NONE },
  { key: "Personal Hygiene", status: STATUS.NONE },
  { key: "Kitchen", status: STATUS.NONE },
  { key: "Living Room", status: STATUS.NONE },
  { key: "Bathroom", status: STATUS.NONE },
];
