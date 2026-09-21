import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AUTH_STORAGE_KEY,
  SEED_USERS,
  type AppUser,
  type UserRole,
} from "@/data/mockData";

/* -------------------------------------------------------------------------- */
/*  Fake client-side auth. Any password works. Nothing leaves the browser.     */
/* -------------------------------------------------------------------------- */

export interface SignupInput {
  name: string;
  email: string;
  company?: string;
  password?: string;
}

interface AuthContextValue {
  user: AppUser | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => AppUser;
  signup: (input: SignupInput) => AppUser;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const VALID_ROLES: UserRole[] = ["admin", "buyer", "seller"];

const GENERIC_MAIL_PROVIDERS = [
  "gmail",
  "yahoo",
  "outlook",
  "hotmail",
  "icloud",
  "proton",
  "protonmail",
  "live",
  "aol",
  "rediffmail",
];

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function titleCase(input: string): string {
  return input
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function stableIdFromEmail(email: string): string {
  const slug = email.replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return `u_${slug || "guest"}`;
}

function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const name = titleCase(local.replace(/[0-9]+/g, " "));
  return name.length > 0 ? name : "Larped User";
}

function companyFromEmail(email: string): string {
  const domain = email.split("@")[1] ?? "";
  const root = domain.split(".")[0] ?? "";
  if (!root || GENERIC_MAIL_PROVIDERS.includes(root)) return "Independent Buyer";
  return titleCase(root);
}

function isAppUser(value: unknown): value is AppUser {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    v.id.length > 0 &&
    typeof v.name === "string" &&
    typeof v.email === "string" &&
    typeof v.company === "string" &&
    typeof v.role === "string" &&
    VALID_ROLES.includes(v.role as UserRole)
  );
}

function readStoredUser(): AppUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isAppUser(parsed)) return null;
    return {
      id: parsed.id,
      name: parsed.name,
      email: parsed.email,
      role: parsed.role,
      company: parsed.company,
    };
  } catch {
    return null;
  }
}

function writeStoredUser(user: AppUser | null): void {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {
    /* storage unavailable — session stays in memory only */
  }
}

function resolveUser(email: string, overrides?: Partial<AppUser>): AppUser {
  const normalized = normalizeEmail(email);
  const seeded = SEED_USERS.find((u) => u.email.toLowerCase() === normalized);

  if (seeded) {
    return { ...seeded };
  }

  const name = overrides?.name?.trim();
  const company = overrides?.company?.trim();

  return {
    id: stableIdFromEmail(normalized),
    name: name && name.length > 0 ? name : nameFromEmail(normalized),
    email: normalized,
    role: "buyer",
    company: company && company.length > 0 ? company : companyFromEmail(normalized),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(() => readStoredUser());

  const login = useCallback((email: string, _password?: string): AppUser => {
    const next = resolveUser(email);
    writeStoredUser(next);
    setUser(next);
    return next;
  }, []);

  const signup = useCallback((input: SignupInput): AppUser => {
    const next = resolveUser(input.email, {
      name: input.name,
      company: input.company,
    });
    writeStoredUser(next);
    setUser(next);
    return next;
  }, []);

  const logout = useCallback(() => {
    writeStoredUser(null);
    setUser(null);
  }, []);

  // Keep multiple tabs in sync (login/logout in one tab reflects in others).
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === AUTH_STORAGE_KEY) {
        setUser(readStoredUser());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      signup,
      logout,
    }),
    [user, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}