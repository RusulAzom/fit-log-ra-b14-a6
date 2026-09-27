import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-[#18181b] px-6 py-16 text-center sm:px-12 sm:py-20">
          <h1 className="font-display font-black uppercase tracking-tight">
            <span className="sr-only">404 - Page Not Found</span>
            <span
              aria-hidden="true"
              className="block text-7xl leading-none text-[#ccff00] sm:text-8xl"
            >
              404
            </span>
            <span
              aria-hidden="true"
              className="mt-6 block text-2xl tracking-tight text-white sm:text-4xl"
            >
              PAGE NOT FOUND
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-neutral-400 sm:text-base">
            The page you&apos;re looking for isn&apos;t in the library. It may
            have been moved, deleted, or the link is out of date — let&apos;s get
            you back to the iron.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ccff00] px-7 py-3.5 text-sm font-black text-black transition hover:brightness-95 sm:w-auto"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/#library"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-[#121212] px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/5 sm:w-auto"
            >
              <Search className="h-4 w-4" />
              Browse workouts
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
