export const dashboardStats = {
  activeShipments: { val: "1,284", change: "+8.7%", note: "from last week" },
  deliveryPerformance: { val: "94.3%", change: "-1.2%", note: "from last week" },
  revenue: { val: "$82,450", change: "+12.4%", note: "from last month" }
};

export const shipmentStatistics = [
  { month: "Jan", shipments: 1800 },
  { month: "Feb", shipments: 1400 },
  { month: "Mar", shipments: 2100 },
  { month: "Apr", shipments: 2400 },
  { month: "May", shipments: 3124 }, // Peak indicated in mockup
  { month: "Jun", shipments: 2000 },
  { month: "Jul", shipments: 2600 },
  { month: "Aug", shipments: 2900 }
];

export const profitSummary = [
  { month: "Jan", revenue: 45000, cost: 25000 },
  { month: "Feb", revenue: 58000, cost: 30000 },
  { month: "Mar", revenue: 49000, cost: 28000 },
  { month: "Apr", revenue: 78000, cost: 42000 },
  { month: "May", revenue: 87524, cost: 45680 }, // Indicated data point in mockup
  { month: "Jun", revenue: 62000, cost: 35000 },
  { month: "Jul", revenue: 71000, cost: 40000 },
  { month: "Aug", revenue: 82000, cost: 44000 }
];

export const shipmentTypeDistribution = [
  { name: "Road Freight", value: 1150, percentage: 46, color: "#6366f1" },
  { name: "Air Freight", value: 700, percentage: 28, color: "#0f172a" },
  { name: "Ocean Freight", value: 425, percentage: 17, color: "#334155" },
  { name: "Rail Freight", value: 225, percentage: 9, color: "#64748b" }
];

export const productCategoriesDistribution = [
  { name: "Electronics", count: 240, percentage: 24, color: "#6366f1" },
  { name: "Home & Kitchen", count: 200, percentage: 20, color: "#e0e7ff" },
  { name: "Apparel", count: 180, percentage: 18, color: "#0f172a" },
  { name: "Beauty & Health", count: 140, percentage: 14, color: "#475569" },
  { name: "Sports & Outdoors", count: 120, percentage: 12, color: "#cbd5e1" },
  { name: "Automotive", count: 120, percentage: 12, color: "#cbd5e1" }
];

export const liveTrackingData = {
  id: "#SH8743921",
  status: "In Transit",
  schedule: "On Schedule",
  courier: "Daniel Cooper",
  agency: "SkyLogix Express",
  origin: "San Francisco, CA, USA",
  originTime: "Mar 19, 2035 - 10:30 AM",
  destination: "New York, NY, USA",
  destinationTime: "Mar 23, 2035 - 03:00 PM (estimated)",
  progressPercent: 65,
  routeCoordinates: {
    origin: { x: 20, y: 55 },
    destination: { x: 80, y: 35 },
    current: { x: 59, y: 41 }
  }
};

export const dashboardAlerts = {
  totalDelays: 12,
  summary: [
    { label: "Customs Clearance Delay", count: 5, color: "bg-purple-100 text-purple-700" },
    { label: "Incorrect Address Provided", count: 4, color: "bg-blue-100 text-blue-700" },
    { label: "Weather-Related Hold", count: 3, color: "bg-red-100 text-red-700" }
  ],
  items: [
    { title: "Customs Clearance Delay", id: "#SH8743921", mode: "Ocean Freight", date: "Mar 20" },
    { title: "Incorrect Address Provided", id: "#SH8725810", mode: "Road Freight", date: "Mar 20" },
    { title: "Weather-Related Hold", id: "#SH8790043", mode: "Air Freight", date: "Mar 19" },
    { title: "Incorrect Address Provided", id: "#SH8716654", mode: "Rail Freight", date: "Mar 18" }
  ]
};

export const recentActivity = [
  { user: "@TechGuru99", action: "submitted a bulk shipment request", time: "12:00 PM", date: "Today" },
  { user: "@SupportKen", action: "added a priority tag to Order ID 77889JKL", time: "11:30 AM", date: "Today" },
  { user: "@SallyMae88", action: "initiated a return process for Order ID 44556GHI", time: "11:00 AM", date: "Today" },
  { user: "@AdminLisa", action: "resolved a delivery issue for Order ID 12345XYZ", time: "10:15 AM", date: "Today" }
];
