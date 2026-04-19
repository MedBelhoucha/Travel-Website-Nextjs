import { groq } from 'next-sanity'

export const TOURS_QUERY = groq`*[_type == "tour"] | order(_createdAt desc)`
export const FEATURED_TOURS_QUERY = groq`*[_type == "tour" && isFeatured == true] | order(_createdAt desc)`
export const TOUR_BY_SLUG_QUERY = groq`*[_type == "tour" && slug.current == $slug][0]`

export const DESTINATIONS_QUERY = groq`*[_type == "destination"] | order(title asc)`
export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"] {
  ...,
  "authorImage": authorImage.asset->url
}`
export const POSTS_QUERY = groq`*[_type == "post"] | order(publishedAt desc)`
export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`

export const CONTACT_QUERY = groq`*[_type == "contactInfo"][0]`
export const ABOUT_QUERY = groq`*[_type == "aboutPage"][0]`
export const CUSTOM_TRIP_QUERY = groq`*[_type == "customTripPage"][0] {
  ...,
  "heroImage": heroImage.asset->url,
  "philosophyImage": philosophyImage.asset->url
}`
export const DESTINATION_BY_SLUG_QUERY = groq`*[_type == "destination" && slug.current == $slug][0]`
