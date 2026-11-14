import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  Check,
  Gamepad2,
  Headphones,
  Laptop,
  RotateCcw,
  Sparkles,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { products, type Product } from "@/data/products";
import { useFavorites } from "@/context/FavoritesContext";
import { Price, Rating, Tag } from "@/components/common/Primitives";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

type UseKey = "study" | "work" | "gaming" | "reading" | "office";
type BudgetKey = "low" | "mid" | "high" | "premium";
type PriorityKey = "performance" | "portability" | "media" | "value";

interface Answers {
  use?: UseKey;
  budget?: BudgetKey;
  priority?: PriorityKey;
}

const useOptions: { value: UseKey; label: string; hint: string; icon: typeof BookOpen }[] = [
  { value: "study", label: "دراسة وجامعة", hint: "مستلزمات وأجهزة للعام الدراسي", icon: BookOpen },
  { value: "work", label: "عمل وإنتاجية", hint: "أدوات تساعدك على الإنجاز", icon: Briefcase },
  { value: "gaming", label: "ألعاب وترفيه", hint: "تجربة ترفيهية كاملة", icon: Gamepad2 },
  { value: "reading", label: "قراءة وتعلم", hint: "كتب ومراجع تفتح عوالم", icon: BookOpen },
  { value: "office", label: "مكتب وتنظيم", hint: "تفاصيل ترتب مساحتك", icon: Laptop },
];

const budgetOptions: { value: BudgetKey; label: string; range: [number, number] }[] = [
  { value: "low", label: "أقل من 200 ر.س", range: [0, 200] },
  { value: "mid", label: "200 — 1,000 ر.س", range: [200, 1000] },
  { value: "high", label: "1,000 — 3,500 ر.س", range: [1000, 3500] },
  { value: "premium", label: "أكثر من 3,500 ر.س", range: [3500, 99999] },
];

const priorityOptions: { value: PriorityKey; label: string; hint: string; icon: typeof Sparkles }[] = [
  { value: "performance", label: "أداء قوي", hint: "معالج وسرعة واستجابة", icon: Sparkles },
  { value: "portability", label: "خفة وتنقل", hint: "أخذه معك أينما ذهبت", icon: ArrowRight },
  { value: "media", label: "صوت وصورة", hint: "تجربة بصرية وصوتية أعمق", icon: Headphones },
  { value: "value", label: "قيمة عملية", hint: "أفضل ما تحصل عليه بسعرك", icon: Wallet },
];

const useInterests: Record<UseKey, string[]> = {
  study: ["study", "office"],
  work: ["study", "tech", "office"],
  gaming: ["gaming", "tech"],
  reading: ["reading", "study"],
  office: ["office", "accessories"],
};

function scoreProduct(
  product: Product,
  answers: Required<Answers>,
): number {
  let score = 0;
  if (product.interests.some((interest) => useInterests[answers.use].includes(interest))) {
    score += 5;
  }

  const budget = budgetOptions.find((item) => item.value === answers.budget)!;
  if (product.price >= budget.range[0] && product.price <= budget.range[1]) {
    score += 4;
  } else {
    const distance =
      product.price < budget.range[0]
        ? budget.range[0] - product.price
        : product.price - budget.range[1];
    score -= Math.min(3, distance / 1000);
  }

  if (answers.priority === "performance") {
    if (["computers", "mobiles"].includes(product.category)) score += 3;
    if (product.rating) score += product.rating * 0.4;
  }
  if (answers.priority === "portability") {
    if (["computers", "accessories", "mobiles"].includes(product.category)) score += 2.5;
    if (product.name.includes("آير") || product.name.includes("زن بوك")) score += 1.5;
  }
  if (answers.priority === "media") {
    if (["electronics", "gaming"].includes(product.category)) score += 3;
  }
  if (answers.priority === "value") {
    score += Math.max(0, 3 - product.price / 2000);
  }

  return score;
}

