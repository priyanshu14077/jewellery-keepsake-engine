
"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useCustomizerStore } from "@/lib/store";
import { MoveRight } from "lucide-react";

export const VisualPreview = () => {
  const { selectedBaseProduct, selectedCharms, totalPrice } = useCustomizerStore();

  return (
    <div className="sticky top-8 space-y-6">
      <Card className="overflow-hidden border-none bg-zinc-900/50 backdrop-blur-xl shadow-2xl ring-1 ring-white/10">
        <CardContent className="p-0 relative aspect-square flex items-center justify-center overflow-hidden">
          {/* Base Product Image */}
          {selectedBaseProduct ? (
            <img
              src={selectedBaseProduct.preview_image_url}
              alt={selectedBaseProduct.name}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-105 hover:scale-100"
            />
          ) : (
            <div className="text-zinc-500 font-medium">Select a base to start</div>
          )}

          {/* Charm Overlays (USP: State Handling) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
             <div className="relative w-3/4 h-3/4 flex items-center justify-center">
                {selectedCharms.map((charm, index) => {
                  if (!charm) return null;
                  
                  // Circular arrangement logic for demo
                  const angle = (index / selectedCharms.length) * Math.PI * 2;
                  const radius = 100; // px
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <img
                      key={`${charm.id}-${index}`}
                      src={charm.thumbnail_url}
                      alt={charm.name}
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      className="absolute w-12 h-12 rounded-full border-2 border-white shadow-lg transition-all duration-500 animate-in fade-in zoom-in"
                    />
                  );
                })}
             </div>
          </div>

          {/* Pricing Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-black/60 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 flex justify-between items-center transform transition-all duration-300">
              <div>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Total Est.</p>
                <p className="text-xl font-bold text-white">${totalPrice.toFixed(2)}</p>
              </div>
              <div className="h-8 w-px bg-white/10 mx-4" />
              <div className="flex -space-x-2">
                {selectedCharms.filter(Boolean).slice(0, 3).map((charm, i) => (
                   <div key={i} className="w-8 h-8 rounded-full border border-white/20 overflow-hidden bg-zinc-800">
                     <img src={charm?.thumbnail_url} className="w-full h-full object-cover" />
                   </div>
                ))}
                {selectedCharms.filter(Boolean).length > 3 && (
                  <div className="w-8 h-8 rounded-full border border-white/20 bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-bold">
                    +{selectedCharms.filter(Boolean).length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {!selectedBaseProduct && (
        <div className="flex items-center gap-3 text-zinc-400 animate-pulse px-4">
           <MoveRight className="w-4 h-4" />
           <p className="text-sm font-medium">Choose a foundation to begin your journey</p>
        </div>
      )}
    </div>
  );
};
