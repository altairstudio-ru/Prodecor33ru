import { useState } from 'react';
import { Logo } from './Logo';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#1F1F1F]/50 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-6">

        {/* Logo + Slogan */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-md text-white/90 hover:text-white"
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0" width="22" height="2" rx="1" fill="currentColor" />
              <rect y="7" width="22" height="2" rx="1" fill="currentColor" />
              <rect y="14" width="22" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>

          <a href="#" className="flex-shrink-0 flex flex-col gap-0.5">
            <Logo className="w-[180px] sm:w-[220px] lg:w-[260px] h-auto max-w-full -mt-2 text-white" />
            <span className="text-[#C6A96B] text-[0.6rem] sm:text-[0.65rem] tracking-[0.18em] uppercase font-light text-center leading-none">
              От проекта до реализации
            </span>
          </a>
        </div>

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
            className="text-[#5BA3F5] hover:text-[#7DBCFF] transition-colors text-sm font-medium tracking-wide whitespace-nowrap pr-2"
          >
            +7 (900) 483-20-50
          </a>
          <button className="px-5 py-2 border border-white/30 text-white rounded-sm hover:bg-white/10 hover:border-white/50 transition-all text-xs tracking-widest uppercase backdrop-blur-sm whitespace-nowrap">
            Консультация
          </button>
        </div>

      </div>

      {/* Mobile slide-in menu */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="fixed top-0 left-0 z-50 h-full w-80 bg-[#1F1F1F] p-6">
            <div className="flex items-center justify-between mb-6">
              <Logo className="w-[180px] h-auto text-white mx-auto" />
              <button className="text-white" onClick={() => setOpen(false)} aria-label="Закрыть меню">✕</button>
            </div>
            <p className="text-[#C6A96B] text-sm tracking-widest uppercase text-center mb-6">От проекта до реализации</p>
            <nav className="flex flex-col gap-4">
              {[
                { label: 'О нас', href: '#about' },
                { label: 'Услуги', href: '#services' },
                { label: 'Кейсы', href: '#portfolio' },
                { label: 'Блог', href: '#blog' },
              ].map((link) => (
                <a key={link.href} href={link.href} className="text-white/85 text-lg py-2">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-8">
              <a href="tel:+79004832050" className="text-[#5BA3F5] block mb-4">+7 (900) 483-20-50</a>
              <button className="w-full bg-[#C6A96B] text-black py-3 rounded-sm">Консультация</button>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}
