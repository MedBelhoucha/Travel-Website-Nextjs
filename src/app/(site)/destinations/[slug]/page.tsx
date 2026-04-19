import NextImage from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { DESTINATION_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 0;

export default async function DestinationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const destination = await client.fetch(DESTINATION_BY_SLUG_QUERY, { slug: params.slug });

  if (!destination) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-headline mb-4">Destination Not Found</h1>
        <p className="mb-8">This region is currently under exploration.</p>
        <Link href="/destinations" className="text-primary border-b border-primary pb-1 font-label text-sm uppercase tracking-widest">
          Return to Destinations
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-surface">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-stone-900">
          {destination.mainImage && (
            <NextImage
              alt={destination.title}
              className="w-full h-full object-cover brightness-[0.7]"
              src={urlForImage(destination.mainImage)?.url() || ""}
              fill
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6 pt-20">
          <span className="font-label text-xs uppercase tracking-[0.4em] text-white/80 mb-6 block">
             Region Focus: {destination.region || "Morocco"}
          </span>
          <h1 className="font-headline text-[3.5rem] md:text-[5.5rem] text-white leading-[1.1] italic">
             {destination.title}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-12 max-w-screen-xl mx-auto">
         <div className="prose prose-lg prose-stone max-w-none">
            <h2 className="font-headline text-3xl mb-8 italic">About the Region</h2>
            <p className="font-body text-xl text-on-surface-variant leading-relaxed whitespace-pre-line">
               {destination.description}
            </p>
         </div>

         {/* Back Link */}
         <div className="mt-20 pt-10 border-t border-outline-variant/30 text-left">
            <Link href="/destinations" className="font-label text-xs uppercase tracking-widest text-primary flex items-center gap-2 hover:opacity-70 transition-opacity">
               <span className="material-symbols-outlined text-sm">arrow_back</span> Explore All Landscapes
            </Link>
         </div>
      </section>
    </main>
  );
}
