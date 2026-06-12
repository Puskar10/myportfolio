"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ProjectCardProps = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  link: string;
  icon: LucideIcon;
  index?: number;
};

export default function ProjectCard({
  title,
  category,
  description,
  tags,
  gradient,
  link,
  icon: Icon,
  index = 0,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // GSAP Animations
  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Initial animation - card entrance
      gsap.fromTo(cardRef.current,
        {
          opacity: 0,
          y: 100,
          rotationX: 15,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Icon entrance animation
      gsap.fromTo(iconRef.current,
        {
          scale: 0,
          rotation: -180,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: index * 0.1 + 0.2,
          ease: "back.out(0.6)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Content entrance animation
      gsap.fromTo(contentRef.current,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: index * 0.1 + 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Tags stagger animation
      if (tagsRef.current) {
        const tagElements = tagsRef.current.children;
        gsap.fromTo(tagElements,
          {
            opacity: 0,
            scale: 0,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            delay: index * 0.1 + 0.4,
            ease: "back.out(0.4)",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  // Track scroll progress within the card
  useEffect(() => {
    if (!cardRef.current) return;

    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const visibleAmount = Math.min(
          1,
          Math.max(
            0,
            (windowHeight - rect.top) / (windowHeight + rect.height)
          )
        );
        
        setScrollProgress(visibleAmount);
        
        // Update progress bar width with GSAP
        if (progressBarRef.current) {
          gsap.to(progressBarRef.current, {
            width: `${visibleAmount * 100}%`,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hover animations
  useEffect(() => {
    if (!cardRef.current) return;

    if (isHovered) {
      gsap.to(cardRef.current, {
        y: -8,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(99, 102, 241, 0.3)",
      });
      
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1.1,
          rotate: 6,
          duration: 0.3,
          ease: "back.out(0.4)",
        });
      }
    } else {
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      });
      
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Apply 3D tilt effect with GSAP
  useEffect(() => {
    if (!cardRef.current || !isHovered) return;
    
    gsap.to(cardRef.current, {
      rotationX: mousePosition.y * 5,
      rotationY: mousePosition.x * 5,
      duration: 0.1,
      ease: "power2.out",
    });
  }, [mousePosition, isHovered]);

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    gsap.to(link, {
      scale: 1.1,
      rotate: 12,
      duration: 0.3,
      ease: "back.out(0.4)",
    });
  };

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    gsap.to(link, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleTagHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    const tag = e.currentTarget;
    gsap.to(tag, {
      scale: 1.1,
      backgroundColor: "rgba(99, 102, 241, 0.2)",
      borderColor: "rgba(99, 102, 241, 0.5)",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleTagLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    const tag = e.currentTarget;
    gsap.to(tag, {
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <article
      ref={cardRef}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 transition-all duration-500 hover:border-white/20"
      style={{
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Scroll Progress Bar */}
      <div className="absolute left-0 right-0 top-0 z-10 h-1 overflow-hidden rounded-t-[2rem]">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          style={{ width: "0%" }}
        />
      </div>

      {/* Progress Glow Effect */}
      <div className="absolute left-0 right-0 top-0 z-10 h-1 blur-sm">
        <div
          className="h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
          style={{
            width: `${scrollProgress * 100}%`,
            animation: "shimmer 2s infinite",
          }}
        />
      </div>

      {/* Gradient Border Animation */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

      {/* Card Content with 3D Tilt */}
      <div>
        {/* Icon Section */}
        <div
          className={`flex min-h-56 items-end justify-between bg-gradient-to-br ${gradient} p-7 relative overflow-hidden transition-all duration-500 group-hover:scale-105`}
        >
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl transition-all duration-700 group-hover:scale-150" />
          
          <div ref={iconRef}>
            <Icon size={44} className="relative z-10" />
          </div>
          
          <div className="relative z-10 text-right">
            <p className="text-sm font-semibold text-white/80">{category}</p>
            <h3 className="text-2xl font-black">{title}</h3>
          </div>
        </div>

        {/* Content Section */}
        <div ref={contentRef} className="p-7">
          <div className="mb-3 flex items-start justify-between gap-4">
            <h3 className="text-2xl font-black bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              {title}
            </h3>

            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="group/link grid size-10 shrink-0 place-items-center rounded-full bg-white/5 text-slate-200 transition-all duration-300 hover:bg-white/10"
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              <ArrowUpRight 
                size={18} 
                className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" 
              />
            </a>
          </div>

          <p className="leading-7 text-slate-300 transition-all duration-300 group-hover:text-slate-200">
            {description}
          </p>

          <div ref={tagsRef} className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-200 transition-all duration-300"
                onMouseEnter={handleTagHover}
                onMouseLeave={handleTagLeave}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="rounded-full bg-black/50 backdrop-blur-sm px-2 py-1 text-[10px] font-mono text-white/70 flex items-center gap-1">
          <Sparkles size={8} className="text-indigo-400" />
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute bottom-0 left-0 h-16 w-16 overflow-hidden">
        <div className="absolute -bottom-8 -left-8 h-16 w-16 rotate-45 bg-gradient-to-r from-indigo-500/20 to-pink-500/20" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </article>
  );
}