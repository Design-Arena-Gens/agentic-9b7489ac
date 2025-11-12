const scenes = [
  {
    title: "01 · Luminous Awakening",
    description:
      "Silk-slow camera reveals a sculpted ring emerging from shadow. Aurora particles trace its silhouette while warm champagne light blooms behind.",
    timing: "00:00 - 00:04"
  },
  {
    title: "02 · Radiant Detail",
    description:
      "Macro glints sweep across facets. Micro sparks orbit the gemstone to accentuate new lattice detailing inspired by Parisian ironwork.",
    timing: "00:04 - 00:08"
  },
  {
    title: "03 · The Signature",
    description:
      "Brand monogram materialises in liquid gold as voiceover whispers the collection mantra: ‘Illuminate every arrival’.",
    timing: "00:08 - 00:12"
  },
  {
    title: "04 · Grand Reveal",
    description:
      "Three hero pieces rotate within a halo of light while on-screen type announces 'New Artefacts Arriving Soon'. Final call-to-action fades in.",
    timing: "00:12 - 00:16"
  }
];

export function SceneTimeline() {
  return (
    <section className="mt-32 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
      <div className="max-w-md">
        <p className="text-sm uppercase tracking-[0.4em] text-aurum/70">Storyboard</p>
        <h2 className="mt-4 font-display text-4xl tracking-wide text-white">
          Cinematic arc sculpted for anticipation
        </h2>
        <p className="mt-5 text-sm text-white/70">
          Every frame is crafted to mirror the tactility of fine jewellery—liquid highlights, soft focus bloom, and deliberate pacing that invites touch.
        </p>
      </div>
      <ul className="space-y-6">
        {scenes.map((scene) => (
          <li
            key={scene.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:border-aurum/50 hover:bg-white/8"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/50">
              <span>{scene.title}</span>
              <span className="text-aurum/70">{scene.timing}</span>
            </div>
            <p className="mt-4 text-sm text-white/80">{scene.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
