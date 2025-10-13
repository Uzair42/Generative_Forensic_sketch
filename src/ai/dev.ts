import { config } from 'dotenv';
config();

import '@/ai/flows/generate-sketch-from-description.ts';
import '@/ai/flows/suggest-improvements-to-sketch.ts';
import '@/ai/flows/summarize-features-for-adjustment.ts';