import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Екатерина Волкова',
    project: 'Квартира 95 м²',
    text: 'Работали с ProDecor над дизайном квартиры в новостройке. Результат превзошёл все ожидания! Команда профессионально подошла к каждой детали, все сроки соблюдены, смета не изменилась. Очень рекомендую.',
    rating: 5,
  },
  {
    name: 'Дмитрий Соколов',
    project: 'Загородный дом 180 м²',
    text: 'Благодарен команде за терпение и внимание к нашим пожеланиям. Дизайнер помог найти баланс между классикой и современностью, что было для нас критично. Качество работ на высшем уровне.',
    rating: 5,
  },
  {
    name: 'Анна Морозова',
    project: 'Коммерческое помещение',
    text: 'Обратились для оформления офиса. ProDecor создали стильное и функциональное пространство, которое отлично отражает имидж нашей компании. Работать стало намного приятнее!',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#1F1F1F] mb-4">Отзывы клиентов</h2>
          <p className="text-lg text-[#8A8A8A] max-w-2xl mx-auto">
            Мнения тех, кто уже доверил нам создание интерьера своей мечты
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border border-[#E6E6E6] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C6A96B] text-[#C6A96B]" />
                ))}
              </div>
              <p className="text-[#1F1F1F] leading-relaxed mb-6">{testimonial.text}</p>
              <div className="border-t border-[#E6E6E6] pt-4">
                <div className="font-medium text-[#1F1F1F]">{testimonial.name}</div>
                <div className="text-sm text-[#8A8A8A]">{testimonial.project}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
