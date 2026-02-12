import { MinimalFooter } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function SignInPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Navbar />

            {/* Hero */}
            <section className="mx-auto flex w-full max-w-xl flex-1 items-center justify-start px-8 pt-20 pb-16"></section>

            <MinimalFooter />
        </div>
    );
}
