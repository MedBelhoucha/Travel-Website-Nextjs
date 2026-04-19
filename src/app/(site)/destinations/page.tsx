/* eslint-disable @typescript-eslint/no-explicit-any */
import NextImage from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { DESTINATIONS_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const revalidate = 0;

export default async function DestinationsPage() {
  const destinations = await client.fetch(DESTINATIONS_QUERY);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[921px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-900/20 z-10"></div>
        <div className="absolute inset-0 w-full h-full bg-stone-200">
          <NextImage
            alt="Vast Saharan sand dunes at golden hour"
            className="object-cover filter brightness-75 contrast-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeB2FyXlOmHlPu1J7FRJqMI8BLXwrR1BdKPjiT8oXqJfXw0wn2fXv64dR1FxPMhfJnjPSBN_6ZmrPQ2PWXG3nfre3dEOclwY_R_iCAjyWhRpFZGQrT5rIY5pLTq4gTSo2FXSECWjUnLw_yyxTWacibY2bKwOigDCsQ6jR4lbk1HnlxYc2QPP-UvRNq4A-Rfv38DdWTkdLXs0vNrZ9IbkSimQKExKzltjpG7PFPy-ctLRrKQZdbBsuU0Rqf3J1HapItg08aOdgNYIs"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="relative z-20 text-center max-w-4xl px-6">
          <span className="font-label text-on-primary text-[0.75rem] uppercase tracking-[0.4em] mb-6 block">
            The Essence of Morocco
          </span>
          <h1 className="font-headline text-[3.5rem] md:text-[5rem] text-on-primary leading-tight mb-8 drop-shadow-lg">
            Explore the Soul of Morocco
          </h1>
          <div className="h-16 w-px bg-on-primary/40 mx-auto"></div>
        </div>
      </section>

      {/* Region Grid */}
      <section className="py-24 px-12 max-w-screen-2xl mx-auto md:-mt-[10vh] relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {destinations?.length > 0 ? (
            destinations.map((dest: any, index: number) => (
              <Link key={dest._id} href={`/destinations/${dest.slug.current}`} className={cn("group block", index % 2 === 1 ? "xl:translate-y-12" : "")}>
                <div className="bg-surface-container-lowest p-8 flex flex-col justify-end min-h-[500px] relative overflow-hidden h-full rounded-xl shadow-2xl bg-stone-200">
                  {dest.mainImage && (
                    <NextImage
                      alt={dest.title}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      src={urlForImage(dest.mainImage)?.url() || ""}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent"></div>
                  <div className="relative z-10 text-left">
                    <span className="font-label text-on-primary/80 text-[0.65rem] uppercase tracking-widest mb-2 block">
                      {dest.region || "Travel Destination"}
                    </span>
                    <h3 className="font-headline text-2xl text-on-primary mb-4">{dest.title}</h3>
                    <p className="text-on-primary/70 text-sm font-body leading-relaxed max-h-0 group-hover:max-h-20 transition-all duration-500 overflow-hidden opacity-0 group-hover:opacity-100">
                      {dest.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <>
              {/* Fallback Static Destinations can be added here */}
              <div className="col-span-full text-center text-on-surface-variant/40 italic py-12">
                Discovering more regions of the Maghreb...
              </div>
            </>
          )}
        </div>
      </section>

      {/* Spotlights (Editorial Highlights) */}
      <section className="py-32 bg-surface-container-low xl:pt-48">
        <div className="max-w-screen-2xl mx-auto px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div className="max-w-2xl">
              <span className="font-label text-primary text-[0.75rem] uppercase tracking-[0.3em] mb-4 block">
                Seasonal Highlights
              </span>
              <h2 className="font-headline text-[3rem] text-on-surface-variant leading-tight">
                Curated Spotlights
              </h2>
            </div>
            <p className="text-on-surface-variant font-body body-lg max-w-sm italic opacity-80 pb-2">
              Destinations hand-selected for their atmospheric depth and cultural resonance.
            </p>
          </div>

          {destinations?.slice(0, 3).map((dest: any, index: number) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-40">
              <div className={cn("md:col-span-7 relative", index % 2 === 1 ? "order-1 md:order-2" : "")}>
                <div className="relative w-full aspect-[4/5] rounded-sm shadow-xl overflow-hidden bg-stone-200">
                  {dest.mainImage && (
                    <NextImage
                      alt={dest.title}
                      className="object-cover"
                      src={urlForImage(dest.mainImage)?.url() || ""}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  )}
                </div>
                <div className={cn(
                  "absolute hidden md:block bg-surface p-10 max-w-md shadow-2xl",
                  index % 2 === 0 ? "-bottom-12 -right-12" : "-bottom-12 -left-12"
                )}>
                  <span className="font-label text-primary text-[0.65rem] uppercase tracking-widest mb-4 block">
                    {dest.region}
                  </span>
                  <h4 className="font-headline text-3xl mb-6">{dest.title}</h4>
                  <p className="text-on-surface-variant font-body leading-relaxed opacity-90">
                    {dest.description}
                  </p>
                  <Link
                    href={`/destinations/${dest.slug.current}`}
                    className="inline-block mt-8 font-label text-xs uppercase tracking-widest border-b border-primary pb-1 text-primary hover:opacity-70 transition-opacity"
                  >
                    Discover {dest.title}
                  </Link>
                </div>
              </div>
              <div className={cn("md:col-span-5 md:pl-12 block md:hidden", index % 2 === 1 ? "order-2 md:order-1" : "")}>
                <h4 className="font-headline text-3xl mb-6">{dest.title}</h4>
                <p className="text-on-surface-variant font-body leading-relaxed opacity-90">
                  {dest.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
