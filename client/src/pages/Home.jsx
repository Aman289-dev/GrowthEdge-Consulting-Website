import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import ClientLogos from '../components/home/ClientLogos';
import Stats from '../components/home/Stats';
import Services from '../components/home/Services';
import CompanyOverview from '../components/home/CompanyOverview';
import Testimonials from '../components/home/Testimonials';
import ContactCTA from '../components/home/ContactCTA';
import NewsletterSection from '../components/shared/NewsletterSection';

export default function Home({ onBookConsultation }) {
  useEffect(() => {
    document.title = 'NexaEdge Consulting — AI-Powered Strategy & Digital Transformation';
  }, []);

  return (
    <main>
      <Hero onBookConsultation={onBookConsultation} />
      <ClientLogos />
      <Stats />
      <Services />
      <CompanyOverview />
      <Testimonials />
      <ContactCTA onBookConsultation={onBookConsultation} />
      <NewsletterSection />
    </main>
  );
}
