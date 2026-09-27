'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Check, ChevronDown, Clock, Flame, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllWorkouts } from '../services/api';

const SORT_OPTIONS = [
  { value: 'duration', label: 'Duration' },
  { value: 'calories', label: 'Calories' },
  { value: 'rating', label: 'Rating' },
];

const SORT_FIELDS = {
  duration: 'duration',
  calories: 'caloriesBurned',
  rating: 'rating',
};

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState('duration');
  const [sortOpen, setSortOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadWorkouts() {
      setLoading(true);
      setError(false);
      try {
        const data = await getAllWorkouts();
        if (cancelled) return;
        if (Array.isArray(data) && data.length > 0) {
          setWorkouts(data);
        } else {
          setWorkouts([]);
          setError(true);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadWorkouts();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  useEffect(() => {
    if (!sortOpen) return;
    const handleOutsideClick = (event) => {
      if (!event.target.closest?.('#sort-menu')) setSortOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [sortOpen]);

  const sortedWorkouts = useMemo(() => {
    const field = SORT_FIELDS[sortBy];
    return [...workouts].sort((a, b) => (b[field] ?? 0) - (a[field] ?? 0));
  }, [workouts, sortBy]);

  const selectedLabel = SORT_OPTIONS.find(
    (option) => option.value === sortBy
  )?.label;

  const scrollToLibrary = (event) => {
    event.preventDefault();
    document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero / Banner */}
        <section className="py-8 lg:py-12">
          <div className="rounded-3xl border border-white/10 bg-[#1a1a1a] p-6 sm:p-10 lg:p-16">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ccff00] sm:text-sm">
                  WORKOUT LIBRARY
                </p>
                <h1 className="mt-5 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  TRAIN WITH INTENT. LOG EVERY SET.
                </h1>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                  FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                  into today&apos;s plan, and watch the week&apos;s work add up.
                </p>
                <a
                  href="#library"
                  onClick={scrollToLibrary}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-7 py-4 text-sm font-black uppercase tracking-wide text-black transition hover:brightness-95"
                >
                  BROWSE WORKOUTS
                  <ArrowDown className="h-4 w-4" />
                </a>
              </div>

              <div className="relative flex items-center justify-center">
                <div
                  className="absolute h-64 w-64 rounded-full bg-[#ccff00]/10 blur-3xl"
                  aria-hidden="true"
                />
                <Image
                  src="/imgs/banner.png"
                  alt="Athlete training with intent"
                  width={334}
                  height={334}
                  priority
                  className="relative h-auto w-full max-w-xs rounded-2xl object-contain sm:max-w-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* The Library */}
        <section id="library" className="pb-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                THE LIBRARY
              </h2>
              <p className="mt-2 text-sm text-neutral-400 sm:text-base">
                Twelve lifts covering every major muscle group.
              </p>
            </div>

            {/* Sort dropdown */}
            <div className="relative" id="sort-menu">
              <button
                type="button"
                onClick={() => setSortOpen((open) => !open)}
                aria-expanded={sortOpen}
                aria-haspopup="true"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 bg-[#1a1a1a] px-4 py-2.5 text-sm font-semibold text-neutral-300 transition hover:border-[#ccff00]/60 hover:text-white"
              >
                Sort By: {selectedLabel}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    sortOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {sortOpen && (
                <ul className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-lg border border-white/15 bg-[#18181b] py-1 shadow-xl">
                  {SORT_OPTIONS.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => {
                          setSortBy(option.value);
                          setSortOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-4 py-2 text-sm transition hover:bg-white/5 ${
                          sortBy === option.value
                            ? 'font-bold text-[#ccff00]'
                            : 'text-neutral-300'
                        }`}
                      >
                        {option.label}
                        {sortBy === option.value && (
                          <Check className="h-4 w-4" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div
              className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              aria-hidden="true"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]"
                >
                  <div className="aspect-[584/287] w-full bg-white/5" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-3/4 rounded bg-white/10" />
                    <div className="h-3 w-1/2 rounded bg-white/5" />
                    <div className="h-3 w-full rounded bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error fallback */}
          {!loading && error && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#1a1a1a] px-6 py-14 text-center">
              <p className="text-lg font-bold text-white">
                Couldn&apos;t load the workout library.
              </p>
              <p className="mt-2 text-sm text-neutral-400">
                Something went wrong on our end. Check your connection and try
                again.
              </p>
              <button
                type="button"
                onClick={() => setReloadKey((key) => key + 1)}
                className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black text-black transition hover:brightness-95"
              >
                Try again
              </button>
            </div>
          )}

          {/* Workout cards */}
          {!loading && !error && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedWorkouts.map((workout) => (
                <Link
                  key={workout.id}
                  href={`/workout/${workout.id}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] transition hover:-translate-y-1 hover:border-[#ccff00]/50"
                >
                  <div className="relative aspect-[584/287] w-full overflow-hidden">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      onError={(event) => {
                        event.currentTarget.src = '/imgs/workout.jpg';
                      }}
                    />
                    <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
                      {(workout.muscleGroups ?? []).map((group) => (
                        <span
                          key={group}
                          className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-black"
                        >
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-sm font-black uppercase tracking-wide text-white sm:text-base">
                      {workout.name}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                      {workout.equipment}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold text-neutral-400 sm:text-sm">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-[#ccff00]" />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flame className="h-4 w-4 text-[#ccff00]" />
                        {workout.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-[#ccff00] text-[#ccff00]" />
                        {workout.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
