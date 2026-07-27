# ShipNow - Phase-Wise Development Plan

This document details the step-by-step implementation strategy for the **ShipNow** frontend application. The development is organized into 10 key phases to ensure modular construction, clean code splitting, and logical test gates.

---

## Phase 1: Project Scaffolding & Setup
*   **Goal**: Initialize the project workspace, install core dependencies, and configure the styling tokens.
*   **Tasks**:
    1.  Initialize Vite with React + Javascript:
        ```bash
        npx -y create-vite@latest ./ --template react
        ```
    2.  Install required libraries: `react-router-dom`, `tailwindcss`, `postcss`, `autoprefixer`, `lucide-react`, `recharts`.
    3.  Configure `tailwind.config.js` to define color themes (brand purple, slate neutrals), fonts (Inter/Outfit), and standard shadows.
    4.  Set up `src/styles/index.css` importing Google Fonts and Tailwind base styles.
*   **Gate check**: Verify dev server starts (`npm run dev`) and tailwind utility classes compile correctly.

---

## Phase 2: Page Shell & Routing Structure
*   **Goal**: Build the primary layout grid, sidebar navigation rails, and page routing.
*   **Tasks**:
    1.  Configure routing in `src/App.jsx` with routes for `/login`, `/dashboard`, `/shipments`, `/shipments/create`, `/invoices`, `/warehouse`, and fallback placeholder screens.
    2.  Implement `DashboardLayout.jsx` wrapper:
        *   Sidebar component with dynamic responsiveness (expanded on Desktop, icon rail on Tablet, hidden hamburger drawer on Mobile).
        *   Header component containing responsive page breadcrumbs.
        *   Footer component containing layout copyrights.
*   **Gate Check**: Navigation links route to individual screens; layout sidebar reflows correctly when viewport size is changed between 1440px, 768px, and 375px.

---

## Phase 3: Domain-Isolated Mock Data & UI Primitives
*   **Goal**: Structure the application seed data and build foundational UI elements.
*   **Tasks**:
    1.  Create `src/data/` containing:
        *   `shipmentsData.js` (at least 30 entries with full tracking attributes).
        *   `invoicesData.js` (at least 5 entries with dynamic line items).
        *   `warehouseData.js` (bin configurations, floor plan lists, logs).
        *   `alertsData.js` (system notifications list).
    2.  Build reusable visual primitives in `src/components/ui/`:
        *   `Button` (primary, secondary, subtle variants with focus styles).
        *   `Input` (text, search, selects with error status border configurations).
        *   `StatusChip` (color badges indicating status values).
        *   `Card` (layout panel containers).
*   **Gate Check**: Import mock data successfully and verify basic UI components render in isolation.

---

## Phase 4: Screen 4.1 - Login Page & Session Verification
*   **Goal**: Complete the authentication screen with robust validation and session redirect.
*   **Tasks**:
    1.  Implement split-screen authentication design matching layout constraints.
    2.  Create `AuthContext` to manage local session states.
    3.  Build client-side form validations for Email (regex check) and Password (minimum 8 character check).
    4.  Implement password visibility show/hide toggle.
    5.  Trigger redirection to `/dashboard` upon verification approval.
*   **Gate Check**: Unauthenticated requests redirect to `/login`. Submitting invalid forms presents appropriate design error texts. Correct login redirects immediately.

---

## Phase 5: Screen 4.2 - Dashboard Widgets & Data Charts
*   **Goal**: Build the operational dashboard displaying summary metrics and active charts.
*   **Tasks**:
    1.  Render top row of metrics summary cards with positive/negative trend symbols.
    2.  Integrate Recharts components:
        *   Bar Chart (weekly logistics numbers).
        *   Grouped Bar Chart (operational indicators).
        *   Donut Chart (shipment status splits).
    3.  Create the **Live Tracking Panel**:
        *   Embed static map vector/image.
        *   Position SVG path overlays showing active routes.
        *   Add markers and custom hover overlay card panels.
    4.  Render the Operations Alerts panel, Recent Shipments list table, and Activity Timeline widget.
