"use client";

import { api } from "@/convex/_generated/api";
import type { projectSchema } from "@/convex/schema";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { Authenticated, AuthLoading, useMutation, useQuery } from "convex/react";
import type { Infer } from "convex/values";
import { CheckIcon, LayersIcon, PlusIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sileo } from "sileo";
import z from "zod";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";
import { Onboard } from "./onboard";

export function ProjectGrid() {
    const org = authClient.useActiveOrganization();
    const projects = useQuery(api.project.listByOrgSlug, { slug: org?.data?.slug ?? "" });
    // console.log(projects);
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AuthLoading>
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </AuthLoading>
            <Authenticated>
                {projects && projects.length > 0 ? (
                    projects.map((project) => <ProjectCard key={project._id} project={project} />)
                ) : (
                    <div className="col-span-full flex flex-col items-start justify-center">
                        <Onboard />
                    </div>
                )}
            </Authenticated>
        </div>
    );
}

function ProjectCard({ project }: { project: Infer<typeof projectSchema> }) {
    const org = authClient.useActiveOrganization();
    return (
        <Link href={`/${org.data?.slug}/${project.name}`}>
            <Card className="group hover:bg-card/80 flex cursor-pointer flex-col transition-all">
                <CardContent className="flex flex-col gap-2">
                    <p className="text-sm leading-none font-medium">{project.name}</p>
                    <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                        <LayersIcon className="size-3" />
                        <span>{project.environments.length} environments</span>
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}

export function NewProjectButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setIsModalOpen(true)} className="cursor-pointer">
                <PlusIcon className="size-4" />
                New Project
            </Button>
            <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

const newProjectSchema = z.object({
    name: z.string().min(1, "Project name is required").max(100, "Project name is too long"),
    environments: z
        .array(z.object({ name: z.string().min(1, "Environment name is required") }))
        .min(1, "At least one environment is required")
});

function useDebouncedValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

function NewProjectModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const router = useRouter();
    const org = authClient.useActiveOrganization();
    const createProject = useMutation(api.project.create);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const debouncedName = useDebouncedValue(nameInput, 300);

    const isNameAvailable = useQuery(
        api.project.checkNameAvailability,
        org?.data?.id && debouncedName.length > 0
            ? { name: debouncedName, orgId: org.data.id }
            : "skip"
    );

    const showNameStatus = nameInput.length > 0 && nameInput === debouncedName;
    const canSubmit = nameInput.length > 0 && isNameAvailable === true;

    useEffect(() => {
        if (!isOpen) {
            setNameInput("");
        }
    }, [isOpen]);

    const form = useForm({
        defaultValues: {
            name: "",
            environments: [{ name: "production" }, { name: "staging" }, { name: "development" }]
        },
        validators: {
            onSubmit: newProjectSchema
        },
        onSubmit: async ({ value }) => {
            if (!org?.data?.id) {
                sileo.error({
                    title: "No organization selected"
                });
                return;
            }

            if (!canSubmit) {
                sileo.error({
                    title: "Project name is not available"
                });
                return;
            }

            setIsSubmitting(true);
            try {
                await createProject({
                    name: value.name,
                    organizationId: org.data.id,
                    environments: value.environments,
                    defaultEnvironmentId: value.environments[0].name
                });
                sileo.success({
                    title: "Project created successfully"
                });
                form.reset();
                setNameInput("");
                router.push(`/${org.data.slug}/${value.name}`);
                onClose();
            } catch (error) {
                sileo.error({
                    title: "Failed to create project",
                    description: error instanceof Error ? error.message : "Unknown error"
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Project</DialogTitle>
                </DialogHeader>
                <form
                    id="new-project-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            name="name"
                            // eslint-disable-next-line react/no-children-prop
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Project Name</FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                        .toLowerCase()
                                                        .replace(/ /g, "-");
                                                    field.handleChange(value);
                                                    setNameInput(value);
                                                }}
                                                aria-invalid={isInvalid}
                                                placeholder="my-awesome-project"
                                                autoComplete="off"
                                                className="pr-8 font-mono"
                                            />
                                            {showNameStatus && (
                                                <span className="absolute top-1/2 right-2 -translate-y-1/2">
                                                    {isNameAvailable === true ? (
                                                        <CheckIcon className="size-4 text-green-500" />
                                                    ) : isNameAvailable === false ? (
                                                        <XIcon className="size-4 text-red-500" />
                                                    ) : (
                                                        <Spinner className="size-4" />
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                        {showNameStatus && isNameAvailable === false && (
                                            <p className="text-xs text-red-500">
                                                This name is already taken
                                            </p>
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="environments"
                            mode="array"
                            // eslint-disable-next-line react/no-children-prop
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel>Environments</FieldLabel>
                                        <div className="space-y-2">
                                            {field.state.value.map((_, index) => (
                                                <form.Field
                                                    key={index}
                                                    name={`environments[${index}].name`}
                                                    // eslint-disable-next-line react/no-children-prop
                                                    children={(subField) => {
                                                        const isSubFieldInvalid =
                                                            subField.state.meta.isTouched &&
                                                            !subField.state.meta.isValid;
                                                        return (
                                                            <div className="flex gap-2">
                                                                <Input
                                                                    id={`env-${index}`}
                                                                    name={subField.name}
                                                                    value={subField.state.value}
                                                                    onBlur={subField.handleBlur}
                                                                    onChange={(e) =>
                                                                        subField.handleChange(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    aria-invalid={isSubFieldInvalid}
                                                                    placeholder="Environment name"
                                                                    className="flex-1"
                                                                />
                                                                {field.state.value.length > 1 && (
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="icon"
                                                                        onClick={() =>
                                                                            field.removeValue(index)
                                                                        }
                                                                    >
                                                                        <PlusIcon className="size-4 rotate-45" />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        );
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => field.pushValue({ name: "" })}
                                        >
                                            <PlusIcon className="mr-1 size-4" />
                                            Add Environment
                                        </Button>
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="new-project-form"
                        disabled={isSubmitting || !canSubmit}
                    >
                        {isSubmitting ? <Spinner className="mr-1" /> : null}
                        Create Project
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
