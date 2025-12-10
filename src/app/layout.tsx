import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeControlledHtml from "@/context/ThemeControlledHtml";
import ThemeTogger from "@/component/home/ThemeToggler";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ReenAG",
    description: "ReenAG's Portfolio",
};

function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeControlledHtml>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </body>
        </ThemeControlledHtml>
    );
}

export default RootLayout;