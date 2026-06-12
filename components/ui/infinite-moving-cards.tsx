"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MovingCardItem = {
  name: string;
  iconElement: React.ReactNode;
};

type InfiniteMovingCardsProps = {
  items: MovingCardItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
};

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicatedItem);
    });

    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );

    containerRef.current.style.setProperty(
      "--animation-duration",
      speed === "fast" ? "20s" : speed === "normal" ? "35s" : "55s"
    );

    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, index) => (
          <li
            key={`${item.name}-${index}`}
            className="group flex h-32 w-44 shrink-0 flex-col items-center justify-center gap-4 rounded-3xl bg-slate-900/60 p-6 shadow-lg shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            {item.iconElement}

            <p className="text-center font-extrabold text-slate-100">
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}