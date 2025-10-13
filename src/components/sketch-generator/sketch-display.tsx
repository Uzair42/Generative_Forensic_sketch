'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Lightbulb, Loader2 } from 'lucide-react';

interface SketchDisplayProps {
  sketchDataUri: string | null;
  suggestions: string[] | null;
  isGenerating: boolean;
  isSuggesting: boolean;
  onSuggest: () => void;
}

export function SketchDisplay({ 
  sketchDataUri, 
  suggestions,
  isGenerating, 
  isSuggesting,
  onSuggest 
}: SketchDisplayProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === 'sketch-placeholder');
  const imageSrc = sketchDataUri || placeholder?.imageUrl || '';
  const isPlaceholder = !sketchDataUri;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Generated Sketch</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
          {isGenerating ? (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating sketch...</p>
              </div>
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt="Generated forensic sketch"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={placeholder?.imageHint || 'forensic sketch'}
            />
          )}
        </div>
        
        {suggestions && suggestions.length > 0 && (
          <div className="mt-6 rounded-lg border bg-secondary/50 p-4">
            <h4 className="mb-2 font-semibold text-foreground">Improvement Suggestions</h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onSuggest} 
          disabled={isPlaceholder || isGenerating || isSuggesting} 
          className="w-full"
          variant="outline"
        >
          {isSuggesting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="mr-2 h-4 w-4" />
          )}
          Suggest Improvements
        </Button>
      </CardFooter>
    </Card>
  );
}
