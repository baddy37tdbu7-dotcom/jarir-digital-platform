import { ArrowLeft, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { bestSellers, categoryName } from "@/data/products";
import { FavoriteButton } from "@/components/product/ProductCard";
import {
  Notice,
  PageHero,
  Price,
  Rating,
  Reveal,
  SectionHeading,
  StatBlock,
  Tag,
} from "@/components/common/Primitives";
import { formatNumber } from "@/lib/format";

export default function BestSellers() {
  const top = bestSellers.slice(0, 3);
  const rest = bestSellers.slice(3);

  return (
    <>
      <PageHero
        eyebrow="الأكثر مبيعًا"
        title="ما يتصدر… يبدأ من هنا."
        description="قائمة استرشادية للمنتجات الأكثر تفاعلًا على المنصة — من الروايات التي يتحدث عنها الجميع إلى الأجهزة التي يبحث عنها الطلاب والمهنيون."
        aside={
          <div className="border border-line bg-paper p-6">
            <div className="flex items-center gap-2 text-jarir">
              <TrendingUp className="size-4" />
              <span className="eyebrow text-jarir">إشارات هذا الأسبوع</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-6">
              <StatBlock value="141" label="تقييمًا على رواية خوف 1" />
              <StatBlock value="3.4%" label="تحويل الرواية" />
              <StatBlock value="24.8K" label="مشاهدة آيفون 17 برو" />
              <StatBlock value="8" label="منتجات في القائمة" />
            </div>
            <p className="mt-5 border-t border-line pt-4 text-[10px] leading-5 text-muted-ink">
              أرقام التفاعل توضيحية ضمن المنصة، وتقييمات المنتجات من صفحاتها
              الرسمية.
            </p>
          </div>
        }
      />

      <section className="border-b border-line bg-paper py-14 md:py-20">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="section-number">01</span>
              <h2 className="mt-2 font-display text-2xl">المنصة الأولى</h2>
            </div>
            <Tag tone="outline">ترتيب استرشادي · بيانات توضيحية</Tag>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {top.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.07}>
                <article className="group flex h-full flex-col border border-line bg-ivory">
                  <div className="relative overflow-hidden bg-white">
                    <div className="aspect-[4/3] p-8">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span className="num pointer-events-none absolute -bottom-3 start-3 text-[6.5rem] font-bold leading-none text-sand/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="num absolute start-3 top-3 bg-ink px-2 py-1 text-[10px] font-semibold text-paper">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                    <FavoriteButton
                      productId={product.id}
                      className="absolute end-4 top-4"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-line p-6">
                    <div className="flex items-center justify-between gap-2 text-[10px] text-muted-ink">
                      <span>{categoryName(product.category)}</span>
                      <span className="num uppercase">{product.brand}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl leading-8">
                      <Link
                        href={`/products/${product.id}`}
                        className="hover:text-jarir"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted-ink">
                      {product.description}
                    </p>
                    <div className="mt-3">
                      {product.rating ? (
                        <Rating value={product.rating} reviews={product.reviews} />
                      ) : (
                        <span className="text-[10px] text-muted-ink">
                          متوفر لدى جرير
                        </span>
                      )}
                    </div>
                    <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
                      <Price value={product.price} />
                      <Link
                        href={`/products/${product.id}`}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink hover:text-jarir"
                      >
                        عرض المنتج
                        <ArrowLeft className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ivory py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            number="02"
            eyebrow="بقية القائمة"
            title="خيارات يتنافس عليها الجمهور."
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

          <div className="border-t border-line">
            {rest.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.04}>
                <div className="grid grid-cols-[28px_72px_1fr_auto] items-center gap-3 border-b border-line py-4 sm:grid-cols-[40px_88px_1fr_auto_auto] sm:gap-5">
                  <span className="num text-lg font-semibold text-sand-deep">
                    {String(index + 4).padStart(2, "0")}
                  </span>
                  <Link
                    href={`/products/${product.id}`}
                    className="grid aspect-square place-items-center bg-white p-2"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </Link>
                  <div className="min-w-0">
                    <div className="text-[9px] text-muted-ink">
                      {categoryName(product.category)} · {product.brand}
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="mt-1 line-clamp-2 block text-sm font-medium leading-6 text-ink hover:text-jarir sm:line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    {product.rating && (
                      <div className="mt-1">
                        <Rating value={product.rating} reviews={product.reviews} />
                      </div>
                    )}
                  </div>
                  <div className="hidden text-end sm:block">
                    <Price value={product.price} size="sm" />
                  </div>
                  <div className="flex items-center gap-2">
                    <FavoriteButton productId={product.id} />
                    <Link
                      href={`/products/${product.id}`}
                      className="hidden h-9 items-center border border-line px-3 text-[10px] text-ink hover:border-ink md:inline-flex"
                    >
                      عرض المنتج
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Notice className="md:col-span-2">
              الترتيب مبني على إشارات تفاعل توضيحية داخل المنصة (مشاهدات،
              حفظ، نقرات، تقييمات). تقييمات المنتجات وعدد المراجعات مأخوذة من
              صفحات المنتجات الرسمية على jarir.com، وليست تصنيفًا رسميًا
              لمبيعات جرير.
            </Notice>
            <div className="flex items-center justify-between border border-line bg-paper px-5 py-4">
              <span className="text-[11px] text-muted-ink">
                {formatNumber(8)} منتجات في القائمة
              </span>
              <Link
                href="/recommendations"
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink hover:text-jarir"
              >
                اقترح لي
                <ArrowLeft className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
