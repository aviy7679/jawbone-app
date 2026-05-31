import { formatUSD } from "../../utils";
import { Icon } from "./UI";
import { PreviewImage } from "./UI";

export function ProductCard({ product, addToCart, toggleFavorite, isFavorite, openProduct }) {
  const out = product.inStock === false;

  return (
    <article
      className={`overflow-hidden rounded-3xl p-4 shadow-sm transition ${
        out ? "bg-[#ece9e2] opacity-75 grayscale" : "bg-[#fffaeb] hover:-translate-y-1 hover:shadow-md"
      }`}
    >
      <div className="relative flex h-52 items-center justify-center overflow-hidden rounded-2xl bg-[#f3f1ed]">
        <PreviewImage src={product.image} alt={product.title} className="h-full w-full object-cover" />
        {out ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#60371b]">Out of stock</span>
          </div>
        ) : null}
        <span className="absolute right-3 top-3 rounded-full bg-[#fff4c8] px-3 py-1 text-xs font-semibold text-[#60371b]">
          {product.weight}kg
        </span>
        <button
          onClick={() => toggleFavorite(product)}
          className={`absolute left-3 top-3 rounded-full p-2 shadow-sm ${
            isFavorite(product.id) ? "bg-[#60371b] text-white" : "bg-white text-[#60371b]"
          }`}
          aria-label="Add to favorites"
        >
          <Icon name="heart" size={17} />
        </button>
      </div>

      <div className="pt-5 text-center">
        <h3 className="text-base font-semibold text-[#2b2b35]">{product.title}</h3>
        <span
          className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            out ? "bg-gray-200 text-gray-600" : "bg-[#f8dddd] text-[#60371b]"
          }`}
        >
          {out ? "Currently unavailable" : product.category}
        </span>
        <div className="mt-3 text-3xl font-bold text-[#60371b]">{formatUSD(product.retailPrice)}</div>

        {out ? (
          <button className="mt-4 flex w-full items-center justify-center rounded-full border border-[#60371b33] bg-white py-3 text-sm font-semibold text-[#60371b]">
            Notify me when available
          </button>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="mt-4 flex w-full items-center justify-between rounded-full border border-[#60371b] bg-white py-1 pl-5 pr-1 text-[#60371b]"
          >
            <span className="text-sm font-semibold">Add to Cart</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#60371b] text-white">
              <Icon name="cart" size={16} />
            </span>
          </button>
        )}

        <button onClick={() => openProduct(product)} className="mt-3 text-sm font-semibold text-[#60371b] underline">
          View details
        </button>
      </div>
    </article>
  );
}
