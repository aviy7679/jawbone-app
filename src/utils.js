// Formatting
export const formatUSD = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

// Cart calculations
export const getSubtotal = (cart) =>
  cart.reduce((sum, item) => sum + item.retailPrice * item.qty, 0);

export const getWeight = (cart) =>
  cart.reduce((sum, item) => sum + item.weight * item.qty, 0);

export const getShipping = (cart) =>
  cart.length ? Math.ceil(getWeight(cart)) * 12 : 0;

// Pricing
export const getCouponDiscount = (subtotal, couponCode) => {
  const code = couponCode.trim().toUpperCase();
  if (code === "JAWBONE10") return Math.round(subtotal * 0.1);
  if (code.startsWith("CONTRACTOR")) return Math.round(subtotal * 0.15);
  return 0;
};

export const getStoreScoreEarnings = (purchaseAmount) =>
  Math.round(purchaseAmount * 0.05);

export const getStoreCreditToApply = (availableCredit, subtotalAfterDiscount) =>
  Math.min(availableCredit, subtotalAfterDiscount);

// Navigation
export const getPreviousScreen = (history, fallback = "shop") =>
  history[history.length - 1] || fallback;

export const createNavigation = (currentScreen, setScreen, setHistory) => ({
  goToScreen(nextScreen) {
    if (nextScreen === currentScreen) return;
    setHistory((items) => [...items, currentScreen].slice(-12));
    setScreen(nextScreen);
  },
  goBack(fallback = "shop") {
    setHistory((items) => {
      setScreen(getPreviousScreen(items, fallback));
      return items.slice(0, -1);
    });
  },
});
