
"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { useCustomizerStore } from "@/lib/store";
import { BASE_PRODUCTS, CHARM_CATEGORIES, CHARMS } from "@/lib/mock-data";
import { VisualPreview } from "./VisualPreview";
import { 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShoppingBag,
  Info
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";


const NavTab = ({ label, color, active, index = 0 }: { label: string; color: string; active?: boolean; index?: number }) => {
  const shapes = [
    "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
    "polygon(0% 15%, 100% 0%, 85% 100%, 15% 85%)",
    "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
    "ellipse(50% 40% at 50% 50%)",
  ];
  const fixedShape = shapes[index % shapes.length];
  
  return (
    <div 
      className={cn(
        "px-6 py-3 text-white font-black text-sm uppercase tracking-tighter cursor-pointer transition-transform hover:scale-110 active:scale-95 shrink-0 flex items-center justify-center",
        active ? "scale-105" : "opacity-90"
      )}
      style={{ 
        backgroundColor: color,
        clipPath: fixedShape,
        minWidth: '120px'
      }}
    >
      {label}
    </div>
  );
};

export default function Customizer() {
  const { 
    currentStep, 
    setStep, 
    selectedBaseProduct, 
    selectBaseProduct,
    charmQuantity,
    setCharmQuantity,
    selectedCharms,
    selectCharm,
    customerNote,
    setCustomerNote,
    totalPrice
  } = useCustomizerStore();

  const stepIndex = ['entry', 'base-selection', 'quantity-selection', 'charm-selection', 'review'].indexOf(currentStep);
  const stepLabel = currentStep === 'entry' ? 'Start' : `Step ${stepIndex} of 4`;

  const handleNext = () => {
    if (currentStep === 'entry') setStep('base-selection');
    else if (currentStep === 'base-selection') setStep('quantity-selection');
    else if (currentStep === 'quantity-selection') setStep('charm-selection');
    else if (currentStep === 'charm-selection') setStep('review');
  };

  const handleBack = () => {
    if (currentStep === 'base-selection') setStep('entry');
    else if (currentStep === 'quantity-selection') setStep('base-selection');
    else if (currentStep === 'charm-selection') setStep('quantity-selection');
    else if (currentStep === 'review') setStep('charm-selection');
  };

  return (
    <div className="min-h-screen bg-[#FFF000] -mt-16 -mx-6">
      {/* Promo Banner */}
      <div className="bg-[#FFC0D3] py-2 text-center text-[10px] font-black italic uppercase tracking-widest text-[#FF33C2] border-b-2 border-[#FF33C2]/10">
         Holiday delivery is no longer guaranteed, but we're hoping for a magic miracle!
      </div>

      {/* Playful Header */}
      <div className="bg-[#B169F6] pt-12 pb-6 border-b-4 border-black/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
           <h1 className="text-7xl font-black text-white italic tracking-tighter drop-shadow-[5px_5px_0px_rgba(0,0,0,0.2)] scale-y-110">
             SUSAN ALEXANDRA
           </h1>
           <div className="flex items-center gap-2 overflow-x-auto w-full justify-center no-scrollbar pb-4 mt-4">
             <NavTab label="Shop All" color="#FF3A3A" index={0} />
             <NavTab label="New" color="#FF8A00" index={1} />
             <NavTab label="Jewelry" color="#00C2FF" index={2} />
             <NavTab label="Make Your Own" color="#3AFF33" active index={3} />
             <NavTab label="Accessories" color="#FF33C2" index={4} />
             <NavTab label="Pet" color="#FF8A00" index={5} />
             <NavTab label="Bags" color="#FF3A3A" index={6} />
             <NavTab label="Home" color="#FF33C2" index={7} />
             <NavTab label="Judaica" color="#00C2FF" index={8} />
             <NavTab label="More" color="#3AFF33" index={9} />
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Visual Preview */}
          <div className="order-2 lg:order-1 flex flex-col items-center gap-8">
             <div className="w-full">
                <VisualPreview />
             </div>
             {currentStep === 'review' && (
                <div className="w-full bg-white p-8 rounded-[2rem] border-4 border-orange-400 shadow-xl">
                   <h3 className="text-2xl font-black text-[#B169F6] mb-4 italic">Your Selection Summary</h3>
                   <div className="space-y-2">
                      <div className="flex justify-between text-lg font-bold">
                         <span>{selectedBaseProduct?.name}</span>
                         <span>${selectedBaseProduct?.base_price}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-zinc-500">
                         <span>{selectedCharms.filter(i => i.charm).length} Charms</span>
                         <span>${selectedCharms.reduce((acc, i) => acc + (i.charm?.price || 0), 0)}</span>
                      </div>
                      <div className="h-1 bg-zinc-100 my-4 rounded-full" />
                      <div className="flex justify-between text-3xl font-black text-orange-500 italic">
                         <span>TOTAL</span>
                         <span>${totalPrice.toFixed(2)}</span>
                      </div>
                   </div>
                </div>
             )}
          </div>

          {/* Right: Controls */}
          <div className="order-1 lg:order-2 space-y-8 lg:pt-12">
            <div className="space-y-2">
               <p className="text-[#B169F6] font-black text-xl italic uppercase tracking-tighter">
                 Jewelry ~ {selectedBaseProduct?.type || 'Customizer'}
               </p>
               <h2 className="text-6xl font-black text-[#FF33C2] tracking-tighter leading-none italic uppercase">
                 {currentStep === 'entry' ? 'Make Your Own' : stepLabel}
               </h2>
               <p className="text-2xl font-black text-[#B169F6] italic">
                 {currentStep === 'entry' && 'Design your dream piece ✨'}
                 {currentStep === 'base-selection' && 'Select Your Foundation'}
                 {currentStep === 'quantity-selection' && 'How many treasures?'}
                 {currentStep === 'charm-selection' && 'Curate your magic'}
                 {currentStep === 'review' && 'Ready to checkout?'}
               </p>
            </div>

            <div className="min-h-[400px]">
              {currentStep === 'entry' && (
                <div className="py-12 space-y-8">
                  <div className="bg-white p-8 rounded-[2rem] border-4 border-[#3AFF33] shadow-lg transform -rotate-1">
                    <p className="text-xl font-bold text-zinc-600 leading-relaxed">
                      Welcome to the workshop! Pick a base, choose your charms, and place them exactly where you want. No rules, just joy.
                    </p>
                  </div>
                  <button 
                    onClick={handleNext}
                    className="w-full py-6 bg-[#FF33C2] text-white font-black text-3xl italic rounded-full shadow-[8px_8px_0px_0px_#B169F6] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  >
                    START CREATING →
                  </button>
                </div>
              )}

              {currentStep === 'base-selection' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 h-[500px] overflow-y-auto pr-4 no-scrollbar">
                    {BASE_PRODUCTS.map((product) => (
                       <div 
                         key={product.id}
                         onClick={() => selectBaseProduct(product)}
                         className={cn(
                           "group cursor-pointer p-8 bg-white rounded-[2.5rem] border-4 transition-all flex items-center gap-8 shadow-xl hover:-translate-y-1 active:translate-y-0",
                           selectedBaseProduct?.id === product.id 
                            ? "border-[#FF33C2] shadow-[12px_12px_0px_0px_#FF33C2]" 
                            : "border-zinc-100 hover:border-[#FF33C2]/30"
                         )}
                       >
                         <div className="w-32 h-32 rounded-3xl bg-[#FFF000]/30 p-4 shrink-0 group-hover:rotate-12 transition-transform">
                            <img src={product.preview_image_url} className="w-full h-full object-contain drop-shadow-lg" />
                         </div>
                         <div className="flex-grow">
                            <h4 className="text-3xl font-black text-zinc-800 italic uppercase leading-tight tracking-tighter">{product.name}</h4>
                            <p className="text-xl font-bold text-[#B169F6] mt-2 opacity-80">{product.type}</p>
                            <div className="mt-4 inline-block px-4 py-2 bg-[#3AFF33] text-black font-black italic rounded-xl text-xl">
                               ${product.base_price}
                            </div>
                         </div>
                       </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 'quantity-selection' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setCharmQuantity(num);
                          handleNext();
                        }}
                        className={cn(
                          "aspect-square rounded-full flex items-center justify-center text-3xl font-black transition-all border-4",
                          charmQuantity === num 
                            ? "bg-[#3AFF33] text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                            : "bg-white text-zinc-400 border-zinc-100 hover:border-[#3AFF33] hover:text-black"
                        )}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 'charm-selection' && (
                <div className="space-y-8">
                   <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-12">
                         {selectedCharms.map((item, index) => (
                            <div key={index} className="space-y-4">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-[#B169F6] text-white flex items-center justify-center font-black text-xl italic">
                                    {index + 1}
                                  </div>
                                  <h3 className="text-2xl font-black text-zinc-800 uppercase italic">
                                    {item.charm?.name || 'Pick a charm'}
                                  </h3>
                               </div>

                               <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                                  {CHARMS.map(charm => (
                                     <button
                                       key={charm.id}
                                       onClick={() => selectCharm(index, charm)}
                                       className={cn(
                                         "aspect-square rounded-xl bg-white border-2 p-2 transition-all hover:scale-110 active:scale-95 flex items-center justify-center",
                                         item.charm?.id === charm.id ? "border-[#FF33C2] shadow-[4px_4px_0px_0px_#FF33C2]" : "border-zinc-100 hover:border-zinc-200"
                                       )}
                                     >
                                        <img src={charm.thumbnail_url} className="w-full h-full object-contain" />
                                     </button>
                                  ))}
                               </div>
                            </div>
                         ))}
                      </div>
                   </ScrollArea>
                </div>
              )}

              {currentStep === 'review' && (
                <div className="space-y-8">
                   <div className="bg-white p-8 rounded-[2rem] border-4 border-[#B169F6] space-y-6">
                      <div className="space-y-2">
                         <Label className="text-xl font-black text-[#B169F6] italic uppercase">Special Note for Us</Label>
                         <Input 
                            placeholder="Tell us something sweet..."
                            value={customerNote}
                            onChange={(e) => setCustomerNote(e.target.value)}
                            className="bg-zinc-50 border-none h-16 rounded-2xl text-xl font-bold p-6 focus:ring-4 focus:ring-[#B169F6]/20 transition-all placeholder:italic"
                         />
                      </div>
                   </div>

                   <button className="w-full py-8 bg-[#3AFF33] text-black font-black text-4xl italic rounded-[2rem] shadow-[12px_12px_0px_0px_#B169F6] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all flex flex-col items-center">
                      ADD TO BAG
                      <span className="text-xl opacity-60">Total: ${totalPrice.toFixed(2)}</span>
                   </button>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            {currentStep !== 'entry' && (
              <div className="flex gap-4 pt-12">
                <button 
                   onClick={handleBack}
                   className="w-20 h-20 rounded-full bg-white border-4 border-zinc-100 flex items-center justify-center text-zinc-400 hover:border-[#FF33C2] hover:text-[#FF33C2] transition-all"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentStep === 'base-selection' && !selectedBaseProduct}
                  className="flex-grow bg-[#FF33C2] text-white font-black text-3xl italic rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-30 uppercase"
                >
                  Next Step →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Fun */}
      <div className="bg-[#FFC0D3] py-24 mt-24">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-black text-[#FF33C2] italic tracking-tighter mb-4">WANT TO BE A JEWELRY DESIGNER?</h2>
            <p className="text-2xl font-black text-[#B169F6] italic uppercase">Tag us in your creations @susan_alexandra</p>
         </div>
      </div>
    </div>
  );
}
