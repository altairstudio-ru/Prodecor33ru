import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-semibold mb-4">ProDecor</div>
            <p className="text-[#D1D1D1] text-sm leading-relaxed">
              Премиальный дизайн интерьера и ремонт под ключ во Владимире и области
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Навигация</h4>
            <nav className="space-y-2">
              <a href="#services" className="block text-[#D1D1D1] hover:text-[#C6A96B] text-sm transition-colors">
                Услуги
              </a>
              <a href="#portfolio" className="block text-[#D1D1D1] hover:text-[#C6A96B] text-sm transition-colors">
                Портфолио
              </a>
              <a href="#process" className="block text-[#D1D1D1] hover:text-[#C6A96B] text-sm transition-colors">
                Как работаем
              </a>
              <a href="#faq" className="block text-[#D1D1D1] hover:text-[#C6A96B] text-sm transition-colors">
                FAQ
              </a>
            </nav>
          </div>
          <div>
            <h4 className="font-medium mb-4">Контакты</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+74952345678" className="flex items-center gap-2 text-[#D1D1D1] hover:text-[#C6A96B] transition-colors">
                <Phone className="w-4 h-4" />
                +7 (495) 234-56-78
              </a>
              <a href="mailto:info@prodecor33.ru" className="flex items-center gap-2 text-[#D1D1D1] hover:text-[#C6A96B] transition-colors">
                <Mail className="w-4 h-4" />
                info@prodecor33.ru
              </a>
              <div className="flex items-start gap-2 text-[#D1D1D1]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>г. Владимир, ул. Большая Московская, 27</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4">Мы в соцсетях</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center hover:bg-[#C6A96B] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center hover:bg-[#C6A96B] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#2A2A2A] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#8A8A8A]">
          <div>© 2024 ProDecor. Все права защищены.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#C6A96B] transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-[#C6A96B] transition-colors">
              Договор оферты
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
