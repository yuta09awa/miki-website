import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({name: 'heroImage', type: 'image', options: {hotspot: true}}),
    defineField({name: 'summary', type: 'text', rows: 3}),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
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
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
})
