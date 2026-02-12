import { AsteriskIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Navbar() {
    return (
        <nav className="fixed top-0 flex h-14 w-full items-center justify-between px-4 sm:px-8 md:px-20">
            <AsteriskIcon className="mr-1 inline-block size-6" />
            <Button nativeButton={false} size="sm" render={<Link href="/sign-in" />}>
                Sign In
            </Button>
        </nav>
    );
}
