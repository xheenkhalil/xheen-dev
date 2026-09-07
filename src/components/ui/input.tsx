import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground outline-none ring-ring placeholder:text-muted-foreground focus-visible:ring-2",
        className,
      )}
      {...props}
    />
  );
}
