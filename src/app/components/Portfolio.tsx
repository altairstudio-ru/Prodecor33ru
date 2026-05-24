import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    image: 'https://images.unsplash.com/photo-1600210491305-7396500b5b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcmVtaXVtJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBiZWRyb29tJTIwbmV1dHJhbCUyMG1hdGVyaWFsc3xlbnwxfHx8fDE3Nzk1MDEyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Квартира в новостройке, 85 м²',
    task: 'Создать уютное пространство для молодой семьи с двумя детьми',
    solution: 'Открытая планировка, нейтральные оттенки, натуральные материалы',
    result: 'Светлый современный интерьер с продуманными системами хранения',
  },
  {
    image: 'https://images.unsplash.com/photo-1666003449012-61951d621555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbW9kZXJuJTIwa2l0Y2hlbiUyMG1hcmJsZSUyMHdvb2R8ZW58MXx8fHwxNzc5NTAxMjU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Загородный дом, 220 м²',
    task: 'Объединить классические и современные элементы в загородном доме',
    solution: 'Натуральный камень, дерево, латунные акценты, панорамные окна',
    result: 'Респектабельный интерьер с атмосферой спокойствия и комфорта',
  },
  {
    image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjBsaXZpbmclMjByb29tJTIwd2FybSUyMG5hdHVyYWwlMjBsaWdodHxlbnwxfHx8fDE3Nzk1MDEyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Пентхаус в центре, 140 м²',
    task: 'Премиальный интерьер для клиента, ценящего минимализм и функциональность',
    solution: 'Четкие линии, монохром, качественные материалы, smart-home система',
    result: 'Элегантное пространство с идеальной эргономикой и технологичностью',
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#1F1F1F] mb-4">Портфолио</h2>
          <p className="text-lg text-[#8A8A8A] max-w-2xl mx-auto">
            Реализованные проекты, в которых воплощены индивидуальный стиль и высокое качество исполнения
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden mb-6 shadow-md">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl text-[#1F1F1F] mb-4">{project.title}</h3>
              <div className="space-y-2 text-sm">
                <p className="text-[#8A8A8A]">
                  <span className="text-[#C6A96B] font-medium">Задача:</span> {project.task}
                </p>
                <p className="text-[#8A8A8A]">
                  <span className="text-[#C6A96B] font-medium">Решение:</span> {project.solution}
                </p>
                <p className="text-[#8A8A8A]">
                  <span className="text-[#C6A96B] font-medium">Результат:</span> {project.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
