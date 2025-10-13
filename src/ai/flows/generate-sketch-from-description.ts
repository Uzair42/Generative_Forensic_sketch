'use server';

/**
 * @fileOverview Generates a forensic sketch from a text description.
 *
 * - generateSketchFromDescription - A function that generates a sketch based on a textual description.
 * - GenerateSketchFromDescriptionInput - The input type for the generateSketchFromDescription function.
 * - GenerateSketchFromDescriptionOutput - The return type for the generateSketchFromDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSketchFromDescriptionInputSchema = z.object({
  description: z.string().describe('A detailed description of the person for whom to generate a forensic sketch.'),
});
export type GenerateSketchFromDescriptionInput = z.infer<typeof GenerateSketchFromDescriptionInputSchema>;

const GenerateSketchFromDescriptionOutputSchema = z.object({
  sketchDataUri: z.string().describe('The generated forensic sketch as a data URI (Base64 encoded image).'),
});
export type GenerateSketchFromDescriptionOutput = z.infer<typeof GenerateSketchFromDescriptionOutputSchema>;

export async function generateSketchFromDescription(input: GenerateSketchFromDescriptionInput): Promise<GenerateSketchFromDescriptionOutput> {
  return generateSketchFromDescriptionFlow(input);
}

const generateSketchPrompt = ai.definePrompt({
  name: 'generateSketchPrompt',
  input: {schema: GenerateSketchFromDescriptionInputSchema},
  output: {schema: GenerateSketchFromDescriptionOutputSchema},
  prompt: `You are a forensic artist who specializes in generating photorealistic sketches based on eyewitness descriptions.  Based on the description provided, create a hyper-realistic sketch. The sketch should be suitable for use in a criminal investigation.

Description: {{{description}}}

Please provide the sketch as a data URI, suitable for displaying in an HTML image tag.
`,
});

const generateSketchFromDescriptionFlow = ai.defineFlow(
  {
    name: 'generateSketchFromDescriptionFlow',
    inputSchema: GenerateSketchFromDescriptionInputSchema,
    outputSchema: GenerateSketchFromDescriptionOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: input.description,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate sketch.');
    }
    
    return { sketchDataUri: media.url };
  }
);
