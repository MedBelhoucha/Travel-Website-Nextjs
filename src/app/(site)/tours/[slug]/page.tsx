/* eslint-disable @typescript-eslint/no-explicit-any */
import NextImage from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { TOUR_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 0;

export default async function TourDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const tour = await client.fetch(TOUR_BY_SLUG_QUERY, { slug: params.slug });

  if (!tour) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-headline mb-4">Journey Not Found</h1>
        <p className="mb-8">This specific expedition is currently being re-charted.</p>
        <Link href="/tours" className="text-primary border-b border-primary pb-1 font-label text-sm uppercase tracking-widest">
          Return to Collections
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-surface">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          {tour.mainImage && (
            <NextImage
              alt={tour.title}
              className="w-full h-full object-cover filter brightness-[0.8]"
              src={urlForImage(tour.mainImage)?.url() || ""}
              fill
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent"></div>
        </div>
        <div className="relative z-10 px-12 pb-20 max-w-screen-2xl mx-auto w-full">
           <div className="max-w-4xl">
              <span className="font-label text-[0.7rem] text-primary uppercase tracking-[0.4em] mb-6 block">
                 {tour.duration} • {tour.difficulty || 'Bespoke'}
              </span>
              <h1 className="font-headline text-[3.5rem] md:text-[5.5rem] text-white leading-[1.1] italic">
                 {tour.title}
              </h1>
           </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <div className="bg-stone-100 dark:bg-stone-900/50 border-y border-outline-variant/20">
        <div className="max-w-screen-2xl mx-auto px-12 py-8 flex flex-wrap gap-12">
            <div className="flex items-center gap-3">
               <span className="material-symbols-outlined text-primary">groups</span>
               <div>
                  <span className="block text-[10px] uppercase tracking-widest text-stone-400 font-label">Group Size</span>
                  <span className="text-sm font-medium">{tour.groupSize || 'Custom'}</span>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <span className="material-symbols-outlined text-primary">calendar_today</span>
               <div>
                  <span className="block text-[10px] uppercase tracking-widest text-stone-400 font-label">Duration</span>
                  <span className="text-sm font-medium">{tour.duration}</span>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <span className="material-symbols-outlined text-primary">explore</span>
               <div>
                  <span className="block text-[10px] uppercase tracking-widest text-stone-400 font-label">Difficulty</span>
                  <span className="text-sm font-medium">{tour.difficulty || 'Expert Led'}</span>
               </div>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24 px-12 max-w-screen-2xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Left: Content */}
            <div className="lg:col-span-8 space-y-16">
               <div className="prose prose-lg prose-stone max-w-none">
                  <p className="font-body text-xl leading-relaxed text-on-surface-variant italic border-l-4 border-primary pl-8 py-2">
                    {tour.description}
                  </p>
               </div>

               {/* Itinerary */}
               {tour.itinerary && tour.itinerary.length > 0 && (
                 <div className="space-y-12">
                    <h2 className="font-headline text-3xl italic">The Path Forward</h2>
                    <div className="space-y-12 border-l border-outline-variant/30 pl-8">
                       {tour.itinerary.map((item: any, idx: number) => (
                         <div key={idx} className="relative">
                            <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                               <div className="w-1.5 h-1.5 rounded-full bg-surface"></div>
                            </div>
                            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-2 block">
                               Day {item.day}
                            </span>
                            <h3 className="font-headline text-xl mb-4">{item.title}</h3>
                            <p className="font-body text-on-surface-variant leading-relaxed mb-6 opacity-90">
                               {item.content}
                            </p>
                            {item.image && (
                               <div className="relative aspect-video rounded-sm overflow-hidden bg-stone-200">
                                  <NextImage
                                     src={urlForImage(item.image)?.url() || ""}
                                     alt={item.title}
                                     fill
                                     className="object-cover"
                                     sizes="(max-width: 768px) 100vw, 50vw"
                                  />
                               </div>
                            )}
                         </div>
                       ))}
                    </div>
                 </div>
               )}
            </div>

            {/* Right: Sidebar / Booking */}
            <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
               <div className="bg-surface-container-lowest p-10 shadow-2xl rounded-xl border border-outline-variant/10">
                  <h3 className="font-headline text-2xl mb-8 italic">Interested?</h3>
                  
                  {/* Inclusions */}
                  <div className="space-y-8 mb-12">
                     <div>
                        <span className="font-label text-[10px] uppercase tracking-widest text-[#994126] mb-4 block underline underline-offset-4">
                           What&apos;s Included
                        </span>
                        <ul className="space-y-3">
                           {tour.inclusions?.map((item: string, i: number) => (
                             <li key={i} className="flex gap-3 text-sm text-stone-600 font-body">
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                {item}
                             </li>
                           ))}
                        </ul>
                     </div>
                  </div>

                  <Link href="/contact" className="block w-full text-center bg-primary text-on-primary py-5 rounded-xl font-label text-xs uppercase tracking-widest hover:bg-primary-container transition-all shadow-xl">
                     Request Availability
                  </Link>
               </div>
            </aside>
         </div>
      </section>
    </main>
  );
}
