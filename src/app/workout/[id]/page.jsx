import Image from 'next/image';
import { Bookmark, Plus, Star } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const specs = [
  { label: 'EQUIPMENT', value: 'Barbell, Bench' },
  { label: 'DIFFICULTY', value: 'Intermediate' },
  { label: 'SETS', value: '4' },
  { label: 'REPS', value: '6-8' },
  { label: 'DURATION', value: '25 min' },
  { label: 'CALORIES', value: '180 kcal' },
  { label: 'RATING', value: '4.8', star: true },
];

const instructions = [
  'Lie on the bench with eyes under the bar and feet planted.',
  'Unrack with locked elbows and lower the bar to mid-chest.',
  'Press up in a slight arc until elbows lock without bouncing.',
  'Keep shoulder blades pinched and a natural arch in the back.',
];

export default function WorkoutDetailsPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left column - visual */}
          <div className="relative min-h-[320px] w-full overflow-hidden rounded-3xl bg-[#121212] sm:min-h-[420px] lg:min-h-[600px]">
            <Image
              src="/imgs/workout.jpg"
              alt="Barbell bench press demonstration"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Right column - specs & actions */}
          <div className="flex flex-col gap-8">
            <header>
              <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                BARBELL BENCH PRESS
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                A compound press that builds chest thickness, triceps, and
                pressing power from a stable bench.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-semibold text-black">
                  Chest
                </span>
                <span className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-semibold text-black">
                  Arms
                </span>
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
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#ccff00] px-6 py-4 text-sm font-black text-black transition hover:brightness-95"
              >
                <Plus className="h-4 w-4" />
                Add to today&apos;s plan
              </button>
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-[#121212] px-6 py-4 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/5"
              >
                <Bookmark className="h-4 w-4" />
                Save for later
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
