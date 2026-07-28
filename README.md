# 🚀 ShipNow Logistics & Cargo Management Platform

### 🌐 Live Demo & Access Credentials
* **Live Demo URL**: [https://shipnowtrendsbirdlimited.netlify.app/login](https://shipnowtrendsbirdlimited.netlify.app/login)
* **Demo Email Address**: `john.doe@shipnow.com` (Optional - can be left blank or filled with anything)
* **Demo Password**: `password123` (Optional - can be left blank or filled with anything)

> [!NOTE]
> The login credential requirements have been bypassed. You can click the **Login** button directly with empty or arbitrary fields to immediately access the Dashboard.

---

## 🛠️ Technology Stack Used

| Technology Area | Selected Implementation | Role in the Project |
| :--- | :--- | :--- |
| **Framework** | **React SPA** (created with Vite) | Main client-side single page structure |
| **Language** | **JavaScript** (ES6+ / JSX) | Interactive UI logic, maps, and state management |
| **Styling** | **Tailwind CSS** | Premium responsive layout components and colors |
| **Charts** | **Recharts** | Metrics AreaChart, Donut, and Grouped Bar charts |
| **Routing** | **React Router DOM** | Client-side routes, sidebar links, and auth redirects |
| **Icons** | **Lucide React** | Dashboards, map markers, and details visual icons |
| **Backend / DB**| **None** (100% Client-Side) | Runs completely in-browser for static hosting compatibility |
| **Data Storage** | **Local Mock Data** (Seeded arrays) | Seeded mock arrays matching target mockup specifications |
| **Deployment** | **Netlify** | Configured with `_redirects` client-side rewrite rules |

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
| **Shipment (Grid)** | **Complete** | Custom horizontal scrolling status tabs. Search inputs, sorting drop-downs, and layout cards. Cards feature responsive padding and timeline sizes with wrapped dates below `md` breakpoint to prevent right-side layout clip. |
| **Shipment (List)** | **Not Attempted** | Focused energy on polishing the high-fidelity shipment grid card system. |
| **Create New Shipment** | **Complete** | Form fields to compile and post new shipping tracking IDs. |
| **Warehouse Mapping** | **Complete** | Horizontal scrolling categories, grid floor layouts with responsive `col-span` configurations, and freight map listings. |
| **Invoices & Billing** | **Complete** | Scroll containers for list elements, printable layout receipts, and scrollable tabular data sheets on small screens. |

---

## 💡 Known Issues & Design Assumptions

* **Login Layout Position**: The logo position and left-half text alignment inside the welcome branding panel are not fully identical to the Figma layouts.
* **Shipment Grid Cards Alignment**: The grid cards layout in the Shipments page is not a 100% replicate of the Figma file, containing minor differences in alignment and positioning.
* **Invoice Slider Element**: The Invoice detail view contains a scroll-based slider element which is not in the original Figma files, introduced to handle layout constraint formatting on smaller browser viewports.
* **Mobile & Tablet Misalignments**: Several views on mobile/tablet viewports contain minor element misplacements or alignment deviations. Best efforts were made to replicate the Figma designs within responsive HTML limitations.
* **Mobile Shipments Layout**: The mobile view of the Shipments page is not 100% ready and has some alignment-related differences due to screen space constraints.
