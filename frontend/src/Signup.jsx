import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Loader2, ShieldCheck, Sparkles } from "lucide-react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.post("http://127.0.0.1:8000/api/users/register/", {
        username,
        password,
        email: email || "",
        phone: phone || "",
        address: address || "",
      });

      navigate("/login", { replace: true });
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        (typeof err?.response?.data === "string" ? err.response.data : null);
      setError(detail || "Signup failed. Please review your details.");
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
            "url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=2400&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-white max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs sm:text-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Premium experience
            </div>
            <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight">
              Create your account
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
              Subscribe to meals, manage skips, and see billing in a clean,
              modern dashboard.
            </p>
          </div>

          <div className="w-full">
            <div className="rounded-3xl border border-white/15 bg-white/95 p-6 sm:p-8 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="flex items-center gap-2 text-slate-900">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold tracking-tight">
                    Sign up
                  </div>
                  <div className="text-sm text-slate-600">
                    It takes less than a minute.
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Phone (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="password"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="h-11 w-full sm:col-span-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Address (optional)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <button
                onClick={handleSignup}
                disabled={loading}
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:shadow transition disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating…
                  </>
                ) : (
                  "Create account"
                )}
              </button>

              <p className="mt-5 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
