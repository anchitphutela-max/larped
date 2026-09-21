import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Leaf,
  LogOut,
  Menu,
  Package,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { LarpedLogo } from "@/components/LarpedLogo";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Listings",
    href: "/listings",
    icon: Package,
  },
];

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const items =
    user.role === "admin"
      ? [
          ...navItems,
          {
            label: "Admin",
            href: "/admin",
            icon: ShieldCheck,
          },
        ]
      : navItems;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navigation = (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          location.pathname === item.href ||
          (item.href !== "/dashboard" &&
            location.pathname.startsWith(`${item.href}/`));

        return (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <NavLink
                to={item.href}
                end={item.href === "/dashboard"}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                )}
                activeClassName="bg-primary/15 text-primary shadow-sm"
              >
                <Icon
                  className={cn(
                    "h-[18px] w-[18px] shrink-0 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-primary",
                  )}
                />
                <span>{item.label}</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" className="lg:hidden">
              {item.label}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
  );

  const accountSection = (
    <div className="border-t border-border/60 pt-4">
      <div className="mb-3 rounded-xl bg-muted/30 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Leaf className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.company}
            </p>
          </div>
        </div>

        <Badge
          variant={user.role === "admin" ? "default" : "outline"}
          className="mt-3 capitalize"
        >
          {user.role}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              asChild
            >
              <Link to="/" onClick={() => setMobileOpen(false)}>
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Home</TooltipContent>
        </Tooltip>

        <ThemeToggle className="h-9 w-9" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Log out</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );

  return (
    <>
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/60 bg-background/85 px-4 backdrop-blur-xl lg:hidden">
        <LarpedLogo
          className="h-8"
          markClassName="h-8 w-8"
          textClassName="text-lg"
        />

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex w-[280px] flex-col border-r border-border/60 bg-background/95 p-0 backdrop-blur-xl"
          >
            <SheetHeader className="border-b border-border/60 px-5 py-4 text-left">
              <SheetTitle>
                <LarpedLogo
                  className="h-8"
                  markClassName="h-8 w-8"
                  textClassName="text-lg"
                />
              </SheetTitle>
              <SheetDescription className="sr-only">
                Larped navigation
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-1 flex-col overflow-y-auto p-4">
              {navigation}
              <div className="mt-auto">{accountSection}</div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden w-64 shrink-0 border-r border-border/60 bg-background/70 lg:flex lg:min-h-screen lg:flex-col lg:backdrop-blur-xl">
        <div className="sticky top-0 flex h-screen flex-col p-4">
          <div className="mb-8 px-2 pt-2">
            <Link to="/" className="inline-flex">
              <LarpedLogo
                className="h-9"
                markClassName="h-9 w-9"
                textClassName="text-xl"
              />
            </Link>
          </div>

          <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Workspace
          </div>

          {navigation}

          <div className="mt-auto">{accountSection}</div>
        </div>
      </aside>
    </>
  );
}

export { AppSidebar };