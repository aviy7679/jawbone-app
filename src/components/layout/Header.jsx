import { useState } from "react";
import { ASSETS } from "../../constants";
import { Icon, Button, PreviewImage } from "../common/UI";

export function Header({ screen, setScreen, cartCount, favoritesCount, isLoggedIn, userType, logout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const navItems = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "contractor", label: "Contractor" },
    { id: "contact", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex min-h-[70px] max-w-[1440px] items-center justify-between gap-4 px-4 py-3 md:px-8 lg:px-[80px]">
        <button onClick={() => setScreen("home")} className="flex items-center gap-3 text-left">
          <PreviewImage src={ASSETS.logo} alt="Jawbone logo" className="h-11 w-11 rounded-full object-contain" />
          <span className="font-serif text-sm font-bold tracking-[0.16em] text-[#60371b] md:text-xl">
            JAWBONE PRODUCT
          </span>
        </button>

        <nav className="hidden items-center gap-6 text-sm text-[#60371b] md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={screen === item.id ? "font-bold underline" : ""}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-row-reverse items-center gap-3">
          {!isLoggedIn ? (
            <Button variant="outline" onClick={() => setScreen("account")} className="px-4 py-2">
              Login / Register
            </Button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#60371b] bg-[#f3f1ed] text-sm font-bold text-[#60371b]"
                aria-label="Profile menu"
              >
                {userType === "contractor" ? "CO" : "CU"}
              </button>
              {profileOpen ? (
                <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-[#60371b22] bg-white text-left shadow-xl">
                  <button
                    onClick={() => {
                      setScreen("account");
                      setProfileOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-left text-sm text-[#60371b] hover:bg-[#f3f1ed]"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setScreen("orders");
                      setProfileOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-left text-sm text-[#60371b] hover:bg-[#f3f1ed]"
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-left text-sm font-semibold text-red-700 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          )}

          <button
            onClick={() => setScreen("cart")}
            className="relative rounded-full bg-[#60371b] p-2 text-white"
            aria-label="Cart"
          >
            <Icon name="cart" />
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#dcb375] px-1 text-xs font-bold text-[#60371b]">
                {cartCount}
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setScreen("favorites")}
            className="relative rounded-full bg-[#60371b] p-2 text-white"
            aria-label="Favorites"
          >
            <Icon name="heart" />
            {favoritesCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#dcb375] px-1 text-xs font-bold text-[#60371b]">
                {favoritesCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}
