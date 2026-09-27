import './globals.css';
import { Toaster } from 'react-hot-toast';
import WorkoutProvider from '../context/WorkoutContext';

export const metadata = {
  title: 'FitLog — Workout Library',
  description:
    'FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today’s plan, and watch the week’s work add up.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Oswald:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <WorkoutProvider>
          {children}
          <Toaster position="top-right" />
        </WorkoutProvider>
      </body>
    </html>
  );
}