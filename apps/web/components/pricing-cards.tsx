import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const pricing = [
    {
        title: "Solo",
        price: "Free Forever",
        features: ["Feature", "Feature", "Feature", "Feature", "Feature", "Feature", "Feature"],
        button: {
            variant: "outline",
            label: "Start for Free",
            href: "/sign-up"
        }
    },
    {
        title: "Team",
        price: "$3/user/month",
        features: ["Feature", "Feature", "Feature", "Feature", "Feature", "Feature", "Feature"],
        button: {
            variant: "default",
            label: "Get Started",
            href: "/sign-up"
        }
    }
];

export function PricingCards() {
    return (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {pricing.map((pricing, i) => (
                <Card key={i} className="w-full">
                    <CardContent>
                        <h2 className="text-lg font-medium">{pricing.title}</h2>
                        <p className="text-muted-foreground text-sm">{pricing.price}</p>
                        <ul className="mt-4 list-inside list-disc">
                            {pricing.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                            ))}
                        </ul>
                        <Button
                            nativeButton={false}
                            variant={pricing.button.variant as "outline" | "default"}
                            className="mt-4 w-full"
                            render={<Link href={pricing.button.href} />}
                        >
                            {pricing.button.label}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
