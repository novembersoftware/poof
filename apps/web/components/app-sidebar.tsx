"use client";

import { ThemeSwitcherClient } from "@/components/theme-switcher";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
} from "@/components/ui/sidebar";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { AsteriskIcon, ChevronsUpDown, HomeIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const data = useQuery(api.auth.getCurrentUserAndOrgs);

    const orgSlug = pathname?.split("/")[1] ?? "";
    const currentOrg = data?.orgs?.find((o) => o.slug === orgSlug);

    return (
        <Sidebar collapsible="icon" className="bg-background border-r-0">
            <SidebarHeader className="p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <SidebarMenuButton
                                        size="lg"
                                        className="p-0 hover:bg-transparent active:bg-transparent"
                                    />
                                }
                            >
                                <div className="bg-foreground text-background flex size-7 shrink-0 items-center justify-center rounded-md">
                                    <AsteriskIcon className="size-4" />
                                </div>
                                <div className="flex min-w-0 flex-col">
                                    <span className="truncate text-sm font-medium">
                                        {currentOrg?.name ?? "poof.sh"}
                                    </span>
                                    <span className="text-muted-foreground truncate font-mono text-[10px] tracking-wider">
                                        {currentOrg?.slug ?? "workspace"}
                                    </span>
                                </div>
                                <ChevronsUpDown className="text-muted-foreground ml-auto size-3.5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--anchor-width)"
                                align="start"
                                side="bottom"
                                sideOffset={8}
                            >
                                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                                {data?.orgs?.map((org) => (
                                    <DropdownMenuItem
                                        key={org.id}
                                        onSelect={() => router.push(`/${org.slug}`)}
                                    >
                                        <div className="flex min-w-0 flex-col">
                                            <span className="truncate text-sm">{org.name}</span>
                                            <span className="text-muted-foreground truncate font-mono text-[10px]">
                                                {org.slug}
                                            </span>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent className="p-2">
                <SidebarGroup className="p-0">
                    <SidebarGroupLabel className="text-muted-foreground/60 font-mono text-[10px] tracking-widest uppercase">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    render={<Link href={orgSlug ? `/${orgSlug}` : "/"} />}
                                    isActive={pathname === `/${orgSlug}`}
                                    tooltip="Home"
                                >
                                    <HomeIcon />
                                    <span>Home</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4">
                <SidebarSeparator className="mx-0 mb-2" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <SidebarMenuButton
                                        size="lg"
                                        className="p-0 hover:bg-transparent active:bg-transparent"
                                    />
                                }
                            >
                                <div className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-full">
                                    <span className="text-muted-foreground text-xs font-medium">
                                        {(data?.user?.name ?? data?.user?.email ?? "?")
                                            .charAt(0)
                                            .toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex min-w-0 flex-col">
                                    <span className="truncate text-sm font-medium">
                                        {data?.user?.name ?? "Account"}
                                    </span>
                                    <span className="text-muted-foreground truncate text-[11px]">
                                        {data?.user?.email ?? ""}
                                    </span>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" side="top" sideOffset={8}>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm font-medium">
                                            {data?.user?.name ?? "Account"}
                                        </span>
                                        <span className="text-muted-foreground text-xs">
                                            {data?.user?.email ?? ""}
                                        </span>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    variant="destructive"
                                    onSelect={async () => {
                                        await authClient.signOut();
                                        window.location.href = "/";
                                    }}
                                >
                                    <LogOut />
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
                        <div className="flex items-center pt-1">
                            <ThemeSwitcherClient />
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
