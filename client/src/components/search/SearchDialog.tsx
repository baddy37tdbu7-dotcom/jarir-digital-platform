import { ArrowLeft, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { categories, categoryName, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function SearchDialog({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim();
    if (!normalized) return products.slice(0, 5);
    return products
      .filter((product) =>
        [product.name, product.brand, categoryName(product.category)]
          .join(" ")
          .toLowerCase()
          .includes(normalized.toLowerCase()),
      )
      .slice(0, 7);
  }, [query]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    navigate(href);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {compact ? (
          <button
            type="button"
            aria-label="بحث"
            className="grid size-10 place-items-center border border-line text-ink transition-colors hover:border-ink"
          >
            <Search className="size-4" />
          </button>
        ) : (
          <button
            type="button"
            aria-label="بحث"
            className="group flex h-10 w-full items-center gap-2.5 border border-line bg-paper/60 px-3.5 text-start text-xs text-muted-ink transition-colors hover:border-sand-deep hover:bg-paper"
          >
            <Search className="size-4 shrink-0" />
            <span className="flex-1 truncate">
              ابحث عن كتاب، جهاز، أو هدية…
            </span>
            <kbd className="num hidden rounded border border-line bg-ivory px-1.5 py-0.5 text-[9px] text-muted-ink md:block">
              ⌘K
            </kbd>
          </button>
        )}
      </DialogTrigger>

      <DialogContent
        className="max-w-2xl gap-0 overflow-hidden border-line bg-ivory p-0 sm:rounded-sm [&>button]:hidden"
        aria-describedby="search-description"
      >
        <DialogTitle className="sr-only">البحث في منصة جرير</DialogTitle>
        <DialogDescription id="search-description" className="sr-only">
          ابحث في منتجات جرير حسب الاسم أو العلامة التجارية أو الفئة.
        </DialogDescription>

        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Search className="size-5 text-muted-ink" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث عن كتاب، جهاز، أو هدية…"
            className="h-8 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted-ink/70"
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
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded border border-line px-2 py-1 text-[10px] text-muted-ink hover:border-ink hover:text-ink"
          >
            إغلاق
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!query && (
            <div className="border-b border-line px-5 py-4">
              <p className="eyebrow mb-3">فئات سريعة</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => go(`/products?category=${category.id}`)}
                    className="chip hover:border-ink"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-2">
            {results.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-muted-ink">
                لا توجد نتائج مطابقة. جرّب كلمة أخرى مثل «كتاب» أو «لابتوب».
              </div>
            ) : (
              results.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => go(`/products/${product.id}`)}
                  className="group flex w-full items-center gap-4 rounded-sm px-3 py-3 text-start transition-colors hover:bg-sand/40"
                >
                  <span className="grid size-14 shrink-0 place-items-center bg-white p-1.5">
                    <img
                      src={product.image}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink">
                      {product.name}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-muted-ink">
                      {categoryName(product.category)} · {product.brand}
                    </span>
                  </span>
                  <span className="num shrink-0 text-sm font-semibold text-ink">
                    {formatPrice(product.price)}
                  </span>
                  <ArrowLeft className="size-4 shrink-0 text-muted-ink transition-transform group-hover:-translate-x-1" />
                </button>
              ))
            )}
          </div>

          <div className="flex items-center justify-between border-t border-line bg-paper/60 px-5 py-3">
            <span className="text-[10px] text-muted-ink">
              نتائج من كتالوج جرير المعلن على الموقع الرسمي
            </span>
            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="text-[11px] font-medium text-ink hover:text-jarir"
            >
              عرض كل المنتجات
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
