'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Bookmark, BookmarkCheck, Check, Plus, Star } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getWorkoutById } from '../../../services/api';
import { useWorkouts } from '../../../context/WorkoutContext';

const FALLBACK_IMAGE = '/imgs/workout.jpg';

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    plan,
    saved,
    addToPlan,
    saveForLater,
    removeFromPlan,
    removeFromSaved,
  } = useWorkouts();

  useEffect(() => {
    if (!id) return undefined;
    let cancelled = false;

    async function loadWorkout() {
      setLoading(true);
      try {
        const data = await getWorkoutById(id);
        if (!cancelled) setWorkout(data);
      } catch (error) {
        console.error('Failed to load workout details:', error);
        if (!cancelled) setWorkout(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadWorkout();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleImageError = (event) => {
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const inPlan = Boolean(workout) && plan.some((item) => item.id === workout.id);
  const isSaved =
    Boolean(workout) && saved.some((item) => item.id === workout.id);

  const specs = workout
    ? [
        { label: 'EQUIPMENT', value: workout.equipment },
        { label: 'DIFFICULTY', value: workout.difficulty },
        { label: 'SETS', value: workout.sets },
        { label: 'REPS', value: workout.reps },
        { label: 'DURATION', value: workout.duration + ' min' },
        { label: 'CALORIES', value: workout.caloriesBurned + ' kcal' },
        { label: 'RATING', value: workout.rating, star: true },
      ]
    : [];

  const instructions = workout?.instructions ?? [];
  const muscleGroups = workout?.muscleGroups ?? [];

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        {/* Loading skeleton */}
        {loading && (
          <div
            className="grid grid-cols-1 gap-8 lg:grid-cols-2"
            aria-busy="true"
          >
            <div className="min-h-[320px] w-full animate-pulse rounded-3xl bg-white/5 sm:min-h-[420px] lg:min-h-[600px]" />
            <div className="flex flex-col gap-6">
              <div className="h-10 w-3/4 animate-pulse rounded-lg bg-white/5" />
              <div className="h-4 w-full animate-pulse rounded bg-white/5" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-white/5" />
              <div className="h-64 w-full animate-pulse rounded-2xl bg-white/5" />
              <div className="h-14 w-full animate-pulse rounded-full bg-white/5" />
            </div>
          </div>
        )}

        {/* Not found */}
        {!loading && !workout && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#121212] px-6 py-20 text-center">
            <h1 className="font-display text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
              WORKOUT NOT FOUND
            </h1>
            <p className="mt-3 max-w-sm text-sm text-neutral-400">
              We couldn&apos;t find a lift with that id. It may have been removed
              from the library.
            </p>
            <Link
              href="/#library"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black text-black transition hover:brightness-95"
            >
              Back to workouts
            </Link>
          </div>
        )}

        {/* Details */}
        {!loading && workout && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left column - visual */}
            <div className="relative min-h-[320px] w-full overflow-hidden rounded-3xl bg-[#121212] sm:min-h-[420px] lg:min-h-[600px]">
              <Image
                src={workout.image || FALLBACK_IMAGE}
                alt={workout.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                onError={handleImageError}
              />
            </div>

            {/* Right column - specs & actions */}
            <div className="flex flex-col gap-8">
              <header>
                <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {workout.name}
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                  {workout.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {muscleGroups.map((group) => (
                    <span
                      key={group}
                      className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-semibold text-black"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </header>

              {/* Key specs */}
              <section className="rounded-2xl border border-white/10 bg-[#18181b] px-5 sm:px-6">
                <dl className="divide-y divide-white/10">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between gap-4 py-3.5"
                    >
                      <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
                        {spec.label}
                      </dt>
                      <dd className="flex items-center gap-1.5 text-sm font-bold text-white">
                        {spec.value}
                        {spec.star && (
                          <Star className="h-4 w-4 fill-[#ccff00] text-[#ccff00]" />
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* Instructions */}
              <section>
                <h2 className="text-lg font-black uppercase tracking-[0.15em] text-white">
                  INSTRUCTIONS
                </h2>
                <ol className="mt-5 list-none space-y-4">
                  {instructions.map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                        {index + 1}
                      </span>
                      <p className="pt-1 text-sm leading-relaxed text-neutral-400">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    inPlan ? removeFromPlan(workout.id) : addToPlan(workout)
                  }
                  className={
                    inPlan
                      ? 'inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#ccff00]/60 bg-[#ccff00]/10 px-6 py-4 text-sm font-black text-[#ccff00] transition hover:bg-[#ccff00]/20'
                      : 'inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#ccff00] px-6 py-4 text-sm font-black text-black transition hover:brightness-95'
                  }
                >
                  {inPlan ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  {inPlan ? 'In today’s plan' : 'Add to today’s plan'}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    isSaved ? removeFromSaved(workout.id) : saveForLater(workout)
                  }
                  className={
                    isSaved
                      ? 'inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10'
                      : 'inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-[#121212] px-6 py-4 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/5'
                  }
                >
                  {isSaved ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                  {isSaved ? 'Saved for later' : 'Save for later'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

