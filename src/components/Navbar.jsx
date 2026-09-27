'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useWorkouts } from '../context/WorkoutContext';

export default function Navbar() {
  const { plan, saved } = useWorkouts();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#121212]/95 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex shrink-0 items-center gap-2">
          <Image
            src="/imgs/logo.png"
            alt="FitLog logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span className="text-lg font-black tracking-[0.2em] text-white">FITLOG</span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/#library"
            className="rounded-full bg-[#ccff00] px-5 py-2 text-sm font-bold text-black"
          >
            Workouts
          </a>
          <a
            href="/my-plan"
            className="rounded-full px-5 py-2 text-sm font-semibold text-neutral-400 transition hover:bg-white/5 hover:text-white"
          >
            My Plan
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3.5 py-1.5 text-xs font-black text-black transition hover:brightness-95"
          >
            Plan <span className="opacity-60">{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-bold text-neutral-400 transition hover:border-white/30 hover:text-white"
          >
            Saved <span className="text-neutral-500">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}