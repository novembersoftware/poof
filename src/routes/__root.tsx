/// <reference types="vite/client" />

import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Toaster } from "sileo";
import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            {
                title: "poof.sh"
            },
            {
                name: "description",
                content:
                    "Anonymous one-time text links. Create a poof, send the link, and it disappears after it is viewed."
            },
            { property: "og:title", content: "poof.sh" },
            {
                property: "og:description",
                content:
                    "Anonymous one-time text links. Create a poof, send the link, and it disappears after it is viewed."
            },
            { property: "og:type", content: "website" },
            { property: "og:url", content: "https://poof.sh" }
        ],
        links: [{ rel: "stylesheet", href: appCss }]
    }),
    component: Outlet,
    shellComponent: RootDocument
});

function RootDocument({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body className="min-h-screen antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex min-h-screen flex-col">
                        <Navbar />
                        <main className="flex-1">{children}</main>
                    </div>
                    <Toaster position="bottom-right" />
                </ThemeProvider>
                <Scripts />
            </body>
        </html>
    );
}
