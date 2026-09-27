'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Clock, Flame, Loader2, Star, X } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EmptyState from '../../components/EmptyState';
import { PLAN_LIMIT, useWorkouts } from '../../context/WorkoutContext';

const FALLBACK_IMAGE = '/imgs/workout.jpg';

const TABS = [
  { id: 'plan', label: 'Today’s Plan' },
  { id: 'saved', label: 'Saved' },
];

export default function MyPlanPage() {
  const {
    plan,
    saved,
    completed,
    hydrated,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useWorkouts();

  const [activeTab, setActiveTab] = useState('plan');

  const items = activeTab === 'plan' ? plan : saved;

  const metrics = [
    { label: 'Exercises', value: plan.length, accent: true },
    {
      label: 'Minutes',
      value: plan.reduce((total, item) => total + (item.duration ?? 0), 0),
    },
    {
      label: 'Calories',
      value: plan.reduce((total, item) => total + (item.caloriesBurned ?? 0), 0),
    },
  ];

  const handleImageError = (event) => {
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleRemove = (id) => {
    if (activeTab === 'plan') {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
  };

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
          {hydrated && plan.length >= PLAN_LIMIT && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-400">
              Plan full — {plan.length} of {PLAN_LIMIT} lifts
            </p>
          )}
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
                className={
                  metric.accent
                    ? 'mt-2 text-3xl font-black text-[#ccff00]'
                    : 'mt-2 text-3xl font-black text-white'
                }
              >
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-10 flex items-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={
                activeTab === tab.id
                  ? 'rounded-full bg-[#ccff00] px-5 py-2 text-sm font-bold text-black'
                  : 'rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-neutral-400 transition hover:text-white'
              }
            >
              {tab.label}
              <span className="ml-2 text-xs opacity-60">
                {tab.id === 'plan' ? plan.length : saved.length}
              </span>
            </button>
          ))}
        </div>

        {/* Loading state — plan/saved hydrate from localStorage on the client */}
        {!hydrated && (
          <div
            className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#18181b] px-6 py-16"
            aria-busy="true"
          >
            <Loader2 className="h-7 w-7 animate-spin text-[#ccff00]" />
            <p className="text-sm font-semibold text-neutral-400">
              Loading workouts...
            </p>
          </div>
        )}

        {/* Empty state */}
        {hydrated && items.length === 0 && (
          <div className="mt-6">
            <EmptyState />
          </div>
        )}

        {/* Workout rows */}
        {hydrated && items.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            {items.map((item) => {
              const isDone = completed.includes(item.id);

              return (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#18181b] p-4 sm:flex-row sm:items-center"
                >
                  <Image
                    src={item.image || FALLBACK_IMAGE}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                    onError={handleImageError}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-black uppercase tracking-wide text-white sm:text-lg">
                        {item.name}
                      </h2>
                      {isDone && (
                        <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-400">
                          Done
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-neutral-500">
                      {item.equipment}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-neutral-400 sm:text-sm">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-[#ccff00]" />
                        {item.duration} min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flame className="h-4 w-4 text-[#ccff00]" />
                        {item.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-[#ccff00] text-[#ccff00]" />
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:w-36">
                    <Link
                      href={'/workout/' + item.id}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#121212] px-4 py-2.5 text-xs font-bold text-white transition hover:border-[#ccff00]/60 hover:text-[#ccff00] sm:text-sm"
                    >
                      View Details
                    </Link>
                    {activeTab === 'plan' && (
                      <button
                        type="button"
                        onClick={() => markAsDone(item.id)}
                        className={
                          isDone
                            ? 'inline-flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-500/50 bg-emerald-500/20 px-4 py-2.5 text-xs font-bold text-emerald-300 transition hover:bg-emerald-500/30 sm:text-sm'
                            : 'inline-flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-400 transition hover:bg-emerald-500/20 sm:text-sm'
                        }
                      >
                        <Check className="h-4 w-4" />
                        {isDone ? 'Completed' : 'Mark as Done'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-bold text-neutral-400 transition hover:border-red-500/40 hover:text-red-400 sm:text-sm"
                    >
                      <X className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
