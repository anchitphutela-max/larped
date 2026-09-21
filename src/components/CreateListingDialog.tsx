import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Check } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import {
  CATEGORIES,
  IMAGES,
  QUALITY_RATINGS,
  SDG_LABELS,
  SEED_LISTINGS,
  VERIFIERS,
  generateId,
  loadListings,
  saveListings,
  type Listing,
} from "@/data/mockData";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface CreateListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (listing: Listing) => void;
}

const listingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  category: z.enum(CATEGORIES),
  price: z
    .number({
      invalid_type_error: "Enter a number.",
    })
    .positive("Price must be greater than 0."),
  credits: z
    .number({
      invalid_type_error: "Enter a number.",
    })
    .positive("Credits must be greater than 0."),
  location: z.string().min(2, "Location is required."),
  verifiedBy: z.string().min(1, "Select a verification body."),
  qualityRating: z.enum(QUALITY_RATINGS),
  sdgGoals: z.array(z.number()).min(1, "Select at least one SDG."),
  image: z.string().min(1, "Select a project image."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters."),
});

type ListingFormValues = z.infer<typeof listingSchema>;

export function readListings(): Listing[] {
  try {
    return loadListings();
  } catch {
    return SEED_LISTINGS.map((listing) => ({
      ...listing,
      sdgGoals: [...listing.sdgGoals],
    }));
  }
}

const imageEntries = Object.entries(IMAGES);

export default function CreateListingDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateListingDialogProps) {
  const { user } = useAuth();

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      category: CATEGORIES[0],
      price: undefined,
      credits: undefined,
      location: "",
      verifiedBy: VERIFIERS[0],
      qualityRating: QUALITY_RATINGS[0],
      sdgGoals: [],
      image: IMAGES.solarFarm,
      description: "",
    },
  });

  const selectedSdgs = form.watch("sdgGoals");
  const selectedImage = form.watch("image");

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const toggleSdg = (sdg: number) => {
    const current = form.getValues("sdgGoals");

    const next = current.includes(sdg)
      ? current.filter((value) => value !== sdg)
      : [...current, sdg].sort((a, b) => a - b);

    form.setValue("sdgGoals", next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (values: ListingFormValues) => {
    if (!user) {
      toast.error("You must be logged in to create a listing.");
      return;
    }

    const listing: Listing = {
      id: generateId("lst"),
      title: values.title,
      category: values.category,
      price: values.price,
      credits: values.credits,
      location: values.location,
      verifiedBy: values.verifiedBy,
      qualityRating: values.qualityRating,
      sdgGoals: [...values.sdgGoals],
      image: values.image,
      ownerId: user.id,
      status: "pending",
      description: values.description,
      createdAt: new Date().toISOString(),
    };

    const listings = readListings();
    saveListings([...listings, listing]);

    toast.success("Project submitted for approval.");
    onCreated?.(listing);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create a Green Credit Project</DialogTitle>
          <DialogDescription>
            Add your project details. New listings are submitted as pending
            until reviewed by the compliance desk.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="listing-title">Project title</Label>
              <Input
                id="listing-title"
                placeholder="e.g. Rajasthan Solar Farm"
                aria-invalid={!!form.formState.errors.title}
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Controller
                name="category"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.category && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="listing-location">Location</Label>
              <Input
                id="listing-location"
                placeholder="e.g. Rajasthan, India"
                aria-invalid={!!form.formState.errors.location}
                {...form.register("location")}
              />
              {form.formState.errors.location && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="listing-price">Price (₹ / tCO₂e)</Label>
              <Input
                id="listing-price"
                type="number"
                min="0"
                step="0.01"
                aria-invalid={!!form.formState.errors.price}
                {...form.register("price", { valueAsNumber: true })}
              />
              {form.formState.errors.price && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="listing-credits">
                Available credits (tCO₂e)
              </Label>
              <Input
                id="listing-credits"
                type="number"
                min="0"
                step="1"
                aria-invalid={!!form.formState.errors.credits}
                {...form.register("credits", { valueAsNumber: true })}
              />
              {form.formState.errors.credits && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.credits.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Verification body</Label>
              <Controller
                name="verifiedBy"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {VERIFIERS.map((verifier) => (
                        <SelectItem key={verifier} value={verifier}>
                          {verifier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.verifiedBy && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.verifiedBy.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Quality rating</Label>
              <Controller
                name="qualityRating"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {QUALITY_RATINGS.map((rating) => (
                        <SelectItem key={rating} value={rating}>
                          {rating}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.qualityRating && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.qualityRating.message}
                </p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Project image</Label>
              <Controller
                name="image"
                control={form.control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {imageEntries.map(([key, image]) => {
                      const selected = field.value === image;

                      return (
                        <button
                          key={key}
                          type="button"
                          aria-label={`Select ${key} project image`}
                          aria-pressed={selected}
                          onClick={() => field.onChange(image)}
                          className={`group relative aspect-video overflow-hidden rounded-xl border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                            selected
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${key} project`}
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.src = IMAGES.forestCanopy;
                            }}
                            className="h-full w-full object-cover transition group-hover:scale-105"
                          />

                          {selected && (
                            <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {form.formState.errors.image && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.image.message}
                </p>
              )}
            </div>

            <div className="space-y-3 sm:col-span-2">
              <div>
                <Label>SDG goals</Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Select the UN Sustainable Development Goals supported by
                  this project.
                </p>
              </div>

              <Controller
                name="sdgGoals"
                control={form.control}
                render={() => (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {Object.entries(SDG_LABELS).map(([id, label]) => {
                      const number = Number(id);
                      const checked = selectedSdgs.includes(number);

                      return (
                        <label
                          key={id}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 p-2.5 transition-colors hover:bg-muted/40"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={() => toggleSdg(number)}
                            aria-label={`SDG ${number}: ${label}`}
                          />
                          <span className="text-xs">
                            <span className="font-semibold">
                              SDG {number}
                            </span>{" "}
                            <span className="text-muted-foreground">
                              {label}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              />

              {form.formState.errors.sdgGoals && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.sdgGoals.message}
                </p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="listing-description">Description</Label>
              <Textarea
                id="listing-description"
                rows={5}
                placeholder="Describe the project, technology, environmental impact and verification details..."
                aria-invalid={!!form.formState.errors.description}
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Submitting..."
                : "Submit Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { CreateListingDialog };