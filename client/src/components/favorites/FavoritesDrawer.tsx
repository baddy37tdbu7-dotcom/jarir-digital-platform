import { ArrowLeft, Bookmark, Trash2 } from "lucide-react";
import { Link } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFavorites } from "@/context/FavoritesContext";
import { productById } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function FavoritesDrawer() {
  const { ids, drawerOpen, setDrawerOpen, remove, clear } = useFavorites();
  const saved = ids.map((id) => productById(id)).filter(Boolean);

  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent
        side="left"
        className="w-full max-w-md gap-0 border-line bg-ivory p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-line px-6 py-6 text-start">
          <div className="flex items-center gap-2 text-jarir">
            <Bookmark className="size-4" />
            <span className="eyebrow text-jarir">قائمتك</span>
          </div>
          <SheetTitle className="font-display text-2xl font-medium">
            المفضلة
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-ink">
            المنتجات التي حفظتها لتعود إليها لاحقًا.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {saved.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-8 py-20 text-center">
              <span className="grid size-16 place-items-center rounded-full border border-line">
                <Bookmark className="size-6 text-muted-ink" />
              </span>
              <h3 className="mt-5 font-display text-lg">رفّك فارغ حتى الآن</h3>
              <p className="mt-2 text-xs leading-6 text-muted-ink">
                اضغط أيقونة الحفظ على أي منتج ليبقى هنا، حتى لو أغلقت الموقع.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-6 rounded-none border-ink text-ink hover:bg-ink hover:text-paper"
                onClick={() => setDrawerOpen(false)}
              >
                <Link href="/products">تصفح المنتجات</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {saved.map((product) =>
                product ? (
                  <li key={product.id} className="flex gap-4 p-5">
                    <Link
                      href={`/products/${product.id}`}
                      onClick={() => setDrawerOpen(false)}
                      className="grid size-20 shrink-0 place-items-center bg-white p-2"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/products/${product.id}`}
                        onClick={() => setDrawerOpen(false)}
                        className="line-clamp-2 text-sm font-medium leading-6 text-ink hover:text-jarir"
                      >
                        {product.name}
                      </Link>
                      <div className="mt-1 text-xs text-muted-ink">
                        {product.brand}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="num text-sm font-semibold">
                          {formatPrice(product.price)}
                        </span>
                        <button
                          type="button"
                          onClick={() => remove(product.id)}
                          className="inline-flex items-center gap-1 text-[10px] text-muted-ink hover:text-jarir"
                        >
                          <Trash2 className="size-3" />
                          إزالة
                        </button>
                      </div>
                    </div>
                  </li>
                ) : null,
              )}
            </ul>
          )}
        </div>

        {saved.length > 0 && (
          <div className="border-t border-line px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={clear}
                className="text-[11px] text-muted-ink hover:text-jarir"
              >
                مسح القائمة
              </button>
              <Link
                href="/recommendations"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-ink hover:text-jarir"
              >
                اقترح لي المزيد
                <ArrowLeft className="size-3.5" />
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
