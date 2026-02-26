import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Check, Leaf, Loader2, Sparkles } from "lucide-react";

function Meals() {
  const [plans, setPlans] = useState([]);
  const [subscribingId, setSubscribingId] = useState(null);
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("access");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/meals/plans/")
      .then((res) => {
        setPlans(res.data.results || res.data);
      })
      .catch(() => setPlans([]));
  }, []);

  const getFallbackImage = (plan) => {
    const query = encodeURIComponent(`${plan?.name || "meal"} food`);
    const sig = plan?.id || 1;
    return `https://source.unsplash.com/1200x800/?${query}&sig=${sig}`;
  };

  const subscribe = async (plan) => {
    setNotice("");
    if (!token) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }

    const startDate = new Date().toISOString().slice(0, 10);
    try {
      setSubscribingId(plan.id);
      await axios.post(
        "http://127.0.0.1:8000/api/subscriptions/create/",
        { meal_plan: plan.id, start_date: startDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotice("Subscribed successfully. Check your dashboard.");
    } catch {
      setNotice("Could not subscribe. Please try again.");
    } finally {
      setSubscribingId(null);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="rounded-3xl overflow-hidden border border-black/5 bg-white shadow-sm">
          <div className="relative">
            <div
              className="h-44 sm:h-56 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=2400&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-end">
              <div className="w-full px-5 sm:px-8 pb-5 sm:pb-8 text-white">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs sm:text-sm backdrop-blur">
                  <Sparkles className="h-4 w-4" />
                  Curated meal plans
                </div>
                <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
                  Choose a plan that fits your lifestyle
                </h2>
                <p className="mt-1 text-sm sm:text-base text-white/80 max-w-2xl">
                  Premium cards, rich images, and a one-click subscribe flow.
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-8 py-6 sm:py-8">
            {notice && (
              <div className="mb-6 rounded-2xl border border-black/5 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {notice}
              </div>
            )}

            {plans.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
                <div className="text-base font-medium text-slate-900">
                  No meal plans available
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  Add meal plans in the admin, then refresh this page.
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {plans.map((p) => {
                const img = p.image_url || getFallbackImage(p);
                const veg = (p.plan_type || "").toLowerCase() === "veg";
                const isLoading = subscribingId === p.id;

                return (
                  <div
                    key={p.id}
                    className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition duration-300"
                  >
                    <div className="relative h-44">
                      <img
                        src={img}
                        alt={p.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
                      <div className="absolute left-3 top-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm">
                          {veg ? <Leaf className="h-4 w-4 text-emerald-600" /> : null}
                          {veg ? "Veg" : "Non-Veg"}
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-lg font-semibold tracking-tight text-slate-900">
                            {p.name}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                            {p.description || "A delicious, balanced plan made for everyday life."}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="text-xs text-slate-500">Starting</div>
                          <div className="text-lg font-semibold text-slate-900">
                            ₹{p.price_per_day}
                            <span className="text-xs font-medium text-slate-500">/day</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => subscribe(p)}
                          disabled={isLoading}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:shadow transition disabled:opacity-70"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Subscribing…
                            </>
                          ) : (
                            <>
                              <Check className="h-4 w-4" />
                              Subscribe
                            </>
                          )}
                        </button>
                        <Link
                          to="/dashboard"
                          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meals;
