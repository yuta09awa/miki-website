import {client} from '@/sanity/lib/client'
import {
  homePageQuery,
  siteSettingsQuery,
  officesQuery,
  faqsQuery,
  aboutPageQuery,
} from '@/sanity/lib/queries'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import StatsBand from '@/components/StatsBand'
import FaqSection from '@/components/FaqSection'
import ContactSection from '@/components/ContactSection'
import AboutSections from '@/components/AboutSections'
import HeritageTimeline from '@/components/HeritageTimeline'

export const revalidate = 60

export default async function HomePage() {
  const [home, settings, offices, allFaqs, about] = await Promise.all([
    client.fetch(homePageQuery),
    client.fetch(siteSettingsQuery),
    client.fetch(officesQuery),
    client.fetch(faqsQuery),
    client.fetch(aboutPageQuery),
  ])

  const faqs = home?.faqs?.length ? home.faqs : allFaqs

  return (
    <>
      <Hero hero={home?.hero} />
      <StatsBand stats={settings?.stats} />
      <FeaturedProducts products={home?.featuredProducts ?? []} />
      <AboutSections
        philosophy={about?.philosophy}
        sustainability={about?.sustainability}
      />
      <HeritageTimeline
        title={about?.heritage?.title}
        intro={about?.heritage?.intro}
        milestones={about?.heritage?.milestones}
      />
      <FaqSection faqs={faqs ?? []} />
      <ContactSection offices={offices ?? []} />
    </>
  )
}
