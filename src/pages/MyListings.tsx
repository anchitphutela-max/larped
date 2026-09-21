import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  CircleDollarSign,
  Edit3,
  Leaf,
  Plus,
  Store,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { AppSidebar } from "@/components/AppSidebar";
import { CreateListingDialog } from "@/components/CreateListingDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LISTINGS_CHANGED_EVENT,
  loadListings,
  saveListings,
  type Listing,
} from "@/data/mockData";

export default function MyListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

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
        (sum, listing) => sum + Number(listing.quantity || 0),
        0,
      ),
    [activeListings],
  );

  const handleCreate = () => {
    setEditingListing(null);
    setDialogOpen(true);
  };

  const handleEdit = (listing: Listing) => {
    setEditingListing(listing);
    setDialogOpen(true);
  };

  const handleDelete = (listing: Listing) => {
    const nextListings = listings.filter((item) => item.id !== listing.id);
    saveListings(nextListings);
    setListings(nextListings);
    toast.success("Listing removed.");
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="min-h-screen lg:pl-64">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                to="/dashboard"
                className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to dashboard
              </Link>

              <h1 className="text-3xl font-semibold tracking-tight">
                My listings
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Create and manage your green-credit marketplace listings.
              </p>
            </div>

            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4" />
              Create listing
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
                      Credits available
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
          </div>

          <section className="mt-8">
            {listings.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <div className="rounded-2xl bg-primary/10 p-4 text-primary">
                    <Store className="h-7 w-7" />
                  </div>

                  <h2 className="mt-5 text-xl font-semibold">
                    No listings yet
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    Create your first green-credit listing to make it
                    available in the marketplace.
                  </p>

                  <Button className="mt-6" onClick={handleCreate}>
                    <Plus className="h-4 w-4" />
                    Create your first listing
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {listings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden">
                    {listing.image ? (
                      <div className="aspect-[16/8] overflow-hidden bg-muted">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : null}

                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle className="line-clamp-2">
                            {listing.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {listing.category || "Green credit"}
                          </CardDescription>
                        </div>

                        <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                          {listing.status || "active"}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {listing.description ||
                          "No description provided for this listing."}
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-border/70 bg-muted/20 p-3">
                          <p className="text-xs text-muted-foreground">
                            Quantity
                          </p>
                          <p className="mt-1 font-semibold">
                            {Number(listing.quantity || 0).toLocaleString()}
                          </p>
                        </div>

                        <div className="rounded-xl border border-border/70 bg-muted/20 p-3">
                          <p className="text-xs text-muted-foreground">
                            Price
                          </p>
                          <p className="mt-1 inline-flex items-center gap-1 font-semibold">
                            <CircleDollarSign className="h-4 w-4 text-primary" />
                            {Number(listing.price || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleEdit(listing)}
                        >
                          <Edit3 className="h-4 w-4" />
                          Edit
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete ${listing.title}`}
                          onClick={() => handleDelete(listing)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <CreateListingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        listing={editingListing}
      />
    </div>
  );
}