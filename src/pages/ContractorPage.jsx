import { APP_PAGE_BG, APP_PAGE_PADDING, APP_CONTAINER } from "../constants";
import { referredOrders } from "../data";
import { formatUSD } from "../utils";
import { Icon, Button } from "../components/common/UI";

export function ContractorPage({ isLoggedIn, userType, contractorStatus = "none", setScreen, storeCredit = 0, referredSales = 0, shareCoupon = () => undefined }) {
  const isApprovedContractor = isLoggedIn && userType === "contractor" && contractorStatus === "approved";
  const isPendingContractor = isLoggedIn && userType === "contractor" && contractorStatus === "pending";

  if (isPendingContractor) {
    return (
      <main className={`${APP_PAGE_BG} ${APP_PAGE_PADDING}`}>
        <div className={APP_CONTAINER}>
          <section className="bg-[#60371b] px-6 py-16 text-white md:px-12 lg:px-16">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dcb375]">Contractor application</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight">Your contractor application is pending approval</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f7f0dc]">Thank you for submitting your contractor details. The Jawbone team is reviewing your business information, documentation, and delivery requirements. Once approved, your contractor coupon and Store Score access will become active.</p>
          </section>
        </div>
      </main>
    );
  }

  if (!isApprovedContractor) {
    const steps = [
      ["01", "Create a contractor account", "Submit your personal contact information, address, and business details through the contractor registration flow."],
      ["02", "Business review", "Jawbone reviews the submitted company information, license details, tax information, and supporting documents."],
      ["03", "Approval and coupon setup", "Once approved, the contractor receives a unique coupon code to share with customers and project contacts."],
      ["04", "Earn Store Score", "Qualified orders connected to the contractor coupon help build Store Score credit that can be used toward future purchases."],
    ];
    const benefits = ["Contractor account approval flow", "Unique shareable coupon code", "Access to contractor-focused pricing logic", "Store Score rewards from referred purchases", "Centralized order and referral visibility", "Support for ongoing commercial demand"];

    return (
      <main className={`${APP_PAGE_BG} ${APP_PAGE_PADDING}`}>
        <div className={APP_CONTAINER}>
          <section className="grid min-h-[520px] overflow-hidden bg-[#60371b] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center px-6 py-14 text-white md:px-12 lg:px-16">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dcb375]">Contractor program</p>
              <h1 className="mt-4 text-5xl font-semibold leading-tight md:text-6xl">Built for contractors, commercial demand, and ongoing projects</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f7f0dc]">Contractors can register with Jawbone Products to access an approval-based account experience designed for repeat purchasing, project supply, referrals, and customer coupon sharing.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="gold" onClick={() => setScreen("account")}>Register as contractor</Button>
                <Button variant="outline" onClick={() => setScreen("shop")} className="border-white bg-white/10 text-white hover:bg-white/15">View products</Button>
              </div>
            </div>
            <div className="relative min-h-[340px] bg-[linear-gradient(140deg,rgba(220,179,117,0.5),rgba(255,250,235,0.12))] p-6 md:p-10">
              <div className="flex h-full flex-col justify-end border border-white/20 p-7 text-white">
                <p className="text-sm uppercase tracking-[0.22em] text-[#f7f0dc]">Program focus</p>
                <div className="mt-6 grid gap-5">
                  <div><div className="text-5xl font-black text-[#dcb375]">15%</div><p className="mt-2 text-sm leading-6 text-[#f7f0dc]">Example contractor coupon discount shown in prototype logic.</p></div>
                  <div><div className="text-5xl font-black text-[#dcb375]">5%</div><p className="mt-2 text-sm leading-6 text-[#f7f0dc]">Example Store Score reward rate from referred purchase activity.</p></div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12 grid gap-10 border-y border-[#60371b22] py-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div><p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dcb375]">Overview</p><h2 className="mt-3 text-4xl font-semibold leading-tight text-[#60371b]">How contractor accounts work</h2></div>
            <div className="space-y-5 text-lg leading-8 text-gray-800">
              <p>A contractor registers on the website and submits the required personal, address, and business details. After the contractor is approved, Jawbone can assign a coupon code that the contractor can share with customers.</p>
              <p>The coupon creates a simple referral path: customers can purchase using the contractor code, while the contractor can track referred orders and Store Score credit from their dashboard.</p>
              <p className="font-semibold uppercase tracking-wide text-[#60371b]">Designed to support commercial demand, repeat orders, and project-based purchasing.</p>
            </div>
          </section>

          <section className="py-12">
            <div className="mb-8"><p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dcb375]">Approval process</p><h2 className="mt-3 text-4xl font-semibold text-[#60371b]">From registration to approved contractor</h2></div>
            <div className="divide-y divide-[#60371b22] border-y border-[#60371b22]">
              {steps.map(([number, title, description]) => (
                <div key={number} className="grid gap-4 py-7 md:grid-cols-[90px_0.7fr_1.3fr] md:items-start">
                  <div className="text-3xl font-black text-[#dcb375]">{number}</div>
                  <h3 className="text-2xl font-semibold text-[#60371b]">{title}</h3>
                  <p className="text-base leading-7 text-gray-700">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-10 bg-[#fffaeb] px-6 py-12 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
            <div><p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dcb375]">Program benefits</p><h2 className="mt-3 text-4xl font-semibold leading-tight text-[#60371b]">Why contractors use Jawbone</h2><p className="mt-5 text-lg leading-8 text-gray-700">The contractor experience is not only a discount flow. It is a relationship layer that connects purchasing, referrals, fulfillment, and ongoing project supply.</p></div>
            <div className="grid gap-4 md:grid-cols-2">{benefits.map((benefit) => <div key={benefit} className="border-b border-[#60371b22] pb-4 text-lg font-semibold text-[#60371b]">{benefit}</div>)}</div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className={`${APP_PAGE_BG} ${APP_PAGE_PADDING}`}>
      <div className={APP_CONTAINER}>
        <section className="grid min-h-[420px] overflow-hidden bg-[#60371b] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center px-6 py-12 text-white md:px-12">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dcb375]">Contractor dashboard</p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight">Your contractor account</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#f7f0dc]">Manage your contractor coupon, review referred activity, and use Store Score credit from approved customer purchases.</p>
          </div>
          <div className="flex flex-col justify-center bg-[#dcb375] px-6 py-12 text-[#60371b] md:px-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Store Score</p>
            <div className="mt-3 text-7xl font-black">86</div>
            <p className="mt-3 leading-7">Based on activity and referred purchases.</p>
            <div className="mt-7 border-t border-[#60371b33] pt-6">
              <div className="text-sm font-semibold">Available credit</div>
              <div className="text-4xl font-black">{formatUSD(storeCredit)}</div>
              <div className="mt-2 text-sm">Earned from {formatUSD(referredSales)}</div>
            </div>
          </div>
        </section>

        <section className="grid gap-10 border-y border-[#60371b22] py-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dcb375]">Your coupon</p>
            <h2 className="mt-3 text-4xl font-semibold text-[#60371b]">CONTRACTOR-OREN</h2>
            <button onClick={shareCoupon} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#60371b] px-5 py-3 text-sm font-bold text-white"><Icon name="share" size={16} /> Share coupon</button>
          </div>
          <div className="space-y-4 text-lg leading-8 text-gray-700">
            <p>Share this code with customers or project contacts. Purchases connected to the contractor coupon can contribute to your Store Score credit.</p>
            <p>This keeps your referral activity visible and gives Jawbone a clear way to connect customer orders back to your contractor relationship.</p>
          </div>
        </section>

        <section className="py-12">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dcb375]">Referral history</p>
          <h2 className="mt-3 text-4xl font-semibold text-[#60371b]">Referred orders</h2>
          <div className="mt-8 divide-y divide-[#60371b22] border-y border-[#60371b22]">
            {referredOrders.map((order) => (
              <div key={order.id} className="grid gap-3 py-5 md:grid-cols-[1fr_1fr_1fr_1fr] md:items-center">
                <div><div className="font-bold text-[#60371b]">{order.id}</div><div className="text-sm text-gray-600">{order.customer}</div></div>
                <div className="text-sm text-gray-700">{order.date}</div>
                <div><div className="font-bold text-[#60371b]">{formatUSD(order.orderTotal)}</div><div className="text-xs text-gray-600">Order total</div></div>
                <div className="text-left md:text-right"><div className="font-bold text-[#60371b]">+{formatUSD(order.reward)}</div><span className="mt-1 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">{order.status}</span></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
