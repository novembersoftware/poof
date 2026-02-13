"use client";

import { authClient } from "@/lib/auth-client";
import { Authenticated, Unauthenticated } from "convex/react";
import { AsteriskIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Navbar() {
    const { data: organizations } = authClient.useListOrganizations();
    return (
        <nav className="fixed top-0 flex h-14 w-full items-center justify-between px-4 sm:px-8 md:px-20">
            <Link href="/">
                <AsteriskIcon className="mr-1 inline-block size-6" />
            </Link>
            <Authenticated>
                <Button
                    nativeButton={false}
                    size="sm"
                    render={<Link href={`/${organizations?.[0]?.slug}`} />}
                >
                    Dashboard
                </Button>
            </Authenticated>
            <Unauthenticated>
                <Button nativeButton={false} size="sm" render={<Link href="/sign-in" />}>
                    Sign In
                </Button>
            </Unauthenticated>
        </nav>
    );
}
