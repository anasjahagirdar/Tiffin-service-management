import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";

/* -------------------- HOME -------------------- */

function Home() {
  return (
    <div
      className="relative h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

      <div className="relative text-center max-w-2xl px-6">
        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
          Delicious Meals <br />
          Delivered Daily 🍱
        </h1>

        <p className="text-lg mb-8 text-gray-200">
          Fresh, hygienic and home-style food delivered to your doorstep.
        </p>

        <Link
          to="/meals"
          className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-lg"
        >
          Explore Meal Plans
        </Link>
      </div>
    </div>
  );
}

/* -------------------- ABOUT -------------------- */

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-100">

      {/* Hero Section */}
      <div className="relative h-[300px] flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <h1 className="relative text-4xl md:text-5xl font-bold">
          About Tiffin Service 🍱
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At Tiffin Service, we aim to deliver fresh, hygienic, and home-style
            meals to students and working professionals. Our goal is to make
            healthy food affordable and accessible without compromising quality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">🥗 Fresh Ingredients</h3>
            <p className="text-gray-600">
              We use high-quality, fresh ingredients sourced daily to ensure
              nutritious and delicious meals.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">🚚 Fast Delivery</h3>
            <p className="text-gray-600">
              Timely delivery ensures your meals arrive hot and fresh at your
              doorstep every single day.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">💰 Affordable Plans</h3>
            <p className="text-gray-600">
              Our subscription plans are designed for students and professionals
              who want quality food at reasonable prices.
            </p>
          </div>

        </div>

        {/* Closing Section */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold mb-4">
            Made with ❤️ for Food Lovers
          </h2>
          <p className="text-gray-600">
            Join hundreds of happy customers who trust Tiffin Service
            for their daily meals.
          </p>
        </div>

      </div>
    </div>
  );
}

/* -------------------- MEALS -------------------- */

function Meals() {
  const [plans, setPlans] = useState([]);

  // Stable high-quality food images
  const foodImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    "https://images.unsplash.com/photo-1553621042-f6e147245754",
    "https://images.unsplash.com/photo-1505253758473-96b7015fcd40",
    "https://images.unsplash.com/photo-1529042410759-befb1204b468",
    "https://images.unsplash.com/photo-1543352634-8737b4c7e0cb",
    "https://images.unsplash.com/photo-1504674900247-ec6c6f1a6c7d",
    "https://images.unsplash.com/photo-1478147427282-58a87a120781",
  ];

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/meals/plans/")
      .then((res) => {
        setPlans(res.data.results || res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const subscribe = (id) => {
    const token = localStorage.getItem("access");

    if (!token) {
      alert("Login first!");
      return;
    }

    axios
      .post(
        "http://127.0.0.1:8000/api/subscriptions/create/",
        {
          meal_plan: id,
          start_date: new Date().toISOString().split("T")[0],
          status: "active",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => alert("Subscribed!"))
      .catch(() => alert("Subscription failed"));
  };

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-b from-red-50 via-white to-red-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Our Meal Plans 🍽
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={`${foodImages[index % foodImages.length]}?auto=format&fit=crop&w=600&q=80`}
                  alt={p.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80";
                  }}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{p.name}</h3>

                <p className="text-gray-500 mb-3 capitalize">
                  {p.plan_type} Plan
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-red-600">
                    ₹{p.price_per_day} / day
                  </span>

                  <button
                    onClick={() => subscribe(p.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------- APP -------------------- */

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("access"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-red-600 hover:scale-105 transition"
          >
            Tiffin🍱
          </Link>

          <div className="flex items-center gap-6 font-medium">
            <Link to="/" className="hover:text-red-600 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-red-600 transition">
              About
            </Link>
            <Link to="/meals" className="hover:text-red-600 transition">
              Meal Plans
            </Link>

            {!isLoggedIn && (
                      <>
                        <Link to="/login" className="hover:text-red-600 transition">
                          Login
                        </Link>

                        <Link to="/signup" className="hover:text-red-600 transition">
                          Sign Up
                        </Link>
                      </>
                    )}

            {isLoggedIn && (
              <Link to="/dashboard" className="hover:text-red-600 transition">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
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
    </BrowserRouter>
  );
}

export default App;