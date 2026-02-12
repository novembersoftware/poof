import { AuthButtons } from "@/components/auth-buttons";
import { MinimalFooter } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Link from "next/link";

export default function SignInPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Navbar />

            <section className="mx-auto flex w-full max-w-xl flex-1 items-center justify-start px-8 pt-20 pb-16">
                <div className="flex w-full flex-col space-y-6">
                    <div className="flex flex-col">
                        <p className="text-2xl font-medium">Who are you?</p>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Please sign in to continue to poof.sh
                        </p>
                    </div>
                    <AuthButtons callbackURL="/" />
                    <p className="text-muted-foreground/80 text-xs">
                        By signing in, you agree to our{" "}
                        <Link className="hover:underline" href="/terms">
                            terms of service
                        </Link>{" "}
                        and{" "}
                        <Link className="hover:underline" href="/privacy">
                            privacy policy
                        </Link>
                        .
                    </p>
                </div>
            </section>

            <MinimalFooter />
        </div>
    );
}
