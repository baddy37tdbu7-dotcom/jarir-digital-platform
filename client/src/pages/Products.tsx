import { ArrowUpLeft, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  categories,
  categoryName,
  products,
  type CategoryId,
} from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import {
  Notice,
  PageHero,
  Reveal,
  StatBlock,
} from "@/components/common/Primitives";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "الأكثر صلة" },
  { value: "price-asc", label: "السعر: من الأقل" },
  { value: "price-desc", label: "السعر: من الأعلى" },
  { value: "rating", label: "الأعلى تقييمًا" },
];

const brands = Array.from(new Set(products.map((product) => product.brand)));

export default function Products() {
  const [, navigate] = useLocation();
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [brand, setBrand] = useState("all");
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(6000);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("category") as CategoryId | null;
    if (fromUrl && categories.some((item) => item.id === fromUrl)) {
      setCategory(fromUrl);
    }
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let list = products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesBrand = brand === "all" || product.brand === brand;
      const matchesPrice = product.price <= maxPrice;
      const matchesQuery =
        !normalized ||
        [product.name, product.brand, categoryName(product.category), product.description]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return matchesCategory && matchesBrand && matchesPrice && matchesQuery;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating")
      list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    return list;
  }, [category, brand, maxPrice, query, sort]);

  const reset = () => {
    setCategory("all");
    setBrand("all");
    setQuery("");
    setMaxPrice(6000);
    setSort("recommended");
    navigate("/products");
  };

  const activeFilters =
    (category !== "all" ? 1 : 0) +
    (brand !== "all" ? 1 : 0) +
    (query ? 1 : 0) +
    (maxPrice < 6000 ? 1 : 0);

  return (
    <>
      <PageHero
        eyebrow="كتالوج جرير"
        title="كل ما تحتاجه، مرتّبًا كما تحب."
        description="من الكتاب إلى الجهاز، ابحث وصفِّ ورتّب — لتصل إلى المنتج المناسب في خطوات قليلة. المنتجات والأسعار والصور من صفحات جرير الرسمية."
        aside={
          <div className="border border-line bg-paper p-6">
            <div className="grid grid-cols-2 gap-6">
              <StatBlock value="20" label="منتجًا موثقًا" />
              <StatBlock value="8" label="أقسام" />
              <StatBlock value="11" label="علامة تجارية" />
              <StatBlock value="SAR" label="الأسعار بالريال" />
            </div>
            <a
              href="https://www.jarir.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[11px] text-muted-ink hover:text-ink"
            >
              زيارة كتالوج جرير الكامل
              <ArrowUpLeft className="size-3.5" />
            </a>
          </div>
        }
      >
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 4).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className="chip bg-paper/60"
            >
              {item.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCategory("all")}
            className="chip border-jarir/30 text-jarir"
          >
            كل الأقسام
          </button>
        </div>
      </PageHero>

      <section className="border-b border-line bg-paper">
        <div className="container-wide py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-2 border border-line bg-ivory px-3.5">
              <Search className="size-4 text-muted-ink" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث بالاسم أو العلامة التجارية…"
                aria-label="البحث في المنتجات"
                className="h-11 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted-ink/70"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="مسح البحث"
                  className="text-muted-ink hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen((value) => !value)}
              className="inline-flex h-11 items-center justify-center gap-2 border border-line bg-ivory px-4 text-xs text-ink lg:hidden"
            >
              <SlidersHorizontal className="size-4" />
              التصفية
              {activeFilters > 0 && (
                <span className="num grid size-5 place-items-center rounded-full bg-jarir text-[9px] text-white">
                  {activeFilters}
                </span>
              )}
            </button>

            <div className="hidden items-center gap-2 lg:flex">
              <select
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                aria-label="تصفية بالعلامة التجارية"
                className="h-11 border border-line bg-ivory px-3 text-xs text-ink outline-none"
              >
                <option value="all">كل العلامات</option>
                {brands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                aria-label="ترتيب النتائج"
                className="h-11 border border-line bg-ivory px-3 text-xs text-ink outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div
            className={cn(
              "mt-3 grid gap-4 border-t border-line pt-4 lg:mt-4 lg:grid lg:grid-cols-[1fr_auto] lg:items-center",
              filtersOpen ? "grid" : "hidden lg:grid",
            )}
          >
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={cn("chip", category === "all" && "chip-active")}
              >
                الكل
              </button>
              {categories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  className={cn("chip", category === item.id && "chip-active")}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-3 text-[11px] text-muted-ink">
                حتى
                <input
                  type="range"
                  min={10}
                  max={6000}
                  step={50}
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  className="h-1 w-32 accent-[#e20714]"
                />
                <span className="num w-16 text-ink">{formatPrice(maxPrice)}</span>
              </label>
              <div className="flex items-center gap-2 lg:hidden">
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortKey)}
                  aria-label="ترتيب النتائج"
                  className="h-9 border border-line bg-ivory px-2 text-[11px]"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-10 md:py-14">
        <div className="container-wide">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span className="num text-2xl font-semibold">
                {filtered.length}
              </span>
              <span className="text-xs text-muted-ink">منتجًا مطابقًا</span>
              {category !== "all" && (
                <span className="text-[10px] text-muted-ink">
                  · {categoryName(category)}
                </span>
              )}
            </div>
            {activeFilters > 0 && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1 text-[11px] text-muted-ink hover:text-jarir"
              >
                <X className="size-3" />
                مسح كل الفلاتر
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center border border-dashed border-sand-deep bg-ivory px-6 py-20 text-center">
              <Search className="size-8 text-muted-ink/50" />
              <h2 className="mt-4 font-display text-xl">
                لم نجد منتجًا بهذه المواصفات
              </h2>
              <p className="mt-2 max-w-sm text-xs leading-6 text-muted-ink">
                جرّب توسيع نطاق السعر أو إزالة بعض الفلاتر، أو تصفح كل الأقسام.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 h-10 border border-ink px-5 text-xs text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                عرض كل المنتجات
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product, index) => (
                <Reveal key={product.id} delay={(index % 3) * 0.04}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          )}

          <Notice className="mt-10">
            الصور والأسماء والأسعار والتقييمات مأخوذة من صفحات المنتجات الرسمية
            على jarir.com وقت إعداد المنصة (نوفمبر 2026). قد تتغير الأسعار
            والتوفر على الموقع الرسمي. زر «عرض المنتج» يفتح صفحة التفاصيل داخل
            المنصة، ومنها رابط مباشر إلى صفحة جرير الرسمية.
          </Notice>
        </div>
      </section>
    </>
  );
}
