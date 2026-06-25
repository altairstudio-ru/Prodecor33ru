import { Logo } from './Logo';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#1F1F1F]/50 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between gap-6">

        {/* Logo + Slogan */}
        <a href="#" className="flex-shrink-0 flex flex-col gap-0.5">
          <Logo className="h-10 sm:h-12 lg:h-14 w-auto text-white" />
          <span className="text-[#C6A96B] text-[0.6rem] sm:text-[0.65rem] tracking-[0.18em] uppercase font-light leading-none">
            От проекта до реализации
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10 flex-1 justify-center">
          {[
            { label: 'О нас', href: '#about' },
            { label: 'Услуги', href: '#services' },
            { label: 'Кейсы', href: '#portfolio' },
            { label: 'Блог', href: '#blog' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/75 hover:text-white transition-colors tracking-wide whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Phone + CTA */}
        <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
          <a
            href="tel:+79004832050"
            className="text-[#5BA3F5] hover:text-[#7DBCFF] transition-colors text-sm font-medium tracking-wide"
          >
            +7 (900) 483-20-50
          </a>
          <button className="px-5 py-2 border border-white/30 text-white rounded-sm hover:bg-white/10 hover:border-white/50 transition-all text-xs tracking-widest uppercase backdrop-blur-sm whitespace-nowrap">
            Консультация
          </button>
        </div>

      </div>
    </header>
  );
}
