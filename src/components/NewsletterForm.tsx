'use client'

import { useState } from 'react'
import { subscribeToNewsletter } from '@/app/actions'

export default function NewsletterForm() {
  const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setStatus(null)
    
    const result = await subscribeToNewsletter(formData)
    
    setLoading(false)
    setStatus(result)
    
    if (result.success) {
      ;(document.getElementById('newsletter-form') as HTMLFormElement)?.reset()
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form id="newsletter-form" action={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input 
          name="email"
          type="email" 
          placeholder="Your Email" 
          required
          className="bg-surface border-none p-5 rounded-xl font-body text-sm flex-grow focus:ring-1 focus:ring-primary h-14 shadow-sm"
        />
        <button 
          disabled={loading}
          type="submit"
          className="bg-primary text-on-primary px-10 py-4 h-14 rounded-xl font-label text-xs uppercase tracking-widest hover:bg-primary-container transition-all shadow-md disabled:opacity-50"
        >
          {loading ? 'Joining...' : 'Subscribe'}
        </button>
      </form>
      
      {status?.success && (
        <p className="mt-4 text-primary font-label text-xs uppercase tracking-widest animate-pulse">
          {status.success}
        </p>
      )}
      {status?.error && (
        <p className="mt-4 text-red-500 font-label text-xs uppercase tracking-widest leading-relaxed">
          {status.error}
        </p>
      )}
    </div>
  )
}
