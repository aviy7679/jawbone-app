export function Footer({ setScreen }) {
  return (
    <footer className="mt-20 bg-[#60371b] text-white">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-12 md:grid-cols-4 md:px-10 lg:px-[100px]">
        <div>
          <h3 className="text-xl font-bold">Jawbone Product</h3>
          <p className="mt-4 text-sm text-[#f7f0dc]">
            Wholesale distribution of construction, agricultural, and building materials across the US.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Navigation</h4>
          <div className="space-y-2 text-sm">
            <button onClick={() => setScreen("home")} className="block">Home</button>
            <button onClick={() => setScreen("shop")} className="block">Shop</button>
            <button onClick={() => setScreen("contact")} className="block">FAQ</button>
            <button onClick={() => setScreen("privacy")} className="block">Privacy Policy</button>
            <button onClick={() => setScreen("terms")} className="block">Terms & Conditions</button>
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Contact</h4>
          <p className="text-sm text-[#f7f0dc]">Email: contact@jawboneproduct.com</p>
          <p className="mt-1 text-sm text-[#f7f0dc]">Phone: 0185 17 35 08</p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Support</h4>
          <p className="text-sm text-[#f7f0dc]">Fast delivery based on weight calculation.</p>
          <p className="mt-1 text-sm text-[#f7f0dc]">Contractor accounts available upon approval.</p>
        </div>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-xs text-[#f7f0dc]">
        © {new Date().getFullYear()} Jawbone Product. All rights reserved.
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <a
        href="https://wa.me/15551203400"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"
        aria-label="WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.76 11.76 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.1.55 4.14 1.6 5.94L0 24l6.36-1.66a11.77 11.77 0 0 0 5.7 1.45h.01c6.55 0 11.85-5.3 11.85-11.85 0-3.17-1.23-6.15-3.4-8.46ZM12.07 21.4c-1.8 0-3.56-.48-5.1-1.38l-.36-.22-3.78.99 1.01-3.69-.24-.38a9.44 9.44 0 0 1-1.44-5.02c0-5.22 4.25-9.47 9.47-9.47 2.53 0 4.9.98 6.7 2.77a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.47 9.47Zm5.2-7.05c-.28-.14-1.64-.8-1.9-.9-.26-.1-.45-.14-.64.14-.19.28-.73.9-.9 1.08-.16.19-.33.21-.61.07-.28-.14-1.2-.44-2.29-1.4-.85-.75-1.42-1.67-1.59-1.95-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.1-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.28-1 1-.99 2.43 0 1.43 1.02 2.8 1.16 3 .14.19 2 3.06 4.84 4.29.68.29 1.21.47 1.63.6.69.22 1.32.19 1.82.12.56-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.26-.19-.54-.33Z" />
        </svg>
      </a>
    </div>
  );
}
