import type { Locale } from './config'

/** Small interface strings (everything editorial lives in the CMS). */
const dict = {
  az: {
    services: 'Xidmətlər', projects: 'Layihələr', allServices: 'Bütün xidmətlər', relatedProjects: 'Oxşar layihələr', projectDetails: 'Layihə məlumatları', highlights: 'Əsas məqamlar', gallery: 'Qalereya', faqHeading: 'Tez-tez soruşulan suallar', close: 'Bağla', prev: 'Əvvəlki', next: 'Növbəti', openImage: 'Şəkli aç', reference: 'Obyekt', year: 'İl', category: 'Kateqoriya', beforeAfter: 'Əvvəl / Sonra', areaProjects: 'Bu ərazidə layihələrimiz', relatedServices: 'Əlaqəli xidmətlər', categoryServices: 'Bu sahədə xidmətlər', freeQuoteText: 'Layihəniz üçün pulsuz baxış və fərdi qiymət təklifi.', serviceAreas: 'Xidmət əraziləri',
    menuOpen: 'Menyunu aç', menuClose: 'Menyunu bağla', language: 'Dil',
    quote: 'Qiymət hesabla', whatsapp: 'WhatsApp-da yazın', toTop: 'Yuxarı qayıt',
    contact: 'Əlaqə', address: 'Ünvan', hours: 'İş saatları', phone: 'Telefon', email: 'E-poçt',
    follow: 'Bizi izləyin', allRights: 'Bütün hüquqlar qorunur.',
    size: 'Ölçü', duration: 'Müddət', location: 'Yer', days: 'gün', workType: 'İş növü',
    viewProject: 'Layihəyə bax', readMore: 'Ətraflı', all: 'Hamısı', before: 'Əvvəl', after: 'Sonra', drag: 'Sürükləyin',
    yearsWarranty: 'il zəmanət', send: 'Göndər', sending: 'Göndərilir…', sent: 'Təşəkkür edirik! Tezliklə sizinlə əlaqə saxlayacağıq.',
    formError: 'Göndərmək alınmadı. Zəhmət olmasa telefonla əlaqə saxlayın.', name: 'Adınız', message: 'Mesajınız',
    stillQuestions: 'Sualınız qaldı?', writeUs: 'Bizə yazın', categories: 'Xidmət sahələri',
    days_short: 'gün', step: 'Mərhələ', breadcrumbHome: 'Ana səhifə', latest: 'Son yazılar',
  },
  en: {
    services: 'Services', projects: 'Projects', allServices: 'All services', relatedProjects: 'Related projects', projectDetails: 'Project details', highlights: 'Highlights', gallery: 'Gallery', faqHeading: 'Frequently asked questions', close: 'Close', prev: 'Previous', next: 'Next', openImage: 'Open image', reference: 'Venue', year: 'Year', category: 'Category', beforeAfter: 'Before / After', areaProjects: 'Our projects in this area', relatedServices: 'Related services', categoryServices: 'Services in this area', freeQuoteText: 'Free site visit and a personal quote for your project.', serviceAreas: 'Service areas',
    menuOpen: 'Open menu', menuClose: 'Close menu', language: 'Language',
    quote: 'Get a quote', whatsapp: 'Message us on WhatsApp', toTop: 'Back to top',
    contact: 'Contact', address: 'Address', hours: 'Opening hours', phone: 'Phone', email: 'E-mail',
    follow: 'Follow us', allRights: 'All rights reserved.',
    size: 'Size', duration: 'Duration', location: 'Location', days: 'days', workType: 'Type of work',
    viewProject: 'View project', readMore: 'Read more', all: 'All', before: 'Before', after: 'After', drag: 'Drag',
    yearsWarranty: 'year warranty', send: 'Send', sending: 'Sending…', sent: 'Thank you! We will contact you shortly.',
    formError: 'Could not send. Please call us instead.', name: 'Your name', message: 'Your message',
    stillQuestions: 'Still have questions?', writeUs: 'Write to us', categories: 'What we build',
    days_short: 'days', step: 'Step', breadcrumbHome: 'Home', latest: 'Latest articles',
  },
  ru: {
    services: 'Услуги', projects: 'Проекты', allServices: 'Все услуги', relatedProjects: 'Похожие проекты', projectDetails: 'Детали проекта', highlights: 'Ключевые особенности', gallery: 'Галерея', faqHeading: 'Частые вопросы', close: 'Закрыть', prev: 'Назад', next: 'Вперёд', openImage: 'Открыть фото', reference: 'Объект', year: 'Год', category: 'Категория', beforeAfter: 'До / После', areaProjects: 'Наши проекты в этом районе', relatedServices: 'Связанные услуги', categoryServices: 'Услуги по направлению', freeQuoteText: 'Бесплатный выезд и индивидуальное предложение для вашего проекта.', serviceAreas: 'Районы работ',
    menuOpen: 'Открыть меню', menuClose: 'Закрыть меню', language: 'Язык',
    quote: 'Рассчитать цену', whatsapp: 'Написать в WhatsApp', toTop: 'Наверх',
    contact: 'Контакты', address: 'Адрес', hours: 'Часы работы', phone: 'Телефон', email: 'E-mail',
    follow: 'Мы в соцсетях', allRights: 'Все права защищены.',
    size: 'Размер', duration: 'Срок', location: 'Место', days: 'дней', workType: 'Вид работ',
    viewProject: 'Смотреть проект', readMore: 'Подробнее', all: 'Все', before: 'До', after: 'После', drag: 'Перетащите',
    yearsWarranty: 'лет гарантии', send: 'Отправить', sending: 'Отправка…', sent: 'Спасибо! Мы скоро свяжемся с вами.',
    formError: 'Не удалось отправить. Пожалуйста, позвоните нам.', name: 'Ваше имя', message: 'Ваше сообщение',
    stillQuestions: 'Остались вопросы?', writeUs: 'Напишите нам', categories: 'Что мы строим',
    days_short: 'дней', step: 'Этап', breadcrumbHome: 'Главная', latest: 'Последние статьи',
  },
} satisfies Record<Locale, Record<string, string>>

export type Dict = (typeof dict)['az']
export const t = (locale: Locale): Dict => dict[locale]
