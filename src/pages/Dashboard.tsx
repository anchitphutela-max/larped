import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CircleDollarSign,
  FileCheck2,
  Leaf,
  Plus,
  ShieldCheck,
  Store,
  TrendingUp,
} from "lucide-react";

import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import {
  LISTINGS_CHANGED_EVENT,
  loadListings,
  type Listing,
} from "@/data/mockData";

const activities = [
  {
    icon: FileCheck2,
    title: "Compliance workspace ready",
    description: "Your carbon-management dashboard is ready to use.",
  },
  {
    icon: ShieldCheck,
    title: "Review your exposure",
    description: "Use the CBAM calculator to explore an import scenario.",
  },
  {
    icon: Store,
    title: "Explore the marketplace",
    description: "Browse available green-credit listings.",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const refreshListings = () => {
      setListings(loadListings());
    };

    refreshListings();

    window.addEventListener(LISTINGS_CHANGED_EVENT, refreshListings);
    window.addEventListener("storage", refreshListings);

    return () => {
      window.removeEventListener(LISTINGS_CHANGED_EVENT, refreshListings);
      window.removeEventListener("storage", refreshListings);
    };
  }, []);

  const activeListings = useMemo(
    () => listings.filter((listing) => listing.status === "active"),
    [listings],
  );

  const totalCredits = useMemo(
    () =>
      activeListings.reduce(
        (total, listing) => total + Number(listing.quantity || 0),
        0,
      ),
    [activeListings],
  );

  const averagePrice = useMemo(() => {
    if (activeListings.length === 0) return 0;

    const total = activeListings.reduce(
      (sum, listing) => sum + Number(listing.price || 0),
      0,
    );

    return total / activeListings.length;
  }, [activeListings]);

  const displayName =
    user?.name?.trim() ||
    user?.email?.split("@")[0] ||
    "there";

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="min-h-screen lg:pl-64">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Dashboard</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                Welcome back, {displayName}.
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Keep your carbon compliance and marketplace activity moving.
              </p>
            </div>

            <Button asChild>
              <Link to="/my-listings">
                <Plus className="h-4 w-4" />
                Manage listings
              </Link>
            </Button>
          </header>

          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active listings
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      {activeListings.length}
                    </p>
                  </div>

                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Store className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Credits listed
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      {totalCredits.toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Leaf className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg. listing price
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      ₹{averagePrice.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>

                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <CircleDollarSign className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Workspace status
                    </p>
                    <p className="mt-2 text-3xl font-semibold">Active</p>
                  </div>

                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle>Carbon management overview</CardTitle>
                    <CardDescription className="mt-1">
                      A simple view of the workflow across your workspace.
                    </CardDescription>
                  </div>

                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border/70 bg-muted/20 p-5">
                    <p className="text-sm text-muted-foreground">Measure</p>
                    <p className="mt-3 text-lg font-semibold">Exposure</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Understand relevant carbon inputs.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-muted/20 p-5">
                    <p className="text-sm text-muted-foreground">Assess</p>
                    <p className="mt-3 text-lg font-semibold">Compliance</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Review requirements and opportunities.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-muted/20 p-5">
                    <p className="text-sm text-muted-foreground">Act</p>
                    <p className="mt-3 text-lg font-semibold">Improve</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Track actions and sustainability progress.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <TrendingUp className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-medium">
                        Keep your sustainability workflow connected
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Use the marketplace, calculator, and dashboard together
                        to keep important carbon-related activities in one
                        place.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick actions</CardTitle>
                <CardDescription>
                  Jump directly to a useful workspace.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-between">
                  <Link to="/my-listings">
                    Manage my listings
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full justify-between">
                  <Link to="/solutions">
                    Explore solutions
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full justify-between">
                  <Link to="/methodology">
                    Review methodology
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </section>

          <section className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent activity</CardTitle>
                <CardDescription>
                  Suggested next steps for your workspace.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-4 md:grid-cols-3">
                {activities.map((activity) => {
                  const Icon = activity.icon;

                  return (
                    <div
                      key={activity.title}
                      className="rounded-2xl border border-border/70 p-5"
                    >
                      <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="mt-4 font-medium">{activity.title}</h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}