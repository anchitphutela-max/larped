import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { LarpedLogo } from "@/components/LarpedLogo";
import { PublicNav } from "@/components/PublicNav";
import { CBAMCalculator } from "@/components/CBAMCalculator";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Compliance made simple",
    description:
      "Track carbon obligations, identify exposure, and prepare for changing reporting requirements.",
  },
  {
    icon: TrendingUp,
    title: "Turn sustainability into value",
    description:
      "Discover verified green-credit opportunities and connect environmental progress with business value.",
  },
  {
    icon: Sparkles,
    title: "Automated decision support",
    description:
      "Use clear insights, structured data, and practical workflows to make better carbon decisions.",
  },
];

const steps = [
  "Understand your carbon exposure",
  "Explore suitable compliance and credit opportunities",
  "Track actions, documentation, and progress",
];

export default function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <PublicNav />

      <section className="relative isolate">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-[-12rem] top-32 h-[28rem] w-[28rem] rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm text-primary">
              <Leaf className="h-4 w-4" />
              Carbon Compliance, Automated.
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
              Build a cleaner business with{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent">
                smarter carbon decisions.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Larped brings carbon compliance, emissions visibility, and green
              credit opportunities into one focused workspace for modern
              businesses.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/signup">
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link to="/solutions">Explore solutions</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Built for business teams
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Clear sustainability workflows
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-primary/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Carbon overview
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold">
                    Your sustainability workspace
                  </h2>
                </div>
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Leaf className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                  <p className="text-sm text-muted-foreground">
                    Compliance visibility
                  </p>
                  <p className="mt-2 text-2xl font-semibold">360°</p>
                  <p className="mt-1 text-xs text-primary">
                    Centralized monitoring
                  </p>
                </div>

                <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                  <p className="text-sm text-muted-foreground">
                    Decision support
                  </p>
                  <p className="mt-2 text-2xl font-semibold">Real-time</p>
                  <p className="mt-1 text-xs text-primary">
                    Structured insights
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-border/70 bg-background/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">
                      Sustainability progress
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Keep actions and documentation organized.
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    Active
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-primary to-emerald-300" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Designed to make carbon decisions easier to understand and
                  easier to act on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              One connected workflow
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything your team needs to move from reporting to action.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-border/70 bg-card/70 p-6"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Make every sustainability step more actionable.
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-muted-foreground">
            From understanding your exposure to exploring green-credit
            opportunities, Larped helps your team organize the journey in one
            place.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card/60 p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {index + 1}
              </div>
              <div>
                <h3 className="font-medium">{step}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  A clear, organized step in your carbon-management workflow.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Explore your exposure
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start with a simple CBAM estimate.
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              Use the calculator to understand the potential carbon-cost
              exposure of an imported product scenario.
            </p>
          </div>

          <CBAMCalculator />
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <LarpedLogo />
          <p className="text-sm text-muted-foreground">
            Carbon Compliance, Automated.
          </p>
        </div>
      </footer>
    </main>
  );
}