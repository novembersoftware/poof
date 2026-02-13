"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { AsteriskIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OrgDropdown } from "./org-dropdown";
import { UserDropdown } from "./user-dropdown";

type AppTopNavLink = {
    label: string;
    href: string;
};

export function AppTopNav({ links }: { links: AppTopNavLink[] }) {
    const pathname = usePathname();
    const data = useQuery(api.auth.getCurrentUserAndOrgs);
    const segments = pathname.split("/").filter(Boolean);

    const orgSlug = segments[0];
    const currentOrg = data?.orgs?.find((org) => org.slug === orgSlug);

    return (
        <header className="sticky top-0 z-20 backdrop-blur-sm">
            <div className="flex h-14 w-full items-center justify-between px-4 sm:px-8 md:px-12">
                <div className="flex min-w-0 items-center gap-6">
                    <Link href={`/${currentOrg?.slug}`} className="shrink-0">
                        <AsteriskIcon className="inline-block size-5" />
                    </Link>
                    <OrgDropdown currentSlug={currentOrg?.slug ?? ""} />

                    <nav className="flex items-center gap-1">
                        {links.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                (item.href !== "/" && pathname.startsWith(`${item.href}/`));
                            return (
                                <Button
                                    key={item.label}
                                    nativeButton={false}
                                    render={<Link href={item.href} />}
                                    variant={isActive ? "secondary" : "ghost"}
                                    size="sm"
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-2">
                    <UserDropdown />
                </div>
            </div>
        </header>
    );
}
