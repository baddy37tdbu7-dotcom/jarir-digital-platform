import {
  ArrowLeft,
  ArrowUpLeft,
  Check,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Logo, TikTokIcon, XIcon } from "@/components/brand/Brand";
import { socialPlatforms } from "@/data/social";

const footerColumns = [
  {
    title: "تسوّق",
    links: [
      ["كل المنتجات", "/products"],
      ["عروض الأسبوع", "/offers"],
      ["الأكثر مبيعًا", "/best-sellers"],
      ["التوصيات الشخصية", "/recommendations"],
    ],
  },
  {
    title: "اكتشف",
    links: [
      ["الحملات التسويقية", "/campaigns"],
      ["المحتوى التفاعلي", "/interactive"],
      ["مجتمع جرير", "/community"],
      ["وسائل التواصل", "/social"],
    ],
  },
  {
    title: "المنصة",
    links: [
      ["قياس الأداء", "/analytics"],
      ["لوحة التحكم", "/dashboard"],
    ],
  },
];

const sourceLinks = [
  {
    label: "مكتبة جرير — الموقع الرسمي",
    url: "https://www.jarir.com/",
  },
  {
    label: "عن الشركة — جرير للتسويق",
    url: "https://www.jarir.com/company-profile",
  },
  {
    label: "Instagram — @jarirbookstore",
    url: "https://www.instagram.com/jarirbookstore/",
  },
  {
    label: "X — @jarirbookstore",
    url: "https://twitter.com/jarirbookstore",
  },
  {
    label: "TikTok — @jarirbookstore",
    url: "https://www.tiktok.com/@jarirbookstore",
  },
  {
    label: "YouTube — jarirtube",
    url: "https://www.youtube.com/user/jarirtube",
  },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("أدخل بريدًا إلكترونيًا صحيحًا");
      return;
    }
    setDone(true);
    toast.success("تم تسجيل اهتمامك", {
      description: "ستصلك العروض المختارة وأفكار المحتوى أولًا.",
    });
  };

  if (done) {
    return (
      <div className="mt-6 flex items-center gap-3 border border-white/15 bg-white/[0.04] px-4 py-3.5 text-sm text-white/75">
        <Check className="size-4 text-champagne" />
        شكرًا لك. أضفنا بريدك إلى قائمة العروض المختارة.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="بريدك الإلكتروني"
        aria-label="البريد الإلكتروني"
        className="h-12 flex-1 border border-white/20 bg-transparent px-4 text-sm text-paper outline-none transition-colors placeholder:text-white/35 focus:border-white/60"
      />
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 bg-jarir px-5 text-sm font-medium text-white transition-colors hover:bg-jarir-dark"
      >
        اشترك
        <ArrowLeft className="size-4" />
      </button>
    </form>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-night text-paper">
      <div className="pointer-events-none absolute inset-0 grain" />
      <div className="container-wide relative z-[2] pt-16 pb-8">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="eyebrow text-champagne">ابقَ قريبًا</span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.1]">
              كن أول من يعرف.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/55">
              عروض مختارة، إصدارات جديدة، وأفكار تستحق وقتك — مباشرة إلى بريدك.
            </p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 text-[11px] font-medium text-white/40">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-[13px] text-white/70 transition-colors hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Logo variant="white" className="h-8" />
            <p className="max-w-md text-xs leading-6 text-white/45">
              منصة تسويقية رقمية مفاهيمية لجرير — تجمع الكتاب والتقنية
              والمستلزمات في تجربة واحدة.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {socialPlatforms.map((platform) => {
              const Icon =
                platform.id === "instagram"
                  ? Instagram
                  : platform.id === "x"
                    ? XIcon
                    : platform.id === "tiktok"
                      ? TikTokIcon
                      : Youtube;
              return (
                <a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={platform.name}
                  title={`${platform.name} — ${platform.handle}`}
                  className="grid size-10 place-items-center border border-white/15 text-white/60 transition-colors hover:border-white/50 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
            <a
              href="https://www.facebook.com/jarirbookstore"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid size-10 place-items-center border border-white/15 text-white/60 transition-colors hover:border-white/50 hover:text-white"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/jarir-bookstore"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-10 place-items-center border border-white/15 text-white/60 transition-colors hover:border-white/50 hover:text-white"
            >
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-[10px] text-white/35 md:flex-row md:items-center md:justify-between">
          <p>© 2026 منصة جرير التسويقية — تصميم مفاهيمي.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span>بيانات التحليلات والمجتمع توضيحية لأغراض العرض.</span>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="text-white/55 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                >
                  المصادر والمراجع
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-lg gap-0 border-line bg-ivory p-0 sm:rounded-sm">
                <DialogHeader className="border-b border-line px-6 py-5 text-start">
                  <DialogTitle className="font-display text-xl font-medium">
                    المصادر والمراجع
                  </DialogTitle>
                  <DialogDescription className="text-xs leading-6 text-muted-ink">
                    المعلومات الرسمية والحسابات المذكورة في المنصة موثقة من
                    موقع جرير، وقت إعداد المنصة (نوفمبر 2026).
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 px-6 py-5">
                  {sourceLinks.map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-4 border-b border-line py-2.5 text-xs text-ink transition-colors last:border-0 hover:text-jarir"
                    >
                      <span>{source.label}</span>
                      <ArrowUpLeft className="size-3.5 shrink-0 text-muted-ink" />
                    </a>
                  ))}
                  <p className="pt-3 text-[10px] leading-6 text-muted-ink">
                    صور المنتجات والأسعار والتقييمات مأخوذة من صفحات المنتجات
                    الرسمية على jarir.com، وقد تتغير الأسعار والتوفر. صور
                    الحملات مولّدة خصيصًا للمنصة. بيانات التحليلات والمجتمع
                    توضيحية ولا تمثل أرقامًا رسمية.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </footer>
  );
}
