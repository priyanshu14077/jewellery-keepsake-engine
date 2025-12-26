
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilderStore, Step, SpacingType } from '@/lib/builderStore';
import { BASE_PRODUCTS, CHARMS, CHARM_CATEGORIES, Charm as MockCharm } from '@/lib/mock-data';
import { JewelryCanvas } from './JewelryCanvas';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import { 
  Menu as MenuIcon, 
  ShoppingBag, 
  Info, 
  Upload, 
  ChevronDown, 
  X,
  Plus
} from 'lucide-react';

export default function Customizer() {
  const { 
    currentStep,
    setStep,
    selectedBase, 
    setBase, 
    placedCharms,
    selectedCategoryId,
    setCategoryId,
    activeCharmIndex,
    setActiveCharmIndex,
    activeBaseIndex,
    setActiveBaseIndex,
    addCharm,
    removeCharm,
    resetSelection,
    spacingOption,
    setSpacing,
    getTotalPrice
  } = useBuilderStore();

  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  const filteredCharms = CHARMS.filter(c => c.category_id === selectedCategoryId);
  const currentCharm = filteredCharms[activeCharmIndex % filteredCharms.length];
  const selectedCount = placedCharms.length;

  const handleNext = () => {
    if (currentStep === 'charms') setStep('base');
    else if (currentStep === 'base') setStep('space');
  };

  const handleBack = () => {
    if (currentStep === 'base') setStep('charms');
    else if (currentStep === 'space') setStep('base');
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col font-sans text-stone-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-[#F5F1E8]">
        <button className="p-2"><MenuIcon className="w-6 h-6" /></button>
        <h1 className="text-4xl font-serif tracking-tighter text-[#D94528]">DUNME</h1>
        <button className="p-2 relative">
          <ShoppingBag className="w-6 h-6" />
          {selectedCount > 0 && (
            <span className="absolute top-0 right-0 bg-[#D94528] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {selectedCount}
            </span>
          )}
        </button>
      </nav>

      {/* Offer Bar */}
      <div className="bg-[#D94528] text-white py-2 text-center text-[10px] tracking-widest uppercase">
        Use "DUNNE10" on your first order
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between px-8 py-6">
        <button className="p-2 text-stone-400"><Info className="w-5 h-5" /></button>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center border",
              currentStep === 'charms' ? "bg-[#D94528] border-[#D94528] text-white" : "border-stone-300 text-stone-300"
            )}>
              <div className="w-3 h-3 bg-white rotate-45" style={{ display: currentStep === 'charms' ? 'block' : 'none' }} />
            </div>
            <span className={cn("text-[8px] uppercase tracking-tighter", currentStep === 'charms' ? "text-[#D94528]" : "text-stone-300")}>In Progress</span>
          </div>
          <div className="w-8 h-[1px] bg-stone-300 -mt-4" />
          <div className="flex flex-col items-center gap-1">
            <div className={cn(
               "w-6 h-6 rounded-full border flex items-center justify-center",
               currentStep === 'base' ? "bg-[#D94528] border-[#D94528]" : "border-stone-300"
            )}>
               <div className="w-2 h-2 rounded-full bg-white" style={{ display: currentStep === 'base' ? 'block' : 'none' }} />
            </div>
            <span className={cn("text-[8px] uppercase tracking-tighter", currentStep === 'base' ? "text-[#D94528]" : "text-stone-300")}>Base</span>
          </div>
          <div className="w-8 h-[1px] bg-stone-300 -mt-4" />
          <div className="flex flex-col items-center gap-1">
            <div className={cn(
               "w-6 h-6 border rounded-full flex items-center justify-center",
               currentStep === 'space' ? "bg-[#D94528] border-[#D94528]" : "border-stone-300"
            )}>
               <div className="w-3 h-3 rounded flex items-center justify-center" style={{ display: currentStep === 'space' ? 'block' : 'none' }}>
                 <div className="w-[1px] h-3 bg-white" />
                 <div className="w-[1px] h-3 bg-white rotate-90" />
               </div>
            </div>
            <span className={cn("text-[8px] uppercase tracking-tighter", currentStep === 'space' ? "text-[#D94528]" : "text-stone-300")}>Space</span>
          </div>
        </div>

        <button className="p-2 text-stone-400"><Upload className="w-5 h-5" /></button>
      </div>

      {/* Canvas Area */}
      <div className="flex-grow flex flex-col">
        <JewelryCanvas className="flex-grow bg-transparent" />

        {/* Selected Charms Preview Bar */}
        <div className="px-6 py-2 flex flex-col items-end">
          <div className="flex -space-x-2 overflow-hidden items-center pb-1">
            {placedCharms.map((pc, i) => (
              <img 
                key={i} 
                src={pc.charm.thumbnail} 
                className="w-8 h-8 rounded-full border-2 border-white bg-white object-contain p-1 shadow-sm"
              />
            ))}
            {placedCharms.length > 5 && (
              <div className="w-8 h-8 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center text-[8px] text-stone-400">
                +{placedCharms.length - 5}
              </div>
            )}
            <button className="w-8 h-8 rounded-full border border-dashed border-stone-300 flex items-center justify-center ml-2">
              <Plus className="w-4 h-4 text-stone-400" />
            </button>
          </div>
          <p className="text-[10px] text-stone-400 font-light">
            {selectedCount} Charms Selected | <button className="underline text-stone-500">View All</button>
          </p>
        </div>

        {/* Action Bar */}
        <div className="bg-[#1D3D2E] text-white px-6 py-4 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <h3 className="text-xs uppercase tracking-widest font-bold">
              {currentStep === 'charms' ? currentCharm?.name : (selectedBase?.name || 'Select Base')}
            </h3>
            <p className="text-sm font-light">₹{formatCurrency(getTotalPrice())}</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => currentStep === 'charms' ? addCharm(currentCharm) : null}
              className="bg-white text-stone-900 px-6 py-2 rounded-lg text-sm font-bold shadow-lg"
            >
              {currentStep === 'charms' ? '+Add' : 'Selected'}
            </button>
            <button 
              onClick={handleNext}
              className="bg-white text-stone-900 px-6 py-2 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2"
            >
              Next
            </button>
          </div>
        </div>

        {/* Selection Details Area */}
        <div className="bg-[#F5F1E8] px-6 py-4 flex-shrink-0">
          <div 
            className="flex items-center justify-between cursor-pointer border-b border-stone-200 pb-4 mb-4"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <div className="flex items-center gap-3">
              <ChevronDown className={cn("w-5 h-5 transition-transform", isCategoryOpen ? "" : "-rotate-90")} />
              <h4 className="text-lg font-serif">
                {currentStep === 'base' ? 'Exquisite Bases' : 'Eternal Bloom'}
              </h4>
            </div>
            <div className="w-24 h-1 bg-stone-200 rounded-full overflow-hidden">
               <div className="h-full bg-[#1D3D2E]" style={{ width: '40%' }} />
            </div>
          </div>

          <AnimatePresence>
            {isCategoryOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {(currentStep === 'charms' ? filteredCharms : BASE_PRODUCTS).map((item, idx) => {
                    const isSelected = currentStep === 'charms' 
                      ? activeCharmIndex % filteredCharms.length === idx
                      : activeBaseIndex % BASE_PRODUCTS.length === idx;
                    
                    return (
                      <div 
                        key={item.id}
                        onClick={() => currentStep === 'charms' ? setActiveCharmIndex(idx) : setActiveBaseIndex(idx)}
                        className={cn(
                          "flex-shrink-0 w-32 bg-white rounded-2xl p-4 border transition-all duration-300",
                          isSelected ? "border-[#D94528] ring-1 ring-[#D94528]" : "border-stone-100"
                        )}
                      >
                        <div className="aspect-square flex items-center justify-center mb-2 relative">
                           {idx === 1 && (
                             <div className="absolute -top-2 -left-2 bg-[#D94528] text-white text-[6px] uppercase px-1 py-0.5 rounded rotate-[-15deg] font-bold">
                               Most Selling
                             </div>
                           )}
                           <img 
                             src={item.image} 
                             alt={item.name} 
                             className="w-full h-full object-contain"
                           />
                        </div>
                        <p className="text-[8px] font-bold leading-tight mb-1 h-6 line-clamp-2">{item.name}</p>
                        <p className="text-[8px] text-[#D94528] mb-2">+{formatCurrency(item.price)}</p>
                        <button className="w-full bg-stone-50 py-2 rounded-xl text-[8px] font-bold uppercase transition-colors hover:bg-stone-100">
                          {isSelected ? 'Selected' : '+ Add'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spacing Options (Only in Space Step) */}
          {currentStep === 'space' && (
            <div className="mt-4 flex flex-col items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest text-stone-400">Predefined Spacing</span>
              <div className="flex gap-4">
                {(['compact', 'standard', 'loose'] as SpacingType[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpacing(s)}
                    className={cn(
                      "px-6 py-2 rounded-full border text-[10px] uppercase tracking-widest transition-all",
                      spacingOption === s 
                        ? "bg-[#1D3D2E] text-white border-[#1D3D2E]" 
                        : "border-stone-300 text-stone-400"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reset Button */}
          <div className="mt-8 flex justify-center">
            <button 
              onClick={resetSelection}
              className="text-[10px] uppercase tracking-widest text-stone-400 underline hover:text-[#D94528] transition-colors"
            >
              Reset Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
