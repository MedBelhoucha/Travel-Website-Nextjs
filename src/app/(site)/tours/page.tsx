import NextImage from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { TOURS_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const revalidate = 0;

export default async function ToursPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const allTours = await client.fetch(TOURS_QUERY);
  const activeCategory = searchParams.category || "all";

  const filteredTours = activeCategory === "all" 
    ? allTours 
    : allTours.filter((tour: any) => tour.category === activeCategory);

  const categories = [
    { name: "All", value: "all" },
    { name: "Desert", value: "desert" },
    { name: "Culture", value: "culture" },
    { name: "Coast", value: "coast" },
    { name: "Luxury", value: "luxury" },
    { name: "Short Breaks", value: "short-breaks" },
  ];

  return (
    <main className="pt-24 bg-surface min-h-screen">
      {/* Hero Section */}
      <header className="relative h-[614px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-on-surface/20 z-10"></div>
        <NextImage
          className="absolute inset-0 w-full h-full object-cover filter brightness-90"
          alt="wide cinematic shot of golden sahara sand dunes at sunrise"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdz6pPmzhMndHWxBhH2GH2LMYkloYoXDVDNu64sA0rSqo7l7nf3oDq5ooBoFYIem1QWnZmZ4lD2Sm_jujETLHcpSOS10_8p7IYYMnQI98xVrcLs1HEZg-jI6Mb0ftrQyf0tl17zC2Yl--MMmh175Dmcmfh83UKsj2yNZOxU7IlXrLriK95Ws_vu3wI7q4Yn1sjpZ3ppaZPZviUcNT3P-qsy_ijh91iCWG7cORZdu_gYwjiKDMQa4W8PGLmYmCKbq69-BZEOHaOSpQ"
          fill
          sizes="100vw"
          priority
        />
        <div className="relative z-20 text-center px-6">
          <h1 className="font-headline text-5xl md:text-7xl text-white drop-shadow-lg leading-tight uppercase tracking-widest">
            {activeCategory === 'all' ? 'Our Collections' : activeCategory.replace('-', ' ')}
          </h1>
          <p className="font-body text-white/90 text-lg md:text-xl mt-6 max-w-2xl mx-auto font-light italic">
            Hand-selected journeys through the soul of the Maghreb.
          </p>
        </div>
      </header>

      {/* Filter Bar */}
      <section className="max-w-screen-2xl mx-auto px-12 mt-12 mb-16">
        <div className="flex flex-wrap justify-center gap-4 border-b border-outline-variant/30 pb-8">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={`/tours${cat.value === 'all' ? '' : `?category=${cat.value}`}`}
              className={cn(
                "px-6 py-2 rounded-full text-[10px] font-label uppercase tracking-widest transition-all",
                activeCategory === cat.value
                  ? "bg-primary text-on-primary shadow-lg scale-105"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Tour Grid */}
      <section className="max-w-screen-2xl mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {filteredTours?.length > 0 ? (
            filteredTours.map((tour: any, index: number) => (
              <Link key={tour._id} href={`/tours/${tour.slug.current}`} className={cn("group", (index + 1) % 3 === 2 ? "lg:translate-y-12" : "")}>
                <article>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-6 bg-stone-200">
                    {tour.mainImage && (
                      <NextImage
                        alt={tour.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={urlForImage(tour.mainImage)?.url() || ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                       {tour.isFeatured && (
                         <div className="bg-surface/90 backdrop-blur-md px-3 py-1 rounded-sm">
                           <span className="text-[10px] font-label uppercase tracking-widest text-[#994126]">
                             Featured
                           </span>
                         </div>
                       )}
                       {tour.category && (
                         <div className="bg-stone-900/40 backdrop-blur-sm px-3 py-1 rounded-sm">
                           <span className="text-[8px] font-label uppercase tracking-widest text-white">
                             {tour.category}
                           </span>
                         </div>
                       )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[0.7rem] font-label uppercase tracking-[0.2em] text-outline">
                        {tour.duration}
                      </span>
                    </div>
                    <h3 className="font-headline text-2xl text-on-surface group-hover:text-primary transition-colors leading-tight">
                      {tour.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))
          ) : (
             <div className="col-span-full text-center py-20 italic text-on-surface-variant/40">
                No journeys found in this collection.
             </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-32 mb-24 px-12">
        <div className="max-w-screen-xl mx-auto bg-stone-100 p-16 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
          <div className="relative z-10 max-w-xl text-left">
            <h2 className="font-headline text-4xl md:text-5xl text-on-surface mb-6 leading-tight italic">
              Looking for something unique?
            </h2>
            <p className="font-body text-on-surface-variant text-lg mb-8">
              Let us weave your personal narrative. Our master concierges specialize in crafting
              bespoke itineraries tailored to your specific rhythm and curiosities.
            </p>
            <Link
              href="/custom-trip"
              className="inline-block bg-primary text-on-primary px-10 py-4 rounded-xl text-sm font-label uppercase tracking-widest hover:bg-primary-container transition-all active:scale-95 shadow-xl"
            >
              Build Your Custom Trip
            </Link>
          </div>
          <div className="relative z-10 w-full md:w-1/3">
            <div className="relative aspect-[4/5] w-full bg-stone-200">
              <NextImage
                alt="Notebook and Coffee"
                className="w-full object-cover shadow-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZM1dI8dYz9T1tvn-JyanyyvYfnHU6sGOpAnpwStndiUlSuPSsZazp4_B6O4OqO_4Z1Arz4ot9xJioMZowPPI_PWl9Na1KVVt_616-2SVibM1UnuFlpTwVtSnOTyB1Z0bDSdtwmVgrTXmwkyT96BqbKXYlz6rHBT5MDYk3vAc7hcTbViR9oyFjlo12Qa3W9-hcEMVzZDLSoVEKth9WbourA5F1TaFm-UwmZgDupHidb_ZisqCFctCwX8NiaSoo3fb1k0J6It3LXdw"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
