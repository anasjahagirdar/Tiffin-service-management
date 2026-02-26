# 🍱 Tiffin Service Management System

A full-stack SaaS-style meal subscription platform built with:

- Django REST Framework
- React (Vite)
- JWT Authentication
- SQLite
- Tailwind CSS
- shadcn/ui

---

## 🚀 Features

### 🔐 Authentication
- JWT Login & Registration
- Protected Routes
- Auto Redirect
- Logout functionality

### 🍽 Meal Plans
- Veg / Non-Veg plans
- Public listing page
- Subscribe from UI

### 📦 Subscription System
- Create subscriptions
- View active plans
- Dashboard portal

### ⏸ Skip Meal Feature
- Skip specific dates
- Stored in database
- Billing auto-adjusts

### 💰 Billing Engine
- Calculates active days
- Subtracts skipped meals
- Displays total bill in dashboard

---

## 🏗 Project Structure

```
tiffin-service/
 ├── backend/
 └── frontend/
```

---

## 🛠 Tech Stack

Backend:
- Django
- Django REST Framework
- SimpleJWT

Frontend:
- React
- Axios
- React Router
- Tailwind CSS
- shadcn/ui

---

## ▶️ Run Locally

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Future Improvements
- Payment integration
- Admin UI dashboard
- Email notifications
- Deployment to cloud

---

## 👨‍💻 Author
Built as a full-stack SaaS simulation project.