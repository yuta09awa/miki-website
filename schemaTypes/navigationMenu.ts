import {defineField, defineType} from 'sanity'

export const navigationMenu = defineType({
  name: 'navigationMenu',
  title: 'Navigation Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Dropdown label, e.g. "Markets"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Position in header (lower = left)',
      initialValue: 0,
    }),
    defineField({
      name: 'flat',
      title: 'Flat list (no category headings)',
      type: 'boolean',
      description: 'Enable for menus like "Optical Products" that are a simple list.',
      initialValue: false,
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'categoryName', type: 'string'},
            {
              name: 'items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'label', type: 'string'},
                    {name: 'link', type: 'string', description: 'Path or URL'},
                  ],
                  preview: {select: {title: 'label', subtitle: 'link'}},
                },
              ],
            },
          ],
          preview: {
            select: {title: 'categoryName', items: 'items'},
            prepare: ({title, items}) => ({
              title: title || 'Category',
              subtitle: `${items?.length ?? 0} item(s)`,
            }),
          },
        },
      ],
    }),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', order: 'order'},
    prepare: ({title, order}) => ({title, subtitle: `order: ${order ?? 0}`}),
  },
})
