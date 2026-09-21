/* -------------------------------------------------------------------------- */
/*  Larped — client-side mock data + localStorage persistence helpers          */
/*  No network, no backend. Everything here runs in the browser.               */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Storage keys ------------------------------ */

export const AUTH_STORAGE_KEY = "larped_auth_user_v1";
export const LISTINGS_STORAGE_KEY = "larped_listings_v1";
export const THEME_STORAGE_KEY = "larped_theme_v1";
export const LISTINGS_CHANGED_EVENT = "larped:listings-changed";

/* --------------------------------- Types ---------------------------------- */

export type UserRole = "admin" | "buyer" | "seller";
export type ListingStatus = "pending" | "approved" | "rejected";
export type QualityRating = "AAA" | "AA" | "A" | "B+";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company: string;
}

export interface Listing {
  id: string;
  title: string;
  category: string;
  /** Price in INR per tCO2e */
  price: number;
  /** Total credits available, in tCO2e */
  credits: number;
  location: string;
  verifiedBy: string;
  qualityRating: QualityRating;
  sdgGoals: number[];
  image: string;
  ownerId: string;
  status: ListingStatus;
  description: string;
  createdAt: string;
}

export interface EmissionsPoint {
  month: string;
  emissions: number;
  offset: number;
  target: number;
}

export interface CbamCommodity {
  id: string;
  label: string;
  /** Embedded emissions intensity, tCO2e per tonne of product */
  intensity: number;
}

export interface CbamOrigin {
  id: string;
  label: string;
  /** Origin-country multiplier applied to the commodity intensity */
  factor: number;
}

/* --------------------------------- Images --------------------------------- */

const unsplash = (photoId: string, width = 1200) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;

export const IMAGES = {
  hero: unsplash("photo-1513828583688-c52646db42da", 1800),
  factoryNight: unsplash("photo-1513828583688-c52646db42da"),
  steelPlant: unsplash("photo-1565793298595-6a879b1d9492"),
  containerShip: unsplash("photo-1494412574643-ff11b0a5c1c3"),
  port: unsplash("photo-1578575437130-527eed3abbec"),
  windTurbines: unsplash("photo-1466611653911-95081537e5b7"),
  windField: unsplash("photo-1532601224476-15c79f2f7a51"),
  solarFarm: unsplash("photo-1509391366360-2e959784a276"),
  solarPanels: unsplash("photo-1508514177221-188b1cf16e9d"),
  forestCanopy: unsplash("photo-1441974231531-c6227db76b6e"),
  forestMist: unsplash("photo-1448375240586-882707db888b"),
  greenCity: unsplash("photo-1449824913935-59a10b8d2000"),
  cityNight: unsplash("photo-1480714378408-67cf0d13bc1b"),
} as const;

/* ------------------------------- Reference -------------------------------- */

export const CATEGORIES = [
  "Renewable Energy",
  "Forestry & Land Use",
  "Blue Carbon",
  "Industrial Efficiency",
  "Maritime Decarbonisation",
  "Urban Greening",
  "Methane Capture",
  "Clean Cooking",
] as const;

export const VERIFIERS = [
  "Verra (VCS)",
  "Gold Standard",
  "Bureau Veritas",
  "TÜV SÜD",
  "DNV",
  "SGS",
] as const;

export const QUALITY_RATINGS: QualityRating[] = ["AAA", "AA", "A", "B+"];

export const SDG_LABELS: Record<number, string> = {
  1: "No Poverty",
  2: "Zero Hunger",
  3: "Good Health and Well-being",
  4: "Quality Education",
  5: "Gender Equality",
  6: "Clean Water and Sanitation",
  7: "Affordable and Clean Energy",
  8: "Decent Work and Economic Growth",
  9: "Industry, Innovation and Infrastructure",
  10: "Reduced Inequalities",
  11: "Sustainable Cities and Communities",
  12: "Responsible Consumption and Production",
  13: "Climate Action",
  14: "Life Below Water",
  15: "Life on Land",
  16: "Peace, Justice and Strong Institutions",
  17: "Partnerships for the Goals",
};

/* ------------------------------ CBAM reference ----------------------------- */

export const CBAM_COMMODITIES: CbamCommodity[] = [
  { id: "steel", label: "Steel", intensity: 1.9 },
  { id: "cement", label: "Cement", intensity: 0.9 },
  { id: "aluminum", label: "Aluminum", intensity: 16.5 },
  { id: "fertilizer", label: "Fertilizer", intensity: 2.6 },
  { id: "hydrogen", label: "Hydrogen", intensity: 8.9 },
];

export const CBAM_ORIGINS: CbamOrigin[] = [
  { id: "china", label: "China", factor: 1.4 },
  { id: "india", label: "India", factor: 1.3 },
  { id: "turkey", label: "Turkey", factor: 1.1 },
  { id: "usa", label: "USA", factor: 0.9 },
  { id: "eu", label: "EU", factor: 0.8 },
];

/** EU ETS reference carbon price, EUR per tCO2e */
export const CARBON_PRICE_EUR = 82;

