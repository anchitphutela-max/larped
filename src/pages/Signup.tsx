import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Building2, Leaf, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";

import { LarpedLogo } from "@/components/LarpedLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { user, signup } = useAuth();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !company.trim() ||
      !email.trim() ||
      !password
    ) {
      toast.error("Please complete all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await Promise.resolve(
        signup({
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          password,
        }),
      );

      toast.success("Account created successfully.");
      navigate("/dashboard", { replace: true });
    } catch {
      toast.error("Unable to create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-card/80 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
        <section className="hidden flex-col justify-between bg-primary/10 p-10 lg:flex">
          <div>
            <LarpedLogo />

            <div className="mt-20 max-w-md">
              <div className="mb-5 inline-flex rounded-2xl bg-primary/10 p-4 text-primary">
                <Leaf className="h-7 w-7" />
              </div>

              <h1 className="text-4xl font-semibold tracking-tight">
                Build a more transparent carbon strategy.
              </h1>

              <p className="mt-5 leading-8 text-muted-foreground">
                Create your Larped workspace and bring compliance,
                sustainability actions, and green-credit opportunities
                together.
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Carbon Compliance, Automated.
          </p>
        </section>

        <section className="p-6 sm:p-10">
          <div className="mb-8 lg:hidden">
            <LarpedLogo />
          </div>

          <div className="mx-auto max-w-md">
            <div>
              <p className="text-sm font-medium text-primary">Get started</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Create your account
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Set up your workspace to start managing carbon compliance.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company name"
                    className="pl-9"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="pl-9"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className="pl-9"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
              This demo uses client-side authentication and local storage.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}