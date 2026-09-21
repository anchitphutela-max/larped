import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LarpedLogo from "@/components/LarpedLogo";
import NavLink from "@/components/NavLink";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/solutions", label: "Solutions", end: false },
  { to: "/methodology", label: "Methodology", end: false },
] as const;

const PublicNav = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-panel sticky top-0 z-40 w-full border-x-0 border-t-0">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="Larped home"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <LarpedLogo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeClassName="bg-accent text-foreground"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <Button asChild className="glow-hover">
                <Link to="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild className="glow-hover">
                  <Link to="/signup">Get started</Link>
                </Button>
              </>
            )}
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[340px]">
              <SheetHeader className="text-left">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation links
                </SheetDescription>
                <LarpedLogo />
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3.5 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    activeClassName="bg-accent text-foreground"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-3">
                {user ? (
                  <Button asChild className="w-full" onClick={() => setOpen(false)}>
                    <Link to="/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full"
                      onClick={() => setOpen(false)}
                    >
                      <Link to="/login">Log in</Link>
                    </Button>
                    <Button asChild className="w-full" onClick={() => setOpen(false)}>
                      <Link to="/signup">Get started</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export { PublicNav };
export default PublicNav;