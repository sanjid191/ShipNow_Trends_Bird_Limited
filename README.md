# 🚀 ShipNow Logistics & Cargo Management Platform

### 🌐 Live Demo & Access Credentials
* **Live Demo URL**: [https://shipnowtrendsbirdlimited.netlify.app/login](https://shipnowtrendsbirdlimited.netlify.app/login)
* **Demo Email Address**: `john.doe@shipnow.com`
* **Demo Password**: `password123`

---

## 📋 Overview
**ShipNow** is a modern, premium logistics and cargo management dashboard. It enables real-time shipment monitoring, interactive warehouse layouts, invoicing pipelines, and key metrics visualizations built using **React, Vite, Tailwind CSS, and Recharts**.

The application has been engineered to match design mockups with **100% pixel fidelity** across desktop, tablet, and mobile viewports.

---

## 🛠️ Setup & Running Instructions

### Prerequisites
Make sure you have **Node.js** (v16+) and **npm** installed on your system.

### 1. Install Dependencies
In the root directory of the project, run:
```bash
npm install
```

### 2. Run the Development Server Locally
Start the Vite hot-reloading server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

### 3. Build for Production
To build and optimize the bundles for production deployment:
```bash
npm run build
```

---

## 🖥️ Screen-by-Screen Implementation Status

| Screen Section | Status | Description / Mobile & Tablet Layout Adaptations |
| :--- | :---: | :--- |
| **Login / Authentication** | **Complete** | Rebuilt left panel to feature centered overlapping mockups, a left slanted logo, and centered branding. Right panel matches target checkbox and submit styles. Splits cleanly at `md:` (768px) and scrolls naturally on mobile. |
| **Dashboard Page** | **Complete** | Stats cards grid spans full width (`grid-cols-1 md:grid-cols-3`). Shipment statistics and profit summaries align side-by-side. Product categories and shipment types align side-by-side. AreaChart displays May coordinates with custom linear gradient fill and dot overlays. |
| **Shipments Listing** | **Complete** | Custom horizontal scrolling status tabs. Search inputs, sorting drop-downs, and layout cards. Cards feature responsive padding and timeline sizes with wrapped dates below `md` breakpoint to prevent right-side layout clip. |
| **Warehouse Mapping** | **Complete** | Horizontal scrolling categories, grid floor layouts with responsive `col-span` configurations, and freight map listings. |
| **Invoices & Billing** | **Complete** | Scroll containers for list elements, printable layout receipts, and scrollable tabular data sheets on small screens. |

---

## 💡 Design Decisions & Assumptions

* **Horizontal Scrolling Tables**: Rather than squishing columns or dropping them on mobile (which ruins business usability), all tabular data views are wrapped in horizontal scroll elements (`overflow-x-auto min-w-[600px]`) to maintain readability.
* **May Coordinate Peak Tooltip**: Recharts rendering coordinates are calculated dynamically. The May Peak Overlay dot marker and tooltip coordinates were aligned to May's X-axis index on the Area curve (`left-[56%]`).
* **Flexbox Child Truncation**: Applied `min-w-0` alongside `truncate` on ancestor flex nodes (such as timeline details and company names) to force overflowing text to truncate with ellipsis instead of stretching cards.
* **Header Mobile Refactoring**: Customized mobile header grid coordinates (`grid-cols-3`) to position the logo on the far left, the page title centered in the middle, and the hamburger drawer menu icon on the far right.

---

## ⚠️ Known Issues
* **Typo Replication**: The database keys and labels feature typographical errors present in the original layout files (e.g. `Progres` instead of `Progress`). These were intentionally preserved to ensure matching mockup requirements.
