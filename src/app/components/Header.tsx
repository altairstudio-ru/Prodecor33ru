import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Phone } from 'lucide-react';
import { Logo } from './Logo';

const PHONE_HREF = 'tel:+79004832050';

const NAV_LINKS = [
  { label: 'О нас', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Кейсы', href: '#portfolio' },
  { label: 'Блог', href: '#blog' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
    <header className="fixed top-0 left-0 right-0 bg-[#1F1F1F]/50 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

        {/* Mobile: ☰ | Logo | 📞 */}
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <button
            className="flex-shrink-0 p-2 -ml-2 rounded-md text-white/90 hover:text-white"
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0" width="22" height="2" rx="1" fill="currentColor" />
              <rect y="7" width="22" height="2" rx="1" fill="currentColor" />
              <rect y="14" width="22" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>

          <a href="#" className="flex-1 min-w-0 flex justify-center">
            <Logo className="w-[140px] sm:w-[160px] h-9 sm:h-10 max-w-full text-white" />
          </a>

          <a
            href={PHONE_HREF}
            className="flex-shrink-0 p-2 -mr-2 text-[#5BA3F5] hover:text-[#7DBCFF] transition-colors"
            aria-label="Позвонить: +7 (900) 483-20-50"
          >
            <Phone className="w-5 h-5" strokeWidth={1.75} />
          </a>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between gap-6">
          <a href="#" className="flex-shrink-0 flex flex-col items-center gap-0">
            <Logo className="w-[260px] h-14 max-w-full text-white" />
            <span className="text-[#C6A96B] text-[0.65rem] tracking-[0.18em] uppercase font-light text-center leading-none">
              От проекта до реализации
            </span>
          </a>

          <nav className="flex items-center gap-8 xl:gap-10 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/75 hover:text-white transition-colors tracking-wide whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
            <a
              href={PHONE_HREF}
              className="text-[#5BA3F5] hover:text-[#7DBCFF] transition-colors text-sm font-medium tracking-wide whitespace-nowrap pr-2"
            >
              +7 (900) 483-20-50
            </a>
            <button className="px-5 py-2 border border-white/30 text-white rounded-sm hover:bg-white/10 hover:border-white/50 transition-all text-xs tracking-widest uppercase backdrop-blur-sm whitespace-nowrap">
              Консультация
            </button>
          </div>
        </div>

      </div>
    </header>

    {open && createPortal(
      <div className="fixed inset-0 z-[100] lg:hidden">
        <div
          className="absolute inset-0 bg-black/70"
          onClick={closeMenu}
          aria-hidden="true"
        />
        <aside className="relative z-10 flex h-full w-full flex-col bg-[#1F1F1F] p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Logo className="h-auto w-[180px] flex-shrink-0 text-white" />
            <button
              type="button"
              className="flex-shrink-0 p-2 text-2xl leading-none text-white/80 hover:text-white"
              onClick={closeMenu}
              aria-label="Закрыть меню"
            >
              ✕
            </button>
          </div>

          <p className="mb-8 text-center text-sm uppercase tracking-widest text-[#C6A96B]">
            От проекта до реализации
          </p>

          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-sm py-3 text-lg text-white/90 transition-colors hover:bg-white/5 hover:text-white"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto space-y-4 border-t border-white/10 pt-8">
            <a href={PHONE_HREF} className="block text-lg text-[#5BA3F5]">
              +7 (900) 483-20-50
            </a>
            <button
              type="button"
              className="w-full rounded-sm bg-[#C6A96B] py-3 text-sm font-medium uppercase tracking-widest text-black"
              onClick={closeMenu}
            >
              Консультация
            </button>
          </div>
        </aside>
      </div>,
      document.body,
    )}
    </>
  );
}
