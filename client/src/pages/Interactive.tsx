import {
  ArrowLeft,
  Check,
  Gift,
  MessageCircle,
  Palette,
  Send,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  audienceContent,
  postIdeas,
  seasonalIdeas,
} from "@/data/social";
import { ProductFinder } from "@/components/interactive/ProductFinder";
import { PollCard } from "@/components/interactive/PollCard";
import {
  Notice,
  PageHero,
  Reveal,
  SectionHeading,
  StatBlock,
  Tag,
} from "@/components/common/Primitives";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const platforms = ["الكل", "Instagram", "TikTok", "X", "YouTube"];

function ContestCard() {
  const [name, setName] = useState("");
  const [entry, setEntry] = useState("");
  const [done, setDone] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !entry.trim()) {
      toast.error("أكمل الاسم ورابط المشاركة");
      return;
    }
    setDone(true);
    toast.success("تم تسجيل مشاركتك", {
      description: "نموذج توضيحي للمسابقة المقترحة.",
    });
  };

  return (
    <div className="flex h-full flex-col border border-line bg-night p-6 text-paper md:p-8">
      <div className="flex items-center justify-between gap-3">
        <Tag tone="white">مسابقة مقترحة</Tag>
        <Trophy className="size-5 text-champagne" />
      </div>
      <h3 className="mt-5 font-display text-3xl leading-tight">
        رتّب ركنك.
      </h3>
      <p className="mt-3 text-xs leading-6 text-white/55">
        شارك صورة لمساحتك بعد ترتيبها بأدوات من جرير. الفكرة: أداة واحدة تغيّر
        إحساس المكان بالكامل.
      </p>

      <div className="mt-5 space-y-2 border-y border-white/10 py-4">
        {[
          "اختر أداة أو منتجًا واحدًا من جرير.",
          "رتّب ركنك وصوّره بإضاءة طبيعية.",
          "شارك الصورة مع وصف قصير لما تغيّر.",
        ].map((item, index) => (
          <div key={item} className="flex items-start gap-2.5 text-[11px] text-white/65">
            <span className="num text-[9px] text-champagne">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10px] text-white/45">
        <Gift className="size-3.5 text-champagne" />
        الجائزة المقترحة: بطاقة هدايا جرير
      </div>

      {done ? (
        <div className="mt-6 flex items-center gap-2 border border-white/15 bg-white/[0.04] px-4 py-3 text-xs text-white/70">
          <Check className="size-4 text-champagne" />
          وصلت مشاركتك. شكرًا لك!
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-2">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="اسمك الأول"
            aria-label="الاسم الأول"
            className="h-10 w-full border border-white/15 bg-transparent px-3 text-xs text-paper outline-none placeholder:text-white/30 focus:border-white/50"
          />
          <div className="flex gap-2">
            <input
              value={entry}
              onChange={(event) => setEntry(event.target.value)}
              placeholder="رابط الصورة"
              aria-label="رابط الصورة"
              className="h-10 min-w-0 flex-1 border border-white/15 bg-transparent px-3 text-xs text-paper outline-none placeholder:text-white/30 focus:border-white/50"
            />
            <button
              type="submit"
              className="inline-flex h-10 shrink-0 items-center gap-1.5 bg-jarir px-4 text-[11px] text-white hover:bg-jarir-dark"
            >
              <Send className="size-3" />
              شارك
            </button>
          </div>
        </form>
      )}

      <p className="mt-auto pt-4 text-[9px] leading-4 text-white/30">
        نموذج توضيحي لمسابقة مقترحة ضمن المنصة، ولا يمثل مسابقة رسمية قائمة
        لدى جرير.
      </p>
    </div>
  );
}

export default function Interactive() {
  const [platform, setPlatform] = useState("الكل");
  const filteredIdeas = useMemo(
    () =>
      platform === "الكل"
        ? postIdeas
        : postIdeas.filter((idea) => idea.platform === platform),
    [platform],
  );

  return (
    <>
      <PageHero
        eyebrow="المحتوى التفاعلي"
        title="محتوى لا يكتفي بالمشاهدة."
        description="اختبارات، استطلاعات، مسابقات، وأفكار محتوى تحوّل الجمهور من متلقٍّ إلى مشارك — وتمنح كل جمهور ما يناسبه."
        aside={
          <div className="border border-line bg-paper p-6">
            <div className="grid grid-cols-2 gap-6">
              <StatBlock value="3" label="أسئلة الاختبار" />
              <StatBlock value="4" label="جماهير مختلفة" />
              <StatBlock value="8" label="فكرة منشور" />
              <StatBlock value="4" label="مواسم" />
            </div>
            <p className="mt-6 border-t border-line pt-4 text-[10px] leading-5 text-muted-ink">
              التجارب أدناه تعمل فعليًا داخل المنصة، وهي مقترحات تطويرية.
            </p>
          </div>
        }
      >
        <div className="flex flex-wrap gap-2">
          {[
            ["#finder", "اختبار المنتج"],
            ["#poll", "استطلاع ومسابقة"],
            ["#audience", "محتوى الجمهور"],
            ["#calendar", "التقويم الموسمي"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="chip bg-paper/60">
              {label}
            </a>
          ))}
        </div>
      </PageHero>

      <section id="finder" className="border-b border-line bg-paper py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="01"
            eyebrow="اختبار اختيار المنتج"
            title="ثلاثة أسئلة… منتج أنسب."
            description="بدل أن تتصفح كل الأجهزة، أجب عن استخدامك وميزانيتك وأولوياتك، وسنبني لك قائمة قصيرة."
          />
          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <Reveal>
              <ProductFinder />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col border border-line bg-ivory p-6">
                <Sparkles className="size-5 text-jarir" />
                <h3 className="mt-4 font-display text-2xl">
                  لماذا الاختبار؟
                </h3>
                <p className="mt-2 text-xs leading-7 text-muted-ink">
                  قرار الشراء قد يكون مربكًا حين تتشابه الخيارات. الاختبار يختصر
                  الطريق ويجعل التوصية مفهومة، ويمنح المستخدم سببًا واضحًا
                  للثقة.
                </p>
                <div className="mt-5 space-y-3 border-t border-line pt-5">
                  {[
                    ["اختصار الوقت", "بدل عشرات الصفحات، ثلاث خطوات."],
                    ["توصية مبررة", "نعرض سبب الاختيار والبدائل."],
                    ["قابل للحفظ", "تحفظ النتائج في مفضلتك."],
                  ].map(([title, text]) => (
                    <div key={title}>
                      <div className="text-[11px] font-medium">{title}</div>
                      <div className="mt-0.5 text-[10px] text-muted-ink">
                        {text}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/recommendations"
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[11px] font-medium text-ink hover:text-jarir"
                >
                  جرّب التوصيات بالاهتمام
                  <ArrowLeft className="size-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="poll" className="border-b border-line bg-ivory py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="02"
            eyebrow="تفاعل مباشر"
            title="صوّت… وشارك."
            description="أدوات بسيطة تجمع صوت الجمهور وتفتح باب المشاركة، من استطلاع سريع إلى مسابقة شهرية."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal>
              <PollCard
                title="ما الذي تنتظره من موسم العودة هذا العام؟"
                description="اختر ما يهمك أكثر، وسنستخدم النتيجة لترتيب المحتوى القادم."
                className="h-full"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <ContestCard />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="audience" className="border-b border-line bg-paper py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="03"
            eyebrow="محتوى لكل جمهور"
            title="لكل اهتمام… لغة مختلفة."
            description="لا نخاطب الجميع بنفس الأسلوب. لكل جمهور نبرته وصيغته وهدفه."
          />
          <Tabs defaultValue="youth" dir="rtl" className="gap-6">
            <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-none bg-transparent p-0">
              {audienceContent.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="h-9 rounded-none border border-line bg-transparent px-4 text-[11px] text-muted-ink data-[state=active]:border-ink data-[state=active]:bg-ink data-[state=active]:text-paper data-[state=active]:shadow-none"
                >
                  {item.audience}
                </TabsTrigger>
              ))}
            </TabsList>

            {audienceContent.map((item) => (
              <TabsContent key={item.id} value={item.id}>
                <div className="grid gap-4 border border-line bg-ivory p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
                  <div>
                    <span className="eyebrow">{item.audience}</span>
                    <h3 className="mt-3 font-display text-3xl leading-tight">
                      {item.headline}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-8 text-ink-soft">
                      {item.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.formats.map((format) => (
                        <Tag key={format} tone="outline">
                          {format}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center border-s border-line ps-6">
                    <MessageCircle className="size-5 text-jarir" />
                    <div className="mt-3 text-[10px] text-muted-ink">
                      مثال على المحتوى
                    </div>
                    <blockquote className="mt-2 font-display text-lg leading-8">
                      {item.example}
                    </blockquote>
                    <Link
                      href="/social"
                      className="mt-5 inline-flex items-center gap-1.5 text-[11px] text-ink hover:text-jarir"
                    >
                      أفكار المنصات
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="border-b border-line bg-ivory py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="04"
            eyebrow="أفكار منشورات"
            title="محتوى جاهز للتنفيذ."
            description="عبارات ونصوص أصلية قابلة للاقتباس والتطوير، لكل منصة صيغتها."
            action={
              <Link
                href="/social"
                className="inline-flex items-center gap-2 border-b border-ink pb-1 text-xs font-medium text-ink hover:border-jarir hover:text-jarir"
              >
                استراتيجية التواصل
                <ArrowLeft className="size-3.5" />
              </Link>
            }
          />
          <div className="mb-6 flex flex-wrap gap-2">
            {platforms.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPlatform(item)}
                className={cn("chip", platform === item && "chip-active")}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {filteredIdeas.map((idea, index) => (
              <Reveal key={idea.id} delay={(index % 3) * 0.05}>
                <article className="flex h-full flex-col border border-line bg-paper p-5">
                  <div className="flex items-center justify-between gap-2">
                    <Tag tone="ink">{idea.platform}</Tag>
                    <span className="text-[9px] text-muted-ink">{idea.format}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg leading-7">
                    {idea.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[11px] leading-6 text-muted-ink">
                    {idea.caption}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[9px] text-muted-ink">
                    <span>{idea.audience}</span>
                    <span className="text-jarir">{idea.goal}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="calendar" className="border-b border-line bg-paper py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="05"
            eyebrow="التقويم الموسمي"
            title="لكل موسم… فكرة."
            description="خطة محتوى مرتبطة بلحظات السنة التي يبحث فيها الجمهور عن جرير."
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {seasonalIdeas.map((idea, index) => (
              <Reveal key={idea.id} delay={index * 0.05}>
                <div className="flex h-full flex-col border border-line bg-ivory p-5">
                  <div className="flex items-center justify-between">
                    <span className="num text-[9px] text-jarir">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Palette className="size-4 text-muted-ink/50" />
                  </div>
                  <div className="mt-4 text-[10px] text-muted-ink">
                    {idea.season}
                  </div>
                  <h3 className="mt-1 font-display text-xl">{idea.name}</h3>
                  <p className="mt-2 flex-1 text-[11px] leading-6 text-muted-ink">
                    {idea.idea}
                  </p>
                  <div className="mt-4 border-t border-line pt-3">
                    <div className="text-[9px] text-muted-ink">
                      {idea.channels}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-ink">
                      {idea.cta}
                      <ArrowLeft className="size-3" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Notice className="mt-8">
            أفكار المنشورات والحملات الموسمية أعلاه مقترحات أصلية للمنصة، وليست
            محتوى رسميًا منشورًا من جرير.
          </Notice>
        </div>
      </section>
    </>
  );
}
