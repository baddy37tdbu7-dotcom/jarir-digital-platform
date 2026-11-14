export type PeriodKey = "7d" | "30d" | "90d";

export interface Kpi {
  key: string;
  label: string;
  value: number;
  display: string;
  delta: number;
  hint: string;
}

export interface TimePoint {
  label: string;
  visits: number;
  users: number;
}

export interface SourceSlice {
  name: string;
  value: number;
  color: string;
}

export interface SocialRow {
  name: string;
  reach: number;
  engagement: number;
  clicks: number;
}

export interface ProductRow {
  productId: string;
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface CampaignRow {
  name: string;
  reach: number;
  engagement: number;
  clicks: number;
  conversions: number;
  roas: number;
}

export interface FunnelStage {
  stage: string;
  value: number;
}

export interface DeviceSlice {
  name: string;
  value: number;
  color: string;
}

export interface AnalyticsData {
  period: PeriodKey;
  periodLabel: string;
  kpis: Kpi[];
  series: TimePoint[];
  sources: SourceSlice[];
  social: SocialRow[];
  products: ProductRow[];
  campaigns: CampaignRow[];
  funnel: FunnelStage[];
  devices: DeviceSlice[];
  avgSession: string;
  engagementRate: number;
  conversionRate: number;
  insights: { title: string; text: string; action: string }[];
}

const colors = {
  red: "#E20714",
  ink: "#1C1B19",
  sand: "#C9B79C",
  grey: "#9A958D",
  soft: "#D9D3C7",
  olive: "#77755B",
};

const socialBase: SocialRow[] = [
  { name: "Instagram", reach: 420000, engagement: 5.8, clicks: 28400 },
  { name: "TikTok", reach: 310000, engagement: 7.2, clicks: 21600 },
  { name: "X", reach: 180000, engagement: 3.1, clicks: 9400 },
  { name: "YouTube", reach: 95000, engagement: 2.4, clicks: 4100 },
];

const productsBase: ProductRow[] = [
  {
    productId: "apple-iphone-17-pro-smartphones-666727",
    views: 24800,
    clicks: 5120,
    conversions: 412,
    revenue: 2265588,
  },
  {
    productId: "sony-playstation-5-slim-gaming-consoles-and-handheld-690746",
    views: 18400,
    clicks: 3980,
    conversions: 286,
    revenue: 829114,
  },
  {
    productId: "apple-ipad-air-11-m4-tablet-pc-678790",
    views: 15600,
    clicks: 3210,
    conversions: 198,
    revenue: 692802,
  },
  {
    productId: "arabic-books-439941",
    views: 14900,
    clicks: 4100,
    conversions: 512,
    revenue: 20480,
  },
  {
    productId: "hp-15-fd1010nx-laptops-678436",
    views: 12300,
    clicks: 2450,
    conversions: 142,
    revenue: 454258,
  },
  {
    productId: "roco-premium-papers-189729",
    views: 9800,
    clicks: 2100,
    conversions: 320,
    revenue: 6080,
  },
];

const campaignsBase: CampaignRow[] = [
  {
    name: "ارجع أقوى",
    reach: 480000,
    engagement: 7.9,
    clicks: 38000,
    conversions: 1240,
    roas: 4.8,
  },
  {
    name: "أسبوع التقنية",
    reach: 360000,
    engagement: 6.4,
    clicks: 29000,
    conversions: 980,
    roas: 3.9,
  },
  {
    name: "صفحة كل يوم",
    reach: 210000,
    engagement: 8.1,
    clicks: 16000,
    conversions: 610,
    roas: 2.7,
  },
  {
    name: "هدية تليق",
    reach: 290000,
    engagement: 5.6,
    clicks: 21000,
    conversions: 420,
    roas: 3.2,
  },
];

const insights = [
  {
    title: "Instagram يصنع الوعي، TikTok يصنع التفاعل",
    text: "Instagram يقود الوصول، بينما يسجل TikTok أعلى معدل تفاعل (7.2%) وأعلى نمو في مشاركة المحتوى القصير.",
    action: "تحويل 15% من ميزانية الوعي إلى محتوى TikTok التجريبي.",
  },
  {
    title: "الكتب تحوّل بكفاءة أعلى",
    text: "رواية «خوف 1» حققت أعلى معدل تحويل بين المنتجات (3.4%) رغم انخفاض سعرها، ما يعني أن المحتوى الداعم لها يعمل.",
    action: "توسيع رفّ الروايات العربية وإطلاق سلسلة مراجعات قصيرة.",
  },
  {
    title: "الهاتف هو نقطة القرار",
    text: "نحو ثلثي الزيارات تأتي من الهاتف، ومعظم التحويلات تبدأ من بطاقة المنتج في الشاشة الصغيرة.",
    action: "تحسين صور المنتج وأزرار الإجراء للهاتف أولًا.",
  },
  {
    title: "حملة العودة للمدارس تقود العائد",
    text: "«ارجع أقوى» سجلت أعلى عائد إعلاني (4.8x) وأكبر عدد تحويلات بين الحملات الأربع.",
    action: "تمديد الحملة أسبوعًا مع زيادة ميزانية المحتوى المدفوع.",
  },
];

const baseByPeriod: Record<
  PeriodKey,
  {
    label: string;
    visits: number;
    users: number;
    engagement: number;
    clicks: number;
    conversions: number;
    avgSession: string;
    deltaVisits: number;
    deltaUsers: number;
    deltaEngagement: number;
    deltaClicks: number;
    deltaConversions: number;
    series: TimePoint[];
    sourceValues: number[];
    devices: number[];
    funnel: number[];
    socialFactor: number;
    productFactor: number;
  }
> = {
  "7d": {
    label: "آخر 7 أيام",
    visits: 31280,
    users: 18450,
    engagement: 7.4,
    clicks: 8420,
    conversions: 1015,
    avgSession: "4:26",
    deltaVisits: 8.2,
    deltaUsers: 6.4,
    deltaEngagement: 0.6,
    deltaClicks: 9.1,
    deltaConversions: 5.8,
    series: [
      { label: "السبت", visits: 3980, users: 2310 },
      { label: "الأحد", visits: 4210, users: 2480 },
      { label: "الاثنين", visits: 4520, users: 2650 },
      { label: "الثلاثاء", visits: 4380, users: 2570 },
      { label: "الأربعاء", visits: 4690, users: 2740 },
      { label: "الخميس", visits: 4910, users: 2880 },
      { label: "الجمعة", visits: 4590, users: 2820 },
    ],
    sourceValues: [31, 24, 19, 10, 7, 5, 4],
    devices: [64, 30, 6],
    funnel: [31280, 18900, 5300, 3100, 1015],
    socialFactor: 0.24,
    productFactor: 0.25,
  },
  "30d": {
    label: "آخر 30 يومًا",
    visits: 128450,
    users: 74210,
    engagement: 6.8,
    clicks: 32180,
    conversions: 3940,
    avgSession: "4:12",
    deltaVisits: 12.4,
    deltaUsers: 9.8,
    deltaEngagement: 1.2,
    deltaClicks: 14.6,
    deltaConversions: 11.3,
    series: [
      { label: "15 أكتوبر", visits: 9800, users: 5600 },
      { label: "18 أكتوبر", visits: 11200, users: 6400 },
      { label: "21 أكتوبر", visits: 12600, users: 7200 },
      { label: "24 أكتوبر", visits: 11900, users: 6900 },
      { label: "27 أكتوبر", visits: 13400, users: 7700 },
      { label: "30 أكتوبر", visits: 14200, users: 8100 },
      { label: "2 نوفمبر", visits: 13100, users: 7600 },
      { label: "5 نوفمبر", visits: 14600, users: 8400 },
      { label: "8 نوفمبر", visits: 13900, users: 7900 },
      { label: "11 نوفمبر", visits: 13750, users: 7910 },
    ],
    sourceValues: [34, 22, 18, 9, 8, 5, 4],
    devices: [68, 26, 6],
    funnel: [128450, 76300, 21400, 12900, 3940],
    socialFactor: 1,
    productFactor: 1,
  },
  "90d": {
    label: "آخر 90 يومًا",
    visits: 356800,
    users: 198400,
    engagement: 6.2,
    clicks: 88240,
    conversions: 10380,
    avgSession: "4:03",
    deltaVisits: 18.7,
    deltaUsers: 15.2,
    deltaEngagement: 0.9,
    deltaClicks: 19.4,
    deltaConversions: 16.8,
    series: [
      { label: "الأسبوع 1", visits: 24800, users: 13900 },
      { label: "الأسبوع 2", visits: 26100, users: 14600 },
      { label: "الأسبوع 3", visits: 25700, users: 14300 },
      { label: "الأسبوع 4", visits: 27400, users: 15300 },
      { label: "الأسبوع 5", visits: 26900, users: 14900 },
      { label: "الأسبوع 6", visits: 28100, users: 15700 },
      { label: "الأسبوع 7", visits: 27600, users: 15400 },
      { label: "الأسبوع 8", visits: 28900, users: 16100 },
      { label: "الأسبوع 9", visits: 28300, users: 15800 },
      { label: "الأسبوع 10", visits: 29500, users: 16400 },
      { label: "الأسبوع 11", visits: 28800, users: 16000 },
      { label: "الأسبوع 12", visits: 30200, users: 16800 },
      { label: "الأسبوع 13", visits: 34500, users: 19200 },
    ],
    sourceValues: [36, 21, 17, 9, 8, 5, 4],
    devices: [70, 25, 5],
    funnel: [356800, 212400, 59800, 36200, 10380],
    socialFactor: 2.7,
    productFactor: 2.75,
  },
};

const round = (n: number) => Math.round(n);

export function getAnalytics(period: PeriodKey): AnalyticsData {
  const base = baseByPeriod[period];
  const kpis: Kpi[] = [
    {
      key: "visits",
      label: "إجمالي الزيارات",
      value: base.visits,
      display: base.visits.toLocaleString("en-US"),
      delta: base.deltaVisits,
      hint: "زيارات فريدة للمنصة",
    },
    {
      key: "users",
      label: "عدد المستخدمين",
      value: base.users,
      display: base.users.toLocaleString("en-US"),
      delta: base.deltaUsers,
      hint: "مستخدمون نشطون",
    },
    {
      key: "engagement",
      label: "معدل التفاعل",
      value: base.engagement,
      display: `${base.engagement}%`,
      delta: base.deltaEngagement,
      hint: "إعجاب · تعليق · حفظ · مشاركة",
    },
    {
      key: "clicks",
      label: "النقرات",
      value: base.clicks,
      display: base.clicks.toLocaleString("en-US"),
      delta: base.deltaClicks,
      hint: "نقرات على المنتجات والعروض",
    },
    {
      key: "conversions",
      label: "التحويلات",
      value: base.conversions,
      display: base.conversions.toLocaleString("en-US"),
      delta: base.deltaConversions,
      hint: "إتمام شراء أو طلب",
    },
  ];

  const sourceNames = [
    "البحث العضوي",
    "الزيارات المباشرة",
    "Instagram",
    "X",
    "TikTok",
    "YouTube",
    "البريد والتنبيهات",
  ];
  const sourceColors = [
    colors.red,
    colors.ink,
    "#B4315E",
    "#5E5A52",
    "#77755B",
    "#C9B79C",
    colors.soft,
  ];
  const sources = sourceNames.map((name, i) => ({
    name,
    value: base.sourceValues[i],
    color: sourceColors[i],
  }));

  const social = socialBase.map((row) => ({
    ...row,
    reach: round(row.reach * base.socialFactor),
    clicks: round(row.clicks * base.socialFactor),
  }));

  const products = productsBase.map((row) => ({
    ...row,
    views: round(row.views * base.productFactor),
    clicks: round(row.clicks * base.productFactor),
    conversions: round(row.conversions * base.productFactor),
    revenue: round(row.revenue * base.productFactor),
  }));

  const campaigns = campaignsBase.map((row) => ({
    ...row,
    reach: round(row.reach * base.productFactor),
    clicks: round(row.clicks * base.productFactor),
    conversions: round(row.conversions * base.productFactor),
  }));

  const devices = [
    { name: "الهاتف", value: base.devices[0], color: colors.red },
    { name: "الكمبيوتر", value: base.devices[1], color: colors.ink },
    { name: "التابلت", value: base.devices[2], color: colors.sand },
  ];

  const funnel = [
    { stage: "الزيارة", value: base.funnel[0] },
    { stage: "مشاهدة منتج", value: base.funnel[1] },
    { stage: "حفظ أو مفضلة", value: base.funnel[2] },
    { stage: "نقر على العرض", value: base.funnel[3] },
    { stage: "التحويل", value: base.funnel[4] },
  ];

  return {
    period,
    periodLabel: base.label,
    kpis,
    series: base.series,
    sources,
    social,
    products,
    campaigns,
    funnel,
    devices,
    avgSession: base.avgSession,
    engagementRate: base.engagement,
    conversionRate: Number(((base.conversions / base.visits) * 100).toFixed(2)),
    insights,
  };
}

export const metricDefinitions = [
  {
    metric: "عدد الزيارات",
    formula: "عدد الجلسات الفريدة على المنصة",
    use: "قياس حجم الوعي وجذب الجمهور للحملات.",
  },
  {
    metric: "مدة البقاء",
    formula: "متوسط زمن الجلسة",
    use: "معرفة جودة المحتوى وقدرته على إبقاء الزائر.",
  },
  {
    metric: "معدل النقر",
    formula: "النقرات ÷ مرات الظهور × 100",
    use: "تقييم جاذبية البطاقات والعروض والرسائل.",
  },
  {
    metric: "معدل التفاعل",
    formula: "التفاعلات ÷ الوصول × 100",
    use: "قياس ارتباط الجمهور بالمحتوى على المنصات.",
  },
  {
    metric: "معدل التحويل",
    formula: "التحويلات ÷ الزيارات × 100",
    use: "قياس كفاءة الرحلة من الاكتشاف إلى الشراء.",
  },
  {
    metric: "مصادر الزيارات",
    formula: "توزيع الجلسات حسب القناة",
    use: "تحديد القنوات التي تستحق الاستثمار.",
  },
];
