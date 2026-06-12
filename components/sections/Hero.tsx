"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Mail,
  Sparkles,
} from "lucide-react";
import Icon from "@mdi/react";
import { mdiGithub, mdiLinkedin } from "@mdi/js";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const typewriterWords = ["Hello, I'm", "Puskar Shaw", "Full Stack Developer"];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const currentWord = typewriterWords[wordIndex];

    const typingSpeed = 95;
    const deletingSpeed = 55;
    const holdDelay = 1600;
    const nextWordDelay = 450;

    let timeoutDelay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && typedText === currentWord) {
      timeoutDelay = holdDelay;
    }

    if (isDeleting && typedText === "") {
      timeoutDelay = nextWordDelay;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.slice(0, typedText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentWord.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % typewriterWords.length);
        }
      }
    }, timeoutDelay);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, wordIndex]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden text-white"
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 160,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#3b82f6", "#a855f7", "#06b6d4", "#8b5cf6"],
            },
            links: {
              color: "#3b82f6",
              distance: 140,
              enable: true,
              opacity: 0.18,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              speed: 1.6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 900,
              },
              value: 65,
            },
            opacity: {
              value: 0.28,
              random: true,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.08,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: {
                min: 1,
                max: 3,
              },
              random: true,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.5,
                sync: false,
              },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full sm:h-96 sm:w-96" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full sm:h-96 sm:w-96" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[520px] sm:w-[520px]" />
      </div>

      {/* Main Wrapper */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div
          className={`w-full transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
            {/* Left Content */}
            <div
              className={`mx-auto max-w-2xl text-center transition-all delay-200 duration-1000 lg:mx-0 lg:text-left ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              {/* Badge */}
              <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.9)]" />
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  Available for work
                </span>
              </div>

              {/* Typewriter Heading */}
              <div className="min-h-[90px] sm:min-h-[120px] md:min-h-[145px] xl:min-h-[170px]">
                <h1 className="bg-gradient-to-r from-blue-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-5xl font-black leading-[0.95] tracking-tight text-transparent sm:text-6xl md:text-7xl xl:text-8xl">
                  {typedText}
                  <span className="typewriter-cursor ml-1 text-white">|</span>
                </h1>
              </div>

              <div className="mt-5">
                <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 lg:mx-0" />
              </div>

              <p className="mt-5 text-base text-blue-300/90 sm:text-lg">
                Building digital experiences that matter
              </p>

              <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
                I build modern, scalable web applications and{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold text-transparent">
                  AI-powered solutions
                </span>{" "}
                that solve real-world problems with elegant code and exceptional
                user experiences.
              </p>

              {/* Stats */}
              <div className="mx-auto mt-8 grid max-w-xl grid-cols-3 gap-3 py-6 lg:mx-0">
                {[
                  {
                    value: "2+",
                    label: "Years Learning",
                  },
                  {
                    value: "10+",
                    label: "Projects Built",
                  },
                  {
                    value: "100%",
                    label: "Dedication",
                  },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-slate-400 sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/40"
                >
                  Hire Me
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#projects");
                  }}
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  View Projects
                  <BriefcaseBusiness className="h-5 w-5" />
                </Link>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-slate-400 lg:justify-start">
                <Link
                  href="mailto:puskarshaw346@gmail.com"
                  className="flex items-center gap-2 transition-all duration-300 hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                  Email Me
                </Link>

                <span className="hidden h-6 w-px bg-white/20 sm:block" />

                <Link
                  href="https://github.com/Puskar10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-all duration-300 hover:text-white"
                >
                  <Icon path={mdiGithub} size={0.8} />
                  GitHub
                </Link>

                <span className="hidden h-6 w-px bg-white/20 sm:block" />

                <Link
                  href="https://www.linkedin.com/in/puskarshaw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-all duration-300 hover:text-white"
                >
                  <Icon path={mdiLinkedin} size={0.8} />
                  LinkedIn
                </Link>
              </div>
            </div>

            {/* Right Avatar */}
            <div
              className={`relative flex justify-center transition-all delay-300 duration-1000 lg:justify-end ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
            >
              <div className="relative flex h-[320px] w-[320px] items-center justify-center sm:h-[430px] sm:w-[430px] lg:h-[500px] lg:w-[500px]">
                <div className="relative h-[250px] w-[250px] overflow-hidden rounded-full bg-slate-900 shadow-2xl transition-all duration-300 hover:scale-105 sm:h-[340px] sm:w-[340px] lg:h-[390px] lg:w-[390px]">
                  <Image
                    src="/images/hero-avatar.png"
                    alt="Puskar Shaw"
                    fill
                    priority
                    sizes="(max-width: 640px) 250px, (max-width: 1024px) 340px, 390px"
                    className="object-cover object-center"
                  />
                </div>

                <div className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 rounded-full bg-slate-900/90 px-5 py-2.5 shadow-lg backdrop-blur-xl sm:bottom-4">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.9)]" />
                    <span className="text-xs font-medium text-white sm:text-sm">
                      Open for opportunities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}