import { ArrowRight } from 'lucide-react';
import heroImage from '../photo-1678762200388-51e11225d4de.jpg';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#1F1F1F]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium Interior"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          style={{ objectPosition: '50% 45%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A2520]/20 via-transparent to-[#1F1F1F]/10" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(20,18,16,0.3) 100%)'
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F1F1F]/75 via-[#1F1F1F]/35 via-40% to-transparent to-65%" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#1F1F1F]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#1F1F1F]/60 via-[#1F1F1F]/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center">
        <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 pt-20 sm:pt-28 pb-24">
          <div className="max-w-3xl space-y-8 sm:space-y-10">

            {/* Studio label — clean, no bullets */}
            <p className="text-white/60 text-base sm:text-lg lg:text-xl font-light tracking-wide pt-0">
              Дизайн-студия полного цикла
            </p>

            {/* H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] text-white tracking-[-0.02em] font-semibold">
              Дизайн и ремонт<br />
              под ключ<br />
              во Владимире и области
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/60 leading-[1.7] max-w-lg font-normal">
              Полный комплекс работ от проекта до финальной отделки. Фиксированные сроки, прозрачная смета, гарантия качества.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="group px-8 sm:px-11 py-3.5 sm:py-4 bg-[#C6A96B]/95 hover:bg-[#C6A96B] text-white rounded-sm transition-all duration-300 inline-flex items-center gap-3 shadow-[0_8px_30px_rgb(198,169,107,0.15)] hover:shadow-[0_8px_40px_rgb(198,169,107,0.25)]">
                <span className="tracking-[0.05em] text-sm font-light">Получить консультацию</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </button>
              <button className="px-8 sm:px-11 py-3.5 sm:py-4 border border-white/25 hover:border-white/40 text-white rounded-sm hover:bg-white/[0.03] transition-all duration-300 tracking-[0.05em] text-sm font-light">
                Смотреть портфолио
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F3EF] to-transparent pointer-events-none" />
    </section>
  );
}
