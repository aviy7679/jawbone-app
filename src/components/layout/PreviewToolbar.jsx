import { SCREENS } from "../../constants";

export function PreviewToolbar({ screen, setScreen, login, logout, isLoggedIn, userType }) {
  const labels = {
    home: "Landing",
    shop: "Shop",
    product: "Product",
    cart: "Cart",
    checkout: "Checkout",
    favorites: "Favorites",
    account: "Account",
    orders: "Orders",
    contractor: "Contractor",
    admin: "Admin",
    contact: "FAQ / Contact",
    privacy: "Privacy",
    terms: "Terms",
  };

  return (
    <div className="sticky top-0 z-[80] border-b border-[#60371b22] bg-[#f3f1ed]/95 px-3 py-3 backdrop-blur md:px-6">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#dcb375]">Canvas preview controls</div>
          <div className="text-sm font-semibold text-[#60371b]">Switch screens here to see the full design.</div>
        </div>

        <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
          {SCREENS.map((id) => (
            <button
              key={id}
              onClick={() => setScreen(id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
                screen === id
                  ? "border-[#60371b] bg-[#60371b] text-white"
                  : "border-[#60371b33] bg-white text-[#60371b] hover:bg-[#fff4c8]"
              }`}
            >
              {labels[id]}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 gap-2">
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-700"
            >
              Logout demo
            </button>
          ) : (
            <>
              <button
                onClick={() => login("consumer", screen === "checkout" ? "checkout" : "account")}
                className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#60371b] shadow-sm"
              >
                Login demo
              </button>
              <button
                onClick={() => login("contractor", "contractor", "approved")}
                className="rounded-full bg-[#dcb375] px-4 py-2 text-xs font-bold text-[#60371b] shadow-sm"
              >
                Contractor demo
              </button>
            </>
          )}
          {isLoggedIn ? (
            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#60371b] shadow-sm">
              {userType === "contractor" ? "Contractor" : "Consumer"}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
