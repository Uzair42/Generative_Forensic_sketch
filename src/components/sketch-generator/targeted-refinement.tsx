'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { targetedRefineSketchAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { TargetedRefineSketchInput } from '@/ai/flows/targeted-refine-sketch';

type FacialArea = TargetedRefineSketchInput['facialArea'];

interface TargetedRefinementProps {
  baseImageUrl: string | null;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  onRefinementComplete: (result: { suggestions?: string[]; error?: string }) => void;
}

const refinementAreas: FacialArea[] = ['Eyes', 'Eyebrows', 'Nose', 'Mouth', 'Jawline', 'Cheeks', 'Forehead', 'Hair'];

export function TargetedRefinement({
  baseImageUrl,
  isGenerating,
  setIsGenerating,
  onRefinementComplete,
}: TargetedRefinementProps) {
  const [selectedArea, setSelectedArea] = useState<FacialArea | null>(null);
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();

  const handleOpenDialog = (area: FacialArea) => {
    setSelectedArea(area);
    setPrompt('');
  };

  const handleCloseDialog = () => {
    setSelectedArea(null);
  };

  const handleSubmit = async () => {
    if (!baseImageUrl || !selectedArea || !prompt.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please ensure you have a base image and a description for the refinement.',
      });
      return;
    }

    setIsGenerating(true);
    handleCloseDialog();

    const result = await targetedRefineSketchAction(baseImageUrl, selectedArea, prompt);
    onRefinementComplete(result);
  };

  const isDisabled = !baseImageUrl || isGenerating;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Targeted Refinement</CardTitle>
        <CardDescription>Select a facial area and describe the changes you want to make.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {refinementAreas.map(area => (
           <Button key={area} onClick={() => handleOpenDialog(area)} disabled={isDisabled} variant="outline" className="w-full">
            Refine {area}
          </Button>
        ))}

        <Dialog open={!!selectedArea} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Refine {selectedArea}</DialogTitle>
              <DialogDescription>
                Describe the changes you'd like to see for the {selectedArea?.toLowerCase()}. Be specific for the best results.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="refinement-prompt">Refinement Description</Label>
                <Textarea
                  id="refinement-prompt"
                  placeholder={`e.g., "Make the ${selectedArea?.toLowerCase()} wider and add a slight upward slant"`}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSubmit} disabled={isGenerating || !prompt.trim()}>
                {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Apply Refinement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
