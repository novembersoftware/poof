"use client";

import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();
    const { data: organizations } = authClient.useListOrganizations();
    const { data: activeOrg } = authClient.useActiveOrganization();

    useEffect(() => {
        if (organizations && organizations.length > 0) {
            const targetOrg = activeOrg ?? organizations[0];
            router.push(`/${targetOrg.slug}`);
        }
    }, [organizations, activeOrg, router]);

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Spinner className="size-4" />
        </div>
    );
}
