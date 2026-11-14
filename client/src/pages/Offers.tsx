import {
  ArrowLeft,
  Bookmark,
  BookOpen,
  Gift,
  Percent,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";
import {
  productById,
  products,
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

interface Bundle {
  id: string;
  name: string;
  description: string;
  productIds: string[];
  note: string;
}

const bundles: Bundle[] = [
  {
    id: "university",
    name: "باقة بداية الجامعة",
    description:
      "لابتوب عملي، حامل مريح، وقلم دقيق — كل ما تحتاجه لأول فصل دراسي.",
    productIds: [
      "hp-15-fd1010nx-laptops-678436",
      "royal-falcon-laptop-stands-667916",
      "faber-castell-tk-fine-9715-mechanical-pencils-98898",
      "roco-premium-papers-189729",
    ],
    note: "مختارة لطلاب الجامعة",
  },
  {
    id: "desk",
    name: "باقة المكتب الهادئ",
    description:
      "تابلت خفيف مع حامل وقلم وورق — مساحة عمل مرتبة وإبداع بلا حدود.",
    productIds: [
      "apple-ipad-air-11-m4-tablet-pc-678790",
      "royal-falcon-laptop-stands-667916",
      "faber-castell-tk-fine-9715-mechanical-pencils-98898",
      "roco-premium-papers-189729",
    ],
    note: "للمصممين والطلاب",
  },
  {
    id: "cinema",
    name: "باقة سينما العائلة",
    description:
      "شاشة كبيرة، صوت أعمق، وجهاز ألعاب — اجعل بيتك وجهة الترفيه الأولى.",
    productIds: [
      "haier-h6f-smart-tv-688118",
      "ajs-speaker-678733",
      "sony-playstation-5-slim-gaming-consoles-and-handheld-690746",
    ],
    note: "للسهرات والعائلة",
  },
  {
    id: "reader",
    name: "باقة قارئ الشهر",
    description:
      "رواية، كتاب فكر، مرجع دراسة، وكتاب إبداعي — أربع بدايات مختلفة لشهر واحد.",
    productIds: [
      "arabic-books-439941",
      "arabic-books-643393",
      "arabic-books-688126",
      "dover-publications-english-books-579857",
    ],
    note: "لمحبي القراءة",
  },
];

const seasonalOffers = [
  {
    id: "school",
    title: "أسبوع العودة",
    label: "فكرة عرض مقترحة",
    text: "خصم مقترح 10% عند شراء أي باقة من باقات العودة للمدارس أو الجامعات، مع تغليف هدايا جرير للمستلزمات المختارة.",
    cta: "اختر باقتك",
    icon: Percent,
    tone: "red" as const,
  },
  {
    id: "gift",
    title: "هدية تحت 100 ريال",
    label: "فكرة عرض مقترحة",
    text: "ثلاث أفكار هدايا أنيقة بميزانية بسيطة: كتاب، لعبة عائلية، وإكسسوار مكتبي — مع خدمة تغليف الهدايا المتاحة في جرير.",
    cta: "أفكار الهدايا",
    icon: Gift,
    tone: "ink" as const,
  },
  {
    id: "books",
    title: "كتابان والثالث هدية",
    label: "فكرة عرض مقترحة",
    text: "تصور عرض للقرّاء: اختر كتابين من رفّ الروايات، واحصل على كتاب ثالث مختار كهدية من جرير.",
    cta: "اكتشف الرفّ",
    icon: BookOpen,
    tone: "sand" as const,
  },
];

export default function Offers() {
  const { addMany } = useFavorites();
  const weekly = products.filter((product) =>
    [
      "apple-iphone-17-pro-smartphones-666727",
      "hp-15-fd1010nx-laptops-678436",
      "haier-h6f-smart-tv-688118",
      "arabic-books-439941",
    ].includes(product.id),
  );

  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="العروض والباقات"
        title="عروض تفتح الشهر."
        description="من جهاز يبدأ به عامك إلى كتاب يبقى معك — أسعار معلنة من جرير، وباقات مختارة، وأفكار عروض مقترحة بوضوح."
        aside={
          <div className="border border-white/15 bg-white/[0.04] p-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-champagne">عرض الأسبوع</span>
              <Tag tone="white">سعر معلن</Tag>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <span className="grid size-20 shrink-0 place-items-center bg-white p-2">
                <img
                  src="/media/products/apple-iphone-17-pro-smartphones-666727.webp"
                  alt="آيفون 17 برو"
                  className="h-full w-full object-contain"
                />
              </span>
              <div>
                <div className="text-sm text-paper">آيفون 17 برو</div>
                <div className="mt-1 text-[10px] text-white/45">512 جيجابايت</div>
                <div className="num mt-2 text-xl font-semibold text-champagne">
                  {formatPrice(5499)}
                </div>
              </div>
            </div>
            <Link
              href="/products/apple-iphone-17-pro-smartphones-666727"
              className="mt-5 flex h-10 items-center justify-center gap-2 border border-white/20 text-xs text-white/75 transition-colors hover:border-white hover:text-white"
            >
              عرض المنتج
              <ArrowLeft className="size-3.5" />
            </Link>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#bundles"
            className="inline-flex h-11 items-center gap-2 bg-jarir px-5 text-xs font-medium text-white hover:bg-jarir-dark"
          >
            <Sparkles className="size-4" />
            اكتشف الباقات
          </a>
          <Link
            href="/campaigns"
            className="inline-flex h-11 items-center gap-2 border border-white/25 px-5 text-xs text-white/75 transition-colors hover:border-white hover:text-white"
          >
            الحملات المرتبطة
          </Link>
        </div>
      </PageHero>

      <section className="border-b border-line bg-paper py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="01"
            eyebrow="عروض أسبوعية"
            title="مختارات هذا الأسبوع."
            description="منتجات بارزة من كتالوج جرير بأسعارها المعلنة. الأسعار قد تتغير على الموقع الرسمي."
            action={
              <Link
                href="/products"
                className="inline-flex items-center gap-2 border-b border-ink pb-1 text-xs font-medium text-ink hover:border-jarir hover:text-jarir"
              >
                كل المنتجات
                <ArrowLeft className="size-3.5" />
              </Link>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {weekly.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 0.05}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="bundles" className="border-b border-line bg-ivory py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="02"
            eyebrow="باقات مقترحة"
            title="حِزم مختارة… بأسعار معلنة."
            description="اخترنا لك منتجات تكمل بعضها، واحتسبنا الإجمالي من الأسعار المعلنة على موقع جرير. احفظ الباقة كاملة في مفضلتك بضغطة واحدة."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {bundles.map((bundle, index) => {
              const items = bundle.productIds
                .map((id) => productById(id))
                .filter(Boolean);
              const total = items.reduce(
                (sum, item) => sum + (item?.price ?? 0),
                0,
              );

              return (
                <Reveal key={bundle.id} delay={index * 0.06}>
                  <article className="flex h-full flex-col border border-line bg-paper">
                    <div className="grid grid-cols-4 gap-px bg-line">
                      {items.map((item) =>
                        item ? (
                          <Link
                            key={item.id}
                            href={`/products/${item.id}`}
                            className="grid aspect-square place-items-center bg-white p-3 transition-colors hover:bg-sand/20"
                            title={item.name}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              className="h-full w-full object-contain"
                            />
                          </Link>
                        ) : null,
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-3">
                        <Tag tone="champagne">باقة مقترحة</Tag>
                        <span className="text-[10px] text-muted-ink">
                          {bundle.note}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-2xl">
                        {bundle.name}
                      </h3>
                      <p className="mt-2 text-xs leading-6 text-muted-ink">
                        {bundle.description}
                      </p>

                      <ul className="mt-4 space-y-2 border-t border-line pt-4">
                        {items.map((item) =>
                          item ? (
                            <li
                              key={item.id}
                              className="flex items-start justify-between gap-3 text-[11px]"
                            >
                              <span className="line-clamp-1 text-ink-soft">
                                {item.name}
                              </span>
                              <span className="num shrink-0 text-muted-ink">
                                {item.price.toLocaleString("en-US")}
                              </span>
                            </li>
                          ) : null,
                        )}
                      </ul>

                      <div className="mt-auto pt-5">
                        <div className="flex items-end justify-between border-t border-line pt-4">
                          <span className="text-[11px] text-muted-ink">
                            الإجمالي من الأسعار المعلنة
                          </span>
                          <Price value={total} size="md" />
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button
                            type="button"
                            onClick={() => addMany(bundle.productIds)}
                            className="inline-flex h-11 flex-1 items-center justify-center gap-2 bg-ink text-xs font-medium text-paper transition-colors hover:bg-jarir"
                          >
                            <Bookmark className="size-3.5" />
                            احفظ الباقة
                          </button>
                          <Link
                            href={`/products/${bundle.productIds[0]}`}
                            className="grid size-11 shrink-0 place-items-center border border-line text-ink transition-colors hover:border-ink"
                            aria-label="عرض أول منتج في الباقة"
                          >
                            <ArrowLeft className="size-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="03"
            eyebrow="أفكار عروض موسمية"
            title="عروض لها مناسبة."
            description="تصورات عروض موسمية مقترحة يمكن تنفيذها على المنصة والمعارض — موسومة بوضوح لأنها ليست عروضًا رسمية قائمة."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {seasonalOffers.map((offer, index) => {
              const tone = offer.tone;
              const Icon = offer.icon;
              return (
                <Reveal key={offer.id} delay={index * 0.06}>
                  <article
                    className={`flex h-full flex-col border p-6 ${
                      tone === "red"
                        ? "border-jarir/30 bg-jarir text-white"
                        : tone === "ink"
                          ? "border-night bg-night text-paper"
                          : "border-sand-deep bg-sand/50 text-ink"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        className={`size-6 ${
                          tone === "sand" ? "text-jarir" : "text-champagne"
                        }`}
                      />
                      <span
                        className={`text-[9px] ${
                          tone === "sand" ? "text-muted-ink" : "text-white/55"
                        }`}
                      >
                        {offer.label}
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-2xl">{offer.title}</h3>
                    <p
                      className={`mt-3 text-xs leading-7 ${
                        tone === "sand" ? "text-ink-soft" : "text-white/70"
                      }`}
                    >
                      {offer.text}
                    </p>
                    <Link
                      href={
                        offer.id === "gift"
                          ? "/recommendations"
                          : offer.id === "books"
                            ? "/products?category=books"
                            : "/interactive"
                      }
                      className={`mt-auto inline-flex items-center gap-2 pt-6 text-[11px] font-medium ${
                        tone === "sand"
                          ? "text-ink hover:text-jarir"
                          : "text-white hover:text-champagne"
                      }`}
                    >
                      {offer.cta}
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <Notice className="mt-8">
            العروض الموسمية أعلاه «أفكار عرض مقترحة» وليست عروضًا رسمية قائمة
            لدى جرير. النسب والتوفير المذكورة تصورات تصميمية للعرض فقط. الأسعار
            الفعلية للباقات محسوبة من أسعار المنتجات المعلنة على الموقع الرسمي.
          </Notice>
        </div>
      </section>

      <section className="bg-ivory py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="04"
            eyebrow="كيف تستفيد؟"
            title="ثلاث خطوات… وعرضك جاهز."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "اختر",
                text: "حدد الباقة أو المنتج الذي يناسب مرحلتك: دراسة، مكتب، قراءة، أو ترفيه.",
              },
              {
                step: "02",
                title: "احفظ",
                text: "أضف الباقة إلى مفضلتك لتعود إليها، وشاركها مع من يشاركك الاهتمام.",
              },
              {
                step: "03",
                title: "أكمل من جرير",
                text: "انتقل إلى صفحة المنتج الرسمية لإتمام الشراء والاستفادة من خدمات جرير.",
              },
            ].map((item, index) => (
              <Reveal key={item.step} delay={index * 0.06}>
                <div className="flex h-full gap-5 border border-line bg-paper p-6">
                  <span className="section-number pt-1">{item.step}</span>
                  <div>
                    <h3 className="font-display text-xl">{item.title}</h3>
                    <p className="mt-2 text-xs leading-7 text-muted-ink">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
