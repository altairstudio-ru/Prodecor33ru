import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: 'design',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#F5F3EF] rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl text-[#1F1F1F] mb-4">
              Получите бесплатную консультацию
            </h2>
            <p className="text-lg text-[#8A8A8A]">
              Обсудим ваш проект, расскажем о процессе работы и предоставим предварительную смету
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1F1F1F] mb-2">
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#D1D1D1] rounded-lg focus:outline-none focus:border-[#C6A96B] transition-colors"
                  placeholder="Иван Петров"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#1F1F1F] mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#D1D1D1] rounded-lg focus:outline-none focus:border-[#C6A96B] transition-colors"
                  placeholder="+7 (___) ___-__-__"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F1F1F] mb-4">Тип проекта</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: 'design', label: 'Дизайн' },
                  { value: 'renovation', label: 'Ремонт' },
                  { value: 'full', label: 'Под ключ' },
                  { value: 'supervision', label: 'Надзор' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, projectType: option.value })}
                    className={`px-5 py-3.5 rounded-lg transition-all ${
                      formData.projectType === option.value
                        ? 'bg-[#C6A96B] border-2 border-[#C6A96B] text-white font-medium shadow-sm'
                        : 'bg-transparent border border-[#D1D1D1] text-[#1F1F1F] hover:border-[#C6A96B] hover:bg-white/50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full md:w-auto px-10 py-4 bg-[#C6A96B] text-white rounded-lg hover:bg-[#B39960] transition-colors font-medium inline-flex items-center justify-center gap-2 shadow-sm"
              >
                Получить консультацию
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#8A8A8A] text-center pt-2">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
