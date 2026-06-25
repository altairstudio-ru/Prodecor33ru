import { Palette, Hammer, ClipboardCheck, Sofa } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Дизайн-проект',
    description: 'Разработка концепции, планировка, подбор материалов и декора для создания уникального пространства',
  },
  {
    icon: Hammer,
    title: 'Ремонт под ключ',
    description: 'Полный цикл ремонтных работ от демонтажа до финишной отделки с соблюдением всех технологий',
  },
  {
    icon: Sofa,
    title: 'Комплектация',
    description: 'Подбор и закупка мебели, освещения, текстиля и аксессуаров для завершения интерьера',
  },
  {
    icon: ClipboardCheck,
    title: 'Авторский надзор',
    description: 'Контроль качества на каждом этапе, координация подрядчиков, соблюдение сроков и бюджета',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#1F1F1F] mb-4">Услуги</h2>
          <p className="text-lg text-[#8A8A8A] max-w-2xl mx-auto">
            Комплексный подход к созданию интерьеров от проектирования до финальной реализации
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="p-8 bg-[#F5F3EF] rounded-xl border border-[#E6E6E6] hover:border-[#C6A96B] transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 bg-[#C6A96B] rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-[#1F1F1F] mb-3">{service.title}</h3>
                <p className="text-[#8A8A8A] leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
