'use client'

import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "default" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
}

function MyPrettyButton({
  variant = "default",
  href,
  className = "",
  onClick,
  children,
  ...props
}: ButtonProps) {
    const { replace } = useRouter();

    const base =
        "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed";

    const variants: Record<ButtonVariant, string> = {
        default:
        "bg-[var(--background-button)] hover:bg-[var(--background-button-hover)] text-[var(--foreground-primary)]",
        ghost:
        "bg-transparent hover:bg-[var(--background-button)] text-[var(--foreground-secondary)] border border-[var(--background-button)]",
    };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} onClick={(e) => {
        if(href) {
            replace(href)
        } else {
            if(onClick)
                onClick(e)
        }
    }}>
      {children}
    </button>
  );
}

export default MyPrettyButton;