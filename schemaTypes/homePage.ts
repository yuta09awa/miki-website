import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      type: 'object',
      fields: [
        {name: 'eyebrow', type: 'string', description: 'e.g. "A Forest of Value"'},
        {name: 'title', type: 'string'},
        {name: 'subtitle', type: 'text', rows: 2},
        {name: 'backgroundImage', type: 'image', options: {hotspot: true}},
        {
          name: 'primaryCta',
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'href', type: 'string'},
          ],
        },
        {
          name: 'secondaryCta',
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'href', type: 'string'},
          ],
        },
        {
          name: 'pillars',
          title: 'Hero Pillars',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'icon', type: 'string'},
                {name: 'title', type: 'string'},
                {name: 'description', type: 'text', rows: 2},
              ],
            },
          ],
          validation: (r) => r.max(4),
        },
      ],
    }),
    defineField({
      name: 'featuredProducts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'Overrides products flagged as featured. Leave empty to use the featured flag.',
      validation: (r) => r.max(8),
    }),
    defineField({
      name: 'featuredMarkets',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'market'}]}],
      validation: (r) => r.max(6),
    }),
    defineField({
      name: 'featuredServices',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'faq'}]}],
    }),
    defineField({
      name: 'seo',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', validation: (r) => r.max(70)},
        {name: 'metaDescription', type: 'text', rows: 2, validation: (r) => r.max(160)},
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Home Page'})},
})