export function ProductFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const { addMany } = useFavorites();

  const complete = Boolean(answers.use && answers.budget && answers.priority);

  const results = useMemo(() => {
    if (!complete) return [];
    const ranked = [...products]
      .map((product) => ({
        product,
        score: scoreProduct(product, answers as Required<Answers>),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    return ranked;
  }, [answers, complete]);

  const choose = (key: keyof Answers, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    setStep((current) => Math.min(2, current + 1));
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const questionTitles = [
    "كيف ستستخدم المنتج؟",
    "أين تقع ميزانيتك؟",
    "ما الأهم لك؟",
  ];

  return (
    <div className="border border-line bg-ivory">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center bg-jarir text-[10px] font-semibold text-white">
            Q
          </span>
          <span className="text-xs font-medium">اختبار اختيار المنتج</span>
        </div>
        <Tag tone="outline">
          <Sparkles className="size-3" />
          ميزة تفاعلية مقترحة
        </Tag>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={cn(
                "h-1 flex-1 transition-colors",
                index <= step && complete ? "bg-jarir" : index <= step ? "bg-jarir" : "bg-line",
              )}
            />
          ))}
        </div>

        {!complete ? (
          <div className="mt-7">
            <div className="flex items-center justify-between">
              <span className="num text-[10px] text-muted-ink">
                سؤال {step + 1} من 3
              </span>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((current) => Math.max(0, current - 1))}
                  className="inline-flex items-center gap-1 text-[10px] text-muted-ink hover:text-ink"
                >
                  <ArrowRight className="size-3" />
                  السابق
                </button>
              )}
            </div>

            <h3 className="mt-2 font-display text-2xl md:text-3xl">
              {questionTitles[step]}
            </h3>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {step === 0 &&
                useOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => choose("use", option.value)}
                    className={cn(
                      "flex items-center gap-3 border p-4 text-start transition-colors hover:border-ink",
                      answers.use === option.value
                        ? "border-ink bg-sand/30"
                        : "border-line bg-paper",
                    )}
                  >
                    <span className="grid size-9 shrink-0 place-items-center border border-line bg-ivory">
                      <option.icon className="size-4 text-jarir" />
                    </span>
                    <span>
                      <span className="block text-sm">{option.label}</span>
                      <span className="mt-0.5 block text-[10px] text-muted-ink">
                        {option.hint}
                      </span>
                    </span>
                    {answers.use === option.value && (
                      <Check className="ms-auto size-4 text-jarir" />
                    )}
                  </button>
                ))}

              {step === 1 &&
                budgetOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => choose("budget", option.value)}
                    className={cn(
                      "flex items-center justify-between border p-4 text-start transition-colors hover:border-ink",
                      answers.budget === option.value
                        ? "border-ink bg-sand/30"
                        : "border-line bg-paper",
                    )}
                  >
                    <span className="text-sm">{option.label}</span>
                    <Wallet className="size-4 text-jarir" />
                  </button>
                ))}

              {step === 2 &&
                priorityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => choose("priority", option.value)}
                    className={cn(
                      "flex items-center gap-3 border p-4 text-start transition-colors hover:border-ink",
                      answers.priority === option.value
                        ? "border-ink bg-sand/30"
                        : "border-line bg-paper",
                    )}
                  >
                    <span className="grid size-9 shrink-0 place-items-center border border-line bg-ivory">
                      <option.icon className="size-4 text-jarir" />
                    </span>
                    <span>
                      <span className="block text-sm">{option.label}</span>
                      <span className="mt-0.5 block text-[10px] text-muted-ink">
                        {option.hint}
                      </span>
                    </span>
                  </button>
                ))}
            </div>
          </div>
        ) : (
          <div className="mt-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="eyebrow">نتيجتك</span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl">
                  هذا ما نرشّحه لك.
                </h3>
              </div>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 border border-line px-3 py-2 text-[10px] text-muted-ink hover:border-ink hover:text-ink"
              >
                <RotateCcw className="size-3" />
                أعد الاختبار
              </button>
            </div>

            {results[0] && (
              <div className="mt-6 grid border border-line bg-paper sm:grid-cols-[0.9fr_1.1fr]">
                <div className="grid place-items-center bg-white p-6">
                  <img
                    src={results[0].product.image}
                    alt={results[0].product.name}
                    className="h-52 w-full object-contain"
                  />
                </div>
                <div className="flex flex-col p-6">
                  <div className="flex items-center gap-2">
                    <Tag tone="red">الاختيار الأول</Tag>
                    <span className="text-[10px] text-muted-ink">
                      تطابق {Math.min(98, Math.round(results[0].score * 9))}%
                    </span>
                  </div>
                  <h4 className="mt-3 font-display text-xl leading-8">
                    {results[0].product.name}
                  </h4>
                  <p className="mt-2 text-xs leading-6 text-muted-ink">
                    {results[0].product.description}
                  </p>
                  <div className="mt-2">
                    {results[0].product.rating ? (
                      <Rating
                        value={results[0].product.rating}
                        reviews={results[0].product.reviews}
                      />
                    ) : (
                      <span className="text-[10px] text-muted-ink">
                        متوفر لدى جرير
                      </span>
                    )}
                  </div>
                  <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
                    <Price value={results[0].product.price} />
                    <Link
                      href={`/products/${results[0].product.id}`}
                      className="inline-flex items-center gap-1.5 bg-jarir px-4 py-2 text-[10px] text-white hover:bg-jarir-dark"
                    >
                      عرض المنتج
                      <ArrowLeft className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {results.slice(1).map(({ product }) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group flex items-center gap-3 border border-line bg-paper p-3 transition-colors hover:border-ink"
                >
                  <span className="grid size-14 shrink-0 place-items-center bg-white p-1">
                    <img
                      src={product.image}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-[11px] leading-5">
                      {product.name}
                    </span>
                    <span className="num mt-1 block text-[10px] font-semibold text-jarir">
                      {formatPrice(product.price)}
                    </span>
                  </span>
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addMany(results.map(({ product }) => product.id))}
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 border border-ink text-[11px] transition-colors hover:bg-ink hover:text-paper"
            >
              <Check className="size-3.5" />
              احفظ النتائج الثلاث في المفضلة
            </button>

            <p className="mt-3 text-[10px] leading-5 text-muted-ink">
              النتائج مبنية على إجاباتك واهتمامات المنتجات في الكتالوج. نسبة
              التطابق عرض توضيحي وليست تقييمًا رسميًا.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
