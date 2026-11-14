import { ArrowLeft, Compass, Home } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { Logo } from "@/components/brand/Brand";

const NOT_FOUND_PATH = "/404";

export default function NotFound() {
  useEffect(() => {
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);

    if (window.location.pathname.replace(/\/$/, "") !== NOT_FOUND_PATH) {
      window.location.replace(NOT_FOUND_PATH);
    }

    return () => robots.remove();
  }, []);

  return (
    <section className="relative overflow-hidden bg-paper py-20 md:py-28">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl border border-line bg-ivory p-8 text-center md:p-14">
          <div className="flex justify-center">
            <Logo className="h-8" />
          </div>
          <div className="num mt-8 text-[clamp(4rem,12vw,7rem)] font-semibold leading-none tracking-tighter text-sand-deep">
            404
          </div>
          <h1 className="mt-4 font-display text-3xl">هذه الصفحة ليست على الرف.</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-ink">
            ربما تغيّر الرابط أو أُزيل المنتج. لا بأس — نعيدك إلى المكان الذي
            تبدأ منه الحكاية.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 bg-jarir px-6 text-xs font-medium text-white transition-colors hover:bg-jarir-dark"
            >
              <Home className="size-3.5" />
              الصفحة الرئيسية
            </Link>
            <Link
              href="/products"
              className="inline-flex h-11 items-center gap-2 border border-ink px-6 text-xs text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <Compass className="size-3.5" />
              تصفح المنتجات
              <ArrowLeft className="size-3.5" />
            </Link>
          </div>
          <div className="mt-8 border-t border-line pt-5 text-[10px] text-muted-ink">
            هل تبحث عن شيء محدد؟ جرّب البحث في أعلى الصفحة.
          </div>
        </div>
      </div>
    </section>
  );
}
