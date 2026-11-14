import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "red",
}: {
  className?: string;
  variant?: "red" | "white";
}) {
  return (
    <img
      src={
        variant === "white"
          ? "/media/brand/jarir-logo-white.svg"
          : "/media/brand/jarir-logo.svg"
      }
      alt="مكتبة جرير"
      className={cn("w-auto object-contain", className)}
      width={118}
      height={24}
    />
  );
}

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .58.05.85.14V9.4a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 5.1 18.1a6.34 6.34 0 0 0 10.86-4.43V8.17a8.18 8.18 0 0 0 4.77 1.52V6.24a4.85 4.85 0 0 1-1.14-.45z" />
    </svg>
  );
}

export function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}
