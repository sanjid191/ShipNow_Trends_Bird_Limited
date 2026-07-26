export const invoicesData = [
  {
    id: "INV-1001",
    company: "TechGear Inc.",
    shippingId: "#SH9283746",
    issueDate: "Mar 15, 2035",
    dueDate: "Mar 22, 2035",
    amountSubtotal: 1250.00,
    status: "Paid",
    billFrom: {
      name: "TechGear Inc.",
      email: "billing@techgear.com",
      address: "100 Silicon Valley Rd, Minneapolis, MN 55401",
      phone: "+1 612-555-0199"
    },
    billTo: {
      name: "ShipNow Logistics",
      email: "accounts@shipnow.com",
      address: "901 Distribution Ave, Charlotte, NC 28217, USA",
      phone: "+1 704-555-9911"
    },
    lineItems: [
      { description: "High-End GPU Shipment", shipmentType: "Air Freight Express", price: 250.00, qty: 5 }
    ],
    taxRate: 0.08,
    fee: 15.00,
    discount: 0.00
  },
  {
    id: "INV-1002",
    company: "StyleHub Co.",
    shippingId: "#SH9182635",
    issueDate: "Mar 16, 2035",
    dueDate: "Mar 23, 2035",
    amountSubtotal: 980.00,
    status: "Unpaid",
    billFrom: {
      name: "StyleHub Co.",
      email: "billing@stylehub.com",
      address: "45 Fashion Ave, New York, NY 10001",
      phone: "+1 212-555-3210"
    },
    billTo: {
      name: "ShipNow Logistics",
      email: "accounts@shipnow.com",
      address: "901 Distribution Ave, Charlotte, NC 28217, USA",
      phone: "+1 704-555-9911"
    },
    lineItems: [
      { description: "Summer Tees Bulk Pack", shipmentType: "Road Freight Standard", price: 49.00, qty: 20 }
    ],
    taxRate: 0.08,
    fee: 12.00,
    discount: 0.00
  },
  {
    id: "INV-1003",
    company: "FreshNest",
    shippingId: "#SH9037821",
    issueDate: "Mar 14, 2035",
    dueDate: "Mar 21, 2035",
    amountSubtotal: 1320.00,
    status: "Paid",
    billFrom: {
      name: "FreshNest",
      email: "billing@freshnest.com",
      address: "202 Dallas Pkwy, Dallas, TX 75201",
      phone: "+1 214-555-8765"
    },
    billTo: {
      name: "ShipNow Logistics",
      email: "accounts@shipnow.com",
      address: "901 Distribution Ave, Charlotte, NC 28217, USA",
      phone: "+1 704-555-9911"
    },
    lineItems: [
      { description: "Ergonomic Blender Set", shipmentType: "Ocean Freight Economy", price: 132.00, qty: 10 }
    ],
    taxRate: 0.08,
    fee: 20.00,
    discount: 50.00
  },
  {
    id: "INV-1004",
    company: "FitPlus Gear",
    shippingId: "#SH9374652",
    issueDate: "Mar 17, 2035",
    dueDate: "Mar 24, 2035",
    amountSubtotal: 1150.00,
    status: "Unpaid",
    billFrom: {
      name: "FitPlus Gear",
      email: "billing@fitplus.com",
      address: "808 Pine St, Seattle, WA 98101",
      phone: "+1 206-555-4321"
    },
    billTo: {
      name: "ShipNow Logistics",
      email: "accounts@shipnow.com",
      address: "901 Distribution Ave, Charlotte, NC 28217, USA",
      phone: "+1 704-555-9911"
    },
    lineItems: [
      { description: "Treadmill Folding Frame", shipmentType: "Rail Freight Standard", price: 575.00, qty: 2 }
    ],
    taxRate: 0.08,
    fee: 15.00,
    discount: 0.00
  },
  {
    id: "INV-1005",
    company: "AutoParts Pro",
    shippingId: "#SH9457830",
    issueDate: "Mar 15, 2035",
    dueDate: "Mar 22, 2035",
    amountSubtotal: 1480.00,
    status: "Overdue",
    billFrom: {
      name: "AutoParts Pro",
      email: "billing@autoparts.com",
      address: "500 Motor City Way, Detroit, MI 48201",
      phone: "+1 313-555-9870"
    },
    billTo: {
      name: "ShipNow Logistics",
      email: "accounts@shipnow.com",
      address: "901 Distribution Ave, Charlotte, NC 28217, USA",
      phone: "+1 704-555-9911"
    },
    lineItems: [
      { description: "Suspension Coil Sets", shipmentType: "Road Freight Standard", price: 370.00, qty: 4 }
    ],
    taxRate: 0.08,
    fee: 18.00,
    discount: 0.00
  },
  {
    id: "INV-1006",
    company: "EcoLights",
    shippingId: "#SH8821349",
    issueDate: "Mar 13, 2035",
    dueDate: "Mar 20, 2035",
    amountSubtotal: 790.00,
    status: "Paid",
    billFrom: {
      name: "EcoLights",
      email: "billing@ecolights.com",
      address: "71 Austin Loop, Austin, TX 78701",
      phone: "+1 512-555-0211"
    },
    billTo: {
      name: "ShipNow Logistics",
      email: "accounts@shipnow.com",
      address: "901 Distribution Ave, Charlotte, NC 28217, USA",
      phone: "+1 704-555-9911"
    },
    lineItems: [
      { description: "LED Panel Bulb Pack", shipmentType: "Air Freight Standard", price: 79.00, qty: 10 }
    ],
    taxRate: 0.08,
    fee: 10.00,
    discount: 0.00
  },
  {
    id: "INV-1007",
    company: "GreenHaven",
    shippingId: "#SH8967432",
    issueDate: "Mar 14, 2035",
    dueDate: "Mar 21, 2035",
    amountSubtotal: 875.00,
    status: "Paid",
    billFrom: {
      name: "GreenHaven",
      email: "billing@greenhaven.com",
      address: "300 Portland Trl, Portland, OR 97201",
      phone: "+1 503-555-4567"
    },
    billTo: {
      name: "ShipNow Logistics",
      email: "accounts@shipnow.com",
      address: "901 Distribution Ave, Charlotte, NC 28217, USA",
      phone: "+1 704-555-9911"
    },
    lineItems: [
      { description: "Organic Soil Bag Pallet", shipmentType: "Road Freight Heavy", price: 175.00, qty: 5 }
    ],
    taxRate: 0.08,
    fee: 12.00,
    discount: 0.00
  },
  {
    id: "INV-1008",
    company: "ModaWear",
    shippingId: "#SH8893247",
    issueDate: "Mar 16, 2035",
    dueDate: "Mar 23, 2035",
    amountSubtotal: 910.00,
    status: "Unpaid",
    billFrom: {
      name: "ModaWear",
      email: "billing@modawear.com",
      address: "89 Franklin St, Boston, MA 02110, USA",
      phone: "+1 617-555-2290"
    },
    billTo: {
      name: "ShipNow Logistics",
      email: "accounts@shipnow.com",
      address: "901 Distribution Ave, Charlotte, NC 28217, USA",
      phone: "+1 704-555-9911"
    },
    lineItems: [
      { description: "Lightweight Hoodie Pack", shipmentType: "Road Freight Express", price: 120.00, qty: 3 },
      { description: "Autumn Jacket Set", shipmentType: "Road Freight Standard", price: 180.00, qty: 2 },
      { description: "Lightweight Hoodie Pack", shipmentType: "Road Freight Express", price: 95.00, qty: 2 }
    ],
    taxRate: 0.08,
    fee: 10.00,
    discount: 0.00
  },
  {
    id: "INV-1009",
    company: "SunCore Panels",
    shippingId: "#SH9018723",
    issueDate: "Mar 17, 2035",
    dueDate: "Mar 24, 2035",
    amountSubtotal: 1600.00,
    status: "Unpaid",
    billFrom: {
      name: "SunCore Panels",
      email: "billing@suncore.com",
      address: "90 San Diego Way, San Diego, CA 92101",
      phone: "+1 619-555-1234"
    },
    billTo: {
      name: "ShipNow Logistics",
      email: "accounts@shipnow.com",
      address: "901 Distribution Ave, Charlotte, NC 28217, USA",
      phone: "+1 704-555-9911"
    },
    lineItems: [
      { description: "Polycrystalline Solar Panel", shipmentType: "Rail Freight Heavy", price: 320.00, qty: 5 }
    ],
    taxRate: 0.08,
    fee: 25.00,
    discount: 0.00
  },
  {
    id: "INV-1010",
    company: "VitaFresh",
    shippingId: "#SH8881190",
    issueDate: "Mar 15, 2035",
    dueDate: "Mar 22, 2035",
    amountSubtotal: 1120.00,
    status: "Overdue",
    billFrom: {
      name: "VitaFresh",
      email: "billing@vitafresh.com",
      address: "12 Nashville Dr, Nashville, TN 37201",
      phone: "+1 615-555-8901"
    },
    billTo: {
      name: "ShipNow Logistics",
      email: "accounts@shipnow.com",
      address: "901 Distribution Ave, Charlotte, NC 28217, USA",
      phone: "+1 704-555-9911"
    },
    lineItems: [
      { description: "Organic Apple Juice Crates", shipmentType: "Road Freight Refrigerated", price: 56.00, qty: 20 }
    ],
    taxRate: 0.08,
    fee: 10.00,
    discount: 0.00
  },
  {
    id: "INV-1011",
    company: "SmartAppliance",
    shippingId: "#SH8923752",
    issueDate: "Mar 18, 2035",
    dueDate: "Mar 25, 2035",
    amountSubtotal: 1050.00,
    status: "Paid",
    billFrom: {
      name: "SmartAppliance",
      email: "billing@smartappliance.com",
      address: "101 Appliance Way, Seattle, WA 98109",
      phone: "+1 206-555-0812"
    },
    billTo: {
      name: "ShipNow Logistics",
      email: "accounts@shipnow.com",
      address: "901 Distribution Ave, Charlotte, NC 28217, USA",
      phone: "+1 704-555-9911"
    },
    lineItems: [
      { description: "Smart Blender Pro V1", shipmentType: "Air Freight Express", price: 350.00, qty: 3 }
    ],
    taxRate: 0.08,
    fee: 15.00,
    discount: 50.00
  }
];
