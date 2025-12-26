
"use client";

import React, { useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useBuilderStore, PlacedCharm } from '@/lib/builderStore';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import DraggableCharm from './DraggableCharm';

export const JewelryCanvas = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedBase, placedCharms } = useBuilderStore();

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-full flex items-center justify-center bg-secondary/50",
        className
      )}
    >
      <AnimatePresence>
        <motion.div
          key="final-layout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Base Product Image */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-[70%] h-[70%] flex items-center justify-center"
          >
            {selectedBase && (
              <img
                src={selectedBase.image}
                alt={selectedBase.name}
                className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
              />
            )}

            {/* Placed Charms */}
            <AnimatePresence>
              {placedCharms.map((item, index) => (
                <DraggableCharm
                  key={`charm-${item.charm.id}-${index}`}
                  item={item}
                  index={index}
                  containerRef={containerRef}
                  isDraggable={true}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default JewelryCanvas;
