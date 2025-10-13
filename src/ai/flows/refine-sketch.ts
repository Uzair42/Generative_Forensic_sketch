'use server';

/**
 * @fileOverview Refines an existing sketch using image-to-image generation.
 *
 * - refineSketch - A function that refines a sketch based on a base image and a text prompt.
 * - RefineSketchInput - The input type for the refineSketch function.
 * - RefineSketchOutput - The return type for the refineSketch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineSketchInputSchema = z.object({
  baseImageUrl: z.string().describe('The data URI of the base image to modify, which must include a MIME type and use Base64 encoding.'),
  facialFeaturePrompt: z.string().describe('A detailed text prompt describing the desired refinements.'),
});
export type RefineSketchInput = z.infer<typeof RefineSketchInputSchema>;

const RefineSketchOutputSchema = z.object({
  sketches: z.array(z.string()).describe('An array of 5 generated sketch data URIs.'),
});
export type RefineSketchOutput = z.infer<typeof RefineSketchOutputSchema>;

export async function refineSketch(
  input: RefineSketchInput
): Promise<RefineSketchOutput> {
  return refineSketchFlow(input);
}

const refineSketchFlow = ai.defineFlow(
  {
    name: 'refineSketchFlow',
    inputSchema: RefineSketchInputSchema,
    outputSchema: RefineSketchOutputSchema,
  },
  async input => {
    const generationPromises = Array(5).fill(0).map(() => 
      ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
          {media: {url: input.baseImageUrl}},
          {text: `Refine this forensic sketch based on the following instructions: ${input.facialFeaturePrompt}. Make subtle but distinct variations.`},
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      })
    );

    const results = await Promise.all(generationPromises);
    const sketches = results.map(result => {
      if (!result.media || !result.media.url) {
        throw new Error('An image-to-image generation failed.');
      }
      return result.media.url;
    });

    return { sketches };
  }
);
