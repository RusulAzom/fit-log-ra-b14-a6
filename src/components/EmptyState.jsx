import Link from 'next/link';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#121212] px-6 py-16 text-center">
      <h2 className="font-display text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
        NOTHING HERE YET
      </h2>
      <p className="mt-3 max-w-sm text-sm text-neutral-400">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black text-black transition hover:brightness-95"
      >
        Go to workouts
      </Link>
    </div>
  );
}