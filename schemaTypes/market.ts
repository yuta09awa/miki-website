import {defineField, defineType} from 'sanity'

export const market = defineType({
  name: 'market',
  title: 'Market Category',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({name: 'icon', type: 'string', description: 'Icon name or key'}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'descriptionShort', type: 'text', rows: 3}),
    defineField({
      name: 'descriptionLong',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({name: 'order', type: 'number', initialValue: 0}),
    defineField({name: 'showOnHome', type: 'boolean', initialValue: true}),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {select: {title: 'name', media: 'image'}},
})
