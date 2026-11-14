import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { productById } from "@/data/products";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface FavoritesContextValue {
  ids: string[];
  count: number;
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
  addMany: (ids: string[]) => void;
  remove: (id: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useLocalStorage<string[]>("jarir:favorites", []);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string) => {
      const product = productById(id);
      setIds((current) => {
        if (current.includes(id)) {
          toast("أُزيل من المفضلة", {
            description: product?.name,
          });
          return current.filter((item) => item !== id);
        }
        toast.success("حُفظ في مفضلتك", {
          description: product?.name ?? "يمكنك الوصول إليه من أي صفحة.",
        });
        return [...current, id];
      });
    },
    [setIds],
  );

  const remove = useCallback(
    (id: string) => setIds((current) => current.filter((item) => item !== id)),
    [setIds],
  );

  const addMany = useCallback(
    (newIds: string[]) => {
      setIds((current) => {
        const merged = Array.from(new Set([...current, ...newIds]));
        toast.success("حُفظت الباقة في مفضلتك", {
          description: `${merged.length - current.length} منتجات جديدة أُضيفت إلى الرف.`,
        });
        return merged;
      });
    },
    [setIds],
  );

  const clear = useCallback(() => setIds([]), [setIds]);

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isFavorite,
      toggle,
      addMany,
      remove,
      clear,
      drawerOpen,
      setDrawerOpen,
    }),
    [ids, isFavorite, toggle, addMany, remove, clear, drawerOpen],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return context;
}
