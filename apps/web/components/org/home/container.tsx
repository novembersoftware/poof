"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export function OrgHomeContainer({ slug }: { slug: string }) {
    const org = useQuery(api.organization.getBySlug, { slug });

    if (org === undefined) {
        return (
            <div className="w-full max-w-4xl px-6 pt-8">
                <Skeleton className="h-6 w-40" />
                <div className="mt-3 space-y-2">
                    <Skeleton className="h-3.5 w-72" />
                    <Skeleton className="h-3.5 w-56" />
                </div>
            </div>
        );
    }

    if (org === null) {
        return null;
    }

    const metadata = org.metadata ? JSON.parse(org.metadata) : null;
    const isTeam = metadata?.isTeam ?? false;

    return (
        <div className="w-full max-w-4xl px-6 pt-8 pb-16">
            <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                {isTeam ? "Team workspace" : "Personal workspace"}
            </span>
            <h1 className="mt-3 text-2xl font-medium tracking-tight">Overview</h1>
            <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                Manage your environment variables, invite teammates, and configure projects from
                here.
            </p>
        </div>
    );
}
