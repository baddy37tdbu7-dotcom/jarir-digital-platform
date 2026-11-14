import {
  ArrowUpLeft,
  Bookmark,
  LayoutDashboard,
  Menu,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Logo } from "@/components/brand/Brand";
import { SearchDialog } from "@/components/search/SearchDialog";
import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/offers", label: "العروض" },
  { href: "/campaigns", label: "الحملات" },
  { href: "/best-sellers", label: "الأكثر مبيعًا" },
  { href: "/recommendations", label: "التوصيات" },
  { href: "/interactive", label: "المحتوى التفاعلي" },
  { href: "/community", label: "المجتمع" },
  { href: "/social", label: "وسائل التواصل" },
  { href: "/analytics", label: "التحليلات" },
];

export function SiteHeader() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setDrawerOpen } = useFavorites();

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-night text-white/60">
        <div className="container-wide flex h-8 items-center justify-between gap-4 text-[10px]">
          <div className="flex items-center gap-4 overflow-hidden">
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className="size-1 rounded-full bg-jarir" />
              توصيل إلى السعودية والخليج
            </span>
            <span className="hidden text-white/30 md:inline">/</span>
            <span className="hidden md:inline">استبدال وإرجاع</span>
            <span className="hidden text-white/30 md:inline">/</span>
            <span className="hidden md:inline">تقسيط مرن</span>
            <span className="hidden text-white/30 lg:inline">/</span>
            <span className="hidden lg:inline">ضمان وحماية</span>
            <span className="sm:hidden">منصة تسويقية رقمية · جرير</span>
          </div>
          <a
            href="https://www.jarir.com/"
            target="_blank"
            rel="noreferrer"
            className="hidden shrink-0 items-center gap-1 transition-colors hover:text-white sm:flex"
          >
            زيارة موقع جرير الرسمي
            <ArrowUpLeft className="size-3" />
          </a>
        </div>
      </div>

      <div className="border-b border-line bg-ivory/95 backdrop-blur-md supports-[backdrop-filter]:bg-ivory/85">
        <div className="container-wide flex h-[66px] items-center gap-3">
          <Link
            href="/"
            aria-label="مكتبة جرير — الرئيسية"
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <Logo className="h-7 md:h-8" />
          </Link>

          <div className="mx-auto hidden w-full max-w-md px-6 lg:block">
            <SearchDialog />
          </div>

          <div className="ms-auto flex items-center gap-1.5 lg:ms-0">
            <div className="lg:hidden">
              <SearchDialog compact />
            </div>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative grid size-10 place-items-center border border-line text-ink transition-colors hover:border-ink"
              aria-label={`المفضلة (${count})`}
            >
              <Bookmark className="size-4" />
              {count > 0 && (
                <span className="num absolute -end-1.5 -top-1.5 grid min-w-[18px] place-items-center rounded-full bg-jarir px-1 text-[9px] font-bold leading-[18px] text-white">
                  {count}
                </span>
              )}
            </button>

            <Link
              href="/dashboard"
              className={cn(
                "hidden h-10 items-center gap-2 bg-ink px-4 text-xs font-medium text-paper transition-colors hover:bg-jarir sm:inline-flex",
                location.startsWith("/dashboard") && "bg-jarir",
              )}
            >
              <LayoutDashboard className="size-3.5" />
              لوحة التحكم
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-10 place-items-center border border-line text-ink transition-colors hover:border-ink xl:hidden"
              aria-label="فتح القائمة"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        <nav className="hidden border-t border-line/70 xl:block">
          <div className="container-wide flex h-11 items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex h-full items-center text-[12.5px] transition-colors",
                  isActive(item.href)
                    ? "font-medium text-ink"
                    : "text-muted-ink hover:text-ink",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-[2px] bg-jarir transition-transform",
                    isActive(item.href) ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            ))}
            <span className="ms-auto flex items-center gap-2 text-[10px] text-muted-ink">
              <span className="size-1 rounded-full bg-jarir" />
              منصة تسويقية رقمية
            </span>
          </div>
        </nav>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="right"
          className="w-full max-w-sm gap-0 border-line bg-ivory p-0"
        >
          <SheetHeader className="border-b border-line px-6 py-6 text-start">
            <Logo className="h-7" />
            <SheetTitle className="sr-only">قائمة التنقل</SheetTitle>
            <SheetDescription className="sr-only">
              روابط صفحات منصة جرير التسويقية.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="mb-4 lg:hidden">
              <SearchDialog />
            </div>
            <nav className="flex flex-col">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-line py-3.5 text-sm transition-colors",
                    isActive(item.href)
                      ? "font-medium text-jarir"
                      : "text-ink hover:text-jarir",
                  )}
                >
                  <span>{item.label}</span>
                  <span className="num text-[9px] text-muted-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </nav>

            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="mt-6 flex h-12 items-center justify-center gap-2 bg-ink text-sm text-paper"
            >
              <LayoutDashboard className="size-4" />
              لوحة التحكم التسويقية
            </Link>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setDrawerOpen(true);
              }}
              className="mt-2 flex h-11 w-full items-center justify-center gap-2 border border-line text-xs text-ink"
            >
              <Bookmark className="size-4" />
              المفضلة ({count})
            </button>

            <div className="mt-8 border-t border-line pt-5">
              <p className="eyebrow mb-3">جرير على المنصات</p>
              <div className="flex gap-2">
                {[
                  ["Instagram", "https://www.instagram.com/jarirbookstore/"],
                  ["X", "https://twitter.com/jarirbookstore"],
                  ["TikTok", "https://www.tiktok.com/@jarirbookstore"],
                  ["YouTube", "https://www.youtube.com/user/jarirtube"],
                ].map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 items-center border border-line px-2.5 text-[10px] text-muted-ink hover:border-ink hover:text-ink"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
