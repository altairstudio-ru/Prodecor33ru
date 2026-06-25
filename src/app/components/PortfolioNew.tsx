import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    id: 1,
    title: 'Квартира в новостройке',
    area: '85 м²',
    year: '2024',
    serviceType: 'Дизайн интерьера + ремонт под ключ',
    image: 'https://images.unsplash.com/photo-1600210491305-7396500b5b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcmVtaXVtJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBiZWRyb29tJTIwbmV1dHJhbCUyMG1hdGVyaWFsc3xlbnwxfHx8fDE3Nzk1MDEyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    client: 'Молодая семья с двумя детьми',
    task: 'Создать уютное и функциональное пространство с продуманными системами хранения',
    solution: 'Открытая планировка, нейтральные оттенки, натуральные материалы, встроенная мебель',
    result: 'Светлый современный интерьер с максимальной эргономикой',
  },
  {
    id: 2,
    title: 'Загородный дом',
    area: '220 м²',
    year: '2023',
    serviceType: 'Дизайн интерьера + комплектация',
    image: 'https://images.unsplash.com/photo-1666003449012-61951d621555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbW9kZXJuJTIwa2l0Y2hlbiUyMG1hcmJsZSUyMHdvb2R8ZW58MXx8fHwxNzc5NTAxMjU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    client: 'Семья с детьми',
    task: 'Объединить классические и современные элементы в загородном доме',
    solution: 'Натуральный камень, дерево, латунные акценты, панорамные окна',
    result: 'Респектабельный интерьер с атмосферой спокойствия и комфорта',
  },
  {
    id: 3,
    title: 'Пентхаус в центре',
    area: '140 м²',
    year: '2023',
    serviceType: 'Ремонт под ключ',
    image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjBsaXZpbmclMjByb29tJTIwd2FybSUyMG5hdHVyYWwlMjBsaWdodHxlbnwxfHx8fDE3Nzk1MDEyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    client: 'Бизнесмен',
    task: 'Премиальный интерьер для клиента, ценящего минимализм и функциональность',
    solution: 'Четкие линии, монохром, качественные материалы, smart-home система',
    result: 'Элегантное пространство с идеальной эргономикой и технологичностью',
  },
];

export function PortfolioNew() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="portfolio" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#1F1F1F] mb-2 font-semibold">Реализованные проекты</h2>
          <p className="text-2xl text-[#C6A96B] font-semibold mb-4">50+ объектов</p>
          <p className="text-lg text-[#8A8A8A] max-w-2xl">
            Каждый объект — это индивидуальное решение с акцентом на качество, функциональность и стиль
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-[#E6E6E6] rounded-xl overflow-hidden bg-[#F5F3EF] hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => handleToggle(project.id)}
                className="w-full"
              >
                <div className="flex items-center gap-6 p-6 text-left">
                  <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#1F1F1F] mb-2">{project.title}</h3>
                    <div className="flex gap-3 text-sm text-[#8A8A8A] mb-1">
                      <span>{project.area}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                    <p className="text-sm text-[#C6A96B]">{project.serviceType}</p>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-[#C6A96B] flex-shrink-0 transition-transform ${
                      expandedId === project.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {expandedId === project.id && (
                <div className="px-6 pb-6 border-t border-[#E6E6E6]">
                  <div className="pt-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                      <div className="space-y-5">
                        <div>
                          <div className="text-sm font-medium text-[#C6A96B] mb-2">Клиент</div>
                          <p className="text-[#1F1F1F]">{project.client}</p>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#C6A96B] mb-2">Задача</div>
                          <p className="text-[#1F1F1F]">{project.task}</p>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#C6A96B] mb-2">Решение</div>
                          <p className="text-[#1F1F1F]">{project.solution}</p>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#C6A96B] mb-2">Результат</div>
                          <p className="text-[#1F1F1F]">{project.result}</p>
                        </div>
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-2 text-[#C6A96B] hover:text-[#B39960] transition-colors font-medium">
                      Смотреть полный кейс
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
