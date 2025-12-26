
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilderStore } from '@/lib/builderStore';
import { formatCurrency } from '@/lib/format';
import { X, Trash2 } from 'lucide-react';

export const ComponentMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { selectedBase, placedCharms, removeCharm, getTotalPrice } = useBuilderStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-12 py-8 border-b border-stone-100">
            <div className="space-y-1">
              <h1 className="text-3xl font-serif tracking-[0.1em] text-[#D94528]">DUNNE</h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400">Your Selection</p>
            </div>
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
            >
              <X className="w-5 h-5 text-stone-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto px-12 py-12 scrollbar-none">
            <div className="max-w-2xl mx-auto space-y-12">
              
              {/* Base Section */}
              <div className="space-y-6">
                <h2 className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">Foundation</h2>
                {selectedBase ? (
                  <div className="flex items-center gap-6 p-6 bg-stone-50 rounded-lg">
                    <div className="w-20 h-20 bg-white rounded-lg p-3 flex items-center justify-center">
                      <img src={selectedBase.image} className="w-full h-full object-contain" alt={selectedBase.name} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-sans tracking-wide text-brand-primary font-bold">{selectedBase.name}</p>
                      <p className="text-[10px] uppercase tracking-widest text-stone-400">{selectedBase.type}</p>
                    </div>
                    <p className="text-lg font-serif">₹{selectedBase.price.toLocaleString()}</p>
                  </div>
                ) : (
                  <p className="text-stone-300 text-sm italic">No base selected yet</p>
                )}
              </div>

              {/* Charms Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">
                    Attachments ({placedCharms.length})
                  </h2>
                </div>
                
                {placedCharms.length === 0 ? (
                  <div className="p-12 border border-dashed border-stone-200 rounded-lg text-center">
                    <p className="text-stone-300 text-sm">No charms added yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {placedCharms.map((item, index) => (
                      <motion.div
                        key={`${item.charm.id}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-6 p-4 bg-stone-50 rounded-lg group"
                      >
                        <div className="w-14 h-14 bg-white rounded-lg p-2 flex items-center justify-center">
                          <img 
                            src={item.charm.thumbnail || item.charm.image} 
                            className="w-full h-full object-contain" 
                            alt={item.charm.name} 
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-sans tracking-wide text-brand-primary font-bold">{item.charm.name}</p>
                          <p className="text-[9px] uppercase tracking-widest text-stone-400">
                             Charm Attachment
                          </p>
                        </div>
                        <p className="text-sm font-serif">+₹{item.charm.price.toLocaleString()}</p>
                        <button 
                          onClick={() => removeCharm(index)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="pt-8 border-t border-stone-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm uppercase tracking-[0.3em] font-bold">Total Investment</span>
                  <span className="text-4xl font-serif">₹{getTotalPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-12 py-8 border-t border-stone-100 bg-white">
            <button 
              onClick={onClose}
              className="w-full bg-[#1D3D2E] text-white py-5 rounded-full text-sm uppercase tracking-[0.2em] font-bold shadow-xl"
            >
              Continue Customizing
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
