
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilderStore } from '@/lib/builderStore';
import { formatCurrency } from '@/lib/format';

export const ConfiguratorFooter = ({ onDone }: { onDone: () => void }) => {
  const { getTotalPrice, getSelectedCharmCount, charmQuantity } = useBuilderStore();
  const totalPrice = getTotalPrice();
  const selectedCount = getSelectedCharmCount();
  const isComplete = selectedCount >= charmQuantity && charmQuantity > 0;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-xl border-t border-stone-100 z-50">
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
        {/* Price Section with Odometer Animation */}
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-sans mb-1">Total Investment</span>
          <div className="flex items-baseline overflow-hidden h-8">
            <span className="text-xl font-serif mr-1">₹</span>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={totalPrice}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="text-2xl font-serif tracking-tight"
              >
                {totalPrice.toLocaleString('en-IN')}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress & Action */}
        <div className="flex items-center gap-8">
          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            {Array.from({ length: charmQuantity }).map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < selectedCount ? 'bg-brand-accent' : 'bg-stone-200'
                }`}
              />
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={onDone}
            disabled={!isComplete}
            className={`btn-luxury transition-all ${
              isComplete 
                ? 'hover:bg-brand-primary hover:text-white' 
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {isComplete ? 'Proceed to Review' : `Add ${charmQuantity - selectedCount} more`}
          </button>
        </div>
      </div>
    </div>
  );
};
