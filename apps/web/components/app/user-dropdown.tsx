"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { Authenticated, AuthLoading, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { ThemeSwitcherClient } from "../theme-switcher";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

export function UserDropdown() {
    const user = useQuery(api.auth.getCurrentUser);
    const router = useRouter();
    return (
        <>
            <Authenticated>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Avatar>
                                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        }
                    />
                    <DropdownMenuContent className="w-fit min-w-40" align="start">
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>Documentation</DropdownMenuItem>
                            <DropdownMenuItem>GitHub</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup className="flex w-full justify-between px-1.5 py-1 text-sm">
                            <p>Theme</p>
                            <ThemeSwitcherClient />
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    authClient.signOut();
                                    router.replace("/sign-in");
                                }}
                            >
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Authenticated>
            <AuthLoading>
                <Skeleton className="size-8 rounded-full" />
            </AuthLoading>
        </>
    );
}
