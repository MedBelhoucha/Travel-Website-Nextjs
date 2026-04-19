/* eslint-disable @typescript-eslint/no-explicit-any */
import NextImage from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import NewsletterForm from "@/components/NewsletterForm";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const revalidate = 0;

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const allPosts = await client.fetch(POSTS_QUERY);
  const activeCategory = searchParams.category || "all";

  const filteredPosts = activeCategory === "all"
    ? allPosts
    : allPosts.filter((post: any) => post.category === activeCategory);

  const categories = [
    { name: "All Stories", value: "all" },
    { name: "Culture", value: "culture" },
    { name: "Guides", value: "guides" },
    { name: "Photography", value: "photography" },
    { name: "Philosophy", value: "philosophy" },
  ];

  return (
    <main className="bg-surface pt-24 min-h-screen">
      {/* Header Section */}
      <header className="px-12 py-24 border-b border-outline-variant/30 flex flex-col md:flex-row justify-between items-end gap-12 text-left">
        <div className="max-w-4xl">
          <span className="font-label text-primary text-[0.75rem] uppercase tracking-[0.3em] mb-4 block underline underline-offset-8">
            The Nomad&apos;s Journal
          </span>
          <h1 className="font-headline text-[3.5rem] md:text-[5.5rem] leading-[1.05] text-on-surface-variant italic">
            Chronicles of the <br /> Red Earth & Endless Dunes
          </h1>
        </div>
        <p className="font-body text-on-surface-variant text-lg max-w-sm italic opacity-80 pb-3">
          Deep dives into Maghrebi culture, landscape photography tips, and the philosophy of travel.
        </p>
      </header>

      {/* Categories / Filter Bar */}
      <nav className="px-12 py-10 sticky top-24 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-start">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={`/blog${cat.value === 'all' ? '' : `?category=${cat.value}`}`}
              className={cn(
                "font-label text-xs uppercase tracking-widest transition-colors pb-1 border-b-2",
                activeCategory === cat.value
                  ? "text-primary border-primary"
                  : "text-outline hover:text-on-surface border-transparent"
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Blog Grid (Masonry-like) */}
      <section className="px-12 py-20 max-w-screen-2xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-12">
          {filteredPosts?.length > 0 ? (
            filteredPosts.map((post: any, index: number) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block mb-12 break-inside-avoid">
                <article className="flex flex-col text-left">
                  <div className="relative overflow-hidden mb-6 bg-stone-200 rounded-sm shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                     {post.mainImage && (
                       <NextImage
                         alt={post.title}
                         className={cn(
                           "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105",
                           index % 4 === 1 ? "aspect-[3/4]" : "aspect-square"
                         )}
                         src={urlForImage(post.mainImage)?.url() || ""}
                         width={600}
                         height={index % 4 === 1 ? 800 : 600}
                       />
                     )}
                     <div className="absolute top-6 left-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="bg-surface/90 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] uppercase tracking-widest text-on-surface">
                           Read Story
                        </span>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="font-label text-[0.65rem] uppercase tracking-widest text-primary">
                           {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        {post.category && (
                           <span className="text-[8px] uppercase tracking-widest text-stone-400 font-label">
                             {post.category}
                           </span>
                        )}
                     </div>
                     <h2 className="font-headline text-2xl text-on-surface leading-tight group-hover:text-primary transition-colors italic">
                        {post.title}
                     </h2>
                     <p className="font-body text-sm text-on-surface-variant line-clamp-3 leading-relaxed opacity-80">
                        {post.excerpt}
                     </p>
                  </div>
                </article>
              </Link>
            ))
          ) : (
             <div className="col-span-full text-center py-24 italic text-on-surface-variant/40">
               No stories found in this chapter.
             </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="bg-surface-container-low py-32 px-12 mt-20">
         <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-headline text-4xl mb-6 italic">Join the Nomad&apos;s Circle</h3>
            <p className="font-body text-on-surface-variant text-lg mb-12 max-w-2xl mx-auto">
               Receive monthly dispatches on hidden riads, desert star charts, and upcoming curated expeditions.
            </p>
            <NewsletterForm />
         </div>
      </section>
    </main>
  );
}
