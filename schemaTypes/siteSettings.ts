import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton: enforced via structure in sanity.config.ts
  fields: [
    defineField({name: 'siteName', type: 'string', initialValue: 'Miki Sangyo'}),
    defineField({name: 'tagline', type: 'string'}),
    defineField({name: 'logo', type: 'image'}),
    defineField({
      name: 'nav',
      title: 'Primary Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'href', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Stats Band',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', type: 'string', description: 'e.g. "25+"'},
            {name: 'label', type: 'string', description: 'e.g. "Years of Experience"'},
          ],
        },
      ],
      validation: (r) => r.max(6),
    }),
    defineField({
      name: 'footer',
      type: 'object',
      fields: [
        {name: 'blurb', type: 'text', rows: 3},
        {
          name: 'columns',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'heading', type: 'string'},
                {
                  name: 'links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {name: 'label', type: 'string'},
                        {name: 'href', type: 'string'},
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {name: 'copyright', type: 'string'},
      ],
    }),
    defineField({
      name: 'social',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'platform', type: 'string'},
            {name: 'url', type: 'url'},
          ],
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      type: 'string',
      validation: (r) => r.email(),
    }),
    defineField({name: 'contactPhone', type: 'string'}),
  ],
  preview: {prepare: () => ({title: 'Site Settings'})},
})