/** 1 EUR expressed in INR */
export const EUR_TO_INR = 96.5;

/* ------------------------------- Seed users -------------------------------- */

export const SEED_USERS: AppUser[] = [
  {
    id: "u_admin",
    name: "Larped Admin",
    email: "admin@larped.dev",
    role: "admin",
    company: "Larped Compliance Desk",
  },
  {
    id: "u_priya",
    name: "Priya Sharma",
    email: "priya@steelforge.in",
    role: "buyer",
    company: "SteelForge Industries",
  },
  {
    id: "u_arjun",
    name: "Arjun Mehta",
    email: "arjun@windfields.in",
    role: "seller",
    company: "WindFields Renewables",
  },
];

/* ------------------------------ Emissions data ----------------------------- */

/** Six months of company emissions (tCO2e) for the Dashboard line chart. */
export const EMISSIONS_DATA: EmissionsPoint[] = [
  { month: "Apr", emissions: 1840, offset: 320, target: 1700 },
  { month: "May", emissions: 1765, offset: 410, target: 1660 },
  { month: "Jun", emissions: 1710, offset: 460, target: 1620 },
  { month: "Jul", emissions: 1650, offset: 520, target: 1580 },
  { month: "Aug", emissions: 1580, offset: 590, target: 1540 },
  { month: "Sep", emissions: 1490, offset: 680, target: 1500 },
];

export const ESG_SCORE = 78;

/* ------------------------------ Seed listings ------------------------------ */

export const SEED_LISTINGS: Listing[] = [
  {
    id: "lst_001",
    title: "Bhadla Solar Park Grid Offset",
    category: "Renewable Energy",
    price: 1150,
    credits: 42000,
    location: "Bhadla, Rajasthan",
    verifiedBy: "Verra (VCS)",
    qualityRating: "AAA",
    sdgGoals: [7, 13],
    image: IMAGES.solarFarm,
    ownerId: "u_arjun",
    status: "approved",
    description:
      "Utility-scale photovoltaic generation displacing coal-fired grid electricity across northern India, independently metered and verified annually.",
    createdAt: "2026-03-04T09:30:00.000Z",
  },
  {
    id: "lst_002",
    title: "Muppandal Wind Corridor Credits",
    category: "Renewable Energy",
    price: 980,
    credits: 36500,
    location: "Muppandal, Tamil Nadu",
    verifiedBy: "Gold Standard",
    qualityRating: "AA",
    sdgGoals: [7, 9, 13],
    image: IMAGES.windTurbines,
    ownerId: "u_arjun",
    status: "approved",
    description:
      "Repowered onshore wind farm delivering additional clean generation to the southern grid, with SCADA-backed monitoring of every turbine.",
    createdAt: "2026-03-18T11:15:00.000Z",
  },
  {
    id: "lst_003",
    title: "Western Ghats Reforestation Initiative",
    category: "Forestry & Land Use",
    price: 1420,
    credits: 18000,
    location: "Kodagu, Karnataka",
    verifiedBy: "Verra (VCS)",
    qualityRating: "AA",
    sdgGoals: [6, 13, 15],
    image: IMAGES.forestCanopy,
    ownerId: "u_arjun",
    status: "approved",
    description:
      "Native-species restoration of degraded plantation land with community stewardship, satellite canopy tracking and a 30-year permanence buffer.",
    createdAt: "2026-04-02T08:45:00.000Z",
  },
  {
    id: "lst_004",
    title: "Sundarbans Mangrove Blue Carbon",
    category: "Blue Carbon",
    price: 2150,
    credits: 9500,
    location: "South 24 Parganas, West Bengal",
    verifiedBy: "Gold Standard",
    qualityRating: "AAA",
    sdgGoals: [13, 14, 15],
    image: IMAGES.forestMist,
    ownerId: "u_arjun",
    status: "approved",
    description:
      "Mangrove planting and tidal-flow restoration that locks carbon into coastal sediment while shielding local fishing communities from storm surge.",
    createdAt: "2026-04-21T14:00:00.000Z",
  },
  {
    id: "lst_005",
    title: "Jamshedpur Steel Waste Heat Recovery",
    category: "Industrial Efficiency",
    price: 870,
    credits: 24000,
    location: "Jamshedpur, Jharkhand",
    verifiedBy: "Bureau Veritas",
    qualityRating: "A",
    sdgGoals: [9, 12, 13],
    image: IMAGES.factoryNight,
    ownerId: "u_priya",
    status: "approved",
    description:
      "Captures furnace exhaust heat to generate on-site power, cutting grid draw and coal use across a large integrated steel works.",
    createdAt: "2026-05-09T10:20:00.000Z",
  },
  {
    id: "lst_006",
    title: "Mundra Green Shipping Corridor",
    category: "Maritime Decarbonisation",
    price: 1680,
    credits: 12000,
    location: "Mundra, Gujarat",
    verifiedBy: "DNV",
    qualityRating: "B+",
    sdgGoals: [9, 13, 14],
    image: IMAGES.containerShip,
    ownerId: "u_priya",
    status: "pending",
    description:
      "Fuel-switch and slow-steaming programme for export container services, reducing voyage emissions on India to Europe trade lanes.",
    createdAt: "2026-06-14T13:10:00.000Z",
  },
  {
    id: "lst_007",
    title: "Kutch Cement Kiln Alternative Fuels",
    category: "Industrial Efficiency",
    price: 940,
    credits: 30000,
    location: "Kutch, Gujarat",
    verifiedBy: "TÜV SÜD",
    qualityRating: "A",
    sdgGoals: [9, 12, 13],
    image: IMAGES.steelPlant,
    ownerId: "u_priya",
    status: "pending",
    description:
      "Substitutes coal in cement kilns with processed municipal waste and biomass, lowering clinker emissions and diverting waste from landfill.",
    createdAt: "2026-07-07T09:05:00.000Z",
  },
  {
    id: "lst_008",
    title: "Pune Urban Green Corridors",
    category: "Urban Greening",
    price: 1260,
    credits: 6500,
    location: "Pune, Maharashtra",
    verifiedBy: "SGS",
    qualityRating: "B+",
    sdgGoals: [11, 13, 15],
    image: IMAGES.greenCity,
    ownerId: "u_arjun",
    status: "pending",
    description:
      "Continuous tree-lined corridors and vertical greening across dense districts, cooling streets and sequestering carbon in the urban core.",
    createdAt: "2026-08-11T15:40:00.000Z",
  },
];

