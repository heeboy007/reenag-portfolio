'use client';

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext<{
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}>({
    theme: 'dark',
    toggleTheme: () => {},
});

function ThemeControlledHtml({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const toggleTheme = () => {
        console.log('toggleTheme', theme);
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <html 
                lang="en"
                data-theme={theme}>
                {children}
            </html>
        </ThemeContext.Provider>
    );
}

const useTheme = () => useContext(ThemeContext);

export {
    useTheme
};

export default ThemeControlledHtml;