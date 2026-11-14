export interface SocialPlatform {
  id: "instagram" | "x" | "tiktok" | "youtube";
  name: string;
  handle: string;
  url: string;
  role: string;
  description: string;
  formats: string[];
  ideas: string[];
  kpi: string;
  color: string;
}

export const socialPlatforms: SocialPlatform[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@jarirbookstore",
    url: "https://www.instagram.com/jarirbookstore/",
    role: "المحتوى البصري والعروض",
    description:
      "واجهة جرير الجمالية: رفوف الكتب، الأجهزة الجديدة، العروض الأسبوعية، وقصص من داخل المعارض.",
    formats: ["Reels", "Carousels", "Stories", "Collabs"],
    ideas: [
      "كاروسيل: 5 كتب تغيّر طريقة تفكيرك",
      "ريلز: جولة في ركن التقنية الجديد",
      "ستوري تفاعلي: أيهما تختار؟",
    ],
    kpi: "الوصول والتفاعل البصري",
    color: "#B4315E",
  },
  {
    id: "x",
    name: "X",
    handle: "@jarirbookstore",
    url: "https://twitter.com/jarirbookstore",
    role: "التحديثات والحملات والتواصل",
    description:
      "قناة مباشرة للأسئلة، إعلانات العروض، التغطيات اللحظية، والرد على استفسارات العملاء.",
    formats: ["Posts", "Threads", "Spaces", "Polls"],
    ideas: [
      "ثريد: أبرز إصدارات الشهر",
      "استطلاع: كتاب الأسبوع القادم",
      "تغطية مباشرة لإطلاق جهاز جديد",
    ],
    kpi: "المشاركة وخدمة العملاء",
    color: "#1A1A1A",
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@jarirbookstore",
    url: "https://www.tiktok.com/@jarirbookstore",
    role: "المحتوى القصير والتفاعلي",
    description:
      "فيديوهات سريعة تواكب الترند: تحديات القراءة، تجارب الأجهزة، ونصائح العودة للمدارس.",
    formats: ["Short video", "Trends", "Live", "Hashtag challenge"],
    ideas: [
      "تحدي: رتّب مكتبك في 30 ثانية",
      "تجربة: هل يصلح هذا اللابتوب للجامعة؟",
      "POV: أول يوم دراسة مع جرير",
    ],
    kpi: "الوصول ومشاركة الشباب",
    color: "#111111",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "jarirtube",
    url: "https://www.youtube.com/user/jarirtube",
    role: "المراجعات والمحتوى المرئي",
    description:
      "محتوى أطول وأعمق: مراجعات الأجهزة، مقابلات المؤلفين، جولات في المعارض، ودروس إبداعية.",
    formats: ["Reviews", "Vlogs", "Shorts", "Live"],
    ideas: [
      "مراجعة كاملة: لابتوبات الجامعة 2026",
      "جولة داخل أكبر معرض جرير",
      "لقاء مع كاتب حول روايته الجديدة",
    ],
    kpi: "الثقة وعمق المحتوى",
    color: "#C4302B",
  },
];

export const otherSocialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/jarirbookstore" },
  {
    name: "Snapchat",
    url: "https://www.snapchat.com/add/jarirbookstore",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/jarir-bookstore",
  },
];

export interface PostIdea {
  id: string;
  platform: string;
  format: string;
  title: string;
  caption: string;
  goal: string;
  audience: string;
}

export const postIdeas: PostIdea[] = [
  {
    id: "p1",
    platform: "Instagram",
    format: "Carousel",
    title: "خمسة كتب لا تفوتها هذا الشهر",
    caption:
      "اخترنا لك خمسة عناوين من رفوف جرير — من الرواية إلى التطوير الذاتي. أي واحد يبدأ قائمتك؟",
    goal: "زيادة الحفظ والمشاركة",
    audience: "محبو القراءة",
  },
  {
    id: "p2",
    platform: "TikTok",
    format: "Reel",
    title: "شنطة الجامعة في 60 ثانية",
    caption:
      "لابتوب، دفتر، قلم، وحقيبة… كل شيء تحتاجه لأول يوم جامعي. احفظ الفيديو قبل ما تنسى شيئًا.",
    goal: "الوصول عبر المشاركة",
    audience: "طلاب الجامعات",
  },
  {
    id: "p3",
    platform: "X",
    format: "Poll",
    title: "كتاب الأسبوع القادم؟",
    caption:
      "صوّت لاختيار الكتاب الذي نفتح به نادي القراءة الأسبوع القادم في معرض جرير.",
    goal: "تفاعل المجتمع",
    audience: "القرّاء",
  },
  {
    id: "p4",
    platform: "YouTube",
    format: "Review",
    title: "لابتوبات الدراسة: مقارنة عملية",
    caption:
      "ثلاثة لابتوبات من جرير، وثلاثة استخدامات مختلفة. شاهد المقارنة قبل أن تقرر.",
    goal: "بناء الثقة ودعم القرار",
    audience: "طلاب ومهنيون",
  },
  {
    id: "p5",
    platform: "Instagram",
    format: "Story",
    title: "أيهما تختار؟",
    caption:
      "جهاز لوحي للرسم أم لابتوب خفيف؟ شاركنا اختيارك وسنساعدك في الخطوة التالية.",
    goal: "التفاعل وجمع الاهتمامات",
    audience: "محبو التقنية",
  },
  {
    id: "p6",
    platform: "TikTok",
    format: "Challenge",
    title: "رتّب مكتبك في 30 ثانية",
    caption:
      "أرنا ركنك المفضل بعد ترتيبه بأدوات جرير، وشاركنا بالهاشتاق. أفضل ركن يحصل على بطاقة هدايا.",
    goal: "محتوى ينشئه المستخدمون",
    audience: "الشباب والطلاب",
  },
  {
    id: "p7",
    platform: "X",
    format: "Thread",
    title: "أبرز إصدارات الشهر",
    caption:
      "من الروايات إلى كتب الأعمال — هكذا تستطيع أن تبدأ قراءة الشهر باختيار واحد فقط.",
    goal: "قيادة الحديث حول الكتب",
    audience: "جمهور عام",
  },
  {
    id: "p8",
    platform: "YouTube",
    format: "Shorts",
    title: "هدية تحت 100 ريال",
    caption:
      "ثلاث أفكار هدايا أنيقة بميزانية بسيطة، مع تغليف جرير. احفظ الفكرة للمناسبة القادمة.",
    goal: "دعم التحويل",
    audience: "المهدون",
  },
];

