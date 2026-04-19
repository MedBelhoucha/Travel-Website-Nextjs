'use client'

import { useState } from 'react'
import { submitCustomTripInquiry } from '@/app/actions'

interface CustomTripFormProps {
  travelerOptions?: string[]
  budgetOptions?: string[]
}

export default function CustomTripForm({ 
  travelerOptions = ['Solo Traveler', 'Couple', 'Family (3-5)', 'Small Group (6+)'],
  budgetOptions = ['$3k - $5k', '$5k - $10k', '$10k+']
}: CustomTripFormProps) {
  const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setStatus(null)
    
    const result = await submitCustomTripInquiry(formData)
    
    setLoading(false)
    setStatus(result)
    
    if (result.success) {
      ;(document.getElementById('custom-trip-form') as HTMLFormElement)?.reset()
    }
  }

  return (
    <div className="bg-surface-container-low p-12 rounded-xl shadow-2xl border border-outline-variant/10">
      <form id="custom-trip-form" action={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant mb-2">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="E.g. Elena Vance"
              className="bg-transparent border-0 border-b border-outline-variant py-2 px-0 text-on-surface focus:border-primary focus:ring-0 placeholder:text-stone-300 transition-colors"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="elena@example.com"
              className="bg-transparent border-0 border-b border-outline-variant py-2 px-0 text-on-surface focus:border-primary focus:ring-0 placeholder:text-stone-300 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant mb-2">
              Estimated Dates
            </label>
            <input
              name="dates"
              type="text"
              placeholder="Oct 2024 - Nov 2024"
              className="bg-transparent border-0 border-b border-outline-variant py-2 px-0 text-on-surface focus:border-primary focus:ring-0 placeholder:text-stone-300 transition-colors"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant mb-2">
              Travelers
            </label>
            <select 
              name="travelers"
              className="bg-transparent border-0 border-b border-outline-variant py-2 px-0 text-on-surface focus:border-primary focus:ring-0 appearance-none transition-colors"
            >
              {travelerOptions.map((option, i) => (
                <option key={i}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant mb-2">
            Estimated Budget (Per Person)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {budgetOptions.map((option, i) => (
              <label key={i} className="cursor-pointer">
                <input type="radio" name="budget" value={option} className="hidden peer" defaultChecked={i === 1} />
                <div className="text-center py-3 border border-outline-variant rounded-lg peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all text-sm">
                  {option}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant mb-2">
            Tell us about your dream trip
          </label>
          <textarea
            name="vision"
            required
            rows={4}
            placeholder="Interests, special occasions, or preferred regions..."
            className="bg-transparent border-0 border-b border-outline-variant py-2 px-0 text-on-surface focus:border-primary focus:ring-0 placeholder:text-stone-300 resize-none transition-colors"
          ></textarea>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-primary text-on-primary py-5 rounded-xl font-label text-[0.75rem] uppercase tracking-[0.2em] hover:bg-primary-container transition-all shadow-xl active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Inquiry'}
        </button>
        
        {status?.success && (
          <p className="mt-4 text-primary font-label text-[0.7rem] uppercase tracking-widest animate-pulse text-center">
            {status.success}
          </p>
        )}
        {status?.error && (
          <p className="mt-4 text-red-500 font-label text-[0.7rem] uppercase tracking-widest text-center">
            {status.error}
          </p>
        )}
      </form>
    </div>
  )
}
