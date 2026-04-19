import NextImage from "next/image";
import { client } from "@/sanity/lib/client";
import { CONTACT_QUERY } from "@/sanity/lib/queries";
import ContactForm from "@/components/ContactForm";

export const revalidate = 0;

export default async function ContactPage() {
  const contact = await client.fetch(CONTACT_QUERY);

  return (
    <main className="bg-surface text-on-surface min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[614px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-stone-900">
          <NextImage
            alt="wide cinematic shot of a luxury desert resort at sunrise"
            className="w-full h-full object-cover opacity-90"
            src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=2000&q=80"
            fill
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-stone-900/10"></div>
        </div>
        <div className="relative z-10 text-center px-6 pt-24">
          <p className="font-label text-xs uppercase tracking-[0.2em] text-white mb-6">
            Begin Your Journey
          </p>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-white italic max-w-4xl leading-tight">
            Let's Start Your Story
          </h1>
        </div>
      </section>

      {/* Main Content Canvas */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:-mt-[120px] bg-surface-container-lowest p-8 md:p-20 shadow-2xl rounded-xl">
          {/* Left Column: Get in Touch */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl text-on-surface-variant mb-12">
                Get in Touch
              </h2>

              {/* Contact Details */}
              <div className="space-y-12">
                {/* Office */}
                {contact?.address && (
                  <div className="group">
                    <span className="font-label text-[10px] uppercase tracking-widest text-[#994126] mb-3 block">
                      Our Headquarters
                    </span>
                    <p className="font-body text-lg text-on-surface leading-relaxed whitespace-pre-line">
                      {contact.address}
                    </p>
                  </div>
                )}

                {/* Direct Lines */}
                <div className="group">
                  <span className="font-label text-[10px] uppercase tracking-widest text-[#994126] mb-3 block">
                    Direct Lines
                  </span>
                  <div className="space-y-3">
                    {contact?.whatsapp && (
                      <a
                        href={`https://wa.me/${contact.whatsapp}`}
                        className="flex items-center gap-3 text-lg text-on-surface hover:text-[#994126] transition-colors group"
                      >
                        <span className="material-symbols-outlined text-[#25D366]">chat</span>
                        <span>{contact.whatsapp}</span>
                        <span className="text-[10px] uppercase tracking-tighter opacity-40">
                          WhatsApp Concierge
                        </span>
                      </a>
                    )}
                    {contact?.phone && (
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex items-center gap-3 text-lg text-on-surface hover:text-[#994126] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[#89726c]">call</span>
                        <span>{contact.phone}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Email */}
                {contact?.email && (
                  <div className="group">
                    <span className="font-label text-[10px] uppercase tracking-widest text-[#994126] mb-3 block">
                      Email
                    </span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-xl md:text-2xl font-headline italic hover:text-[#994126] transition-colors overflow-hidden text-ellipsis break-all"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Social Section */}
            <div className="mt-20">
              <p className="font-label text-[10px] uppercase tracking-widest text-stone-400 mb-6">
                Follow the Mirage
              </p>
              <div className="flex gap-8">
                {contact?.instagram && (
                  <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-[#994126] transition-all duration-300">
                    <span className="material-symbols-outlined">photo_camera</span>
                  </a>
                )}
                {contact?.facebook && (
                  <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-[#994126] transition-all duration-300">
                    <span className="material-symbols-outlined">public</span>
                  </a>
                )}
                <a href={`mailto:${contact?.email}`} className="text-on-surface-variant hover:text-[#994126] transition-all duration-300">
                  <span className="material-symbols-outlined">alternate_email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
