import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          {title: 'Chemical / Monomer', value: 'chemical'},
          {title: 'Optical Material', value: 'optical'},
          {title: 'Filter Media', value: 'filter'},
          {title: 'Coating', value: 'coating'},
          {title: 'Battery Material', value: 'battery'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({name: 'productName', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'productCode', type: 'string'}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'productName', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({name: 'category', type: 'string'}),
    defineField({name: 'iupacName', title: 'IUPAC Name', type: 'string'}),
    defineField({name: 'casNumber', title: 'CAS Number', type: 'string'}),
    defineField({
      name: 'tscaStatus',
      title: 'TSCA Status',
      type: 'string',
      options: {list: ['Listed', 'Not Listed', 'Pending', 'N/A']},
    }),
    defineField({
      name: 'htsCode',
      title: 'HTS / HTSUS Code',
      type: 'string',
      description: 'Harmonized Tariff Schedule code (e.g. 3912.90.0000) — surfaced for procurement.',
    }),
    defineField({name: 'descriptionShort', type: 'text', rows: 3}),
    defineField({
      name: 'descriptionLong',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'featureBullets',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'performanceTable',
      title: 'Performance Data Table',
      type: 'object',
      description: 'Rendered as a semantic HTML <table> — good for Google featured snippets.',
      fields: [
        {
          name: 'caption',
          type: 'string',
          description: 'e.g. "MCC-Modified PP Separator vs. Uncoated PP"',
        },
        {
          name: 'benchmarkLabel',
          type: 'string',
          description: 'Column header for benchmark/baseline (e.g. "Uncoated PP")',
        },
        {
          name: 'rows',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'property', type: 'string', validation: (r) => r.required()},
                {name: 'value', type: 'string', validation: (r) => r.required()},
                {name: 'unit', type: 'string'},
                {name: 'benchmark', type: 'string'},
                {name: 'notes', type: 'string'},
              ],
              preview: {
                select: {property: 'property', value: 'value', unit: 'unit'},
                prepare: ({property, value, unit}) => ({
                  title: property,
                  subtitle: [value, unit].filter(Boolean).join(' '),
                }),
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'applicationTags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({name: 'datasheet', type: 'file'}),
    defineField({
      name: 'chemicalSpecs',
      title: 'Chemical Specs',
      type: 'object',
      hidden: ({parent}) => parent?.productType !== 'chemical',
      fields: [
        {name: 'tg_c', type: 'string', title: 'Tg (°C)'},
        {name: 'mp_c', type: 'string', title: 'Melting Point (°C)'},
        {name: 'dielectricConstant', type: 'string', title: 'Dielectric Constant (Dk)'},
        {name: 'dissipationFactor', type: 'string', title: 'Dissipation Factor (Df)'},
      ],
    }),
    defineField({
      name: 'opticalSpecs',
      title: 'Optical Specs',
      type: 'object',
      hidden: ({parent}) => parent?.productType !== 'optical',
      fields: [
        {name: 'application', type: 'string'},
        {name: 'refractiveIndex', type: 'string'},
        {name: 'transmission', type: 'string'},
      ],
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'relatedProduct',
          fields: [
            {
              name: 'product',
              type: 'reference',
              to: [{type: 'product'}],
              validation: (r) => r.required(),
            },
            {
              name: 'relationType',
              type: 'string',
              options: {
                list: [
                  // Priority 1 — existing / research formulations
                  {title: 'Formulation Partner', value: 'formulation'},
                  // Priority 2 — complementary chemistry
                  {title: 'Curing Agent / Co-Reactant', value: 'curing'},
                  {title: 'Complementary Monomer', value: 'monomer'},
                  // Priority 3 — family
                  {title: 'Same Product Series', value: 'series'},
                  {title: 'Alternative Grade', value: 'alternative'},
                ],
                layout: 'radio',
              },
              validation: (r) => r.required(),
            },
            {
              name: 'note',
              type: 'string',
              description: 'e.g. "1.2:1 molar ratio, Matrimid chemistry" or "Upilex-S precursor"',
            },
          ],
          preview: {
            select: {
              title: 'product.productName',
              relationType: 'relationType',
              note: 'note',
            },
            prepare: ({title, relationType, note}) => ({
              title: title || 'Related product',
              subtitle: [relationType, note].filter(Boolean).join(' — '),
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', validation: (r) => r.max(70)},
        {name: 'metaDescription', type: 'text', rows: 2, validation: (r) => r.max(160)},
        {name: 'keywords', type: 'string'},
      ],
    }),
    defineField({name: 'featured', type: 'boolean', initialValue: false}),
  ],
  preview: {
    select: {title: 'productName', subtitle: 'casNumber', media: 'images.0'},
  },
})
