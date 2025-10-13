'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { generateInitialSketchAction, refineSketchAction } from '@/app/actions';

import { SketchGeneratorForm } from '@/components/sketch-generator/sketch-generator-form';
import { SketchDisplay } from '@/components/sketch-generator/sketch-display';
import type { SketchFormValues } from '@/components/sketch-generator/sketch-schema';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextInputGenerator } from '@/components/sketch-generator/text-input-generator';

type Mode = 'text-to-sketch' | 'refine-sketch';

export default function SketchGeneratorPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [mode, setMode] = useState<Mode>('text-to-sketch');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentBaseImage, setCurrentBaseImage] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
    }
  }, [user, authLoading, router]);

  const handleGenerateInitialSketch = async (description: string) => {
    setIsGenerating(true);
    setAiSuggestions([]);
    setCurrentBaseImage(null);
    const result = await generateInitialSketchAction(description);
    setIsGenerating(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error,
      });
    } else if (result.suggestions && result.suggestions.length > 0) {
      setAiSuggestions(result.suggestions);
      setCurrentBaseImage(result.suggestions[0]);
      setMode('refine-sketch');
      toast({
        title: 'Initial Sketches Generated!',
        description: 'Select a sketch to start refining.',
      });
    }
  };

  const handleRefineSketch = async (data: SketchFormValues) => {
    if (!currentBaseImage) {
      toast({
        variant: 'destructive',
        title: 'Cannot Refine Sketch',
        description: 'Please generate or select an initial sketch first.',
      });
      return;
    }
    setIsGenerating(true);
    setAiSuggestions([]);
    const result = await refineSketchAction(currentBaseImage, data);
    setIsGenerating(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Refinement Failed',
        description: result.error,
      });
    } else if (result.suggestions && result.suggestions.length > 0) {
      setAiSuggestions(result.suggestions);
      setCurrentBaseImage(result.suggestions[0]);
      toast({
        title: 'Sketch Refined!',
        description: 'The sketch has been updated with your changes.',
      });
    }
  };

  if (authLoading || !user) {
    return (
      <div className="container mx-auto max-w-7xl p-4 md:p-8">
         <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-1">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
            <div className="lg:col-span-2">
                <Skeleton className="aspect-square w-full" />
            </div>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto max-w-7xl p-4 md:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg bg-card p-4 shadow">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline mb-4">Controls</h1>
            <Tabs value={mode} onValueChange={(value) => setMode(value as Mode)} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text-to-sketch">Text to Initial Sketch</TabsTrigger>
                <TabsTrigger value="refine-sketch">Refine Sketch</TabsTrigger>
              </TabsList>
              <TabsContent value="text-to-sketch" className="mt-4">
                <TextInputGenerator
                  onSubmit={handleGenerateInitialSketch}
                  isGenerating={isGenerating}
                />
              </TabsContent>
              <TabsContent value="refine-sketch" className="mt-4">
                <SketchGeneratorForm 
                  onSubmit={handleRefineSketch}
                  isGenerating={isGenerating}
                  disabled={!currentBaseImage}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <SketchDisplay
              currentBaseImage={currentBaseImage}
              aiSuggestions={aiSuggestions}
              isGenerating={isGenerating}
              onSelectSuggestion={setCurrentBaseImage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
