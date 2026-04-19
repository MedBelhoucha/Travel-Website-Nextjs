import NextImage from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { FEATURED_TOURS_QUERY, DESTINATIONS_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 0;

export default async function Home() {
  const [featuredTours, destinations, testimonials] = await Promise.all([
    client.fetch(FEATURED_TOURS_QUERY),
    client.fetch(DESTINATIONS_QUERY),
    client.fetch(TESTIMONIALS_QUERY),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[921px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-stone-900">
          <NextImage
            alt="Hero image"
            className="w-full h-full object-cover brightness-[0.7]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxjO49r66K8eVfhyKrfUoepjLk4Z4qWN_PkqD1TV-fw7xhsYoNqJZZe5DmYDerUMzEOp7rSEcyIzy0XMSAArubTt8df6F8HrLwdVedKj-N9TJDfk8tED6YKQMO28mxGjUceDzwi5BewtESe13149VFpF5zygs23rysoFsLBHz1CO1-i2BXoIGjoLfNPvaD95LYNbRnDpRLPxsOyjXo-j5W3-Lr0tX6u926hC2SP7EkBAzWoIcAdn6rPZGymdBItnB5-nKPvq385Mw"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <span className="font-label text-[0.75rem] uppercase tracking-[0.4em] text-white/80 mb-6 block">
            Crafting Bespoke Moroccan Journeys
          </span>
          <h1 className="font-headline text-[3.5rem] md:text-[6.5rem] leading-[1.1] text-white italic drop-shadow-2xl">
            Where Desert Dreams Find Their Horizon
          </h1>
          <div className="mt-12 flex flex-col md:flex-row gap-8 justify-center items-center">
             <Link href="/tours" className="bg-primary text-on-primary px-12 py-5 rounded-xl font-label text-[0.75rem] uppercase tracking-widest hover:bg-primary-container transition-all shadow-xl">
               Explore Collections
             </Link>
             <Link href="/custom-trip" className="text-white border-b-2 border-white/30 pb-1 font-label text-[0.75rem] uppercase tracking-widest hover:border-white transition-all">
               Curate Your Trip
             </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-32 px-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="font-label text-primary text-[0.75rem] uppercase tracking-[0.3em] mb-4 block underline underline-offset-8">
              The Expedition Series
            </span>
            <h2 className="font-headline text-[3rem] text-on-surface-variant leading-tight">
              Curated Collections: The Soul of the Maghreb
            </h2>
          </div>
          <Link href="/tours" className="text-outline font-label text-[0.75rem] uppercase tracking-widest border-b border-outline hover:text-primary hover:border-primary transition-all pb-1">
            Browse All Tours
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {featuredTours?.length > 0 ? (
            featuredTours.map((tour: any) => (
              <Link key={tour._id} href={`/tours/${tour.slug.current}`} className="group">
                <article>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-8 bg-stone-200">
                    {tour.mainImage && (
                      <NextImage
                        alt={tour.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        src={urlForImage(tour.mainImage)?.url() || ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="space-y-4">
                    <span className="font-label text-[0.7rem] uppercase tracking-[0.2em] text-outline">
                      {tour.duration}
                    </span>
                    <h3 className="font-headline text-2xl text-on-surface group-hover:text-primary transition-colors">
                      {tour.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-on-surface-variant/40 italic py-12">
              Our latest expeditions are being curated...
            </div>
          )}
        </div>
      </section>

      {/* Destinations Section */}
      <section className="bg-surface-container-low py-32">
        <div className="max-w-screen-2xl mx-auto px-12">
           <div className="text-center mb-24">
             <span className="font-label text-primary text-[0.75rem] uppercase tracking-[0.3em] mb-4 block">
                The Regions
             </span>
             <h2 className="font-headline text-[3.5rem] text-on-surface">Explore by Landscape</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {destinations?.map((dest: any) => (
                <Link key={dest._id} href={`/destinations/${dest.slug.current}`} className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-stone-200">
                   {dest.mainImage && (
                     <NextImage
                       alt={dest.title}
                       className="object-cover transition-transform duration-1000 group-hover:scale-110"
                       src={urlForImage(dest.mainImage)?.url() || ""}
                       fill
                       sizes="(max-width: 768px) 100vw, 25vw"
                     />
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
                   <h3 className="absolute bottom-8 left-8 text-white font-headline text-2xl">{dest.title}</h3>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-surface">
         <div className="max-w-screen-2xl mx-auto px-12 text-center">
            <span className="material-symbols-outlined text-[4rem] text-primary/30 mb-8">format_quote</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
               {testimonials?.length > 0 ? (
                 testimonials.map((testimonial: any) => (
                   <div key={testimonial._id} className="bg-surface-container-low p-10 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                     <div>
                       <p className="font-headline text-2xl text-on-surface italic leading-relaxed mb-10">
                         "{testimonial.quote}"
                       </p>
                     </div>
                     <div className="flex items-center gap-5">
                       {testimonial.authorImage && (
                         <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-stone-200">
                           <NextImage
                             alt={testimonial.author}
                             src={testimonial.authorImage}
                             fill
                             className="object-cover"
                           />
                         </div>
                       )}
                       <div>
                         <div className="font-label text-[0.7rem] uppercase tracking-[0.2em] text-primary font-bold">
                            {testimonial.author}
                         </div>
                         {testimonial.location && (
                           <div className="text-[10px] uppercase tracking-widest text-outline mt-1 font-label">
                             {testimonial.location}
                           </div>
                         )}
                       </div>
                     </div>
                   </div>
                 ))
               ) : (
                 <p className="col-span-full text-center font-body text-xl opacity-40">Authentic experiences, shared by modern nomads.</p>
               )}
            </div>
         </div>
      </section>
    </main>
  );
}
