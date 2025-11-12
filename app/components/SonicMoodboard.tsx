const soundscape = [
  {
    title: "Opening Atmosphere",
    description: "Glass harmonics, whispered chimes, distant city glow for twilight intrigue.",
    palette: ["#10121b", "#bca57a", "#f2d8a1"]
  },
  {
    title: "Momentum Pulse",
    description: "Velvet low-end heartbeat layered with brushed percussion accentuating each reveal.",
    palette: ["#161924", "#d3b88a", "#f7e7c7"]
  },
  {
    title: "Radiant Finale",
    description: "Choir swells with crystalline sparkles, resolving into a single lingering note.",
    palette: ["#1d1f2c", "#f1d08e", "#ffe9c8"]
  }
];

export function SonicMoodboard() {
  return (
    <section className="mt-32 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
      <div className="max-w-md">
        <p className="text-sm uppercase tracking-[0.4em] text-aurum/70">Sound Design</p>
        <h2 className="mt-4 font-display text-4xl tracking-wide text-white">
          Bespoke soundscape sculpted to your metals
        </h2>
        <p className="mt-5 text-sm text-white/70">
          The score moves with the light—minimalist, intimate, and paced to heighten the reveal of every new article.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {soundscape.map((slice) => (
          <div
            key={slice.title}
            className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition hover:translate-y-[-6px] hover:border-aurum/40"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">{slice.title}</p>
              <p className="mt-4 text-sm text-white/80">{slice.description}</p>
            </div>
            <div className="mt-6 flex gap-2">
              {slice.palette.map((color) => (
                <span
                  key={color}
                  className="h-10 flex-1 rounded-full"
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
