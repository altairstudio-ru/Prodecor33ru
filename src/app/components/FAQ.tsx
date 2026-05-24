import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'Сколько стоят ваши услуги?',
    answer: 'Стоимость дизайн-проекта от 3000 руб./м², ремонта под ключ — от 25 000 руб./м². Точная цена зависит от площади объекта, сложности планировочных решений и выбранных материалов. Предоставляем детальную смету после замера и брифинга.',
  },
  {
    question: 'Какие сроки реализации проекта?',
    answer: 'Дизайн-проект разрабатывается в течение 4–8 недель, ремонтные работы занимают от 3 до 6 месяцев в зависимости от объёма. Сроки фиксируются в договоре, мы строго их соблюдаем.',
  },
  {
    question: 'Что входит в услугу "ремонт под ключ"?',
    answer: 'Полный цикл работ: демонтаж, черновая и чистовая отделка, электрика, сантехника, установка дверей, напольных покрытий. По желанию — комплектация мебелью и декором. Предоставляем гарантию на все виды работ.',
  },
  {
    question: 'Как организован процесс работы?',
    answer: 'После заключения договора назначается персональный менеджер проекта. Вы получаете еженедельные отчёты о ходе работ, фото- и видеофиксацию. Все решения согласовываем с вами, никаких изменений без вашего одобрения.',
  },
  {
    question: 'С какими объектами вы работаете?',
    answer: 'Квартиры, загородные дома, коммерческие помещения (офисы, салоны, шоурумы), апартаменты. Специализируемся на премиальном сегменте и работаем преимущественно во Владимире и Владимирской области.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#1F1F1F] mb-4">Частые вопросы</h2>
          <p className="text-lg text-[#8A8A8A]">Ответы на самые популярные вопросы о наших услугах</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-[#E6E6E6] rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F5F3EF] transition-colors"
              >
                <span className="text-lg font-medium text-[#1F1F1F] pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#C6A96B] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-[#8A8A8A] leading-relaxed">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
