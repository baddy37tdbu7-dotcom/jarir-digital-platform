export interface CommunityPost {
  id: string;
  author: string;
  initials: string;
  badge?: string;
  time: string;
  text: string;
  productId?: string;
  likes: number;
  comments: { author: string; text: string }[];
  topic: string;
}

export const communityPosts: CommunityPost[] = [
  {
    id: "post-1",
    author: "نورة",
    initials: "ن",
    badge: "قارئة",
    time: "قبل ساعتين",
    text: "بدأت تحدي «صفحة كل يوم» مع كتاب خوف 1… ما توقعت أنني سأقرأ 40 صفحة في جلسة واحدة! من معي في التحدي؟",
    productId: "arabic-books-439941",
    likes: 128,
    comments: [
      { author: "ريم", text: "أنا معك! بدأت أمس وما قدرت أتركه." },
      { author: "عبدالله", text: "أفضل قرار هذا الشهر." },
    ],
    topic: "قراءة",
  },
  {
    id: "post-2",
    author: "فيصل",
    initials: "ف",
    badge: "محب تقنية",
    time: "قبل 5 ساعات",
    text: "جرّبت آيفون 17 برو في معرض جرير قبل الشراء، والكاميرا فعلًا فرق كبير. نصيحتي: جرّب الجهاز بنفسك قبل ما تقرر.",
    productId: "apple-iphone-17-pro-smartphones-666727",
    likes: 214,
    comments: [
      { author: "سامي", text: "هل البطارية تكفي يوم كامل؟" },
      { author: "فيصل", text: "مع استخدامي المتوسط، نعم بسهولة." },
    ],
    topic: "تقنية",
  },
  {
    id: "post-3",
    author: "هيا",
    initials: "ه",
    badge: "طالبة",
    time: "قبل يوم",
    text: "جهزت شنطة الجامعة من قائمة العودة: لابتوب HP + حامل Xnomic + دفتر. المكتب صار مرتب وأخف على الظهر!",
    productId: "hp-15-fd1010nx-laptops-678436",
    likes: 96,
    comments: [
      { author: "لمى", text: "فكرة الحامل ممتازة، أطلبه اليوم." },
    ],
    topic: "دراسة",
  },
  {
    id: "post-4",
    author: "خالد",
    initials: "خ",
    badge: "لاعب",
    time: "قبل يومين",
    text: "باقة PS5 سليم مع Wolverine كانت اختيار العائلة هذا الشهر. التجمّع حول التلفزيون عاد من جديد.",
    productId:
      "sony-playstation-5-slim-gaming-consoles-and-handheld-690746",
    likes: 173,
    comments: [
      { author: "ماجد", text: "اللعبة تستحق؟" },
      { author: "خالد", text: "القصة ممتازة، خصوصًا للكبار." },
    ],
    topic: "ألعاب",
  },
  {
    id: "post-5",
    author: "دانة",
    initials: "د",
    badge: "مصممة",
    time: "قبل 3 أيام",
    text: "شاركت في مسابقة «رتّب مكتبك» بأدوات من جرير. الفكرة بسيطة: اختيار أداة واحدة تغيّر إحساس المكان.",
    likes: 84,
    comments: [
      { author: "شهد", text: "أحب فكرة الأداة الواحدة!" },
    ],
    topic: "مكتب",
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  context: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "أول مرة ألاقي كل شيء أحتاجه للدراسة والتقنية في تجربة واحدة… والبحث في الموقع يوصّلني بسرعة.",
    name: "سارة",
    context: "طالبة جامعية — الرياض",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "قسم القراءة في المنصة يذكّرني بمكتبة حقيقية: توصيات مرتبة، اقتباسات، وهدوء يخلّيك تقرأ أكثر.",
    name: "عبدالرحمن",
    context: "قارئ — جدة",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "فكرة «جرّب قبل الشراء» هي أكثر شيء أحتاجه قبل شراء جهاز تقني. تجربة واثقة وواضحة.",
    name: "منال",
    context: "مهندسة — الدمام",
    rating: 4,
  },
];

export const pollOptions = [
  { id: "books", label: "كتاب جديد يفتح عالمًا", votes: 412 },
  { id: "tech", label: "جهاز تقني أحدث", votes: 328 },
  { id: "office", label: "أدوات مكتبية أنيقة", votes: 146 },
  { id: "gaming", label: "عرض على الألعاب", votes: 214 },
];

export const communityQuestions = [
  "كيف أختار لابتوب مناسب للجامعة؟",
  "هل تتوفر خدمة التقسيط على الأجهزة؟",
  "ما أفضل كتاب أبدأ به في القراءة؟",
  "هل يمكن تغليف الهدية قبل الاستلام؟",
];
