import { OrgHomeContainer } from "@/components/org/home/container";
import { api } from "@/convex/_generated/api";
import { fetchAuthQuery } from "@/lib/auth-server";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const org = await fetchAuthQuery(api.organization.getBySlug, { slug: id });
    if (!org) notFound();

    return {
        title: `${org?.name}`
    };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <OrgHomeContainer slug={id} />;
}
