import { Phone } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#1F1F1F]/40 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-16">
          <a href="#" className="text-2xl font-semibold text-white tracking-tight">
            ProDecor
          </a>
          <nav className="hidden lg:flex items-center gap-10">
            <a href="#services" className="text-sm text-white/80 hover:text-white transition-colors tracking-wide">
              Услуги
            </a>
            <a href="#portfolio" className="text-sm text-white/80 hover:text-white transition-colors tracking-wide">
              Портфолио
            </a>
            <a href="#process" className="text-sm text-white/80 hover:text-white transition-colors tracking-wide">
              Как работаем
            </a>
            <a href="#faq" className="text-sm text-white/80 hover:text-white transition-colors tracking-wide">
              FAQ
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <a href="tel:+74952345678" className="hidden md:flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
            <Phone className="w-4 h-4" />
            +7 (495) 234-56-78
          </a>
          <button className="px-7 py-2.5 border border-white/30 text-white rounded-md hover:bg-white/10 hover:border-white/50 transition-all text-sm tracking-wide backdrop-blur-sm">
            Консультация
          </button>
        </div>
      </div>
    </header>
  );
}
