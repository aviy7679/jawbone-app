import { APP_PAGE_BG, APP_PAGE_PADDING } from "../constants";
import { getSubtotal, getShipping, getWeight, getCouponDiscount, getStoreCreditToApply, formatUSD } from "../utils";
import { Icon, Button, PreviewImage, FormField } from "../components/common/UI";

export function CartPage({ cart, setCart, setScreen, couponCode, setCouponCode, isLoggedIn, userType, storeCredit = 0, useStoreCredit = false, EmptyCart }) {
  const subtotal = getSubtotal(cart);
  const shipping = getShipping(cart);
  const weight = getWeight(cart);
  const discount = getCouponDiscount(subtotal, couponCode);
  const subtotalAfterDiscount = Math.max(0, subtotal - discount);
  const appliedStoreCredit = userType === "contractor" && useStoreCredit ? getStoreCreditToApply(storeCredit, subtotalAfterDiscount) : 0;
  const total = Math.max(0, subtotalAfterDiscount - appliedStoreCredit) + shipping;

  const updateQty = (id, delta) =>
    setCart((items) => items.map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)));

  const remove = (id) => setCart((items) => items.filter((item) => item.id !== id));

  if (cart.length === 0) return <main className="bg-white"><EmptyCart goShop={() => setScreen("shop")} /></main>;

  return (
    <main className={`grid gap-8 ${APP_PAGE_BG} ${APP_PAGE_PADDING} lg:grid-cols-[1fr_380px]`}>
      <div>
        <h1 className="text-5xl font-semibold text-[#60371b]">Cart</h1>
        <div className="mt-8 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-2xl bg-[#fffaeb] p-4 shadow-sm md:flex-row md:items-center">
              <PreviewImage src={item.image} alt={item.title} className="h-24 w-24 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="font-bold text-[#60371b]">{item.title}</div>
                <div className="text-sm text-gray-600">{item.weight} kg each</div>
              </div>
              <div className="flex items-center gap-2 text-[#60371b]">
                <button onClick={() => updateQty(item.id, -1)}>
                  <Icon name="minus" />
                </button>
                <b>{item.qty}</b>
                <button onClick={() => updateQty(item.id, 1)}>
                  <Icon name="plus" />
                </button>
              </div>
              <div className="font-bold text-[#60371b]">{formatUSD(item.retailPrice * item.qty)}</div>
              <button onClick={() => remove(item.id)} className="text-[#60371b]">
                <Icon name="x" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <aside className="h-fit rounded-3xl bg-[#60371b] p-7 text-white">
        <h2 className="text-2xl font-semibold">Order summary</h2>
        <div className="mt-6 space-y-4 text-[#f7f0dc]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatUSD(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total weight</span>
            <span>{weight.toFixed(1)} kg</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatUSD(shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span>Coupon discount</span>
            <span>-{formatUSD(discount)}</span>
          </div>
          {userType === "contractor" ? (
            <div className="flex justify-between">
              <span>Store Score credit</span>
              <span>-{formatUSD(appliedStoreCredit)}</span>
            </div>
          ) : null}

          <label className="block rounded-2xl bg-white/10 p-4 text-white">
            <span className="mb-2 block text-sm font-semibold">Coupon code</span>
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-[#60371b] outline-none"
            />
            <span className="mt-2 block text-xs text-[#f7f0dc]">Try JAWBONE10 or CONTRACTOR-OREN</span>
          </label>

          <div className="flex justify-between border-t border-white/20 pt-4 text-xl font-bold text-white">
            <span>Total</span>
            <span>{formatUSD(total)}</span>
          </div>
        </div>

        {!isLoggedIn ? (
          <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-[#f7f0dc]">
            You need to login or register before checkout.
          </div>
        ) : null}

        <Button variant="gold" onClick={() => setScreen(isLoggedIn ? "checkout" : "account")} className="mt-7 w-full">
          {isLoggedIn ? "Checkout" : "Login / Register to checkout"}
        </Button>
      </aside>
    </main>
  );
}

export function CheckoutPage({ cart, couponCode, setCouponCode, isLoggedIn, setScreen, userType, storeCredit = 0, useStoreCredit, setUseStoreCredit }) {
  const subtotal = getSubtotal(cart);
  const shipping = getShipping(cart);
  const discount = getCouponDiscount(subtotal, couponCode);
  const subtotalAfterDiscount = Math.max(0, subtotal - discount);
  const appliedStoreCredit = userType === "contractor" && useStoreCredit ? getStoreCreditToApply(storeCredit, subtotalAfterDiscount) : 0;
  const total = Math.max(0, subtotalAfterDiscount - appliedStoreCredit) + shipping;

  if (!isLoggedIn) {
    return (
      <main className={`${APP_PAGE_BG} ${APP_PAGE_PADDING}`}>
        <div className="mx-auto max-w-[760px] rounded-3xl bg-[#fffaeb] p-8 text-center shadow-sm">
          <h1 className="text-4xl font-semibold text-[#60371b]">Login required</h1>
          <p className="mt-4 text-lg leading-8 text-gray-700">
            To continue to checkout, please login or create a consumer account.
          </p>
          <Button onClick={() => setScreen("account")} className="mt-8">
            Login / Register
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className={`grid gap-8 ${APP_PAGE_BG} ${APP_PAGE_PADDING} lg:grid-cols-[1fr_420px]`}>
      <div>
        <h1 className="text-5xl font-semibold text-[#60371b]">Checkout</h1>
        <div className="mt-8 rounded-3xl bg-[#fffaeb] p-7 shadow-sm">
          {["Full name", "Email", "Phone", "Address", "City"].map((label) => (
            <FormField key={label} label={label} />
          ))}

          <label className="mb-5 block text-[#60371b]">
            <span className="mb-2 block font-semibold">Coupon code</span>
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full rounded border border-[#60371b33] bg-[#f3f1ed] px-4 py-3 outline-none"
            />
          </label>

          {userType === "contractor" ? (
            <label className="mb-5 flex items-center justify-between rounded-2xl bg-[#fff4c8] p-4 text-[#60371b]">
              <div>
                <div className="font-bold">Use Store Score credit</div>
                <div className="text-sm">Available: {formatUSD(storeCredit)}</div>
              </div>
              <input type="checkbox" checked={useStoreCredit} onChange={(e) => setUseStoreCredit(e.target.checked)} className="h-5 w-5" />
            </label>
          ) : null}

          <div className="mb-5 rounded-2xl bg-[#f3f1ed] p-4 text-[#60371b]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <b>{formatUSD(subtotal)}</b>
            </div>
            <div className="flex justify-between">
              <span>Coupon discount</span>
              <b>-{formatUSD(discount)}</b>
            </div>
            {userType === "contractor" ? (
              <div className="flex justify-between">
                <span>Store Score credit</span>
                <b>-{formatUSD(appliedStoreCredit)}</b>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span>Shipping</span>
              <b>{formatUSD(shipping)}</b>
            </div>
            <div className="mt-3 flex justify-between border-t border-[#60371b22] pt-3 text-xl">
              <span>Total</span>
              <b>{formatUSD(total)}</b>
            </div>
          </div>

          <Button className="w-full">Place order</Button>
        </div>
      </div>

      <aside className="h-fit rounded-3xl bg-[#dcb375] p-7 text-[#60371b]">
        <Icon name="truck" size={32} />
        <h2 className="mt-4 text-2xl font-bold">Paid delivery</h2>
        <p className="mt-3 leading-7">
          Delivery is calculated from product weight. Current cart weight: {getWeight(cart).toFixed(1)} kg.
        </p>
      </aside>
    </main>
  );
}
