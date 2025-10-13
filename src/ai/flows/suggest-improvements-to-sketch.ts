'use server';

/**
 * @fileOverview Suggests improvements to a generated forensic sketch based on common forensic practices.
 *
 * - suggestImprovementsToSketch - A function that suggests improvements to a sketch.
 * - SuggestImprovementsToSketchInput - The input type for the suggestImprovementsToSketch function.
 * - SuggestImprovementsToSketchOutput - The return type for the suggestImprovementsToSketch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImprovementsToSketchInputSchema = z.object({
  prompt: z.string().describe('The original prompt used to generate the sketch.'),
  imageDataUri: z.string().describe(
    'The data URI of the generated sketch image, which must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected description
  ),
});
export type SuggestImprovementsToSketchInput = z.infer<
  typeof SuggestImprovementsToSketchInputSchema
>;

const SuggestImprovementsToSketchOutputSchema = z.object({
  suggestedImprovements: z
    .array(z.string())
    .describe('An array of suggested improvements to the sketch.'),
});
export type SuggestImprovementsToSketchOutput = z.infer<
  typeof SuggestImprovementsToSketchOutputSchema
>;

export async function suggestImprovementsToSketch(
  input: SuggestImprovementsToSketchInput
): Promise<SuggestImprovementsToSketchOutput> {
  return suggestImprovementsToSketchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestImprovementsToSketchPrompt',
  input: {schema: SuggestImprovementsToSketchInputSchema},
  output: {schema: SuggestImprovementsToSketchOutputSchema},
  prompt: `You are a forensic artist providing feedback on a sketch.

  Based on common forensic practices and the details of the original prompt, suggest at least three potential improvements to the sketch to increase its accuracy and realism. The suggestions should be specific and actionable.

  Original Prompt: {{{prompt}}}
  Image: {{media url=imageDataUri}}

  Consider details such as:
  - Accuracy of facial proportions (eyes, nose, mouth placement)
  - Realism of textures (skin, hair)
  - Consistency of lighting and shadows
  - Alignment with common forensic guidelines

  Suggestions (one suggestion per line):
  `, // Added suggestions instructions
});

const suggestImprovementsToSketchFlow = ai.defineFlow(
  {
    name: 'suggestImprovementsToSketchFlow',
    inputSchema: SuggestImprovementsToSketchInputSchema,
    outputSchema: SuggestImprovementsToSketchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
