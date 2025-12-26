
"use client";

import { useBuilderStore } from "@/lib/builderStore";
import { CHARMS, CHARM_CATEGORIES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CharmsTab() {
  const {
    selectedCategoryId,
    setCategoryId,
    addCharm,
    placedCharms,
  } = useBuilderStore();

  const filteredCharms = CHARMS.filter(c => c.category_id === selectedCategoryId);
  const selectedCount = placedCharms.length;


  return (
    <div className="p-6 h-full overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Add Your Charms</h3>

      <div className="mb-4">
        <Select value={selectedCategoryId} onValueChange={(value) => setCategoryId(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CHARM_CATEGORIES.map(category => (
              <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        You have selected {selectedCount} {selectedCount === 1 ? 'charm' : 'charms'}.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {filteredCharms.map((charm) => {
          return (
            <div
              key={charm.id}
              className="cursor-pointer rounded-lg border p-2 transition-all duration-300 hover:border-primary/50"
              onClick={() => addCharm(charm)}
            >
              <div className="aspect-square flex items-center justify-center mb-2 relative bg-white rounded-md">
                <Image
                  src={charm.image}
                  alt={charm.name}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <p className="text-xs font-semibold leading-tight mb-1 h-8 line-clamp-2">{charm.name}</p>
              <p className="text-xs text-primary">{formatCurrency(charm.price)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
