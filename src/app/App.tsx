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

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Process />
      <ContactForm />
      <Trust />
      <PortfolioNew />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}