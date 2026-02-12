import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "poof.sh",
    description:
        "Easy open source environment variable management for teams and individuals. Open source and self-hostable.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://poof.sh",
        title: "poof.sh",
        description:
            "Easy open source environment variable management for teams and individuals. Open source and self-hostable.",
        images: [
            {
                url: "https://poof.sh/og-image.png",
                width: 1200,
                height: 630
            }
        ]
    },
    keywords: [
        "poof.sh",
        "environment variables",
        "open source",
        "self-hostable",
        "team collaboration",
        "team management",
        "team collaboration",
        "team management"
    ],
    authors: [{ name: "Kyle Dickey", url: "https://november.software" }]
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
