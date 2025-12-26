
"use client";

import React from 'react';
import { useBuilderStore } from '@/lib/builderStore';
import { JewelryCanvas } from '@/components/JewelryCanvas';
import ComponentMenu from '@/components/ComponentMenu';
import ConfiguratorFooter from '@/components/ConfiguratorFooter';
import Header from './Customizer/Header';

export default function Customizer() {
  const { currentStep, setStep } = useBuilderStore();

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
      <Header />
      <div className="flex-grow flex">
        <main className="w-2/3 flex flex-col">
          <div className="flex-grow flex items-center justify-center">
            <JewelryCanvas />
          </div>
          <ConfiguratorFooter />
        </main>
        <aside className="w-1/3 bg-secondary border-l border-border">
          <ComponentMenu />
        </aside>
      </div>
    </div>
  );
}
