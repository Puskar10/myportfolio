"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  
  Loader2,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";

import { mdiGithub, mdiLinkedin } from "@mdi/js";
import Icon from "@mdi/react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden  px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 " />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200">
              Contact Me
            </span>
          </div>

          <h2 className="bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            Let&apos;s Build Something
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400">
            Have a project idea, internship opportunity, or collaboration in
            mind? Send me a message and I&apos;ll get back to you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left Info */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
            <h3 className="text-2xl font-black text-white">
              Get in touch
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              I&apos;m open to full-stack development work, AI projects,
              internships, and freelance opportunities.
            </p>

            <div className="mt-8 space-y-4">
              <Link
                href="mailto:puskarshaw346@gmail.com"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-indigo-400/40 hover:bg-white/[0.07]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-500/10">
                  <Mail className="h-5 w-5 text-indigo-300" />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">Email</p>
                  <p className="text-sm text-slate-400">
                    puskarshaw346@gmail.com
                  </p>
                </div>

                <ArrowUpRight className="ml-auto h-4 w-4 text-slate-500 transition group-hover:text-white" />
              </Link>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-purple-500/10">
                  <MapPin className="h-5 w-5 text-purple-300" />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">Location</p>
                  <p className="text-sm text-slate-400">Kolkata, India</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                href="https://github.com/Puskar10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-1 hover:bg-white/10 hover:text-white"
                aria-label="GitHub"
              >
                <Icon path={mdiGithub} size={0.9} />
              </Link>

              <Link
                href="https://www.linkedin.com/in/puskarshaw/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-1 hover:bg-white/10 hover:text-white"
                aria-label="LinkedIn"
              >
                <Icon path={mdiLinkedin} size={0.9} />
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Puskar Shaw"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@gmail.com"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Project collaboration"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Write your message here..."
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:shadow-pink-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>

            {status === "success" && (
              <p className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-center text-sm font-semibold text-emerald-300">
                Message sent successfully!
              </p>
            )}

            {status === "error" && (
              <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-300">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}