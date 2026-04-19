/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import { CUSTOM_TRIP_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import NextImage from "next/image";
import CustomTripForm from "@/components/CustomTripForm";

export const revalidate = 0;

export default async function CustomTripPage() {
  const data = await client.fetch(CUSTOM_TRIP_QUERY);

  // Fallbacks
  const content = {
    title: data?.title || "Your Journey, Handcrafted.",
    heroSubtitle: data?.heroSubtitle || "Bespoke Experiences",
    heroDesc: data?.heroDescription || "Escape the predictable. We curate private, luxury expeditions through Morocco tailored precisely to your rhythm, interests, and curiosity.",
    heroImage: data?.heroImage ? urlForImage(data.heroImage)?.url() : "https://lh3.googleusercontent.com/aida-public/AB6AXuBe-d2l9k2418Xgkq9NiJSs9cGEiUdDA0yc74IL1MrIKv0UvNfwY75Zs3f6j4rcfQdA0ILna8gCw0OvxHyJybi_F3Z-7lJhQSIfE6YdfjueUO51pME77iV6PBFrU3Eu6dFs5ajPzg2r0kBjupFnes4HI9vwl-gB7f_b3SVP60IfhMxukbzNKKZKI2NF6C5MjZqTt_CFSBz83QfFolwP_9twZK8CZdU0F2JSxxKE67t2aQnPfvgHc0hD-4HiJVwOJ6uwSitEAYKR3d4",
    phiTitle: data?.philosophyTitle || "Why Custom With Us?",
    phiImage: data?.philosophyImage ? urlForImage(data.philosophyImage)?.url() : "https://lh3.googleusercontent.com/aida-public/AB6AXuB-twB2dc51NYQKqhcDUosMwJGipOHYRLg20ceLqjpHWmipbAEF5d2ninp7FsobpRLHXbverYYuHxesOf0LHwYNsLPofjsFAn2QkhF3VEY2005n6vmkPhrY_GemAug1QIpTe_1OAtON9h_XtxiIDYA_8EEUrZG8-_-6wVVuLZMyRLam-GvglS-6brJi7A_YpK_G2tA8RH-KT9Wtp8wAnse_JENHTr63f5xGIHS0tZfK0qtTN6BWC0OS0ubJyjAxE51vW_dvODfu7EA",
    procTitle: data?.processTitle || "The Path to Sahara",
    inqTitle: data?.inquiryTitle || "Start Your Inquiry",
    inqDesc: data?.inquiryDescription || "Share your vision with us. Our designers will review your details and reach out within 24 hours to begin the consultation.",
    whatsapp: data?.whatsappNumber || "212600000000",
  };

  const defaultBenefits = [
    { icon: "verified_user", title: "Local Intimacy", description: "Direct connections with master artisans and hidden riads that aren't on any public map." },
    { icon: "auto_awesome", title: "Unrivaled Expertise", description: "Over 15 years of curating high-end nomadic experiences for discerning global travelers." },
    { icon: "support_agent", title: "24/7 Concierge", description: "A dedicated journey manager available around the clock from arrival to departure." }
  ];

  const defaultSteps = [
    { stepNumber: "01", icon: "forum", title: "Consultation", description: "An in-depth conversation to understand your tastes, pace, and passions." },
    { stepNumber: "02", icon: "edit_note", title: "Design", description: "We draft a primary itinerary blending iconic landmarks with secret gems." },
    { stepNumber: "03", icon: "tune", title: "Refinement", description: "Fine-tuning every transfer, meal preference, and private guide until perfect." },
    { stepNumber: "04", icon: "explore", title: "Adventure", description: "Your journey begins with every detail managed by our on-ground team." }
  ];

  const benefits = data?.benefits || defaultBenefits;
  const steps = data?.processSteps || defaultSteps;

  return (
    <main className="bg-surface min-h-screen">
      {/* Hero Section */}
      <header className="relative h-[921px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-stone-900">
          <NextImage
            className="w-full h-full object-cover grayscale-[0.2] brightness-75"
            alt="Handcrafted journey background"
            src={content.heroImage || ""}
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="relative z-10 px-12 max-w-screen-2xl mx-auto w-full pt-28">
          <div className="max-w-3xl">
            <span className="inline-block font-label text-white text-[0.75rem] uppercase tracking-[0.3em] mb-6 underline underline-offset-8">
              {content.heroSubtitle}
            </span>
            <h1 className="font-headline text-[3.5rem] leading-tight text-white mb-8 italic">
              {content.title}
            </h1>
            <p className="text-white/90 text-xl font-light leading-relaxed mb-12 max-w-xl">
              {content.heroDesc}
            </p>
            <a
              href="#inquiry"
              className="inline-block bg-surface text-primary px-8 py-4 rounded-xl font-label text-[0.75rem] uppercase tracking-widest hover:bg-surface-container-high transition-all shadow-xl"
            >
              Begin Your Design
            </a>
          </div>
        </div>
      </header>

      {/* Trust Section */}
      <section className="py-24 px-12 max-w-screen-2xl mx-auto bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="col-span-1 md:col-span-12 lg:col-span-5 lg:-mt-24 z-20 bg-surface-container-lowest p-12 shadow-2xl relative">
            <span className="font-label text-primary text-[0.75rem] uppercase tracking-widest mb-4 block underline underline-offset-4">
              Our Philosophy
            </span>
            <h2 className="font-headline text-[1.75rem] text-on-surface-variant mb-6 italic">
              {content.phiTitle}
            </h2>
            <div className="space-y-8">
              {benefits.map((benefit: any, index: number) => (
                <div key={index} className="flex gap-4">
                  <span className="material-symbols-outlined text-primary">{benefit.icon}</span>
                  <div>
                    <h4 className="font-bold text-on-surface mb-1">{benefit.title}</h4>
                    <p className="text-on-surface-variant/80 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 md:col-span-12 lg:col-span-7">
            <div className="relative w-full h-[600px] bg-stone-200 rounded-xl overflow-hidden shadow-sm">
              <NextImage
                className="object-cover"
                alt="Luxury nomad experience"
                src={content.phiImage || ""}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="px-12 max-w-screen-2xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-headline text-[2.5rem] text-on-surface mb-4 italic">
              {content.procTitle}
            </h2>
            <p className="font-label text-on-surface-variant text-[0.75rem] uppercase tracking-widest">
              How we craft your narrative
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-outline-variant/30">
            {steps.map((step: any, index: number) => (
              <div key={index} className="p-12 border-b lg:border-b-0 lg:border-r border-outline-variant/30 group hover:bg-surface-container transition-colors duration-500">
                <span className="font-headline text-5xl text-outline-variant/40 mb-8 block">{step.stepNumber}</span>
                <span className="material-symbols-outlined text-3xl text-primary mb-6">{step.icon}</span>
                <h3 className="font-headline text-xl mb-4 italic">{step.title}</h3>
                <p className="text-on-surface-variant/70 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-24 px-12 max-w-screen-2xl mx-auto" id="inquiry">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="font-headline text-[3.5rem] text-on-surface leading-tight mb-8 italic">
              {content.inqTitle}
            </h2>
            <p className="text-on-surface-variant text-lg font-light leading-relaxed mb-12">
              {content.inqDesc}
            </p>
            <div className="bg-surface-container-high p-8 rounded-xl shadow-sm">
              <h4 className="font-bold mb-4">Urgent Planning?</h4>
              <p className="text-sm text-on-surface-variant mb-6">
                If you are traveling within the next 14 days, we recommend reaching out via WhatsApp
                for immediate assistance.
              </p>
              <a
                href={`https://wa.me/${content.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-label text-[0.75rem] uppercase tracking-widest hover:opacity-90 transition-all shadow-md"
              >
                <span className="material-symbols-outlined">chat</span>
                WhatsApp Concierge
              </a>
            </div>
          </div>

          <CustomTripForm 
            travelerOptions={data?.travelerOptions} 
            budgetOptions={data?.budgetOptions} 
          />
        </div>
      </section>
    </main>
  );
}
