'use server'

/**
 * Server action to handle newsletter subscriptions.
 */
export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email')
  
  if (!email) return { error: 'Email is required' }

  // In a production app, you would connect this to Mailchimp, Resend, or your DB.
  console.log('Newsletter subscription:', email)
  
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return { success: 'Thank you for joining the Nomad\'s Circle!' }
}

/**
 * Server action to handle general inquiries from the contact page.
 */
export async function submitGeneralInquiry(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const vision = formData.get('vision')

  if (!name || !email || !vision) {
    return { error: 'All fields are required' }
  }

  // In a production app, you would use Resend, Formspree, or SendGrid here.
  console.log('General Inquiry Submission:', { name, email, vision })

  await new Promise(resolve => setTimeout(resolve, 1000))

  return { success: 'Your inquiry has been received. We will be in touch shortly.' }
}

/**
 * Server action to handle custom trip inquiries.
 */
export async function submitCustomTripInquiry(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const dates = formData.get('dates')
  const travelers = formData.get('travelers')
  const budget = formData.get('budget')
  const vision = formData.get('vision')

  if (!name || !email || !vision) {
    return { error: 'Name, email, and vision are required' }
  }

  // In a production app, you would use Resend, Formspree, or SendGrid here.
  console.log('Custom Trip Inquiry Submission:', { name, email, dates, travelers, budget, vision })

  await new Promise(resolve => setTimeout(resolve, 1000))

  return { success: 'Your handcrafted journey request has been received. Our designers will reach out within 24 hours.' }
}
