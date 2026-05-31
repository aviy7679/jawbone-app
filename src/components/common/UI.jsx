import { useState } from "react";

// Icon component with all icons
export function Icon({ name, size = 20 }) {
  const paths = {
    search: "M21 21l-4.35-4.35 M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z",
    cart: "M6 6h15l-2 9H8L6 6Z M6 6 5 3H2 M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8Z",
    plus: "M12 5v14 M5 12h14",
    minus: "M5 12h14",
    x: "M18 6 6 18 M6 6l12 12",
    truck: "M3 7h11v10H3V7Z M14 10h4l3 3v4h-7v-7Z M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    share: "M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7 M16 6l-4-4-4 4 M12 2v14",
    edit: "M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z",
    arrowLeft: "M19 12H5 M12 19l-7-7 7-7",
    zoomIn: "M21 21l-4.35-4.35 M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z M11 8v6 M8 11h6",
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.search} />
    </svg>
  );
}

// Button component
export function Button({ children, onClick, variant = "primary", className = "", type = "button", disabled = false }) {
  const base = "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition";
  const style =
    variant === "gold"
      ? "bg-[#dcb375] text-[#60371b] hover:bg-[#caa15e]"
      : variant === "outline"
      ? "border border-[#60371b] text-[#60371b] hover:bg-[#f7f0dc]"
      : "bg-[#60371b] text-white hover:bg-[#4d2c16]";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${style} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

// PreviewImage with fallback
export function PreviewImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#60371b] via-[#9d704a] to-[#dcb375] px-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-white ${className}`}>
        {alt}
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}

// Form fields
export function FormField({ label, type = "text" }) {
  return (
    <label className="mb-5 block text-[#60371b]">
      <span className="mb-2 block font-semibold">{label}</span>
      <input type={type} className="w-full rounded border border-[#60371b33] bg-[#f3f1ed] px-4 py-3 outline-none" />
    </label>
  );
}

export function TextAreaField({ label }) {
  return (
    <label className="mb-5 block text-[#60371b]">
      <span className="mb-2 block font-semibold">{label}</span>
      <textarea rows={5} className="w-full rounded border border-[#60371b33] bg-[#f3f1ed] px-4 py-3 outline-none" placeholder="How can we help?" />
    </label>
  );
}

// Profile fields
export function ProfileField({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#60371b22] bg-[#f3f1ed] px-4 py-3">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#60371b99]">{label}</div>
      <div className="mt-1 font-semibold text-[#60371b]">{value}</div>
    </div>
  );
}

export function EditableProfileField({ label, value, editable, onChange, type = "text" }) {
  if (!editable) return <ProfileField label={label} value={value} />;

  return (
    <label className="block rounded-2xl border border-[#60371b22] bg-[#f3f1ed] px-4 py-3">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#60371b99]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full bg-transparent font-semibold text-[#60371b] outline-none"
      />
    </label>
  );
}

// Account components
export function RegisterSection({ title, description, children }) {
  return (
    <div className="rounded-2xl bg-[#f3f1ed] p-5">
      <h3 className="text-xl font-bold text-[#60371b]">{title}</h3>
      {description ? <p className="mt-2 text-sm leading-6 text-gray-700">{description}</p> : null}
      <div className="mt-4 grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}

export function LegalAgreementText({ setScreen }) {
  return (
    <>
      {"I agree to the "}
      <button type="button" onClick={() => setScreen("privacy")} className="font-semibold underline">
        Privacy Policy
      </button>
      {" and "}
      <button type="button" onClick={() => setScreen("terms")} className="font-semibold underline">
        Terms & Conditions
      </button>
    </>
  );
}

export function AgreementRow({ children }) {
  return (
    <div className="flex items-start gap-3 text-sm text-[#60371b]">
      <input type="checkbox" className="mt-1 h-4 w-4" />
      <span>{children}</span>
    </div>
  );
}

// Filter component
export function FilterCheck({ checked, onClick, label }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 text-left text-sm">
      <span className={`flex h-5 w-5 items-center justify-center rounded border ${checked ? "border-[#60371b] bg-[#60371b] text-white" : "border-gray-400 bg-white"}`}>
        {checked ? "✓" : ""}
      </span>
      <span>{label}</span>
    </button>
  );
}

// Admin components
export function AdminStatCard({ label, value, note }) {
  return (
    <div className="rounded-3xl bg-[#fffaeb] p-6 shadow-sm">
      <p className="text-sm uppercase tracking-[0.2em] text-[#dcb375]">{label}</p>
      <div className="mt-3 text-4xl font-black text-[#60371b]">{value}</div>
      <p className="mt-2 text-sm text-gray-600">{note}</p>
    </div>
  );
}

export function AdminRow({ children }) {
  return (
    <div className="grid gap-4 border-b border-[#60371b22] px-5 py-4 text-sm text-[#60371b] last:border-b-0 md:grid-cols-5 md:items-center">
      {children}
    </div>
  );
}
