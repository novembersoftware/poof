import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PricingCards } from "@/components/pricing-cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
    {
        title: "Client-side encryption",
        description:
            "Variables are encrypted before they leave your machine. Your secrets stay yours."
    },
    {
        title: "Organize by project",
        description: "Group variables by project and org. Control access per team, per project."
    },
    {
        title: "CLI-first workflow",
        description:
            "Pull and push env variables from your terminal. No browser required after setup."
    }
];

export default function Page() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            {/* Hero */}
            <section className="mx-auto w-full max-w-4xl px-8 pt-20 pb-16">
                <Badge
                    variant="outline"
                    className="mt-10 font-mono text-[10px] tracking-widest uppercase"
                >
                    Open Source
                </Badge>

                <h1 className="mt-5 max-w-2xl text-3xl leading-snug font-medium tracking-tight md:max-w-xl md:text-5xl">
                    Your .env files, encrypted and synced.
                </h1>

                <p className="text-muted-foreground mt-4 max-w-md text-base leading-relaxed">
                    Environment variable management for teams and solo developers. Client-side
                    encrypted and self-hostable.
                </p>

                <div className="mt-8 flex items-center gap-3">
                    <Button render={<Link href="/sign-up" />} size="lg">
                        Get Started
                        <ArrowRight className="size-3.5" />
                    </Button>
                    <Button
                        render={
                            <Link
                                href="https://github.com/novembersoftware/poof"
                                target="_blank"
                                rel="noopener noreferrer"
                            />
                        }
                        variant="outline"
                        size="lg"
                    >
                        View on GitHub
                    </Button>
                </div>
            </section>

            {/* Features */}
            <section className="mx-auto w-full max-w-4xl px-8 py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {features.map((feature, i) => (
                        <div key={i}>
                            <span className="text-muted-foreground font-mono text-xs tabular-nums">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="mt-3 text-sm font-medium">{feature.title}</h3>
                            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Terminal Demo */}
            <section className="mx-auto w-full max-w-4xl px-8 py-8">
                <Card>
                    <CardContent>
                        <pre className="font-mono text-xs leading-loose">
                            <span className="text-muted-foreground select-none">{"$ "}</span>
                            poof pull{"\n"}
                            <span className="text-muted-foreground">
                                {"  "}Pulled 12 variables to .env
                            </span>
                            {"\n\n"}
                            <span className="text-muted-foreground select-none">{"$ "}</span>
                            poof push{"\n"}
                            <span className="text-muted-foreground">
                                {"  "}Pushed 14 variables from .env
                            </span>
                        </pre>
                    </CardContent>
                </Card>
            </section>

            {/* Pricing */}
            <section className="mx-auto mb-12 w-full max-w-4xl px-8 py-8">
                <PricingCards />
            </section>

            <Footer />
        </div>
    );
}
