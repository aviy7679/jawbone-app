import { ASSETS } from "./constants";

// NOTE: This is temporary mock data
// Will be replaced with API calls when connecting to database

export const categories = [
  { name: "Construction Materials", img: ASSETS.category1 },
  { name: "Agricultural & Landscaping", img: ASSETS.category2 },
  { name: "Wood & Lumber", img: ASSETS.category3 },
  { name: "Tools & Equipment", img: ASSETS.category4 },
];

export const products = [
  { id: 1, title: "Concrete & Surface Panel", category: "Construction Materials", retailPrice: 189, contractorPrice: 159, storePrice: 145, weight: 4.2, image: ASSETS.category1, description: "Premium construction surface panel for commercial and residential projects.", inStock: true },
  { id: 2, title: "Agricultural Supply Kit", category: "Agricultural & Landscaping", retailPrice: 1099, contractorPrice: 984, storePrice: 876, weight: 2.1, image: ASSETS.category2, description: "Reliable supply package for agricultural and landscaping work.", inStock: false },
  { id: 3, title: "Wood & Lumber Kit", category: "Wood & Lumber", retailPrice: 2450, contractorPrice: 2100, storePrice: 1950, weight: 7.5, image: ASSETS.category3, description: "Ready-to-supply lumber package for contractor projects.", inStock: true },
  { id: 4, title: "Tools Starter Bundle", category: "Tools & Equipment", retailPrice: 1280, contractorPrice: 1120, storePrice: 1040, weight: 3.4, image: ASSETS.category4, description: "Essential tools and accessories bundle for job-site use.", inStock: true },
];

export const mockOrders = [
  { id: "JWB-1048", date: "May 18, 2026", status: "Delivered", total: 2734 },
  { id: "JWB-1049", date: "May 22, 2026", status: "In Transit", total: 1280 },
  { id: "JWB-1050", date: "May 25, 2026", status: "Processing", total: 1099 },
];

export const referredOrders = [
  { id: "REF-2201", customer: "Michael R.", date: "May 12, 2026", orderTotal: 1280, reward: 64, status: "Paid" },
  { id: "REF-2202", customer: "Sarah K.", date: "May 16, 2026", orderTotal: 2450, reward: 123, status: "Paid" },
  { id: "REF-2203", customer: "BuildPro LLC", date: "May 21, 2026", orderTotal: 2110, reward: 106, status: "Pending" },
];

export const adminUsers = [
  { id: "USR-1001", name: "Sarah Customer", type: "Consumer", email: "sarah@example.com", status: "Active", orders: 8, spend: 4830 },
  { id: "CON-2001", name: "Oren Contractor", type: "Contractor", email: "oren@buildpro.com", status: "Approved", orders: 21, spend: 18420 },
  { id: "CON-2002", name: "BuildPro LLC", type: "Contractor", email: "admin@buildpro.com", status: "Pending", orders: 0, spend: 0 },
];

export const adminInvoices = [
  { id: "INV-5001", order: "JWB-1048", customer: "Sarah Customer", amount: 2734, status: "Paid", due: "May 25, 2026" },
  { id: "INV-5002", order: "JWB-1049", customer: "Oren Contractor", amount: 1280, status: "Open", due: "May 29, 2026" },
  { id: "INV-5003", order: "JWB-1050", customer: "BuildPro LLC", amount: 1099, status: "Draft", due: "Jun 02, 2026" },
];
