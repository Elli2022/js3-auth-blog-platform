import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-white/80 p-8 shadow-xl shadow-violet-500/10 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/80",
        className
      )}
    >
      {children}
    </div>
  );
}
