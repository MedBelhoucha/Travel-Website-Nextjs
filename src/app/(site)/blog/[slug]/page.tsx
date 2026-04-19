import NextImage from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

export const revalidate = 0;

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug: params.slug });

  if (!post) {
    return (
       <div className="pt-40 pb-20 text-center">
         <h1 className="text-4xl font-headline mb-4">Story Not Found</h1>
         <Link href="/blog" className="text-primary border-b border-primary pb-1 font-label text-sm uppercase tracking-widest">
           Return to Journal
         </Link>
       </div>
    );
  }

  return (
    <main className="bg-surface pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-12">
        {/* Post Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-8">
             <span className="font-label text-xs uppercase tracking-widest text-[#994126]">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
             </span>
             {post.category && (
               <>
                 <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                 <span className="font-label text-xs uppercase tracking-widest text-stone-400">
                    {post.category}
                 </span>
               </>
             )}
          </div>
          <h1 className="font-headline text-[3.5rem] leading-[1.1] text-on-surface mb-8 italic">
            {post.title}
          </h1>
          <p className="font-body text-xl text-on-surface-variant leading-relaxed opacity-90 border-l-4 border-stone-200 pl-8 py-2">
            {post.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="relative aspect-video mb-20 overflow-hidden bg-stone-200">
            <NextImage
              alt={post.title}
              className="w-full h-full object-cover"
              src={urlForImage(post.mainImage)?.url() || ""}
              fill
              priority
            />
          </div>
        )}

        {/* Post Content */}
        <div className="prose prose-lg prose-stone max-w-none">
          <PortableText value={post.body} />
        </div>

        {/* Back Link */}
        <div className="mt-24 pt-12 border-t border-outline-variant/30 flex justify-between items-center">
           <Link href="/blog" className="font-label text-sm uppercase tracking-widest text-primary flex items-center gap-2 hover:opacity-70 transition-opacity">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Journal
           </Link>
           <div className="flex gap-4">
              <span className="material-symbols-outlined text-stone-400 cursor-pointer hover:text-primary transition-colors">share</span>
           </div>
        </div>
      </article>
    </main>
  );
}
