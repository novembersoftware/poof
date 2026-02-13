import { cn } from "@/lib/utils";

export function AppPageHeader({
    title,
    description,
    eyebrow,
    className
}: {
    title: string;
    description?: string;
    eyebrow?: string;
    className?: string;
}) {
    return (
        <div className={cn("w-full", className)}>
            {eyebrow ? (
                <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                    {eyebrow}
                </p>
            ) : null}
            <h1 className="mt-3 text-2xl font-medium">{title}</h1>
            {description ? (
                <p className="text-muted-foreground mt-2 text-sm">{description}</p>
            ) : null}
        </div>
    );
}
