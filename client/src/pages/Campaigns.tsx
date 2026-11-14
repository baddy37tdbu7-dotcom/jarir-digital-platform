import {
  ArrowLeft,
  ArrowUpLeft,
  CalendarDays,
  Target,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import { campaigns, type Campaign } from "@/data/campaigns";
import {
  Notice,
  PageHero,
  Reveal,
  SectionHeading,
  StatBlock,
  Tag,
} from "@/components/common/Primitives";

const strategy = [
  {
    campaign: "ارجع أقوى",
    goal: "زيادة التحويل في موسم العودة",
    kpi: "التحويلات · حفظ قائمة العودة",
    platform: "Instagram · TikTok",
  },
  {
    campaign: "أسبوع التقنية",
    goal: "بناء الثقة ودعم قرار الشراء",
    kpi: "مشاهدات المراجعات · نقرات المنتج",
    platform: "YouTube · X",
  },
  {
    campaign: "صفحة كل يوم",
    goal: "تنمية المجتمع والاحتفاظ",
    kpi: "المشاركات · عودة الزوار",
    platform: "Instagram · X",
  },
  {
    campaign: "هدية تليق",
    goal: "تحويل المناسبات إلى مبيعات",
    kpi: "استخدام منتقي الهدايا · التحويل",
    platform: "Snapchat · Instagram",
  },
];

function CampaignBlock({
  campaign,
  index,
  reverse,
}: {
  campaign: Campaign;
  index: number;
  reverse?: boolean;
}) {
  return (
    <Reveal>
      <article className="grid border border-line bg-ivory lg:grid-cols-2">
        <div
          className={`relative min-h-[320px] overflow-hidden lg:min-h-[560px] ${
            reverse ? "lg:order-2" : ""
          }`}
        >
          <img
            src={campaign.image}
            alt={campaign.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent" />
          <div className="absolute start-5 top-5 flex items-center gap-2">
            <span className="num grid size-8 place-items-center bg-ivory text-[10px] font-semibold text-ink">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Tag tone="white">فكرة حملة مقترحة</Tag>
          </div>
          <div className="absolute bottom-5 start-5 end-5 flex flex-wrap gap-2">
            {campaign.channels.map((channel) => (
              <span
                key={channel}
                className="border border-white/25 bg-night/50 px-2.5 py-1 text-[9px] text-white/80 backdrop-blur"
              >
                {channel}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
          <span className="eyebrow">{campaign.kicker}</span>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-tight">
            {campaign.name}.
          </h2>

          <blockquote className="mt-5 border-s-2 border-jarir ps-4 font-display text-xl leading-9 text-ink md:text-2xl">
            {campaign.message}
          </blockquote>

          <div className="mt-6">
            <h3 className="text-[10px] font-medium tracking-wide text-muted-ink">
              الفكرة الإبداعية
            </h3>
            <p className="mt-2 text-sm leading-8 text-ink-soft">
              {campaign.idea}
            </p>
          </div>

          <div className="mt-6 grid gap-4 border-y border-line py-5 sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <Users className="mt-0.5 size-4 shrink-0 text-jarir" />
              <div>
                <div className="text-[9px] text-muted-ink">الجمهور المستهدف</div>
                <div className="mt-1 text-[11px] leading-5">
                  {campaign.audience}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CalendarDays className="mt-0.5 size-4 shrink-0 text-jarir" />
              <div>
                <div className="text-[9px] text-muted-ink">الموسم المقترح</div>
                <div className="mt-1 text-[11px] leading-5">
                  {campaign.season}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-[10px] font-medium tracking-wide text-muted-ink">
              مخرجات المحتوى
            </h3>
            <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
              {campaign.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[11px] leading-5 text-ink-soft"
                >
                  <span className="mt-2 block size-1 shrink-0 bg-jarir" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={campaign.ctaHref}
              className="inline-flex h-11 items-center gap-2 bg-jarir px-5 text-xs font-medium text-white transition-colors hover:bg-jarir-dark"
            >
              {campaign.cta}
              <ArrowLeft className="size-3.5" />
            </Link>
            <Link
              href="/offers"
              className="inline-flex h-11 items-center gap-2 border border-line px-5 text-xs text-ink transition-colors hover:border-ink"
            >
              العروض المرتبطة
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Campaigns() {
  return (
    <>
      <PageHero
        eyebrow="الحملات التسويقية"
        title="أربع أفكار… تصل قبل أن تُباع."
        description="حملات مقترحة لجرير تربط المنتج بلحظة يحتاجها الجمهور: العودة للدراسة، اكتشاف التقنية، عادة القراءة، ولحظة الهدية. كل حملة لها فكرة ورسالة وجمهور ومخرجات."
        aside={
          <div className="border border-line bg-paper p-6">
            <div className="grid grid-cols-2 gap-6">
              <StatBlock value="04" label="حملات مقترحة" />
              <StatBlock value="04" label="أهداف تسويقية" />
              <StatBlock value="10+" label="فكرة محتوى" />
              <StatBlock value="04" label="منصات" />
            </div>
            <p className="mt-6 border-t border-line pt-4 text-[10px] leading-5 text-muted-ink">
              جميع الحملات أفكار مقترحة لتصميم المنصة، وليست حملات رسمية قائمة
              لدى جرير.
            </p>
          </div>
        }
      >
        <div className="flex flex-wrap gap-2">
          {campaigns.map((campaign, index) => (
            <a
              key={campaign.id}
              href={`#campaign-${campaign.id}`}
              className="chip bg-paper/60"
            >
              <span className="num text-[9px] text-jarir">
                {String(index + 1).padStart(2, "0")}
              </span>
              {campaign.name}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="border-b border-line bg-paper py-14 md:py-20">
        <div className="container-wide">
          <Notice className="mb-10">
            الحملات أدناه «أفكار حملة مقترحة» صُممت ضمن هذه المنصة، ولا تمثل
            حملات رسمية أطلقتها جرير. الروابط تؤدي إلى تجارب داخل المنصة
            وتُظهر كيف يمكن تحويل الفكرة إلى تفاعل.
          </Notice>

          <Reveal className="mb-12">
            <article className="overflow-hidden border border-line bg-night text-paper">
              <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
                <div className="relative aspect-video bg-ink">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    poster="/media/videos/jarir-campaign-poster.webp"
                    aria-label="فيديو تسويقي توضيحي لجرير"
                  >
                    <source src="/media/videos/jarir-campaign.mp4" type="video/mp4" />
                    متصفحك لا يدعم تشغيل الفيديو.
                  </video>
                  <div className="pointer-events-none absolute start-5 top-5">
                    <Tag tone="white">فيديو توضيحي · فكرة حملة مقترحة</Tag>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <span className="eyebrow text-champagne">من الفكرة إلى المشهد</span>
                  <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                    كل ما تحبّه… يبدأ من هنا.
                  </h2>
                  <p className="mt-4 text-sm leading-8 text-white/60">
                    فيديو قصير يجمع عالم الكتب والتقنية والتعلّم في لحظة واحدة،
                    ويحوّل هوية جرير إلى محتوى بصري قابل للمشاركة عبر المنصات.
                  </p>
                  <div className="mt-6 border-t border-white/15 pt-4 text-[10px] leading-6 text-white/45">
                    هذا الفيديو نموذج تسويقي توضيحي صُمم للمنصة، وليس إعلانًا
                    رسميًا منشورًا من جرير.
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="space-y-8">
            {campaigns.map((campaign, index) => (
              <div key={campaign.id} id={`campaign-${campaign.id}`}>
                <CampaignBlock
                  campaign={campaign}
                  index={index}
                  reverse={index % 2 === 1}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ivory py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="05"
            eyebrow="الربط بالاستراتيجية"
            title="كل حملة… هدف واضح."
            description="لا تُصمم الحملة لجماليتها فقط. لكل فكرة هدف تسويقي ومؤشر قياس ومنصة أساسية تقود التنفيذ."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {strategy.map((row, index) => (
              <Reveal key={row.campaign} delay={index * 0.05}>
                <div className="grid h-full gap-4 border border-line bg-paper p-5 sm:grid-cols-[0.7fr_1.3fr]">
                  <div>
                    <span className="num text-[9px] text-jarir">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-lg">{row.campaign}</h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-[9px] text-muted-ink">
                      <Target className="size-3 text-jarir" />
                      {row.platform}
                    </span>
                  </div>
                  <div className="border-s border-line ps-4">
                    <div className="text-[10px] text-muted-ink">الهدف</div>
                    <p className="mt-1 text-xs leading-6 text-ink-soft">
                      {row.goal}
                    </p>
                    <div className="mt-2 text-[10px] text-muted-ink">مؤشر القياس</div>
                    <p className="mt-1 text-xs leading-6 text-ink-soft">
                      {row.kpi}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night py-14 text-paper md:py-20">
        <div className="container-wide flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="eyebrow text-champagne">من الفكرة إلى التجربة</span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight">
              الحملة لا تنتهي عند المنشور.
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/55">
              اختبر كيف تتحول فكرة «قائمة العودة» و«منتقي الهدية» و«تحدي
              القراءة» إلى تجارب تفاعلية داخل المنصة.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/interactive"
              className="inline-flex h-12 items-center gap-2 bg-jarir px-6 text-sm text-white hover:bg-jarir-dark"
            >
              جرّب المحتوى التفاعلي
              <ArrowLeft className="size-4" />
            </Link>
            <a
              href="https://www.jarir.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 border border-white/25 px-6 text-sm text-white/75 hover:border-white hover:text-white"
            >
              موقع جرير الرسمي
              <ArrowUpLeft className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
