import { cn } from "@/lib/utils";

type StatusPillsProps = {
  items: string[];
  className?: string;
  label?: string;
};

export function StatusPills({ items, className, label = "Projekthöjdpunkter" }: StatusPillsProps) {
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
  "FE22",
  "JavaScript 3",
  "Större uppgift",
  "Next.js 14",
  "MongoDB Atlas",
  "JWT",
  "Netlify",
] as const;

export const aboutPills = [
  "Atlas: js3-auth-blog",
  "Kluster: JS3-app",
  "blogPosts",
  "JWT-dashboard",
  "Postman",
  "Netlify CI",
] as const;
