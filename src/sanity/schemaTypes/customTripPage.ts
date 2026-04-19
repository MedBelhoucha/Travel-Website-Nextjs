import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'customTripPage',
  title: 'Custom Trip Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Your Journey, Handcrafted.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Bespoke Experiences',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'philosophyTitle',
      title: 'Philosophy Title',
      type: 'string',
      initialValue: 'Why Custom With Us?',
    }),
    defineField({
      name: 'philosophyImage',
      title: 'Philosophy Aside Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits/Reasons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon (Material Symbol Name)', type: 'string' },
            { name: 'title', title: 'Benefit Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'processTitle',
      title: 'Process Section Title',
      type: 'string',
      initialValue: 'The Path to Sahara',
    }),
    defineField({
      name: 'processSteps',
      title: 'Journey Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stepNumber', title: 'Step Number (e.g. 01)', type: 'string' },
            { name: 'icon', title: 'Material Icon Name', type: 'string' },
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'inquiryTitle',
      title: 'Inquiry Section Title',
      type: 'string',
      initialValue: "Start Your Inquiry",
    }),
    defineField({
      name: 'inquiryDescription',
      title: 'Inquiry Section Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number for Urgent Planning',
      type: 'string',
      description: 'E.g. 212600000000 (No spaces or plus sign for the link)',
      initialValue: '212600000000',
    }),
    defineField({
      name: 'travelerOptions',
      title: 'Inquiry Dropdown: Travelers Options',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Solo Traveler', 'Couple', 'Family (3-5)', 'Small Group (6+)'],
    }),
    defineField({
      name: 'budgetOptions',
      title: 'Inquiry: Budget Options (Per Person)',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['$3k - $5k', '$5k - $10k', '$10k+'],
    }),
  ],
})
