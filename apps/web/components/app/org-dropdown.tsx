"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { Authenticated, AuthLoading } from "convex/react";
import { Check, ChevronDown, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function OrgDropdown({ currentSlug }: { currentSlug: string }) {
    const router = useRouter();
    const { data: organizations } = authClient.useListOrganizations();
    const currentOrg = organizations?.find((org) => org.slug === currentSlug);
    return (
        <>
            <Authenticated>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={<Button variant="ghost" size="sm" className="gap-1.5" />}
                    >
                        {currentOrg?.name ?? "Organization"}
                        <OrgBadge isTeam={currentOrg?.metadata?.isTeam ?? false} />
                        <ChevronDown className="size-3.5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-fit min-w-[300px]" align="start">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Organizations</DropdownMenuLabel>
                            {organizations?.map((org) => (
                                <DropdownMenuItem
                                    key={org.id}
                                    onClick={() => router.push(`/${org.slug}`)}
                                    className="w-full cursor-pointer justify-between"
                                >
                                    <div className="flex flex-row items-start gap-2">
                                        {org.name}
                                        <OrgBadge isTeam={org.metadata?.isTeam ?? false} />
                                    </div>
                                    {org.slug === currentSlug ? (
                                        <Check className="size-3.5" />
                                    ) : null}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <Button variant="outline" size="sm" className="w-full">
                                <PlusIcon className="size-3.5" />
                                New Organization
                            </Button>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Authenticated>
            <AuthLoading>
                <Skeleton className="h-4 w-24" />
            </AuthLoading>
        </>
    );
}

function OrgBadge({ isTeam }: { isTeam: boolean }) {
    return (
        <Badge
            className={`ml-1 border text-xs tracking-widest ${isTeam ? "border-green-500/20 bg-green-500/20 text-green-500" : "bg-muted/50 text-muted-foreground border-muted"} `}
        >
            {isTeam ? "Team" : "Hobby"}
        </Badge>
    );
}
