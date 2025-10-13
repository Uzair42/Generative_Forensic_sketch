'use server';

import { generateInitialSketch } from '@/ai/flows/generate-initial-sketch';
import { refineSketch } from '@/ai/flows/refine-sketch';
import { suggestImprovementsToSketch } from '@/ai/flows/suggest-improvements-to-sketch';
import { targetedRefineSketch, TargetedRefineSketchInput } from '@/ai/flows/targeted-refine-sketch';
import type { SketchFormValues } from '@/components/sketch-generator/sketch-schema';
import { revalidatePath } from 'next/cache';

function mapValueToDescription(value: number, low: string, mid: string, high: string): string {
  if (value <= 3) return low;
  if (value >= 8) return high;
  return mid;
}

function constructPrompt(data: SketchFormValues): string {
  const parts = [
    `A hyper-realistic, photorealistic, black and white forensic sketch of a ${data.gender}, approximately ${data.age} years old, of ${data.ethnicity} descent.`,
    'The subject has a neutral expression.',
    `The eyes are ${mapValueToDescription(data.eyePosition, 'narrow-set', 'average-set', 'wide-set')}, with a ${mapValueToDescription(data.eyeSlant, 'downward slant', 'neutral slant', 'upward slant')}, and are ${mapValueToDescription(data.eyeSize, 'small', 'average-sized', 'large')}.`,
    `The nose is ${mapValueToDescription(data.noseWidth, 'thin', 'of average width', 'wide')}, with a ${mapValueToDescription(data.noseBridge, 'straight bridge', 'medium bridge', 'hooked or prominent bridge')}.`,
    `The lips are ${mapValueToDescription(data.lipThickness, 'thin', 'of average thickness', 'full')}, and have a ${mapValueToDescription(data.lipWidth, 'narrow width', 'medium width', 'wide width')}.`,
    `The jawline is ${mapValueToDescription(data.jawShape, 'rounded or soft', 'defined', 'square and strong')}, with ${mapValueToDescription(data.jawProminence, 'a weak or recessed prominence', 'an average prominence', 'a strong or prominent chin')}.`,
    `Skin has ${mapValueToDescription(data.wrinkles, 'very few to no wrinkles', 'some light wrinkles', 'deep and prominent wrinkles')}.`,
    `Facial hair is best described as ${mapValueToDescription(data.facialHair, 'clean-shaven', 'light stubble', 'a heavy beard or goatee')}.`,
    'The background should be a neutral gray, standard for police sketches.',
  ];

  return parts.join(' ');
}

export async function generateInitialSketchAction(
  eyewitnessDescription: string
): Promise<{ suggestions?: string[]; error?: string }> {
  try {
    const result = await generateInitialSketch({ eyewitnessDescription });
    revalidatePath('/sketch-generator');
    return { suggestions: result.sketches };
  } catch (error) {
    console.error('Error generating initial sketch:', error);
    return { error: 'Failed to generate initial sketch. Please try again.' };
  }
}

export async function refineSketchAction(
  baseImageUrl: string,
  data: SketchFormValues
): Promise<{ suggestions?: string[]; error?: string }> {
  try {
    const facialFeaturePrompt = constructPrompt(data);
    const result = await refineSketch({ baseImageUrl, facialFeaturePrompt });
    revalidatePath('/sketch-generator');
    return { suggestions: result.sketches };
  } catch (error) {
    console.error('Error refining sketch:', error);
    return { error: 'Failed to refine sketch. Please try again.' };
  }
}

export async function targetedRefineSketchAction(
  baseImageUrl: string,
  facialArea: TargetedRefineSketchInput['facialArea'],
  refinementPrompt: string
): Promise<{ suggestions?: string[]; error?: string }> {
  try {
    const result = await targetedRefineSketch({
      baseImageUrl,
      facialArea,
      refinementPrompt,
    });
    revalidatePath('/sketch-generator');
    return { suggestions: result.sketches };
  } catch (error) {
    console.error('Error during targeted refinement:', error);
    return { error: 'Failed to apply targeted refinement. Please try again.' };
  }
}


export async function getSuggestionsAction(
  prompt: string,
  imageDataUri: string
): Promise<{ suggestions?: string[]; error?: string }> {
  if (!prompt || !imageDataUri) {
    return { error: 'Missing prompt or image data for suggestions.' };
  }
  
  try {
    const result = await suggestImprovementsToSketch({ prompt, imageDataUri });
    return { suggestions: result.suggestedImprovements };
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return { error: 'Failed to get suggestions. Please try again.' };
  }
}
