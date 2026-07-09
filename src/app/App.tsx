import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { ContactForm } from './components/ContactForm';
import { Trust } from './components/Trust';
import { PortfolioNew } from './components/PortfolioNew';
import { Testimonials } from './components/Testimonials';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { useConsultationModal } from './hooks/useConsultationModal';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const { isOpen, openModal, closeModal } = useConsultationModal();

  return (
    <div className="min-h-screen">
      <Header onConsultationClick={openModal} />
      <Hero onConsultationClick={openModal} />
      <Services />
      <Process />
      <ContactForm />
      <Trust />
      <PortfolioNew />
      <Testimonials />
      <FinalCTA onConsultationClick={openModal} />
      <Footer />

      <ConsultationModal isOpen={isOpen} onClose={closeModal} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1F1F1F',
            color: '#fff',
            border: '1px solid #2A2A2A',
          },
        }}
      />
      <Analytics />
    </div>
  );
}
