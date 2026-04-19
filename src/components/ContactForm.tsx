'use client'

import { useState } from 'react'
import { submitGeneralInquiry } from '@/app/actions'

export default function ContactForm() {
  const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setStatus(null)
    
    const result = await submitGeneralInquiry(formData)
    
    setLoading(false)
    setStatus(result)
    
    if (result.success) {
      // @ts-expect-error
      document.getElementById('contact-form')?.reset()
    }
  }

  return (
    <div className="bg-surface p-8 md:p-12 rounded-xl">
      <h3 className="font-headline text-2xl text-on-surface-variant mb-8">Inquiry Form</h3>
      <form id="contact-form" action={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative">
            <label className="font-label text-[10px] uppercase tracking-widest text-stone-500 block mb-1">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Elena Vance"
              className="w-full bg-transparent border-0 border-b border-[#dcc1b9] py-3 px-0 focus:border-[#994126] focus:ring-0 transition-colors font-body placeholder:text-stone-300"
            />
          </div>
          <div className="relative">
            <label className="font-label text-[10px] uppercase tracking-widest text-stone-500 block mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="elena@example.com"
              className="w-full bg-transparent border-0 border-b border-[#dcc1b9] py-3 px-0 focus:border-[#994126] focus:ring-0 transition-colors font-body placeholder:text-stone-300"
            />
          </div>
        </div>

        <div className="relative">
          <label className="font-label text-[10px] uppercase tracking-widest text-stone-500 block mb-1">
            Your Vision for the Trip
          </label>
          <textarea
            name="vision"
            required
            rows={4}
            placeholder="Tell us about your dream Moroccan adventure..."
            className="w-full bg-transparent border-0 border-b border-[#dcc1b9] py-3 px-0 focus:border-[#994126] focus:ring-0 transition-colors font-body placeholder:text-stone-300 resize-none"
          ></textarea>
        </div>

        <div className="pt-6">
          <button
            disabled={loading}
            type="submit"
            className="w-full md:w-auto px-12 py-5 bg-[#994126] text-white font-label text-xs uppercase tracking-widest rounded-xl hover:bg-[#b8583c] transition-all duration-300 shadow-xl disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Submit Inquiry'}
          </button>
        </div>
        
        {status?.success && (
          <p className="mt-4 text-[#994126] font-label text-xs uppercase tracking-widest animate-pulse">
            {status.success}
          </p>
        )}
        {status?.error && (
          <p className="mt-4 text-red-500 font-label text-xs uppercase tracking-widest">
            {status.error}
          </p>
        )}
      </form>
    </div>
  )
}
