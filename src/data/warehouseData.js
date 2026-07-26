export const warehouseStats = {
  totalSku: { val: "285", change: "+2.58%" },
  quantityOnHand: { val: "12,450", change: "+4.37%" },
  capacityUsage: { val: "62.5%", change: "+1.54%" }
};

export const warehouseInventory = [
  { category: "Electronics", percentage: 25, count: 2500, color: "#6366f1" },
  { category: "Apparel", percentage: 20, count: 2000, color: "#818cf8" },
  { category: "Home & Kitchen", percentage: 18, count: 1800, color: "#0f172a" },
  { category: "Beauty & Health", percentage: 15, count: 1500, color: "#334155" },
  { category: "Automotive Parts", percentage: 12, count: 1200, color: "#64748b" },
  { category: "Sports Equipment", percentage: 10, count: 1000, color: "#94a3b8" }
];

export const capacityUsageDonut = {
  percentage: 62.5,
  loadedShelves: 40,
  emptyShelves: 24
};

export const warehouseStorage = [
  { floor: 1, section: "A1 - A10", category: "Electronics", percentage: 80, available: "20/100" },
  { floor: 2, section: "B1 - B10", category: "Apparel", percentage: 60, available: "40/100" },
  { floor: 1, section: "C1 - C10", category: "Home & Kitchen", percentage: 90, available: "10/100" },
  { floor: 3, section: "D1 - D10", category: "Automotive Parts", percentage: 50, available: "50/100" },
  { floor: 2, section: "E1 - E10", category: "Beauty & Health", percentage: 70, available: "30/100" }
];

export const packageStatusList = [
  { id: "PKG-HK77420", date: "March 20, 2035 - 05:30 PM", status: "Sent" },
  { id: "PKG-A50812", date: "March 21, 2035 - 01:45 PM", status: "Received" },
  { id: "PKG-E10293", date: "March 22, 2035 - 09:00 AM", status: "Expected" }
];

export const warehouseActivityLog = [
  {
    user: "Leo Fernandez",
    action: "confirmed receipt of 40 units of Winter Jacket Series in Section B3 (Apparel)",
    time: "01:45 PM",
    date: "Today",
    type: "receipt"
  },
  {
    user: "Ava Martinez",
    action: "added 25 units of Smart Router Kit to Section A1 (Electronics)",
    time: "09:15 AM",
    date: "Today",
    type: "addition"
  },
  {
    user: "Oscar Liem",
    action: "dispatched 18 units of Stainless Steel Cookware Set from Section C5 (Home & Kitchen)",
    time: "05:30 PM",
    date: "Yesterday",
    type: "dispatch"
  },
  {
    user: "Dina Choi",
    action: "created a shipment entry for Brake Pad Sets in Section D2 (Automotive Parts)",
    time: "04:10 PM",
    date: "Yesterday",
    type: "entry"
  }
];

export const warehouseFloorsData = {
  1: {
    Electronics: { space: "20/100", bins: [{ id: "A1", filled: true }, { id: "A2", filled: true }, { id: "A3", filled: false }] },
    "Home & Kitchen": { space: "10/100", bins: [{ id: "C1", filled: true }, { id: "C2", filled: true }, { id: "C3", filled: true }] },
    "Automotive Parts": { space: "50/100", bins: [{ id: "D1", filled: true }, { id: "D2", filled: false }, { id: "D3", filled: false }] },
    "Sports Equipment": { space: "45/100", bins: [{ id: "F1", filled: true }, { id: "F2", filled: false }, { id: "F3", filled: false }] },
    Apparel: { space: "20/100", bins: [
      { id: "B1", filled: true }, { id: "B2", filled: true }, { id: "B3", filled: true }, { id: "B4", filled: true },
      { id: "B5", filled: false }, { id: "B6", filled: false }, { id: "B7", filled: false }, { id: "B8", filled: false },
      { id: "B9", filled: false }, { id: "B10", filled: false }
    ] },
    "Beauty & Health": { space: "30/100", bins: [{ id: "E1", filled: true }, { id: "E2", filled: false }, { id: "E3", filled: false }, { id: "E4", filled: false }] }
  },
  2: {
    Electronics: { space: "40/100", bins: [{ id: "A1", filled: true }, { id: "A2", filled: false }, { id: "A3", filled: false }] },
    "Home & Kitchen": { space: "50/100", bins: [{ id: "C1", filled: true }, { id: "C2", filled: false }, { id: "C3", filled: false }] },
    "Automotive Parts": { space: "80/100", bins: [{ id: "D1", filled: true }, { id: "D2", filled: true }, { id: "D3", filled: false }] },
    "Sports Equipment": { space: "70/100", bins: [{ id: "F1", filled: true }, { id: "F2", filled: false }, { id: "F3", filled: false }] },
    Apparel: { space: "40/100", bins: [
      { id: "B1", filled: true }, { id: "B2", filled: true }, { id: "B3", filled: false }, { id: "B4", filled: false },
      { id: "B5", filled: false }, { id: "B6", filled: false }, { id: "B7", filled: false }, { id: "B8", filled: false },
      { id: "B9", filled: false }, { id: "B10", filled: false }
    ] },
    "Beauty & Health": { space: "60/100", bins: [{ id: "E1", filled: true }, { id: "E2", filled: false }, { id: "E3", filled: false }, { id: "E4", filled: false }] }
  },
  3: {
    Electronics: { space: "90/100", bins: [{ id: "A1", filled: false }, { id: "A2", filled: false }, { id: "A3", filled: false }] },
    "Home & Kitchen": { space: "80/100", bins: [{ id: "C1", filled: false }, { id: "C2", filled: false }, { id: "C3", filled: false }] },
    "Automotive Parts": { space: "60/100", bins: [{ id: "D1", filled: true }, { id: "D2", filled: false }, { id: "D3", filled: false }] },
    "Sports Equipment": { space: "90/100", bins: [{ id: "F1", filled: false }, { id: "F2", filled: false }, { id: "F3", filled: false }] },
    Apparel: { space: "80/100", bins: [
      { id: "B1", filled: false }, { id: "B2", filled: false }, { id: "B3", filled: false }, { id: "B4", filled: false },
      { id: "B5", filled: false }, { id: "B6", filled: false }, { id: "B7", filled: false }, { id: "B8", filled: false },
      { id: "B9", filled: false }, { id: "B10", filled: false }
    ] },
    "Beauty & Health": { space: "70/100", bins: [{ id: "E1", filled: true }, { id: "E2", filled: false }, { id: "E3", filled: false }, { id: "E4", filled: false }] }
  }
};
