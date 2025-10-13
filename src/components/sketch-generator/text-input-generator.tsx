'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface TextInputGeneratorProps {
  onSubmit: (description: string) => void;
  isGenerating: boolean;
}

export function TextInputGenerator({ onSubmit, isGenerating }: TextInputGeneratorProps) {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="description">Eyewitness Description</Label>
        <Textarea
          id="description"
          placeholder="e.g., Male, 30s, sharp jaw, thin lips, dark hooded eyes, scar on left cheek..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          disabled={isGenerating}
        />
        <p className="text-sm text-muted-foreground">
          Provide a detailed description of the suspect.
        </p>
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isGenerating || !description.trim()}>
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Initial Sketch'
        )}
      </Button>
    </form>
  );
}
