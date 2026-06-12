"use client";

import Image from "next/image";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const skills = [
  { name: "React", imageUrl: "/skills/React.svg" },
  { name: "Next.js", imageUrl: "/skills/Next.js.svg" },
  { name: "TypeScript", imageUrl: "/skills/TypeScript.svg" },
  { name: "Python", imageUrl: "/skills/Python.svg" },
  { name: "Node.js", imageUrl: "/skills/Node.js.svg" },
  { name: "Express", imageUrl: "/skills/Express.svg" },
  { name: "MongoDB", imageUrl: "/skills/MongoDB.svg" },
  { name: "MySQL", imageUrl: "/skills/MySQL.svg" },
  { name: "PostgreSQL", imageUrl: "/skills/PostgresSQL.svg" },
  { name: "Tailwind CSS", imageUrl: "/skills/Tailwind CSS.svg" },
  { name: "HTML5", imageUrl: "/skills/HTML5.svg" },
  { name: "NPM", imageUrl: "/skills/NPM.svg" },
  { name: "GitHub", imageUrl: "/skills/GitHub.svg" },
];

export default function Skills() {
  const midPoint = Math.ceil(skills.length / 2);
  const firstRowSkills = skills.slice(0, midPoint);
  const secondRowSkills = skills.slice(midPoint);

  return (
    <section id="skills" className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 " />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300">
            My Skills
          </p>

          <h2 className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-4xl font-black text-transparent sm:text-5xl">
            Technologies I Use
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Tools and technologies I use to build modern, scalable and
            responsive web applications.
          </p>
        </div>

        <InfiniteMovingCards
          items={firstRowSkills.map((skill) => ({
            name: skill.name,
            iconElement: (
              <div className="relative h-12 w-12 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={skill.imageUrl}
                  alt={skill.name}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
            ),
          }))}
          direction="right"
          speed="slow"
        />

        <div className="mt-8">
          <InfiniteMovingCards
            items={secondRowSkills.map((skill) => ({
              name: skill.name,
              iconElement: (
                <div className="relative h-12 w-12 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={skill.imageUrl}
                    alt={skill.name}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
              ),
            }))}
            direction="left"
            speed="normal"
          />
        </div>
      </div>
    </section>
  );
}