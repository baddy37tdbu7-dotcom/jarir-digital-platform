import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { formatNumber, formatPrice } from "@/lib/format";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 22,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  action,
  tone = "light",
  className,
}: {
  number?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          {number && (
            <span
              className={cn(
                "section-number",
                dark && "text-champagne",
              )}
            >
              {number}
            </span>
          )}
          <span
            className={cn(
              "h-px w-8",
              dark ? "bg-white/25" : "bg-sand-deep",
            )}
          />
          {eyebrow && (
            <span
              className={cn(
                "eyebrow",
                dark && "text-white/55",
              )}
            >
              {eyebrow}
            </span>
          )}
        </div>
        <h2
          className={cn(
            "display-section",
            dark ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 max-w-xl text-[15px] leading-8",
              dark ? "text-white/60" : "text-muted-ink",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Price({
  value,
  className,
  size = "md",
}: {
  value: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl md:text-4xl",
  };
  return (
    <span className={cn("num inline-flex items-baseline gap-1.5", className)}>
      <span className={cn("font-semibold tracking-tight", sizes[size])}>
        {value.toLocaleString("en-US")}
      </span>
      <span
        className={cn(
          "font-medium text-muted-ink",
          size === "lg" ? "text-sm" : "text-[11px]",
        )}
      >
        ر.س
      </span>
    </span>
  );
}

export function Rating({
  value,
  reviews,
  className,
  dark = false,
}: {
  value: number;
  reviews?: number;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs",
        dark ? "text-white/70" : "text-muted-ink",
        className,
      )}
      aria-label={`تقييم ${value} من 5`}
    >
      <Star
        className="size-3.5 fill-champagne text-champagne"
        strokeWidth={1.5}
      />
      <span className="num font-semibold text-ink dark:text-paper">
        {value.toLocaleString("en-US", { minimumFractionDigits: 1 })}
      </span>
      {reviews !== undefined && (
        <span className="text-[11px]">
          ({formatNumber(reviews)} تقييم)
        </span>
      )}
    </span>
  );
}

type TagTone = "red" | "ink" | "sand" | "outline" | "champagne" | "white";

export function Tag({
  children,
  tone = "outline",
  className,
}: {
  children: ReactNode;
  tone?: TagTone;
  className?: string;
}) {
  const tones: Record<TagTone, string> = {
    red: "bg-jarir text-white border-jarir",
    ink: "bg-ink text-paper border-ink",
    sand: "bg-sand text-ink border-sand",
    outline: "bg-transparent text-ink-soft border-line",
    champagne: "bg-transparent text-[#8a6f45] border-champagne/60",
    white: "bg-white/95 text-ink border-white/60 backdrop-blur",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[2px] border px-2 py-1 text-[10px] font-medium leading-none tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  tone = "light",
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  tone?: "light" | "dark";
  aside?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b",
        dark
          ? "border-white/10 bg-night text-paper"
          : "border-line bg-ivory text-ink",
      )}
    >
      {dark && <div className="pointer-events-none absolute inset-0 grain" />}
      <div
        className={cn(
          "pointer-events-none absolute -top-32 h-[420px] w-[420px] rounded-full blur-3xl",
          dark ? "bg-jarir/15" : "bg-jarir/[0.045]",
        )}
        style={{ insetInlineStart: "-120px" }}
      />
      <div className="container-wide relative z-[2] py-14 md:py-20 lg:py-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-2 w-2 bg-jarir" />
              <span
                className={cn(
                  "eyebrow",
                  dark ? "text-white/55" : "text-muted-ink",
                )}
              >
                {eyebrow}
              </span>
            </div>
            <h1 className="display-section text-[clamp(2.5rem,5vw,4.6rem)] leading-[1.05]">
              {title}
            </h1>
            {description && (
              <p
                className={cn(
                  "mt-6 max-w-2xl text-[15px] leading-8 md:text-base",
                  dark ? "text-white/65" : "text-muted-ink",
                )}
              >
                {description}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside && <div className="hidden lg:block">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

export function Notice({
  children,
  tone = "sand",
  className,
}: {
  children: ReactNode;
  tone?: "sand" | "dark" | "red";
  className?: string;
}) {
  const tones = {
    sand: "border-sand-deep/70 bg-sand/35 text-ink-soft",
    dark: "border-white/15 bg-white/[0.04] text-white/65",
    red: "border-jarir/20 bg-jarir-soft text-jarir-dark",
  };
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-sm border px-4 py-3 text-xs leading-6",
        tones[tone],
        className,
      )}
    >
      <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-current opacity-60" />
      <div>{children}</div>
    </div>
  );
}

export function StatBlock({
  value,
  label,
  dark = false,
}: {
  value: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div>
      <div
        className={cn(
          "num text-3xl font-semibold tracking-tight md:text-4xl",
          dark ? "text-paper" : "text-ink",
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          "mt-1.5 text-xs",
          dark ? "text-white/55" : "text-muted-ink",
        )}
      >
        {label}
      </div>
    </div>
  );
}

export { formatPrice };
