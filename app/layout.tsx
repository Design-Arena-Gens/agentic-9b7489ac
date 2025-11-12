import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lueur Atelier – Coming Soon",
  description:
    "Immersive launch trailer for Lueur Atelier's upcoming jewelry collection, crafted with cinematic motion graphics and shimmering light.",
  openGraph: {
    title: "Lueur Atelier – New Collection Preview",
    description:
      "Experience the radiance of Lueur Atelier's forthcoming pieces through an interactive launch film and storytelling page.",
    url: "https://agentic-9b7489ac.vercel.app",
    siteName: "Lueur Atelier",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Lueur Atelier – New Collection Preview",
    description: "Immersive cinematic launch film capturing the glow of new pieces." 
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-obsidian text-platinum antialiased">
        {children}
      </body>
    </html>
  );
}
