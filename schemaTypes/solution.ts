import {defineField, defineType} from 'sanity'

export const solution = defineType({
  name: 'solution',
  title: 'Solution',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      description: 'Top-level grouping (e.g. static-control, sustainable-materials)',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'isPillar',
      type: 'boolean',
      description: 'True for the category landing page (e.g. /solutions/static-control)',
      initialValue: false,
    }),
    defineField({name: 'eyebrow', type: 'string'}),
    defineField({name: 'tagline', type: 'text', rows: 2}),
    defineField({name: 'heroImage', type: 'image', options: {hotspot: true}}),
    defineField({name: 'problem', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'approach', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'productFamilies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string'},
            {name: 'description', type: 'text', rows: 3},
            {name: 'image', type: 'image', options: {hotspot: true}},
            {name: 'bullets', type: 'array', of: [{type: 'string'}]},
          ],
          preview: {select: {title: 'name', media: 'image'}},
        },
      ],
    }),
    defineField({
      name: 'specTable',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'value', type: 'string'},
          ],
        },
      ],
    }),
    defineField({name: 'industries', type: 'array', of: [{type: 'string'}]}),
    defineField({
      name: 'relatedSolutions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'solution'}]}],
    }),
    defineField({name: 'order', type: 'number', initialValue: 0}),
    defineField({
      name: 'seo',
      type: 'object',
      fields: [
        {name: 'title', type: 'string'},
        {name: 'description', type: 'text', rows: 3},
        {name: 'keywords', type: 'array', of: [{type: 'string'}]},
      ],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'heroImage'},
  },
})
