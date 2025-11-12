const stats = [
  {
    label: "Frame-for-frame polish",
    value: "960",
    suffix: "+",
    detail: "hand-painted highlights enhancing gem reflections"
  },
  {
    label: "Golden hour palettes",
    value: "5",
    suffix: "",
    detail: "bespoke gradient environments crafted for each hero piece"
  },
  {
    label: "Render fidelity",
    value: "8K",
    suffix: "",
    detail: "master export ensuring flawless social + in-store playback"
  }
];

export function LaunchStats() {
  return (
    <section className="mt-28 rounded-[48px] border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-transparent p-10 backdrop-blur-3xl">
      <div className="flex flex-col gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
        {stats.map((stat) => (
          <div key={stat.label} className="flex-1">
            <p className="text-sm uppercase tracking-[0.35em] text-white/50">
              {stat.label}
            </p>
            <p className="mt-3 font-display text-5xl text-aurum">
              {stat.value}
              <span className="text-2xl">{stat.suffix}</span>
            </p>
            <p className="mt-3 text-sm text-white/70">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
