"use client";

import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  Code2,
  Download,
  Eye,
  FileText,
  Home,
  Mail,
  Menu,
  User,
  Wrench,
  X,
} from "lucide-react";
import Icon from "@mdi/react";
import { mdiGithub, mdiLinkedin } from "@mdi/js";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const resumePath = "/resume/Puskar-Shaw-Resume.pdf";

const navItems = [
  { title: "Home", href: "#home", icon: Home },
  { title: "About", href: "#about", icon: User },
  { title: "Skills", href: "#skills", icon: Wrench },
  { title: "Projects", href: "#projects", icon: Briefcase },
  { title: "Contact", href: "#contact", icon: Mail },
];

export default function PortfolioNavbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("#home");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      let current = "#home";

      navItems.forEach((item) => {
        const section = document.querySelector(item.href);

        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
          current = item.href;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleResumeView = () => {
    window.open(resumePath, "_blank", "noopener,noreferrer");
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "Puskar-Shaw-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <header
        className={`fixed left-1/2 top-5 z-50 w-[calc(100%-1.5rem)] max-w-7xl -translate-x-1/2 rounded-2xl border px-4 py-2 transition-all duration-300 sm:px-5 ${
          isScrolled
            ? "border-white/10 bg-slate-950/90 shadow-2xl shadow-black/40 backdrop-blur-2xl"
            : "border-white/10 bg-slate-950/65 backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="group flex items-center gap-3"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 shadow-lg shadow-indigo-500/25 transition duration-300 group-hover:scale-105">
              <Code2 className="h-5 w-5 text-white" />
            </div>

            <div className="text-left">
              <h1 className="text-sm font-black leading-none text-white sm:text-base">
                Puskar Shaw
              </h1>

              <p className="mt-1 hidden text-[11px] font-medium text-slate-400 sm:block">
                Full Stack Developer
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const IconItem = item.icon;
              const isActive = activeSection === item.href;

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className={`group inline-flex h-11 items-center gap-2 rounded-2xl px-4 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <IconItem
                    className={`h-4 w-4 transition ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  {item.title}
                </button>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/Puskar10"
              target="_blank"
              rel="noreferrer"
              className="hidden h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/10 sm:grid"
              aria-label="GitHub"
            >
              <Icon path={mdiGithub} size={0.9} />
            </Link>

            <Link
              href="https://www.linkedin.com/in/puskarshaw/"
              target="_blank"
              rel="noreferrer"
              className="hidden h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/10 sm:grid"
              aria-label="LinkedIn"
            >
              <Icon path={mdiLinkedin} size={0.9} />
            </Link>

            <button
              type="button"
              onClick={handleResumeView}
              className="hidden items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-500 hover:text-white md:inline-flex"
            >
              <Eye className="h-4 w-4" />
              Resume
            </button>

            <button
              type="button"
              onClick={() => handleNavClick("#contact")}
              className="hidden rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:shadow-pink-500/30 sm:inline-flex"
            >
              Hire Me
            </button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[310px] border-l border-white/10 bg-slate-950 px-5 text-white"
              >
                <div className="mt-6 flex flex-col gap-6">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500">
                        <Code2 className="h-5 w-5 text-white" />
                      </div>

                      <div>
                        <h2 className="font-black text-white">Puskar Shaw</h2>
                        <p className="text-xs text-slate-400">
                          Full Stack Developer
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Mobile Nav */}
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                      const IconItem = item.icon;
                      const isActive = activeSection === item.href;

                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => handleNavClick(item.href)}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                            isActive
                              ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/20"
                              : "text-slate-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <IconItem className="h-5 w-5" />
                          {item.title}
                        </button>
                      );
                    })}
                  </nav>

                  {/* Resume Mobile Buttons */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="mb-4 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-indigo-300" />
                      <p className="text-sm font-bold text-white">My Resume</p>
                    </div>

                    <div className="grid gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleResumeView();
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500/50 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-500 hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                        View Resume
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleResumeDownload();
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                      >
                        <Download className="h-4 w-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>

                  {/* Social Mobile */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="https://github.com/Puskar10"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <Icon path={mdiGithub} size={0.8} />
                      GitHub
                    </Link>

                    <Link
                      href="https://www.linkedin.com/in/puskarshaw/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <Icon path={mdiLinkedin} size={0.8} />
                      LinkedIn
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNavClick("#contact")}
                    className="rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5"
                  >
                    Hire Me
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="h-20" />
    </>
  );
}