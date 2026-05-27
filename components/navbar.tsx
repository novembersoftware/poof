import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { AsteriskIcon, GithubIcon, PlusIcon } from "lucide-react";

const BLUR_LAYERS = [
    { blur: "2px", stop: "100%" },
    { blur: "5px", stop: "82%" },
    { blur: "10px", stop: "58%" },
    { blur: "17px", stop: "34%" },
    { blur: "28px", stop: "16%" },
] as const;

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between px-4 sm:px-8">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {BLUR_LAYERS.map(({ blur, stop }) => (
                    <div
                        key={blur}
                        className="absolute inset-0"
                        style={{
                            backdropFilter: `blur(${blur})`,
                            WebkitBackdropFilter: `blur(${blur})`,
                            maskImage: `linear-gradient(to bottom, black 0%, transparent ${stop})`,
                            WebkitMaskImage: `linear-gradient(to bottom, black 0%, transparent ${stop})`,
                        }}
                    />
                ))}
                <div
                    className="absolute inset-0 bg-background/50"
                    style={{
                        maskImage:
                            "linear-gradient(to bottom, black 0%, transparent 100%)",
                        WebkitMaskImage:
                            "linear-gradient(to bottom, black 0%, transparent 100%)",
                    }}
                />
            </div>
            <div className="relative z-10 flex h-14 w-full items-center justify-between">
                <Link to="/" aria-label="poof.sh" className="flex items-center gap-2">
                    <AsteriskIcon className="size-5" />
                </Link>

                <div className="flex items-center gap-1.5">
                    <a
                        href="https://github.com/novembersoftware/poof"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "px-2")}
                    >
                        <GithubIcon className="size-3.5 sm:hidden" />
                        <span className="hidden sm:inline">GitHub</span>
                    </a>
                    <Link
                        to="/new"
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                        <PlusIcon className="size-3.5" />
                        New poof
                    </Link>
                </div>
            </div>
        </header>
    );
}
