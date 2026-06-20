'use client';

import { useTheme } from "@/context/ThemeControlledHtml";

const buttonStyle = "relative inline-flex h-8 w-14 items-center rounded-full bg-foreground-secondary/80 transition-colors duration-200 shadow-inner";

function ThemeToggler() {
    const { theme, toggleTheme } = useTheme();

    return (
            <button
                type="button"
                onClick={toggleTheme}
                role="switch"
                aria-checked={theme === 'dark'}
                aria-label="Toggle dark mode"
                className={buttonStyle}>
            {/* 트랙 안에 해/달 아이콘 살짝 넣기 */}
            {theme === 'dark' && <span className="pointer-events-none absolute left-2 text-xs">
            ☀️
            </span>}
            {theme === 'light' && <span className="pointer-events-none absolute right-2 text-xs">
            🌙
            </span>}
    
            {/* 동그란 토글 노브 */}
            <span
                className={`
                    inline-flex h-6 w-6 items-center justify-center rounded-full
                    bg-background-primary text-[10px]
                    shadow
                    transform transition-transform duration-200
                    ${theme === 'dark' ? "translate-x-7" : "translate-x-1"}
                `}>
                {theme === 'dark' ? "🌙" : "☀️"}
            </span>
        </button>
    );
}

export default ThemeToggler;