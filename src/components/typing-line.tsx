"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type TypingLineProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function TypingLine({ children, delay = 0, className }: TypingLineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
