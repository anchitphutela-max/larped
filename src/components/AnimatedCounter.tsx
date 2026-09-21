import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  /** Target value to count towards */
  value: number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Fraction digits used by the default formatter */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Custom formatter. Overrides decimals, prefix and suffix when provided. */
  format?: (value: number) => string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const AnimatedCounter = ({
  value,
  duration = 900,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  format,
}: AnimatedCounterProps) => {
  const safeTarget = Number.isFinite(value) ? value : 0;
  const currentRef = useRef(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const target = Number.isFinite(value) ? value : 0;
    const from = currentRef.current;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || duration <= 0 || from === target) {
      currentRef.current = target;
      setDisplay(target);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const next = from + (target - from) * easeOutCubic(progress);
      currentRef.current = next;
      setDisplay(next);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  const formatValue = (n: number): string => {
    if (format) return format(n);
    const body = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n);
    return `${prefix}${body}${suffix}`;
  };

  return (
    <span
      className={cn("tabular-nums", className)}
      aria-label={formatValue(safeTarget)}
    >
      {formatValue(display)}
    </span>
  );
};

export { AnimatedCounter };
export default AnimatedCounter;