"use client";

import { Sparkles, PenLine } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuildIdeaForm from "@/features/build-idea/components/build-idea-form";
import AnalyzerForm from "./analyzer-form";

export default function AnalyzerSection() {
  return (
    <section className="relative px-5 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="mx-auto mb-6 grid h-11 w-full max-w-md grid-cols-2 rounded-xl border border-blue-300/10 bg-background/60 p-1 backdrop-blur-xl">
            <TabsTrigger value="ai" className="gap-2 rounded-lg text-sm">
              <Sparkles className="h-4 w-4" />
              Build with AI
            </TabsTrigger>

            <TabsTrigger value="manual" className="gap-2 rounded-lg text-sm">
              <PenLine className="h-4 w-4" />
              Enter Manually
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="mt-0">
            <BuildIdeaForm />
          </TabsContent>

          <TabsContent value="manual" className="mt-0">
            <AnalyzerForm />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
