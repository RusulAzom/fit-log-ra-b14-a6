import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#121212]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image
            src="/imgs/logo.png"
            alt="FitLog logo"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          <span className="text-base font-black tracking-[0.2em] text-white">FITLOG</span>
        </div>
        <p className="text-sm text-neutral-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}