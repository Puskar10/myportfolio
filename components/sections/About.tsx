"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  GraduationCap,
  Rocket,
  Sparkles,
} from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Diploma CSE Student",
    description:
      "Currently pursuing Diploma in Computer Science & Engineering.",
  },
  {
    icon: Code2,
    title: "Full Stack Developer",
    description:
      "Building modern web applications using React, Next.js, Node.js, and databases.",
  },
  {
    icon: Rocket,
    title: "AI Enthusiast",
    description:
      "Exploring AI-powered tools and real-world automation projects.",
  },
];

const stats = [
  {
    value: "10+",
    label: "Projects Built",
  },
  {
    value: "2+",
    label: "Years Learning",
  },
  {
    value: "5+",
    label: "Technologies",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 b" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200">
              About Me
            </span>
          </div>

          <h2 className="bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            Know More About Me
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-400">
            A passionate developer focused on building modern, useful, and
            scalable digital products.
          </p>
        </div>

        {/* About Layout */}
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left Image */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-blue-500/25 via-purple-500/25 to-fuchsia-500/25 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl shadow-black/40">
              <div className="relative h-[480px]">
                <Image
                  src="/images/hero-avatar.png"
                  alt="Puskar Shaw"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-black/40 p-5 backdrop-blur-xl">
                <p className="text-sm font-semibold text-indigo-300">
                  Full Stack Developer
                </p>

                <h3 className="mt-1 text-2xl font-black text-white">
                  Puskar Shaw
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Building full-stack and AI-powered web applications.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
              Who I Am
            </p>

            <h3 className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Puskar Shaw
              </span>
              , a diploma CSE student and passionate full stack developer.
            </h3>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              I enjoy turning ideas into real-world products using modern web
              technologies. I mainly work with React, Next.js, Tailwind CSS,
              Node.js, Express, MongoDB, and SQL databases. I also love building
              AI-powered projects that solve practical problems and improve user
              experience.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">
              My goal is to become a strong full-stack developer and build
              professional, scalable, and user-friendly applications. I am always
              learning new technologies, improving my coding skills, and working
              on meaningful projects.
            </p>

            {/* Highlights */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-white/5 p-5 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">
                      <Icon className="h-5 w-5 text-indigo-300" />
                    </div>

                    <h4 className="font-bold text-white">{item.title}</h4>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <h4 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-3xl font-black text-transparent">
                    {stat.value}
                  </h4>

                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-10">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:-translate-y-1 hover:shadow-purple-500/50"
              >
                View My Work
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}