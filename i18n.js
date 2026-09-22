/* =========================================================
   i18n.js - Language switcher (AR / EN) for amadco website
   - Adds a language toggle button (AR/EN)
   - Switches <html dir> & <html lang>
   - Translates elements via [data-i18n] / [data-i18n-ph] keys
   - Persists choice in localStorage
   ========================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'amadco_lang';

  /* ---------- Translation dictionary ----------
     key : { ar: "...", en: "..." }
     For placeholder-only texts use { ph.en: "...", ph.ar: "..." }
  */
  var dict = {
    /* Navbar */
    'nav.home': { ar: 'الرئيسية', en: 'Home' },
    'nav.services': { ar: 'جميع الخدمات', en: 'All Services' },
    'nav.about': { ar: 'عن الشركة', en: 'About Us' },
    'nav.why': { ar: 'لماذا أمدكو', en: 'Why Amdco' },
    'nav.contact': { ar: 'تواصل معنا', en: 'Contact Us' },
    'nav.pestControl': { ar: 'مكافحة الحشرات', en: 'Pest Control' },
    'nav.sterilization': { ar: 'التعقيم ضد الفيروسات', en: 'Disinfection' },
    'nav.steam': { ar: 'تنظيف الأثاث بالبخار', en: 'Steam Cleaning' },
    'nav.tank': { ar: 'تنظيف وتعقيم الخزانات', en: 'Tank Cleaning' },
    'nav.contracts': { ar: 'العقود السنوية', en: 'Annual Contracts' },
    'nav.sterilizationShort': { ar: 'التعقيم', en: 'Disinfection' },
    'nav.steamShort': { ar: 'التنظيف بالبخار', en: 'Steam Cleaning' },
    'nav.tankShort': { ar: 'تنظيف الخزانات', en: 'Tank Cleaning' },
    'nav.langAr': { ar: 'EN', en: 'EN' },
    'nav.langEn': { ar: 'AR', en: 'AR' },

    /* Hero */
    'hero.badge': { ar: 'شركة أمد الأولى للخدمات المنزلية', en: 'Amd Aloula Company for Home Services' },
    'hero.title.prefix': { ar: 'الخيار الأول في', en: 'The first choice in' },
    'hero.title.highlight': { ar: 'مكافحة الحشرات والتعقيم والخدمات المنزلية', en: 'Pest Control, Disinfection & Home Services' },
    'hero.desc': { ar: 'نقدم خدمات تنظيف ومكافحة حشرات احترافية بمعايير عالمية وضمان حقيقي لراحتك وسلامة عائلتك.', en: 'We provide professional cleaning and pest control services to international standards with a real guarantee for your comfort and your family\'s safety.' },
    'hero.bookNow': { ar: 'احجز موعدك الآن', en: 'Book Your Appointment' },
    'hero.contactUs': { ar: 'تواصل معنا', en: 'Contact Us' },
    'hero.years': { ar: 'سنوات خبرة', en: 'Years of Experience' },
    'hero.customers': { ar: 'عميل سعيد', en: 'Happy Customers' },
    'hero.techs': { ar: 'فني متخصص', en: 'Specialized Technicians' },

    /* Services */
    'services.desc': { ar: 'نوفر لكم مجموعة شاملة من الخدمات المنزلية والصحية بأعلى معايير الجودة والاحترافية', en: 'We provide a comprehensive range of home and health services with the highest quality and professional standards' },
    'services.pest.title': { ar: 'مكافحة حشرات', en: 'Pest Control' },
    'services.pest.text': { ar: 'نتعامل مع جميع أنواع الحشرات باستخدام أحدث المبيدات المعتمدة والآمنة صحياً. فريقنا المتخصص يضمن لك التخلص النهائي من الصراصير، النمل، البق، والقوارض بضمان كامل.', en: 'We handle all types of pests using the latest approved, health-safe pesticides. Our specialized team guarantees the final elimination of cockroaches, ants, bed bugs, and rodents with full warranty.' },
    'services.pest.f1': { ar: 'مبيدات معتمدة عالمياً', en: 'Globally approved pesticides' },
    'services.pest.f2': { ar: 'ضمان 6 أشهر', en: '6-month warranty' },
    'services.pest.f3': { ar: 'آمن للأطفال والحيوانات', en: 'Safe for children & pets' },
    'services.pest.f4': { ar: 'معالجة فورية', en: 'Immediate treatment' },
    'services.request': { ar: 'لطلب الخدمة اضغط هنا', en: 'Request this service' },
    'services.contracts.title': { ar: 'العقود السنوية', en: 'Annual Contracts' },
    'services.contracts.text': { ar: 'عقود سنوية لمكافحة الحشرات تضمن لك ولعائلتك بيئة آمنة وصحية طوال العام، مع زيارات دورية منتظمة ودعم طارئ.', en: 'Annual pest control contracts ensure a safe and healthy environment for you and your family all year round, with regular visits and emergency support.' },
    'services.contracts.f1': { ar: 'مكافحة كاملة وآمنة', en: 'Complete & safe control' },
    'services.contracts.f2': { ar: 'جدول زيارات منتظم', en: 'Regular visit schedule' },
    'services.contracts.f3': { ar: 'دعم طارئ 24/7', en: '24/7 emergency support' },
    'services.contracts.f4': { ar: 'ضمان راحة البال', en: 'Peace-of-mind guarantee' },
    'services.ster.title': { ar: 'تعقيم ضد الفيروسات', en: 'Virus Disinfection' },
    'services.ster.text': { ar: 'خدمة تعقيم شاملة بالأشعة فوق البنفسجية والمطهرات الطبية المعتمدة. نحمي منزلكم ومكان عملكم من الفيروسات والبكتيريا بطرق علمية حديثة وموثوقة.', en: 'A comprehensive disinfection service using UV light and approved medical disinfectants. We protect your home and workplace from viruses and bacteria using modern, reliable scientific methods.' },
    'services.ster.f1': { ar: 'تعقيم بـ UV', en: 'UV disinfection' },
    'services.ster.f2': { ar: 'مطهرات طبية', en: 'Medical disinfectants' },
    'services.ster.f3': { ar: 'شهادة تعقيم', en: 'Disinfection certificate' },
    'services.ster.f4': { ar: 'حماية طويلة الأمد', en: 'Long-lasting protection' },
    'services.steam.title': { ar: 'تنظيف الأثاث بالبخار', en: 'Steam Furniture Cleaning' },
    'services.steam.text': { ar: 'تنظيف عميق للأثاث باستخدام تقنية البخار عالي الضغط التي تزيل أصعب البقع والرواسب دون إلحاق أي ضرر بالأسطح. مثالي للمنازل والمحلات التجارية.', en: 'Deep furniture cleaning using high-pressure steam technology that removes the toughest stains without harming surfaces. Ideal for homes and businesses.' },
    'services.steam.f1': { ar: 'تقنية بخار 180°', en: '180° steam technology' },
    'services.steam.f2': { ar: 'التخلص من الروائح', en: 'Odor removal' },
    'services.steam.f3': { ar: 'تجفيف سريع', en: 'Fast drying' },
    'services.steam.f4': { ar: 'حماية القماش', en: 'Fabric protection' },
    'services.tank.title': { ar: 'تنظيف وتعقيم الخزانات', en: 'Tank Cleaning & Disinfection' },
    'services.tank.text': { ar: 'خدمة متكاملة لتنظيف وتعقيم خزانات المياه باتباع أعلى معايير السلامة والصحة. نضمن مياه نظيفة وصحية لعائلتك مع فحص شامل.', en: 'Complete water tank cleaning and disinfection following the highest safety and health standards. We guarantee clean, healthy water for your family with a full inspection.' },
    'services.tank.f1': { ar: 'مواد معتمدة صحياً', en: 'Health-approved materials' },
    'services.tank.f2': { ar: 'قياس نسبة الكلور', en: 'Chlorine level testing' },
    'services.tank.f3': { ar: 'عزل وتسريب', en: 'Insulation & leakage' },
    'services.tank.f4': { ar: 'تقرير فحص مجاني', en: 'Free inspection report' },

    /* About */
    'about.badge': { ar: 'من نحن', en: 'Who We Are' },
    'about.title': { ar: 'عن الشركة', en: 'About the Company' },
    'about.companyTitle': { ar: 'عن الشركة', en: 'About the Company' },
    'about.visionTitle': { ar: 'رؤيتنا', en: 'Our Vision' },
    'about.missionTitle': { ar: 'رسالتنا', en: 'Our Mission' },
    'about.targetsTitle': { ar: 'أهدافنا', en: 'Our Targets' },
    'about.companyText': { ar: 'تدير شركة أمد الأولى المحدودة (أمدكو) نشاطاتها من فروعها الموزعة في العديد من مدن المملكة وتقدم الحلول المتكاملة ذات الجودة العالية في جميع مشاريعها وفق خطى ثابتة ومتطورة من عام 2005م إلى يومنا هذا.', en: 'Amd Aloula Company Ltd. (amdco) operates from different cities all around the Kingdom of Saudi Arabia. It provides integrated solutions of high quality in all its projects since it started from 2005 AD to the present day.' },
    'about.visionText': { ar: 'أن نكون وجهتك الأولى لتحقيق تطلعاتك ومشاريعك بنجاح وإتقان.', en: 'To be your first choice to achieve your aspirations and projects with success and perfection.' },
    'about.missionText': { ar: 'تقديم خدمات متكاملة ومتميزة لتحقيق تطلعات عملائنا من خلال فريق عمل فعّال وتقنيات معلومات واتصالات متقدمة.', en: 'Providing integrated and distinguished services to achieve the aspirations of our customers through an effective team and advanced information and communication technologies.' },
    'about.target1': { ar: 'تقديم أفضل الخدمات والحلول.', en: 'Providing the best services and solutions.' },
    'about.target2': { ar: 'بناء وتطوير كادر عمل محترف وتطبيق أحدث الأنظمة والتقنيات.', en: 'Building and developing a professional workforce and applying the latest systems and technologies.' },
    'about.target3': { ar: 'بناء علاقات إستراتيجية مع العملاء والشركات ذات العلاقات التجارية والحكومية المختلفة.', en: 'Building strategic relationships with clients and related commercial and governmental companies.' },
    'about.target4': { ar: 'المساهمة في تعزيز المسؤولية المجتمعية.', en: 'Contributing to enhance social responsibility.' },
    'about.target5': { ar: 'تحقيق أعلى العوائد للشركاء.', en: 'Achieving the highest returns for partners.' },

    /* Why us */
    'why.badge.subtitle': { ar: 'مميزاتنا', en: 'Our Features' },
    'why.title': { ar: 'لماذا أمدكو؟', en: 'Why Amdco?' },
    'why.desc': { ar: 'شركة أمد الأولى للخدمات تأسست بخبرة تتجاوز العشر سنوات في مجال الخدمات المنزلية والصحية. نسعى دائماً لتقديم أعلى مستويات الجودة والاحترافية لعملائنا الكرام.', en: 'Amd Aloula Company for Services was founded with over ten years of experience in home and health services. We always strive to provide the highest levels of quality and professionalism to our valued customers.' },
    'why.f1.title': { ar: 'ضمان الجودة', en: 'Quality Guarantee' },
    'why.f1.text': { ar: 'نضمن لكم نتائج مضمونة مع ضمان يصل إلى سنة كاملة على جميع خدماتنا', en: 'Guaranteed results with a warranty of up to a full year on all our services' },
    'why.f2.title': { ar: 'سرعة الاستجابة', en: 'Fast Response' },
    'why.f2.text': { ar: 'فريقنا جاهز للوصول إليكم في أسرع وقت ممكن مع خدمة طوارئ على مدار الساعة', en: 'Our team is ready to reach you as quickly as possible with 24/7 emergency service' },
    'why.f3.title': { ar: 'مواد آمنة ومعتمدة', en: 'Safe & Approved Materials' },
    'why.f3.text': { ar: 'نستخدم فقط مواد معتمدة من هيئة الغذاء والدواء وآمنة تماماً للأطفال والحيوانات الأليفة', en: 'We only use materials approved by the Food and Drug Authority, completely safe for children and pets' },
    'why.exp': { ar: 'سنوات خبرة', en: 'Years of Experience' },

    /* Customers */
    'customers.badge': { ar: 'عملائنا', en: 'Our Clients' },
    'customers.title': { ar: 'شركاء النجاح', en: 'Success Partners' },

    /* Testimonials */
    'test.badge': { ar: 'أكثر من 2000 عميل سعيد', en: 'Over 2000 happy customers' },
    'test.title': { ar: 'اخترنا لكم أفضل التقييمات', en: 'We selected the best reviews for you' },
    'test.desc': { ar: 'آراء من عملائنا الكرام الذين نفخر بخدمتهم في جميع أنحاء المملكة', en: 'Opinions from our valued customers we are proud to serve across the Kingdom' },
    'test.rating': { ar: 'متوسط التقييم 4.9 من أصل 5 نجوم', en: 'Average rating of 4.9 out of 5 stars' },

    /* Contact */
    'contact.badge': { ar: 'تواصل معنا', en: 'Contact Us' },
    'contact.title': { ar: 'نحن هنا لخدمتك', en: 'We Are Here for You' },
    'contact.desc': { ar: 'تواصل معنا الآن واحصل على استشارة مجانية وعرض سعر خاص', en: 'Contact us now for a free consultation and a special price quote' },
    'contact.call': { ar: 'اتصل بنا', en: 'Call Us' },
    'contact.whatsapp': { ar: 'واتساب', en: 'WhatsApp' },
    'contact.email': { ar: 'البريد الإلكتروني', en: 'Email' },
    'contact.address': { ar: 'العنوان', en: 'Address' },
    'contact.addressValue': { ar: 'فرع جدة, طريق الأمير سلطان, برج المرجانة', en: 'Jeddah Branch, Prince Sultan Road, Marjanna Tower' },
    'contact.otherBranches': { ar: 'فروعنا الأخرى', en: 'Our Other Branches' },

    /* Footer */
    'footer.brand': { ar: 'شركة أمد الأولى أمدكو - شريككم الموثوق في مكافحة الحشرات والتعقيم ضد الفيروسات والنظافة العامة خبرة منذ 13 عام.', en: 'Amd Aloula Company (Amdco) - your trusted partner in pest control, virus disinfection and general cleaning, with 13 years of experience.' },
    'footer.services': { ar: 'خدماتنا', en: 'Our Services' },
    'footer.links': { ar: 'روابط سريعة', en: 'Quick Links' },
    'footer.f1': { ar: 'مكافحة حشرات', en: 'Pest Control' },
    'footer.f2': { ar: 'تعقيم ضد الفيروسات', en: 'Virus Disinfection' },
    'footer.f3': { ar: 'تنظيف بالبخار', en: 'Steam Cleaning' },
    'footer.f4': { ar: 'تنظيف الخزانات', en: 'Tank Cleaning' },
    'footer.l1': { ar: 'الرئيسية', en: 'Home' },
    'footer.l2': { ar: 'لماذا أمدكو', en: 'Why Amdco' },
    'footer.l3': { ar: 'تواصل معنا', en: 'Contact Us' },
    'footer.hours': { ar: 'ساعات العمل وفروعنا', en: 'Working Hours & Branches' },
    'footer.hoursValue': { ar: 'السبت - الخميس (8 ص - 10 م)', en: 'Sat - Thu (8 AM - 10 PM)' },
    'footer.branches': { ar: 'فروعنا:', en: 'Our Branches:' },
    'footer.mainBranch': { ar: 'الفرع الرئيسي: فرع جدة, طريق الأمير سلطان, برج المرجانة', en: 'Main Branch: Jeddah, Prince Sultan Road, Marjanna Tower' },
    'footer.otherBranches': { ar: 'فروعنا الأخرى: الرياض - مكة المكرمة - خميس مشيط', en: 'Other branches: Riyadh - Makkah - Khamis Mushait' },
    'footer.rights': { ar: '© 2024 أمدكو - جميع الحقوق محفوظة', en: '© 2024 Amdco - All Rights Reserved' },

    /* Floating buttons & cart */
    'call.tooltip': { ar: 'اتصل بنا الآن', en: 'Call Us Now' },
    'wa.tooltip': { ar: 'تحدث معنا على واتساب', en: 'Chat with us on WhatsApp' },
    'cart.title': { ar: 'عربة الطلبات', en: 'Order Cart' },
    'cart.empty': { ar: 'السلة فارغة', en: 'Cart is empty' },
    'cart.emptySub': { ar: 'أضف خدمات لتظهر هنا', en: 'Add services to see them here' },
    'cart.total': { ar: 'الإجمالي:', en: 'Total:' },
    'cart.send': { ar: 'إرسال الطلب واتساب', en: 'Send Order via WhatsApp' },
    'cart.clear': { ar: 'إفراغ السلة', en: 'Clear Cart' },
    'cart.qty': { ar: 'العدد:', en: 'Qty:' },
    'cart.added': { ar: 'تمت إضافة', en: 'Added' },
    'cart.to': { ar: 'للطلب', en: 'to order' },
    'cart.currency': { ar: 'ر.س', en: 'SAR' },
    'cart.toast': { ar: 'تم إضافة <strong class="toast-name"></strong> للطلب', en: 'Added <strong class="toast-name"></strong> to order' },
    'cart.toast2': { ar: 'تمت إضافة <span class="toast-name">الخدمة</span> للسلة', en: 'Added <span class="toast-name">service</span> to cart' },

    /* Page Titles */
    'title.home': { ar: 'أمدكو - شركة أمد الأولى للخدمات', en: 'Amdco - Amd Aloula Services Company' },
    'title.pest': { ar: 'مكافحة الحشرات - أمدكو', en: 'Pest Control - Amdco' },
    'title.ster': { ar: 'التعقيم ضد الفيروسات - أمدكو', en: 'Virus Disinfection - Amdco' },
    'title.steam': { ar: 'تنظيف الأثاث بالبخار - أمدكو', en: 'Steam Cleaning - Amdco' },
    'title.tank': { ar: 'تنظيف وتعقيم الخزانات - أمدكو', en: 'Tank Cleaning & Disinfection - Amdco' },
    'title.contracts': { ar: 'العقود السنوية - أمدكو', en: 'Annual Contracts - Amdco' },

    /* Portfolio Section (Subpages) */
    'portfolio.badge': { ar: 'معرض أعمالنا', en: 'Our Portfolio' },
    'portfolio.title': { ar: 'جانب من أعمالنا ومعداتنا', en: 'Our Work & Equipment' },
    'portfolio.pestAlt': { ar: 'أعمالنا في مكافحة الحشرات', en: 'Our pest control work' },
    'portfolio.sterAlt': { ar: 'أعمالنا في التعقيم', en: 'Our disinfection work' },
    'portfolio.steamAlt': { ar: 'أعمالنا في التنظيف بالبخار', en: 'Our steam cleaning work' },
    'portfolio.tankAlt': { ar: 'أعمالنا في تنظيف الخزانات', en: 'Our tank cleaning work' },

    /* Pricing & Orders Common */
    'pricing.badge': { ar: 'اطلب الآن', en: 'Order Now' },
    'pricing.add': { ar: 'أضف للطلب', en: 'Add to Order' },
    'pricing.added': { ar: 'تم الإضافة', en: 'Added' },
    'pricing.quote': { ar: 'طلب تسعيرة', en: 'Request Quote' },
    'pricing.startsFrom': { ar: 'تبدأ من', en: 'Starts from' },
    'pricing.priceAfterVisit': { ar: 'السعر بعد المعاينة', en: 'Price on Inspection' },
    'pricing.priceUponVisit': { ar: 'السعر عند الزيارة', en: 'Price Upon Visit' },
    'pricing.afterInspection': { ar: 'بعد المعاينة', en: 'After Inspection' },
    'pricing.priceAfterInspection': { ar: 'السعر بعد المعاينة', en: 'Price on Inspection' },
    'pricing.quoteVisit': { ar: 'اطلب زيارة تقييم', en: 'Request Evaluation Visit' },
    'pricing.decrease': { ar: 'تقليل', en: 'Decrease' },
    'pricing.increase': { ar: 'زيادة', en: 'Increase' },

    /* Department Page: Pest Control */
    'dept.pest.heroTitle': { ar: 'مكافحة حشرات', en: 'Pest Control' },
    'dept.pest.heroDesc': { ar: 'نتعامل مع جميع أنواع الحشرات باستخدام أحدث المبيدات المعتمدة والآمنة صحياً.', en: 'We handle all types of pests using the latest approved, health-safe pesticides.' },
    'dept.pest.aboutH2': { ar: 'لا تدع الحشرات تشاركك راحتك في بيتك!', en: 'Don\'t let pests compromise your home comfort!' },
    'dept.pest.aboutP1': { ar: 'مع ارتفاع درجات الحرارة في السعودية، تبدأ الحشرات بالبحث عن الملاذ الدافئ داخل المنازل والمقرات... لكن الحل أسهل مما تتوقع!', en: 'With rising temperatures in Saudi Arabia, insects seek warm shelter inside homes and premises... but the solution is easier than you think!' },
    'dept.pest.servicesH3': { ar: 'خدماتنا في مكافحة الحشرات:', en: 'Our Pest Control Services:' },
    'dept.pest.s1Title': { ar: 'النمل الأبيض (العثة):', en: 'Termites:' },
    'dept.pest.s1Desc': { ar: 'حلول جذريّة لحماية الأساسات والأبواب الخشبية قبل وبعد البناء.', en: 'Radical solutions to protect foundations and wooden doors before and after construction.' },
    'dept.pest.s2Title': { ar: 'الصراصير والبق:', en: 'Cockroaches & Bedbugs:' },
    'dept.pest.s2Desc': { ar: 'إبادة فورية بـ مبيدات آمنة وبدون رائحة أو الحاجة لمغادرة المنزل.', en: 'Immediate eradication with safe, odorless pesticides without leaving home.' },
    'dept.pest.s3Title': { ar: 'القوارض والحشرات الطائرة:', en: 'Rodents & Flying Insects:' },
    'dept.pest.s3Desc': { ar: 'حماية شاملة للمطابخ، الحدائق، والمستودعات.', en: 'Comprehensive protection for kitchens, gardens, and warehouses.' },
    'dept.pest.whyH3': { ar: 'لماذا نكون اختيارك الأول؟', en: 'Why Choose Us as Your First Choice?' },
    'dept.pest.w1Title': { ar: 'مبيدات معتمدة:', en: 'Approved Pesticides:' },
    'dept.pest.w1Desc': { ar: 'نستخدم مبيدات مصرحة من هيئة الغذاء والدواء السعودية وآمنة على الأطفال والحيوانات الأليفة.', en: 'We use pesticides approved by the Saudi SFDA, completely safe for children and pets.' },
    'dept.pest.w2Title': { ar: 'ضمان المتابعة:', en: 'Follow-up Guarantee:' },
    'dept.pest.w2Desc': { ar: 'ضمان على حسب ونوع الحشرة.', en: 'Warranty based on the type of pest.' },
    'dept.pest.w3Title': { ar: 'سرعة الاستجابة:', en: 'Fast Response:' },
    'dept.pest.w3Desc': { ar: 'فريق متخصص يملك أحدث معدات الرش والتبخير لتغطية كافة مناطق (جدة، مكة المكرمة).', en: 'Specialized team equipped with modern spraying and fogging gear covering all areas (Jeddah, Makkah).' },
    'dept.pest.offer': { ar: 'عرض خاص لفترة محدودة: احصل على خصم 15%', en: 'Special limited-time offer: Get 15% discount' },
    'pricing.pest.title': { ar: 'خدمات مكافحة حشرات', en: 'Pest Control Services' },
    'pricing.pest.cat': { ar: 'قسم مكافحة الحشرات', en: 'Pest Control Department' },

    /* Services: Pest Control */
    'svc.pest.studio': { ar: 'استوديو', en: 'Studio' },
    'svc.pest.apt1': { ar: 'شقة غرفة نوم', en: '1 Bedroom Apartment' },
    'svc.pest.apt2': { ar: 'شقة غرفتين نوم', en: '2 Bedroom Apartment' },
    'svc.pest.apt3': { ar: 'شقة ثلاث غرف نوم', en: '3 Bedroom Apartment' },
    'svc.pest.apt4': { ar: 'شقة أربع غرف نوم', en: '4 Bedroom Apartment' },
    'svc.pest.apt5': { ar: 'شقة خمس غرف نوم', en: '5 Bedroom Apartment' },
    'svc.pest.villa3': { ar: 'فيلا 3 غرف نوم + المجالس', en: 'Villa 3 Bedrooms + Living Rooms' },
    'svc.pest.villa6': { ar: 'فيلا 6 غرف نوم + 5 دورات مياه + صالة + مطبخ + مجالس', en: 'Villa 6 Bedrooms + 5 Bathrooms + Hall + Kitchen + Majlis' },
    'svc.pest.birds': { ar: 'مكافحة طيور', en: 'Bird Control' },
    'svc.pest.termiteDoor': { ar: 'مكافحة نمل أبيض - باب', en: 'Termite Control - Door' },
    'svc.pest.mice': { ar: 'مكافحة فئران', en: 'Rodent Control' },
    'svc.pest.sewerBugs': { ar: 'مكافحة حشرات الصرف الصحي + غرف التفتيش + دورات المياه', en: 'Sewage, Manholes & Bathrooms Pest Control' },
    'svc.pest.garden': { ar: 'رش حديقة', en: 'Garden Spraying' },
    'svc.pest.sewerRooms': { ar: 'رش غرف الصرف الصحي', en: 'Sewage Rooms Spraying' },
    'svc.pest.manholes': { ar: 'رش غرف التفتيش', en: 'Manholes Spraying' },
    'svc.pest.duplex4': { ar: 'رش دوبلكس 4 غرف مع دورات المياه + صالة + مطبخ', en: 'Duplex Spraying 4 Rooms + Bathrooms + Hall + Kitchen' },
    'svc.pest.palace': { ar: 'قصر 1500 متر', en: 'Palace 1500 sqm' },
    'svc.pest.other': { ar: 'أخرى', en: 'Other' },

    /* Department Page: Sterilization */
    'dept.ster.heroTitle': { ar: 'التعقيم ضد الفيروسات', en: 'Virus Disinfection' },
    'dept.ster.heroDesc': { ar: 'خدمة تعقيم شاملة بالأشعة فوق البنفسجية والمطهرات الطبية المعتمدة.', en: 'Comprehensive disinfection service using UV light and approved medical disinfectants.' },
    'dept.ster.aboutH2': { ar: 'صحتك وصحة أعمالك تبدأ من بيئة معقمة وآمنة!', en: 'Your health and business start from a sterile and safe environment!' },
    'dept.ster.aboutP1': { ar: 'مع انتشار الفيروسات والبكتيريا الضارة، أصبح التعقيم الدوري ضرورة أساسية للحفاظ على صحة الأفراد وسلامة بيئة العمل في جميع أنحاء المملكة العربية السعودية .<br/>في شركة أمد الأولى (أمدكو)، نقدم حلول تعقيم متكاملة ومخصصة لتلبية احتياجات مختلف القطاعات.', en: 'With the spread of harmful viruses and bacteria, regular disinfection is essential to keep people healthy and workplaces safe across Saudi Arabia.<br/>At Amd Aloula (Amdco), we provide integrated and customized disinfection solutions for various sectors.' },
    'dept.ster.sectorsH3': { ar: 'قطاعات نخدمها بكل إتقان:', en: 'Sectors We Serve with Excellence:' },
    'dept.ster.sec1Title': { ar: 'البيوت والمنازل:', en: 'Homes & Residences:' },
    'dept.ster.sec1Desc': { ar: 'حماية شاملة لعائلتك وأطفالك من الجراثيم والميكروبات.', en: 'Comprehensive protection for your family and children from germs and microbes.' },
    'dept.ster.sec2Title': { ar: 'الشركات والمكاتب:', en: 'Companies & Offices:' },
    'dept.ster.sec2Desc': { ar: 'بيئة عمل صحية تزيد من إنتاجية الموظفين وتصنع انطباعاً راقياً.', en: 'A healthy working environment boosting employee productivity and leaving a great impression.' },
    'dept.ster.sec3Title': { ar: 'المطاعم والكافيهات:', en: 'Restaurants & Cafes:' },
    'dept.ster.sec3Desc': { ar: 'أعلى درجات النظافة والتعقيم للالتزام بمعايير الاشتراطات الصحية.', en: 'The highest levels of hygiene and sanitization complying with health requirements.' },
    'dept.ster.sec4Title': { ar: 'المستودعات والمخازن:', en: 'Warehouses & Storage:' },
    'dept.ster.sec4Desc': { ar: 'حماية المنتجات والبضائع المخزنة من أي تلوث بكتيري أو حشري.', en: 'Protecting stored goods from any bacterial contamination or pests.' },
    'dept.ster.sec5Title': { ar: 'المصانع والمنشآت الصناعية:', en: 'Factories & Industrial Plants:' },
    'dept.ster.sec5Desc': { ar: 'تعقيم دقيق لخطوط الإنتاج والمساحات الكبيرة وفق أعلى معايير السلامة.', en: 'Accurate disinfection of production lines and large areas following highest safety standards.' },
    'dept.ster.safetyBox': { ar: 'أمانك يبدأ من هنا... تواصل معنا لتعقيم منشأتك.', en: 'Your safety starts here... Contact us to disinfect your premises.' },
    'pricing.ster.title': { ar: 'خدمات التعقيم ضد الفيروسات', en: 'Virus Disinfection Services' },
    'pricing.ster.cat': { ar: 'قسم التعقيم ضد الفيروسات', en: 'Virus Disinfection Department' },

    /* Services: Sterilization */
    'svc.ster.studio': { ar: 'تعقيم استوديو', en: 'Studio Disinfection' },
    'svc.ster.apt1': { ar: 'تعقيم شقة 1 غرفة', en: '1 Bedroom Apartment Disinfection' },
    'svc.ster.apt2': { ar: 'تعقيم شقة 2 غرفة', en: '2 Bedroom Apartment Disinfection' },
    'svc.ster.apt3': { ar: 'تعقيم شقة 3 غرفة', en: '3 Bedroom Apartment Disinfection' },
    'svc.ster.apt4': { ar: 'تعقيم شقة 4 غرفة', en: '4 Bedroom Apartment Disinfection' },
    'svc.ster.apt5': { ar: 'تعقيم شقة 5 غرفة', en: '5 Bedroom Apartment Disinfection' },
    'svc.ster.villa300_500': { ar: 'فيلا 300–500 متر مربع', en: 'Villa 300–500 sqm' },
    'svc.ster.villa500_1000': { ar: 'فيلا 500–1000 متر مربع', en: 'Villa 500–1000 sqm' },
    'svc.ster.villa1000plus': { ar: 'فيلا أكثر من 1000 متر مربع', en: 'Villa > 1000 sqm' },
    'svc.ster.villa1': { ar: 'تعقيم فيلا 1 غرفة', en: 'Villa Disinfection 1 Room' },
    'svc.ster.villa2': { ar: 'تعقيم فيلا 2 غرفة', en: 'Villa Disinfection 2 Rooms' },
    'svc.ster.villa3': { ar: 'تعقيم فيلا 3 غرفة', en: 'Villa Disinfection 3 Rooms' },
    'svc.ster.villa4': { ar: 'تعقيم فيلا 4 غرفة', en: 'Villa Disinfection 4 Rooms' },
    'svc.ster.villa5': { ar: 'تعقيم فيلا 5 غرفة', en: 'Villa Disinfection 5 Rooms' },
    'svc.ster.villa6': { ar: 'تعقيم فيلا 6 غرفة', en: 'Villa Disinfection 6 Rooms' },
    'svc.ster.duplex': { ar: 'دوبلكس', en: 'Duplex' },
    'svc.ster.duplexPool': { ar: 'دوبلكس مع حوش ومسبح', en: 'Duplex with Yard & Pool' },
    'svc.ster.palace': { ar: 'قصر 1500 متر', en: 'Palace 1500 sqm' },
    'svc.ster.farms': { ar: 'تعقيم المزارع - بالقصر الصغير', en: 'Farms Disinfection - Small Palace' },
    'svc.ster.offices': { ar: 'تعقيم مكاتب', en: 'Offices Disinfection' },
    'svc.ster.restaurants': { ar: 'تعقيم مطاعم وكافيهات', en: 'Restaurants & Cafes Disinfection' },

    /* Department Page: Steam Cleaning */
    'dept.steam.heroTitle': { ar: 'تنظيف الأثاث بالبخار', en: 'Steam Furniture Cleaning' },
    'dept.steam.heroDesc': { ar: 'تنظيف عميق للأثاث باستخدام تقنية البخار عالي الضغط.', en: 'Deep furniture cleaning using high-pressure steam technology.' },
    'dept.steam.aboutH2': { ar: 'تنظيف الأثاث والمفروشات بالبخار والنظافة العامة', en: 'Steam Furniture & Upholstery Cleaning and General Hygiene' },
    'dept.steam.part1Title': { ar: 'أولاً: خطوات وطريقة تنظيف الأثاث والمفروشات بالبخار', en: 'First: Steps and Method for Steam Cleaning Furniture & Upholstery' },
    'dept.steam.part1Desc': { ar: 'تعتمد أمدكو على آلية عمل متكاملة من 6 مراحل لضمان النظافة العميقة وحماية جودة الأنسجة:', en: 'Amdco relies on an integrated 6-stage process ensuring deep hygiene and fabric preservation:' },
    'dept.steam.step1': { ar: '<strong>1. المعاينة والفحص الميداني:</strong> تحديد نوع النسيج لاختيار الحرارة المناسبة، وفحص البقع لاختيار المذيب الآمن.', en: '<strong>1. Field Inspection:</strong> Identifying fabric type to choose suitable temperature and examining stains to choose safe solvents.' },
    'dept.steam.step2': { ar: '<strong>2. الشفط الجاف والتفريغ العميق:</strong> باستخدام مكنسات صناعية (Turbo Vacuum) لإزالة الغبار من عمق القماش.', en: '<strong>2. Dry Vacuuming & Deep Suction:</strong> Using industrial Turbo Vacuums to remove embedded dust from fabrics.' },
    'dept.steam.step3': { ar: '<strong>3. المعالجة المسبقة للبقع:</strong> رش مواد تفكيك الدهون والفرك الخفيف بأفرش ناعمة.', en: '<strong>3. Pre-treatment of Stains:</strong> Spraying degreasers and gentle scrubbing with soft brushes.' },
    'dept.steam.step4': { ar: '<strong>4. التنظيف وضخ البخار الحراري:</strong> ضخ بخار بـ 100-140 درجة مئوية للقضاء على 99.9% من الجراثيم وبق الفراش.', en: '<strong>4. Thermal Steam Extraction:</strong> Injecting steam at 100-140°C to eliminate 99.9% of germs and bed bugs.' },
    'dept.steam.step5': { ar: '<strong>5. الشفط المائي وسحب الرطوبة:</strong> بتقنية الشفط السريع لمنع تسرب الماء للحشوات.', en: '<strong>5. Moisture Extraction:</strong> Fast suction technology preventing water seepage into padding.' },
    'dept.steam.step6': { ar: '<strong>6. التعقيم والتعطير والتجفيف السريع:</strong> إضافة معقمات وروائح ليكون الأثاث جاهزاً خلال 1-3 ساعات.', en: '<strong>6. Sanitization, Fragrance & Fast Drying:</strong> Adding sanitizers and fragrances, furniture ready within 1-3 hours.' },
    'dept.steam.part2Title': { ar: 'ثانياً: خطة النظافة العامة الشاملة', en: 'Second: Comprehensive General Cleaning Plan' },
    'dept.steam.part2Desc': { ar: 'تغطي أمدكو جميع متطلبات النظافة الشاملة للمنازل، الفلل، والمباني التجارية في المملكة:', en: 'Amdco covers all comprehensive cleaning requirements for homes, villas, and commercial facilities across the Kingdom:' },
    'dept.steam.p2Item1': { ar: '<strong>جلي وتلميع الأرضيات:</strong> الرخام، السيراميك، والباركيه بأحدث أجهزة الألماس.', en: '<strong>Floor Grinding & Polishing:</strong> Marble, ceramic, and parquet using modern diamond machines.' },
    'dept.steam.p2Item2': { ar: '<strong>تنظيف المطابخ والحمامات:</strong> إزالة الدهون وتعقيم شامل للأدوات الصحية.', en: '<strong>Kitchens & Bathrooms Cleaning:</strong> Grease removal and thorough sanitization of sanitary ware.' },
    'dept.steam.p2Item3': { ar: '<strong>تنظيف الواجهات والزجاج:</strong> تلميع الزجاج الداخلي والخارجي.', en: '<strong>Facade & Glass Cleaning:</strong> Polishing interior and exterior glass.' },
    'dept.steam.p2Item4': { ar: '<strong>تنظيف ما بعد البناء والترميم:</strong> إزالة بقايا الدهان والإسمنت لتهيئتها للسكن الفوري.', en: '<strong>Post-Construction Cleaning:</strong> Removing paint and cement residues for immediate occupancy.' },
    'dept.steam.featH4': { ar: '⭐ مميزات خدمة "أمدكو"', en: '⭐ Advantages of "Amdco" Service' },
    'dept.steam.f1': { ar: '<strong>مواد آمنة ومصرحة:</strong> من هيئة الغذاء والدواء.', en: '<strong>Safe & Authorized Materials:</strong> Certified by the SFDA.' },
    'dept.steam.f2': { ar: '<strong>تقنيات تجفيف متطورة:</strong> لمنع تكون الفطريات.', en: '<strong>Advanced Drying Technologies:</strong> Preventing fungal and mold growth.' },
    'dept.steam.f3': { ar: '<strong>كوادر مدربة:</strong> للتعامل مع المفروشات الفاخرة.', en: '<strong>Trained Workforce:</strong> Skilled in handling luxury furnishings.' },
    'pricing.steam.title': { ar: 'خدمات تنظيف الأثاث بالبخار', en: 'Steam Furniture Cleaning Services' },
    'pricing.steam.cat': { ar: 'قسم تنظيف الأثاث بالبخار', en: 'Steam Furniture Cleaning Department' },

    /* Services: Steam Cleaning */
    'svc.steam.villa': { ar: 'فيلا', en: 'Villa' },
    'svc.steam.carpet': { ar: 'سجاد', en: 'Carpet' },
    'svc.steam.sofa1': { ar: 'أريكة لشخص واحد', en: 'Single Armchair' },
    'svc.steam.sofa7': { ar: 'أريكة 7 أشخاص', en: '7-Seater Sofa' },
    'svc.steam.curtainSmall': { ar: 'ستارة صغيرة', en: 'Small Curtain' },
    'svc.steam.curtainMed': { ar: 'ستارة متوسطة', en: 'Medium Curtain' },
    'svc.steam.curtainLarge': { ar: 'ستارة كبيرة', en: 'Large Curtain' },
    'svc.steam.majlis': { ar: 'جلسات عربيه - بالمتر', en: 'Arabic Majlis - per meter' },
    'svc.steam.mattressSingle': { ar: 'مرتبة سرير مفرد', en: 'Single Mattress' },
    'svc.steam.mattressKing': { ar: 'مرتبة سرير عائلي', en: 'King/Family Mattress' },

    /* Department Page: Tank Cleaning */
    'dept.tank.heroTitle': { ar: 'تنظيف وتعقيم الخزانات', en: 'Tank Cleaning & Disinfection' },
    'dept.tank.heroDesc': { ar: 'خدمة متكاملة لتنظيف وتعقيم خزانات المياه باتباع أعلى معايير السلامة والصحة.', en: 'Integrated service for cleaning and disinfecting water tanks following highest safety and health standards.' },
    'dept.tank.aboutH2': { ar: 'كل ما تحتاج معرفته عن خدمة تنظيف وتطهير وعزل الخزانات', en: 'Everything You Need to Know About Tank Cleaning, Disinfection & Insulation' },
    'dept.tank.aboutP1': { ar: 'نقاء المياه في منزلك ليس رفاهية، بل أساس صحتك وصحة عائلتك! <br/>في شركة أمد الأولى (أمدكو)، لا نكتفي بالغسيل الظاهري فقط، بل نتبع خُطة عمل هندسية وصحية لضمان مياه نقية وخزان يعيش معك لأطول فترة ممكنة', en: 'Purity of water in your home is the foundation of your family\'s health!<br/>At Amdco, we don\'t just clean the surface; we follow an engineered hygienic process ensuring pure water and maximum tank longevity.' },
    'dept.tank.stepsH3': { ar: 'كيف ننظف ونُعقم خزانك؟ (طريقة العمل)', en: 'How We Clean & Disinfect Your Tank (Our Workflow)' },
    'dept.tank.st1Title': { ar: 'الشفط والسحب', en: 'Draining & Suction' },
    'dept.tank.st1Desc': { ar: 'نسحب المياه القديمة المتبقية ونزيل الرواسب الطينية والرمال المستقرة في القاع.', en: 'We drain remaining stagnant water and remove mud and sand sediments from the bottom.' },
    'dept.tank.st2Title': { ar: 'الغسيل والفرك', en: 'Washing & Scrubbing' },
    'dept.tank.st2Desc': { ar: 'يتدخل فريقنا داخل الخزان باستخدام فرش خاصة لإزالة التكلسات والفطريات الملتصقة بالجدران والأرضيات.', en: 'Our team enters the tank using specialized brushes to scrub off calcifications and mold from walls and floor.' },
    'dept.tank.st3Title': { ar: 'التطهير والتعقيم', en: 'Sterilization & Sanitization' },
    'dept.tank.st3Desc': { ar: 'نستخدم مواد تعقيم معتمدة وآمنة تماماً (مصرحة من هيئة الغذاء والدواء)، تقضي على 99.9% من البكتيريا والجراثيم دون ترك أثر في طعم أو رائحة المياه.', en: 'We use certified, completely safe sterilizers (SFDA-approved) that kill 99.9% of bacteria without affecting taste or odor.' },
    'dept.tank.st4Title': { ar: 'التجفيف والشطف النهائي', en: 'Drying & Final Rinsing' },
    'dept.tank.st4Desc': { ar: 'يُشطف الخزان جيداً وتُسحب مياه الشطف قبل إعادة تعبئته بمياه نقية صالحة للاستخدام.', en: 'The tank is thoroughly rinsed and drained clean before being refilled with pure, usable water.' },
    'pricing.tank.title': { ar: 'خدمات تنظيف وتعقيم الخزانات', en: 'Tank Cleaning & Disinfection Services' },
    'pricing.tank.cat': { ar: 'تنظيف وتعقيم الخزانات', en: 'Tank Cleaning & Disinfection' },

    /* Services: Tank Cleaning */
    'svc.tank.both': { ar: 'تنظيف وتعقيم خزانات علوي وسفلي', en: 'Upper & Ground Tanks Cleaning & Disinfection' },
    'svc.tank.upper': { ar: 'خزان علوي', en: 'Upper Tank' },
    'svc.tank.groundSmall': { ar: 'خزان سفلي صغير', en: 'Small Ground Tank' },
    'svc.tank.groundMed': { ar: 'خزان سفلي وسط', en: 'Medium Ground Tank' },
    'svc.tank.groundLarge': { ar: 'خزان سفلي كبير', en: 'Large Ground Tank' },

    /* Department Page: Annual Contracts */
    'dept.contracts.heroTitle': { ar: 'العقود السنوية', en: 'Annual Contracts' },
    'dept.contracts.heroDesc': { ar: 'برامج وقائية وعلاجية مستمرة للمنشآت التجارية والمنازل.', en: 'Continuous preventive and remedial programs for commercial facilities and homes.' },
    'dept.contracts.aboutH2': { ar: 'راحة بالك لا تُقدّر بثمن!', en: 'Your Peace of Mind is Priceless!' },
    'dept.contracts.aboutP1': { ar: 'مع تغير الفصول في المملكة، تزداد نشاطات الحشرات والآفات... لا تنتظر حتى تظهر المشكلة!<br/>نوفر لك عقوداً سنوية لمكافحة الحشرات تضمن لك ولعائلتك بيئة آمنة وصحية طوال العام.', en: 'With changing seasons in the Kingdom, pests become more active... Don\'t wait for an infestation!<br/>We provide annual pest control contracts ensuring a safe and healthy environment all year long.' },
    'dept.contracts.coverH3': { ar: 'ماذا يغطي العقد السنوي؟', en: 'What Does the Annual Contract Cover?' },
    'dept.contracts.c1': { ar: '<strong>مكافحة كاملة:</strong> (الصراصير، النمل الأسود، القوارض، والحشرات الطائرة).', en: '<strong>Complete Extermination:</strong> (Cockroaches, black ants, rodents, and flying insects).' },
    'dept.contracts.c2': { ar: '<strong>استخدام مبيدات آمنة:</strong> مصرحة من الهيئة العامة للغذاء والدواء.', en: '<strong>Safe Pesticides:</strong> SFDA-certified and eco-friendly.' },
    'dept.contracts.c3': { ar: '<strong>جدول زيارات منتظم:</strong> زيارات كل (شهر / شهرين / 3 أشهر) حسب الاتفاق ونوع النشاط.', en: '<strong>Regular Visit Schedule:</strong> Periodic visits every (month / 2 months / 3 months) based on business type.' },
    'dept.contracts.c4': { ar: '<strong>دعم طارئ 24/7:</strong> تغطية أي ظهور مفاجئ للحشرات خلال فترة العقد بدون أي تكلفة إضافية.', en: '<strong>24/7 Emergency Support:</strong> Immediate response to any sudden infestation with zero extra fees.' },
    'dept.contracts.c5': { ar: '<strong>شهادات وتقارير:</strong> تقديم كافة التقارير اللازمة للبلديات والجهات المختصة للمنشآت التجارية.', en: '<strong>Official Reports:</strong> Providing all required documentation for municipalities and authorities.' },
    'dept.contracts.boxH': { ar: 'سنة كاملة من الأمان بدون قلق.', en: 'A full year of safety without worries.' },
    'dept.contracts.boxP': { ar: 'تواصل معنا الآن للحصول على الخصم الخاص بالعقود السنوية!', en: 'Contact us now to get special discounts on annual contracts!' },
    'pricing.contracts.title': { ar: 'خدمات العقود السنوية', en: 'Annual Contracts Services' },
    'pricing.contracts.cat': { ar: 'قسم العقود السنوية لمكافحة الحشرات', en: 'Annual Pest Control Contracts Department' },
    'pricing.contracts.catSub': { ar: 'عقود سنوية لضمان بيئة خالية من الحشرات', en: 'Annual contracts to ensure a pest-free environment' },

    /* Services: Annual Contracts */
    'svc.contracts.duplex': { ar: 'فيلا دوبلكس صغيره', en: 'Small Duplex Villa' },
    'svc.contracts.duplexTitle': { ar: 'فيلا دوبلكس صغيره', en: 'Small Duplex Villa' },
    'svc.contracts.duplexSub': { ar: '', en: '' },
    'svc.contracts.villaLarge': { ar: 'فيلا كبيرة', en: 'Large Villa' },
    'svc.contracts.villaLargeTitle': { ar: 'فيلا كبيرة', en: 'Large Villa' },
    'svc.contracts.villaLargeSub': { ar: '', en: '' },
    'svc.contracts.villaInspect': { ar: 'فيلا كبيرة - السعر بعد المعاينة', en: 'Large Villa - Price on Inspection' },
    'svc.contracts.rest': { ar: 'المطاعم - عقد سنوي', en: 'Restaurants - Annual Contract' },
    'svc.contracts.factory': { ar: 'المصانع والشركات - عقد سنوي', en: 'Factories & Companies - Annual Contract' },
    'svc.contracts.apts': { ar: 'الشقق والعمائر - عقد سنوي', en: 'Apartments & Buildings - Annual Contract' },
    'svc.contracts.villaInspectTitle': { ar: 'فيلا كبيرة', en: 'Large Villa' },
    'svc.contracts.restTitle': { ar: 'المطاعم', en: 'Restaurants' },
    'svc.contracts.factoryTitle': { ar: 'المصانع والشركات', en: 'Factories & Companies' },
    'svc.contracts.aptsTitle': { ar: 'الشقق والعمائر', en: 'Apartments & Buildings' },

    /* Service Hero Alt */
    'alt.serviceHero': { ar: 'أيقونة الخدمة', en: 'Service Icon' },
    'alt.serviceIllustration': { ar: 'صورة توضيحية للخدمة', en: 'Service Illustration' }
  };

  /* ---------- Current language ---------- */
  var current = localStorage.getItem(STORAGE_KEY) || 'ar';

  function t(key, lang) {
    var entry = dict[key];
    if (!entry) return null;
    if (typeof entry === 'object' && entry[lang] !== undefined) return entry[lang];
    return null;
  }

  function translatePage(lang) {
    /* Update page title if <title data-i18n="..."> exists */
    var titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      var tKey = titleEl.getAttribute('data-i18n');
      var tVal = t(tKey, lang);
      if (tVal) document.title = tVal;
    }

    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var key = el.getAttribute('data-i18n');
      var val = t(key, lang);
      if (val !== null && val !== undefined) {
        el.textContent = val;
      }
    }
    var phs = document.querySelectorAll('[data-i18n-ph]');
    for (var j = 0; j < phs.length; j++) {
      var p = phs[j];
      var pkey = p.getAttribute('data-i18n-ph');
      var pval = t(pkey, lang);
      if (pval !== null && pval !== undefined) {
        p.setAttribute('placeholder', pval);
      }
    }
    var htmls = document.querySelectorAll('[data-i18n-html]');
    for (var h = 0; h < htmls.length; h++) {
      var elHtml = htmls[h];
      var hkey = elHtml.getAttribute('data-i18n-html');
      var hval = t(hkey, lang);
      if (hval !== null && hval !== undefined) {
        elHtml.innerHTML = hval;
      }
    }
    var alts = document.querySelectorAll('[data-i18n-alt]');
    for (var k = 0; k < alts.length; k++) {
      var a = alts[k];
      var akey = a.getAttribute('data-i18n-alt');
      var aval = t(akey, lang);
      if (aval !== null && aval !== undefined) {
        a.setAttribute('alt', aval);
      }
    }
    var arias = document.querySelectorAll('[data-i18n-aria]');
    for (var ar = 0; ar < arias.length; ar++) {
      var arEl = arias[ar];
      var arkey = arEl.getAttribute('data-i18n-aria');
      var arval = t(arkey, lang);
      if (arval !== null && arval !== undefined) {
        arEl.setAttribute('aria-label', arval);
      }
    }
    /* toggle dual-language blocks (e.g. AR + EN paragraphs already in markup) */
    var onlyAr = document.querySelectorAll('.only-ar');
    for (var m = 0; m < onlyAr.length; m++) {
      onlyAr[m].style.display = (lang === 'ar') ? '' : 'none';
    }
    var onlyEn = document.querySelectorAll('.only-en');
    for (var n = 0; n < onlyEn.length; n++) {
      onlyEn[n].style.display = (lang === 'en') ? '' : 'none';
    }
  }

  function updateButton(lang) {
    var btns = document.querySelectorAll('.lang-switch-btn');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      var label = (lang === 'ar') ? t('nav.langAr', 'ar') : t('nav.langEn', 'en');
      b.textContent = label;
      b.setAttribute('data-lang', lang);
      b.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    }
  }

  function applyLang(lang) {
    current = lang;
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    if (lang === 'en') {
      html.classList.add('lang-en');
    } else {
      html.classList.remove('lang-en');
    }
    translatePage(lang);
    updateButton(lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    var evt = new CustomEvent('langchange', { detail: { lang: lang } });
    document.dispatchEvent(evt);
  }

  function setLang(lang) {
    if (lang !== 'ar' && lang !== 'en') lang = 'ar';
    applyLang(lang);
  }

  function init() {
    applyLang(current);
    var btns = document.querySelectorAll('.lang-switch-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var next = current === 'ar' ? 'en' : 'ar';
        applyLang(next);
      });
    }
  }

  /* expose */
  window.i18n = {
    setLang: setLang,
    getLang: function () { return current; },
    t: t
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
