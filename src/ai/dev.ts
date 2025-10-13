import { config } from 'dotenv';
config();

import '@/ai/flows/generate-initial-sketch.ts';
import '@/ai/flows/refine-sketch.ts';
import '@/ai/flows/suggest-improvements-to-sketch.ts';
import '@/ai/flows/summarize-features-for-adjustment.ts';
