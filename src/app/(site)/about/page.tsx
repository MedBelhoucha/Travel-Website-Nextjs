/* eslint-disable @typescript-eslint/no-explicit-any */
import NextImage from "next/image";
import { client } from "@/sanity/lib/client";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

export const revalidate = 0;

export default async function AboutPage() {
  const data = await client.fetch(ABOUT_QUERY);

  // Fallback defaults if data is missing
  const content = {
    title: data?.title || "A Story Rooted in the Red Earth",
    heroSubtitle: data?.heroSubtitle || "Our Legacy",
    heroDescription: data?.heroDescription || "We don't just sell tours; we curate the soul of Morocco. Born from the whispers of the Atlas and the heat of the dunes.",
    heroImage: data?.heroImage ? urlForImage(data.heroImage)?.url() : "https://lh3.googleusercontent.com/aida-public/AB6AXuCxjO49r66K8eVfhyKrfUoepjLk4Z4qWN_PkqD1TV-fw7xhsYoNqJZZe5DmYDerUMzEOp7rSEcyIzy0XMSAArubTt8df6F8HrLwdVedKj-N9TJDfk8tED6YKQMO28mxGjUceDzwi5BewtESe13149VFpF5zygs23rysoFsLBHz1CO1-i2BXoIGjoLfNPvaD95LYNbRnDpRLPxsOyjXo-j5W3-Lr0tX6u926hC2SP7EkBAzWoIcAdn6rPZGymdBItnB5-nKPvq385Mw",
    phiTitle: data?.philosophyTitle || "Crafting Memories, Not Just Itineraries.",
    phiImage: data?.philosophyImage ? urlForImage(data.philosophyImage)?.url() : "https://lh3.googleusercontent.com/aida-public/AB6AXuBTtwQgCmmTsenlCiUYMvHV1ZaGVIa_ExlTrk3ZEUGx8GwQywobp9M-vb9sBsbbo7r5gNaCgh_-JwP8KGFiWAkm-R33luehvcqVibzfBn6XLdMHOlxt3cY8GVVcFnRVee7vXJfADY8nx_alzN6Fa--j6xNEUCqzX3IEPjIZswFnr92i_OPvHJohWYYhiP0cFfj3wx-JK_PeSVFZvaaRp8RkLSj-V4Z2JkBCfwpk9zBKItutJb2gQ52qnccJrNbEC0fsX3iNAJJ0x-8",
    leadTitle: data?.leadershipTitle || "The Souls Behind the Mirage",
    leadDesc: data?.leadershipDescription || "Our team is a collective of nomads, designers, and historians dedicated to the art of travel.",
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-stone-900">
          <NextImage
            className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
            alt="Cinematic desert sunset"
            src={content.heroImage || ""}
            fill
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/90 md:to-surface"></div>
        </div>
        <div className="relative z-10 px-12 max-w-screen-2xl mx-auto w-full pt-32">
          <div className="max-w-3xl">
            <span className="font-label text-[0.75rem] tracking-[0.2em] text-surface-container-lowest uppercase mb-6 block underline underline-offset-8">
              {content.heroSubtitle}
            </span>
            <h1 className="font-headline text-[3.5rem] md:text-[5rem] text-surface leading-[1.1] italic mb-8">
              {content.title}
            </h1>
            <p className="font-body text-lg text-surface/90 leading-relaxed max-w-xl">
              {content.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative z-20 px-12 max-w-screen-2xl mx-auto -mt-40 pb-24">
        <div className="bg-surface-container-lowest p-8 sm:p-16 md:p-24 shadow-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-5">
              <span className="font-label text-[0.75rem] tracking-[0.2em] text-primary uppercase mb-4 block">
                The Philosophy
              </span>
              <h2 className="font-headline text-[2.5rem] text-on-surface leading-tight mb-8">
                {content.phiTitle}
              </h2>
              <div className="font-body text-lg text-on-surface-variant leading-relaxed space-y-6">
                {data?.philosophyContent ? (
                  <PortableText value={data.philosophyContent} />
                ) : (
                  <>
                    <p>
                      Founded in Marrakech, our journey began with a simple belief: travel should be an
                      editorial experience—rich with texture, intentional in its pace, and deeply connected
                      to the people who call this landscape home.
                    </p>
                    <p>
                      Every route we map and every guide we partner with is chosen to provide a narrative of
                      Morocco that goes beyond the surface. We invite you to lose yourself in the labyrinth,
                      and find yourself in the silence of the desert.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="md:col-span-7 flex flex-col items-end w-full">
              <div className="relative w-full aspect-[4/5] bg-stone-200">
                <NextImage
                  className="object-cover filter sepia-[0.1]"
                  alt="Traditional riad courtyard"
                  src={content.phiImage || ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-32 px-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <span className="font-label text-[0.75rem] tracking-[0.2em] text-primary uppercase mb-4 block">
              Leadership
            </span>
            <h2 className="font-headline text-[2.5rem] text-on-surface leading-tight">
              {content.leadTitle}
            </h2>
          </div>
          <p className="font-body text-on-surface-variant max-w-md italic opacity-80">
            {content.leadDesc}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {data?.team?.length > 0 ? (
            data.team.map((member: any, i: number) => (
              <div key={i} className="group">
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-stone-200">
                  {member.image && (
                    <NextImage
                      className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                      alt={member.name}
                      src={urlForImage(member.image)?.url() || ""}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                </div>
                <span className="font-label text-[0.7rem] text-primary uppercase tracking-widest mb-2 block">
                  {member.role}
                </span>
                <h4 className="font-headline text-xl mb-2">{member.name}</h4>
                <p className="font-body text-on-surface-variant italic text-sm">{member.bio}</p>
              </div>
            ))
          ) : (
            <div className="group">
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-stone-200">
                <NextImage
                  className="object-cover filter grayscale"
                  alt="Founder"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmEIfyhVkwbhY6_4ONUGSg8gg63-33qM9EjJJ-_ZBKjRA4rKtMiSWoCMzC2fS9r6uqSKYEMYR6uDHSQMvRsVMFXLcA6lc1ofhWUczXY9t57AiDkYG095D0arh7D8mYMumptcq7iVC4ruNzO37x_F4PRyNsmH8ahvQRE46AXOd0AWsWZcocD9oe7QW8IEDQchb_tFaiXbkaL5qrkJukhZa4vvAuwjKfq5LkehYhwbD_3bGxUttsimdsIHhrahob3hS6IJIC80-lnmM"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <span className="font-label text-[0.7rem] text-primary uppercase tracking-widest mb-2 block">
                Co-Founder
              </span>
              <h4 className="font-headline text-xl mb-2">Yassine El Amrani</h4>
              <p className="font-body text-on-surface-variant italic">Desert Architect & Lead Historian</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
