import { useState } from "react";
import { APP_PAGE_BG, APP_PAGE_PADDING, APP_CONTAINER } from "../constants";
import { mockOrders, referredOrders } from "../data";
import { formatUSD } from "../utils";
import { Icon, Button, ProfileField, EditableProfileField, RegisterSection, LegalAgreementText, AgreementRow, FormField } from "../components/common/UI";
import { ProductCard } from "../components/common/ProductCard";

export function AccountPage({ onLogin, isLoggedIn, userType, logout, setScreen, storeCredit = 0, referredSales = 0, shareCoupon = () => undefined, favorites = [], setSelected, addToCart, toggleFavorite, isFavorite, goToScreen }) {
  const [mode, setMode] = useState("login");
  const [accountType, setAccountType] = useState("consumer");
  const [editPersonal, setEditPersonal] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordDetails, setPasswordDetails] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [personalDetails, setPersonalDetails] = useState({ fullName: userType === "contractor" ? "Oren Contractor" : "Sarah Customer", email: "customer@jawbone.com", phone: "+1 (555) 120-3400" });
  const [addressDetails, setAddressDetails] = useState({ street: "123 Warehouse Drive", city: "Chatsworth", state: "CA", zip: "91311" });

  if (isLoggedIn) {
    const isContractor = userType === "contractor";
    const fallbackInitials = isContractor ? "CO" : "CU";
    const updatePersonal = (key, value) => setPersonalDetails((current) => ({ ...current, [key]: value }));
    const updateAddress = (key, value) => setAddressDetails((current) => ({ ...current, [key]: value }));
    const handleImageUpload = (event) => { const file = event.files?.[0] || event.target?.files?.[0]; if (file) setProfileImage(URL.createObjectURL(file)); };
    const updatePassword = (key, value) => setPasswordDetails((current) => ({ ...current, [key]: value }));
    const handleChangePassword = (event) => {
      event.preventDefault();
      if (!passwordDetails.currentPassword || !passwordDetails.newPassword || !passwordDetails.confirmPassword) { setPasswordMessage("Please complete all password fields."); return; }
      if (passwordDetails.newPassword.length < 8) { setPasswordMessage("New password must be at least 8 characters."); return; }
      if (passwordDetails.newPassword !== passwordDetails.confirmPassword) { setPasswordMessage("Passwords do not match."); return; }
      setPasswordDetails({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordMessage("Password updated successfully.");
      setShowPasswordForm(false);
    };
    const openFavoriteProduct = (product) => { if (setSelected) setSelected(product); if (goToScreen) goToScreen("product"); };

    return (
      <main className={`${APP_PAGE_BG} ${APP_PAGE_PADDING}`}>
        <div className={APP_CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
            <aside className="rounded-3xl bg-[#60371b] p-7 text-white shadow-sm">
              <div className="flex items-center gap-4">
                <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-[#dcb375] bg-[#f3f1ed] text-2xl font-bold text-[#60371b]">
                  <span>{fallbackInitials}</span>
                  {profileImage ? <img src={profileImage} alt="Profile avatar" className="absolute inset-0 h-full w-full object-cover" /> : null}
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Profile</div>
                  <h1 className="text-2xl font-semibold">{isContractor ? "Contractor Account" : "Consumer Account"}</h1>
                </div>
              </div>
              <label className="mt-6 block cursor-pointer rounded-2xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-[#f7f0dc] hover:bg-white/15">
                Change profile image
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              <div className="mt-8 space-y-3 text-sm text-[#f7f0dc]">
                <button onClick={() => setActiveTab("profile")} className={`block w-full rounded-2xl px-4 py-3 text-left ${activeTab === "profile" ? "bg-white/10 font-semibold" : "hover:bg-white/10"}`}>Profile details</button>
                <button onClick={() => setActiveTab("orders")} className={`block w-full rounded-2xl px-4 py-3 text-left ${activeTab === "orders" ? "bg-white/10 font-semibold" : "hover:bg-white/10"}`}>Orders</button>
                <button onClick={() => setActiveTab("favorites")} className={`block w-full rounded-2xl px-4 py-3 text-left ${activeTab === "favorites" ? "bg-white/10 font-semibold" : "hover:bg-white/10"}`}>Favorites</button>
                {isContractor ? <button onClick={() => setActiveTab("contractor")} className={`block w-full rounded-2xl px-4 py-3 text-left ${activeTab === "contractor" ? "bg-white/10 font-semibold" : "hover:bg-white/10"}`}>Contractor dashboard</button> : null}
              </div>
              <Button variant="gold" onClick={logout} className="mt-8 w-full">Logout</Button>
            </aside>

            <section className="space-y-6">
              <style>{`@keyframes accountFadeSlide { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } } .account-tab-panel { animation: accountFadeSlide 260ms ease-out both; }`}</style>

              {activeTab === "profile" && (
                <div key="profile" className="account-tab-panel space-y-6">
                  <div className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Account overview</p>
                        <h2 className="mt-2 text-4xl font-semibold text-[#60371b]">My Profile</h2>
                        <p className="mt-2 text-gray-600">Manage customer data, default address, orders, and account settings.</p>
                      </div>
                      <span className="w-fit rounded-full bg-[#f3f1ed] px-4 py-2 text-sm font-semibold text-[#60371b]">{isContractor ? "Contractor · Approved" : "Consumer"}</span>
                    </div>
                  </div>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-2xl font-semibold text-[#60371b]">Personal details</h3>
                        <button onClick={() => setEditPersonal((open) => !open)} className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#60371b22] transition ${editPersonal ? "bg-[#60371b] text-white" : "bg-white text-[#60371b] hover:bg-[#f3f1ed]"}`} aria-label="Edit personal details"><Icon name="edit" size={16} /></button>
                      </div>
                      <div className="mt-5 grid gap-4">
                        <EditableProfileField label="Full name" value={personalDetails.fullName} editable={editPersonal} onChange={(value) => updatePersonal("fullName", value)} />
                        <EditableProfileField label="Email" value={personalDetails.email} editable={editPersonal} onChange={(value) => updatePersonal("email", value)} type="email" />
                        <EditableProfileField label="Phone" value={personalDetails.phone} editable={editPersonal} onChange={(value) => updatePersonal("phone", value)} />
                      </div>
                    </div>
                    <div className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-2xl font-semibold text-[#60371b]">Default address</h3>
                        <button onClick={() => setEditAddress((open) => !open)} className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#60371b22] transition ${editAddress ? "bg-[#60371b] text-white" : "bg-white text-[#60371b] hover:bg-[#f3f1ed]"}`} aria-label="Edit address"><Icon name="edit" size={16} /></button>
                      </div>
                      <div className="mt-5 grid gap-4">
                        <EditableProfileField label="Street" value={addressDetails.street} editable={editAddress} onChange={(value) => updateAddress("street", value)} />
                        <EditableProfileField label="City" value={addressDetails.city} editable={editAddress} onChange={(value) => updateAddress("city", value)} />
                        <EditableProfileField label="State" value={addressDetails.state} editable={editAddress} onChange={(value) => updateAddress("state", value)} />
                        <EditableProfileField label="ZIP" value={addressDetails.zip} editable={editAddress} onChange={(value) => updateAddress("zip", value)} />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold text-[#60371b]">Account settings</h3>
                        <p className="mt-1 text-sm text-gray-600">Manage account preferences and security.</p>
                      </div>
                      <Button variant="outline" onClick={() => { setShowPasswordForm((open) => !open); setPasswordMessage(""); }}>{showPasswordForm ? "Cancel password change" : "Change password"}</Button>
                    </div>
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      <ProfileField label="Customer type" value={isContractor ? "Approved contractor" : "Retail customer"} />
                      <ProfileField label="Marketing" value="Subscribed" />
                      <ProfileField label="Default delivery" value="Paid freight" />
                    </div>
                    {showPasswordForm ? (
                      <form onSubmit={handleChangePassword} className="mt-6 rounded-2xl bg-[#f3f1ed] p-5">
                        <h4 className="text-xl font-bold text-[#60371b]">Change password</h4>
                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                          <label className="block text-[#60371b]"><span className="mb-2 block text-sm font-semibold">Current password</span><input type="password" value={passwordDetails.currentPassword} onChange={(e) => updatePassword("currentPassword", e.target.value)} className="w-full rounded-xl border border-[#60371b22] bg-white px-4 py-3 outline-none" /></label>
                          <label className="block text-[#60371b]"><span className="mb-2 block text-sm font-semibold">New password</span><input type="password" value={passwordDetails.newPassword} onChange={(e) => updatePassword("newPassword", e.target.value)} className="w-full rounded-xl border border-[#60371b22] bg-white px-4 py-3 outline-none" /></label>
                          <label className="block text-[#60371b]"><span className="mb-2 block text-sm font-semibold">Confirm password</span><input type="password" value={passwordDetails.confirmPassword} onChange={(e) => updatePassword("confirmPassword", e.target.value)} className="w-full rounded-xl border border-[#60371b22] bg-white px-4 py-3 outline-none" /></label>
                        </div>
                        <Button type="submit" className="mt-5">Update password</Button>
                      </form>
                    ) : null}
                    {passwordMessage ? <div className={`mt-5 rounded-xl px-4 py-3 text-sm font-semibold ${passwordMessage.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{passwordMessage}</div> : null}
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div key="orders" className="account-tab-panel space-y-5">
                  <div className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm"><p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Order history</p><h2 className="mt-2 text-4xl font-semibold text-[#60371b]">My Orders</h2><p className="mt-2 text-gray-600">Track deliveries, review past purchases, and reorder common materials.</p></div>
                  {mockOrders.map((order) => (
                    <article key={order.id} className="rounded-3xl bg-[#fffaeb] p-6 shadow-sm">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-2xl font-bold text-[#60371b]">Order #{order.id}</h3>
                            <span className="rounded-full bg-[#fff4c8] px-3 py-1 text-xs font-bold text-[#60371b]">{order.status}</span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">Placed on {order.date}</p>
                        </div>
                        <div className="text-left md:text-right"><div className="text-sm text-gray-500">Total</div><div className="text-2xl font-bold text-[#60371b]">{formatUSD(order.total)}</div></div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {activeTab === "favorites" && (
                <div key="favorites" className="account-tab-panel space-y-6">
                  <div className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm"><p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Saved products</p><h2 className="mt-2 text-4xl font-semibold text-[#60371b]">Favorites</h2><p className="mt-2 text-gray-600">Products saved to revisit later.</p></div>
                  {favorites.length === 0 ? (
                    <div className="rounded-3xl bg-[#fffaeb] p-12 text-center text-[#60371b] shadow-sm"><Icon name="heart" size={44} /><h3 className="mt-4 text-2xl font-semibold">No favorite products yet</h3><p className="mt-2 text-gray-600">Save products you want to revisit later.</p><Button onClick={() => setScreen("shop")} className="mt-6">Go Shop</Button></div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{favorites.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart || (() => undefined)} toggleFavorite={toggleFavorite || (() => undefined)} isFavorite={isFavorite || (() => true)} openProduct={openFavoriteProduct} />)}</div>
                  )}
                </div>
              )}

              {activeTab === "contractor" && isContractor && (
                <div key="contractor" className="account-tab-panel space-y-6">
                  <div className="grid overflow-hidden rounded-3xl bg-[#fffaeb] shadow-sm lg:grid-cols-[1fr_260px]">
                    <div className="p-7">
                      <p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">Contractor dashboard</p>
                      <h2 className="mt-2 text-4xl font-semibold text-[#60371b]">CONTRACTOR-OREN</h2>
                      <p className="mt-3 text-gray-600">Share your coupon and track Store Score rewards from referred purchases.</p>
                      <button onClick={shareCoupon} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#60371b] px-5 py-3 text-sm font-bold text-white"><Icon name="share" size={16} /> Share coupon</button>
                    </div>
                    <div className="bg-[#dcb375] p-7 text-[#60371b]">
                      <p className="text-sm font-bold uppercase tracking-[0.2em]">Store Score</p>
                      <div className="mt-3 text-6xl font-black">86</div>
                      <p className="mt-4 text-sm font-semibold">Available credit</p>
                      <div className="text-3xl font-black">{formatUSD(storeCredit)}</div>
                      <p className="mt-2 text-sm">Earned from {formatUSD(referredSales)}</p>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm">
                    <h3 className="text-2xl font-semibold text-[#60371b]">Referred orders</h3>
                    <div className="mt-6 divide-y divide-[#60371b22] border-y border-[#60371b22]">
                      {referredOrders.map((order) => (
                        <div key={order.id} className="grid gap-3 py-5 md:grid-cols-[1fr_1fr_1fr_1fr] md:items-center">
                          <div><div className="font-bold text-[#60371b]">{order.id}</div><div className="text-sm text-gray-600">{order.customer}</div></div>
                          <div className="text-sm text-gray-700">{order.date}</div>
                          <div><div className="font-bold text-[#60371b]">{formatUSD(order.orderTotal)}</div><div className="text-xs text-gray-600">Order total</div></div>
                          <div className="text-left md:text-right"><div className="font-bold text-[#60371b]">+{formatUSD(order.reward)}</div><span className="mt-1 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">{order.status}</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`${APP_PAGE_BG} ${APP_PAGE_PADDING}`}>
      <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="h-full">
          <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-3xl bg-[#60371b] p-8 text-white">
            <img src="https://res.cloudinary.com/dnwij22qh/image/upload/q_auto/f_auto/v1777429230/not_connected_img_v3ponk.png" alt="Login illustration" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.25em] text-[#dcb375]">Account access</p>
              <h1 className="mt-3 text-5xl font-semibold">Login or create an account</h1>
              <p className="mt-5 text-lg leading-8 text-[#f7f0dc]">Consumers can register and purchase immediately. Contractors must submit business details and wait for approval.</p>
            </div>
          </div>
        </section>
        <section className="rounded-3xl bg-[#fffaeb] p-7 shadow-sm">
          <div className="mb-6 flex gap-2 rounded-2xl bg-[#f3f1ed] p-2">
            <button onClick={() => setMode("login")} className={`flex-1 rounded-xl px-4 py-3 font-semibold ${mode === "login" ? "bg-[#60371b] text-white" : "text-[#60371b]"}`}>Login</button>
            <button onClick={() => setMode("register")} className={`flex-1 rounded-xl px-4 py-3 font-semibold ${mode === "register" ? "bg-[#60371b] text-white" : "text-[#60371b]"}`}>Register</button>
          </div>
          {mode === "login" ? (
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-[#60371b]">Welcome back</h2>
              <FormField label="Email" type="email" />
              <FormField label="Password" type="password" />
              <Button onClick={() => onLogin("consumer", "checkout")} className="w-full">Login and continue</Button>
              <button onClick={() => onLogin("contractor", "account", "approved")} className="w-full rounded-xl border border-[#60371b] px-5 py-3 text-sm font-semibold text-[#60371b]">Login as contractor demo</button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-[#60371b]">Create account</h2>
              <div className="grid gap-3 md:grid-cols-2">
                <button onClick={() => setAccountType("consumer")} className={`rounded-2xl border p-4 text-left ${accountType === "consumer" ? "border-[#60371b] bg-[#f3f1ed]" : "border-[#60371b33]"}`}><b className="text-[#60371b]">Consumer</b><p className="text-sm text-gray-700">Private customer</p></button>
                <button onClick={() => setAccountType("contractor")} className={`rounded-2xl border p-4 text-left ${accountType === "contractor" ? "border-[#60371b] bg-[#f3f1ed]" : "border-[#60371b33]"}`}><b className="text-[#60371b]">Contractor</b><p className="text-sm text-gray-700">Requires approval</p></button>
              </div>
              {accountType === "consumer" ? (
                <div className="space-y-4">
                  <RegisterSection title="Personal Details"><FormField label="First Name" /><FormField label="Last Name" /><FormField label="Phone" /><FormField label="Email" type="email" /><FormField label="Password" type="password" /></RegisterSection>
                  <RegisterSection title="Address"><FormField label="Street Address" /><FormField label="City" /><FormField label="State" /><FormField label="ZIP Code" /></RegisterSection>
                  <div className="space-y-3 rounded-2xl bg-[#f3f1ed] p-5"><AgreementRow><LegalAgreementText setScreen={setScreen} /></AgreementRow><AgreementRow>I agree to receive updates and promotional communications</AgreementRow></div>
                  <Button onClick={() => onLogin("consumer", "checkout")} className="w-full">Create account and continue</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <RegisterSection title="Personal Details"><FormField label="First Name" /><FormField label="Last Name" /><FormField label="Phone" /><FormField label="Email" type="email" /><FormField label="Password" type="password" /></RegisterSection>
                  <RegisterSection title="Address"><FormField label="Street Address" /><FormField label="City" /><FormField label="State" /><FormField label="ZIP Code" /></RegisterSection>
                  <RegisterSection title="Business Details" description="Contractors must submit required business details and wait for admin approval."><FormField label="Business name" /><FormField label="License number" /><FormField label="Tax ID" /><label className="block text-[#60371b] md:col-span-2"><span className="mb-2 block font-semibold">Upload supporting documents</span><input type="file" multiple className="w-full rounded border border-[#60371b33] bg-white px-4 py-3" /></label></RegisterSection>
                  <div className="space-y-3 rounded-2xl bg-[#f3f1ed] p-5"><AgreementRow>I confirm the business details are accurate</AgreementRow><AgreementRow><LegalAgreementText setScreen={setScreen} /></AgreementRow></div>
                  <Button onClick={() => onLogin("contractor", "contractor", "pending")} className="w-full">Submit for approval</Button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
