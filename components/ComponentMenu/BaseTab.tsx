
"use client";

import { useBuilderStore } from "@/lib/builderStore";
import { BASE_PRODUCTS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function BaseTab() {
  const { selectedBase, setBase, activeBaseIndex, setActiveBaseIndex } = useBuilderStore();

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Choose Your Base</h3>
      <div className="grid grid-cols-2 gap-4">
        {BASE_PRODUCTS.map((product, idx) => {
          const isSelected = selectedBase?.id === product.id;
          return (
            <div
              key={product.id}
              onClick={() => {
                setActiveBaseIndex(idx);
                setBase(product);
              }}
              className={cn(
                "cursor-pointer rounded-lg border p-4 transition-all duration-300",
                isSelected
                  ? "border-primary ring-2 ring-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="aspect-square flex items-center justify-center mb-2 relative bg-white rounded-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-semibold leading-tight mb-1">{product.name}</p>
              <p className="text-sm text-primary">{formatCurrency(product.price)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
