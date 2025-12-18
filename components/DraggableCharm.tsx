
"use client";

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface DraggableCharmProps {
  id: string;
  index: number;
  charm: any;
  position: { x: number; y: number };
}

export const DraggableCharm = ({ id, index, charm, position }: DraggableCharmProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { index }
  });

  const style = {
    // Combine the stored position with the active drag transform
    left: `calc(50% + ${position.x}px)`,
    top: `calc(50% + ${position.y}px)`,
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="absolute w-16 h-16 -ml-8 -mt-8 cursor-grab active:cursor-grabbing group z-50 transition-shadow hover:drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
    >
      <div className="relative w-full h-full flex flex-col items-center">
         {/* Gold Bail/Loop */}
         <div className="w-3 h-3 rounded-full border-2 border-amber-400 bg-amber-100 -mb-1 relative z-10 shadow-sm" />
         
         <div className="relative w-12 h-12">
            <img
               src={charm.thumbnail_url}
               alt={charm.name}
               className="w-full h-full object-contain pointer-events-none drop-shadow-md"
               draggable={false}
            />
         </div>

         {/* Tooltip */}
         <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#B169F6] px-2 py-0.5 rounded text-[10px] text-white font-black italic uppercase tracking-tighter whitespace-nowrap z-50">
            {charm.name}
         </div>
      </div>
    </div>
  );
};
