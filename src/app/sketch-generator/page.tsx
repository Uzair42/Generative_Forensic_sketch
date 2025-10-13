'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { generateSketchAction, getSuggestionsAction } from '@/app/actions';

import { SketchGeneratorForm } from '@/components/sketch-generator/sketch-generator-form';
import { SketchDisplay } from '@/components/sketch-generator/sketch-display';
import type { SketchFormValues } from '@/components/sketch-generator/sketch-schema';
import { Skeleton } from '@/components/ui/skeleton';

export default function SketchGeneratorPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [sketchDataUri, setSketchDataUri] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
    }
  }, [user, authLoading, router]);

  const handleGenerateSketch = async (data: SketchFormValues) => {
    setIsGenerating(true);
    setSuggestions(null);
    const result = await generateSketchAction(data);
    setIsGenerating(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error,
      });
    } else if (result.sketchDataUri && result.prompt) {
      setSketchDataUri(result.sketchDataUri);
      setCurrentPrompt(result.prompt);
      toast({
        title: 'Sketch Generated!',
        description: 'Your sketch has been successfully created.',
      });
    }
  };

  const handleGetSuggestions = async () => {
    if (!currentPrompt || !sketchDataUri) {
      toast({
        variant: 'destructive',
        title: 'Cannot get suggestions',
        description: 'A sketch must be generated first.',
      });
      return;
    }
    
    setIsSuggesting(true);
    const result = await getSuggestionsAction(currentPrompt, sketchDataUri);
    setIsSuggesting(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Suggestion Failed',
        description: result.error,
      });
    } else if (result.suggestions) {
      setSuggestions(result.suggestions);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="container mx-auto max-w-7xl p-4 md:p-8">
         <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="space-y-8 lg:col-span-2">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
            <div className="lg:col-span-3">
                <Skeleton className="aspect-square w-full" />
            </div>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto max-w-7xl p-4 md:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-6">Sketch Controls</h1>
            <SketchGeneratorForm 
              onSubmit={handleGenerateSketch}
              isGenerating={isGenerating}
            />
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="sticky top-24">
            <SketchDisplay
              sketchDataUri={sketchDataUri}
              suggestions={suggestions}
              isGenerating={isGenerating}
              isSuggesting={isSuggesting}
              onSuggest={handleGetSuggestions}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
