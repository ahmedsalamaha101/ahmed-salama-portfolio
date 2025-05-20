import { currencyTranslations } from "./currency-translations"

export type Language = "en" | "ar" | "de" | "ru" | "pl"

export interface Translations {
  // Common keys that will be used across the site
  [key: string]: string
}

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    experience: "Experience",
    skills: "Skills",
    work: "Work",
    certifications: "Certifications",
    testimonials: "Testimonials",
    contact: "Contact",
    blog: "Blog",
    services: "Services",
    faq: "FAQ",

    // Hero section
    hi: "Hi,",
    im: "I'm",
    name: "Ahmed Salama",
    tourism_consultant: "Tourism Consultant",
    view_resume: "View Resume",
    download_resume: "Download Resume",
    achievement_ticker: "10+ Years Experience | 1000+ Satisfied Clients | 50+ Countries Covered",
    scroll_down: "Scroll Down",

    // About section
    about_title: "About",
    about_name: "I'm Ahmed Salama",
    about_p1:
      "I am the Vice President at Maz Travel and an experienced Tourism Consultant with extensive expertise in the travel and hospitality industry. I specialize in providing comprehensive travel solutions, flight booking services, and premium hospitality arrangements for both individual travelers and corporate clients.",
    about_p2:
      "With a strong background in tourism management and customer service, I help clients navigate the complexities of travel planning, ensuring seamless experiences from booking to destination. My expertise includes domestic and international travel arrangements, VIP services, and customized travel packages.",
    about_p3:
      "Currently pursuing my CMA (Certified Management Accountant) certification, I am committed to enhancing my financial management skills to complement my tourism expertise and deliver even greater value to my clients and organization.",

    // Footer
    about_us: "About Us",
    footer_about_text:
      "We provide comprehensive travel solutions, flight booking services, and premium hospitality arrangements for both individual travelers and corporate clients.",
    quick_links: "Quick Links",
    contact_info: "Contact Info",
    newsletter: "Newsletter",
    newsletter_text: "Subscribe to our newsletter to receive updates and travel offers.",
    your_email: "Your Email",
    subscribe: "Subscribe",
    subscribing: "Subscribing...",
    subscribe_success: "Thank you for subscribing!",
    subscribe_error: "There was an error. Please try again.",
    made_with: "Made with",
    by: "by",
    rights_reserved: "All rights reserved.",
    tourism_hub: "Ahmed Salama's Tourism Hub",

    // Special Offer
    limited_time_offer: "Limited Time Offer",
    valid_until: "Valid Until",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    offer_expired: "This offer has expired",
    book_now_save: "Book Now and Save!",
    ...currencyTranslations.en,
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    about: "نبذة عني",
    experience: "الخبرات",
    skills: "المهارات",
    work: "الأعمال",
    certifications: "الشهادات",
    testimonials: "آراء العملاء",
    contact: "اتصل بي",
    blog: "المدونة",
    services: "الخدمات",
    faq: "الأسئلة الشائعة",

    // Hero section
    hi: "مرحباً،",
    im: "أنا",
    name: "احمد سلامه",
    tourism_consultant: "مستشار سياحي",
    view_resume: "عرض السيرة الذاتية",
    download_resume: "تحميل السيرة الذاتية",
    achievement_ticker: "خبرة أكثر من 10 سنوات | أكثر من 1000 عميل راضٍ | أكثر من 50 دولة تمت تغطيتها",
    scroll_down: "اسحب للأسفل",

    // About section
    about_title: "نبذة عني",
    about_name: "أنا احمد سلامه",
    about_p1:
      "أشغل منصب نائب الرئيس في ماز ترافل وأعمل كمستشار سياحي ذو خبرة واسعة في صناعة السفر والضيافة. أتخصص في تقديم حلول سفر شاملة، وخدمات حجز الطيران، وترتيبات الضيافة المميزة للمسافرين الأفراد والعملاء من الشركات.",
    about_p2:
      "مع خلفية قوية في إدارة السياحة وخدمة العملاء، أساعد العملاء في التنقل عبر تعقيدات تخطيط السفر، وضمان تجارب سلسة من الحجز إلى الوجهة. تشمل خبرتي ترتيبات السفر المحلية والدولية، وخدمات كبار الشخصيات، وحزم السفر المخصصة.",
    about_p3:
      "أسعى حالياً للحصول على شهادة المحاسب الإداري المعتمد (CMA)، وأنا ملتزم بتعزيز مهاراتي في الإدارة المالية لتكملة خبرتي السياحية وتقديم قيمة أكبر لعملائي ومؤسستي.",

    // Footer
    about_us: "من نحن",
    footer_about_text:
      "نقدم حلول سفر شاملة، وخدمات حجز الطيران، وترتيبات الضيافة المميزة للمسافرين الأفراد والعملاء من الشركات.",
    quick_links: "روابط سريعة",
    contact_info: "معلومات الاتصال",
    newsletter: "النشرة الإخبارية",
    newsletter_text: "اشترك في نشرتنا الإخبارية لتلقي التحديثات وعروض السفر.",
    your_email: "بريدك الإلكتروني",
    subscribe: "اشترك",
    subscribing: "جاري الاشتراك...",
    subscribe_success: "شكراً لاشتراكك!",
    subscribe_error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    made_with: "صنع بـ",
    by: "بواسطة",
    rights_reserved: "جميع الحقوق محفوظة.",
    tourism_hub: "مركز احمد سلامه للسياحة",

    // Special Offer
    limited_time_offer: "عرض لفترة محدودة",
    valid_until: "صالح حتى",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني",
    offer_expired: "انتهت صلاحية هذا العرض",
    book_now_save: "احجز الآن ووفر!",
    ...currencyTranslations.ar,
  },
  de: {
    // Navigation
    home: "Startseite",
    about: "Über mich",
    experience: "Erfahrung",
    skills: "Fähigkeiten",
    work: "Arbeit",
    certifications: "Zertifizierungen",
    testimonials: "Referenzen",
    contact: "Kontakt",
    blog: "Blog",
    services: "Dienstleistungen",
    faq: "FAQ",

    // Hero section
    hi: "Hallo,",
    im: "Ich bin",
    name: "Ahmed Salama",
    tourism_consultant: "Tourismusberater",
    view_resume: "Lebenslauf ansehen",
    download_resume: "Lebenslauf herunterladen",
    achievement_ticker: "Über 10 Jahre Erfahrung | Mehr als 1000 zufriedene Kunden | Über 50 Länder abgedeckt",
    scroll_down: "Nach unten scrollen",

    // About section
    about_title: "Über mich",
    about_name: "Ich bin Ahmed Salama",
    about_p1:
      "Ich bin Vizepräsident bei Maz Travel und ein erfahrener Tourismusberater mit umfassender Expertise in der Reise- und Gastgewerbebranche. Ich bin spezialisiert auf umfassende Reiselösungen, Flugbuchungsservices und erstklassige Gastgewerbe-Arrangements sowohl für Einzelreisende als auch für Firmenkunden.",
    about_p2:
      "Mit einem starken Hintergrund im Tourismusmanagement und Kundenservice helfe ich Kunden, die Komplexität der Reiseplanung zu bewältigen und sorge für nahtlose Erlebnisse von der Buchung bis zum Ziel. Meine Expertise umfasst inländische und internationale Reisearrangements, VIP-Services und maßgeschneiderte Reisepakete.",
    about_p3:
      "Derzeit strebe ich meine CMA (Certified Management Accountant) Zertifizierung an und bin bestrebt, meine Fähigkeiten im Finanzmanagement zu verbessern, um meine Tourismusexpertise zu ergänzen und meinen Kunden und meiner Organisation einen noch größeren Mehrwert zu bieten.",

    // Footer
    about_us: "Über uns",
    footer_about_text:
      "Wir bieten umfassende Reiselösungen, Flugbuchungsservices und erstklassige Gastgewerbe-Arrangements sowohl für Einzelreisende als auch für Firmenkunden.",
    quick_links: "Schnelllinks",
    contact_info: "Kontaktinformationen",
    newsletter: "Newsletter",
    newsletter_text: "Abonnieren Sie unseren Newsletter, um Updates und Reiseangebote zu erhalten.",
    your_email: "Ihre E-Mail",
    subscribe: "Abonnieren",
    subscribing: "Wird abonniert...",
    subscribe_success: "Vielen Dank für Ihr Abonnement!",
    subscribe_error: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
    made_with: "Erstellt mit",
    by: "von",
    rights_reserved: "Alle Rechte vorbehalten.",
    tourism_hub: "Ahmed Salamas Tourismus-Hub",

    // Special Offer
    limited_time_offer: "Zeitlich begrenztes Angebot",
    valid_until: "Gültig bis",
    days: "Tage",
    hours: "Stunden",
    minutes: "Minuten",
    seconds: "Sekunden",
    offer_expired: "Dieses Angebot ist abgelaufen",
    book_now_save: "Jetzt buchen und sparen!",
    ...currencyTranslations.de,
  },
  ru: {
    // Navigation
    home: "Главная",
    about: "Обо мне",
    experience: "Опыт",
    skills: "Навыки",
    work: "Работа",
    certifications: "Сертификаты",
    testimonials: "Отзывы",
    contact: "Контакты",
    blog: "Блог",
    services: "Услуги",
    faq: "Вопросы",

    // Hero section
    hi: "Привет,",
    im: "Я",
    name: "Ахмед Салама",
    tourism_consultant: "Консультант по туризму",
    view_resume: "Посмотреть резюме",
    download_resume: "Скачать резюме",
    achievement_ticker: "Более 10 лет опыта | Более 1000 довольных клиентов | Более 50 стран",
    scroll_down: "Прокрутить вниз",

    // About section
    about_title: "Обо мне",
    about_name: "Я Ахмед Салама",
    about_p1:
      "Я вице-президент Maz Travel и опытный консультант по туризму с обширным опытом в индустрии путешествий и гостеприимства. Я специализируюсь на предоставлении комплексных решений для путешествий, услуг по бронированию авиабилетов и премиальных услуг гостеприимства как для индивидуальных путешественников, так и для корпоративных клиентов.",
    about_p2:
      "Имея сильный опыт в управлении туризмом и обслуживании клиентов, я помогаю клиентам ориентироваться в сложностях планирования путешествий, обеспечивая безупречный опыт от бронирования до места назначения. Мой опыт включает организацию внутренних и международных поездок, VIP-услуги и индивидуальные туристические пакеты.",
    about_p3:
      "В настоящее время я получаю сертификацию CMA (Certified Management Accountant) и стремлюсь улучшить свои навыки финансового управления, чтобы дополнить свой опыт в туризме и предоставить еще большую ценность моим клиентам и организации.",

    // Footer
    about_us: "О нас",
    footer_about_text:
      "Мы предоставляем комплексные решения для путешествий, услуги по бронированию авиабилетов и премиальные услуги гостеприимства как для индивидуальных путешественников, так и для корпоративных клиентов.",
    quick_links: "Быстрые ссылки",
    contact_info: "Контактная информация",
    newsletter: "Рассылка",
    newsletter_text: "Подпишитесь на нашу рассылку, чтобы получать обновления и предложения по путешествиям.",
    your_email: "Ваш email",
    subscribe: "Подписаться",
    subscribing: "Подписка...",
    subscribe_success: "Спасибо за подписку!",
    subscribe_error: "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
    made_with: "Сделано с",
    by: "от",
    rights_reserved: "Все права защищены.",
    tourism_hub: "Туристический центр Ахмеда Саламы",

    // Special Offer
    limited_time_offer: "Ограниченное по времени предложение",
    valid_until: "Действительно до",
    days: "Дней",
    hours: "Часов",
    minutes: "Минут",
    seconds: "Секунд",
    offer_expired: "Срок действия этого предложения истек",
    book_now_save: "Забронируйте сейчас и сэкономьте!",
    ...currencyTranslations.ru,
  },
  pl: {
    // Navigation
    home: "Strona główna",
    about: "O mnie",
    experience: "Doświadczenie",
    skills: "Umiejętności",
    work: "Praca",
    certifications: "Certyfikaty",
    testimonials: "Referencje",
    contact: "Kontakt",
    blog: "Blog",
    services: "Usługi",
    faq: "FAQ",

    // Hero section
    hi: "Cześć,",
    im: "Jestem",
    name: "Ahmed Salama",
    tourism_consultant: "Konsultant ds. turystyki",
    view_resume: "Zobacz CV",
    download_resume: "Pobierz CV",
    achievement_ticker: "Ponad 10 lat doświadczenia | Ponad 1000 zadowolonych klientów | Ponad 50 krajów",
    scroll_down: "Przewiń w dół",

    // About section
    about_title: "O mnie",
    about_name: "Jestem Ahmed Salama",
    about_p1:
      "Jestem wiceprezesem Maz Travel i doświadczonym konsultantem ds. turystyki z rozległą wiedzą w branży podróży i hotelarstwa. Specjalizuję się w dostarczaniu kompleksowych rozwiązań podróżniczych, usług rezerwacji lotów i premium usług hotelarskich zarówno dla indywidualnych podróżnych, jak i klientów korporacyjnych.",
    about_p2:
      "Dzięki silnemu doświadczeniu w zarządzaniu turystyką i obsłudze klienta, pomagam klientom poruszać się po zawiłościach planowania podróży, zapewniając bezproblemowe doświadczenia od rezerwacji do miejsca docelowego. Moja wiedza obejmuje organizację podróży krajowych i międzynarodowych, usługi VIP i niestandardowe pakiety podróżne.",
    about_p3:
      "Obecnie zdobywam certyfikat CMA (Certified Management Accountant) i jestem zaangażowany w doskonalenie moich umiejętności zarządzania finansami, aby uzupełnić moją wiedzę turystyczną i dostarczyć jeszcze większą wartość moim klientom i organizacji.",

    // Footer
    about_us: "O nas",
    footer_about_text:
      "Zapewniamy kompleksowe rozwiązania podróżnicze, usługi rezerwacji lotów i premium usługi hotelarskie zarówno dla indywidualnych podróżnych, jak i klientów korporacyjnych.",
    quick_links: "Szybkie linki",
    contact_info: "Informacje kontaktowe",
    newsletter: "Newsletter",
    newsletter_text: "Zapisz się do naszego newslettera, aby otrzymywać aktualizacje i oferty podróży.",
    your_email: "Twój email",
    subscribe: "Zapisz się",
    subscribing: "Zapisywanie...",
    subscribe_success: "Dziękujemy za subskrypcję!",
    subscribe_error: "Wystąpił błąd. Spróbuj ponownie.",
    made_with: "Stworzone z",
    by: "przez",
    rights_reserved: "Wszelkie prawa zastrzeżone.",
    tourism_hub: "Centrum Turystyczne Ahmeda Salamy",

    // Special Offer
    limited_time_offer: "Oferta ograniczona czasowo",
    valid_until: "Ważna do",
    days: "Dni",
    hours: "Godzin",
    minutes: "Minut",
    seconds: "Sekund",
    offer_expired: "Ta oferta wygasła",
    book_now_save: "Zarezerwuj teraz i oszczędzaj!",
    ...currencyTranslations.pl,
  },
}
