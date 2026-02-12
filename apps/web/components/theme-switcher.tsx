"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export function ThemeSwitcherClient() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(t);
    }, []);

    const displayValue = theme === "system" ? (resolvedTheme ?? "light") : (theme ?? "light");

    if (!mounted) {
        return <div className="border-input h-8 w-16 rounded-lg border bg-transparent" />;
    }

    return (
        <ToggleGroup
            variant="outline"
            size="sm"
            rounded="full"
            value={[displayValue]}
            onValueChange={(v) => v?.[0] && setTheme(v[0])}
        >
            <ToggleGroupItem value="light" aria-label="Light mode" className="h-fit p-1">
                <SunIcon className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" aria-label="Dark mode" className="h-fit p-1">
                <MoonIcon className="size-3" />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
