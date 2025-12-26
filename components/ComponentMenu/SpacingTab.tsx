
"use client";

import { useBuilderStore, SpacingType } from "@/lib/builderStore";
import { cn } from "@/lib/utils";

export default function SpacingTab() {
  const { spacingOption, setSpacing } = useBuilderStore();

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Adjust Spacing</h3>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Choose how you want to space your charms on the jewelry.
        </p>
        <div className="flex gap-4">
          {(['compact', 'standard', 'loose'] as SpacingType[]).map((s) => (
            <button
              key={s}
              onClick={() => setSpacing(s)}
              className={cn(
                "px-6 py-2 rounded-full border text-sm capitalize transition-all",
                spacingOption === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
