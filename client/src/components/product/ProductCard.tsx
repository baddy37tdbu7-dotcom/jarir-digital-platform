import { ArrowLeft, Bookmark, Check } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { categoryName, type Category, type Product } from "@/data/products";
import { useFavorites } from "@/context/FavoritesContext";
import { Price, Rating, Tag } from "@/components/common/Primitives";

export function FavoriteButton({
  productId,
  className,
  variant = "icon",
}: {
  productId: string;
  className?: string;
  variant?: "icon" | "full";
}) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(productId);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggle(productId);
  };

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 border px-5 text-sm font-medium transition-colors",
          active
            ? "border-ink bg-ink text-paper"
            : "border-line bg-transparent text-ink hover:border-ink",
          className,
        )}
        aria-pressed={active}
      >
        {active ? <Check className="size-4" /> : <Bookmark className="size-4" />}
        {active ? "محفوظ في المفضلة" : "أضف إلى المفضلة"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
      aria-pressed={active}
      title={active ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
      className={cn(
        "grid size-9 place-items-center rounded-full border transition-all",
        active
          ? "border-jarir bg-jarir text-white"
          : "border-line bg-white/90 text-ink hover:border-ink hover:bg-white",
        className,
      )}
    >
      <Bookmark className={cn("size-4", active && "fill-current")} />
    </button>
  );
}

export function ProductCard({
  product,
  rank,
  compact = false,
  className,
}: {
  product: Product;
  rank?: number;
  compact?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col border border-line bg-ivory text-ink card-lift",
        className,
      )}
    >
      <Link
        href={`/products/${product.id}`}
        className="media-zoom relative block overflow-hidden bg-white"
      >
        <div className={cn("relative", compact ? "aspect-[4/3]" : "aspect-square")}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={cn(
              "h-full w-full object-contain transition-transform duration-700",
              compact ? "p-5" : "p-7",
            )}
          />
        </div>
        {rank && (
          <span className="num absolute start-4 top-4 grid size-9 place-items-center border border-ink bg-ink text-sm font-semibold text-paper">
            {String(rank).padStart(2, "0")}
          </span>
        )}
        {product.badge && !rank && (
          <Tag tone="white" className="absolute start-4 top-4">
            {product.badge}
          </Tag>
        )}
        <FavoriteButton
          productId={product.id}
          className="absolute end-4 top-4"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 text-[10px] text-muted-ink">
          <span className="font-medium">{categoryName(product.category)}</span>
          <span className="num uppercase tracking-wider">{product.brand}</span>
        </div>

        <h3 className="mt-2 font-display text-[17px] leading-7 text-ink">
          <Link
            href={`/products/${product.id}`}
            className="link-underline decoration-ink/40"
          >
            {product.name}
          </Link>
        </h3>

        {!compact && (
          <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted-ink">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-4">
          {product.rating ? (
            <Rating value={product.rating} reviews={product.reviews} />
          ) : (
            <span className="text-[11px] text-muted-ink">
              متوفر لدى مكتبة جرير
            </span>
          )}

          <div className="mt-3 flex items-end justify-between gap-3 border-t border-line pt-3">
            <Price value={product.price} size="md" />
            <Link
              href={`/products/${product.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-ink transition-colors hover:text-jarir"
            >
              عرض المنتج
              <ArrowLeft className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function CategoryCard({
  category,
  count,
}: {
  category: Category;
  count: number;
}) {
  return (
    <Link
      href={`/products?category=${category.id}`}
      className="group relative flex min-w-0 flex-col justify-between overflow-hidden border border-line bg-ivory p-5 transition-colors hover:border-sand-deep"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">{category.name}</h3>
          <p className="mt-1 text-[11px] text-muted-ink">{category.tagline}</p>
        </div>
        <span className="num text-[10px] text-muted-ink">
          {String(count).padStart(2, "0")}
        </span>
      </div>
      <div className="relative mt-4 h-24 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-contain object-bottom transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <span className="text-[11px] text-muted-ink">تصفح القسم</span>
        <ArrowLeft className="size-3.5 text-jarir transition-transform group-hover:-translate-x-1" />
      </div>
    </Link>
  );
}
