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
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2500,
              style: {
                background: '#18181b',
                color: '#f5f5f5',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#ccff00', secondary: '#000000' },
              },
              error: {
                iconTheme: { primary: '#f87171', secondary: '#000000' },
              },
            }}
          />
        </WorkoutProvider>
      </body>
    </html>
  );
}