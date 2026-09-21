import { useMemo, useState } from "react";
import { Calculator, Euro, IndianRupee, Leaf } from "lucide-react";

import AnimatedCounter from "@/components/AnimatedCounter";
import {
  CARBON_PRICE_EUR,
  CBAM_COMMODITIES,
  CBAM_ORIGINS,
  EUR_TO_INR,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CBAMCalculator() {
  const defaultCommodity = CBAM_COMMODITIES[0];
  const defaultOrigin =
    CBAM_ORIGINS.find((origin) => origin.id === "india") ??
    CBAM_ORIGINS[0];

  const [commodityId, setCommodityId] = useState(defaultCommodity.id);
  const [originId, setOriginId] = useState(defaultOrigin.id);
  const [quantity, setQuantity] = useState("1000");

  const calculation = useMemo(() => {
    const commodity =
      CBAM_COMMODITIES.find((item) => item.id === commodityId) ??
      defaultCommodity;

    const origin =
      CBAM_ORIGINS.find((item) => item.id === originId) ?? defaultOrigin;

    const parsedQuantity = Number(quantity);
    const safeQuantity =
      Number.isFinite(parsedQuantity) && parsedQuantity > 0
        ? parsedQuantity
        : 0;

    const emissions =
      safeQuantity * commodity.intensity * origin.factor;

    const liabilityEUR = emissions * CARBON_PRICE_EUR;
    const liabilityINR = liabilityEUR * EUR_TO_INR;

    return {
      commodity,
      origin,
      quantity: safeQuantity,
      emissions,
      liabilityEUR,
      liabilityINR,
    };
  }, [commodityId, originId, quantity, defaultCommodity, defaultOrigin]);

  const handleQuantityChange = (value: string) => {
    if (value === "") {
      setQuantity("");
      return;
    }

    const parsed = Number(value);

    if (Number.isFinite(parsed) && parsed >= 0) {
      setQuantity(value);
    }
  };

  return (
    <section className="glass-panel overflow-hidden rounded-2xl">
      <div className="border-b border-border/60 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Calculator className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              CBAM Liability Calculator
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Estimate the embedded carbon liability for an imported commodity.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="cbam-commodity">Commodity</Label>
            <Select value={commodityId} onValueChange={setCommodityId}>
              <SelectTrigger id="cbam-commodity">
                <SelectValue placeholder="Select commodity" />
              </SelectTrigger>
              <SelectContent>
                {CBAM_COMMODITIES.map((commodity) => (
                  <SelectItem key={commodity.id} value={commodity.id}>
                    {commodity.label} — {commodity.intensity} tCO₂e/t
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cbam-origin">Country of origin</Label>
            <Select value={originId} onValueChange={setOriginId}>
              <SelectTrigger id="cbam-origin">
                <SelectValue placeholder="Select origin" />
              </SelectTrigger>
              <SelectContent>
                {CBAM_ORIGINS.map((origin) => (
                  <SelectItem key={origin.id} value={origin.id}>
                    {origin.label} — ×{origin.factor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cbam-quantity">Import quantity (tonnes)</Label>
            <Input
              id="cbam-quantity"
              type="number"
              min="0"
              step="1"
              inputMode="decimal"
              value={quantity}
              onChange={(event) =>
                handleQuantityChange(event.target.value)
              }
              placeholder="Enter tonnes"
            />
            <p className="text-xs text-muted-foreground">
              Enter a positive quantity to calculate the estimated liability.
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Carbon price</span>
              <span className="font-medium">
                €{CARBON_PRICE_EUR}/tCO₂e
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between gap-4">
              <span className="text-muted-foreground">FX rate</span>
              <span className="font-medium">
                €1 = ₹{EUR_TO_INR}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
              <Leaf className="h-4 w-4" />
              Embedded emissions
            </div>

            <div className="flex items-end gap-2">
              <AnimatedCounter
                value={calculation.emissions}
                duration={500}
                decimals={0}
                className="text-3xl font-bold tracking-tight"
              />
              <span className="pb-1 text-sm text-muted-foreground">
                tCO₂e
              </span>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              {calculation.quantity.toLocaleString()} t ×{" "}
              {calculation.commodity.intensity} intensity ×{" "}
              {calculation.origin.factor} origin factor
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div
              className={cn(
                "rounded-2xl border border-border/60 bg-card/50 p-5",
                "transition-colors hover:border-primary/30",
              )}
            >
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Euro className="h-4 w-4" />
                Estimated liability
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-lg font-semibold">€</span>
                <AnimatedCounter
                  value={calculation.liabilityEUR}
                  duration={500}
                  decimals={0}
                  className="text-2xl font-bold"
                />
              </div>
            </div>

            <div
              className={cn(
                "rounded-2xl border border-border/60 bg-card/50 p-5",
                "transition-colors hover:border-primary/30",
              )}
            >
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <IndianRupee className="h-4 w-4" />
                INR equivalent
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-lg font-semibold">₹</span>
                <AnimatedCounter
                  value={calculation.liabilityINR}
                  duration={500}
                  decimals={0}
                  className="text-2xl font-bold"
                />
              </div>
            </div>
          </div>

          <div className="mt-auto rounded-xl bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground">
            Estimate only. Actual CBAM obligations depend on the applicable
            reporting methodology, verified embedded emissions and current
            certificate pricing.
          </div>
        </div>
      </div>
    </section>
  );
}

export { CBAMCalculator };