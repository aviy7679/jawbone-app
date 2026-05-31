import { ASSETS, APP_PAGE_BG, APP_PAGE_PADDING } from "../constants";
import { categories } from "../data";
import { Button, PreviewImage } from "../components/common/UI";

export function Home({ setScreen }) {
  const deliverySteps = [
    {
      image: ASSETS.delivery1,
      alt: "Warehouse & Preparation",
      title: "Warehouse & Preparation",
      description: "Everything begins in our warehouse. Here, we receive, organize, and carefully prepare each order, ensuring materials are properly packed and ready for transport. Our team works with precision so every load leaves in perfect condition.",
    },
    {
      image: ASSETS.delivery2,
      alt: "Transportation in Motion",
      title: "Transportation in Motion",
      description: "Once loaded, the materials begin their journey. Our trucks hit the road following efficient and well-planned logistics, ensuring safe and on-time deliveries. Each shipment is monitored to make sure it arrives exactly where it's needed.",
    },
    {
      image: ASSETS.delivery3,
      alt: "Delivery to the Customer",
      title: "Delivery to the Customer",
      description: "The process ends at the destination. Materials are unloaded directly at the customer's site or property with the same care used during preparation. This ensures every delivery is completed reliably and without complications.",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-5 py-20 md:px-10 lg:px-[100px]">
        <PreviewImage src={ASSETS.hero} alt="Jawbone hero image" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto max-w-[1240px]">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#dcb375]">Wholesale Distribution</p>
          <h1 className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl">
            Wholesale Distribution & Delivery of Materials and Products
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
            Stock supply and distribution for construction, agricultural, and general building materials.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => setScreen("shop")}>Shop Products</Button>
            <Button variant="outline" onClick={() => setScreen("account")} className="border-white bg-white/10 text-white">
              Login / Register
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`${APP_PAGE_BG} ${APP_PAGE_PADDING}`}>
        <div className="mx-auto max-w-[1240px] text-center">
          <h2 className="text-3xl font-semibold text-[#60371b] md:text-4xl">Find the products you need</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setScreen("shop")}
                className="group relative h-[230px] overflow-hidden rounded-lg text-white"
              >
                <PreviewImage
                  src={cat.img}
                  alt={cat.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/5" />
                <div className="absolute bottom-5 left-4 right-4 text-center text-base font-bold uppercase tracking-wide">
                  {cat.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-[522px] bg-[linear-gradient(92deg,rgb(58_33_17)_40%,rgb(162_129_73)_66%)] px-5 py-16 md:px-10 lg:px-[100px]">
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dcb375]">About</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">About Jawbone Products</h2>
            <p className="mt-5 text-lg leading-8 text-white/90">
              Jawbone Products is a wholesale distributor and stock dealer based in Chatsworth, Los Angeles. We supply a wide range of construction materials, agricultural products, and general building supplies to contractors, businesses, and the public. Our operation is focused on stock availability, volume supply, and reliable distribution.
            </p>
            <p className="mt-4 text-lg font-semibold uppercase leading-8 tracking-wide text-white">
              BUILT TO SUPPORT COMMERCIAL DEMAND AND ONGOING PROJECTS
            </p>
          </div>
          <div className="relative h-[320px] overflow-hidden rounded-2xl md:h-full">
            <PreviewImage src={ASSETS.about} alt="About Jawbone Products" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Delivery Process Section */}
      <section className="flex w-full flex-col items-center justify-center gap-8 px-6 py-12 md:gap-10 md:px-12 md:py-14 lg:gap-[49px] lg:px-16 lg:py-16">
        <h2 className="text-center text-2xl font-semibold text-[#60371b] md:text-3xl lg:text-4xl">Our Delivery Process</h2>
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {deliverySteps.map((step) => (
            <article key={step.title} className="flex w-full flex-col items-start gap-4 bg-transparent md:gap-[17px]">
              <PreviewImage
                src={step.image}
                alt={step.alt}
                className="h-[200px] w-full rounded-lg object-cover md:h-[223px]"
              />
              <div className="flex w-full flex-col items-start gap-2">
                <h3 className="text-xl font-bold text-gray-900 md:text-2xl">{step.title}</h3>
                <p className="text-base leading-[1.4] text-gray-900 md:text-lg md:leading-[27px] lg:text-xl">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Serving Projects Section */}
      <section className="grid min-h-[420px] bg-[#f3f1ed] lg:grid-cols-[610px_1fr]">
        <div className="flex flex-col justify-center px-6 py-14 md:px-12 lg:px-[99px]">
          <h2 className="text-3xl font-semibold text-[#60371b] md:text-4xl">Serving Projects Across the United States</h2>
          <p className="mt-5 text-lg leading-8 text-gray-900">
            What started with deliveries in Florida, Miami, and Houston, Texas, has grown into a nationwide service network.
          </p>
        </div>
        <div className="relative min-h-[300px] overflow-hidden">
          <PreviewImage src={ASSETS.serving} alt="Serving projects across" className="h-full w-full object-contain object-bottom" />
        </div>
      </section>
    </main>
  );
}
