import type { ReactNode } from "react";

type SectionTitleProps = {
  icon: ReactNode;
  title: string;
};

export default function SectionTitle({ icon, title }: SectionTitleProps) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-2xl bg-indigo-500/15 text-indigo-300">
        {icon}
      </span>
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}