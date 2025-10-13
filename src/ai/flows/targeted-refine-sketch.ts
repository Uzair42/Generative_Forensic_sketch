'use server';

/**
 * @fileOverview Refines a specific area of an existing sketch using image-to-image generation.
 *
 * - targetedRefineSketch - A function that refines a sketch based on a base image, a facial area, and a text prompt.
 * - TargetedRefineSketchInput - The input type for the targetedRefineSketch function.
 * - TargetedRefineSketchOutput - The return type for the targetedRefineSketch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TargetedRefineSketchInputSchema = z.object({
  baseImageUrl: z.string().describe('The data URI of the base image to modify, which must include a MIME type and use Base64 encoding.'),
  facialArea: z.enum(['Eyes', 'Nose', 'Mouth']).describe('The specific facial area to target for refinement.'),
  refinementPrompt: z.string().describe('A detailed text prompt describing the desired refinements for the selected area.'),
});
export type TargetedRefineSketchInput = z.infer<typeof TargetedRefineSketchInputSchema>;

const TargetedRefineSketchOutputSchema = z.object({
  sketches: z.array(z.string()).describe('An array of 5 generated sketch data URIs with the targeted refinement.'),
});
export type TargetedRefineSketchOutput = z.infer<typeof TargetedRefineSketchOutputSchema>;

export async function targetedRefineSketch(
  input: TargetedRefineSketchInput
): Promise<TargetedRefineSketchOutput> {
  return targetedRefineSketchFlow(input);
}

const targetedRefineSketchFlow = ai.defineFlow(
  {
    name: 'targetedRefineSketchFlow',
    inputSchema: TargetedRefineSketchInputSchema,
    outputSchema: TargetedRefineSketchOutputSchema,
  },
  async input => {
    const fullPrompt = `You are performing a targeted refinement of a forensic sketch.
Focus ONLY on the subject's ${input.facialArea}.
Apply the following change: "${input.refinementPrompt}".
Do not change any other part of the face.
Preserve the black and white, photorealistic forensic sketch style.
Introduce subtle but distinct variations in the single person depicted based on the requested change.`;

    const generationPromises = Array(5).fill(0).map(() => 
      ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
          {media: {url: input.baseImageUrl}},
          {text: fullPrompt},
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      })
    );

    const results = await Promise.all(generationPromises);
    const sketches = results.map(result => {
      if (!result.media || !result.media.url) {
        throw new Error('An image-to-image generation failed during targeted refinement.');
      }
      return result.media.url;
    });

    return { sketches };
  }
);
