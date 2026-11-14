import { Check, RotateCcw, Vote } from "lucide-react";
import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { pollOptions } from "@/data/community";
import { Tag } from "@/components/common/Primitives";
import { cn } from "@/lib/utils";

export function PollCard({
  title = "ما الذي يهمك أكثر هذا الموسم؟",
  description = "صوتك يساعدنا على ترتيب المحتوى والعروض القادمة.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  const [voted, setVoted] = useLocalStorage<string | null>(
    "jarir:poll-season",
    null,
  );

  const results = useMemo(() => {
    const base = pollOptions.map((option) => ({
      ...option,
      votes: option.votes + (voted === option.id ? 1 : 0),
    }));
    const total = base.reduce((sum, option) => sum + option.votes, 0);
    return {
      total,
      options: base.map((option) => ({
        ...option,
        percent: Math.round((option.votes / total) * 100),
      })),
    };
  }, [voted]);

  return (
    <div className={cn("border border-line bg-ivory p-6 md:p-8", className)}>
      <div className="flex items-center justify-between gap-3">
        <Tag tone="red">
          <Vote className="size-3" />
          استطلاع مقترح
        </Tag>
        <span className="num text-[10px] text-muted-ink">
          {results.total.toLocaleString("en-US")} صوت
        </span>
      </div>

      <h3 className="mt-5 font-display text-2xl leading-snug text-ink">
        {title}
      </h3>
      <p className="mt-2 text-xs leading-6 text-muted-ink">{description}</p>

      <div className="mt-6 space-y-2.5">
        {results.options.map((option) => {
          const selected = voted === option.id;
          if (!voted) {
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setVoted(option.id)}
                className="flex w-full items-center justify-between border border-line bg-paper/60 px-4 py-3 text-start text-[13px] text-ink transition-colors hover:border-ink hover:bg-paper"
              >
                <span>{option.label}</span>
                <span className="grid size-5 place-items-center rounded-full border border-sand-deep text-[9px] text-muted-ink">
                  <Vote className="size-2.5" />
                </span>
              </button>
            );
          }

          return (
            <div
              key={option.id}
              className={cn(
                "relative overflow-hidden border px-4 py-3",
                selected ? "border-ink" : "border-line",
              )}
            >
              <div
                className={cn(
                  "absolute inset-y-0 start-0 transition-all duration-700",
                  selected ? "bg-jarir/10" : "bg-sand/40",
                )}
                style={{ width: `${option.percent}%` }}
              />
              <div className="relative z-[1] flex items-center justify-between gap-3 text-[13px]">
                <span className="flex items-center gap-2">
                  {selected && <Check className="size-3.5 text-jarir" />}
                  {option.label}
                </span>
                <span className="num text-xs font-semibold">
                  {option.percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-[10px] text-muted-ink">
          نتائج توضيحية لمحاكاة تفاعل الجمهور.
        </p>
        {voted && (
          <button
            type="button"
            onClick={() => setVoted(null)}
            className="inline-flex items-center gap-1 text-[10px] text-muted-ink hover:text-ink"
          >
            <RotateCcw className="size-3" />
            صوّت مرة أخرى
          </button>
        )}
      </div>
    </div>
  );
}