export interface SeasonalIdea {
  id: string;
  season: string;
  name: string;
  idea: string;
  cta: string;
  channels: string;
}

export const seasonalIdeas: SeasonalIdea[] = [
  {
    id: "s1",
    season: "أغسطس — سبتمبر",
    name: "العودة للمدارس",
    idea: "قائمة العودة الذكية + حزم مستلزمات حسب المرحلة الدراسية، مع تحدٍّ يومي لتنظيم الحقيبة.",
    cta: "جهّز قائمتك",
    channels: "Instagram · TikTok · Snapchat",
  },
  {
    id: "s2",
    season: "رمضان",
    name: "رفّ رمضان",
    idea: "رفّ قراءة روحاني + جلسات تدبر + سلسلة يومية «آية وكتاب» بمشاركة القرّاء.",
    cta: "اكتشف الرفّ",
    channels: "Instagram · X · YouTube",
  },
  {
    id: "s3",
    season: "العيد",
    name: "هدية تليق",
    idea: "منتقي هدايا حسب الشخصية والميزانية، مع تغليف جرير وبطاقة إهداء قابلة للتخصيص.",
    cta: "اعثر على الهدية",
    channels: "Instagram · Snapchat · TikTok",
  },
  {
    id: "s4",
    season: "نهاية العام",
    name: "حصاد السنة",
    idea: "ملخص «أكثر ما قرأتموه وأكثر ما جرّبتموه» بمشاركة بيانات المجتمع، وقوائم أفضل الكتب والأجهزة.",
    cta: "شاهد الحصاد",
    channels: "X · Instagram · YouTube",
  },
];

export interface AudienceContent {
  id: string;
  audience: string;
  headline: string;
  description: string;
  formats: string[];
  example: string;
}

export const audienceContent: AudienceContent[] = [
  {
    id: "youth",
    audience: "للشباب والطلاب",
    headline: "كل شيء للعام الجديد",
    description:
      "محتوى عملي وسريع عن تنظيم الدراسة، اختيار اللابتوب المناسب، وحزم المستلزمات حسب التخصص.",
    formats: ["Reels", "Carousels", "Challenges"],
    example: "«أول أسبوع جامعي: 7 أشياء لا تنساها»",
  },
  {
    id: "tech",
    audience: "لمحبي التقنية",
    headline: "جرّب قبل أن تقرر",
    description:
      "مقارنات عملية، تجارب مباشرة، ومراجعات صادقة تسهّل على الجمهور اختيار الجهاز المناسب.",
    formats: ["YouTube", "Reviews", "Lives"],
    example: "«آيفون أم جالكسي؟ مقارنة من استخدامنا الفعلي»",
  },
  {
    id: "readers",
    audience: "لمحبي القراءة",
    headline: "صفحة تفتح عالمًا",
    description:
      "اقتباسات، توصيات من القرّاء، نادي قراءة، ولقاءات مع مؤلفين داخل معارض جرير.",
    formats: ["Quotes", "Threads", "Club"],
    example: "«كتاب في دقيقة: خمس روايات لا تنساها»",
  },
  {
    id: "family",
    audience: "للعائلة",
    headline: "وقت يجمعكم",
    description:
      "أفكار أنشطة منزلية، ألعاب تعليمية، ومحتوى يخص مستلزمات المدرسة والعائلة.",
    formats: ["Stories", "Carousels", "Videos"],
    example: "«سهرة بلا شاشات: 3 ألعاب تجمع العائلة»",
  },
];

export const contentPillars = [
  {
    title: "عرّف",
    subtitle: "محتويات تعليمية",
    text: "أدلة شراء ومقارنات تساعد الجمهور على اتخاذ قرار واثق.",
    icon: "book",
  },
  {
    title: "ألهم",
    subtitle: "قصص وأفكار",
    text: "قصص قرّاء، جولات في المعارض، وأفكار تجعل المنتج جزءًا من أسلوب حياة.",
    icon: "sparkles",
  },
  {
    title: "شارك",
    subtitle: "محتوى تفاعلي",
    text: "استطلاعات، تحديات، ومسابقات تحوّل الجمهور من متلقٍّ إلى مشارك.",
    icon: "users",
  },
];
