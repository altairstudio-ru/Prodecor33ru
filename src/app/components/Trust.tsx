import { Shield, Clock, FileCheck, Award } from 'lucide-react';

const benefits = [
  {
    icon: Award,
    value: '10+',
    label: 'лет опыта',
    description: 'Более 120 завершённых проектов в премиум-сегменте',
  },
  {
    icon: FileCheck,
    value: '100%',
    label: 'по договору',
    description: 'Все работы выполняются строго по договору с гарантиями',
  },
  {
    icon: Shield,
    value: 'Прозрачность',
    label: 'в сметах',
    description: 'Детальные сметы без скрытых платежей и неожиданных расходов',
  },
  {
    icon: Clock,
    value: 'Сроки',
    label: 'и качество',
    description: 'Соблюдаем согласованные сроки с постоянным контролем качества',
  },
];

export function Trust() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-[#1F1F1F] mb-4">Почему нам доверяют</h2>
          <p className="text-lg text-[#8A8A8A] max-w-2xl mx-auto">
            Работаем с полной ответственностью, прозрачностью и персональным подходом к каждому проекту
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-xl border border-[#E6E6E6] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-[#C6A96B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-7 h-7 text-[#C6A96B]" />
                </div>
                <div className="text-3xl font-semibold text-[#1F1F1F] mb-2">{benefit.value}</div>
                <div className="text-lg text-[#1F1F1F] font-medium mb-3">{benefit.label}</div>
                <p className="text-sm text-[#8A8A8A]">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
