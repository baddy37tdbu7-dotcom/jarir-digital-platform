import {
  ArrowLeft,
  ArrowUpLeft,
  Check,
  CreditCard,
  RotateCcw,
  Share2,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { Link, useParams } from "wouter";
import { toast } from "sonner";
import {
  categoryName,
  productById,
  relatedProducts,
} from "@/data/products";
import { FavoriteButton, ProductCard } from "@/components/product/ProductCard";
import {
  Notice,
  Price,
  Rating,
  Reveal,
  SectionHeading,
  Tag,
} from "@/components/common/Primitives";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatNumber } from "@/lib/format";
import NotFound from "@/pages/NotFound";

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const product = productById(params.id);

  if (!product) return <NotFound />;

  const related = relatedProducts(product, 4);
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("نُسخ رابط المنتج");
      }
    } catch {
      // user cancelled sharing
    }
  };

  return (
    <>
      <div className="border-b border-line bg-ivory">
        <div className="container-wide flex h-11 items-center gap-2 overflow-hidden text-[10px] text-muted-ink">
          <Link href="/" className="hover:text-ink">
            الرئيسية
          </Link>
          <span className="text-sand-deep">/</span>
          <Link href="/products" className="hover:text-ink">
            المنتجات
          </Link>
          <span className="text-sand-deep">/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-ink"
          >
            {categoryName(product.category)}
          </Link>
          <span className="text-sand-deep">/</span>
          <span className="truncate text-ink">{product.name}</span>
        </div>
      </div>

      <section className="border-b border-line bg-paper py-8 md:py-14">
        <div className="container-wide grid gap-8 lg:grid-cols-[1fr_1.02fr] lg:gap-14">
          <div className="relative">
            <div className="relative overflow-hidden border border-line bg-white">
              <div className="aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain p-10 md:p-16"
                />
              </div>
              {product.badge && (
                <Tag tone="ink" className="absolute start-5 top-5">
                  {product.badge}
                </Tag>
              )}
              <span className="num absolute bottom-5 end-5 text-[9px] tracking-[0.2em] text-muted-ink/60">
                SKU {product.sku}
              </span>
            </div>
            <p className="mt-3 text-[10px] text-muted-ink">
              صورة المنتج من صفحته الرسمية على موقع جرير.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[10px]">
                <span className="font-medium text-ink">{categoryName(product.category)}</span>
                <span className="text-sand-deep">·</span>
                <span className="num uppercase tracking-wider text-muted-ink">
                  {product.brand}
                </span>
              </div>
              <span className="num text-[10px] text-muted-ink">#{product.sku}</span>
            </div>

            <h1 className="mt-4 font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] text-ink">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              {product.rating ? (
                <Rating value={product.rating} reviews={product.reviews} />
              ) : (
                <span className="text-[11px] text-muted-ink">
                  متوفر لدى مكتبة جرير
                </span>
              )}
              <span className="h-3 w-px bg-line" />
              <a
                href={product.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-muted-ink hover:text-jarir"
              >
                صفحة المنتج الرسمية
                <ArrowUpLeft className="size-3" />
              </a>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-8 text-ink-soft">
              {product.description}
            </p>

            <div className="mt-7 border-y border-line py-5">
              <div className="flex items-end justify-between gap-4">
                <Price value={product.price} size="lg" />
                <span className="text-[10px] text-muted-ink">
                  السعر المعلن على موقع جرير وقت إعداد المنصة
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={product.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 bg-jarir px-6 text-sm font-medium text-white transition-colors hover:bg-jarir-dark"
              >
                عرض المنتج على موقع جرير
                <ArrowUpLeft className="size-4" />
              </a>
              <FavoriteButton
                productId={product.id}
                variant="full"
                className="flex-1"
              />
              <button
                type="button"
                onClick={share}
                aria-label="مشاركة المنتج"
                className="grid size-12 shrink-0 place-items-center border border-line text-ink transition-colors hover:border-ink"
              >
                <Share2 className="size-4" />
              </button>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Truck, label: "توصيل إلى السعودية والخليج" },
                { icon: RotateCcw, label: "استبدال وإرجاع" },
                { icon: CreditCard, label: "تقسيط مرن" },
                { icon: ShieldCheck, label: "ضمان وحماية" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-2 border border-line bg-ivory px-3 py-3 text-[10px] leading-5 text-muted-ink"
                >
                  <item.icon className="mt-0.5 size-3.5 shrink-0 text-jarir" />
                  {item.label}
                </div>
              ))}
            </div>

            <p className="mt-4 text-[10px] leading-5 text-muted-ink">
              خدمات التوصيل والاستبدال والتقسيط والضمان متاحة لدى جرير وفق
              سياساتها المعلنة على موقعها الرسمي.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ivory py-12 md:py-16">
        <div className="container-wide">
          <Tabs defaultValue="overview" dir="rtl" className="gap-8">
            <TabsList className="h-auto w-full justify-start gap-6 rounded-none border-b border-line bg-transparent p-0">
              {[
                ["overview", "نظرة عامة"],
                ["specs", "المواصفات"],
                ["delivery", "التوصيل والاستبدال"],
              ].map(([value, label]) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-xs text-muted-ink data-[state=active]:border-b-jarir data-[state=active]:bg-transparent data-[state=active]:text-ink data-[state=active]:shadow-none"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="max-w-3xl">
              <h2 className="font-display text-2xl">لماذا هذا المنتج؟</h2>
              <p className="mt-4 text-sm leading-8 text-ink-soft">
                {product.description} اخترناه ضمن كتالوج المنصة لأنه يجمع بين
                قيمة عملية وهوية تناسب جمهور جرير: من طالب يجهّز عامه الدراسي
                إلى محب تقنية يبحث عن تجربة أكمل.
              </p>
              <ul className="mt-6 space-y-3">
                {product.specs.slice(0, 3).map((spec) => (
                  <li key={spec.label} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-1 size-4 shrink-0 text-jarir" />
                    <span>
                      <span className="text-muted-ink">{spec.label}: </span>
                      {spec.value}
                    </span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="specs">
              <div className="max-w-2xl overflow-hidden border border-line">
                {product.specs.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={`grid grid-cols-[0.8fr_1.2fr] gap-4 px-5 py-3.5 text-xs ${
                      index % 2 === 0 ? "bg-paper" : "bg-ivory"
                    }`}
                  >
                    <span className="text-muted-ink">{spec.label}</span>
                    <span className="text-ink">{spec.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-muted-ink">
                المواصفات كما وردت في بيانات صفحة المنتج الرسمية على jarir.com.
              </p>
            </TabsContent>

            <TabsContent value="delivery" className="max-w-2xl">
              <h2 className="font-display text-2xl">توصيل مرن، واستبدال واضح.</h2>
              <p className="mt-4 text-sm leading-8 text-ink-soft">
                تتوفر لدى جرير خدمة التوصيل إلى السعودية والخليج، مع خيارات
                الاستلام من المعرض، وسياسات الاستبدال والإرجاع والتقسيط المعلنة
                على الموقع الرسمي.
              </p>
              <a
                href="https://www.jarir.com/return-and-exchange"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-ink hover:text-jarir"
              >
                اقرأ سياسة الاستبدال والإرجاع
                <ArrowUpLeft className="size-3.5" />
              </a>
            </TabsContent>
          </Tabs>

          <Notice className="mt-10">
            الأسعار والتوفر قد يتغيران على الموقع الرسمي. لاتخاذ قرار الشراء
            النهائي، راجع صفحة المنتج على jarir.com.
          </Notice>
        </div>
      </section>

      <section className="bg-paper py-14 md:py-20">
        <div className="container-wide">
          <SectionHeading
            eyebrow="قد يعجبك أيضًا"
            title="منتجات قريبة من ذوقك."
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
            {related.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05}>
                <ProductCard product={item} compact />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 border border-line bg-ivory p-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <Star className="mt-0.5 size-5 text-champagne" />
              <div>
                <h3 className="font-display text-lg">جرّبت هذا المنتج؟</h3>
                <p className="mt-1 text-xs text-muted-ink">
                  شارك تقييمك في مجتمع جرير، وساعد غيرك على الاختيار.
                </p>
              </div>
            </div>
            <Link
              href="/community"
              className="inline-flex h-10 items-center gap-2 border border-ink px-5 text-xs text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              أضف تقييمك
              <ArrowLeft className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
