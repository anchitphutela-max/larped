import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import PublicNav from "@/components/PublicNav";
import AppSidebar from "@/components/AppSidebar";
import LarpedLogo from "@/components/LarpedLogo";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Solutions from "@/pages/Solutions";
import Methodology from "@/pages/Methodology";
import Dashboard from "@/pages/Dashboard";
import MyListings from "@/pages/MyListings";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border/60 py-10">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <LarpedLogo />
          <p className="text-center text-sm text-muted-foreground sm:text-right">
            &copy; {new Date().getFullYear()} Larped. Demo platform &mdash; all
            data is stored locally in your browser.
          </p>
        </div>
      </footer>
    </div>
  );
}

function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <TooltipProvider delayDuration={150}>
        <AppSidebar />
      </TooltipProvider>
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

function RequireAuth({ adminOnly = false }: { adminOnly?: boolean }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

const App = () => (
  <TooltipProvider delayDuration={150}>
    <AuthProvider>
      <Toaster />
      <Sonner position="top-right" richColors closeButton />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/listings" element={<MyListings />} />
            </Route>
          </Route>

          <Route element={<RequireAuth adminOnly />}>
            <Route element={<AppLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </TooltipProvider>
);

export default App;