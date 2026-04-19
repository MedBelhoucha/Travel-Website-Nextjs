"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-stone-900/80 backdrop-blur-md">
      <div className="flex justify-between items-center px-6 md:px-12 py-6 max-w-screen-2xl mx-auto">
        <Link href="/" className="text-2xl font-serif text-primary dark:text-primary italic">
          Sahara Mirage
        </Link>
        <div className="hidden md:flex items-center space-x-10">
          <Link
            href="/tours"
            className={cn(
              "font-label text-[0.75rem] uppercase tracking-wider hover:text-primary transition-colors duration-300",
              isActive("/tours") ? "text-primary border-b-2 border-primary/30 pb-1" : "text-stone-600 dark:text-stone-400"
            )}
          >
            Tours
          </Link>
          <Link
            href="/destinations"
            className={cn(
              "font-label text-[0.75rem] uppercase tracking-wider hover:text-primary transition-colors duration-300",
              isActive("/destinations") ? "text-primary border-b-2 border-primary/30 pb-1" : "text-stone-600 dark:text-stone-400"
            )}
          >
            Destinations
          </Link>
          <Link
            href="/custom-trip"
            className={cn(
              "font-label text-[0.75rem] uppercase tracking-wider hover:text-primary transition-colors duration-300",
              isActive("/custom-trip") ? "text-primary border-b-2 border-primary/30 pb-1" : "text-stone-600 dark:text-stone-400"
            )}
          >
            Custom Trip
          </Link>
          <Link
            href="/about"
            className={cn(
              "font-label text-[0.75rem] uppercase tracking-wider hover:text-primary transition-colors duration-300",
              isActive("/about") ? "text-primary border-b-2 border-primary/30 pb-1" : "text-stone-600 dark:text-stone-400"
            )}
          >
            About
          </Link>
          <Link
            href="/blog"
            className={cn(
              "font-label text-[0.75rem] uppercase tracking-wider hover:text-primary transition-colors duration-300",
              isActive("/blog") ? "text-primary border-b-2 border-primary/30 pb-1" : "text-stone-600 dark:text-stone-400"
            )}
          >
            Blog
          </Link>
        </div>
        <div className="hidden md:block">
          <Link href="/contact" className="bg-primary text-on-primary px-8 py-3 rounded-xl font-label text-[0.75rem] uppercase tracking-widest hover:bg-primary-container transition-all duration-300">
            Contact Us
          </Link>
        </div>
        
        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-stone-600 dark:text-stone-400 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
      
      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex flex-col items-center py-6 space-y-6 shadow-xl">
          <Link
            href="/tours"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "font-label text-[0.875rem] uppercase tracking-wider hover:text-primary transition-colors duration-300",
              isActive("/tours") ? "text-primary" : "text-stone-600 dark:text-stone-400"
            )}
          >
            Tours
          </Link>
          <Link
            href="/destinations"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "font-label text-[0.875rem] uppercase tracking-wider hover:text-primary transition-colors duration-300",
              isActive("/destinations") ? "text-primary" : "text-stone-600 dark:text-stone-400"
            )}
          >
            Destinations
          </Link>
          <Link
            href="/custom-trip"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "font-label text-[0.875rem] uppercase tracking-wider hover:text-primary transition-colors duration-300",
              isActive("/custom-trip") ? "text-primary" : "text-stone-600 dark:text-stone-400"
            )}
          >
            Custom Trip
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "font-label text-[0.875rem] uppercase tracking-wider hover:text-primary transition-colors duration-300",
              isActive("/about") ? "text-primary" : "text-stone-600 dark:text-stone-400"
            )}
          >
            About
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "font-label text-[0.875rem] uppercase tracking-wider hover:text-primary transition-colors duration-300",
              isActive("/blog") ? "text-primary" : "text-stone-600 dark:text-stone-400"
            )}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-primary text-on-primary px-8 py-3 rounded-xl font-label text-[0.875rem] uppercase tracking-widest hover:bg-primary-container transition-all duration-300 mt-4"
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
