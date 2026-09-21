import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Leaf,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";

import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LISTINGS_CHANGED_EVENT,
  loadListings,
  type Listing,
} from "@/data/mockData";

export default function AdminDashboard() {
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

  const pendingListings = useMemo(
    () => listings.filter((listing) => listing.status === "pending"),
    [listings],
  );

  const totalCredits = useMemo(
    () =>
      activeListings.reduce(
        (sum, listing) => sum + Number(listing.quantity || 0),
        0,
      ),
    [activeListings],
  );

  const totalValue = useMemo(
    () =>
      activeListings.reduce(
        (sum, listing) =>
          sum +
          Number(listing.quantity || 0) * Number(listing.price || 0),
        0,
      ),
    [activeListings],
  );

  const uniqueOwners = useMemo(() => {
    const owners = new Set(
      listings
        .map((listing) => listing.ownerId || listing.userId || listing.owner)
        .filter(Boolean),
    );

    return owners.size;
  }, [listings]);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="min-h-screen lg:pl-64">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <header>
            <p className="text-sm font-medium text-primary">Administration</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Platform overview
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Monitor marketplace activity and overall workspace health.
            </p>
          </header>

          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total listings
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      {listings.length}
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
                      Active listings
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      {activeListings.length}
                    </p>
                  </div>

                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
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
                      Estimated value
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                      ₹{totalValue.toLocaleString(undefined, {
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
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Marketplace health
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Active listings
                      </span>
                      <span className="font-medium">
                        {activeListings.length}
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width:
                            listings.length > 0
                              ? `${Math.min(
                                  (activeListings.length / listings.length) *
                                    100,
                                  100,
                                )}%`
                              : "0%",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Pending review
                      </span>
                      <span className="font-medium">
                        {pendingListings.length}
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{
                          width:
                            listings.length > 0
                              ? `${Math.min(
                                  (pendingListings.length / listings.length) *
                                    100,
                                  100,
                                )}%`
                              : "0%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Participants
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="rounded-2xl border border-border/70 bg-muted/20 p-5">
                  <p className="text-sm text-muted-foreground">
                    Unique listing owners
                  </p>
                  <p className="mt-2 text-3xl font-semibold">
                    {uniqueOwners}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Based on the owners represented in the current client-side
                    listing data.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent listings</CardTitle>
              </CardHeader>

              <CardContent>
                {listings.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border p-10 text-center">
                    <ShieldCheck className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-3 font-medium">No listings available</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Marketplace activity will appear here when listings are
                      created.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {listings.slice(0, 8).map((listing) => (
                      <div
                        key={listing.id}
                        className="flex flex-col gap-3 rounded-2xl border border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {listing.title}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {listing.category || "Green credit"} ·{" "}
                            {Number(listing.quantity || 0).toLocaleString()}{" "}
                            credits
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium capitalize text-primary">
                            {listing.status || "active"}
                          </span>

                          <span className="text-sm font-medium">
                            ₹{Number(listing.price || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}