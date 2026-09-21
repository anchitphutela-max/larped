import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  FileSearch,
  Leaf,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { PublicNav } from "@/components/PublicNav";
import { Button } from "@/components/ui/button";

const principles = [
  {
    icon: Database,
    title: "Start with the data",
    description:
      "Use relevant business and sustainability information as the foundation for carbon-related decisions.",
  },
  {
    icon: FileSearch,
    title: "Make the logic visible",
    description:
      "Break complex carbon workflows into understandable inputs, calculations, assumptions, and outcomes.",
  },
  {
    icon: ShieldCheck,
    title: "Keep decisions accountable",
    description:
      "Support human review and clear documentation where decisions have meaningful compliance or financial consequences.",
  },
  {
    icon: RefreshCw,
    title: "Improve continuously",
    description:
      "Treat carbon management as an ongoing process rather than a one-time reporting exercise.",
  },
];

const process = [
  {
    number: "01",
    title: "Collect",
    description:
      "Bring together the information needed to understand emissions, imports, compliance requirements, and sustainability activity.",
  },
  {
    number: "02",
    title: "Calculate",
    description:
      "Apply transparent calculations to convert relevant inputs into useful carbon and compliance indicators.",
  },
  {
    number: "03",
    title: "Assess",
    description:
      "Interpret the results in the context of business requirements, exposure, opportunities, and available actions.",
  },
  {
    number: "04",
    title: "Act",
    description:
      "Use the resulting insights to guide compliance activity, documentation, listings, and sustainability decisions.",
  },
  {
    number: "05",
    title: "Review",
    description:
      "Monitor changes, validate assumptions, and update the workflow as new information becomes available.",
  },
];

export default function Methodology() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-20rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-[-12rem] top-24 h-[28rem] w-[28rem] rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm text-primary">
              <Leaf className="h-4 w-4" />
              Our methodology
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Clear carbon decisions start with a{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent">
                clear process.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Larped is built around a structured approach that connects
              carbon data, transparent calculations, practical assessment, and
              continuous review.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Principles
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Designed around transparency and action.
          </h2>

          <p className="mt-4 leading-8 text-muted-foreground">
            The methodology keeps the workflow understandable so teams can
            connect information to decisions without losing sight of the
            underlying assumptions.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <article
                key={principle.title}
                className="rounded-2xl border border-border/70 bg-card/60 p-6"
              >
                <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {principle.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {principle.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                The Larped cycle
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                From information to continuous improvement.
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                Each stage builds on the previous one, creating a repeatable
                workflow for managing carbon-related business decisions.
              </p>
            </div>

            <div className="space-y-4">
              {process.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-5 rounded-2xl border border-border/70 bg-card/70 p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border/70 bg-card/60 p-8">
            <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary">
              <BarChart3 className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-2xl font-semibold">
              Transparent calculations
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              Tools such as the CBAM calculator are designed to make the
              relationship between inputs and estimated carbon exposure easier
              to understand.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Inputs remain visible",
                "Calculations follow a defined structure",
                "Results are presented as estimates where appropriate",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
            <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-2xl font-semibold">
              Human-readable decisions
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              Larped focuses on turning carbon information into understandable
              business context rather than hiding important assumptions behind
              opaque outputs.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Explain the relevant inputs",
                "Surface assumptions and context",
                "Keep important decisions reviewable",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Put the methodology to work
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Build your carbon workflow with Larped.
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Start with your business context, explore the available tools,
              and turn sustainability information into structured action.
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