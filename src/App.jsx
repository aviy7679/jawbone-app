import React, { useMemo, useState } from "react";

import { APP_PAGE_BG, APP_PAGE_PADDING, APP_CONTAINER } from "./constants";
import { products } from "./data";
import { getStoreScoreEarnings, createNavigation } from "./utils";

import { ProductCard } from "./components/common/ProductCard";
import { Header } from "./components/layout/Header";
import { Footer, WhatsAppButton } from "./components/layout/Footer";
import { PreviewToolbar } from "./components/layout/PreviewToolbar";

import { Home, Shop, ProductPage, CartPage, CheckoutPage, OrdersPage, FavoritesPage, LegalPage, FAQContactPage, EmptyCart, LoginRequiredModal, AccountPage, ContractorPage, AdminPanel } from "./pages";

// ============================================
// MAIN APP COMPONENT
// ============================================
export default function App() {
  const [screen, setScreen] = useState("home");
  const [selected, setSelected] = useState(products[0]);
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [contractorStatus, setContractorStatus] = useState("none");
  const [favorites, setFavorites] = useState([]);
  const [showLoginFavoriteModal, setShowLoginFavoriteModal] = useState(false);
  const [useStoreCredit, setUseStoreCredit] = useState(false);
  const [, setHistory] = useState([]);

  const referredSales = 5840;
  const storeCredit = getStoreScoreEarnings(referredSales);

  const { goToScreen, goBack } = createNavigation(screen, setScreen, setHistory);

  const addToCart = (product, qty = 1) =>
    setCart((items) => {
      const exists = items.find((item) => item.id === product.id);
      if (exists)
        return items.map((item) => (item.id === product.id ? { ...item, qty: item.qty + qty } : item));
      return [...items, { ...product, qty }];
    });

  const login = (type = "consumer", nextScreen = "checkout", status = "approved") => {
    setIsLoggedIn(true);
    setUserType(type);
    setContractorStatus(type === "contractor" ? status : "none");
    setScreen(nextScreen);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setContractorStatus("none");
    setUseStoreCredit(false);
    if (screen === "checkout") setScreen("cart");
  };

  const isFavorite = (productId) => favorites.some((item) => item.id === productId);

  const toggleFavorite = (product) => {
    if (!isLoggedIn) {
      setShowLoginFavoriteModal(true);
      return;
    }
    setFavorites((items) =>
      items.some((item) => item.id === product.id)
        ? items.filter((item) => item.id !== product.id)
        : [...items, product]
    );
  };

  const shareCoupon = () => {
    const text = "Use my Jawbone contractor coupon: CONTRACTOR-OREN";
    if (navigator?.clipboard?.writeText) navigator.clipboard.writeText(text);
    window.alert("Coupon copied: CONTRACTOR-OREN");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  if (screen === "admin") {
    return (
      <div className="min-h-screen bg-white font-sans">
        <AdminPanel />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <PreviewToolbar
        screen={screen}
        setScreen={setScreen}
        login={login}
        logout={logout}
        isLoggedIn={isLoggedIn}
        userType={userType}
      />

      <Header
        screen={screen}
        setScreen={setScreen}
        cartCount={cartCount}
        favoritesCount={favorites.length}
        isLoggedIn={isLoggedIn}
        userType={userType}
        logout={logout}
      />

      {screen === "home" && <Home setScreen={setScreen} />}
      {screen === "shop" && (
        <Shop
          setSelected={setSelected}
          addToCart={addToCart}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          goToScreen={goToScreen}
        />
      )}
      {screen === "product" && (
        <ProductPage
          product={selected}
          addToCart={addToCart}
          goBack={goBack}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}
      {screen === "cart" && (
        <CartPage
          cart={cart}
          setCart={setCart}
          setScreen={setScreen}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          isLoggedIn={isLoggedIn}
          userType={userType}
          storeCredit={storeCredit}
          useStoreCredit={useStoreCredit}
          EmptyCart={EmptyCart}
        />
      )}
      {screen === "favorites" && (
        <FavoritesPage
          favorites={favorites}
          setScreen={setScreen}
          setSelected={setSelected}
          addToCart={addToCart}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          goToScreen={goToScreen}
        />
      )}
      {screen === "checkout" && (
        <CheckoutPage
          cart={cart}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          isLoggedIn={isLoggedIn}
          setScreen={setScreen}
          userType={userType}
          storeCredit={storeCredit}
          useStoreCredit={useStoreCredit}
          setUseStoreCredit={setUseStoreCredit}
        />
      )}
      {screen === "account" && (
        <AccountPage
          onLogin={login}
          isLoggedIn={isLoggedIn}
          userType={userType}
          logout={logout}
          setScreen={setScreen}
          storeCredit={storeCredit}
          referredSales={referredSales}
          shareCoupon={shareCoupon}
          favorites={favorites}
          setSelected={setSelected}
          addToCart={addToCart}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          goToScreen={goToScreen}
        />
      )}
      {screen === "orders" && <OrdersPage setScreen={setScreen} />}
      {screen === "contractor" && (
        <ContractorPage
          isLoggedIn={isLoggedIn}
          userType={userType}
          contractorStatus={contractorStatus}
          setScreen={setScreen}
          storeCredit={storeCredit}
          referredSales={referredSales}
          shareCoupon={shareCoupon}
        />
      )}
      {screen === "contact" && <FAQContactPage />}
      {screen === "privacy" && <LegalPage type="privacy" setScreen={setScreen} />}
      {screen === "terms" && <LegalPage type="terms" setScreen={setScreen} />}

      {showLoginFavoriteModal && (
        <LoginRequiredModal
          onClose={() => setShowLoginFavoriteModal(false)}
          onLogin={() => {
            setShowLoginFavoriteModal(false);
            setScreen("account");
          }}
        />
      )}

      <Footer setScreen={setScreen} />
      <WhatsAppButton />
    </div>
  );
}
