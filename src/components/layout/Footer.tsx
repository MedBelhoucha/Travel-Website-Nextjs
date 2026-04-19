import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { CONTACT_QUERY } from "@/sanity/lib/queries";

export default async function Footer() {
  const contact = await client.fetch(CONTACT_QUERY);

  return (
    <footer className="bg-stone-100 dark:bg-stone-950 w-full mt-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-20 max-w-screen-2xl mx-auto">
        <div className="col-span-1 md:col-span-1">
          <span className="text-3xl font-serif text-orange-900 dark:text-orange-100 block mb-6">
            Sahara Mirage
          </span>
          <p className="text-stone-500 font-body body-lg">
            Curated Journeys for the Modern Nomad.
          </p>
          {contact?.address && (
            <p className="text-stone-400 text-xs mt-6 font-body leading-relaxed">
              {contact.address}
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <span className="font-label label-md uppercase text-orange-900 dark:text-orange-200 mb-2">
            Explore
          </span>
          <Link className="text-stone-500 hover:translate-x-1 transition-transform duration-200" href="/destinations">
            Destinations
          </Link>
          <Link className="text-stone-500 hover:translate-x-1 transition-transform duration-200" href="/tours">
            Private Tours
          </Link>
          <Link className="text-stone-500 hover:translate-x-1 transition-transform duration-200" href="/blog">
            Blog
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <span className="font-label label-md uppercase text-orange-900 dark:text-orange-200 mb-2">
            Contact
          </span>
          {contact?.email && (
            <a href={`mailto:${contact.email}`} className="text-stone-500 hover:text-primary transition-colors font-body">
              {contact.email}
            </a>
          )}
          {contact?.phone && (
            <a href={`tel:${contact.phone}`} className="text-stone-500 hover:text-primary transition-colors font-body">
              {contact.phone}
            </a>
          )}
          {contact?.whatsapp && (
            <a href={`https://wa.me/${contact.whatsapp}`} className="text-stone-500 hover:text-primary transition-colors font-body flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">chat</span> WhatsApp
            </a>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <span className="font-label label-md uppercase text-orange-900 dark:text-orange-200 mb-2">
            Social
          </span>
          <div className="flex gap-4">
            {contact?.instagram && (
              <a className="text-stone-500 hover:text-primary transition-colors" href={contact.instagram} target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined">photo_camera</span>
              </a>
            )}
            {contact?.facebook && (
              <a className="text-stone-500 hover:text-primary transition-colors" href={contact.facebook} target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined">public</span>
              </a>
            )}
            <a className="text-stone-500 hover:text-primary transition-colors" href={`mailto:${contact?.email}`}>
              <span className="material-symbols-outlined">alternate_email</span>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-12 pb-10 text-stone-400 text-sm">
        © {new Date().getFullYear()} Sahara Mirage. All rights reserved.
      </div>
    </footer>
  );
}
