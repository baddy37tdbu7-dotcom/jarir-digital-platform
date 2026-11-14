import { ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import {
  interestDescriptions,
  interestLabels,
  products,
  type InterestId,
} from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Tag } from "@/components/common/Primitives";
import { cn } from "@/lib/utils";

const interests = Object.keys(interestLabels) as InterestId[];

export function InterestTeaser({ dark = false }: { dark?: boolean }) {
  const [selected, setSelected] = useState<InterestId | null>(null);
  const matches = selected
    ? products.filter((product) => product.interests.includes(selected)).slice(0, 3)
    : [];

  return (
    <div
      className={cn(
        "border p-6 md:p-10",
        dark
          ? "border-white/15 bg-white/[0.04]"
          : "border-line bg-paper",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="eyebrow">ماذا تبحث عنه اليوم؟</span>
          <h3
            className={cn(
              "mt-3 font-display text-[clamp(1.7rem,3vw,2.5rem)] leading-tight",
              dark ? "text-paper" : "text-ink",
            )}
          >
            اختر اهتمامك… ودعنا نقترح.
          </h3>
        </div>
        <Tag tone={dark ? "champagne" : "outline"} className="shrink-0">
          <Sparkles className="size-3" />
          مقترح تطويري للمنصة
        </Tag>
      </div>

      <p
        className={cn(
          "mt-3 max-w-xl text-xs leading-6",
          dark ? "text-white/55" : "text-muted-ink",
        )}
      >
        تجربة توصيات تفاعلية تقترح منتجات مرتبطة باهتمامك، وتفتح لك طريقًا
        أقصر إلى ما تحتاجه.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {interests.map((interest) => (
          <button
            key={interest}
            type="button"
            onClick={() => setSelected(interest === selected ? null : interest)}
            className={cn(
              "chip",
              dark && "border-white/20 text-white/75 hover:border-white/50",
              selected === interest &&
                (dark
                  ? "border-paper bg-paper text-ink"
                  : "chip-active"),
            )}
          >
            {interestLabels[interest]}
          </button>
        ))}
      </div>

      {selected ? (
        <div className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <span
              className={cn(
                "text-[11px]",
                dark ? "text-white/50" : "text-muted-ink",
              )}
            >
              {interestDescriptions[selected]}
            </span>
            <Link
              href={`/recommendations?interest=${selected}`}
              className={cn(
                "inline-flex items-center gap-1.5 text-[11px] font-medium",
                dark ? "text-paper hover:text-champagne" : "text-ink hover:text-jarir",
              )}
            >
              التوصيات الكاملة
              <ArrowLeft className="size-3.5" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {matches.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className={cn(
                  "group flex items-center gap-3 border p-3 transition-colors",
                  dark
                    ? "border-white/10 bg-night-soft/60 hover:border-white/30"
                    : "border-line bg-ivory hover:border-sand-deep",
                )}
              >
                <span className="grid size-16 shrink-0 place-items-center bg-white p-1.5">
                  <img
                    src={product.image}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "line-clamp-2 text-[11px] leading-5",
                      dark ? "text-paper" : "text-ink",
                    )}
                  >
                    {product.name}
                  </span>
                  <span
                    className={cn(
                      "num mt-1 block text-[11px] font-semibold",
                      dark ? "text-champagne" : "text-jarir",
                    )}
                  >
                    {formatPrice(product.price)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "mt-7 flex items-center gap-2 border-t pt-5 text-[11px]",
            dark
              ? "border-white/10 text-white/40"
              : "border-line text-muted-ink",
          )}
        >
          <span className="size-1.5 rounded-full bg-jarir" />
          اختر اهتمامًا واحدًا لتظهر لك 3 اقتراحات فورية.
        </div>
      )}
    </div>
  );
}
