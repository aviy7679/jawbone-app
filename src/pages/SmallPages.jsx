import { useState } from "react";
import { APP_PAGE_BG, APP_PAGE_PADDING, APP_CONTAINER, ASSETS } from "../constants";
import { mockOrders } from "../data";
import { formatUSD } from "../utils";
import { Icon, Button, PreviewImage, FormField, TextAreaField } from "../components/common/UI";
import { ProductCard } from "../components/common/ProductCard";

// Orders Page
export function OrdersPage({ setScreen }) {
  return (
    <main className={`${APP_PAGE_BG} ${APP_PAGE_PADDING}`}>
      <div className={APP_CONTAINER}>
        <div className="flex flex-col gap-4 rounded-3xl bg-[#fffaeb] p-7 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Order history</p>
            <h1 className="mt-2 text-5xl font-semibold text-[#60371b]">My Orders</h1>
            <p className="mt-2 text-gray-600">Track deliveries, review past purchases, and reorder common materials.</p>
          </div>
          <Button onClick={() => setScreen("shop")}>Continue shopping</Button>
        </div>

        <div className="mt-8 space-y-5">
          {mockOrders.map((order) => (
            <article key={order.id} className="rounded-3xl bg-[#fffaeb] p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-[#60371b]">Order #{order.id}</h2>
                    <span className="rounded-full bg-[#fff4c8] px-3 py-1 text-xs font-bold text-[#60371b]">
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="text-2xl font-bold text-[#60371b]">{formatUSD(order.total)}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

// Favorites Page
export function FavoritesPage({ favorites, setScreen, setSelected, addToCart, toggleFavorite, isFavorite, goToScreen }) {
  const openProduct = (product) => {
    setSelected(product);
    goToScreen("product");
  };

  return (
    <main className={`${APP_PAGE_BG} ${APP_PAGE_PADDING}`}>
      <div className={APP_CONTAINER}>
        <h1 className="text-5xl font-semibold text-[#60371b]">Favorites</h1>
        {favorites.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-[#fffaeb] p-12 text-center text-[#60371b] shadow-sm">
            <Icon name="heart" size={44} />
            <h2 className="mt-4 text-2xl font-semibold">No favorite products yet</h2>
            <p className="mt-2 text-gray-600">Save products you want to revisit later.</p>
            <Button onClick={() => setScreen("shop")} className="mt-6">
              Go Shop
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
                isFavorite={() => true}
                openProduct={openProduct}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Legal Pages (Privacy & Terms)
export function LegalPage({ type, setScreen }) {
  const isPrivacy = type === "privacy";

  return (
    <main className={`${APP_PAGE_BG} ${APP_PAGE_PADDING}`}>
      <div className="mx-auto max-w-[1000px]">
        <button
          onClick={() => setScreen("account")}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#60371b] shadow-sm"
        >
          <Icon name="arrowLeft" size={16} /> Back to account
        </button>

        <section className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dcb375]">Legal</p>
          <h1 className="mt-3 text-4xl font-semibold text-[#60371b] md:text-5xl">
            {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
          </h1>
          <p className="mt-4 text-gray-600">Placeholder page. We will replace this with the final legal text later.</p>

          <div className="mt-8 space-y-6 text-gray-800">
            <div className="rounded-2xl bg-[#f3f1ed] p-5">
              <h2 className="text-xl font-bold text-[#60371b]">1. Introduction</h2>
              <p className="mt-3 leading-7">
                This section will contain the official {isPrivacy ? "privacy policy" : "terms and conditions"} content
                for Jawbone Products.
              </p>
            </div>
            <div className="rounded-2xl bg-[#f3f1ed] p-5">
              <h2 className="text-xl font-bold text-[#60371b]">2. Scope</h2>
              <p className="mt-3 leading-7">Add the final client-approved legal language here.</p>
            </div>
            <div className="rounded-2xl bg-[#f3f1ed] p-5">
              <h2 className="text-xl font-bold text-[#60371b]">3. Contact</h2>
              <p className="mt-3 leading-7">For questions, contact Jawbone Products through the contact page.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// FAQ & Contact Page
export function FAQContactPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      icon: "cart",
      question: "What products does Jawbone supply?",
      answer: "Jawbone supplies construction, agricultural, landscaping, wood, lumber, tools, and general building materials.",
    },
    {
      icon: "truck",
      question: "How is shipping calculated?",
      answer: "Shipping is calculated by the total product weight in the cart.",
    },
    {
      icon: "edit",
      question: "Do contractors need approval?",
      answer: "Yes. Contractors register, submit business details and supporting documents, and wait for approval before accessing contractor benefits.",
    },
    {
      icon: "share",
      question: "How does the contractor coupon work?",
      answer: "Approved contractors receive a coupon code they can share. Purchases through that coupon can increase their Store Score credit.",
    },
  ];

  return (
    <main className={`${APP_PAGE_BG} ${APP_PAGE_PADDING}`}>
      <div className={APP_CONTAINER}>
        <section className="overflow-hidden rounded-3xl bg-[#60371b] text-white shadow-sm">
          <div className="p-8 md:p-12">
            <p className="text-sm uppercase tracking-[0.25em] text-[#dcb375]">Support</p>
            <h1 className="mt-3 text-5xl font-semibold">FAQ & Contact Us</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#f7f0dc]">
              Have a question about products, delivery, contractor approval, or orders? Send us a message and the
              Jawbone team will get back to you.
            </p>
          </div>
        </section>

        <section className="mt-10 space-y-8">
          <div className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">FAQ</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#60371b]">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-4">
              {faqs.map((item, index) => (
                <div key={item.question} className="overflow-hidden rounded-2xl border border-[#60371b22] bg-[#f3f1ed]">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold text-[#60371b]"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dcb375]/35">
                        <Icon name={item.icon} size={20} />
                      </span>
                      {item.question}
                    </span>
                    <span>+</span>
                  </button>
                  {openFaq === index ? <p className="px-5 pb-5 pl-[84px] leading-7 text-gray-700">{item.answer}</p> : null}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Contact us</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#60371b]">Send a Message</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <FormField label="First Name" />
              <FormField label="Last Name" />
            </div>
            <FormField label="Email" type="email" />
            <FormField label="Phone" />
            <TextAreaField label="Message" />
            <Button className="w-full">Submit Message</Button>
          </div>
        </section>
      </div>
    </main>
  );
}

// Empty Cart Component
export function EmptyCart({ goShop }) {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-white px-5 pb-16 pt-8 text-center md:px-10">
      <div className="mx-auto flex max-w-[1040px] flex-col items-center">
        <div className="relative mt-4 w-full">
          <div className="absolute left-[16%] top-6 h-8 w-24 rounded-full bg-gray-100 opacity-70 blur-sm" />
          <div className="absolute right-[18%] top-8 h-7 w-20 rounded-full bg-gray-100 opacity-70 blur-sm" />
          <PreviewImage
            src={ASSETS.emptyCart}
            alt="Empty rustic cart"
            className="mx-auto h-[340px] w-full max-w-[720px] object-contain md:h-[420px] lg:h-[460px]"
          />
        </div>
        <div className="-mt-2 max-w-[680px]">
          <h2 className="text-4xl font-semibold leading-tight text-[#60371b] md:text-5xl">Your cart is empty</h2>
          <p className="mt-3 text-lg leading-8 text-[#2b2b35] md:text-xl">
            Looks like you haven't added anything to your cart yet.
          </p>
          <p className="mt-1 text-lg leading-8 text-[#2b2b35] md:text-xl">Explore our products and find what you need.</p>
          <button
            onClick={goShop}
            className="mt-6 inline-flex items-center justify-center gap-3 rounded-xl bg-[#60371b] px-10 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#4d2c16]"
          >
            <Icon name="cart" size={20} /> Go Shop
          </button>
        </div>
      </div>
    </section>
  );
}

// Login Required Modal
export function LoginRequiredModal({ onClose, onLogin }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5">
      <div className="max-w-md overflow-hidden rounded-3xl bg-white text-center shadow-2xl">
        <div className="p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f1ed] text-[#60371b]">
            <Icon name="heart" size={28} />
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-[#60371b]">Login required</h2>
          <p className="mt-3 text-gray-600">
            Please login or create an account to save this product to your favorites.
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={onLogin} className="flex-1">
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
