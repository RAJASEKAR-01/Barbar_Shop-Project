# 💈 Jeeva Beauty Saloon — Full Stack Frontend Web App

> A production-ready barbershop booking platform built with **React + Vite**, deployed live on **Vercel**.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.3.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.7-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)

**🌐 Live Demo:** [your-vercel-url.vercel.app](http://jeevabeautysaloon.vercel.app/)  
**📍 Built for:** Jeeva Beauty Saloon, Tiruppur, Tamil Nadu, India 🇮🇳

---

## 📸 Screenshots

> *(Add your screenshots here — Home page, Booking page, Admin Dashboard)*

---

## 📖 About The Project

This is a **complete business web application** built for a real barbershop. It goes far beyond a static landing page — featuring a multi-step booking wizard, admin dashboard, service cart with live total calculator, gallery lightbox, WhatsApp integration, and dark/light mode toggle — all built with modern React best practices.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| ⚛️ React | 18.3.1 | UI Framework |
| ⚡ Vite | 5.3.4 | Build Tool & Dev Server |
| 🎨 Tailwind CSS | 3.4.7 | Utility-first Styling |
| 🎭 Framer Motion | 11.3.0 | Page Transitions & Animations |
| 🔀 React Router | v6.26.0 | Client-side Routing |
| 🔔 React Hot Toast | 2.4.1 | Notification System |
| 📅 React DatePicker | 7.3.0 | Booking Calendar |
| 🖼️ Lucide React | 0.383.0 | Icon Library |
| 📆 date-fns | 3.6.0 | Date Formatting |
| ☁️ Vercel | — | Hosting & Deployment |

---

## ✨ Features

### 👤 Customer Side
- 🏠 **Hero Landing Page** — Animated marquee ticker, scroll-reveal effects, parallax image
- 💇 **Services Page** — Category filter (All / Hair / Beard / Skin / Packages) with click-to-add cart
- 🛒 **Service Cart** — Live total calculator, add/remove services, visible across all pages
- 📅 **5-Step Booking Wizard**
  - Step 1 → Select services
  - Step 2 → Choose your barber
  - Step 3 → Pick date & time slot
  - Step 4 → Enter your details
  - Step 5 → Review & confirm with WhatsApp notification
- 🖼️ **Gallery** — Photo grid with full-screen lightbox and keyboard navigation (← → Esc)
- 📞 **Contact Page** — Working hours table with today highlight, Google Maps embed, enquiry form
- 💬 **WhatsApp Button** — Floating on every page with pre-filled booking message
- 🌙 **Dark / Light Mode** — Global theme toggle with smooth transition

### 🔒 Admin Side
- Password-protected dashboard at `/admin`
- View all bookings in a full data table
- Update booking status — Confirmed / Completed / Cancelled
- Revenue stats, today's appointment count
- Expand any booking row for full customer details
- WhatsApp customers directly from the dashboard
- Password secured via **Vercel Environment Variables** (never hardcoded)

### ⚙️ Technical Highlights
- Global state with **React Context API** (cart, bookings, theme)
- Booking data persisted in **localStorage**
- Scroll-reveal animations using **Intersection Observer API**
- Smooth page transitions with **Framer Motion AnimatePresence**
- Fully **responsive** — mobile, tablet, desktop
- **vercel.json** rewrites for React Router to work on live server

---

## 📁 Project Structure
