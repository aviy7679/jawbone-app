import { useState, useMemo } from "react";
import { APP_PAGE_BG } from "../constants";
import { products } from "../data";
import { formatUSD } from "../utils";
import { Icon, Button, PreviewImage } from "../components/common/UI";

function PriceBox({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#fffaeb] p-4 shadow-sm">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-2xl font-bold text-[#60371b]">{formatUSD(value)}</div>
    </div>
  );
}

export function ProductPage({ product, addToCart, goBack, toggleFavorite, isFavorite }) {
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [heartPop, setHeartPop] = useState(false);

  const galleryImages = useMemo(
    () => [product.image, ...products.filter((item) => item.id !== product.id).slice(0, 3).map((item) => item.image)],
    [product]
  );

  const favoriteActive = isFavorite(product.id);
  const out = product.inStock === false;

  const handleFavorite = () => {
    toggleFavorite(product);
    setHeartPop(true);
    window.setTimeout(() => setHeartPop(false), 520);
  };

  const handleAddToCart = () => {
    if (!out) addToCart(product, qty);
  };

  return (
    <main className={`${APP_PAGE_BG} px-5 pb-28 pt-10 md:px-10 md:pb-16 md:pt-14 lg:px-[100px]`}>
      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-2">
        {/* Images Section */}
        <section className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm">
            {out ? (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40">
                <span className="rounded-full bg-white px-5 py-2 text-sm font-bold text-[#60371b]">Out of stock</span>
              </div>
            ) : null}

            <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between">
              <button
                onClick={() => goBack("shop")}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#60371b] shadow-lg"
                aria-label="Back to shop"
              >
                <Icon name="arrowLeft" size={19} />
              </button>
              <button
                onClick={handleFavorite}
                className={`relative flex h-11 w-11 items-center justify-center rounded-full shadow-lg ${
                  favoriteActive ? "bg-[#60371b] text-white" : "bg-white/95 text-[#60371b]"
                }`}
                aria-label="Add to favorites"
              >
                <span className={`absolute inset-0 rounded-full bg-[#dcb375]/40 ${heartPop ? "animate-ping" : "hidden"}`} />
                <Icon name="heart" size={19} />
              </button>
            </div>

            <button onClick={() => setZoomOpen(true)} className="block h-[560px] w-full cursor-zoom-in">
              <PreviewImage src={activeImage} alt={product.title} className="h-full w-full object-cover" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                onClick={() => setActiveImage(image)}
                className={`h-24 overflow-hidden rounded-2xl border-2 bg-white transition ${
                  activeImage === image ? "border-[#60371b]" : "border-transparent hover:border-[#dcb375]"
                }`}
                aria-label={`View product image ${index + 1}`}
              >
                <PreviewImage src={image} alt={`${product.title} gallery ${index + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* Product Info Section */}
        <section className="flex flex-col justify-center">
          <div className="mb-4 w-fit rounded-full bg-[#dcb375] px-4 py-2 text-sm font-bold text-[#60371b]">
            {product.category}
          </div>
          <h1 className="text-5xl font-semibold text-[#60371b]">{product.title}</h1>

          {out ? (
            <div className="mt-4 rounded-xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700">
              This product is currently out of stock
            </div>
          ) : null}

          <p className="mt-5 text-lg leading-8 text-gray-800">{product.description}</p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <PriceBox label="Retail" value={product.retailPrice} />
            <PriceBox label="Contractor" value={product.contractorPrice} />
            <PriceBox label="Store" value={product.storePrice} />
          </div>

          <div className="mt-6 rounded-2xl bg-[#fffaeb] p-5 text-[#60371b] shadow-sm">
            <div className="flex justify-between border-b border-[#60371b22] pb-3">
              <span>Weight</span>
              <b>{product.weight} kg</b>
            </div>
            <div className="flex justify-between pt-3">
              <span>Shipping</span>
              <b>Calculated by weight</b>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {!out ? (
              <div className="flex items-center rounded-xl border border-[#60371b] bg-white text-[#60371b]">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3" aria-label="Decrease quantity">
                  <Icon name="minus" />
                </button>
                <span className="w-12 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3" aria-label="Increase quantity">
                  <Icon name="plus" />
                </button>
              </div>
            ) : null}

            {out ? (
              <button className="rounded-xl border border-[#60371b] bg-white px-5 py-3 text-sm font-semibold text-[#60371b]">
                Notify me when available
              </button>
            ) : (
              <Button onClick={handleAddToCart}>Add to cart</Button>
            )}
          </div>
        </section>
      </div>

      {/* Mobile Sticky Bar */}
      {!out ? (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#60371b22] bg-white/95 p-4 shadow-[0_-8px_30px_rgba(96,55,27,0.15)] backdrop-blur md:hidden">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-[#60371b]">{product.title}</div>
              <div className="text-xs text-gray-600">
                {formatUSD(product.retailPrice)} · Qty {qty}
              </div>
            </div>
            <Button onClick={handleAddToCart} className="shrink-0 px-5">
              Add to cart
            </Button>
          </div>
        </div>
      ) : null}

      {/* Zoom Modal */}
      {zoomOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-5" onClick={() => setZoomOpen(false)}>
          <button className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#60371b]" aria-label="Close zoom">
            <Icon name="x" size={20} />
          </button>
          <PreviewImage
            src={activeImage}
            alt={`${product.title} zoomed`}
            className="max-h-[88vh] max-w-[94vw] rounded-3xl object-contain shadow-2xl"
          />
        </div>
      ) : null}
    </main>
  );
}
