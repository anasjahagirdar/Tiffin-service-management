import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Dashboard() {

  const navigate = useNavigate();
  const [subs, setSubs] = useState([]);
  const [skipDate, setSkipDate] = useState("");
  const [bill, setBill] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
      return;
    }

    // Load subscriptions
    axios.get("http://127.0.0.1:8000/api/subscriptions/my/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setSubs(res.data))
    .catch(() => navigate("/login"));

    // Load billing
    axios.get("http://127.0.0.1:8000/api/billing/my/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBill(res.data.total_bill));

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    navigate("/login");
  };

  const skipMeal = () => {

    const token = localStorage.getItem("access");

    if (!skipDate) {
      alert("Pick a date first");
      return;
    }

    axios.post(
      "http://127.0.0.1:8000/api/deliveries/skip/",
      { date: skipDate, reason: "User skipped" },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      alert("Meal skipped");
      window.location.reload();
    })
    .catch(() => alert("Skip failed"));

  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600"
          >
            Logout
          </Button>
        </div>

        {/* Bill Card */}
        {bill !== null && (
          <Card className="p-6 mb-6 shadow-md">
            <h3 className="text-xl font-semibold">
              Total Bill
            </h3>
            <p className="text-3xl font-bold mt-2 text-green-600">
              ₹{bill}
            </p>
          </Card>
        )}

        {/* Skip Meal Card */}
        <Card className="p-6 mb-6 shadow-md">
          <h3 className="font-semibold mb-4 text-lg">
            Skip a Meal
          </h3>

          <div className="flex gap-4 items-center">
            <input
              type="date"
              className="border p-2 rounded"
              onChange={(e) => setSkipDate(e.target.value)}
            />

            <Button
              onClick={skipMeal}
              className="bg-red-500 hover:bg-red-600"
            >
              Skip Meal
            </Button>
          </div>
        </Card>

        {/* Subscriptions */}
        <Card className="p-6 shadow-md">
          <h3 className="font-semibold mb-4 text-lg">
            My Subscriptions
          </h3>

          {subs.length === 0 && (
            <p className="text-gray-500">
              No active subscriptions.
            </p>
          )}

          {subs.map((s) => (
            <div
              key={s.id}
              className="border rounded-lg p-4 mb-3 bg-gray-50"
            >
              <p><strong>Meal Plan ID:</strong> {s.meal_plan}</p>
              <p><strong>Status:</strong> {s.status}</p>
            </div>
          ))}
        </Card>

      </div>

    </div>
  );
}

export default Dashboard;