
"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useCustomizerStore } from "@/lib/store";
import { MoveRight, RotateCcw } from "lucide-react";
import { DndContext, useSensor, useSensors, PointerSensor, DragEndEvent } from '@dnd-kit/core';
import { DraggableCharm } from './DraggableCharm';

export const VisualPreview = () => {
  const { selectedBaseProduct, selectedCharms, totalPrice, updateCharmPosition, setCharmQuantity, charmQuantity } = useCustomizerStore();
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active } = event;
    const index = active.data.current?.index;
    
    if (typeof index === 'number') {
      const currentPos = selectedCharms[index].position;
      updateCharmPosition(index, currentPos.x + delta.x, currentPos.y + delta.y);
    }
  };

  const handleReset = () => {
     setCharmQuantity(charmQuantity); // This resets positions in our store implementation
  };

  return (
    <div className="sticky top-8 space-y-6">
      <div className="relative p-8 bg-white rounded-[3rem] border-8 border-orange-400 shadow-[20px_20px_0px_0px_rgba(251,146,60,0.2)]">
        <div className="relative aspect-square flex items-center justify-center overflow-hidden rounded-[2rem]">
          
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            {/* Base Product Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              {selectedBaseProduct ? (
                <img
                  src={selectedBaseProduct.preview_image_url}
                  alt={selectedBaseProduct.name}
                  className="w-full h-full object-contain p-4 transition-all duration-700 ease-in-out pointer-events-none"
                />
              ) : (
                <div className="text-zinc-300 font-bold uppercase tracking-widest text-center px-12">
                   Your creative canvas awaits...
                </div>
              )}

              {/* Charm Draggables */}
              <div className="absolute inset-0">
                {selectedCharms.map((item, index) => {
                  if (!item.charm) return null;
                  
                  return (
                    <DraggableCharm
                      key={`${item.charm.id}-${index}`}
                      id={`charm-${index}`}
                      index={index}
                      charm={item.charm}
                      position={item.position}
                    />
                  );
                })}
              </div>
            </div>
          </DndContext>
        </div>
      </div>
      
      {selectedBaseProduct && (
        <div className="px-4 py-3 rounded-xl bg-amber-400/5 border border-amber-400/10 flex items-start gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
           <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
             <span className="text-amber-400">Pro Tip:</span> Drag the charms to align them perfectly with the links of your {selectedBaseProduct.type}. Each attachment is hand-placed by our jewelers exactly where you position it.
           </p>
        </div>
      )}

      {!selectedBaseProduct && (
        <div className="flex items-center gap-3 text-zinc-400 animate-pulse px-4">
           <MoveRight className="w-4 h-4" />
           <p className="text-sm font-medium">Choose a foundation to begin your journey</p>
        </div>
      )}
    </div>
  );
};
