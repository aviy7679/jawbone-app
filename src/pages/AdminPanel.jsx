import { useState } from "react";
import { APP_PAGE_BG } from "../constants";
import { products, mockOrders, adminUsers, adminInvoices } from "../data";
import { formatUSD } from "../utils";
import { ProfileField, AdminStatCard, AdminRow } from "../components/common/UI";

export function AdminPanel() {
  const [tab, setTab] = useState("dashboard");
  const tabs = ["dashboard", "users", "products", "orders", "invoices", "contractors", "settings"];
  const stockCount = products.filter((product) => product.inStock !== false).length;
  const pendingContractors = adminUsers.filter((user) => user.type === "Contractor" && user.status === "Pending").length;

  return (
    <main className={`${APP_PAGE_BG} px-5 py-8 md:px-10 lg:px-[80px]`}>
      <div className="mx-auto max-w-[1440px]">
        <section className="overflow-hidden rounded-[2rem] bg-[#60371b] text-white shadow-sm">
          <div className="grid gap-8 p-8 lg:grid-cols-[1fr_360px] lg:p-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dcb375]">Admin Back Office</p>
              <h1 className="mt-3 text-5xl font-semibold leading-tight">Jawbone Admin Panel</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#f7f0dc]">Manage users, contractors, products, pricing, inventory, orders, invoices, coupons, Store Score, and operational settings from one place.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Today</p>
              <div className="mt-3 text-4xl font-black">{formatUSD(6123)}</div>
              <p className="mt-2 text-sm text-[#f7f0dc]">Revenue across 12 orders</p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/10 p-3"><b>3</b><br />Pending orders</div>
                <div className="rounded-2xl bg-white/10 p-3"><b>{pendingContractors}</b><br />Contractors</div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-3xl bg-[#60371b] p-4 text-white shadow-sm">
            <p className="px-4 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[#dcb375]">Management</p>
            <div className="space-y-2">
              {tabs.map((item) => (
                <button key={item} onClick={() => setTab(item)} className={`block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold capitalize transition ${tab === item ? "bg-[#dcb375] text-[#60371b]" : "text-[#f7f0dc] hover:bg-white/10"}`}>{item}</button>
              ))}
            </div>
          </aside>

          <section className="space-y-6">
            {tab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  <AdminStatCard label="Sales" value={formatUSD(6123)} note="Today revenue" />
                  <AdminStatCard label="Orders" value="12" note="3 need fulfillment" />
                  <AdminStatCard label="Products" value={products.length} note={`${stockCount} in stock`} />
                  <AdminStatCard label="Store Score" value={formatUSD(292)} note="Open contractor credit" />
                </div>
                <div className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm">
                  <h2 className="text-3xl font-semibold text-[#60371b]">Operational Tasks</h2>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <button className="rounded-2xl bg-white p-5 text-left text-[#60371b] shadow-sm"><b>Review Contractors</b><p className="mt-2 text-sm text-gray-600">{pendingContractors} pending applications</p></button>
                    <button className="rounded-2xl bg-white p-5 text-left text-[#60371b] shadow-sm"><b>Low Stock</b><p className="mt-2 text-sm text-gray-600">Check inventory thresholds</p></button>
                    <button className="rounded-2xl bg-white p-5 text-left text-[#60371b] shadow-sm"><b>Open Invoices</b><p className="mt-2 text-sm text-gray-600">2 invoices need action</p></button>
                  </div>
                </div>
              </div>
            )}

            {tab === "users" && (
              <div className="rounded-3xl bg-[#fffaeb] shadow-sm">
                <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"><div><p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Users</p><h2 className="text-3xl font-semibold text-[#60371b]">User Management</h2></div><button className="rounded-xl bg-[#60371b] px-5 py-3 text-sm font-bold text-white">Add User</button></div>
                {adminUsers.map((user) => <AdminRow key={user.id}><b>{user.name}</b><span>{user.type}</span><span>{user.email}</span><span>{user.status}</span><span className="md:text-right">{formatUSD(user.spend)}</span></AdminRow>)}
              </div>
            )}

            {tab === "products" && (
              <div className="rounded-3xl bg-[#fffaeb] shadow-sm">
                <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"><div><p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Catalog</p><h2 className="text-3xl font-semibold text-[#60371b]">Product Management</h2></div><button className="rounded-xl bg-[#60371b] px-5 py-3 text-sm font-bold text-white">Add Product</button></div>
                {products.map((product) => <AdminRow key={product.id}><b>{product.title}</b><span>{product.category}</span><span>{product.inStock ? "In stock" : "Out of stock"}</span><span>{formatUSD(product.retailPrice)}</span><span className="md:text-right">Edit</span></AdminRow>)}
              </div>
            )}

            {tab === "orders" && (
              <div className="rounded-3xl bg-[#fffaeb] shadow-sm">
                <div className="p-6"><p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Orders</p><h2 className="text-3xl font-semibold text-[#60371b]">Order Management</h2></div>
                {mockOrders.map((order) => <AdminRow key={order.id}><b>{order.id}</b><span>{order.date}</span><span>{order.status}</span><span>{formatUSD(order.total)}</span><span className="md:text-right">View / Invoice</span></AdminRow>)}
              </div>
            )}

            {tab === "invoices" && (
              <div className="rounded-3xl bg-[#fffaeb] shadow-sm">
                <div className="p-6"><p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Finance</p><h2 className="text-3xl font-semibold text-[#60371b]">Invoice Management</h2></div>
                {adminInvoices.map((invoice) => <AdminRow key={invoice.id}><b>{invoice.id}</b><span>{invoice.customer}</span><span>{invoice.status}</span><span>{formatUSD(invoice.amount)}</span><span className="md:text-right">PDF / Send</span></AdminRow>)}
              </div>
            )}

            {tab === "contractors" && (
              <div className="space-y-6">
                <div className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm"><p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Contractors</p><h2 className="text-3xl font-semibold text-[#60371b]">Approval + Store Score</h2><p className="mt-2 text-gray-600">Approve contractor accounts, assign coupons, and review Store Score rewards.</p></div>
                <div className="rounded-3xl bg-[#fffaeb] shadow-sm">{adminUsers.filter((user) => user.type === "Contractor").map((user) => <AdminRow key={user.id}><b>{user.name}</b><span>{user.status}</span><span>CONTRACTOR-{user.name.split(" ")[0].toUpperCase()}</span><span>{formatUSD(user.spend)}</span><span className="md:text-right">Approve / Suspend</span></AdminRow>)}</div>
              </div>
            )}

            {tab === "settings" && (
              <div className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Settings</p>
                <h2 className="text-3xl font-semibold text-[#60371b]">System Settings</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <ProfileField label="Currency" value="USD" />
                  <ProfileField label="Shipping Rule" value="Weight x $12" />
                  <ProfileField label="Store Score" value="5% reward" />
                  <ProfileField label="Admin Roles" value="Super Admin, Ops, Finance" />
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
