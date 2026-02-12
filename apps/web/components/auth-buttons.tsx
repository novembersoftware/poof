"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { Button } from "./ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";

export function AuthButtons({ callbackURL }: { callbackURL: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showMagicLinkForm, setShowMagicLinkForm] = useState(false);

    const { theme } = useTheme();

    const handleGitHubSignIn = async () => {
        try {
            setIsLoading(true);
            const data = await authClient.signIn.social({
                provider: "github",
                callbackURL: callbackURL
            });

            if (data.error) {
                throw new Error(data.error.message);
            }
        } catch (error: unknown) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : "Sign in failed");
        }
    };

    return (
        <div className="flex w-full flex-col items-center justify-center gap-2">
            {showMagicLinkForm ? (
                <MagicLinkForm onBack={() => setShowMagicLinkForm(false)} />
            ) : (
                <>
                    <Button
                        size="lg"
                        disabled={isLoading}
                        onClick={handleGitHubSignIn}
                        className="w-full cursor-pointer"
                    >
                        {isLoading ? (
                            <Spinner className="mr-1" />
                        ) : (
                            <Image
                                src={
                                    theme === "light"
                                        ? "/icons/github-white-logo.svg"
                                        : "/icons/github-black-logo.svg"
                                }
                                alt="GitHub"
                                width={20}
                                height={20}
                                className="mr-1"
                            />
                        )}
                        Continue with GitHub{" "}
                        {/* {authClient.isLastUsedLoginMethod("github") ? <LastUsedBadge /> : ""} */}
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={() => setShowMagicLinkForm(true)}
                        className="w-full cursor-pointer"
                        variant="outline"
                        size="lg"
                    >
                        Continue with Email
                    </Button>
                </>
            )}
        </div>
    );
}

const magicLinkSchema = z.object({
    email: z.email({ message: "Invalid email address" })
});

function MagicLinkForm({ onBack }: { onBack: () => void }) {
    const form = useForm({
        defaultValues: {
            email: ""
        },
        validators: {
            onSubmit: magicLinkSchema
        },
        onSubmit: async ({ value }) => {
            toast.error("Not implemented yet", {
                description: "Use GitHub to sign in for now."
            });
        }
    });

    return (
        <form
            id="magic-link-form"
            className="w-full space-y-4"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <FieldGroup>
                <form.Field
                    name="email"
                    // eslint-disable-next-line react/no-children-prop
                    children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Enter your email</FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    aria-invalid={isInvalid}
                                    type="email"
                                    placeholder="you@email.com"
                                    autoComplete="off"
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        );
                    }}
                />
            </FieldGroup>
            <div className="flex flex-col gap-2">
                <Button className="w-full cursor-pointer" type="submit">
                    Send magic link
                </Button>
                <Button className="w-full cursor-pointer" variant="ghost" onClick={onBack}>
                    Back
                </Button>
            </div>
        </form>
    );
}
