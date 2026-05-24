import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1F1F1F]">
      {/* Background Image - Fullscreen Panoramic */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzcGFjaW91cyUyMG1vZGVybiUyMGludGVyaW9yJTIwbmF0dXJhbCUyMGxpZ2h0JTIwd2lkZSUyMHBlcnNwZWN0aXZlJTIwZWxlZ2FudHxlbnwxfHx8fDE3Nzk1ODEzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Premium Interior"
          className="w-full h-full object-cover scale-105"
          style={{ objectPosition: '50% 45%' }}
        />

        {/* Subtle Warm Tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A2520]/20 via-transparent to-[#1F1F1F]/10"></div>

        {/* Editorial Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(20, 18, 16, 0.3) 100%)'
        }}></div>

        {/* Left Side Content Gradient - Strategic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F1F1F]/70 via-[#1F1F1F]/35 via-40% to-transparent to-65%"></div>

        {/* Top Fade for Navbar */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#1F1F1F]/50 to-transparent"></div>

        {/* Bottom Architectural Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#1F1F1F]/60 via-[#1F1F1F]/20 to-transparent"></div>

        {/* Premium Grain Texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Content Layer */}
      <div className="relative h-full">
        <div className="h-full max-w-[90rem] mx-auto px-8 lg:px-12 flex items-center">
          <div className="max-w-2xl lg:max-w-3xl space-y-12 py-24">
            {/* Headline */}
            <div className="space-y-7">
              <h1 className="text-[3.5rem] sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] text-white tracking-[-0.02em] font-normal">
                Премиальный дизайн интерьера и ремонт под ключ
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/65 leading-[1.7] max-w-xl font-light tracking-wide">
                Создаём продуманные, стильные и функциональные интерьеры для квартир, домов и коммерческих пространств во Владимире и области
              </p>
            </div>

            {/* Editorial Benefits */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 text-white/50 pt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-1 h-1 rounded-full bg-[#C6A96B]"></div>
                <span className="text-sm tracking-wider font-light">8+ лет опыта</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-1 h-1 rounded-full bg-[#C6A96B]"></div>
                <span className="text-sm tracking-wider font-light">Премиальное качество</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-1 h-1 rounded-full bg-[#C6A96B]"></div>
                <span className="text-sm tracking-wider font-light">Полное сопровождение</span>
              </div>
            </div>

            {/* Luxury CTA Buttons */}
            <div className="flex flex-wrap gap-5 pt-6">
              <button className="group px-11 py-4 bg-[#C6A96B]/95 hover:bg-[#C6A96B] text-white rounded-sm transition-all duration-300 inline-flex items-center gap-3 shadow-[0_8px_30px_rgb(198,169,107,0.15)] hover:shadow-[0_8px_40px_rgb(198,169,107,0.25)] backdrop-blur-sm">
                <span className="tracking-[0.05em] text-[0.9rem] font-light">Получить консультацию</span>
                <ArrowRight className="w-[1.1rem] h-[1.1rem] group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </button>
              <button className="px-11 py-4 border border-white/25 hover:border-white/40 text-white rounded-sm hover:bg-white/[0.03] transition-all duration-300 backdrop-blur-md tracking-[0.05em] text-[0.9rem] font-light">
                Смотреть портфолио
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Seamless Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F3EF] to-transparent pointer-events-none"></div>
    </section>
  );
}
