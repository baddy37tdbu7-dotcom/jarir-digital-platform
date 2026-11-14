export type CategoryId =
  | "mobiles"
  | "computers"
  | "electronics"
  | "books"
  | "office"
  | "school"
  | "gaming"
  | "accessories";

export type InterestId =
  | "tech"
  | "study"
  | "reading"
  | "office"
  | "accessories"
  | "gaming";

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  icon: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  rating?: number;
  reviews?: number;
  badge?: string;
  interests: InterestId[];
  officialUrl: string;
  sku: string;
  featured?: boolean;
  bestSellerRank?: number;
}

export const categories: Category[] = [
  {
    id: "books",
    name: "الكتب والقراءة",
    tagline: "حكايات تستحق الرف",
    icon: "book",
    image: "/media/products/arabic-books-439941.webp",
  },
  {
    id: "mobiles",
    name: "الجوالات",
    tagline: "أحدث الأجهزة بين يديك",
    icon: "smartphone",
    image: "/media/products/apple-iphone-17-pro-smartphones-666727.webp",
  },
  {
    id: "computers",
    name: "الكمبيوتر واللابتوب",
    tagline: "أداء يصنع الفرق",
    icon: "laptop",
    image: "/media/products/apple-ipad-air-11-m4-tablet-pc-678790.webp",
  },
  {
    id: "electronics",
    name: "الإلكترونيات والصوتيات",
    tagline: "تجربة تسمعها وتشعرها",
    icon: "headphones",
    image: "/media/products/haier-h6f-smart-tv-688118.webp",
  },
  {
    id: "office",
    name: "الأدوات المكتبية",
    tagline: "تفاصيل تصنع يومك",
    icon: "pen",
    image: "/media/products/faber-castell-tk-fine-9715-mechanical-pencils-98898.webp",
  },
  {
    id: "school",
    name: "المستلزمات المدرسية",
    tagline: "بداية عام بلا حدود",
    icon: "backpack",
    image: "/media/products/sanrio-cases-and-bags-673383.webp",
  },
  {
    id: "gaming",
    name: "الألعاب والترفيه",
    tagline: "وقت اللعب بمستوى آخر",
    icon: "gamepad",
    image: "/media/products/sony-playstation-5-slim-gaming-consoles-and-handheld-690746.webp",
  },
  {
    id: "accessories",
    name: "الإكسسوارات والملحقات",
    tagline: "لمسات تكمل التجربة",
    icon: "cable",
    image: "/media/products/royal-falcon-laptop-stands-667916.webp",
  },
];

export const categoryName = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.name ?? "";

