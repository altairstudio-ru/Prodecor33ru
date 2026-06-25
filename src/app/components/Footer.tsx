import { useState } from 'react';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, Navigation } from 'lucide-react';

function VkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.726-1.033-1.01-1.49-1.146-1.745-1.146-.356 0-.458.102-.458.597v1.575c0 .424-.135.678-1.254.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.048.17.49-.085.745-.576.745z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function MaxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.89 7.504a.6.6 0 0 1-.56.378h-.004a.6.6 0 0 1-.557-.375L12 12.122l-1.551 3.633a.6.6 0 0 1-.557.375h-.004a.6.6 0 0 1-.56-.378L6.438 8.248a.6.6 0 0 1 1.115-.43L9.72 13.35l1.528-3.578a.6.6 0 0 1 1.103 0l1.528 3.578 2.168-5.532a.6.6 0 1 1 1.115.43z"/>
    </svg>
  );
}

const socials = [
  {
    label: 'ВКонтакте',
    href: 'https://vk.ru/prodecor_33',
    icon: <VkIcon />,
    active: true,
  },
  {
    label: 'Telegram',
    href: '#',
    icon: <TelegramIcon />,
    active: false,
  },
  {
    label: 'Max',
    href: '#',
    icon: <MaxIcon />,
    active: false,
  },
  {
    label: 'Instagram',
    href: '#',
    icon: <InstagramIcon />,
    active: false,
  },
];

export function Footer() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) setSubmitted(true);
  };

  return (
    <footer className="bg-[#1F1F1F] text-white">

      {/* Callback CTA Band */}
      <div className="border-b border-[#2A2A2A] py-14 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl lg:text-3xl font-semibold mb-2">Оставить заявку</h3>
            <p className="text-[#888] text-sm">Перезвоним в течение 30 минут в рабочее время</p>
          </div>
          <div className="w-full lg:w-auto lg:min-w-[480px]">
            {submitted ? (
              <p className="text-[#C6A96B] text-center py-4 font-medium">
                Заявка принята. Свяжемся с вами в ближайшее время!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder-[#555] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#C6A96B] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Телефон *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="flex-1 bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder-[#555] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#C6A96B] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#C6A96B] hover:bg-[#B39960] text-white rounded-sm px-7 py-3 text-sm tracking-wide transition-colors whitespace-nowrap"
                >
                  Обратный звонок
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

            {/* Brand */}
            <div>
              <Logo className="h-10 w-auto text-white mb-2" />
              <p className="text-[#C6A96B] text-xs tracking-[0.15em] uppercase mb-4">От проекта до реализации</p>
              <p className="text-[#666] text-sm leading-relaxed">
                Дизайн интерьера и ремонт под ключ во Владимире и области
              </p>
            </div>

            {/* Nav */}
            <div>
              <h4 className="font-medium mb-4 text-xs tracking-widest uppercase text-[#555]">Разделы</h4>
              <nav className="space-y-2.5">
                {[
                  { label: 'О нас', href: '#about' },
                  { label: 'Услуги', href: '#services' },
                  { label: 'Кейсы', href: '#portfolio' },
                  { label: 'Как работаем', href: '#process' },
                  { label: 'Блог', href: '#blog' },
                ].map((link) => (
                  <a key={link.href} href={link.href}
                    className="block text-[#999] hover:text-[#C6A96B] text-sm transition-colors">
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="font-medium mb-4 text-xs tracking-widest uppercase text-[#555]">Контакты</h4>
              <div className="space-y-3 text-sm">
                <a href="tel:+79004832050"
                  className="flex items-center gap-2.5 text-[#999] hover:text-[#C6A96B] transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  +7 (900) 483-20-50
                </a>
                <a href="tel:+79040367340"
                  className="flex items-center gap-2.5 text-[#999] hover:text-[#C6A96B] transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  +7 (904) 036-73-40
                </a>
                <a href="mailto:info@prodecor33.ru"
                  className="flex items-center gap-2.5 text-[#999] hover:text-[#C6A96B] transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  info@prodecor33.ru
                </a>
                <div className="flex items-start gap-2.5 text-[#999]">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>г. Владимир, ул. Луначарского, 23</span>
                </div>
                <a
                  href="https://yandex.ru/maps/?text=%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%2C+%D1%83%D0%BB.+%D0%9B%D1%83%D0%BD%D0%B0%D1%87%D0%B0%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE+23"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#999] hover:text-[#C6A96B] transition-colors">
                  <Navigation className="w-4 h-4 flex-shrink-0" />
                  Яндекс Навигатор
                </a>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h4 className="font-medium mb-4 text-xs tracking-widest uppercase text-[#555]">Мы в соцсетях</h4>
              <div className="space-y-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.active ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-all
                      ${s.active
                        ? 'bg-[#2A2A2A] hover:bg-[#C6A96B] text-white cursor-pointer'
                        : 'bg-[#222] text-[#444] cursor-default select-none'
                      }`}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                    {!s.active && (
                      <span className="ml-auto text-[0.6rem] tracking-wider uppercase text-[#3A3A3A]">скоро</span>
                    )}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#242424] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Logo className="h-7 w-auto text-[#333]" />
              <span className="text-[#333] text-xs tracking-widest uppercase">От проекта до реализации</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[#444]">
              <span>© 2024 проДЕКОР. Все права защищены.</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-[#C6A96B] transition-colors">Политика конфиденциальности</a>
                <a href="#" className="hover:text-[#C6A96B] transition-colors">Договор оферты</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
