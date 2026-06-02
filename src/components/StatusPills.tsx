import { cn } from "@/lib/utils";

type StatusPillsProps = {
  items: string[];
  className?: string;
  label?: string;
};

export function StatusPills({ items, className, label = "Highlights" }: StatusPillsProps) {
  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      aria-label={label}
    >
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center rounded-full border border-[#2F7DE1]/22 bg-[#2F7DE1]/12 px-3 py-1.5 text-xs font-extrabold tracking-wide text-[#2F7DE1] dark:border-[#6BA3F0]/30 dark:bg-[#2F7DE1]/20 dark:text-[#8BB8F5]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export const homePills = [
  "Next.js 14",
  "TypeScript",
  "MongoDB Atlas",
  "JWT Auth",
  "Protected Blog",
  "Netlify",
] as const;

export const aboutPills = [
  "MongoDB Atlas",
  "JWT + bcrypt",
  "Next.js API Routes",
  "Dark / Light Theme",
  "CI Deploy",
  "Full Stack",
] as const;