*   **Gate Check**: Responsive charts fit columns cleanly; container switches columns gracefully when resizing between Desktop, Tablet, and Mobile limits.

---

## Phase 6: Screen 4.3 - 4.5 - Shipments views & View Switcher
*   **Goal**: Create the Unified Shipments Route with Table and Grid Toggle.
*   **Tasks**:
    1.  Create a shared page wrapper with search, status filters, and date picker selectors.
    2.  Build the custom View Switcher toggle component placed on the breadcrumb line; sync state to URL params: `?view=table` & `?view=grid`.
    3.  Implement **Table View**:
        *   4 Summary Metric Cards.
        *   Sortable columns (Tracking ID, Date, Sender).
        *   Checkboxes for row selection and header select-all.
        *   Pagination footer with dynamic page size selector.
    4.  Implement **Grid View**:
        *   Card grid of shipments displaying progress tracking bars.
        *   Connect same filters and sorting parameters.
*   **Gate Check**: Switching views changes layout without page reload. Search input, date controls, and status tab clicks filter the list in real-time. Sorting and page size changing work correctly.

---

## Phase 7: Screen 4.6 - Create New Shipment Form & Validations
*   **Goal**: Implement the multi-section shipment submission form.
*   **Tasks**:
    1.  Build a six-section layout form covering sender, recipient, cargo size/weight, services, and tracking preferences.
    2.  Enforce required field checks, numeric limits, and input validations.
    3.  Implement the exact error boundaries and alerts highlighted in the Figma design.
    4.  Connect form submission to `ShipmentsContext` so that verified items append to global state.
*   **Gate Check**: Submitting empty/invalid fields shows red error alerts. Submitting a correct form appends a new row to the Shipments view and navigates back.

---

## Phase 8: Screen 4.7 - Invoices & Billing Master-Detail
*   **Goal**: Complete the Invoice list and dynamic detail screen.
*   **Tasks**:
    1.  Build a master-detail split layout (list on left, detail frame on right).
    2.  Implement active selection state so selecting list rows updates the detail panel.
    3.  Add calculations helper for invoice totals:
        *   $$\text{Subtotal} = \sum (\text{Qty} \times \text{Unit Price})$$
        *   $$\text{Tax} = \text{Subtotal} \times \text{Tax Rate}$$
        *   $$\text{Grand Total} = \text{Subtotal} + \text{Tax} - \text{Discount}$$
    4.  Enforce a stacked column list layout for mobile screens.
*   **Gate Check**: Detail panel updates instantly when selecting different invoices; totals match calculation rules.

---

## Phase 9: Screen 4.8 - Warehouse Analytics & Floor Map
*   **Goal**: Build the final analytical warehouse overview.
*   **Tasks**:
    1.  Render Warehouse stats summary cards and occupancy progress charts.
    2.  Implement the **Floor Plan Map**:
        *   Grid block representation of warehouse rows.
        *   Floor tabs switcher (Floor 1, 2, 3) which renders different bin lists upon click.
    3.  Render active storage status tables and logging lists.
*   **Gate Check**: Clicking floor tabs updates warehouse occupancy metrics and updates map indicators.

---

## Phase 10: Testing, a11y & Deployment Preparation
*   **Goal**: Perform final testing audits, verify code cleanliness, and prepare the project README.
*   **Tasks**:
    1.  Verify responsive rendering on standard widths: 1440px, 768px, and 375px. Ensure no overflow scrollbars.
    2.  Conduct accessibility sweep: Ensure form controls are labelled and focus rings are visible under keyboard focus.
    3.  Organize code comments, remove dead code/logs, and run production compilation tests (`npm run build`).
    4.  Create the project `README.md` mapping out setup instructions, status checklists, and design notes.
