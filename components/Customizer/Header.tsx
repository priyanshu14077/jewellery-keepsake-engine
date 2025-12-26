
import Link from 'next/link';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import { useBuilderStore } from '@/lib/builderStore';

export default function Header() {
  const { placedCharms } = useBuilderStore();
  const selectedCount = placedCharms.length;

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Link href="/" className="text-xl font-bold tracking-[0.2em] uppercase text-primary">
          DUNNE
        </Link>

        <div className="flex items-center gap-2 md:gap-4 text-foreground/80">
          <button aria-label="Bag" className="p-2 relative hover:text-primary">
            <ShoppingBag className="w-5 h-5" />
            {selectedCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {selectedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
