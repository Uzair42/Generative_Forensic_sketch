'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Download, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SketchDisplayProps {
  currentBaseImage: string | null;
  aiSuggestions: string[];
  isGenerating: boolean;
  onSelectSuggestion: (url: string) => void;
}

export function SketchDisplay({ 
  currentBaseImage, 
  aiSuggestions,
  isGenerating, 
  onSelectSuggestion
}: SketchDisplayProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === 'sketch-placeholder');

  const handleDownload = () => {
    if (!currentBaseImage) return;
    const link = document.createElement('a');
    link.href = currentBaseImage;
    link.download = `sketch-${new Date().toISOString()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="overflow-hidden bg-card">
      <CardHeader>
        <CardTitle>Generated Sketch</CardTitle>
        <CardDescription>
          {isGenerating ? 'Generating new sketches...' : (currentBaseImage ? 'Select a suggestion below or refine the current sketch.' : 'Your generated sketch and variations will appear here.')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
          {isGenerating && !currentBaseImage ? (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating initial sketches...</p>
              </div>
            </div>
          ) : (
            <Image
              src={currentBaseImage || placeholder?.imageUrl || ''}
              alt="Generated forensic sketch"
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={placeholder?.imageHint || 'forensic sketch'}
            />
          )}
          {isGenerating && currentBaseImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
               <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-white">Refining sketch...</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">Suggestions</h4>
          <div className="grid grid-cols-5 gap-2">
            {isGenerating && aiSuggestions.length === 0 ? (
              Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-md" />
              ))
            ) : aiSuggestions.length > 0 ? (
              aiSuggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => onSelectSuggestion(suggestion)}
                  className={cn(
                    "relative aspect-square w-full overflow-hidden rounded-md border-2 transition-all",
                    suggestion === currentBaseImage ? 'border-primary shadow-lg' : 'border-transparent hover:border-primary/50'
                  )}
                >
                  <Image
                    src={suggestion}
                    alt={`Suggestion ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="10vw"
                  />
                </button>
              ))
            ) : (
               Array(5).fill(0).map((_, i) => (
                <div key={i} className="aspect-square w-full rounded-md bg-muted/50"></div>
              ))
            )}
          </div>
        </div>
      </CardContent>
      {currentBaseImage && (
        <CardFooter>
          <Button 
            onClick={handleDownload} 
            disabled={!currentBaseImage || isGenerating}
            className="w-full"
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Sketch
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
