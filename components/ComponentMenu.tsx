
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBuilderStore } from "@/lib/builderStore";
import BaseTab from "./ComponentMenu/BaseTab";
import CharmsTab from "./ComponentMenu/CharmsTab";
import SpacingTab from "./ComponentMenu/SpacingTab";

export default function ComponentMenu() {
  const { currentStep, setStep } = useBuilderStore();

  return (
    <div className="h-full flex flex-col">
      <Tabs value={currentStep} onValueChange={(value) => setStep(value as any)} className="flex-grow flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="base">Base</TabsTrigger>
          <TabsTrigger value="charms">Charms</TabsTrigger>
          <TabsTrigger value="space">Spacing</TabsTrigger>
        </TabsList>
        <TabsContent value="base" className="flex-grow">
          <BaseTab />
        </TabsContent>
        <TabsContent value="charms" className="flex-grow">
          <CharmsTab />
        </TabsContent>
        <TabsContent value="space" className="flex-grow">
          <SpacingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
