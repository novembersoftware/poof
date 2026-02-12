import { cn } from "@/lib/utils";
import Link from "next/link";

const ASCII_LOGO = String.raw`
                                .o88o.            oooo        
                                888                888        
oo.ooooo.   .ooooo.   .ooooo.  o888oo     .oooo.o  888 .oo.   
 888'  88b d88'  88b d88'  88b  888      d88(  "8  888P"Y88b  
 888   888 888   888 888   888  888      "Y88b.    888   888  
 888   888 888   888 888   888  888      o.  )88b  888   888  
 888bod8P'  Y8bod8P'  Y8bod8P' o888o  8  8""888P' o888o o888o 
 888                                                            
o888o                         
`;

const footerLinks = [
    {
        heading: "Product",
        links: [
            { label: "Features", href: "/#features" },
            { label: "Pricing", href: "/pricing" },
            { label: "CLI", href: "/docs/cli" }
        ]
    },
    {
        heading: "Resources",
        links: [
            { label: "Documentation", href: "/docs" },
            { label: "GitHub", href: "https://github.com/novembersoftware/poof", external: true },
            { label: "Changelog", href: "/changelog" }
        ]
    },
    {
        heading: "Legal",
        links: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" }
        ]
    }
];

export function AsciiLogo({ className }: { className?: string }) {
    return (
        <pre
            aria-label="Poof Logo"
            role="img"
            className={cn(
                "text-primary font-mono text-[6px] leading-tight font-bold sm:text-[8px]",
                className
            )}
        >
            {ASCII_LOGO}
        </pre>
    );
}

export function Footer() {
    return (
        <footer className="mt-12 flex w-full flex-col gap-12 px-8 pt-8 pb-8 md:flex-row md:items-start md:justify-between md:px-12 md:pt-16 lg:px-16">
            <div className="flex shrink-0 flex-col gap-6">
                <div className="overflow-x-auto">
                    <AsciiLogo />
                </div>
                <div className="text-muted-foreground flex flex-col gap-1 text-sm">
                    <Link
                        href="https://november.software"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:underline"
                    >
                        November
                    </Link>
                    <span className="text-xs">
                        &copy; {new Date().getFullYear()} All rights reserved.
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-12">
                <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
                    {footerLinks.map((group) => (
                        <div key={group.heading}>
                            <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                                {group.heading}
                            </span>
                            <ul className="mt-4 space-y-2.5">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        {"external" in link && link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-foreground/60 hover:text-foreground text-sm transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-foreground/60 hover:text-foreground text-sm transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export function MinimalFooter() {
    return (
        <footer className="text-muted-foreground mt-12 flex w-full flex-wrap items-center justify-between gap-x-4 px-8 py-4 text-xs">
            <div className="flex items-center gap-x-2">
                <span>
                    &copy; {new Date().getFullYear()}{" "}
                    <Link
                        href="https://november.software"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        November LLC
                    </Link>
                </span>
            </div>
            <div className="flex items-center gap-x-2">
                <Link href="/terms" className="hover:underline">
                    Terms
                </Link>
                <Link href="/privacy" className="hover:underline">
                    Privacy
                </Link>
            </div>
        </footer>
    );
}
