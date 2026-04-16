import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({name: 'question', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'answer',
      type: 'array',
      of: [{type: 'block'}],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {list: ['General', 'Products', 'Ordering', 'Shipping', 'Technical']},
    }),
    defineField({name: 'order', type: 'number', initialValue: 0}),
  ],
  preview: {select: {title: 'question', subtitle: 'category'}},
})
