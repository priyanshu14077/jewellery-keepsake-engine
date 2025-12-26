
"use client";

import React from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useBuilderStore, PlacedCharm } from '@/lib/builderStore';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface DraggableCharmProps {
  item: PlacedCharm;
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isDraggable?: boolean;
}

const DraggableCharm = ({ item, index, containerRef, isDraggable = true }: DraggableCharmProps) => {
  const { updateCharmPosition, removeCharm } = useBuilderStore();

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    const x = ((info.point.x - rect.left) / rect.width) * 100;
    const y = ((info.point.y - rect.top) / rect.height) * 100;
    
    const newX = Math.max(5, Math.min(95, x));
    const newY = Math.max(5, Math.min(95, y));
    
    updateCharmPosition(index, newX, newY);
  };

  return (
    <motion.div
      drag={isDraggable}
      dragMomentum={true}
      dragElastic={0.2}
      dragConstraints={containerRef}
      onDragEnd={handleDragEnd}
      whileDrag={{ 
        scale: 1.3, 
        zIndex: 50,
        filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.15))'
      }}
      initial={{ scale: 0, opacity: 0, rotate: item.rotation }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        left: `${item.position.x}%`,
        top: `${item.position.y}%`,
        rotate: item.rotation,
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 30,
        opacity: { duration: 0.2 }
      }}
      className="absolute z-30 cursor-grab active:cursor-grabbing group"
      style={{
        transform: 'translate(-50%, -50%)',
        touchAction: 'none'
      }}
    >
      {isDraggable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeCharm(index);
          }}
          className="absolute -top-4 -right-4 w-7 h-7 bg-white border border-border shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/10 hover:border-destructive/20 z-40"
        >
          <X className="w-3.5 h-3.5 text-muted-foreground group-hover:text-destructive" />
        </button>
      )}

      <div className="w-16 h-16 flex items-center justify-center">
        <img
          src={item.charm.thumbnail || item.charm.image}
          alt={item.charm.name}
          className="w-full h-full object-contain drop-shadow-xl pointer-events-none"
          draggable={false}
        />
      </div>

      <motion.div 
        className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10 opacity-0 group-active:opacity-100 transition-opacity"
      />
    </motion.div>
  );
};

export default DraggableCharm;
