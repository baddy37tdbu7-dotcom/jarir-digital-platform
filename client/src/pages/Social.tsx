import {
  ArrowLeft,
  ArrowUpLeft,
  Eye,
  Heart,
  Instagram,
  MousePointerClick,
  Repeat2,
  Youtube,
} from "lucide-react";
import { Link } from "wouter";
import {
  otherSocialLinks,
  socialPlatforms,
  type SocialPlatform,
} from "@/data/social";
import { TikTokIcon, XIcon } from "@/components/brand/Brand";
import {
  Notice,
  PageHero,
  Reveal,
  SectionHeading,
  StatBlock,
  Tag,
} from "@/components/common/Primitives";

const funnel = [
  {
    stage: "الوعي",
    platforms: "Instagram · TikTok",
    text: "محتوى بصري سريع يعرّف بالمنتج واللحظة الموسمية.",
    icon: Eye,
  },
  {
    stage: "الاهتمام",
    platforms: "YouTube · X",
    text: "مراجعات ونقاشات تبني الثقة وتجيب عن الأسئلة.",
    icon: Heart,
  },
  {
    stage: "القرار",
    platforms: "Instagram · X",
    text: "عروض واضحة وروابط مباشرة إلى المنتج.",
    icon: MousePointerClick,
  },
  {
    stage: "الولاء",
    platforms: "المجتمع · كل المنصات",
    text: "تحديات ومحتوى يشاركه الجمهور ويعود إليه.",
    icon: Repeat2,
  },
];

const cadence = [
  { platform: "Instagram", posts: "4–5 منشورات", format: "Reels + Carousels", kpi: "الوصول والتفاعل" },
  { platform: "TikTok", posts: "3–4 فيديوهات", format: "Short video", kpi: "المشاركة والنمو" },
  { platform: "X", posts: "يوميًا", format: "Posts + Polls", kpi: "النقاش وخدمة العملاء" },
  { platform: "YouTube", posts: "فيديو أسبوعي", format: "Review + Shorts", kpi: "مدة المشاهدة والثقة" },
];

