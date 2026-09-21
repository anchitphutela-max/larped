import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileCheck2,
  Leaf,
  LineChart,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import { PublicNav } from "@/components/PublicNav";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    icon: ShieldCheck,
    title: "Carbon compliance",
    description:
      "Organize compliance requirements and understand where your business may have carbon-cost exposure.",
    points: [
      "Track compliance-related activities",
      "Understand emissions and carbon exposure",
      "Keep key information organized",
    ],
  },
  {
    icon: BarChart3,
    title: "Emissions visibility",
    description:
      "Turn scattered sustainability information into a clearer view of your environmental performance.",
    points: [
      "Monitor relevant sustainability metrics",
      "Compare progress over time",
      "Support data-driven decisions",
    ],
  },
  {
    icon: WalletCards,
    title: "Green-credit marketplace",
    description:
      "Explore opportunities to list and discover environmental credits through a focused marketplace experience.",
    points: [
      "Create and manage listings",
      "Browse available opportunities",
      "Keep marketplace activity in one workspace",
    ],
  },
  {
    icon: FileCheck2,
    title: "Action & documentation",
    description:
      "Keep the operational side of carbon management connected to the decisions your team makes.",
    points: [
      "Organize supporting information",
      "Track actions and progress",
      "Make workflows easier to review",
    ],
  },
];

const workflow = [
  {
    number: "01",
    title: "Measure",
    description:
      "Start by understanding your emissions, imports, and relevant carbon exposure.",
  },
  {
    number: "02",
    title: "Assess",
    description:
      "Review compliance needs and identify opportunities that fit your sustainability goals.",
  },
  {
    number: "03",
    title: "Act",
    description:
      "Turn insights into concrete actions, documentation, and marketplace activity.",
  },
  {
    number: "04",
    title: "Track",
    description:
      "Keep progress visible so your team can continuously improve its carbon strategy.",
  },
];

export default function Solutions() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-20rem] h-[45rem] w-[45rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm text-primary">
              <Leaf className="h-4 w-4" />
              Larped solutions
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              One workspace for your{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent">
                carbon journey.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Larped connects compliance, carbon visibility, and green-credit
              workflows so business teams can move from understanding their
              exposure to taking action.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/signup">
                  Create your workspace
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link to="/methodology">See our methodology</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {solutions.map((solution) => {
            const Icon = solution.icon;

            return (
              <article
                key={solution.title}
                className="group rounded-3xl border border-border/70 bg-card/60 p-7 transition-colors hover:border-primary/30"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>

                  <CheckCircle2 className="h-5 w-5 text-primary/70" />
                </div>

                <h2 className="mt-7 text-2xl font-semibold">
                  {solution.title}
                </h2>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {solution.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {solution.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                The workflow
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                From carbon data to business action.
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                Larped is designed around a straightforward operating cycle:
                understand your position, assess what matters, take action,
                and keep improving.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {workflow.map((item) => (
                <div
                  key={item.number}
                  className="rounded-2xl border border-border/70 bg-card/70 p-6"
                >
                  <span className="text-sm font-semibold text-primary">
                    {item.number}
                  </span>

                  <h3 className="mt-3 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary">
              <LineChart className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight">
              Ready to make carbon management more actionable?
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Create a Larped workspace and explore the tools built around
              carbon compliance and sustainability decision-making.
            </p>
          </div>

          <Button asChild size="lg" className="mt-7 shrink-0 lg:mt-0">
            <Link to="/signup">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}