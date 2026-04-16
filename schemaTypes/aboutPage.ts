import {defineField, defineType} from 'sanity'

const pillarsField = {
  name: 'pillars',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'icon',
          type: 'string',
          description:
            'lucide-react icon name (e.g. Building2, Globe, Lightbulb, ShieldCheck, Leaf, Recycle, Heart)',
        },
        {name: 'title', type: 'string'},
        {name: 'description', type: 'text', rows: 3},
      ],
      preview: {select: {title: 'title', subtitle: 'icon'}},
    },
  ],
} as const

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({name: 'heroEyebrow', type: 'string'}),
    defineField({name: 'heroTitle', type: 'string'}),
    defineField({name: 'heroSubtitle', type: 'text', rows: 3}),

    defineField({
      name: 'philosophy',
      title: 'Management Philosophy Section',
      type: 'object',
      fields: [
        {name: 'title', type: 'string'},
        {name: 'intro', type: 'array', of: [{type: 'block'}]},
        pillarsField,
      ],
    }),

    defineField({
      name: 'heritage',
      title: 'Heritage Timeline',
      type: 'object',
      fields: [
        {name: 'title', type: 'string'},
        {name: 'intro', type: 'text', rows: 3},
        {
          name: 'milestones',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'year', type: 'string'},
                {name: 'title', type: 'string'},
                {name: 'description', type: 'text', rows: 2},
              ],
              preview: {select: {title: 'year', subtitle: 'title'}},
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'sustainability',
      title: 'Sustainability Section',
      type: 'object',
      fields: [
        {name: 'title', type: 'string'},
        {name: 'intro', type: 'array', of: [{type: 'block'}]},
        pillarsField,
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'About Page'})},
})
