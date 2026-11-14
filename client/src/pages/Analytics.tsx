import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Lightbulb,
  MousePointerClick,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getAnalytics,
  metricDefinitions,
  type PeriodKey,
} from "@/data/analytics";
import { productById } from "@/data/products";
import {
  Notice,
  PageHero,
  Reveal,
  SectionHeading,
  StatBlock,
  Tag,
} from "@/components/common/Primitives";
import { formatCompact, formatNumber, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

const periods: { key: PeriodKey; label: string }[] = [
  { key: "7d", label: "7 أيام" },
  { key: "30d", label: "30 يومًا" },
  { key: "90d", label: "90 يومًا" },
];

const kpiIcons: Record<string, typeof Users> = {
  visits: TrendingUp,
  users: Users,
  engagement: MousePointerClick,
  clicks: MousePointerClick,
  conversions: ArrowUpRight,
};

export default function Analytics() {
  const [period, setPeriod] = useState<PeriodKey>("30d");
  const data = useMemo(() => getAnalytics(period), [period]);
  const [applied, setApplied] = useState<string[]>([]);

  const apply = (title: string) => {
    setApplied((current) => [...current, title]);
    toast.success("أُضيف إلى خطة التحسين", { description: title });
  };

  const maxFunnel = data.funnel[0]?.value ?? 1;

  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="قياس الأداء"
        title="ما لا يُقاس… لا يُحسَّن."
        description="من الزيارة إلى التحويل: مؤشرات واضحة، مصادر زيارات، أداء المحتوى والحملات — وقراءة عملية لما تعنيه الأرقام."
        aside={
          <div className="border border-white/15 bg-white/[0.04] p-6">
            <span className="eyebrow text-champagne">الفترة</span>
            <div className="mt-3 flex gap-1">
              {periods.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setPeriod(item.key)}
                  className={cn(
                    "flex-1 border px-2 py-2 text-[10px] transition-colors",
                    period === item.key
                      ? "border-paper bg-paper text-ink"
                      : "border-white/15 text-white/55 hover:border-white/40",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-[10px]">
              <div className="flex justify-between">
                <span className="text-white/45">مدة البقاء</span>
                <span className="num text-white/80">{data.avgSession}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/45">معدل التحويل</span>
                <span className="num text-champagne">
                  {formatPercent(data.conversionRate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/45">آخر تحديث</span>
                <span className="text-white/80">بيانات توضيحية</span>
              </div>
            </div>
          </div>
        }
      >
        <Tag tone="white">بيانات توضيحية · ليست أرقامًا رسمية</Tag>
      </PageHero>

      <section className="border-b border-line bg-paper py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="01"
            eyebrow="المؤشرات الرئيسية"
            title="لمحة عن الأداء."
            description={`مؤشرات ${data.periodLabel} — مع مقارنة بالفترة السابقة، ومدة البقاء ومعدل التحويل.`}
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {data.kpis.map((kpi, index) => {
              const Icon = kpiIcons[kpi.key] ?? TrendingUp;
              return (
                <Reveal key={kpi.key} delay={index * 0.04}>
                  <div className="flex h-full flex-col border border-line bg-ivory p-5">
                    <div className="flex items-center justify-between">
                      <Icon className="size-4 text-jarir" />
                      <span className="num inline-flex items-center gap-0.5 text-[9px] text-success">
                        +{kpi.delta}%
                        <ArrowUpRight className="size-2.5" />
                      </span>
                    </div>
                    <div className="num mt-5 text-[clamp(1.6rem,2.4vw,2.2rem)] font-semibold leading-none tracking-tight">
                      {kpi.display}
                    </div>
                    <div className="mt-2 text-[11px] text-ink">{kpi.label}</div>
                    <div className="mt-1 text-[9px] text-muted-ink">{kpi.hint}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-4 border border-line bg-ivory p-5">
              <Clock className="size-5 text-jarir" />
              <div>
                <div className="num text-2xl font-semibold">{data.avgSession}</div>
                <div className="text-[10px] text-muted-ink">متوسط مدة البقاء</div>
              </div>
            </div>
            <div className="flex items-center gap-4 border border-line bg-ivory p-5">
              <MousePointerClick className="size-5 text-jarir" />
              <div>
                <div className="num text-2xl font-semibold">
                  {formatPercent(data.conversionRate)}
                </div>
                <div className="text-[10px] text-muted-ink">معدل التحويل</div>
              </div>
            </div>
            <div className="flex items-center gap-4 border border-line bg-ivory p-5">
              <TrendingUp className="size-5 text-jarir" />
              <div>
                <div className="num text-2xl font-semibold">
                  {formatPercent(data.engagementRate)}
                </div>
                <div className="text-[10px] text-muted-ink">معدل التفاعل</div>
              </div>
            </div>
          </div>

          <div className="mt-4 border border-line bg-ivory p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg">حركة الزيارات والمستخدمين</h3>
              <span className="text-[9px] text-muted-ink">{data.periodLabel}</span>
            </div>
            <div className="h-[260px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.series} margin={{ top: 5, right: 5, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="visits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E20714" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#E20714" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1C1B19" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="#1C1B19" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2DCD2" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 9, fill: "#6F6A63", fontFamily: "IBM Plex Sans Arabic" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 9, fill: "#6F6A63" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => formatCompact(Number(value))}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      formatNumber(Number(value)),
                      name === "visits" ? "زيارات" : "مستخدمون",
                    ]}
                    labelStyle={{ fontSize: 11 }}
                    contentStyle={{ fontSize: 11 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="#E20714"
                    strokeWidth={2}
                    fill="url(#visits)"
                    isAnimationActive={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#1C1B19"
                    strokeWidth={1.5}
                    fill="url(#users)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ivory py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="02"
            eyebrow="المسار"
            title="من زيارة… إلى تحويل."
            description="كل مرحلة تفقد جزءًا من الجمهور. قراءة الفاقد تكشف أين يحتاج المحتوى أو التجربة إلى تحسين."
          />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="border border-line bg-paper p-6">
              <div className="space-y-4">
                {data.funnel.map((stage, index) => {
                  const width = Math.max(12, (stage.value / maxFunnel) * 100);
                  const previous = data.funnel[index - 1]?.value;
                  const drop = previous
                    ? Math.round(((previous - stage.value) / previous) * 100)
                    : 0;
                  return (
                    <div key={stage.stage}>
                      <div className="mb-1.5 flex items-center justify-between text-[10px]">
                        <span className="flex items-center gap-2">
                          <span className="num text-[8px] text-muted-ink">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {stage.stage}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="num text-ink">
                            {formatNumber(stage.value)}
                          </span>
                          {index > 0 && (
                            <span dir="ltr" className="num text-[8px] text-jarir">
                              −{drop}%
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="h-8 bg-sand/30">
                        <div
                          className="h-full bg-ink transition-all duration-700"
                          style={{
                            width: `${width}%`,
                            backgroundColor:
                              index === data.funnel.length - 1
                                ? "#E20714"
                                : index % 2 === 0
                                  ? "#1C1B19"
                                  : "#3B3833",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 border-t border-line pt-3 text-[9px] text-muted-ink">
                معدل التحويل الكلي: {formatPercent(data.conversionRate)} من
                الزيارة إلى التحويل. بيانات توضيحية.
              </p>
            </div>

            <div className="border border-line bg-paper p-6">
              <h3 className="font-display text-lg">مصادر الزيارات</h3>
              <p className="mt-1 text-[10px] text-muted-ink">
                توزيع الجلسات حسب القناة.
              </p>
              <div className="h-[220px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.sources}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={54}
                      outerRadius={82}
                      paddingAngle={2}
                      stroke="none"
                      isAnimationActive={false}
                    >
                      {data.sources.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "الحصة"]}
                      contentStyle={{ fontSize: 11 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {data.sources.map((source) => (
                  <div
                    key={source.name}
                    className="flex items-center justify-between gap-2 text-[9px]"
                  >
                    <span className="flex items-center gap-1.5 text-muted-ink">
                      <span
                        className="size-1.5 shrink-0"
                        style={{ backgroundColor: source.color }}
                      />
                      {source.name}
                    </span>
                    <span className="num text-ink">{source.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="03"
            eyebrow="المحتوى والمنتجات"
            title="ماذا يحدث بعد النقر؟"
            description="المنتجات والحملات الأكثر تأثيرًا في الزيارات والنقرات والتحويلات خلال الفترة المحددة."
          />

          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="overflow-hidden border border-line bg-ivory">
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <h3 className="font-display text-lg">أفضل المنتجات</h3>
                <span className="text-[9px] text-muted-ink">مرتبة بالمشاهدات</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse">
                  <thead>
                    <tr className="border-b border-line text-[9px] text-muted-ink">
                      <th className="p-3 text-start font-medium">المنتج</th>
                      <th className="p-3 text-start font-medium">مشاهدات</th>
                      <th className="p-3 text-start font-medium">نقرات</th>
                      <th className="p-3 text-start font-medium">CTR</th>
                      <th className="p-3 text-start font-medium">تحويلات</th>
                      <th className="p-3 text-start font-medium">إيراد</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.products.map((row) => {
                      const product = productById(row.productId);
                      const ctr = ((row.clicks / row.views) * 100).toFixed(1);
                      return (
                        <tr
                          key={row.productId}
                          className="border-b border-line text-[10px] last:border-0"
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="grid size-9 shrink-0 place-items-center bg-white p-1">
                                <img
                                  src={product?.image}
                                  alt=""
                                  className="h-full w-full object-contain"
                                />
                              </span>
                              <span className="line-clamp-2 max-w-[160px] text-ink">
                                {product?.name ?? row.productId}
                              </span>
                            </div>
                          </td>
                          <td className="num p-3 text-muted-ink">
                            {formatCompact(row.views)}
                          </td>
                          <td className="num p-3 text-muted-ink">
                            {formatCompact(row.clicks)}
                          </td>
                          <td className="num p-3 text-ink">{ctr}%</td>
                          <td className="num p-3 font-medium text-ink">
                            {formatNumber(row.conversions)}
                          </td>
                          <td className="num p-3 text-muted-ink">
                            {formatCompact(row.revenue)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border border-line bg-ivory p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg">أداء التواصل</h3>
                <span className="text-[9px] text-muted-ink">تفاعل %</span>
              </div>
              <div className="mt-3 h-[230px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.social}
                    layout="vertical"
                    margin={{ top: 5, right: 12, left: 8, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2DCD2" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 9, fill: "#6F6A63" }}
                      axisLine={false}
                      tickLine={false}
                      unit="%"
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 9, fill: "#1C1B19" }}
                      axisLine={false}
                      tickLine={false}
                      width={58}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "تفاعل"]}
                      contentStyle={{ fontSize: 11 }}
                    />
                    <Bar dataKey="engagement" fill="#E20714" barSize={14} radius={[0, 2, 2, 0]} isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 space-y-2 border-t border-line pt-3">
                {data.social.map((row) => (
                  <div key={row.name} className="flex items-center justify-between text-[9px]">
                    <span className="text-muted-ink">{row.name}</span>
                    <span className="num text-ink">
                      {formatCompact(row.reach)} وصول ·{" "}
                      {formatCompact(row.clicks)} نقرة
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-hidden border border-line bg-ivory">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h3 className="font-display text-lg">أداء الحملات</h3>
              <span className="text-[9px] text-muted-ink">ROAS مضاعف تقديري</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="border-b border-line text-[9px] text-muted-ink">
                    <th className="p-3 text-start font-medium">الحملة</th>
                    <th className="p-3 text-start font-medium">الوصول</th>
                    <th className="p-3 text-start font-medium">التفاعل</th>
                    <th className="p-3 text-start font-medium">النقرات</th>
                    <th className="p-3 text-start font-medium">التحويلات</th>
                    <th className="p-3 text-start font-medium">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.campaigns.map((row) => (
                    <tr
                      key={row.name}
                      className="border-b border-line text-[10px] last:border-0"
                    >
                      <td className="p-3 font-medium">{row.name}</td>
                      <td className="num p-3 text-muted-ink">
                        {formatCompact(row.reach)}
                      </td>
                      <td className="num p-3 text-ink">{row.engagement}%</td>
                      <td className="num p-3 text-muted-ink">
                        {formatCompact(row.clicks)}
                      </td>
                      <td className="num p-3 text-ink">
                        {formatNumber(row.conversions)}
                      </td>
                      <td className="num p-3 font-semibold text-jarir">
                        {row.roas}x
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ivory py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="04"
            eyebrow="القراءة والتحسين"
            title="ماذا نفعل بالأرقام؟"
            description="كل ملاحظة تقود إلى إجراء. هذه أربع قراءات من البيانات التوضيحية، قابلة للتطبيق على المحتوى والحملات."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {data.insights.map((insight, index) => {
              const isApplied = applied.includes(insight.title);
              return (
                <Reveal key={insight.title} delay={index * 0.05}>
                  <div className="flex h-full flex-col border border-line bg-paper p-5">
                    <div className="flex items-center justify-between">
                      <span className="section-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Lightbulb className="size-4 text-champagne" />
                    </div>
                    <h3 className="mt-3 font-display text-xl leading-7">
                      {insight.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[11px] leading-6 text-muted-ink">
                      {insight.text}
                    </p>
                    <div className="mt-4 border-t border-line pt-3">
                      <div className="text-[9px] text-muted-ink">الإجراء المقترح</div>
                      <p className="mt-1 text-[11px] leading-6 text-ink">
                        {insight.action}
                      </p>
                      <button
                        type="button"
                        disabled={isApplied}
                        onClick={() => apply(insight.title)}
                        className={cn(
                          "mt-3 inline-flex items-center gap-1.5 text-[10px] font-medium",
                          isApplied
                            ? "text-success"
                            : "text-jarir hover:text-jarir-dark",
                        )}
                      >
                        {isApplied ? "أُضيف إلى الخطة" : "أضف إلى خطة التحسين"}
                        <ArrowLeft className="size-3" />
                      </button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-paper py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="05"
            eyebrow="المصطلحات"
            title="مؤشرات… بتعريف واضح."
            description="لا قيمة لرقم لا نعرف كيف حُسب. هذه تعريفات المؤشرات المستخدمة في المنصة."
            action={
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 border-b border-ink pb-1 text-xs font-medium text-ink hover:border-jarir hover:text-jarir"
              >
                افتح لوحة التحكم
                <ArrowLeft className="size-3.5" />
              </Link>
            }
          />
          <div className="overflow-hidden border border-line bg-ivory">
            {metricDefinitions.map((row, index) => (
              <div
                key={row.metric}
                className={cn(
                  "grid gap-2 px-5 py-4 md:grid-cols-[0.8fr_1fr_1.2fr]",
                  index !== metricDefinitions.length - 1 && "border-b border-line",
                  index % 2 === 0 ? "bg-ivory" : "bg-paper",
                )}
              >
                <div className="text-xs font-medium">{row.metric}</div>
                <div className="text-[11px] text-muted-ink">{row.formula}</div>
                <div className="text-[11px] text-ink-soft">{row.use}</div>
              </div>
            ))}
          </div>
          <Notice className="mt-8">
            جميع أرقام التحليلات ولوحة التحكم في هذه المنصة بيانات توضيحية
            لأغراض العرض، وليست مستخرجة من أنظمة جرير. المنتجات والتقييمات
            المذكورة حقيقية من الموقع الرسمي.
          </Notice>
        </div>
      </section>
    </>
  );
}