export const products: Product[] = [
  {
    id: "apple-iphone-17-pro-smartphones-666727",
    name: "ابل آيفون 17 برو — 512 جيجابايت، برتقالي كوزمك",
    brand: "Apple",
    category: "mobiles",
    price: 5499,
    image: "/media/products/apple-iphone-17-pro-smartphones-666727.webp",
    description:
      "شاشة 6.3 بوصة، وكاميرا خلفية ثلاثية بدقة 48 ميجابكسل، ومساحة 512 جيجابايت لكل ما تصوّره وتحبّه.",
    specs: [
      { label: "الشاشة", value: "6.3 بوصة — سوبر ريتينا XDR" },
      { label: "المساحة", value: "512 جيجابايت" },
      { label: "الكاميرا", value: "خلفية ثلاثية 48 ميجابكسل" },
      { label: "الاتصال", value: "الجيل الخامس 5G" },
    ],
    badge: "وصل حديثًا",
    interests: ["tech", "study"],
    officialUrl:
      "https://www.jarir.com/apple-iphone-17-pro-smartphones-666727.html",
    sku: "666727",
    featured: true,
    bestSellerRank: 1,
  },
  {
    id: "samsung-galaxy-s26-ultra-smartphones-677548",
    name: "سامسونج جالكسي S26 الترا — 256 جيجابايت، أزرق سماوي",
    brand: "Samsung",
    category: "mobiles",
    price: 3999,
    image: "/media/products/samsung-galaxy-s26-ultra-smartphones-677548.webp",
    description:
      "شاشة 6.9 بوصة، بطارية 5000 مللي أمبير، وكاميرا 200 ميجابكسل — قوة تصوير في جيبك.",
    specs: [
      { label: "الشاشة", value: "6.9 بوصة — ديناميك أموليد X" },
      { label: "البطارية", value: "5000 مللي أمبير" },
      { label: "الذاكرة", value: "12 جيجابايت رام" },
      { label: "الكاميرا", value: "200 ميجابكسل" },
    ],
    badge: "اختيار التقنية",
    interests: ["tech"],
    officialUrl:
      "https://www.jarir.com/samsung-galaxy-s26-ultra-smartphones-677548.html",
    sku: "677548",
    featured: true,
  },
  {
    id: "apple-ipad-air-11-m4-tablet-pc-678790",
    name: "ابل آيباد آير 11 — شريحة M4، 128 جيجابايت، رمادي فضائي",
    brand: "Apple",
    category: "computers",
    price: 3499,
    image: "/media/products/apple-ipad-air-11-m4-tablet-pc-678790.webp",
    description:
      "شريحة M4 وشاشة 11 بوصة ووزن خفيف — رفيق الدراسة والرسم والعمل من أي مكان.",
    specs: [
      { label: "الشاشة", value: "11 بوصة — Liquid Retina" },
      { label: "المعالج", value: "شريحة M4" },
      { label: "المساحة", value: "128 جيجابايت" },
      { label: "النظام", value: "iPadOS 26" },
    ],
    badge: "وصل حديثًا",
    interests: ["study", "tech"],
    officialUrl:
      "https://www.jarir.com/apple-ipad-air-11-m4-tablet-pc-678790.html",
    sku: "678790",
    featured: true,
    bestSellerRank: 4,
  },
  {
    id: "asus-zenbook-laptops-690696",
    name: "اسوس زن بوك — 14 بوصة OLED، سناب دراغون X، 512 جيجابايت",
    brand: "ASUS",
    category: "computers",
    price: 3899,
    image: "/media/products/asus-zenbook-laptops-690696.webp",
    description:
      "شاشة OLED مقاس 14 بوصة وذاكرة 16 جيجابايت وتصميم نحيف — لتنقلاتك اليومية وأعمالك الإبداعية.",
    specs: [
      { label: "الشاشة", value: "14 بوصة WUXGA OLED" },
      { label: "المعالج", value: "سناب دراغون X1 26 100" },
      { label: "الذاكرة", value: "16 جيجابايت رام" },
      { label: "التخزين", value: "512 جيجابايت SSD" },
    ],
    interests: ["tech", "study"],
    officialUrl: "https://www.jarir.com/asus-zenbook-laptops-690696.html",
    sku: "690696",
    featured: true,
  },
  {
    id: "hp-15-fd1010nx-laptops-678436",
    name: "اتش بي لابتوب 15 — إنتل كور 7، 16 جيجابايت، 512 جيجابايت",
    brand: "HP",
    category: "computers",
    price: 3199,
    image: "/media/products/hp-15-fd1010nx-laptops-678436.webp",
    description:
      "معالج إنتل كور 7 وشاشة 15.6 بوصة وذاكرة 16 جيجابايت — إنتاجية عملية للعمل والدراسة كل يوم.",
    specs: [
      { label: "الشاشة", value: "15.6 بوصة FHD" },
      { label: "المعالج", value: "إنتل كور 7 150U" },
      { label: "الذاكرة", value: "16 جيجابايت رام" },
      { label: "التخزين", value: "512 جيجابايت SSD" },
    ],
    interests: ["study", "tech", "office"],
    officialUrl: "https://www.jarir.com/hp-15-fd1010nx-laptops-678436.html",
    sku: "678436",
    featured: true,
    bestSellerRank: 5,
  },
  {
    id: "haier-h6f-smart-tv-688118",
    name: "هاير S80 — تلفزيون ذكي 75 بوصة QLED",
    brand: "Haier",
    category: "electronics",
    price: 2999,
    image: "/media/products/haier-h6f-smart-tv-688118.webp",
    description:
      "شاشة 75 بوصة QLED بنظام Google TV — حوّل مجلسك إلى سينما عائلية.",
    specs: [
      { label: "الشاشة", value: "75 بوصة QLED" },
      { label: "النظام", value: "Google TV" },
      { label: "معدل التحديث", value: "60 هرتز" },
      { label: "الاتصال", value: "واي فاي / بلوتوث" },
    ],
    interests: ["tech", "gaming"],
    officialUrl: "https://www.jarir.com/haier-h6f-smart-tv-688118.html",
    sku: "688118",
  },
  {
    id: "ajs-speaker-678733",
    name: "آيه جيه اس ساوند بار — مع مضخم صوت بلوتوث، أسود",
    brand: "AJS",
    category: "electronics",
    price: 199,
    image: "/media/products/ajs-speaker-678733.webp",
    description:
      "صوت محيطي مع مضخم صوت منفصل عبر البلوتوث — تفاصيل صوتية أعمق لتجربة ترفيه أكمل.",
    specs: [
      { label: "النوع", value: "ساوند بار مع مضخم صوت" },
      { label: "الاتصال", value: "بلوتوث" },
      { label: "الاستخدام", value: "التلفزيون والموسيقى" },
    ],
    interests: ["tech", "gaming"],
    officialUrl: "https://www.jarir.com/ajs-speaker-678733.html",
    sku: "678733",
    bestSellerRank: 8,
  },
  {
    id: "apple-watch-series-11-46-smartwatch-666641",
    name: "ابل واتش سيريس 11 — 46 ملم، أسود نفاث",
    brand: "Apple",
    category: "electronics",
    price: 1799,
    image: "/media/products/apple-watch-series-11-46-smartwatch-666641.webp",
    description:
      "متابعة صحتك وإشعاراتك من معصمك، بهيكل ألومنيوم خفيف وشاشة ريتينا مضيئة.",
    specs: [
      { label: "الحجم", value: "46 ملم" },
      { label: "المعالج", value: "S10 SiP" },
      { label: "الشاشة", value: "ريتينا 2000 نيت" },
      { label: "الهيكل", value: "ألومنيوم" },
    ],
    badge: "هدية مثالية",
    interests: ["tech", "accessories"],
    officialUrl:
      "https://www.jarir.com/apple-watch-series-11-46-smartwatch-666641.html",
    sku: "666641",
  },
  {
    id: "huawei-watch-d3-smartwatch-692298",
    name: "هواوي واتش D3 — ساعة ذكية بشاشة AMOLED",
    brand: "Huawei",
    category: "electronics",
    price: 1599,
    image: "/media/products/huawei-watch-d3-smartwatch-692298.webp",
    description:
      "شاشة AMOLED مقاس 1.92 بوصة وقياسات صحية متقدمة — رفيقك الذكي طوال اليوم.",
    specs: [
      { label: "الشاشة", value: "1.92 بوصة AMOLED" },
      { label: "النظام", value: "HarmonyOS" },
      { label: "الهيكل", value: "سبيكة ألومنيوم" },
      { label: "التوافق", value: "Android / iOS" },
    ],
    interests: ["tech", "accessories"],
    officialUrl:
      "https://www.jarir.com/huawei-watch-d3-smartwatch-692298.html",
    sku: "692298",
  },
  {
    id: "royal-falcon-laptop-stands-667916",
    name: "رويال فالكون Xnomic — حامل لابتوب وتابلت ألومنيوم",
    brand: "Royal Falcon",
    category: "accessories",
    price: 79,
    image: "/media/products/royal-falcon-laptop-stands-667916.webp",
    description:
      "حامل ألومنيوم قابل للتعديل يرفع شاشتك إلى مستوى مريح ويمنح مكتبك مساحة أكثر ترتيبًا.",
    specs: [
      { label: "المادة", value: "ألومنيوم" },
      { label: "التوافق", value: "لابتوب / تابلت" },
      { label: "قابلية التعديل", value: "ارتفاع وزاوية" },
    ],
    interests: ["office", "study", "accessories"],
    officialUrl:
      "https://www.jarir.com/royal-falcon-xnomic-laptop-stands-667916.html",
    sku: "667916",
  },
  {
    id: "faber-castell-tk-fine-9715-mechanical-pencils-98898",
    name: "فابر كاستيل TK-Fine 9715 — قلم رصاص ميكانيكي",
    brand: "Faber-Castell",
    category: "office",
    price: 19,
    image:
      "/media/products/faber-castell-tk-fine-9715-mechanical-pencils-98898.webp",
    description:
      "قلم رصاص ميكانيكي بدقة ألمانية وسمك خط ثابت — للكتابة والرسم والمخططات.",
    specs: [
      { label: "النوع", value: "قلم رصاص ميكانيكي" },
      { label: "الاستخدام", value: "كتابة / رسم هندسي" },
      { label: "الجودة", value: "Faber-Castell" },
    ],
    rating: 5,
    reviews: 2,
    interests: ["office", "study"],
    officialUrl:
      "https://www.jarir.com/faber-castell-tk-fine-9715-mechanical-pencils-98898.html",
    sku: "98898",
  },
  {
    id: "roco-premium-papers-189729",
    name: "روكو بريميوم — ورق تصوير A4 أبيض",
    brand: "Roco",
    category: "office",
    price: 19,
    image: "/media/products/roco-premium-papers-189729.webp",
    description:
      "ورق A4 أبيض عالي الجودة للطباعة والكتابة اليومية، بملمس ناعم ونتيجة واضحة.",
    specs: [
      { label: "المقاس", value: "A4" },
      { label: "النوع", value: "ورق تصوير" },
      { label: "اللون", value: "أبيض" },
    ],
    rating: 4.9,
    reviews: 20,
    badge: "الأعلى تقييمًا",
    interests: ["office", "study"],
    officialUrl: "https://www.jarir.com/roco-premium-papers-189729.html",
    sku: "189729",
    bestSellerRank: 6,
  },
  {
    id: "sanrio-cases-and-bags-673383",
    name: "سانريو سينامورول — حقيبة ظهر 4 في 1 مع ملحقات",
    brand: "Sanrio",
    category: "school",
    price: 169,
    image: "/media/products/sanrio-cases-and-bags-673383.webp",
    description:
      "حقيبة ظهر عملية بتصميم Cinnamoroll وملحقاتها — تنظم يومك الدراسي بروح مبهجة.",
    specs: [
      { label: "النوع", value: "حقيبة ظهر 4 في 1" },
      { label: "المادة", value: "بوليستر 600D" },
      { label: "الاستخدام", value: "المدرسة والتنقل" },
    ],
    interests: ["study", "accessories"],
    officialUrl: "https://www.jarir.com/sanrio-cases-and-bags-673383.html",
    sku: "673383",
  },
  {
    id: "bloci-building-sets-618150",
    name: "Bloci — طاولة وكرسي من مكعبات التركيب",
    brand: "Bloci",
    category: "school",
    price: 169,
    image: "/media/products/bloci-building-sets-618150.webp",
    description:
      "مجموعة مكعبات تركيب تصنع طاولة وكرسيًا — لعب يبني المهارة والخيال معًا.",
    specs: [
      { label: "النوع", value: "مجموعة مكعبات تركيب" },
      { label: "المادة", value: "بلاستيك" },
      { label: "الفئة العمرية", value: "الأطفال" },
    ],
    rating: 5,
    reviews: 2,
    interests: ["study", "gaming"],
    officialUrl: "https://www.jarir.com/bloci-building-sets-618150.html",
    sku: "618150",
  },
  {
    id: "royal-falcon-classic-game-board-games-499995",
    name: "رويال فالكون — لعبة استراتيجية بعشرة أحجار",
    brand: "Royal Falcon",
    category: "gaming",
    price: 10,
    image:
      "/media/products/royal-falcon-classic-game-board-games-499995.webp",
    description:
      "لعبة استراتيجية سريعة بعشرة أحجار — تجمع العائلة على طاولة واحدة في دقائق.",
    specs: [
      { label: "النوع", value: "لعبة استراتيجية" },
      { label: "المادة", value: "رخام" },
      { label: "عدد اللاعبين", value: "لاعبان" },
    ],
    rating: 3.3,
    reviews: 3,
    interests: ["gaming"],
    officialUrl:
      "https://www.jarir.com/royal-falcon-classic-game-board-games-499995.html",
    sku: "499995",
  },
  {
    id: "sony-playstation-5-slim-gaming-consoles-and-handheld-690746",
    name: "سوني بلايستيشن 5 سليم — 1 تيرابايت مع لعبة Wolverine",
    brand: "Sony",
    category: "gaming",
    price: 2899,
    image:
      "/media/products/sony-playstation-5-slim-gaming-consoles-and-handheld-690746.webp",
    description:
      "جهاز PlayStation 5 Slim بسعة 1 تيرابايت مع لعبة Marvel's Wolverine — دخول كامل إلى عالم الألعاب.",
    specs: [
      { label: "السعة", value: "1 تيرابايت" },
      { label: "الإصدار", value: "Slim" },
      { label: "اللعبة المرفقة", value: "Marvel's Wolverine" },
      { label: "الاتصال", value: "واي فاي / بلوتوث" },
    ],
    badge: "باقة ترفيه",
    interests: ["gaming", "tech"],
    officialUrl:
      "https://www.jarir.com/sony-playstation-5-slim-gaming-consoles-and-handheld-690746.html",
    sku: "690746",
    featured: true,
    bestSellerRank: 3,
  },
  {
    id: "arabic-books-439941",
    name: "خوف 1 — رواية عربية",
    brand: "مركز الأدب العربي",
    category: "books",
    price: 40,
    image: "/media/products/arabic-books-439941.webp",
    description:
      "رواية من أدب الرعب العربي تقودك إلى تفاصيل لا تُنسى، وأول أجزاء سلسلة التهمها القرّاء.",
    specs: [
      { label: "التصنيف", value: "رواية عربية" },
      { label: "اللغة", value: "العربية" },
      { label: "الناشر", value: "مركز الأدب العربي" },
    ],
    rating: 4.6,
    reviews: 141,
    badge: "الأكثر تقييمًا",
    interests: ["reading", "study"],
    officialUrl: "https://www.jarir.com/arabic-books-439941.html",
    sku: "439941",
    featured: true,
    bestSellerRank: 2,
  },
  {
    id: "arabic-books-643393",
    name: "الداء والدواء — ابن القيم",
    brand: "مصنع الفسطاط",
    category: "books",
    price: 25,
    image: "/media/products/arabic-books-643393.webp",
    description:
      "من أعمال ابن القيم في الفكر والتهذيب — كتاب خالد ما زال يجد مكانه على رفوف القرّاء.",
    specs: [
      { label: "المؤلف", value: "ابن القيم" },
      { label: "التصنيف", value: "كتب عربية" },
      { label: "اللغة", value: "العربية" },
    ],
    rating: 5,
    reviews: 8,
    interests: ["reading"],
    officialUrl: "https://www.jarir.com/arabic-books-643393.html",
    sku: "643393",
  },
  {
    id: "arabic-books-688126",
    name: "المعاصر 11 — تأسيس كمي، عماد الجزيري",
    brand: "مكتبة الشرق",
    category: "books",
    price: 120,
    image: "/media/products/arabic-books-688126.webp",
    description:
      "مرجع تدريبي في التأسيس الكمي لطلاب المرحلة الثانوية، بإشراف عماد الجزيري.",
    specs: [
      { label: "المؤلف", value: "عماد الجزيري" },
      { label: "التصنيف", value: "كتب المرحلة الثانوية" },
      { label: "اللغة", value: "العربية" },
    ],
    rating: 4.7,
    reviews: 16,
    interests: ["study", "reading"],
    officialUrl: "https://www.jarir.com/arabic-books-688126.html",
    sku: "688126",
    bestSellerRank: 7,
  },
  {
    id: "dover-publications-english-books-579857",
    name: "Fabulous Fashions of the 1950s — كتاب تلوين",
    brand: "Dover Publications",
    category: "books",
    price: 35,
    image: "/media/products/dover-publications-english-books-579857.webp",
    description:
      "كتاب تلوين أنيق يستعيد أزياء الخمسينيات — للمصممين الصغار ومحبي التفاصيل الكلاسيكية.",
    specs: [
      { label: "التصنيف", value: "كتاب إنجليزي" },
      { label: "المؤلف", value: "Ming-Ju Sun" },
      { label: "الناشر", value: "Dover Publications" },
    ],
    rating: 5,
    reviews: 1,
    interests: ["reading", "office"],
    officialUrl:
      "https://www.jarir.com/dover-publications-english-books-579857.html",
    sku: "579857",
  },
];

export const productById = (id: string) =>
  products.find((p) => p.id === id);

export const relatedProducts = (product: Product, limit = 4) =>
  products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.interests.some((i) => product.interests.includes(i))),
    )
    .slice(0, limit);

export const bestSellers = [...products]
  .filter((p) => p.bestSellerRank)
  .sort((a, b) => (a.bestSellerRank ?? 99) - (b.bestSellerRank ?? 99));

export const interestLabels: Record<InterestId, string> = {
  tech: "تقنية",
  study: "دراسة",
  reading: "قراءة",
  office: "مكتب",
  accessories: "إكسسوارات",
  gaming: "ألعاب",
};

export const interestDescriptions: Record<InterestId, string> = {
  tech: "أحدث الأجهزة والابتكارات",
  study: "أدوات تنجز بها أكثر",
  reading: "كتب تفتح لك عوالم",
  office: "تفاصيل ترتب يومك",
  accessories: "لمسات تكمل جهازك",
  gaming: "ترفيه بمستوى آخر",
};
