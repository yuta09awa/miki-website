// Seeds the About Page singleton.
// Usage: node scripts/seed-about.mjs
import fs from 'node:fs'
import path from 'node:path'
import {createClient} from '@sanity/client'

const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (m) process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, '')
  }
}

const client = createClient({
  projectId: 'g8n7tvko',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const block = (text) => ({
  _type: 'block',
  _key: Math.random().toString(36).slice(2, 10),
  style: 'normal',
  markDefs: [],
  children: [{_type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: []}],
})

const doc = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heroEyebrow: 'Since 1674',
  heroTitle: 'A Forest of Value',
  heroSubtitle:
    'For more than 350 years, Miki Sangyo has connected global manufacturers and customers through trusted expertise in specialty chemicals and materials.',
  philosophy: {
    title: 'Beyond 350 — Our Management Philosophy',
    intro: [
      block(
        'Founded in Enpo 2 (1674), Miki Sangyo has built trust through more than 350 years of business excellence. Our management philosophy centers on "discipline and order," ensuring steady growth while adapting to changing times and customer needs.',
      ),
      block(
        'We connect global manufacturers and customers through our expertise, creating value that contributes to a sustainable future society. Our four core strengths guide every aspect of our business.',
      ),
    ],
    pillars: [
      {
        _key: 'p1',
        icon: 'Building2',
        title: 'Professionalism',
        description:
          'Establishing trust through our accumulated knowledge and expertise built over more than 350 years.',
      },
      {
        _key: 'p2',
        icon: 'Globe',
        title: 'Flexibility',
        description:
          'Responding to diverse customer needs with our global network and adaptable business approach.',
      },
      {
        _key: 'p3',
        icon: 'Lightbulb',
        title: 'Creativity',
        description:
          'Creating new value through innovative thinking and challenging conventional business models.',
      },
      {
        _key: 'p4',
        icon: 'ShieldCheck',
        title: 'Sustainable Future',
        description:
          'Contributing to environmental and social sustainability for future generations.',
      },
    ],
  },
  sustainability: {
    title: 'Building a Sustainable Future',
    intro: [
      block(
        'At Miki Sangyo, we believe in creating value that goes beyond business success. Our commitment to environmental and social responsibility shapes how we operate globally.',
      ),
      block(
        'Through our "A Forest of Value" philosophy, we cultivate sustainable practices that benefit both our customers and the communities we serve worldwide.',
      ),
    ],
    pillars: [
      {
        _key: 's1',
        icon: 'Leaf',
        title: 'Environmental Responsibility',
        description:
          'Committed to reducing environmental impact through sustainable chemical supply practices and eco-friendly solutions.',
      },
      {
        _key: 's2',
        icon: 'Recycle',
        title: 'Circular Economy',
        description:
          'Promoting resource efficiency and waste reduction by supporting circular business models in chemical industries.',
      },
      {
        _key: 's3',
        icon: 'Heart',
        title: 'Social Impact',
        description:
          'Contributing to society through responsible business practices and supporting community development initiatives.',
      },
      {
        _key: 's4',
        icon: 'Globe',
        title: 'Global Sustainability',
        description:
          'Working with international partners to address global challenges and create a sustainable future for all.',
      },
    ],
  },
}

await client.createOrReplace(doc)
console.log('✓ About Page seeded')
