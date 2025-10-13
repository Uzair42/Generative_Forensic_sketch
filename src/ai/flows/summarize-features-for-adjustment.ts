 'use server';

/**
 * @fileOverview Summarizes the key features of a generated sketch for adjustment guidance.
 *
 * - summarizeFeaturesForAdjustment - A function that summarizes the features of a sketch.
 * - SummarizeFeaturesForAdjustmentInput - The input type for the summarizeFeaturesForAdjustment function.
 * - SummarizeFeaturesForAdjustmentOutput - The return type for the summarizeFeaturesForAdjustment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFeaturesForAdjustmentInputSchema = z.object({
  description: z.string().describe('The detailed description used to generate the sketch.'),
  imageDataUri: z.string().describe(
    'The data URI of the generated sketch image, which must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected description
  ),
});
export type SummarizeFeaturesForAdjustmentInput = z.infer<
  typeof SummarizeFeaturesForAdjustmentInputSchema
>;

const SummarizeFeaturesForAdjustmentOutputSchema = z.object({
  featureSummary: z
    .string()
    .describe('A summarized text description of the key features of the generated sketch.'),
});
export type SummarizeFeaturesForAdjustmentOutput = z.infer<
  typeof SummarizeFeaturesForAdjustmentOutputSchema
>;

export async function summarizeFeaturesForAdjustment(
  input: SummarizeFeaturesForAdjustmentInput
): Promise<SummarizeFeaturesForAdjustmentOutput> {
  return summarizeFeaturesForAdjustmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeFeaturesForAdjustmentPrompt',
  input: {schema: SummarizeFeaturesForAdjustmentInputSchema},
  output: {schema: SummarizeFeaturesForAdjustmentOutputSchema},
  prompt: `You are an AI assistant that summarizes key facial features from a forensic sketch and its original description, highlighting aspects that may need adjustment via sliders.

  Given the original description and the generated sketch, identify the most prominent features and provide a concise summary focusing on elements that can be refined using adjustable sliders (eyes, nose, lips, jawline, wrinkles, facial hair).

  Original Description: {{{description}}}
  Image: {{media url=imageDataUri}}

  Summary:
  `,
});

const summarizeFeaturesForAdjustmentFlow = ai.defineFlow(
  {
    name: 'summarizeFeaturesForAdjustmentFlow',
    inputSchema: SummarizeFeaturesForAdjustmentInputSchema,
    outputSchema: SummarizeFeaturesForAdjustmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
