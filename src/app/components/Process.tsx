import { FileText, Ruler, Lightbulb, Hammer, Key } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Заявка',
    description: 'Вы оставляете заявку, мы связываемся с вами для уточнения деталей',
  },
  {
    icon: Ruler,
    title: 'Замер и брифинг',
    description: 'Выезжаем на объект, проводим замеры, обсуждаем ваши пожелания и бюджет',
  },
  {
    icon: Lightbulb,
    title: 'Концепция и смета',
    description: 'Разрабатываем дизайн-проект, составляем детальную смету, согласовываем с вами',
  },
  {
    icon: Hammer,
    title: 'Реализация',
    description: 'Проводим ремонтные работы, осуществляем авторский надзор, контролируем качество',
  },
  {
    icon: Key,
    title: 'Сдача объекта',
    description: 'Финальная комплектация, уборка, передача объекта с полным комплектом документов',
  },
];

export function Process() {
  return (
    <section id="process" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#1F1F1F] mb-4">Как мы работаем</h2>
          <p className="text-lg text-[#8A8A8A] max-w-2xl mx-auto">
            Прозрачный и понятный процесс на каждом этапе от первого звонка до передачи ключей
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#C6A96B] rounded-full flex items-center justify-center mb-4 relative">
                    <Icon className="w-8 h-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1F1F1F] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg text-[#1F1F1F] mb-2 font-medium">{step.title}</h3>
                  <p className="text-sm text-[#8A8A8A]">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
