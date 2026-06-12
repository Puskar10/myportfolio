"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex].text;
    const timeout = setTimeout(
      () => {
        if (!isDeleting && currentText === word) {
          setIsDeleting(true);
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        } else {
          setCurrentText((prev) =>
            isDeleting
              ? prev.slice(0, -1)
              : word.slice(0, prev.length + 1)
          );
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      <span className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
        {currentText}
      </span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className={`block h-8 w-1 rounded-full bg-blue-500 sm:h-10 ${cursorClassName}`}
      />
    </div>
  );
};