import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'A Story Rooted in the Red Earth',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Our Legacy',
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
      initialValue: 'Crafting Memories, Not Just Itineraries.',
    }),
    defineField({
      name: 'philosophyContent',
      title: 'Philosophy Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'philosophyImage',
      title: 'Philosophy Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'leadershipTitle',
      title: 'Leadership Section Title',
      type: 'string',
      initialValue: 'The Souls Behind the Mirage',
    }),
    defineField({
      name: 'leadershipDescription',
      title: 'Leadership Section Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'team',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'bio', title: 'Mini Bio', type: 'string' },
            { name: 'image', title: 'Portrait', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    }),
  ],
})
