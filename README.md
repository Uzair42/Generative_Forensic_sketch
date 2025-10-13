# SketchAI: AI-Powered Forensic Sketch Generator

SketchAI is a production-ready, full-stack application that leverages generative AI to create hyper-realistic forensic sketches based on user descriptions. It provides a detailed interface for users to define facial features and generate a criminal sketch image, with options for AI-driven suggestions to refine the results.

## Technology Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React
- **Form Management**: React Hook Form, Zod
- **AI Integration**: Genkit with Google Gemini & Imagen Models, executed via Next.js Server Actions
- **Backend**: Next.js Server Actions
- **Authentication**: Firebase Authentication (Email/Password)
- **Storage**: Firebase Storage (for generated images)

## Features

- **User Authentication**: Secure sign-up and sign-in functionality using Firebase.
- **Protected Routes**: The sketch generator is only accessible to authenticated users.
- **Advanced Sketch Controls**: A comprehensive form with options for gender, age, ethnicity, and fine-tunable sliders for various facial features.
- **AI-Powered Sketch Generation**: Constructs a detailed text prompt from user inputs and uses a powerful AI model to generate a photorealistic sketch.
- **AI-Powered Suggestions**: After generating a sketch, users can get AI-driven suggestions to improve the sketch's accuracy.
- **Responsive Design**: A clean, professional, and responsive UI that works on all devices.
- **Loading & Error States**: Clear loading indicators during AI processing and graceful error handling with toasts.
- **Secure by Design**: Server Actions ensure that AI model interactions and sensitive keys are handled on the server, never exposed to the client.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm, pnpm, or yarn
- A Firebase project

### Firebase Configuration

1.  **Create a Firebase Project**: Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Enable Authentication**:
    - In your Firebase project, go to the **Authentication** section.
    - Click on the **Sign-in method** tab.
    - Enable the **Email/Password** provider.
3.  **Enable Storage**:
    - Go to the **Storage** section and click "Get Started".
    - Follow the prompts to create a default storage bucket.
    - In the **Rules** tab, you may want to adjust the rules for development. For production, ensure only authenticated users can read/write. A good starting point for development:
      ```
      rules_version = '2';
      service firebase.storage {
        match /b/{bucket}/o {
          match /{allPaths=**} {
            allow read, write: if true; // WARNING: Open for development, secure for production
          }
        }
      }
      ```
4.  **Get Firebase Config**:
    - Go to your project's settings by clicking the gear icon next to **Project Overview**.
    - In the "Your apps" section, create a new Web app.
    - After creating the app, you will be given a `firebaseConfig` object. Copy these keys.

### Local Setup

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/forensic-sketch-ai-app.git
    cd forensic-sketch-ai-app
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root of your project and add your Firebase and Google AI configuration keys:

    ```
    # Firebase Public Config
    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
    
    # Google AI API Key (for Genkit)
    # See Genkit documentation for how to obtain a key.
    # This key is used on the server-side via Server Actions.
    GOOGLE_API_KEY="YOUR_GOOGLE_AI_API_KEY"
    ```

### How to Run the App

1.  **Development Server**:
    To run the app in development mode, use:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

2.  **Production Build**:
    To build the application for production:
    ```bash
    npm run build
    ```
    To start the production server:
    ```bash
    npm run start
    ```

## Testing Functionality

The project is set up for end-to-end functionality. To test:

1.  Run the development server.
2.  Navigate to the `/signup` page to create a new user account.
3.  Once signed in, you will be redirected to the `/sketch-generator`.
4.  Use the controls to define a character and click "Generate Sketch".
5.  After generation, test the "Suggest Improvements" feature.
6.  Log out using the button in the header.

*Note: The initial user request included unit and integration testing placeholders. However, as per project constraints, `package.json` cannot be modified to add testing libraries like Jest or Vitest.*
