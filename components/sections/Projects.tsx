"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Star,
  Code2,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TracingBeam } from "@/components/ui/tracing-beam";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "BlueMeet",
    badge: "Video Calling App",
    description:
      "A real-time video conferencing platform built with WebRTC and Socket.IO. It supports peer-to-peer video calling, room joining, screen sharing, and rejoin handling.",
    longDescription:
      "Experience seamless video communication with crystal-clear HD quality, screen sharing capabilities, real-time chat, and support for team meetings, webinars, and collaborative sessions.",
    image: "/projects/bluemeet.png",
    liveUrl: "https://bluemeet.vercel.app",
    githubUrl: "https://github.com/Puskar10/BlueMeet",
    tags: ["React", "WebRTC", "Socket.IO", "Node.js", "Tailwind CSS"],
    features: [
      "HD Video Calls",
      "Screen Sharing",
      "Real-time Chat",
      "Room Management",
      "Rejoin Support",
    ],
    stats: { users: "5K+", rating: "4.8", year: "2024" },
  },
  {
    title: "Jarvis AI Chatbot",
    badge: "AI Chatbot",
    description:
      "An AI-powered chatbot with memory, chat history, clean UI, and natural language response generation using Groq AI.",
    longDescription:
      "Jarvis AI is an intelligent virtual assistant that remembers conversations, provides contextual responses, and gives fast replies using Groq AI technology.",
    image: "/projects/jarvis.png",
    liveUrl: "https://jarvis-ai-chatbot-delta.vercel.app",
    githubUrl: "https://github.com/Puskar10/Jarvis-AI-Chatbot",
    tags: ["React", "Node.js", "MongoDB", "Groq AI", "Express"],
    features: [
      "Memory Retention",
      "Chat History",
      "Natural Language",
      "Context Awareness",
      "Fast Responses",
    ],
    stats: { users: "3K+", rating: "4.9", year: "2024" },
  },
  {
    title: "AI Text-to-PPT",
    badge: "AI Presentation Tool",
    description:
      "A smart AI tool that converts text prompts into professional PowerPoint presentations with templates and slide generation.",
    longDescription:
      "Transform your ideas into stunning presentations in seconds. Provide a prompt or topic, and the AI generates complete PowerPoint slides with professional layouts and relevant content.",
    image: "/projects/ai-ppt.png",
    liveUrl: "#",
    githubUrl: "https://github.com/Puskar10/AI-Text-to-PPT",
    tags: ["Next.js", "TypeScript", "Prisma", "OpenAI", "Tailwind CSS"],
    features: [
      "AI Generation",
      "Custom Templates",
      "Export to PPTX",
      "Real-time Preview",
      "Image Suggestions",
    ],
    stats: { users: "2K+", rating: "4.7", year: "2024" },
  },
  {
    title: "AI Resume Analyzer",
    badge: "Resume Analysis",
    description:
      "A Flask-based resume analyzer that extracts resume data, analyzes skills, and provides useful insights through a clean dashboard interface.",
    longDescription:
      "Get detailed insights about your resume. The system analyzes skills, experience, and education, then provides improvement suggestions for job seekers.",
    image: "/projects/resume-analyzer.png",
    liveUrl: "#",
    githubUrl: "https://github.com/Puskar10/AI-Resume-Analyzer",
    tags: ["Python", "Flask", "MySQL", "NLP", "spaCy"],
    features: [
      "Skill Analysis",
      "Experience Tracking",
      "Keyword Extraction",
      "Score Generation",
      "Improvement Tips",
    ],
    stats: { users: "1K+", rating: "4.6", year: "2023" },
  },
  {
    title: "Student Database System",
    badge: "Full Stack App",
    description:
      "A student management system for storing, updating, deleting, and managing student records with a full-stack architecture.",
    longDescription:
      "A student management solution for educational institutions. It supports student records, grade tracking, attendance management, reports, and admin dashboard features.",
    image: "/projects/student-db.png",
    liveUrl: "#",
    githubUrl: "https://github.com/Puskar10/Student-Database-System",
    tags: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
    features: [
      "Student Records",
      "Grade Tracking",
      "Attendance",
      "Reports",
      "Admin Dashboard",
    ],
    stats: { users: "500+", rating: "4.5", year: "2023" },
  },
  {
    title: "Gym Website",
    badge: "Frontend Website",
    description:
      "A modern responsive gym landing page with attractive UI sections, smooth layout, and clean design using React and Tailwind CSS.",
    longDescription:
      "A responsive gym and fitness website with modern design, smooth sections, trainer profiles, membership plans, and a clean frontend experience.",
    image: "/projects/gym.png",
    liveUrl: "#",
    githubUrl: "https://github.com/Puskar10/Gym-Website",
    tags: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
    features: [
      "Responsive Design",
      "Smooth Animations",
      "Class Schedules",
      "Trainer Profiles",
      "Membership Plans",
    ],
    stats: { users: "2K+", rating: "4.8", year: "2024" },
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!isMobile && headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const nextProject = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % projects.length);

    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevProject = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      nextProject();
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, nextProject]);

  useEffect(() => {
    if (!isMobile) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.changedTouches[0].screenX;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      touchEndX = event.changedTouches[0].screenX;

      if (touchStartX - touchEndX > 50) {
        nextProject();
      }

      if (touchEndX - touchStartX > 50) {
        prevProject();
      }
    };

    const section = sectionRef.current;

    if (section) {
      section.addEventListener("touchstart", handleTouchStart);
      section.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (section) {
        section.removeEventListener("touchstart", handleTouchStart);
        section.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isMobile, nextProject, prevProject]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden py-24 text-white"
    >
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mx-auto mb-12 max-w-3xl text-center">
          <div className="group mb-5 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-indigo-500/20">
            <Sparkles className="h-4 w-4 animate-pulse text-indigo-300" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200">
              Featured Projects
            </span>
          </div>

          <h2 className="bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            My Recent Work
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400">
            {isMobile
              ? "Swipe left or right to explore my projects."
              : "Scroll through my project showcase with preview images, technology stack, live demo links, and source code links."}
          </p>
        </div>

        {/* Mobile Carousel */}
        {isMobile ? (
          <div className="relative">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {projects.map((project, index) => (
                  <MobileProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-gradient-to-r from-indigo-500 to-pink-500"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={prevProject}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-indigo-500/50"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>

            <button
              type="button"
              onClick={nextProject}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-indigo-500/50"
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>

            <div className="mt-4 text-center">
              <span className="text-sm text-slate-400">
                {currentIndex + 1} / {projects.length}
              </span>
            </div>
          </div>
        ) : (
          <TracingBeam className="px-0 md:px-6">
            <div className="mx-auto max-w-4xl">
              {projects.map((project, index) => (
                <DesktopProjectItem
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </TracingBeam>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="https://github.com/Puskar10"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            View All Projects on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function MobileProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <div className="w-full flex-shrink-0 px-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="relative h-[280px] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />

          <div className="absolute left-4 top-4">
            <div className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md">
              <Zap className="h-3 w-3 text-indigo-300" />
              <span className="text-xs font-semibold text-indigo-200">
                {project.badge}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="mb-2 text-2xl font-bold text-white">
            {project.title}
          </h3>

          <p className="mb-4 line-clamp-3 text-sm text-slate-300">
            {project.longDescription}
          </p>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}

            {project.tags.length > 3 && (
              <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-400">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Live Demo
            </Link>

            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-center text-sm font-semibold text-slate-200"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopProjectItem({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!itemRef.current) return;

      gsap.fromTo(
        itemRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, itemRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="group relative mb-32 pl-0 md:pl-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200 backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
        <Zap className="h-3 w-3" />
        {project.badge}
      </div>

      {/* Title */}
      <h3 className="bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-4xl font-black text-transparent transition-all duration-500 group-hover:translate-x-2 sm:text-5xl lg:text-6xl">
        {project.title}
      </h3>

      {/* Image */}
      <div className="group/image relative mt-8 overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl shadow-black/40 transition-all duration-500 hover:shadow-indigo-500/20">
        <div className="relative h-[260px] sm:h-[420px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 850px"
            className="object-cover transition-all duration-700 group-hover/image:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/20 to-transparent" />

          <div
            className={`absolute bottom-5 right-5 flex gap-2 transition-all duration-500 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs backdrop-blur-md">
              <Star className="mr-1 inline h-3 w-3 text-yellow-500" />
              {project.stats.rating}
            </div>

            <div className="rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs backdrop-blur-md">
              <Code2 className="mr-1 inline h-3 w-3 text-indigo-400" />
              {project.stats.users}
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 text-8xl font-black text-white/5 transition-all duration-500 group-hover/image:scale-110 group-hover/image:text-white/10">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Description */}
      <div className="mt-7 space-y-4">
        <p className="text-base leading-8 text-slate-300 sm:text-lg">
          {project.longDescription}
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2 md:grid-cols-3">
          {project.features.slice(0, 5).map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500" />
              <span className="text-sm text-slate-400">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag, tagIndex) => (
          <span
            key={tag}
            className="rounded-full border border-white/5 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200 transition-all duration-300 hover:scale-105 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-300"
            style={{
              transitionDelay: `${tagIndex * 50}ms`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Live Demo
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </span>

          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/20 to-transparent transition-transform duration-500 group-hover/btn:translate-x-0" />
        </Link>

        <Link
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white"
        >
          GitHub
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Link>
      </div>

      {/* Year Badge */}
      <div className="absolute -top-4 right-0 hidden lg:block">
        <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-500 backdrop-blur-sm">
          {project.stats.year}
        </div>
      </div>
    </div>
  );
}