import { Link } from "react-router-dom";
import { ArrowLeft, Leaf } from "lucide-react";

import { LarpedLogo } from "@/components/LarpedLogo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-18rem] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-12rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-xl text-center">
        <div className="mb-10 flex justify-center">
          <LarpedLogo />
        </div>

        <div className="mx-auto inline-flex rounded-2xl bg-primary/10 p-4 text-primary">
          <Leaf className="h-8 w-8" />
        </div>

        <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-5 max-w-md leading-7 text-muted-foreground">
          The page you are looking for does not exist or may have been moved.
          Let&apos;s get you back to your Larped workspace.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Back to dashboard
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link to="/">Go to homepage</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}