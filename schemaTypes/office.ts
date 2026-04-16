import {defineField, defineType} from 'sanity'

export const office = defineType({
  name: 'office',
  title: 'Office / Location',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'country', type: 'string'}),
    defineField({name: 'city', type: 'string'}),
    defineField({name: 'address', type: 'text', rows: 3}),
    defineField({name: 'phone', type: 'string'}),
    defineField({name: 'email', type: 'string', validation: (r) => r.email()}),
    defineField({name: 'isHeadquarters', type: 'boolean', initialValue: false}),
    defineField({name: 'established', type: 'number', description: 'Year established'}),
    defineField({
      name: 'coordinates',
      type: 'object',
      fields: [
        {name: 'lat', type: 'number'},
        {name: 'lng', type: 'number'},
      ],
    }),
    defineField({name: 'order', type: 'number', initialValue: 0}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'country'},
  },
})
