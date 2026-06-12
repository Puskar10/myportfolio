"use client";

import Link from "next/link";
import { Download, Eye, FileText } from "lucide-react";

const resumePath = "/resume/Puskar-Shaw-Resume.pdf";

export default function ResumeContact() {
  return (
    <section
      id="resume"
      className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8"
    >
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-2 backdrop-blur-sm">
            <FileText className="h-4 w-4 text-indigo-300" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200">
              Resume
            </span>
          </div>

          <h2 className="bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            My Resume
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
        </div>

        {/* Resume Box */}
        <div className="mx-auto mt-14 max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-10 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:px-10 lg:px-16">
          <h3 className="text-xl font-black text-white sm:text-2xl">
            My Professional Resume
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-xl">
            Full Stack Developer focused on modern web development, AI-powered
            applications, and scalable digital products.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-500/70 bg-blue-500/5 px-7 py-3.5 text-sm font-semibold text-blue-300 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:text-white sm:w-auto"
            >
              Preview Resume
              <Eye className="h-4 w-4" />
            </Link>

            <a
              href={resumePath}
              download="Puskar-Shaw-Resume.pdf"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-purple-500/45 sm:w-auto"
            >
              Download PDF
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}