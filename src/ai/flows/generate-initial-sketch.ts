'use server';

/**
 * @fileOverview Generates initial forensic sketches from a text description.
 *
 * - generateInitialSketch - A function that generates 5 initial sketches.
 * - GenerateInitialSketchInput - The input type for the generateInitialSketch function.
 * - GenerateInitialSketchOutput - The return type for the generateInitialSketch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialSketchInputSchema = z.object({
  eyewitnessDescription: z.string().describe('A comprehensive textual description of the suspect.'),
});
export type GenerateInitialSketchInput = z.infer<typeof GenerateInitialSketchInputSchema>;

const GenerateInitialSketchOutputSchema = z.object({
  sketches: z.array(z.string()).describe('An array of 5 generated sketch data URIs.'),
});
export type GenerateInitialSketchOutput = z.infer<typeof GenerateInitialSketchOutputSchema>;

export async function generateInitialSketch(
  input: GenerateInitialSketchInput
): Promise<GenerateInitialSketchOutput> {
  return generateInitialSketchFlow(input);
}

const generateInitialSketchFlow = ai.defineFlow(
  {
    name: 'generateInitialSketchFlow',
    inputSchema: GenerateInitialSketchInputSchema,
    outputSchema: GenerateInitialSketchOutputSchema,
  },
  async input => {
    const fullPrompt = `Generate a hyper-realistic, photorealistic, black and white forensic sketch based on the following eyewitness description. Create 5 distinct but related variations. The subject should have a neutral expression. The background should be a neutral gray, standard for police sketches. Description: ${input.eyewitnessDescription}`;

    const generationPromises = Array(5).fill(0).map(() => 
      ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: fullPrompt,
      })
    );

    const results = await Promise.all(generationPromises);
    const sketches = results.map(result => {
      if (!result.media || !result.media.url) {
        throw new Error('A sketch generation failed.');
      }
      return result.media.url;
    });

    return { sketches };
  }
);
