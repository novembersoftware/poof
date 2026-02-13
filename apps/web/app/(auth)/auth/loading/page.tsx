"use client";

import { Spinner } from "@/components/ui/spinner";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();
    const data = useQuery(api.auth.getCurrentUserAndOrgs);

    useEffect(() => {
        if (data?.orgs && data.orgs.length > 0) {
            router.push(`/${data.orgs[0].slug}`);
            // TODO: store last org id in local storage and use it here
        }
    }, [data, router]);

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Spinner className="size-4" />
        </div>
    );
}
