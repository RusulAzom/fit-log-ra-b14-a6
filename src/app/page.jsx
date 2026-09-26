import Image from 'next/image';
import { ArrowDown, ChevronDown, Clock, Flame, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const workouts = [
  { title: 'BARBELL BENCH PRESS', categories: ['CHEST'], equipment: 'Barbell, Bench', duration: '25 min', calories: '180 kcal', rating: '4.8' },
  { title: 'BACK SQUAT', categories: ['LEGS'], equipment: 'Barbell, Squat Rack', duration: '35 min', calories: '260 kcal', rating: '4.9' },
  { title: 'CONVENTIONAL DEADLIFT', categories: ['BACK', 'LEGS'], equipment: 'Barbell, Platform', duration: '30 min', calories: '240 kcal', rating: '4.9' },
  { title: 'OVERHEAD PRESS', categories: ['SHOULDERS'], equipment: 'Barbell', duration: '20 min', calories: '150 kcal', rating: '4.7' },
  { title: 'WEIGHTED PULL UP', categories: ['BACK'], equipment: 'Pull-up Bar, Belt', duration: '15 min', calories: '120 kcal', rating: '4.8' },
  { title: 'INCLINE DUMBBELL PRESS', categories: ['CHEST'], equipment: 'Dumbbells, Bench', duration: '22 min', calories: '165 kcal', rating: '4.7' },
  { title: 'BARBELL CURL', categories: ['ARMS'], equipment: 'Barbell', duration: '18 min', calories: '110 kcal', rating: '4.6' },
  { title: 'TRICEP DIPS', categories: ['ARMS'], equipment: 'Dip Bars', duration: '15 min', calories: '100 kcal', rating: '4.5' },
  { title: 'LEG PRESS', categories: ['LEGS', 'GLUTES'], equipment: 'Leg Press Machine', duration: '25 min', calories: '200 kcal', rating: '4.7' },
  { title: 'SEATED CABLE ROW', categories: ['BACK'], equipment: 'Cable, Bench', duration: '20 min', calories: '140 kcal', rating: '4.6' },
  { title: 'DUMBBELL LATERAL RAISE', categories: ['SHOULDERS'], equipment: 'Dumbbells', duration: '12 min', calories: '90 kcal', rating: '4.5' },
  { title: 'HANGING LEG RAISE', categories: ['CORE'], equipment: 'Pull-up Bar', duration: '10 min', calories: '75 kcal', rating: '4.4' },
];

export default function Home() {
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
            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 bg-[#1a1a1a] px-4 py-2.5 text-sm font-semibold text-neutral-300 transition hover:border-[#ccff00]/60 hover:text-white"
            >
              Sort By: Duration
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <article
                key={workout.title}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] transition hover:-translate-y-1 hover:border-[#ccff00]/50"
              >
                <div className="relative aspect-[584/287] w-full overflow-hidden">
                  <Image
                    src="/imgs/card_banner.png"
                    alt={workout.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
                    {workout.categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-black"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 p-5">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wide text-white sm:text-base">
                      {workout.title}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                      {workout.equipment}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold text-neutral-400 sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#ccff00]" />
                      {workout.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Flame className="h-4 w-4 text-[#ccff00]" />
                      {workout.calories}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-[#ccff00] text-[#ccff00]" />
                      {workout.rating}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}