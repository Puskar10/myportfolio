"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [svgHeight, setSvgHeight] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }

    const handleScroll = () => {
      if (!ref.current || !contentRef.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalHeight = contentRef.current.offsetHeight - windowHeight;
      const currentProgress = Math.min(
        Math.max((-rect.top + windowHeight * 0.2) / totalHeight, 0),
        1
      );

      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      {/* Tracing Line */}
      <div className="absolute left-4 top-0 hidden h-full w-10 md:block">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />

        <div
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-fuchsia-500 transition-all duration-300"
          style={{
            height: `${progress * svgHeight}px`,
          }}
        />

        <div
          className="absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-indigo-400 shadow-[0_0_24px_rgba(129,140,248,0.9)] transition-all duration-300"
          style={{
            top: `${progress * svgHeight}px`,
          }}
        />
      </div>

      <div ref={contentRef} className="relative">
        {children}
      </div>
    </div>
  );
};