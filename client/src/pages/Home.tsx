import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ActionSegmentation from '@/components/ActionSegmentation';
import ImpactDashboard from '@/components/ImpactDashboard';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

/**
 * Home Page
 * Design: Noël Chaleureux & Inclusif
 * Main landing page for the Noël de Solidarité campaign
 */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ActionSegmentation />
        <ImpactDashboard />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
