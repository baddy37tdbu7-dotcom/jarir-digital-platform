import {
  ArrowLeft,
  Bell,
  Bookmark,
  Check,
  Heart,
  MessageCircle,
  Send,
  Share2,
  Sparkles,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  communityPosts,
  pollOptions,
  testimonials,
  type CommunityPost,
} from "@/data/community";
import {
  interestLabels,
  productById,
  products,
  type InterestId,
} from "@/data/products";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useFavorites } from "@/context/FavoritesContext";
import { PollCard } from "@/components/interactive/PollCard";
import {
  Notice,
  PageHero,
  Price,
  Reveal,
  SectionHeading,
  StatBlock,
  Tag,
} from "@/components/common/Primitives";
import { Switch } from "@/components/ui/switch";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface StoredComment {
  author: string;
  text: string;
}

function FeedPost({ post }: { post: CommunityPost }) {
  const [liked, setLiked] = useLocalStorage<string[]>("jarir:liked-posts", []);
  const [saved, setSaved] = useLocalStorage<string[]>("jarir:saved-posts", []);
  const [comments, setComments] = useLocalStorage<Record<string, StoredComment[]>>(
    "jarir:post-comments",
    {},
  );
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const isLiked = liked.includes(post.id);
  const isSaved = saved.includes(post.id);
  const extra = comments[post.id] ?? [];
  const product = post.productId ? productById(post.productId) : undefined;
  const commentCount = post.comments.length + extra.length;

  const toggleLike = () => {
    setLiked((current) =>
      current.includes(post.id)
        ? current.filter((id) => id !== post.id)
        : [...current, post.id],
    );
  };

  const toggleSave = () => {
    setSaved((current) => {
      if (current.includes(post.id)) return current.filter((id) => id !== post.id);
      toast.success("حُفظ المنشور");
      return [...current, post.id];
    });
  };

  const share = async () => {
    const url = `${window.location.origin}/community#${post.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "منشور من مجتمع جرير", url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("نُسخ رابط المنشور");
      }
    } catch {
      // cancelled
    }
  };

  const addComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    setComments((current) => ({
      ...current,
      [post.id]: [
        ...(current[post.id] ?? []),
        { author: "أنت", text: draft.trim() },
      ],
    }));
    setDraft("");
    toast.success("أُضيف تعليقك");
  };

  return (
    <article
      id={post.id}
      className="border border-line bg-ivory p-5 md:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-ink text-sm text-paper">
            {post.initials}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">{post.author}</span>
              {post.badge && (
                <span className="border border-line px-1.5 py-0.5 text-[8px] text-muted-ink">
                  {post.badge}
                </span>
              )}
            </div>
            <div className="mt-0.5 text-[9px] text-muted-ink">
              {post.time} · {post.topic}
            </div>
          </div>
        </div>
        <span className="text-[8px] text-muted-ink/60">محتوى توضيحي</span>
      </div>

      <p className="mt-4 text-[13px] leading-7 text-ink-soft">{post.text}</p>

      {product && (
        <Link
          href={`/products/${product.id}`}
          className="mt-4 flex items-center gap-3 border border-line bg-paper p-3 transition-colors hover:border-sand-deep"
        >
          <span className="grid size-14 shrink-0 place-items-center bg-white p-1">
            <img
              src={product.image}
              alt=""
              className="h-full w-full object-contain"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="line-clamp-1 text-[11px] text-ink">
              {product.name}
            </span>
            <span className="num mt-0.5 block text-[10px] text-muted-ink">
              {formatPrice(product.price)}
            </span>
          </span>
          <ArrowLeft className="size-3.5 text-muted-ink" />
        </Link>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleLike}
            aria-label={isLiked ? "إلغاء الإعجاب" : "إعجاب"}
            className={cn(
              "inline-flex items-center gap-1.5 px-2 py-1.5 text-[10px] transition-colors",
              isLiked ? "text-jarir" : "text-muted-ink hover:text-ink",
            )}
          >
            <Heart className={cn("size-3.5", isLiked && "fill-current")} />
            {post.likes + (isLiked ? 1 : 0)}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="التعليقات"
            className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[10px] text-muted-ink hover:text-ink"
          >
            <MessageCircle className="size-3.5" />
            {commentCount}
          </button>
          <button
            type="button"
            onClick={share}
            aria-label="مشاركة المنشور"
            className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[10px] text-muted-ink hover:text-ink"
          >
            <Share2 className="size-3.5" />
            مشاركة
          </button>
        </div>
        <button
          type="button"
          onClick={toggleSave}
          aria-label={isSaved ? "إزالة من المحفوظات" : "حفظ المنشور"}
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-1.5 text-[10px] transition-colors",
            isSaved ? "text-jarir" : "text-muted-ink hover:text-ink",
          )}
        >
          <Bookmark className={cn("size-3.5", isSaved && "fill-current")} />
          {isSaved ? "محفوظ" : "حفظ"}
        </button>
      </div>

      {open && (
        <div className="mt-3 border-t border-line pt-3">
          <div className="space-y-2">
            {[...post.comments, ...extra].map((comment, index) => (
              <div key={`${comment.author}-${index}`} className="text-[11px] leading-6">
                <span className="font-medium text-ink">{comment.author}: </span>
                <span className="text-muted-ink">{comment.text}</span>
              </div>
            ))}
          </div>
          <form onSubmit={addComment} className="mt-3 flex gap-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="اكتب تعليقك…"
              aria-label="اكتب تعليقك"
              className="h-9 min-w-0 flex-1 border border-line bg-paper px-3 text-[11px] outline-none focus:border-ink"
            />
            <button
              type="submit"
              aria-label="إرسال التعليق"
              className="grid size-9 shrink-0 place-items-center bg-ink text-paper hover:bg-jarir"
            >
              <Send className="size-3.5" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
}

function RatingForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [reviews, setReviews] = useLocalStorage<
    { name: string; text: string; rating: number }[]
  >("jarir:reviews", []);

  const average = useMemo(() => {
    const base = testimonials.map((item) => item.rating);
    const all = [...base, ...reviews.map((item) => item.rating)];
    return (all.reduce((sum, item) => sum + item, 0) / all.length).toFixed(1);
  }, [reviews]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!rating || !name.trim() || !text.trim()) {
      toast.error("اختر تقييمًا وأكمل الاسم والتعليق");
      return;
    }
    setReviews((current) => [
      { name: name.trim(), text: text.trim(), rating },
      ...current,
    ]);
    setRating(0);
    setName("");
    setText("");
    toast.success("شكرًا لتقييمك");
  };

  return (
    <div className="border border-line bg-ivory p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Tag tone="outline">
            <Star className="size-3 text-champagne" />
            تقييم التجربة
          </Tag>
          <h3 className="mt-3 font-display text-2xl">كيف كانت تجربتك؟</h3>
        </div>
        <div className="text-end">
          <div className="num text-2xl font-semibold">{average}</div>
          <div className="text-[9px] text-muted-ink">متوسط التقييمات المعروضة</div>
        </div>
      </div>

      <form onSubmit={submit} className="mt-5">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              aria-label={`تقييم ${star} من 5`}
              className="p-0.5"
            >
              <Star
                className={cn(
                  "size-7 transition-colors",
                  star <= (hover || rating)
                    ? "fill-champagne text-champagne"
                    : "text-sand-deep",
                )}
                strokeWidth={1.3}
              />
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-[0.4fr_1fr]">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="اسمك"
            aria-label="اسمك"
            className="h-10 border border-line bg-paper px-3 text-xs outline-none focus:border-ink"
          />
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="جملة عن تجربتك…"
            aria-label="تعليقك"
            className="h-10 border border-line bg-paper px-3 text-xs outline-none focus:border-ink"
          />
        </div>

        <button
          type="submit"
          className="mt-3 inline-flex h-10 items-center gap-2 bg-ink px-5 text-[11px] text-paper transition-colors hover:bg-jarir"
        >
          <Send className="size-3" />
          أرسل تقييمك
        </button>
      </form>

      {reviews.length > 0 && (
        <div className="mt-6 border-t border-line pt-4">
          <div className="text-[9px] text-muted-ink">تقييماتك المحفوظة</div>
          <ul className="mt-2 space-y-2">
            {reviews.slice(0, 3).map((review, index) => (
              <li key={`${review.name}-${index}`} className="text-[11px] leading-6">
                <span className="font-medium">{review.name}</span>
                <span className="text-champagne"> · {review.rating}★ </span>
                <span className="text-muted-ink">{review.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="mt-4 text-[9px] text-muted-ink">
        التقييمات المعروضة في المتوسط تشمل نماذج توضيحية وتقييماتك المحفوظة
        محليًا.
      </p>
    </div>
  );
}

function AlertsForm() {
  const [email, setEmail] = useState("");
  const [prefs, setPrefs] = useLocalStorage<Record<string, boolean>>(
    "jarir:alerts",
    { offers: true, books: true, tech: false, events: false },
  );
  const [done, setDone] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("أدخل بريدًا إلكترونيًا صحيحًا");
      return;
    }
    setDone(true);
    toast.success("فُعّلت تنبيهاتك", {
      description: "ستصلك التنبيهات حسب اختياراتك.",
    });
  };

  const items = [
    ["offers", "عروض الأسبوع"],
    ["books", "إصدارات الكتب"],
    ["tech", "أجهزة التقنية"],
    ["events", "فعاليات المعارض"],
  ] as const;

  return (
    <div className="border border-line bg-paper p-6">
      <div className="flex items-center gap-2">
        <Bell className="size-4 text-jarir" />
        <h3 className="font-display text-xl">تنبيهات تهمّك</h3>
      </div>
      <p className="mt-1.5 text-[11px] leading-6 text-muted-ink">
        اختر ما تريد معرفته أولًا — عروض، كتب، تقنية، أو فعاليات.
      </p>

      <div className="mt-4 space-y-2.5">
        {items.map(([key, label]) => (
          <label
            key={key}
            className="flex items-center justify-between border border-line bg-ivory px-3 py-2.5 text-[11px]"
          >
            {label}
            <Switch
              checked={Boolean(prefs[key])}
              onCheckedChange={(checked) =>
                setPrefs((current) => ({ ...current, [key]: checked }))
              }
            />
          </label>
        ))}
      </div>

      {done ? (
        <div className="mt-4 flex items-center gap-2 border border-success/20 bg-success/5 px-3 py-2.5 text-[10px] text-success">
          <Check className="size-3.5" />
          تنبيهاتك مفعّلة على البريد المسجل.
        </div>
      ) : (
        <form onSubmit={submit} className="mt-3 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="بريدك الإلكتروني"
            aria-label="البريد الإلكتروني للتنبيهات"
            className="h-9 min-w-0 flex-1 border border-line bg-ivory px-3 text-[11px] outline-none focus:border-ink"
          />
          <button
            type="submit"
            className="inline-flex h-9 shrink-0 items-center gap-1 bg-jarir px-3 text-[10px] text-white hover:bg-jarir-dark"
          >
            فعّل
          </button>
        </form>
      )}
      <p className="mt-3 text-[9px] text-muted-ink">
        تنبيهات مخصصة حسب الاهتمام: ميزة مقترحة للمنصة.
      </p>
    </div>
  );
}

function PersonalOffer() {
  const [selected, setSelected] = useState<InterestId>("tech");
  const { addMany } = useFavorites();
  const product = products.find((item) => item.interests.includes(selected));

  return (
    <div className="border border-line bg-ivory p-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-jarir" />
          <h3 className="font-display text-xl">عرض مخصص</h3>
        </div>
        <span className="text-[8px] text-muted-ink">فكرة عرض</span>
      </div>
      <p className="mt-1.5 text-[11px] leading-6 text-muted-ink">
        اختر اهتمامك ليظهر لك عرض مقترح من الكتالوج.
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(["tech", "reading", "office"] as InterestId[]).map((interest) => (
          <button
            key={interest}
            type="button"
            onClick={() => setSelected(interest)}
            className={cn("chip text-[10px]", selected === interest && "chip-active")}
          >
            {interestLabels[interest]}
          </button>
        ))}
      </div>

      {product && (
        <div className="mt-4 border border-line bg-paper p-3">
          <div className="flex items-center gap-3">
            <span className="grid size-16 shrink-0 place-items-center bg-white p-1.5">
              <img
                src={product.image}
                alt=""
                className="h-full w-full object-contain"
              />
            </span>
            <div className="min-w-0">
              <div className="line-clamp-2 text-[11px] leading-5">
                {product.name}
              </div>
              <Price value={product.price} size="sm" className="mt-1" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => addMany([product.id])}
            className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 bg-ink text-[10px] text-paper hover:bg-jarir"
          >
            <Bookmark className="size-3" />
            احفظ العرض
          </button>
        </div>
      )}
      <Link
        href="/recommendations"
        className="mt-3 inline-flex items-center gap-1 text-[10px] text-muted-ink hover:text-ink"
      >
        توصيات أكثر
        <ArrowLeft className="size-3" />
      </Link>
    </div>
  );
}

export default function Community() {
  return (
    <>
      <PageHero
        eyebrow="تفاعل الجمهور"
        title="مجتمع… يشارك ويختار."
        description="إعجاب، تعليق، مشاركة، حفظ، تقييم، استطلاع، وتنبيهات — أدوات صغيرة تصنع علاقة أطول مع الجمهور، وتغذي التوصيات والمحتوى."
        aside={
          <div className="border border-line bg-paper p-6">
            <div className="grid grid-cols-2 gap-6">
              <StatBlock value="05" label="منشورات المجتمع" />
              <StatBlock value="141" label="تقييمًا على خوف 1" />
              <StatBlock value="2,340" label="صوتًا في الاستطلاع" />
              <StatBlock value="04" label="أدوات تفاعل" />
            </div>
            <p className="mt-6 border-t border-line pt-4 text-[10px] leading-5 text-muted-ink">
              المنشورات والأسماء والشهادات نماذج توضيحية؛ أعداد التقييمات
              الفعلية للمنتجات من صفحات جرير.
            </p>
          </div>
        }
      />

      <section className="border-b border-line bg-paper py-14 md:py-20">
        <div className="container-wide grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <SectionHeading
              number="01"
              eyebrow="مجتمع جرير"
              title="تجارب من الجمهور."
              description="شارك تجربتك، اسأل، واحفظ ما يفيدك. كل تفاعل يبني سياقًا أفضل للتوصيات."
              className="mb-7"
            />
            <div className="space-y-4">
              {communityPosts.map((post, index) => (
                <Reveal key={post.id} delay={index * 0.04}>
                  <FeedPost post={post} />
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-[170px] lg:h-fit">
            <PollCard
              title="أي تجربة تفاعلية تفضّلها؟"
              description="اختر الأقرب لك، وسنطور التجربة القادمة حولها."
            />
            <AlertsForm />
            <PersonalOffer />
          </aside>
        </div>
      </section>

      <section className="border-b border-line bg-ivory py-14 md:py-20">
        <div className="container-wide grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              number="02"
              eyebrow="صوتك يهمنا"
              title="قيّم… وساعد غيرك."
              className="mb-7"
            />
            <RatingForm />
          </div>

          <div>
            <SectionHeading
              number="03"
              eyebrow="لماذا التفاعل؟"
              title="كل ضغطة… هدف."
              className="mb-7"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Heart,
                  title: "الإعجاب والحفظ",
                  text: "إشارات اهتمام واضحة تُحسّن ترتيب التوصيات وتكشف ما يحبه الجمهور.",
                },
                {
                  icon: MessageCircle,
                  title: "التعليقات والأسئلة",
                  text: "محتوى متجدد يكشف أسئلة الجمهور ويصنع مجتمعًا حول المنتج.",
                },
                {
                  icon: Star,
                  title: "التقييمات",
                  text: "تبني الثقة وتدعم قرار الشراء، خاصة عند المقارنة بين خيارات متقاربة.",
                },
                {
                  icon: Bell,
                  title: "التنبيهات",
                  text: "تعيد الزائر في الوقت المناسب، وترفع فرص التحويل من العرض.",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="h-full border border-line bg-paper p-5">
                    <item.icon className="size-4 text-jarir" />
                    <h3 className="mt-3 font-display text-lg">{item.title}</h3>
                    <p className="mt-1.5 text-[11px] leading-6 text-muted-ink">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-night py-14 text-paper md:py-20">
        <div className="container-wide flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-champagne">
              <Trophy className="size-4" />
              <span className="eyebrow text-champagne">شارك في حملة</span>
            </div>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] leading-tight">
              «ارجع أقوى» تبدأ من قائمتك.
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/55">
              اختر مرحلتك، ابنِ حزمة العودة، وشاركها مع أصدقائك. التجربة متاحة
              الآن داخل المنصة.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/interactive"
              className="inline-flex h-12 items-center gap-2 bg-jarir px-6 text-sm text-white hover:bg-jarir-dark"
            >
              ابدأ التجربة
              <ArrowLeft className="size-4" />
            </Link>
            <Link
              href="/campaigns"
              className="inline-flex h-12 items-center gap-2 border border-white/25 px-6 text-sm text-white/75 hover:border-white hover:text-white"
            >
              تفاصيل الحملة
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
