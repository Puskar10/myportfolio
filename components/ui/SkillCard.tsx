"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

type SkillItem = {
  name: string;
  icon?: LucideIcon;
  imageUrl?: string;
  iconElement?: React.ReactNode;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: SkillItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (!containerRef.current) return;

    if (direction === "left") {
      containerRef.current.style.setProperty(
        "--animation-direction",
        "normal"
      );
    } else {
      containerRef.current.style.setProperty(
        "--animation-direction",
        "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (!containerRef.current) return;

    if (speed === "fast") {
      containerRef.current.style.setProperty("--animation-duration", "20s");
    } else if (speed === "normal") {
      containerRef.current.style.setProperty("--animation-duration", "35s");
    } else {
      containerRef.current.style.setProperty("--animation-duration", "55s");
    }
  };

  const renderIcon = (item: SkillItem) => {
    // If custom icon element is provided
    if (item.iconElement) {
      return item.iconElement;
    }
    
    // If image URL is provided
    if (item.imageUrl) {
      return (
        <div className="relative h-12 w-12 transition-transform group-hover:scale-110">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>
      );
    }
    
    // If Lucide icon is provided
    if (item.icon) {
      const Icon = item.icon;
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 p-2 transition-transform group-hover:scale-110">
          <Icon className="text-fuchsia-300" size={28} />
        </div>
      );
    }
    
    // Fallback: show first letter
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 p-2 transition-transform group-hover:scale-110">
        <span className="text-2xl font-bold text-fuchsia-300">
          {item.name.charAt(0)}
        </span>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
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
        style={{
          animation: start
            ? `scroll var(--animation-duration, 35s) linear infinite var(--animation-direction, normal)`
            : "none",
        }}
      >
        {items.map((item, index) => (
          <li
            key={`${item.name}-${index}`}
            className="group relative flex h-32 w-44 shrink-0 flex-col justify-between rounded-3xl bg-slate-900/60 p-6 shadow-lg shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            {renderIcon(item)}
            <p className="font-extrabold text-slate-100">
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};