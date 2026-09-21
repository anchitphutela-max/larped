import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Leaf, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";

import { LarpedLogo } from "@/components/LarpedLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const redirectPath =
    typeof location.state?.from === "string"
      ? location.state.from
      : "/dashboard";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Enter your email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      await Promise.resolve(login(email.trim(), password));
      toast.success("Welcome back to Larped.");
      navigate(redirectPath, { replace: true });
    } catch {
      toast.error("Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-12rem] right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-emerald-400/10 blur-3xl" />
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
                Make carbon compliance part of your competitive advantage.
              </h1>
              <p className="mt-5 leading-8 text-muted-foreground">
                Access your sustainability workspace, review opportunities,
                and keep your carbon-management activities organized.
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
              <p className="text-sm font-medium text-primary">Welcome back</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Sign in to Larped
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Continue managing your carbon compliance and green-credit
                activities.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
                    autoComplete="current-password"
                    placeholder="Enter your password"
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
                {isSubmitting ? "Signing in..." : "Sign in"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Create one
              </Link>
            </p>

            <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
              By continuing, you agree to use this demo workspace for
              illustrative purposes.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}