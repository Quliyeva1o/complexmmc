import type { Locale } from './config'

/** Small interface strings (everything editorial lives in the CMS). */
const dict = {
  az: {
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
