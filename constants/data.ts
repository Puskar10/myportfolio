import {
  Bot,
  Code2,
  Database,
  Server,
  Sparkles,
  Video,
} from "lucide-react";

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const skills = [
  {
    name: "React",
    icon: Sparkles,
  },
  {
    name: "Next.js",
    icon: Code2,
  },
  {
    name: "TypeScript",
    icon: Code2,
  },
  {
    name: "Node.js",
    icon: Server,
  },
  {
    name: "Express",
    icon: Server,
  },
  {
    name: "MongoDB",
    icon: Database,
  },
  {
    name: "PostgreSQL",
    icon: Database,
  },
  {
    name: "Tailwind CSS",
    icon: Sparkles,
  },
  {
    name: "Python",
    icon: Code2,
  },
  {
    name: "Socket.IO",
    icon: Server,
  },
];

export const projects = [
  {
    title: "BlueMeet",
    category: "Real-time Platform",
    icon: Video,
    description:
      "A WebRTC video conferencing platform with room joining, real-time communication, screen sharing, and Socket.IO signaling.",
    tags: ["React", "WebRTC", "Socket.IO", "Node.js"],
    gradient: "from-blue-600 to-cyan-500",
    link: "https://github.com/Puskar10/BlueMeet",
  },
  {
    title: "Jarvis AI Chatbot",
    category: "AI Assistant",
    icon: Bot,
    description:
      "A full-stack AI chatbot with clean chat UI, memory system, MongoDB storage, and natural AI responses.",
    tags: ["React", "Node.js", "MongoDB", "AI API"],
    gradient: "from-violet-600 to-fuchsia-500",
    link: "#",
  },
  {
    title: "AI Text-to-PPT",
    category: "AI Productivity",
    icon: Sparkles,
    description:
      "An AI-powered tool that converts text prompts into professional presentation slides using modern web technologies.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "ImageKit"],
    gradient: "from-pink-600 to-orange-400",
    link: "#",
  },
];

export const services = [
  "Full Stack Web Development",
  "REST API Development",
  "Database Design",
  "Real-time Applications",
  "AI-powered Web Solutions",
];