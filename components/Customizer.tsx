
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
    <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
      {/* Left: Interactive Controls */}
      <div className="space-y-8 animate-in slide-in-from-left duration-700">
        
        {/* Step Indicator */}
        {currentStep !== 'entry' && (
           <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
             {['Base', 'Quantity', 'Charms', 'Review'].map((step, i) => (
                <div key={step} className="flex items-center gap-2 shrink-0">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                    i <= ['base-selection', 'quantity-selection', 'charm-selection', 'review'].indexOf(currentStep)
                      ? "bg-white text-black ring-4 ring-white/10"
                      : "bg-zinc-800 text-zinc-500"
                  )}>
                    {i + 1}
                  </div>
                  <span className={cn(
                    "text-sm font-medium mr-4",
                    i <= ['base-selection', 'quantity-selection', 'charm-selection', 'review'].indexOf(currentStep) ? "text-white" : "text-zinc-500"
                  )}>{step}</span>
                  {i < 3 && <ChevronRight className="w-4 h-4 text-zinc-700 mr-4" />}
                </div>
             ))}
           </div>
        )}

        {/* Dynamic Content Based on Step */}
        <div className="min-h-[400px]">
          {currentStep === 'entry' && (
            <div className="space-y-8 py-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-400 uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Premium Jewelry Experience
                </div>
                <h1 className="text-6xl font-bold tracking-tight text-white leading-tight">
                  Craft Your <span className="text-zinc-500">Masterpiece.</span>
                </h1>
                <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
                  Design a unique piece that tells your story. Our high-fidelity customizer lets you visualize every attachment in real-time.
                </p>
              </div>
              <button 
                onClick={handleNext}
                className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:pr-12 active:scale-95"
              >
                <span className="relative z-10">Start Creating</span>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </button>
            </div>
          )}

          {currentStep === 'base-selection' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Select Your Foundation</h2>
              <Tabs defaultValue="necklace" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-zinc-900/50 p-1 rounded-xl">
                  <TabsTrigger value="necklace" className="rounded-lg py-3 data-[state=active]:bg-zinc-800">Necklaces</TabsTrigger>
                  <TabsTrigger value="bracelet" className="rounded-lg py-3 data-[state=active]:bg-zinc-800">Bracelets</TabsTrigger>
                </TabsList>
                {(['necklace', 'bracelet'] as const).map((type) => (
                  <TabsContent key={type} value={type} className="grid grid-cols-1 gap-3 mt-6">
                    {BASE_PRODUCTS.filter(p => p.type === type).map((product) => (
                       <Card 
                         key={product.id}
                         onClick={() => selectBaseProduct(product)}
                         className={cn(
                           "cursor-pointer transition-all duration-300 border-white/5 bg-zinc-900/30 hover:bg-zinc-900/60 overflow-hidden",
                           selectedBaseProduct?.id === product.id ? "ring-2 ring-white border-transparent" : ""
                         )}
                       >
                         <CardContent className="p-4 flex items-center gap-6">
                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
                               <img src={product.preview_image_url} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                               <h4 className="text-white font-bold">{product.name}</h4>
                               <p className="text-sm text-zinc-500 mt-1 line-clamp-1">{product.description}</p>
                               <div className="flex items-center gap-4 mt-3">
                                  <span className="text-white font-bold">${product.base_price}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-400 font-bold uppercase tracking-widest">{product.item_code}</span>
                               </div>
                            </div>
                         </CardContent>
                       </Card>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}

          {currentStep === 'quantity-selection' && (
            <div className="space-y-8 py-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Number of Charms</h2>
                <p className="text-zinc-500">Tell us how many stories you want to attach to your {selectedBaseProduct?.name.toLowerCase()}.</p>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => {
                      setCharmQuantity(i + 1);
                      handleNext();
                    }}
                    className={cn(
                      "aspect-square rounded-2xl flex items-center justify-center text-xl font-bold transition-all border ",
                      charmQuantity === i + 1 
                        ? "bg-white text-black border-white" 
                        : "bg-zinc-900/50 text-zinc-500 border-white/5 hover:border-white/20 hover:text-white"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'charm-selection' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-bold text-white">Curate your Charms</h2>
                <div className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-white">
                  Slot: {selectedCharms.filter(Boolean).length} / {charmQuantity}
                </div>
              </div>

              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-8">
                  {selectedCharms.map((_, index) => (
                    <div key={index} className="space-y-4 p-6 rounded-3xl bg-zinc-900/40 border border-white/5">
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-zinc-500 flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                           Attachment Slot {index + 1}
                         </span>
                         {selectedCharms[index] && (
                           <button 
                             onClick={() => selectCharm(index, null)}
                             className="text-[10px] text-red-500 font-bold uppercase tracking-widest hover:underline"
                           >
                             Remove
                           </button>
                         )}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                         <Select onValueChange={(val) => selectCharm(index, CHARMS.find(c => c.id === val) || null)}>
                            <SelectTrigger className="bg-zinc-950 border-white/10 rounded-xl h-14">
                               <SelectValue placeholder={selectedCharms[index]?.name || "Choose a charm stone..."} />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white max-h-[300px]">
                               {CHARM_CATEGORIES.map(cat => (
                                 <React.Fragment key={cat.id}>
                                    <div className="px-3 py-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest bg-black/20">{cat.name}</div>
                                    {CHARMS.filter(c => c.category_id === cat.id).map(charm => (
                                      <SelectItem key={charm.id} value={charm.id} className="focus:bg-zinc-800">
                                         <div className="flex items-center justify-between w-full min-w-[300px]">
                                            <span>{charm.name}</span>
                                            <span className="font-bold text-zinc-400">${charm.price}</span>
                                         </div>
                                      </SelectItem>
                                    ))}
                                 </React.Fragment>
                               ))}
                            </SelectContent>
                         </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {currentStep === 'review' && (
            <div className="space-y-10 py-4 max-w-lg">
               <div className="space-y-2">
                 <h2 className="text-3xl font-bold text-white tracking-tight">Final Masterpiece Review</h2>
                 <p className="text-zinc-500">Everything looks perfect. Anything we should know before we start assembly?</p>
               </div>

               <div className="space-y-6">
                  <div className="space-y-4">
                     <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Note for Us</Label>
                     <Input 
                        placeholder="Add a special request (e.g., specific charm spacing)..."
                        value={customerNote}
                        onChange={(e) => setCustomerNote(e.target.value)}
                        className="bg-zinc-900/50 border-white/5 h-16 rounded-2xl focus:ring-1 focus:ring-white transition-all px-6"
                     />
                  </div>

                  <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-4">
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">{selectedBaseProduct?.name}</span>
                        <span className="text-white font-medium">${selectedBaseProduct?.base_price}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">{selectedCharms.filter(Boolean).length} Charms Attached</span>
                        <span className="text-white font-medium">
                          ${selectedCharms.reduce((acc, c) => acc + (c?.price || 0), 0)}
                        </span>
                     </div>
                     <div className="h-px bg-white/5 my-2" />
                     <div className="flex justify-between items-baseline">
                        <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">Total Price</span>
                        <span className="text-3xl font-bold text-white">${totalPrice.toFixed(2)}</span>
                     </div>
                  </div>
               </div>

               <div className="flex gap-4">
                  <button className="flex-grow group relative px-8 py-5 bg-white text-black font-bold rounded-2xl overflow-hidden transition-all hover:bg-zinc-200 active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-white/5">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                    {/* Dynamic Price on Button as requested */}
                    <span className="px-3 py-1 bg-black text-white text-[10px] rounded-full ml-2">
                       ${totalPrice.toFixed(2)}
                    </span>
                  </button>
               </div>
            </div>
          )}
        </div>

        {/* Global Navigation Buttons */}
        {currentStep !== 'entry' && currentStep !== 'review' && (
          <div className="flex gap-4 pt-8">
            <Button 
               variant="outline" 
               size="lg"
               onClick={handleBack}
               className="border-white/10 h-14 px-8 rounded-2xl text-zinc-400 hover:text-white hover:bg-zinc-900"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </Button>
            <button 
              onClick={handleNext}
              disabled={currentStep === 'base-selection' && !selectedBaseProduct}
              className="flex-grow flex items-center justify-center gap-2 bg-white h-14 text-black font-bold rounded-2xl hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {currentStep === 'review' && (
          <Button 
             variant="ghost" 
             onClick={handleBack}
             className="text-zinc-500 hover:text-white"
          >
             <ChevronLeft className="w-4 h-4 mr-1" />
             Back to Selection
          </Button>
        )}
      </div>

      {/* Right: Visual Preview (Always visible) */}
      <div className="hidden lg:block">
        <VisualPreview />
      </div>

      {/* Floating Info (Optional premium touch) */}
      <div className="fixed bottom-8 left-8 hidden lg:flex items-center gap-3 p-4 rounded-2xl bg-zinc-900 shadow-2xl ring-1 ring-white/10 max-w-xs animate-in slide-in-from-bottom duration-1000">
         <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400">
           <Info className="w-5 h-5" />
         </div>
         <p className="text-[10px] font-medium text-zinc-500 leading-normal uppercase tracking-wide">
           Every piece is hand-assembled by our master jewelers for peak perfection.
         </p>
      </div>
    </div>
  );
}
