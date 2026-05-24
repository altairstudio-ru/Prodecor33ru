import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-20 px-6 bg-[#2A2A2A]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl text-white mb-6">
          Готовы обсудить ваш проект?
        </h2>
        <p className="text-lg text-[#D1D1D1] mb-10 max-w-2xl mx-auto">
          Оставьте заявку, и мы свяжемся с вами в течение часа, чтобы обсудить детали, ответить на все вопросы и назначить встречу для замера
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-[#C6A96B] text-white rounded-lg hover:bg-[#B39960] transition-colors font-medium inline-flex items-center justify-center gap-2">
            Оставить заявку
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#2A2A2A] transition-colors font-medium">
            Позвонить нам
          </button>
        </div>
      </div>
    </section>
  );
}
