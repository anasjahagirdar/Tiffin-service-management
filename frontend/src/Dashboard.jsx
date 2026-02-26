import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CalendarX,
  CreditCard,
  LogOut,
  PackageOpen,
  Sparkles,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [subs, setSubs] = useState([]);
  const [skipDate, setSkipDate] = useState("");
  const [bill, setBill] = useState(null);
  const [notice, setNotice] = useState("");
  const token = localStorage.getItem("access");

  const logout = useCallback(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login", { replace: true });
  }, [navigate]);

  const loadSubscriptions = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/subscriptions/my/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubs(res.data);
    } catch (err) {
      if (err?.response?.status === 401) {
        logout();
        return;
      }
      console.log("Subscription error:", err.response?.data);
    }
  }, [logout, token]);

  const loadBilling = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/billing/my/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBill(res.data.total_bill);
    } catch (err) {
      if (err?.response?.status === 401) {
        logout();
        return;
      }
      console.log("Billing error:", err.response?.data);
    }
  }, [logout, token]);

  useEffect(() => {
    loadSubscriptions();
    loadBilling();
  }, [loadBilling, loadSubscriptions]);

  const skipMeal = async () => {
    setNotice("");
    if (!skipDate) {
      setNotice("Pick a date first.");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/deliveries/skip/",
        { date: skipDate, reason: "User skipped" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotice("Meal skipped successfully.");
      loadSubscriptions();
    } catch {
      setNotice("Skip failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-slate-600" />
              Your account
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Billing, skip requests, and subscriptions in one place.
            </p>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {notice && (
          <div className="mt-6 rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
            {notice}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-700">
                    Total bill
                  </div>
                  <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                    {bill === null ? "—" : `₹${bill}`}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    Based on active subscriptions and skipped meals.
                  </div>
                </div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <CreditCard className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-slate-700">
                    Skip a meal
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    Choose a date and submit a skip request.
                  </div>
                </div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700">
                  <CalendarX className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <input
                  type="date"
                  className="h-11 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  value={skipDate}
                  onChange={(e) => setSkipDate(e.target.value)}
                />

                <button
                  onClick={skipMeal}
                  className="h-11 rounded-2xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:shadow transition"
                >
                  Skip meal
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-slate-700">
                    My subscriptions
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    Active plans and status.
                  </div>
                </div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700">
                  <PackageOpen className="h-6 w-6" />
                </div>
              </div>

              {subs.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
                  <div className="text-base font-medium text-slate-900">
                    No active subscriptions
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    Subscribe to a plan from Meal Plans.
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {subs.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-2xl border border-black/5 bg-slate-50 p-5 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold text-slate-900">
                          Plan #{s.meal_plan}
                        </div>
                        <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                          {s.status}
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-slate-600">
                        Started: {s.start_date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
