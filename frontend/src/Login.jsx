import { useState } from "react";
import { useNavigate, Link, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Loader2, Sparkles, UtensilsCrossed } from "lucide-react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("access");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        { username, password }
      );

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });

    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=2400&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-white max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs sm:text-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Food-first, Zomato-inspired UI
            </div>
            <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
              Log in to manage subscriptions, skip meals, and track billing.
            </p>
          </div>

          <div className="w-full">
            <div className="rounded-3xl border border-white/15 bg-white/95 p-6 sm:p-8 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="flex items-center gap-2 text-slate-900">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <UtensilsCrossed className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold tracking-tight">
                    Login
                  </div>
                  <div className="text-sm text-slate-600">
                    Access your dashboard.
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="mt-5 space-y-3">
                <input
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  type="password"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:shadow transition disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Logging in…
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <p className="mt-5 text-center text-sm text-slate-600">
                Don’t have an account?{" "}
                <Link to="/signup" className="font-semibold text-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
