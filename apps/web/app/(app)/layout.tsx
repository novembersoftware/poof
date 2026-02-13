import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-12 shrink-0 items-center gap-2 px-6">
                    <SidebarTrigger className="-ml-2" />
                </header>
                <div className="flex flex-1 flex-col">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
