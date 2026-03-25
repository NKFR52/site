"use client";

import { motion } from "framer-motion";
import { MusicPlayer } from "@/components/music-player";
import { TimezoneClock } from "@/components/timezone-clock";
import { TypingLine } from "@/components/typing-line";
import { CONTENT, THEME } from "@/data/portfolio-data";

function ContactLine({ line }: { line: string }) {
  if (line.startsWith("email: ")) {
    const addr = line.replace("email: ", "").trim();
    return (
      <li className="text-center">
        email:{" "}
        <a className="underline underline-offset-4" href={`mailto:${addr}`}>
          {addr}
        </a>
      </li>
    );
  }
  if (line.startsWith("github: ")) {
    const path = line.replace("github: ", "").trim();
    const href = path.startsWith("http") ? path : `https://${path}`;
    return (
      <li className="text-center">
        github:{" "}
        <a className="underline underline-offset-4" href={href} target="_blank" rel="noreferrer">
          {path}
        </a>
      </li>
    );
  }
  if (line.startsWith("telegram: ")) {
    const href = `https://${line.replace("telegram: ", "").trim()}`;
    const display = line.replace("telegram: ", "").trim();
    return (
      <li className="text-center">
        telegram:{" "}
        <a className="underline underline-offset-4" href={href} target="_blank" rel="noreferrer">
          {display}
        </a>
      </li>
    );
  }
  return <li className="text-center">{line}</li>;
}

export default function HomePage() {
  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden px-4 py-4 text-sm sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <section
          className="overflow-hidden rounded-xl border p-5 text-center sm:p-6"
          style={{
            borderColor: THEME.border,
            backgroundColor: "rgba(17, 19, 26, 0.8)",
            boxShadow: THEME.glow
          }}
        >
          <TypingLine delay={0.05} className="text-lg font-bold">
            {CONTENT.hero.heading}
          </TypingLine>
          <TypingLine delay={0.15} className="mt-2 text-base text-[var(--accent)]">
            {CONTENT.hero.subHeading}
          </TypingLine>
          <TypingLine delay={0.25} className="mt-4 leading-relaxed text-[var(--text)]/90">
            {CONTENT.hero.body}
          </TypingLine>

          <div className="mt-7 space-y-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <h2 className="mb-2 font-semibold">{CONTENT.about.heading}</h2>
              <ul className="space-y-1 text-[var(--muted)]">
                {CONTENT.about.lines.map((line) => (
                  <li key={line} className="text-center">
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <h2 className="mb-2 font-semibold">{CONTENT.contact.heading}</h2>
              <ul className="space-y-1 text-[var(--muted)]">
                {CONTENT.contact.lines.map((line) => (
                  <ContactLine key={line} line={line} />
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      </div>

      <TimezoneClock />
      <MusicPlayer />
    </main>
  );
}
