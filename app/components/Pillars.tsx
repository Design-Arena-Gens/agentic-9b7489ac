const pillars = [
  {
    title: "Auric Composition",
    description:
      "Layered gradients mirror the collection's tri-metal palette—champagne gold, iced platinum, midnight obsidian. Soft bloom emphasises tactile edges."
  },
  {
    title: "Curated Narrative",
    description:
      "Voiceover script and typography align with maison heritage, delivering a quiet confidence that resonates with private clientele."
  },
  {
    title: "Omni-Channel Ready",
    description:
      "Master files exported at 16 seconds, optimised for boutique LED walls, socials, email hero loops and press previews."
  }
];

export function Pillars() {
  return (
    <section className="mt-28 grid gap-6 md:grid-cols-3">
      {pillars.map((pillar) => (
        <article
          key={pillar.title}
          className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/8 to-transparent p-8 backdrop-blur-2xl transition hover:border-aurum/40"
        >
          <h3 className="font-display text-xl text-white">{pillar.title}</h3>
          <p className="mt-4 text-sm text-white/70">{pillar.description}</p>
        </article>
      ))}
    </section>
  );
}
