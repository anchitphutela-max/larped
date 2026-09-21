import { cn } from "@/lib/utils";

interface LarpedMarkProps {
  className?: string;
}

export function LarpedMark({ className }: LarpedMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="larpedGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="hsl(173 80% 40%)" />
          <stop offset="100%" stopColor="hsl(173 80% 25%)" />
        </linearGradient>
      </defs>
      {/* Leaf / bridge hybrid mark: two arcs forming a loop */}
      <path
        d="M14 46 C 14 26, 32 12, 50 18 C 42 22, 36 30, 34 40"
        stroke="url(#larpedGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 50 C 30 42, 42 38, 52 42 C 46 48, 34 52, 22 50 Z"
        fill="url(#larpedGradient)"
      />
      <circle cx="50" cy="18" r="4" fill="hsl(173 80% 48%)" />
    </svg>
  );
}

interface LarpedLogoProps {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export function LarpedLogo({
  className,
  markClassName,
  textClassName,
  showText = true,
}: LarpedLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LarpedMark className={markClassName} />
      {showText && (
        <div className={cn("flex flex-col leading-none", textClassName)}>
          <span className="text-base font-semibold tracking-tight">
            Larped
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Carbon Compliance
          </span>
        </div>
      )}
    </div>
  );
}

export default LarpedLogo;