
"use client";

import React, { useMemo } from 'react';
import { useCustomizerStore } from "@/lib/store";
import { DndContext, useSensor, useSensors, PointerSensor, DragEndEvent } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { DraggableCharm } from './DraggableCharm';

export const VisualPreview = () => {
  const { 
    selectedBaseProduct, 
    selectedCharms, 
    updateCharmPosition, 
    currentSlotIndex,
    material
  } = useCustomizerStore();
  
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

  // Calculate zoom transform based on the active charm's position
  // This mimics a jeweler moving the "active" part closer
  const viewTransform = useMemo(() => {
    if (selectedCharms[currentSlotIndex]?.charm) {
      const pos = selectedCharms[currentSlotIndex].position;
      return {
        scale: 1.4,
        x: -pos.x * 0.8,
        y: -pos.y * 0.8
      };
    }
    return { scale: 1, x: 0, y: 0 };
  }, [currentSlotIndex, selectedCharms]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#F9F9F9] overflow-hidden">
      
      {/* Background Soft Shadow / Contact Shadow */}
      <div className="absolute bottom-[20%] w-[60%] h-[10%] bg-stone-200 blur-3xl rounded-[100%] opacity-50" />

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <motion.div 
          className="relative w-full h-[80vh] flex items-center justify-center"
          animate={{
            scale: viewTransform.scale,
            x: viewTransform.x,
            y: viewTransform.y
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {/* Base Product Image */}
          <AnimatePresence mode="wait">
            {selectedBaseProduct ? (
              <motion.div
                key={selectedBaseProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-[80%] h-[80%] flex items-center justify-center"
              >
                <img
                  src={selectedBaseProduct.preview_image_url}
                  alt={selectedBaseProduct.name}
                  className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
                  style={{ 
                    filter: material === 'Silver' ? 'grayscale(1) brightness(1.2)' : 
                            material === 'Rose Gold' ? 'sepia(0.5) hue-rotate(320deg) brightness(1.1)' : 'none' 
                  }}
                />
              </motion.div>
            ) : (
              <div className="text-stone-300 font-serif italic text-2xl uppercase tracking-[0.2em]">
                Dunne
              </div>
            )}
          </AnimatePresence>

          {/* Charm Draggables */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto">
              {selectedCharms.map((item, index) => {
                if (!item.charm) return null;
                
                return (
                  <DraggableCharm
                    key={`${item.charm.id}-${index}`}
                    id={`charm-${index}`}
                    index={index}
                    charm={item.charm}
                    position={item.position}
                    active={index === currentSlotIndex}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </DndContext>
    </div>
  );
};