/* --------------------------- Listing persistence --------------------------- */

const VALID_STATUSES: ListingStatus[] = ["pending", "approved", "rejected"];

function cloneSeedListings(): Listing[] {
  return SEED_LISTINGS.map((listing) => ({
    ...listing,
    sdgGoals: [...listing.sdgGoals],
  }));
}

/**
 * Coerces an unknown value into a Listing, filling safe defaults for
 * missing optional fields. Returns null when the value is unusable.
 */
export function normalizeListing(value: unknown): Listing | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;

  if (typeof v.id !== "string" || v.id.length === 0) return null;
  if (typeof v.title !== "string" || v.title.length === 0) return null;

  const price = Number(v.price);
  const credits = Number(v.credits);
  if (!Number.isFinite(price) || !Number.isFinite(credits)) return null;

  const rating = QUALITY_RATINGS.includes(v.qualityRating as QualityRating)
    ? (v.qualityRating as QualityRating)
    : "B+";

  const status = VALID_STATUSES.includes(v.status as ListingStatus)
    ? (v.status as ListingStatus)
    : "pending";

  const sdgGoals = Array.isArray(v.sdgGoals)
    ? v.sdgGoals
        .map((goal) => Number(goal))
        .filter((goal) => Number.isInteger(goal) && goal >= 1 && goal <= 17)
    : [];

  return {
    id: v.id,
    title: v.title,
    category: typeof v.category === "string" ? v.category : "Renewable Energy",
    price,
    credits,
    location: typeof v.location === "string" ? v.location : "India",
    verifiedBy: typeof v.verifiedBy === "string" ? v.verifiedBy : "Pending verification",
    qualityRating: rating,
    sdgGoals,
    image:
      typeof v.image === "string" && v.image.length > 0 ? v.image : IMAGES.forestCanopy,
    ownerId: typeof v.ownerId === "string" ? v.ownerId : "",
    status,
    description: typeof v.description === "string" ? v.description : "",
    createdAt:
      typeof v.createdAt === "string" ? v.createdAt : new Date().toISOString(),
  };
}

/**
 * Writes listings to localStorage and notifies same-tab listeners.
 * Never throws (storage may be full or unavailable).
 */
export function saveListings(listings: Listing[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(listings));
  } catch {
    /* storage unavailable — keep going with in-memory state */
  }
  try {
    window.dispatchEvent(new Event(LISTINGS_CHANGED_EVENT));
  } catch {
    /* ignore */
  }
}

/**
 * Reads listings from localStorage. Seeds from SEED_LISTINGS on first load,
 * and falls back to the seed if the stored value is missing or malformed.
 * An intentionally empty array is respected (the UI simply renders blank).
 */
export function loadListings(): Listing[] {
  if (typeof window === "undefined") return cloneSeedListings();

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(LISTINGS_STORAGE_KEY);
  } catch {
    return cloneSeedListings();
  }

  if (raw === null) {
    const seeded = cloneSeedListings();
    saveListings(seeded);
    return seeded;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("Stored listings are not an array");

    const valid = parsed
      .map((item) => normalizeListing(item))
      .filter((item): item is Listing => item !== null);

    if (parsed.length > 0 && valid.length === 0) {
      throw new Error("Stored listings contain no valid entries");
    }

    return valid;
  } catch {
    const seeded = cloneSeedListings();
    saveListings(seeded);
    return seeded;
  }
}

/** Generates a reasonably unique client-side id. */
export function generateId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}