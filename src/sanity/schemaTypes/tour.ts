import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tour',
  title: 'Tour',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. 8 Days, 7 Nights',
    }),
    defineField({
      name: 'groupSize',
      title: 'Group Size',
      type: 'string',
      description: 'e.g. Max 6 Nomads',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      description: 'e.g. Easy, Moderate, High Altitude',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', title: 'Day Number', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'content', title: 'Content', type: 'text' },
            { name: 'image', title: 'Image', type: 'image' },
          ],
        },
      ],
    }),
    defineField({
      name: 'inclusions',
      title: 'Inclusions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'exclusions',
      title: 'Exclusions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Desert', value: 'desert' },
          { title: 'Culture', value: 'culture' },
          { title: 'Coast', value: 'coast' },
          { title: 'Luxury', value: 'luxury' },
          { title: 'Short Breaks', value: 'short-breaks' },
        ],
      },
    }),
  ],
})
