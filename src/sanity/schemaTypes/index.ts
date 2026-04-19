import { type SchemaTypeDefinition } from 'sanity'
import tour from './tour'
import destination from './destination'
import post from './post'
import testimonial from './testimonial'
import contactInfo from './contactInfo'
import aboutPage from './aboutPage'
import customTripPage from './customTripPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tour, destination, post, testimonial, contactInfo, aboutPage, customTripPage],
}
