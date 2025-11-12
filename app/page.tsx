import { LaunchStats } from "./components/LaunchStats";
import { Pillars } from "./components/Pillars";
import { SceneTimeline } from "./components/SceneTimeline";
import { SonicMoodboard } from "./components/SonicMoodboard";
import { VideoCanvas } from "./components/VideoCanvas";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-32 pt-20">
      <section className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div className="flex flex-col justify-center gap-8">
          <span className="w-max rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/60">
            Lueur Atelier
          </span>
          <h1 className="font-display text-5xl tracking-[0.08em] text-white sm:text-6xl">
            Introducing the luminous future of fine jewellery
          </h1>
          <p className="text-sm leading-relaxed text-white/70">
            A cinematic launch film announcing the arrival of our next artefacts. Fabricated in digitale chiaroscuro, the sequence celebrates the craft, the metal, and the anticipation of collectors worldwide.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="text-xs uppercase tracking-[0.3em] text-aurum/80">
              Premiere · Fall 2024
            </span>
            <span className="h-px w-12 bg-aurum/40" />
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">
              16 Second Signature Edit
            </span>
          </div>
        </div>
        <VideoCanvas />
      </section>

      <Pillars />
      <LaunchStats />
      <SceneTimeline />
      <SonicMoodboard />

      <section className="mt-32 grid gap-10 rounded-[48px] border border-white/10 bg-white/5 p-12 text-center backdrop-blur-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Private Preview</p>
        <h2 className="font-display text-4xl text-white">
          Secure your collector screening before public release
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-white/70">
          Receive the master cut, social-ready crops, and store loop variants alongside voiceover scripts crafted for bespoke unveilings. We choreograph launch moments that feel as considered as the pieces themselves.
        </p>
        <div className="mx-auto w-max rounded-full border border-aurum/40 bg-gradient-to-r from-aurum/80 to-aurum/60 px-8 py-3 text-sm uppercase tracking-[0.35em] text-obsidian">
          Reserve Your Reveal
        </div>
      </section>
    </main>
  );
}
