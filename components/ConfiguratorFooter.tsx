
"use client";

import React from 'react';
import { useBuilderStore } from '@/lib/builderStore';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';

export default function ConfiguratorFooter() {
  const { getTotalPrice } = useBuilderStore();
  const totalPrice = getTotalPrice();

  return (
    <div className="p-6 border-t border-border">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Total Price</span>
          <span className="text-2xl font-bold">
            {formatCurrency(totalPrice)}
          </span>
        </div>
        <Button size="lg" className="uppercase tracking-wider">Add to Bag</Button>
      </div>
    </div>
  );
}
