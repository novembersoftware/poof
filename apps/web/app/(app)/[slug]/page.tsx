import { AppPageHeader } from "@/components/app/page-header";
import { NewProjectButton, ProjectGrid } from "@/components/app/project-grid";
import { AppTopNav } from "@/components/app/top-nav";
import { api } from "@/convex/_generated/api";
import { fetchAuthQuery } from "@/lib/auth-server";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const org = await fetchAuthQuery(api.organization.getBySlug, { slug: slug });
    if (!org) notFound();

    return {
        title: `Projects | ${org?.name}`
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <div className="flex min-h-screen flex-col">
            <AppTopNav
                links={[
                    { label: "Projects", href: `/${slug}` },
                    { label: "Members", href: `/${slug}/members` },
                    { label: "Settings", href: `/${slug}/settings` }
                ]}
            />
            <main className="flex-1">
                <section className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-8 pt-10 pb-16">
                    <div className="flex flex-row items-center justify-between">
                        <AppPageHeader title="Projects" />
                        <NewProjectButton />
                    </div>
                    <ProjectGrid />
                </section>
            </main>
        </div>
    );
}
