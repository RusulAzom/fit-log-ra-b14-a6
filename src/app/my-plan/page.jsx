import Image from 'next/image';
import Link from 'next/link';
import { Check, Clock, Flame, Star, X } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EmptyState from '../../components/EmptyState';

const metrics = [
  { label: 'Exercises', value: '2', accent: true },
  { label: 'Minutes', value: '23' },
  { label: 'Calories', value: '190' },
];

const planItems = [
  {
    title: 'RUSSIAN TWIST',
    equipment: 'Medicine Ball',
    duration: '15 min',
    calories: '90 kcal',
    rating: '4.7',
    href: '/workout/russian-twist',
  },
  {
    title: 'DEAD BUG',
    equipment: 'Bodyweight, Mat',
    duration: '8 min',
    calories: '100 kcal',
    rating: '4.6',
    href: '/workout/dead-bug',
  },
];

export default function MyPlanPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        {/* Page header */}
        <header>
          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            MY PLAN
          </h1>
          <p className="mt-3 text-sm text-neutral-400 sm:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </header>

        {/* Metrics summary */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-[#18181b] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {metric.label}
              </p>
              <p
                className={`mt-2 text-3xl font-black ${
                  metric.accent ? 'text-[#ccff00]' : 'text-white'
                }`}
              >
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-10 flex items-center gap-2">
          <button
            type="button"
            className="rounded-full bg-[#ccff00] px-5 py-2 text-sm font-bold text-black"
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-neutral-400 transition hover:text-white"
          >
            Saved
          </button>
        </div>

        {/* Today's Plan — populated state */}
        <div className="mt-6 flex flex-col gap-4">
          {planItems.map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#18181b] p-4 sm:flex-row sm:items-center"
            >
              <Image
                src="/imgs/workout.jpg"
                alt={item.title}
                width={96}
                height={96}
                className="h-24 w-24 shrink-0 rounded-xl object-cover"
              />

              <div className="min-w-0 flex-1">
                <h2 className="text-base font-black uppercase tracking-wide text-white sm:text-lg">
                  {item.title}
                </h2>
                <p className="mt-0.5 text-sm text-neutral-500">{item.equipment}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-neutral-400 sm:text-sm">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[#ccff00]" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Flame className="h-4 w-4 text-[#ccff00]" />
                    {item.calories}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-[#ccff00] text-[#ccff00]" />
                    {item.rating}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:w-36">
                <Link
                  href={item.href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#121212] px-4 py-2.5 text-xs font-bold text-white transition hover:border-[#ccff00]/60 hover:text-[#ccff00] sm:text-sm"
                >
                  View Details
                </Link>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-400 transition hover:bg-emerald-500/20 sm:text-sm"
                >
                  <Check className="h-4 w-4" />
                  Mark as Done
                </button>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-bold text-neutral-400 transition hover:border-red-500/40 hover:text-red-400 sm:text-sm"
                >
                  <X className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Saved tab — empty state (shown when a tab has no workouts) */}
        <div className="mt-6 hidden">
          <EmptyState />
        </div>
      </main>

      <Footer />
    </>
  );
}