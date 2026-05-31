import { useState, useMemo } from "react";
import { APP_PAGE_BG, APP_PAGE_PADDING, APP_CONTAINER } from "../constants";
import { products, categories } from "../data";
import { Icon, FilterCheck } from "../components/common/UI";
import { ProductCard } from "../components/common/ProductCard";

export function Shop({ setSelected, addToCart, toggleFavorite, isFavorite, goToScreen }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [availability, setAvailability] = useState("in");

  const sortLabels = {
    featured: "Best Selling",
    low: "Price: Low to High",
    high: "Price: High to Low",
  };

  const visible = useMemo(() => {
    let list = products.filter(
      (p) => (category === "All" || p.category === category) && p.title.toLowerCase().includes(query.toLowerCase())
    );

    if (availability === "in") list = list.filter((p) => p.inStock !== false);
    if (availability === "out") list = list.filter((p) => p.inStock === false);

    if (sort === "low") list = [...list].sort((a, b) => a.retailPrice - b.retailPrice);
    if (sort === "high") list = [...list].sort((a, b) => b.retailPrice - a.retailPrice);

    return list;
  }, [query, category, sort, availability]);

  const cycleSort = () => setSort((current) => (current === "featured" ? "low" : current === "low" ? "high" : "featured"));

  const openProduct = (product) => {
    setSelected(product);
    goToScreen("product");
  };

  return (
    <main className={`${APP_PAGE_BG} ${APP_PAGE_PADDING}`}>
      <div className={APP_CONTAINER}>
        {/* Header */}
        <div className="rounded-3xl bg-[#60371b] p-8 text-white md:p-12">
          <p className="text-sm uppercase tracking-[0.25em] text-[#dcb375]">E-commerce catalog</p>
          <h1 className="mt-3 text-5xl font-semibold">Shop Products</h1>
          <p className="mt-4 max-w-2xl text-[#f7f0dc]">Search, filter, sort and add products to cart.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Search */}
            <div className="rounded-3xl bg-[#fffaeb] p-5 shadow-sm">
              <p className="text-lg font-bold text-[#60371b]">Search</p>
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#60371b22] bg-[#f3f1ed] px-4 py-3 text-[#60371b]">
                <Icon name="search" size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#60371b88]"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="rounded-3xl bg-[#fffaeb] p-5 shadow-sm">
              <h3 className="text-xl font-bold text-[#2b2b35]">Availability</h3>
              <div className="mt-4 space-y-3 text-[#2b2b35]">
                <FilterCheck
                  checked={availability === "in"}
                  onClick={() => setAvailability("in")}
                  label={`In Stock (${products.filter((p) => p.inStock !== false).length})`}
                />
                <FilterCheck
                  checked={availability === "out"}
                  onClick={() => setAvailability("out")}
                  label={`Out of stock (${products.filter((p) => p.inStock === false).length})`}
                />
              </div>

              <div className="my-6 h-px bg-gray-200" />

              <h3 className="text-xl font-bold text-[#2b2b35]">Product Category</h3>
              <div className="mt-4 space-y-3 text-[#2b2b35]">
                <FilterCheck checked={category === "All"} onClick={() => setCategory("All")} label="All Products" />
                {categories.map((cat) => (
                  <FilterCheck
                    key={cat.name}
                    checked={category === cat.name}
                    onClick={() => setCategory(cat.name)}
                    label={cat.name}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <section>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Showing {visible.length} products</p>
                <h2 className="text-2xl font-bold text-[#60371b]">Available Products</h2>
              </div>
              <button
                onClick={cycleSort}
                className="flex min-w-[170px] items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#2b2b35] shadow-sm"
              >
                <span>{sortLabels[sort]}</span>
                <span className="text-lg leading-none">↓</span>
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                  openProduct={openProduct}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