function PlatformCard({ platform }: { platform: SocialPlatform }) {
  const Icon =
    platform.id === "instagram"
      ? Instagram
      : platform.id === "x"
        ? XIcon
        : platform.id === "tiktok"
          ? TikTokIcon
          : Youtube;

  return (
    <article className="flex h-full flex-col border border-line bg-ivory">
      <div className="flex items-center justify-between border-b border-line px-6 py-5">
        <div className="flex items-center gap-3">
          <span
            className="grid size-10 place-items-center text-white"
            style={{ backgroundColor: platform.color }}
          >
            <Icon className="size-4.5" />
          </span>
          <div>
            <h3 className="font-display text-xl">{platform.name}</h3>
            <p className="num text-[10px] text-muted-ink">{platform.handle}</p>
          </div>
        </div>
        <a
          href={platform.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`زيارة حساب ${platform.name} الرسمي`}
          className="grid size-9 place-items-center border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          <ArrowUpLeft className="size-3.5" />
        </a>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Tag tone="outline">{platform.role}</Tag>
        <p className="mt-3 text-xs leading-7 text-ink-soft">
          {platform.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {platform.formats.map((format) => (
            <span
              key={format}
              className="border border-line px-2 py-1 text-[9px] text-muted-ink"
            >
              {format}
            </span>
          ))}
        </div>

        <div className="mt-5 border-t border-line pt-4">
          <div className="text-[9px] text-muted-ink">أفكار محتوى</div>
          <ul className="mt-2 space-y-1.5">
            {platform.ideas.map((idea) => (
              <li
                key={idea}
                className="flex items-start gap-2 text-[11px] leading-5 text-ink-soft"
              >
                <span className="mt-2 block size-1 shrink-0 bg-jarir" />
                {idea}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex items-center justify-between pt-5 text-[9px] text-muted-ink">
          <span>المؤشر الأساسي</span>
          <span className="text-ink">{platform.kpi}</span>
        </div>
      </div>
    </article>
  );
}

export default function Social() {
  return (
    <>
      <PageHero
        eyebrow="وسائل التواصل الاجتماعي"
        title="أربع منصات… ولكلٍّ دور."
        description="لا نكرر المحتوى نفسه في كل مكان. لكل منصة جمهورها وصيغتها وهدفها — والروابط أدناه رسمية وموثقة من موقع جرير."
        aside={
          <div className="border border-line bg-paper p-6">
            <div className="grid grid-cols-2 gap-6">
              <StatBlock value="04" label="منصات أساسية" />
              <StatBlock value="07" label="حسابات رسمية" />
              <StatBlock value="4–5" label="منشورات أسبوعيًا" />
              <StatBlock value="360°" label="رحلة جمهور متكاملة" />
            </div>
            <a
              href="https://www.jarir.com/company-profile"
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[10px] text-muted-ink hover:text-ink"
            >
              الحسابات الرسمية على موقع جرير
              <ArrowUpLeft className="size-3.5" />
            </a>
          </div>
        }
      />

      <section className="border-b border-line bg-paper py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="01"
            eyebrow="المنصات"
            title="لكل منصة… لغة."
            description="Instagram للجمال والعروض، TikTok للسرعة والتفاعل، X للتحديث والنقاش، وYouTube للعمق والثقة."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {socialPlatforms.map((platform, index) => (
              <Reveal key={platform.id} delay={(index % 2) * 0.06}>
                <PlatformCard platform={platform} />
              </Reveal>
            ))}
          </div>
          <Notice className="mt-8">
            جميع الروابط تؤدي إلى الحسابات الرسمية المذكورة على موقع جرير
            (jarir.com). لم نخترع روابط أو حسابات إضافية.
          </Notice>
        </div>
      </section>

      <section className="border-b border-line bg-ivory py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="02"
            eyebrow="رحلة الجمهور"
            title="من المشاهدة… إلى العودة."
            description="كل منصة تخدم مرحلة مختلفة من الرحلة، والانتقال بينها هو ما يصنع نتيجة تسويقية."
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {funnel.map((item, index) => (
              <Reveal key={item.stage} delay={index * 0.06}>
                <div className="relative flex h-full flex-col border border-line bg-paper p-5">
                  <span className="num absolute end-4 top-4 text-3xl font-semibold text-sand/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <item.icon className="size-5 text-jarir" />
                  <h3 className="mt-4 font-display text-xl">{item.stage}</h3>
                  <div className="mt-1 text-[9px] text-jarir">{item.platforms}</div>
                  <p className="mt-3 text-[11px] leading-6 text-muted-ink">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="03"
            eyebrow="الإيقاع المقترح"
            title="خطة نشر قابلة للتنفيذ."
            description="إيقاع أسبوعي مقترح يوازن بين الوصول والتفاعل والثقة، مع مؤشر أساسي لكل منصة."
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse border border-line bg-ivory text-start">
              <thead>
                <tr className="border-b border-line bg-sand/30 text-[10px] text-muted-ink">
                  <th className="p-3 text-start font-medium">المنصة</th>
                  <th className="p-3 text-start font-medium">عدد المنشورات</th>
                  <th className="p-3 text-start font-medium">الصيغة الأساسية</th>
                  <th className="p-3 text-start font-medium">المؤشر الأساسي</th>
                </tr>
              </thead>
              <tbody>
                {cadence.map((row) => (
                  <tr key={row.platform} className="border-b border-line last:border-0">
                    <td className="p-3 text-xs font-medium">{row.platform}</td>
                    <td className="num p-3 text-[11px] text-ink-soft">{row.posts}</td>
                    <td className="p-3 text-[11px] text-ink-soft">{row.format}</td>
                    <td className="p-3 text-[11px] text-jarir">{row.kpi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[10px] text-muted-ink">
            الإيقاع المقترح تصور تصميمي للمنصة، وليس جدول نشر رسميًا لجرير.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-ivory py-14 md:py-20">
        <div className="container-wide grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              number="04"
              eyebrow="النبرة"
              title="نبرة واحدة… بثلاث قواعد."
              className="mb-7"
            />
            <div className="space-y-3">
              {[
                {
                  title: "واضحة",
                  text: "جملة واحدة تكفي. نقول ما يهم المستخدم، وما الخطوة التالية.",
                },
                {
                  title: "دافئة",
                  text: "نتحدث كمن يعرف الجمهور: طالب، قارئ، أو أب يجهّز عامًا دراسيًا.",
                },
                {
                  title: "بلا مبالغة",
                  text: "لا نعد بما لا نضمنه. المنتج والسعر والمعلومة تأتي أولًا.",
                },
              ].map((item) => (
                <div key={item.title} className="border border-line bg-paper p-5">
                  <h3 className="font-display text-xl">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-6 text-muted-ink">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-line bg-night p-6 text-paper md:p-8">
            <span className="eyebrow text-champagne">حسابات رسمية أخرى</span>
            <h3 className="mt-3 font-display text-2xl">
              جرير حاضر في منصات أكثر.
            </h3>
            <p className="mt-2 text-xs leading-6 text-white/50">
              روابط إضافية رسمية كما تظهر على موقع جرير، دون أي روابط مُخترعة.
            </p>
            <div className="mt-6 space-y-2">
              {otherSocialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border border-white/10 px-4 py-3 text-xs text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  {link.name}
                  <ArrowUpLeft className="size-3.5" />
                </a>
              ))}
            </div>
            <Link
              href="/interactive"
              className="mt-6 inline-flex items-center gap-2 text-[11px] text-white/60 hover:text-white"
            >
              أفكار منشورات جاهزة
              <ArrowLeft className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
