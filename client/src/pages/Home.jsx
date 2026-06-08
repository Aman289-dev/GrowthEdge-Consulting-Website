import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import CompanyOverview from '../components/home/CompanyOverview';
import Services from '../components/home/Services';
import ClientLogos from '../components/home/ClientLogos';
import Testimonials from '../components/home/Testimonials';
import ContactCTA from '../components/home/ContactCTA';
import NewsletterSection from '../components/shared/NewsletterSection';

export default function Home({ onBookConsultation }) {
  useEffect(() => {
    document.title = 'GrowthEdge Consulting — Helping Businesses Scale Faster & Smarter';
  }, []);

  return (
    <main>
      <Hero onBookConsultation={onBookConsultation} />
      <Stats />
      <CompanyOverview />
      <Services />
      <ClientLogos />
      <Testimonials />
      <ContactCTA onBookConsultation={onBookConsultation} />
      <NewsletterSection />
    </main>
  );
}
