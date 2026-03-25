"use client";

import { useEffect, useState } from "react";
import { THEME, TIMEZONE } from "@/data/portfolio-data";

function getTime() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: TIMEZONE
  }).format(new Date());
}

export function TimezoneClock() {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const timer = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed right-4 top-4 z-20 rounded-lg border px-3 py-2 text-center text-xs"
      style={{
        borderColor: THEME.border,
        backgroundColor: "rgba(17, 19, 26, 0.88)",
        color: "#86efac",
        fontFamily: "var(--terminal-font)"
      }}
    >
      <p className="clock-kyiv-hover inline-block cursor-default font-semibold tracking-wide">{time}</p>
      <p className="opacity-70">KYIV</p>
    </div>
  );
}
