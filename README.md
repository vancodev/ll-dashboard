# 📊 App Usage Insights Dashboard

## Introduction

This project is a modern, responsive dashboard built with **Next.js** and **TypeScript** for visualizing SaaS application usage across linked, unlinked, inactive, and abandoned accounts. It helps uncover savings opportunities and provides insights into application adoption and utilization trends.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Todo](#todo)
- [Notes](#notes)

---

## Tech Stack

- **Next.js** 
- **TypeScript**
- **Tailwind CSS**
- **Recharts** 
- **Tippy.js** 
- **React Icons**

---

## Features

- 📈 Dynamic time-series chart for linked vs. unlinked apps  
- 📉 Application breakdown of inactive and abandoned accounts  
- 📊 Utilization metrics
- 💰 Estimated savings potential based on unused licenses  
- ⚡ Mock backend using static JSON files for rapid prototyping  

---

## Installation

Run the following commands in a terminal

```bash
git clone git@github.com:vancodev/ll-dashboard.git
cd ll-dashboard/license-logic-dashboard
npm install
npm run dev
```

---

## Todo

- 🔌 Integrate with real backend APIs
- 🧪 Add unit and integration tests
- 📤 Export data (CSV, PDF)
- 🔍 Add filtering & search to tables
- 📅 Custom date range picker

---

## Notes
- **All API responses are mocked** using static JSON files for demonstration purposes.
- Mock data is stored under the `/public/` directory:
  - `mock-app-stats.json`
  - `mock-chart.json`
  - `mock-inactive-apps.json`