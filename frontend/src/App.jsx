import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ArrowRight, LogOut, Menu, Sparkles, X } from "lucide-react";

import Signup from "./Signup";
import Login from "./Login";
import Meals from "./Meals";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";

/* -------------------- HOME -------------------- */

function Home() {
  const features = useMemo(
    () => [
      { title: "Home-style", subtitle: "Fresh, hygienic meals daily" },
      { title: "Flexible", subtitle: "Skip meals anytime" },
      { title: "Reliable", subtitle: "On-time delivery" },
    ],
    []
  );

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=2400&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-white/0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs sm:text-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-white/90" />
            Premium tiffin experience, Home-style meals, delivered fresh
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
            Delicious meals,
            <span className="block text-white/90">delivered like clockwork</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed">
            Modern, food-first subscriptions with clean billing, beautiful cards,
            and a smooth ordering flow.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/meals"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm sm:text-base font-medium text-primary-foreground shadow-lg shadow-black/10 hover:shadow-xl transition"
            >
              Explore meal plans
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-sm sm:text-base font-medium text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/15 transition"
            >
              View dashboard
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur"
              >
                <div className="text-base font-semibold">{f.title}</div>
                <div className="mt-1 text-sm text-white/75">{f.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- APP -------------------- */

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = localStorage.getItem("access");

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              🍱
            </span>
            Tiffin
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              Home
            </Link>
            <Link
              to="/meals"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              Meal Plans
            </Link>

            <div className="ml-2 flex items-center gap-2">
              {!token ? (
                <>
                  <Link
                    to="/login"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:shadow transition"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 transition"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-black/5 bg-white/90 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-col gap-2">
              <Link
                to="/"
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                Home
              </Link>
              <Link
                to="/meals"
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                Meal Plans
              </Link>

              {!token ? (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to="/login"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:shadow transition text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to="/dashboard"
                    className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition text-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
