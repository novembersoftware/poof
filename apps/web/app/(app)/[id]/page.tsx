export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return {
        title: `Poof - ${id}`,
        description: `Poof - ${id}`
    };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("params", id);
    return <div>Page</div>;
}
