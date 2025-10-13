# **App Name**: SketchAI

## Core Features:

- User Authentication: Secure user sign-in/sign-up using Firebase Authentication.
- Sketch Generation UI: Responsive UI with a two-column layout for controls and image output.
- Facial Feature Controls: Modular input component (<FacialFeatureControl />) for feature selection and slider adjustments.
- Image Prompt Construction: Client-side prompt creation combining user inputs into a detailed text prompt.
- Secure API Route: Protected Next.js API route (/api/generate-sketch) to authenticate users and forward the prompt to the AI function.
- AI Sketch Generation: Tool to generate photorealistic sketches using a Firebase Cloud Function and the Gemini API, including secure API key management and environment variables.
- Image Storage: Store generated images securely in Firebase Storage.

## Style Guidelines:

- Primary color: Deep Indigo (#3F51B5) for a sense of authority and professionalism.
- Background color: Light Gray (#F5F5F5), almost white, to put the focus on the details of the rendered images and controls.
- Accent color: Cyan (#00BCD4) to highlight interactive elements and provide a modern feel.
- Body and headline font: 'Inter', a grotesque-style sans-serif with a modern look.
- Modular, component-based approach with clear separation of concerns.
- Responsive design that adapts to different screen sizes.
- Loading indicators and skeleton components during AI processing.