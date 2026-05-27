"use client";

export function Onboard() {
    // const user = useQuery(api.auth.getCurrentUser);

    // TODO: add a real onboarding thing here
    // return (
    //     <Card className="w-full">
    //         <CardHeader>
    //             <CardTitle>Hi, {user?.name?.split(" ")[0] ?? "there"}</CardTitle>
    //             <CardDescription>Let&apos;s get you started.</CardDescription>
    //         </CardHeader>
    //     </Card>
    // );
    return (
        <p className="text-muted-foreground text-sm">
            No projects found. Create one to get started.
        </p>
    );
}
