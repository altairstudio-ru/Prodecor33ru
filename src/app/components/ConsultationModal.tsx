import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, X } from 'lucide-react';
import { formatPhone, isValidPhone } from '../utils/phoneMask';
import { sendToTelegram } from '../utils/telegram';
import { toast } from 'sonner';

const PROJECT_TYPES = [
  { value: 'design', label: 'Дизайн' },
  { value: 'renovation', label: 'Ремонт' },
  { value: 'full', label: 'Под ключ' },
  { value: 'supervision', label: 'Надзор' },
];

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('design');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Пожалуйста, введите ваше имя');
      return;
    }

    if (!isValidPhone(phone)) {
      toast.error('Пожалуйста, введите корректный номер телефона');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendToTelegram({
        name: name.trim(),
        phone,
        projectType,
        source: 'Модальное окно',
      });

      if (result.success) {
        toast.success(result.message);
        setName('');
        setPhone('');
        setProjectType('design');
        onClose();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error('Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg bg-[#F5F3EF] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h3 className="text-2xl font-semibold text-[#1F1F1F]">Получить консультацию</h3>
            <p className="text-sm text-[#8A8A8A] mt-1">
              Обсудим ваш проект и ответим на вопросы
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-lg text-[#8A8A8A] hover:text-[#1F1F1F] hover:bg-black/5 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-5 space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="modal-name" className="block text-sm font-medium text-[#1F1F1F] mb-2">
              Ваше имя
            </label>
            <input
              type="text"
              id="modal-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#D1D1D1] rounded-lg focus:outline-none focus:border-[#C6A96B] transition-colors text-[#1F1F1F]"
              placeholder="Иван Петров"
              disabled={isSubmitting}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="modal-phone" className="block text-sm font-medium text-[#1F1F1F] mb-2">
              Телефон
            </label>
            <input
              type="tel"
              id="modal-phone"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-3 bg-white border border-[#D1D1D1] rounded-lg focus:outline-none focus:border-[#C6A96B] transition-colors text-[#1F1F1F]"
              placeholder="+7 (___) ___-__-__"
              disabled={isSubmitting}
            />
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-sm font-medium text-[#1F1F1F] mb-3">Тип проекта</label>
            <div className="grid grid-cols-2 gap-3">
              {PROJECT_TYPES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setProjectType(option.value)}
                  disabled={isSubmitting}
                  className={`px-4 py-3 rounded-lg transition-all text-sm ${
                    projectType === option.value
                      ? 'bg-[#C6A96B] border-2 border-[#C6A96B] text-white font-medium'
                      : 'bg-transparent border border-[#D1D1D1] text-[#1F1F1F] hover:border-[#C6A96B] hover:bg-white/50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#C6A96B] text-white rounded-lg hover:bg-[#B39960] transition-colors font-medium inline-flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                Получить консультацию
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-xs text-[#8A8A8A] text-center">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </form>
      </div>
    </div>,
    document.body,
  );
}
