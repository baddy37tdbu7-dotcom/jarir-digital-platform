import {
  ArrowLeft,
  Bookmark,
  Brain,
  Check,
  Sparkles,
  Wallet,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  interestDescriptions,
  interestLabels,
  products,
  type InterestId,
} from "@/data/products";
import { useFavorites } from "@/context/FavoritesContext";
import { ProductCard } from "@/components/product/ProductCard";
import {
  Notice,
  PageHero,
  Price,
  Reveal,
  SectionHeading,
  Tag,
} from "@/components/common/Primitives";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const interests = Object.keys(interestLabels) as InterestId[];

export default function Recommendations() {
  const [selected, setSelected] = useState<InterestId | null>(null);
  const [budget, setBudget] = useState(6000);
  const { addMany } = useFavorites();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get("interest") as InterestId | null;
    if (interest && interests.includes(interest)) setSelected(interest);
  }, []);

  const matching = useMemo(() => {
    if (!selected) return [];
    return products.filter((product) => product.interests.includes(selected));
  }, [selected]);

  const withinBudget = useMemo(
    () => matching.filter((product) => product.price <= budget),
    [matching, budget],
  );

  const results = withinBudget.length > 0 ? withinBudget : matching;
  const relaxed = withinBudget.length === 0 && matching.length > 0;

  const offerItems = results.slice(0, 3);
  const offerTotal = offerItems.reduce((sum, product) => sum + product.price, 0);

  return (
    <>
      <PageHero
        eyebrow="التوصيات الشخصية"
        title="قائمة قصيرة… تشبهك."
        description="أخبرنا بما يهمك وبميزانيتك، وستبني المنصة لك قائمة مناسبة من كتالوج جرير — بدل أن تتصفح عشرات الصفحات."
        aside={
          <div className="border border-line bg-paper p-6">
            <div className="flex items-center justify-between">
              <Tag tone="outline">
                <Sparkles className="size-3" />
                مقترح تطويري للمنصة
              </Tag>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { icon: Brain, title: "اهتمامك", text: "نبدأ من الفئة التي تهمك." },
                { icon: Wallet, title: "ميزانيتك", text: "نرشّح ما يناسب نطاقك." },
                { icon: Check, title: "اختيارك", text: "تحفظ ما يعجبك وتقارن." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center border border-line">
                    <item.icon className="size-3.5 text-jarir" />
                  </span>
                  <div>
                    <div className="text-xs font-medium">{item.title}</div>
                    <div className="mt-0.5 text-[10px] text-muted-ink">
                      {item.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-line pt-4 text-[10px] leading-5 text-muted-ink">
              ميزة التوصيات «مقترح تطويري» لهذه المنصة، وليست ميزة مثبتة
              كممارسة قائمة لدى جرير.
            </p>
          </div>
        }
      />

      <section className="border-b border-line bg-paper py-12 md:py-16">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
            <aside className="h-fit border border-line bg-ivory p-6 lg:sticky lg:top-[170px]">
              <div className="flex items-center gap-2">
                <span className="section-number">01</span>
                <span className="text-[10px] text-muted-ink">اهتمامك</span>
              </div>
              <h2 className="mt-2 font-display text-2xl">ماذا تبحث عنه اليوم؟</h2>
              <p className="mt-2 text-xs leading-6 text-muted-ink">
                اختر مجالًا واحدًا لتظهر لك توصيات مرتبطة به.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() =>
                      setSelected(interest === selected ? null : interest)
                    }
                    className={cn(
                      "chip",
                      selected === interest && "chip-active",
                    )}
                  >
                    {interestLabels[interest]}
                  </button>
                ))}
              </div>

              {selected && (
                <p className="mt-3 text-[10px] text-muted-ink">
                  {interestDescriptions[selected]}
                </p>
              )}

              <div className="mt-7 border-t border-line pt-5">
                <div className="flex items-center justify-between">
                  <span className="section-number">02</span>
                  <span className="text-[10px] text-muted-ink">ميزانيتك</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <h3 className="font-display text-lg">حتى</h3>
                  <span className="num text-sm font-semibold">
                    {formatPrice(budget)}
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={6000}
                  step={50}
                  value={budget}
                  onChange={(event) => setBudget(Number(event.target.value))}
                  aria-label="الحد الأعلى للميزانية"
                  className="mt-4 h-1 w-full accent-[#e20714]"
                />
                <div className="mt-2 flex justify-between text-[9px] text-muted-ink">
                  <span>50 ر.س</span>
                  <span>6,000 ر.س</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setBudget(6000);
                }}
                className="mt-6 w-full border border-line py-2.5 text-[11px] text-muted-ink transition-colors hover:border-ink hover:text-ink"
              >
                إعادة ضبط الاختيارات
              </button>
            </aside>

            <div>
              {!selected ? (
                <div className="flex min-h-[480px] flex-col items-center justify-center border border-dashed border-sand-deep bg-ivory px-6 text-center">
                  <span className="grid size-16 place-items-center rounded-full border border-line bg-paper">
                    <Sparkles className="size-6 text-jarir" />
                  </span>
                  <h2 className="mt-5 font-display text-2xl">
                    ابدأ باختيار اهتمامك
                  </h2>
                  <p className="mt-2 max-w-sm text-xs leading-6 text-muted-ink">
                    اختر تقنية، دراسة، قراءة، مكتب، إكسسوارات أو ألعاب — وستظهر
                    لك 3 اقتراحات مناسبة فورًا.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {(["tech", "reading", "study"] as InterestId[]).map(
                      (interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => setSelected(interest)}
                          className="chip"
                        >
                          {interestLabels[interest]}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <span className="eyebrow">
                        توصيات {interestLabels[selected]}
                      </span>
                      <h2 className="mt-1 font-display text-2xl">
                        {results.length} اقتراحًا مناسبًا
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        addMany(results.slice(0, 4).map((product) => product.id))
                      }
                      className="inline-flex h-9 items-center gap-1.5 border border-ink px-3 text-[10px] text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      <Bookmark className="size-3" />
                      احفظ التوصيات
                    </button>
                  </div>

                  {relaxed && (
                    <Notice className="mb-5" tone="red">
                      لا توجد منتجات ضمن هذه الميزانية في هذا الاهتمام. عرضنا
                      لك أقرب الخيارات، ويمكنك رفع الميزانية لرؤية بدائل أخرى.
                    </Notice>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {results.map((product, index) => (
                      <Reveal key={product.id} delay={(index % 3) * 0.05}>
                        <ProductCard product={product} />
                      </Reveal>
                    ))}
                  </div>

                  <div className="mt-8 border border-line bg-ivory p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="grid size-9 place-items-center border border-champagne/50">
                          <Sparkles className="size-4 text-champagne" />
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-xl">
                              عرض مخصص لهذا الاهتمام
                            </h3>
                            <Tag tone="champagne">فكرة عرض مخصصة</Tag>
                          </div>
                          <p className="mt-1.5 max-w-lg text-xs leading-6 text-muted-ink">
                            جمعنا لك ثلاث قطع تكمل بعضها. احفظها أو شاركها،
                            والإجمالي محسوب من الأسعار المعلنة.
                          </p>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="text-[10px] text-muted-ink">الإجمالي</div>
                        <Price value={offerTotal} size="lg" />
                      </div>
                    </div>
                    <div className="mt-5 grid gap-2 border-t border-line pt-4 sm:grid-cols-3">
                      {offerItems.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-2.5 bg-paper p-2.5"
                        >
                          <span className="grid size-12 shrink-0 place-items-center bg-white p-1">
                            <img
                              src={product.image}
                              alt=""
                              className="h-full w-full object-contain"
                            />
                          </span>
                          <span className="line-clamp-2 text-[10px] leading-5 text-ink-soft">
                            {product.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => addMany(offerItems.map((p) => p.id))}
                        className="inline-flex h-10 items-center gap-2 bg-ink px-4 text-[11px] text-paper transition-colors hover:bg-jarir"
                      >
                        <Bookmark className="size-3.5" />
                        احفظ العرض
                      </button>
                      <Link
                        href="/offers"
                        className="inline-flex h-10 items-center gap-2 border border-line px-4 text-[11px] text-ink hover:border-ink"
                      >
                        باقات أخرى
                        <ArrowLeft className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ivory py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="03"
            eyebrow="كيف تعمل؟"
            title="توصية تفهم سياقك."
            description="الفكرة ليست عرض منتجات عشوائية، بل بناء قائمة قصيرة من ثلاث إشارات واضحة."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "اهتمامك المعلن",
                text: "تختار الفئة بنفسك، فلا نخمّن ما لا تعرفه.",
              },
              {
                number: "02",
                title: "ميزانيتك",
                text: "نرشّح المنتجات داخل النطاق الذي حددته.",
              },
              {
                number: "03",
                title: "سلوكك على المنصة",
                text: "في نسخة كاملة، تُثري المشاهدات والحفظ التوصيات — وهذه ميزة مقترحة.",
              },
            ].map((item, index) => (
              <Reveal key={item.number} delay={index * 0.06}>
                <div className="h-full border border-line bg-paper p-6">
                  <span className="section-number">{item.number}</span>
                  <h3 className="mt-4 font-display text-xl">{item.title}</h3>
                  <p className="mt-2 text-xs leading-7 text-muted-ink">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border border-line bg-night p-6 text-paper sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-xl">تبحث عن منتج محدد؟</h3>
              <p className="mt-1 text-xs text-white/50">
                جرّب اختبار «اختيار المنتج» في المحتوى التفاعلي.
              </p>
            </div>
            <Link
              href="/interactive"
              className="inline-flex h-10 items-center gap-2 bg-jarir px-5 text-[11px] text-white hover:bg-jarir-dark"
            >
              ابدأ الاختبار
              <ArrowLeft className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
