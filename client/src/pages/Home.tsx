import {
  ArrowLeft,
  ArrowUpLeft,
  BookOpen,
  CreditCard,
  Instagram,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
  Youtube,
  Quote,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  bestSellers,
  categories,
  categoryName,
  interestLabels,
  products,
  type InterestId,
} from "@/data/products";
import { campaigns } from "@/data/campaigns";
import { socialPlatforms } from "@/data/social";
import { testimonials } from "@/data/community";
import { ProductCard, CategoryCard } from "@/components/product/ProductCard";
import {
  Notice,
  Reveal,
  SectionHeading,
  StatBlock,
  Tag,
} from "@/components/common/Primitives";
import { InterestTeaser } from "@/components/interactive/InterestTeaser";
import { PollCard } from "@/components/interactive/PollCard";
import { TikTokIcon, XIcon } from "@/components/brand/Brand";
import { cn } from "@/lib/utils";

const tickerWords = [
  "كتب تفتح عوالم",
  "أحدث التقنيات",
  "أدوات تصنع الفرق",
  "مستلزمات العام الجديد",
  "ألعاب تجمع العائلة",
  "إكسسوارات تكمل التجربة",
  "صوتيات بمستوى آخر",
  "هدايا تليق",
];

const suggestionTabs: { id: "all" | InterestId; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "tech", label: "تقنية" },
  { id: "study", label: "دراسة" },
  { id: "reading", label: "قراءة" },
  { id: "office", label: "مكتب" },
  { id: "gaming", label: "ألعاب" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ivory">
      <div className="container-wide relative z-[2] grid min-h-[calc(100vh-108px)] items-stretch lg:grid-cols-[1.02fr_0.98fr]">
        <div className="flex flex-col justify-center py-12 lg:py-16 lg:pe-12">
          <div
            className="animate-fade-up mb-6 flex items-center gap-3"
            style={{ animationDelay: "80ms" }}
          >
            <span className="size-2 bg-jarir" />
            <span className="eyebrow">مكتبة جرير · منذ 1974</span>
          </div>

          <h1
            className="display-hero animate-fade-up text-ink"
            style={{ animationDelay: "160ms" }}
          >
            كل ما تحبّه،
            <br />
            <span className="text-jarir">في مكان واحد.</span>
          </h1>

          <p
            className="animate-fade-up mt-7 max-w-lg text-[15px] leading-8 text-muted-ink md:text-base"
            style={{ animationDelay: "260ms" }}
          >
            من الكتاب الذي يفتح لك عالمًا، إلى التقنية التي تختصر الطريق —
            جرير تجمع لك القراءة والإبداع والتقنية في تجربة واحدة.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "360ms" }}
          >
            <Link
              href="/products"
              className="group inline-flex h-12 items-center gap-3 bg-jarir px-7 text-sm font-medium text-white transition-colors hover:bg-jarir-dark"
            >
              تسوّق الآن
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link
              href="/offers"
              className="inline-flex h-12 items-center gap-2 border border-ink px-7 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              اكتشف العروض
            </Link>
          </div>

          <div
            className="animate-fade-up mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] text-muted-ink"
            style={{ animationDelay: "460ms" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <Truck className="size-3.5 text-jarir" />
              توصيل إلى السعودية والخليج
            </span>
            <span className="inline-flex items-center gap-1.5">
              <RotateCcw className="size-3.5 text-jarir" />
              استبدال وإرجاع
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CreditCard className="size-3.5 text-jarir" />
              تقسيط مرن
            </span>
          </div>

          <div
            className="animate-fade-up mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6"
            style={{ animationDelay: "560ms" }}
          >
            <StatBlock value="1974" label="بداية الحكاية" />
            <StatBlock value="8" label="أقسام في المنصة" />
            <StatBlock value="20+" label="منتجًا موثقًا" />
          </div>
        </div>

        <div className="relative min-h-[400px] lg:min-h-full">
          <img
            src="/media/hero.webp"
            alt="كتب ولابتوب وهيدفونات على طاولة داكنة — اختيارات جرير"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent lg:bg-gradient-to-l lg:from-ivory/20 lg:via-transparent" />

          <div className="absolute bottom-6 start-5 end-5 flex items-end justify-between gap-4 sm:start-8 sm:end-8">
            <div className="border border-white/20 bg-night/70 px-4 py-3 text-paper backdrop-blur-md">
              <div className="eyebrow text-champagne">اختيار المحرر</div>
              <div className="mt-1.5 flex items-center gap-2 text-xs">
                <span>آيفون 17 برو — 512 جيجابايت</span>
                <ArrowUpLeft className="size-3.5 text-white/50" />
              </div>
            </div>
            <span className="num hidden text-[9px] tracking-[0.2em] text-white/50 sm:block">
              JARIR / 01
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  return (
    <div className="overflow-hidden border-b border-line bg-sand/45 py-3">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {[...tickerWords, ...tickerWords].map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="flex items-center gap-8 text-[11px] text-ink-soft"
          >
            {word}
            <span className="size-1 rotate-45 bg-jarir/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

function StoryBand() {
  return (
    <section className="relative overflow-hidden bg-night text-paper">
      <div className="pointer-events-none absolute inset-0 grain" />
      <div className="container-wide relative z-[2] grid items-stretch lg:grid-cols-2">
        <div className="relative min-h-[380px] lg:min-h-[560px]">
          <img
            src="/media/campaigns/reading.webp"
            alt="ركن قراءة دافئ في مكتبة منزلية"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 start-6 border border-white/20 bg-night/60 px-4 py-3 backdrop-blur">
            <span className="eyebrow text-champagne">من أرشيف الحكاية</span>
            <p className="mt-1 text-xs text-white/75">
              بدأت جرير مكتبة صغيرة في الرياض… وما زالت تحتفظ بروح البداية.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center py-14 lg:py-20 lg:ps-16">
          <SectionHeading
            tone="dark"
            number="03"
            eyebrow="حكاية جرير"
            title="ليست مجرد مكتبة."
            description="منذ عام 1974، بدأت جرير من مكتبة صغيرة في الرياض، لتصبح وجهة تجمع الكتاب والتقنية والمستلزمات المكتبية والمدرسية. في المنصة نفسها، تحضر الحكاية كما يحضر المنتج: ثقافة، اختيار، وتجربة."
            className="mb-7"
          />
          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-7">
            <StatBlock dark value="1974" label="تأسست في الرياض" />
            <StatBlock dark value="2003" label="أُدرجت في تداول" />
            <StatBlock dark value="1.20B" label="رأس المال (ريال)" />
          </div>
          <a
            href="https://www.jarir.com/company-profile"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex w-fit items-center gap-2 border-b border-white/25 pb-1 text-xs text-white/70 transition-colors hover:border-white hover:text-white"
          >
            اقرأ عن الشركة على موقع جرير
            <ArrowUpLeft className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function CampaignSpotlight() {
  const main = campaigns[0];
  const rest = campaigns.slice(1);

  return (
    <section className="relative overflow-hidden">
      <img
        src={main.image}
        alt={main.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-night via-night/85 to-night/30" />
      <div className="container-wide relative z-[2] flex min-h-[600px] flex-col justify-between py-14 md:py-20">
        <div className="max-w-xl text-paper">
          <Tag tone="white">فكرة حملة مقترحة</Tag>
          <p className="mt-6 text-xs text-white/55">{main.kicker}</p>
          <h2 className="display-section mt-3 text-[clamp(2.8rem,6vw,5.2rem)]">
            {main.name}.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-8 text-white/70">
            {main.message} {main.idea.split(":")[0]}…
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href={main.ctaHref}
              className="inline-flex h-12 items-center gap-2 bg-jarir px-6 text-sm font-medium text-white transition-colors hover:bg-jarir-dark"
            >
              {main.cta}
              <ArrowLeft className="size-4" />
            </Link>
            <Link
              href="/campaigns"
              className="inline-flex h-12 items-center gap-2 border border-white/30 px-6 text-sm text-white/80 transition-colors hover:border-white hover:text-white"
            >
              كل الحملات
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-px border border-white/15 bg-white/10 sm:grid-cols-3">
          {rest.map((campaign) => (
            <Link
              key={campaign.id}
              href="/campaigns"
              className="group bg-night/75 p-5 backdrop-blur-sm transition-colors hover:bg-night/90"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/40">{campaign.kicker}</span>
                <ArrowUpLeft className="size-3.5 text-white/30 transition-colors group-hover:text-champagne" />
              </div>
              <h3 className="mt-3 font-display text-xl text-paper">
                {campaign.name}
              </h3>
              <p className="mt-1 text-[11px] text-white/50">{campaign.audience}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Suggestions() {
  const [tab, setTab] = useState<"all" | InterestId>("all");
  const filtered = useMemo(() => {
    if (tab === "all") return products.slice(0, 8);
    return products
      .filter((product) => product.interests.includes(tab))
      .slice(0, 8);
  }, [tab]);

  return (
    <section className="border-b border-line bg-paper py-16 md:py-24">
      <div className="container-wide">
        <SectionHeading
          number="04"
          eyebrow="مختارات جرير"
          title="منتجات تستحق نظرة."
          description="اختيارات متنوعة من الكتب والتقنية والمستلزمات — مرتّبة لتصل إلى ما يناسبك أسرع."
          action={
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border-b border-ink pb-1 text-xs font-medium text-ink transition-colors hover:border-jarir hover:text-jarir"
            >
              كل المنتجات
              <ArrowLeft className="size-3.5" />
            </Link>
          }
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {suggestionTabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn("chip", tab === item.id && "chip-active")}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product, index) => (
            <Reveal key={product.id} delay={(index % 4) * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellersBand() {
  return (
    <section className="relative overflow-hidden bg-night py-16 text-paper md:py-24">
      <div className="pointer-events-none absolute inset-0 grain" />
      <div className="container-wide relative z-[2]">
        <SectionHeading
          tone="dark"
          number="05"
          eyebrow="الأكثر مبيعًا"
          title="ما يختاره الجمهور."
          description="منتجات تتصدر اهتمام الزوار وتفاعلهم على المنصة — من الكتب إلى الأجهزة."
          action={
            <Link
              href="/best-sellers"
              className="inline-flex items-center gap-2 border-b border-white/30 pb-1 text-xs text-white/70 transition-colors hover:border-white hover:text-white"
            >
              القائمة الكاملة
              <ArrowLeft className="size-3.5" />
            </Link>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.slice(0, 4).map((product, index) => (
            <Reveal key={product.id} delay={index * 0.06}>
              <ProductCard product={product} rank={index + 1} />
            </Reveal>
          ))}
        </div>

        <Notice tone="dark" className="mt-8">
          ترتيب استرشادي ضمن بيانات المنصة التوضيحية، وليس تصنيفًا رسميًا
          للمبيعات. المنتجات والأسعار من كتالوج جرير المعلن.
        </Notice>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="border-b border-line bg-ivory py-16 md:py-24">
      <div className="container-wide">
        <SectionHeading
          number="08"
          eyebrow="تفاعل الجمهور"
          title="صوتك يصنع التجربة."
          description="قيّم، صوّت، شارك، واحفظ ما يعجبك — كل تفاعل يساعدنا على اقتراح ما يناسبك أكثر."
          action={
            <Link
              href="/community"
              className="inline-flex items-center gap-2 border-b border-ink pb-1 text-xs font-medium text-ink transition-colors hover:border-jarir hover:text-jarir"
            >
              انضم إلى المجتمع
              <ArrowLeft className="size-3.5" />
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <PollCard />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.slice(0, 2).map((item, index) => (
              <Reveal key={item.id} delay={index * 0.08}>
                <figure className="flex h-full flex-col border border-line bg-paper p-6">
                  <Quote className="size-6 text-jarir/30" />
                  <blockquote className="mt-4 flex-1 text-[13px] leading-7 text-ink-soft">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line pt-4">
                    <div className="text-xs font-medium text-ink">{item.name}</div>
                    <div className="mt-0.5 text-[10px] text-muted-ink">
                      {item.context}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}

            <Reveal delay={0.16} className="sm:col-span-2">
              <div className="flex flex-col items-start justify-between gap-4 border border-line bg-sand/30 p-6 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-ink">
                    <MessageCircle className="size-3.5 text-jarir" />
                    أسئلة الجمهور
                  </div>
                  <p className="mt-2 text-sm text-ink">
                    «كيف أختار لابتوب مناسب للجامعة؟» — شارك سؤالك وسنجيبك.
                  </p>
                </div>
                <Link
                  href="/community"
                  className="inline-flex h-10 shrink-0 items-center gap-2 border border-ink px-4 text-[11px] text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  اطرح سؤالك
                  <ArrowLeft className="size-3.5" />
                </Link>
              </div>
            </Reveal>

            <p className="text-[10px] text-muted-ink sm:col-span-2">
              الشهادات والتفاعلات المعروضة نماذج توضيحية لأغراض العرض.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  return (
    <section className="border-b border-line bg-paper py-16 md:py-24">
      <div className="container-wide">
        <SectionHeading
          number="09"
          eyebrow="وسائل التواصل"
          title="جرير… حيث تكون."
          description="لكل منصة دور في الرحلة: الوعي، التفاعل، التحديث، والثقة. جميع الروابط أدناه رسمية وموثقة."
          action={
            <Link
              href="/social"
              className="inline-flex items-center gap-2 border-b border-ink pb-1 text-xs font-medium text-ink transition-colors hover:border-jarir hover:text-jarir"
            >
              استراتيجية التواصل
              <ArrowLeft className="size-3.5" />
            </Link>
          }
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {socialPlatforms.map((platform, index) => {
            const Icon =
              platform.id === "instagram"
                ? Instagram
                : platform.id === "x"
                  ? XIcon
                  : platform.id === "tiktok"
                    ? TikTokIcon
                    : Youtube;
            return (
              <Reveal key={platform.id} delay={index * 0.05}>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col border border-line bg-ivory p-5 transition-colors hover:border-sand-deep"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="size-5 text-ink" />
                    <ArrowUpLeft className="size-3.5 text-muted-ink transition-colors group-hover:text-jarir" />
                  </div>
                  <h3 className="mt-5 font-display text-lg">{platform.name}</h3>
                  <p className="num mt-0.5 text-[10px] text-muted-ink">
                    {platform.handle}
                  </p>
                  <p className="mt-3 text-[11px] leading-6 text-ink-soft">
                    {platform.role}
                  </p>
                  <span className="mt-auto pt-4 text-[10px] text-muted-ink">
                    {platform.kpi}
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-jarir text-white">
      <div className="pointer-events-none absolute inset-0 grain" />
      <div className="container-wide relative z-[2] flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
        <div>
          <span className="text-[10px] tracking-[0.2em] text-white/60">
            الخطوة التالية
          </span>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-tight">
            ابدأ من صفحة… أو من جهاز.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-white/75">
            كل ما تحتاجه للدراسة والقراءة والترفيه، مع تجربة توصيات وعروض
            مصممة لتصل إلى ما يناسبك.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex h-12 items-center gap-2 bg-white px-7 text-sm font-medium text-ink transition-colors hover:bg-paper"
          >
            تصفح المنتجات
            <ArrowLeft className="size-4" />
          </Link>
          <Link
            href="/recommendations"
            className="inline-flex h-12 items-center gap-2 border border-white/40 px-7 text-sm text-white transition-colors hover:border-white hover:bg-white/10"
          >
            <Sparkles className="size-4" />
            اقترح لي
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <>
      <Hero />
      <Ticker />

      <section className="border-b border-line bg-paper py-16 md:py-24">
        <div className="container-wide">
          <SectionHeading
            number="01"
            eyebrow="تصنيفات المنتجات"
            title="أقسام تفتح لك أبوابًا."
            description="من رفّ الكتب إلى أحدث الأجهزة — اختر القسم الذي يبدأ منه يومك."
            action={
              <Link
                href="/products"
                className="inline-flex items-center gap-2 border-b border-ink pb-1 text-xs font-medium text-ink transition-colors hover:border-jarir hover:text-jarir"
              >
                استكشف الكتالوج
                <ArrowLeft className="size-3.5" />
              </Link>
            }
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {categories.map((category, index) => (
              <Reveal key={category.id} delay={(index % 4) * 0.05}>
                <CategoryCard
                  category={category}
                  count={products.filter((p) => p.category === category.id).length}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ivory py-16 md:py-24">
        <div className="container-wide">
          <SectionHeading
            number="02"
            eyebrow="العروض المميزة"
            title="اختيارات تستحق التوقف."
            description="منتجات مختارة من عروض جرير، بأسعارها المعلنة — وباقات وعروض مقترحة تنتظرك في صفحة العروض."
            action={
              <Link
                href="/offers"
                className="inline-flex items-center gap-2 border-b border-ink pb-1 text-xs font-medium text-ink transition-colors hover:border-jarir hover:text-jarir"
              >
                كل العروض
                <ArrowLeft className="size-3.5" />
              </Link>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
          <Notice className="mt-8">
            الأسعار الظاهرة هي أسعار المنتجات المعلنة على موقع جرير وقت إعداد
            المنصة، وقد تتغير. الباقات والعروض الإضافية في صفحة العروض مقترحات
            تصميمية موسومة بوضوح.
          </Notice>
        </div>
      </section>

      <StoryBand />

      <Suggestions />

      <BestSellersBand />

      <section className="border-b border-line bg-ivory py-16 md:py-24">
        <div className="container-wide">
          <SectionHeading
            number="06"
            eyebrow="الحملات التسويقية"
            title="حملات لها فكرة."
            description="أربع أفكار حملات مقترحة تربط المنتج باللحظة والجمهور، وكل منها قابلة للتنفيذ على المنصات."
            action={
              <Link
                href="/campaigns"
                className="inline-flex items-center gap-2 border-b border-ink pb-1 text-xs font-medium text-ink transition-colors hover:border-jarir hover:text-jarir"
              >
                تفاصيل الحملات
                <ArrowLeft className="size-3.5" />
              </Link>
            }
          />
          <div className="grid gap-4 md:grid-cols-2">
            {campaigns.slice(1).map((campaign, index) => (
              <Reveal key={campaign.id} delay={index * 0.06}>
                <Link
                  href="/campaigns"
                  className="group grid h-full overflow-hidden border border-line bg-paper sm:grid-cols-[0.85fr_1.15fr]"
                >
                  <div className="relative min-h-[180px] overflow-hidden">
                    <img
                      src={campaign.image}
                      alt={campaign.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <Tag tone="white" className="absolute start-3 top-3">
                      فكرة حملة مقترحة
                    </Tag>
                  </div>
                  <div className="flex flex-col p-5">
                    <span className="text-[10px] text-muted-ink">
                      {campaign.kicker}
                    </span>
                    <h3 className="mt-2 font-display text-xl">{campaign.name}</h3>
                    <p className="mt-2 line-clamp-3 text-[11px] leading-6 text-muted-ink">
                      {campaign.idea}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[11px] font-medium text-ink">
                      {campaign.cta}
                      <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={0.18}>
              <Link
                href="/campaigns"
                className="group flex h-full min-h-[260px] flex-col justify-between border border-night bg-night p-6 text-paper transition-colors hover:border-jarir"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-champagne">
                    أربع حملات
                  </span>
                  <ArrowUpLeft className="size-4 text-white/40 transition-colors group-hover:text-champagne" />
                </div>
                <div className="mt-8">
                  <h3 className="font-display text-2xl">حملات تبني الحكاية.</h3>
                  <p className="mt-2 max-w-xs text-xs leading-6 text-white/55">
                    الفكرة، الرسالة، الجمهور، والقناة — كل ما تحتاجه لتبدأ.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-xs text-champagne">
                  استعرض كل الحملات
                  <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CampaignSpotlight />

      <section className="border-b border-line bg-sand/30 py-16 md:py-24">
        <div className="container-wide">
          <SectionHeading
            number="07"
            eyebrow="التوصيات الشخصية"
            title="توصيات تشبهك."
            description="لا تبحث طويلًا. أخبرنا بما يهمك، ودع المنصة تبني لك قائمة قصيرة."
          />
          <Reveal>
            <InterestTeaser />
          </Reveal>
        </div>
      </section>

      <CommunitySection />

      <SocialSection />

      <FinalCta />
    </>
  );
}
