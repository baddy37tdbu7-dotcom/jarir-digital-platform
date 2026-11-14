export interface Campaign {
  id: string;
  name: string;
  kicker: string;
  idea: string;
  message: string;
  audience: string;
  cta: string;
  ctaHref: string;
  image: string;
  channels: string[];
  season: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
}

export const campaigns: Campaign[] = [
  {
    id: "back-stronger",
    name: "ارجع أقوى",
    kicker: "حملة العودة إلى المدارس والجامعات",
    idea: "«قائمة العودة الذكية»: يختار الطالب مرحلته واهتمامه، فتبني له المنصة حزمة مستلزمات كاملة — من الحقيبة والدفاتر إلى اللابتوب والكتاب — مع إمكانية حفظها ومشاركتها مع الأهل.",
    message: "العام الجديد يبدأ بقرار: أن تكون جاهزًا.",
    audience: "طلاب الثانوية والجامعات وأولياء الأمور في السعودية والخليج",
    cta: "جهّز قائمتك الآن",
    ctaHref: "/interactive",
    image: "/media/campaigns/school.webp",
    channels: ["Instagram", "TikTok", "Snapchat", "X"],
    season: "أغسطس — سبتمبر",
    deliverables: [
      "سلسلة Reels: «شنطة الجامعة في 60 ثانية»",
      "قوالب Stories لقوائم العودة حسب التخصص",
      "بث مباشر مع خبير تنظيم الدراسة",
      "دعوة لمشاركة صور «ركني الجديد»",
    ],
    metrics: [
      { label: "الجمهور", value: "طلاب وأهالٍ" },
      { label: "النبرة", value: "متفائلة وعملية" },
      { label: "المدة", value: "4 أسابيع" },
    ],
  },
  {
    id: "tech-week",
    name: "أسبوع التقنية",
    kicker: "حملة اكتشاف الأجهزة الجديدة",
    idea: "«7 أيام، 7 تجارب»: كل يوم مخصص لفئة تقنية مختلفة (جوالات، لابتوبات، صوتيات، ساعات ذكية، شاشات، ألعاب، إكسسوارات) مع تجربة مباشرة في المعارض ومحتوى مراجعة قصير على المنصات.",
    message: "لا تشترِ التقنية قبل أن تجرّبها.",
    audience: "محبو التقنية والمهنيون وصنّاع المحتوى",
    cta: "اكتشف تجربة اليوم",
    ctaHref: "/offers",
    image: "/media/campaigns/tech.webp",
    channels: ["YouTube", "Instagram", "X", "TikTok"],
    season: "على مدار العام — نسخة ربع سنوية",
    deliverables: [
      "مراجعات فيديو قصيرة بمشاركة مختصين",
      "جدول «تجربة اليوم» في المعارض",
      "مسابقة أفضل لقطة تقنية",
      "بث مباشر لأسئلة الجمهور عن الأجهزة",
    ],
    metrics: [
      { label: "الجمهور", value: "محبو التقنية" },
      { label: "النبرة", value: "واثقة واستكشافية" },
      { label: "المدة", value: "أسبوع" },
    ],
  },
  {
    id: "page-a-day",
    name: "صفحة كل يوم",
    kicker: "حملة القراءة والمجتمع",
    idea: "تحدي قراءة 20 دقيقة يوميًا لمدة 21 يومًا. يشارك المستخدم عنوان كتابه الحالي، ويحصل على شارات رقمية وتوصيات من القرّاء، مع جلسات قراءة أسبوعية في المعارض.",
    message: "20 دقيقة تفصلك عن عالم آخر.",
    audience: "محبو القراءة والطلاب والكتّاب الصاعدون",
    cta: "انضم للتحدي",
    ctaHref: "/community",
    image: "/media/campaigns/reading.webp",
    channels: ["Instagram", "X", "TikTok", "YouTube"],
    season: "طوال العام — ذروة في اليوم العالمي للكتاب",
    deliverables: [
      "تحدٍّ أسبوعي بهاشتاق موحد",
      "بطاقات اقتباسات قابلة للمشاركة",
      "جلسات قراءة في المعارض",
      "فيديو «كتاب في دقيقة» لرفوف مختارة",
    ],
    metrics: [
      { label: "الجمهور", value: "القرّاء" },
      { label: "النبرة", value: "دافئة وملهمة" },
      { label: "المدة", value: "21 يومًا" },
    ],
  },
  {
    id: "gift-that-matters",
    name: "هدية تليق",
    kicker: "حملة الهدايا والمناسبات",
    idea: "«Gift Finder» يحدد شخصية الشخص المُهدى إليه وميزانيته، ويقترح هدية مناسبة من الكتب والتقنية والإكسسوارات، مع خدمة تغليف الهدايا المتاحة في جرير.",
    message: "لا تهدِ شيئًا… اهدِ إحساسًا.",
    audience: "المهدون في المناسبات والأعياد والتخرّج",
    cta: "اعثر على الهدية",
    ctaHref: "/recommendations",
    image: "/media/campaigns/gifts.webp",
    channels: ["Instagram", "Snapchat", "TikTok", "X"],
    season: "رمضان والعيد — موسم التخرج — نهاية العام",
    deliverables: [
      "اختبار شخصية قصير لاختيار الهدية",
      "أفكار هدايا تحت 100 / 300 / 500 ريال",
      "فيديوهات تغليف إبداعي",
      "بطاقة هدايا رقمية قابلة للتخصيص",
    ],
    metrics: [
      { label: "الجمهور", value: "المهدون" },
      { label: "النبرة", value: "احتفالية وراقية" },
      { label: "المدة", value: "3 أسابيع" },
    ],
  },
];

export const campaignById = (id: string) =>
  campaigns.find((c) => c.id === id);
