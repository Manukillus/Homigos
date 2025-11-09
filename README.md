# Homigos - Shared Living, Simplified

Homigos is a modern, AI-powered Next.js application designed to streamline the complexities of co-living. From finding the perfect roommate to managing shared finances and chores, Homigos provides a digital solution to create a harmonious and organized household.

The application leverages the power of generative AI to offer intelligent roommate matching and an in-app assistant to help manage day-to-day household tasks.

![Homigos Dashboard](./docs/screenshot.png)

## ✨ Key Features

- **AI-Powered Roommate Matching:** Fill out your lifestyle and living preferences, and let our AI find the most compatible roommates for you. Get a match score and a detailed rationale for each potential housemate.
- **Bill Splitting & Tracking:** Seamlessly track shared household expenses like rent, utilities, and groceries. The app automatically calculates each person's share and provides a clear overview of who owes what.
- **Chore Management:** Create a weekly chore chart, assign tasks to roommates, and track completion to ensure everyone contributes their fair share.
- **Integrated Group Chat:** Communicate with your roommates in a dedicated group chat. The chat also features "HomigoBot," an AI assistant that can answer questions and help manage your home.
- **Issue & Complaint Tracking:** Report and monitor household issues (like a leaky faucet) through a centralized system, keeping everyone informed of the status.
- **Anonymous Feedback:** Provide feedback on the living situation or to roommates to help improve the shared environment.
- **Secure & Private:** Built on Firebase, with security rules that ensure each user's private data is protected while allowing shared access for household-related information.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Generative AI:** [Google's Gemini Models](https://deepmind.google/technologies/gemini/) via [Genkit](https://firebase.google.com/docs/genkit)
- **Backend & Database:** [Firebase](https://firebase.google.com/) (Firestore, Authentication)
- **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (or yarn/pnpm)
- A [Firebase Project](https://console.firebase.google.com/)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-repository-directory>
```

### 2. Install Dependencies

Install all the required packages using npm:

```bash
npm install
```

### 3. Set Up Environment Variables

The project uses Firebase for its backend. You will need to have a Firebase project set up.

1.  Create a `.env.local` file in the root of the project.
2.  Add your Firebase project configuration and your Google AI API key to this file. Your Firebase config can be found in your Firebase project settings.

```.env.local
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="1:..."

# Google AI API Key for Genkit
GEMINI_API_KEY="AIza..."
```

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000) (or the port you have configured).

## 📄 Project Structure

- `src/app/`: Contains all the pages and layouts for the Next.js App Router.
- `src/components/`: Shared React components used across the application (UI elements, forms, etc.).
- `src/ai/`: Home for all AI-related logic, including Genkit flows and prompts.
- `src/firebase/`: Firebase configuration, custom hooks (`useUser`, `useCollection`), and provider setup.
- `src/lib/`: Utility functions, constants, and data schemas (Zod).
- `firestore.rules`: Security rules for the Firestore database.
- `public/`: Static assets like images and fonts.
