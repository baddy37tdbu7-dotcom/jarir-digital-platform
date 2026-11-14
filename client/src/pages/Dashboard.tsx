import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  ExternalLink,
  LayoutDashboard,
  Megaphone,
  Package,
  PieChart,
  Share2,
  Sparkles,
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
  PieChart as RePieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getAnalytics,
  type PeriodKey,
} from "@/data/analytics";
import { productById } from "@/data/products";
import { Logo } from "@/components/brand/Brand";
import { Tag } from "@/components/common/Primitives";
import { formatCompact, formatNumber, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

const periods: { key: PeriodKey; label: string }[] = [
  { key: "7d", label: "7 أيام" },
  { key: "30d", label: "30 يومًا" },
  { key: "90d", label: "90 يومًا" },
];

const navItems = [
  { id: "overview", label: "نظرة عامة", icon: LayoutDashboard },
  { id: "campaigns", label: "الحملات", icon: Megaphone },
  { id: "products", label: "المنتجات", icon: Package },
  { id: "audience", label: "الجمهور", icon: Users },
  { id: "social", label: "وسائل التواصل", icon: Share2 },
  { id: "sources", label: "المصادر والقراءات", icon: PieChart },
];

export default function Dashboard() {
  const [period, setPeriod] = useState<PeriodKey>("30d");
  const [active, setActive] = useState("overview");
  const data = useMemo(() => getAnalytics(period), [period]);

  const go = (id: string) => {
    setActive(id);
    document.getElementById(`dash-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const exportCsv = () => {
    const rows = [
      ["المنتج", "المشاهدات", "النقرات", "التحويلات", "الإيراد"],
      ...data.products.map((row) => [
        productById(row.productId)?.name ?? row.productId,
        row.views,
        row.clicks,
        row.conversions,
        row.revenue,
      ]),
      [],
      ["الحملة", "الوصول", "التفاعل %", "النقرات", "التحويلات", "ROAS"],
      ...data.campaigns.map((row) => [
        row.name,
        row.reach,
        row.engagement,
        row.clicks,
        row.conversions,
        row.roas,
      ]),
    ];
    const csv =
      "\uFEFF" +
      rows
        .map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
        )
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `jarir-marketing-${period}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("تم تصدير التقرير", { description: `ملف CSV — ${data.periodLabel}` });
  };

  const bestCampaign = [...data.campaigns].sort((a, b) => b.roas - a.roas)[0];

  return (
    <div className="flex min-h-screen bg-[#F3EFE8]" dir="rtl">
      <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col bg-night text-paper lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <Link href="/">
            <Logo variant="white" className="h-7" />
          </Link>
          <div className="mt-3 text-[9px] tracking-[0.18em] text-white/35">
            لوحة التحكم التسويقية
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          <div className="px-3 pb-2 text-[8px] tracking-wider text-white/25">
            التحليلات
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className={cn(
                "flex w-full items-center gap-3 px-3 py-2.5 text-start text-[11px] transition-colors",
                active === item.id
                  ? "bg-white/10 text-paper"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
              {active === item.id && (
                <span className="ms-auto h-4 w-0.5 bg-jarir" />
              )}
            </button>
          ))}

          <div className="px-3 pb-2 pt-6 text-[8px] tracking-wider text-white/25">
            الانتقال السريع
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-[11px] text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
          >
            <ExternalLink className="size-4" />
            عرض المنصة
          </Link>
          <Link
            href="/analytics"
            className="flex items-center gap-3 px-3 py-2.5 text-[11px] text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
          >
            <TrendingUp className="size-4" />
            تقرير قياس الأداء
          </Link>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-2 text-champagne">
              <Sparkles className="size-3.5" />
              <span className="text-[9px]">وضع العرض</span>
            </div>
            <p className="mt-2 text-[10px] leading-5 text-white/45">
              جميع الأرقام توضيحية لتصميم المنصة، وليست بيانات جرير الفعلية.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-jarir text-[10px] font-semibold text-white">
              ج
            </span>
            <div>
              <div className="text-[10px]">فريق التسويق</div>
              <div className="text-[8px] text-white/35">منصة جرير</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 md:px-7">
            <Link href="/" className="lg:hidden">
              <Logo className="h-6" />
            </Link>
            <div className="hidden items-center gap-2 text-[10px] text-muted-ink sm:flex">
              <Link href="/" className="hover:text-ink">
                منصة جرير
              </Link>
              <span className="text-sand-deep">/</span>
              <span className="text-ink">لوحة التحكم</span>
            </div>

            <Tag tone="outline" className="hidden md:inline-flex">
              بيانات توضيحية
            </Tag>

            <div className="ms-auto flex items-center gap-2">
              <div className="hidden items-center border border-line bg-paper p-0.5 sm:flex">
                {periods.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setPeriod(item.key)}
                    className={cn(
                      "px-3 py-1.5 text-[9px] transition-colors",
                      period === item.key
                        ? "bg-ink text-paper"
                        : "text-muted-ink hover:text-ink",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={exportCsv}
                className="inline-flex h-9 items-center gap-1.5 border border-line px-3 text-[10px] text-ink transition-colors hover:border-ink"
              >
                <Download className="size-3.5" />
                <span className="hidden sm:inline">تصدير التقرير</span>
              </button>
              <Link
                href="/"
                className="inline-flex h-9 items-center gap-1.5 bg-ink px-3 text-[10px] text-paper transition-colors hover:bg-jarir"
              >
                <ExternalLink className="size-3.5" />
                <span className="hidden sm:inline">عرض المنصة</span>
              </Link>
            </div>
          </div>

          <div className="flex gap-1 overflow-x-auto border-t border-line px-3 py-2 no-scrollbar lg:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={cn(
                  "shrink-0 px-3 py-1.5 text-[9px]",
                  active === item.id
                    ? "bg-ink text-paper"
                    : "text-muted-ink",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <main className="space-y-4 p-4 md:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="eyebrow">Marketing overview</span>
              <h1 className="mt-1 font-display text-3xl">نظرة عامة</h1>
              <p className="mt-1 text-[10px] text-muted-ink">
                {data.periodLabel} · مقارنة بالفترة السابقة
              </p>
            </div>
            <div className="flex items-center gap-2 sm:hidden">
              {periods.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setPeriod(item.key)}
                  className={cn(
                    "border px-2.5 py-1.5 text-[9px]",
                    period === item.key
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-muted-ink",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <section id="dash-overview" className="scroll-mt-32">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {data.kpis.map((kpi) => (
                <div key={kpi.key} className="border border-line bg-ivory p-4">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] text-muted-ink">{kpi.label}</span>
                    <span className="num inline-flex items-center gap-0.5 text-[9px] text-success">
                      +{kpi.delta}%
                      <ArrowUpRight className="size-2.5" />
                    </span>
                  </div>
                  <div className="num mt-2 text-[1.75rem] font-semibold leading-none tracking-tight">
                    {kpi.display}
                  </div>
                  <div className="mt-3 h-8" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.series}>
                        <defs>
                          <linearGradient id={`spark-${kpi.key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#E20714" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#E20714" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="visits"
                          stroke="#E20714"
                          strokeWidth={1.4}
                          fill={`url(#spark-${kpi.key})`}
                          isAnimationActive={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-[8px] text-muted-ink">{kpi.hint}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 xl:grid-cols-[1.35fr_0.65fr]">
              <div className="border border-line bg-ivory p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="font-display text-lg">الزيارات والمستخدمون</h2>
                    <p className="text-[9px] text-muted-ink">{data.periodLabel}</p>
                  </div>
                  <div className="flex items-center gap-4 text-[9px]">
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 bg-jarir" />
                      زيارات
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 bg-ink" />
                      مستخدمون
                    </span>
                  </div>
                </div>
                <div className="h-[280px] w-full" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.series} margin={{ top: 5, right: 5, left: -18, bottom: 0 }}>
                      <defs>
                        <linearGradient id="main-visits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#E20714" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="#E20714" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="main-users" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1C1B19" stopOpacity={0.14} />
                          <stop offset="100%" stopColor="#1C1B19" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2DCD2" vertical={false} />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 9, fill: "#6F6A63" }}
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
                        contentStyle={{ fontSize: 11 }}
                      />
                      <Area type="monotone" dataKey="visits" stroke="#E20714" strokeWidth={2} fill="url(#main-visits)" isAnimationActive={false} />
                      <Area type="monotone" dataKey="users" stroke="#1C1B19" strokeWidth={1.4} fill="url(#main-users)" isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="border border-line bg-ivory p-5">
                <h2 className="font-display text-lg">مصادر الزيارات</h2>
                <div className="relative h-[200px]" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={data.sources}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={52}
                        outerRadius={76}
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
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <div className="num text-xl font-semibold">
                        {data.sources.length}
                      </div>
                      <div className="text-[8px] text-muted-ink">قنوات</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 space-y-1.5">
                  {data.sources.slice(0, 5).map((source) => (
                    <div key={source.name} className="flex items-center justify-between text-[9px]">
                      <span className="flex items-center gap-1.5 text-muted-ink">
                        <span className="size-1.5" style={{ backgroundColor: source.color }} />
                        {source.name}
                      </span>
                      <span className="num">{source.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="dash-campaigns" className="scroll-mt-32 border border-line bg-ivory">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4">
              <div>
                <h2 className="font-display text-lg">أداء الحملات</h2>
                <p className="text-[9px] text-muted-ink">الوصول والتحويلات والعائد</p>
              </div>
              <span className="text-[9px] text-jarir">
                الأفضل: {bestCampaign.name} · {bestCampaign.roas}x
              </span>
            </div>
            <div className="grid gap-4 p-5 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="h-[240px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.campaigns} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2DCD2" vertical={false} />
                    <XAxis
                      dataKey="name"
                      reversed
                      tick={{ fontSize: 9, fill: "#6F6A63" }}
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
                        name === "conversions" ? formatNumber(Number(value)) : formatCompact(Number(value)),
                        name === "conversions" ? "تحويلات" : "وصول",
                      ]}
                      contentStyle={{ fontSize: 11 }}
                    />
                    <Bar dataKey="reach" fill="#D6C8B4" barSize={16} isAnimationActive={false} />
                    <Bar dataKey="conversions" fill="#E20714" barSize={16} isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse">
                  <thead>
                    <tr className="border-b border-line text-[9px] text-muted-ink">
                      <th className="p-2 text-start font-medium">الحملة</th>
                      <th className="p-2 text-start font-medium">تفاعل</th>
                      <th className="p-2 text-start font-medium">تحويلات</th>
                      <th className="p-2 text-start font-medium">ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.campaigns.map((row) => (
                      <tr key={row.name} className="border-b border-line text-[10px] last:border-0">
                        <td className="p-2 font-medium">{row.name}</td>
                        <td className="num p-2 text-muted-ink">{row.engagement}%</td>
                        <td className="num p-2">{formatNumber(row.conversions)}</td>
                        <td className="num p-2 font-semibold text-jarir">{row.roas}x</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="dash-products" className="scroll-mt-32 border border-line bg-ivory">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4">
              <div>
                <h2 className="font-display text-lg">أفضل المنتجات</h2>
                <p className="text-[9px] text-muted-ink">الأكثر مشاهدة وتفاعلًا</p>
              </div>
              <span className="text-[9px] text-muted-ink">
                إجمالي الإيراد:{" "}
                {formatCompact(data.products.reduce((sum, row) => sum + row.revenue, 0))} ر.س
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr className="border-b border-line text-[9px] text-muted-ink">
                    <th className="p-3 text-start font-medium">المنتج</th>
                    <th className="p-3 text-start font-medium">مشاهدات</th>
                    <th className="p-3 text-start font-medium">نقرات</th>
                    <th className="p-3 text-start font-medium">تحويلات</th>
                    <th className="p-3 text-start font-medium">معدل التحويل</th>
                    <th className="p-3 text-start font-medium">الإيراد</th>
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((row) => {
                    const product = productById(row.productId);
                    const rate = ((row.conversions / row.views) * 100).toFixed(1);
                    return (
                      <tr key={row.productId} className="border-b border-line text-[10px] last:border-0">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="grid size-9 shrink-0 place-items-center bg-white p-1">
                              <img src={product?.image} alt="" className="h-full w-full object-contain" />
                            </span>
                            <span className="line-clamp-2 max-w-[220px]">{product?.name}</span>
                          </div>
                        </td>
                        <td className="num p-3 text-muted-ink">{formatCompact(row.views)}</td>
                        <td className="num p-3 text-muted-ink">{formatCompact(row.clicks)}</td>
                        <td className="num p-3">{formatNumber(row.conversions)}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-16 bg-sand/50">
                              <div className="h-full bg-jarir" style={{ width: `${Math.min(100, Number(rate) * 20)}%` }} />
                            </div>
                            <span className="num text-[9px]">{rate}%</span>
                          </div>
                        </td>
                        <td className="num p-3 font-medium">{formatCompact(row.revenue)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid gap-3 xl:grid-cols-2">
            <section id="dash-audience" className="scroll-mt-32 border border-line bg-ivory p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg">مسار التحويل</h2>
                <span className="num text-[10px] text-jarir">
                  {formatPercent(data.conversionRate)}
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {data.funnel.map((stage, index) => {
                  const width = Math.max(
                    12,
                    (stage.value / (data.funnel[0]?.value ?? 1)) * 100,
                  );
                  return (
                    <div key={stage.stage}>
                      <div className="mb-1 flex justify-between text-[9px]">
                        <span className="text-muted-ink">{stage.stage}</span>
                        <span className="num">{formatNumber(stage.value)}</span>
                      </div>
                      <div className="h-5 bg-sand/30">
                        <div
                          className="h-full"
                          style={{
                            width: `${width}%`,
                            backgroundColor: index === 4 ? "#E20714" : "#1C1B19",
                            opacity: index === 4 ? 1 : 0.55 + index * 0.1,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[9px]">
                <span className="text-muted-ink">متوسط مدة البقاء</span>
                <span className="num">{data.avgSession}</span>
              </div>
            </section>

            <section id="dash-social" className="scroll-mt-32 border border-line bg-ivory p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg">أداء وسائل التواصل</h2>
                <span className="text-[9px] text-muted-ink">تفاعل %</span>
              </div>
              <div className="mt-5 space-y-4">
                {data.social.map((row) => (
                  <div key={row.name}>
                    <div className="mb-1 flex items-center justify-between text-[9px]">
                      <span>{row.name}</span>
                      <span className="num text-muted-ink">
                        {formatCompact(row.reach)} وصول
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 bg-sand/40">
                        <div
                          className="h-full bg-jarir"
                          style={{ width: `${Math.min(100, row.engagement * 11)}%` }}
                        />
                      </div>
                      <span className="num w-9 text-end text-[9px] font-medium">
                        {row.engagement}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-line pt-4">
                {data.devices.map((device) => (
                  <div key={device.name} className="flex items-center justify-between text-[9px]">
                    <span className="flex items-center gap-1.5 text-muted-ink">
                      <span className="size-1.5" style={{ backgroundColor: device.color }} />
                      {device.name}
                    </span>
                    <span className="num">{device.value}%</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section id="dash-sources" className="scroll-mt-32 border border-line bg-ivory p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-lg">القراءات السريعة</h2>
                <p className="text-[9px] text-muted-ink">ما تقوله البيانات، وما الخطوة التالية</p>
              </div>
              <Link
                href="/analytics"
                className="inline-flex items-center gap-1.5 text-[10px] text-ink hover:text-jarir"
              >
                التقرير الكامل
                <ArrowLeft className="size-3.5" />
              </Link>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {data.insights.slice(0, 2).map((insight) => (
                <div key={insight.title} className="border border-line bg-paper p-4">
                  <div className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 size-3.5 shrink-0 text-champagne" />
                    <div>
                      <h3 className="text-[11px] font-medium">{insight.title}</h3>
                      <p className="mt-1 text-[10px] leading-5 text-muted-ink">
                        {insight.text}
                      </p>
                      <p className="mt-2 text-[10px] leading-5 text-jarir">
                        {insight.action}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="flex flex-col items-start justify-between gap-2 border-t border-line pt-4 text-[9px] text-muted-ink sm:flex-row sm:items-center">
            <span>© 2026 منصة جرير التسويقية — لوحة تحكم مفاهيمية.</span>
            <span>بيانات توضيحية · آخر تحديث: نوفمبر 2026</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
