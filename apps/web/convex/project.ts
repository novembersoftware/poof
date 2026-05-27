import slugify from "@sindresorhus/slugify";
import { ConvexError, v } from "convex/values";
import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { authComponent, createAuth } from "./auth";
import { environmentSchema } from "./schema";

export const listByOrgSlug = query({
    args: {
        slug: v.string()
    },
    handler: async (ctx, { slug }) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) return;

        const { auth, headers } = await authComponent.getAuth(createAuth, ctx);
        if (!auth) return;

        // lists user's orgs
        const data = await auth.api.listOrganizations({
            headers
        });

        const org = data.find((o: { slug: string }) => o.slug === slug);
        if (!org) return [];

        const projects = await ctx.db
            .query("project")
            .filter((q) => q.eq(q.field("organizationId"), org.id))
            .collect();
        return projects;
    }
});

export const create = mutation({
    args: {
        name: v.string(),
        organizationId: v.string(),
        environments: v.array(environmentSchema),
        defaultEnvironmentId: v.string()
    },
    handler: async (ctx, { name, organizationId, environments, defaultEnvironmentId }) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) return;

        const { auth, headers } = await authComponent.getAuth(createAuth, ctx);
        if (!auth) return;

        const orgs = await auth.api.listOrganizations({
            headers
        });
        const org = orgs.find((o: { id: string }) => o.id === organizationId);
        if (!org) return;

        const slugifiedName = slugify(name);
        if (slugifiedName.length === 0) {
            throw new ConvexError("Project name must contain valid characters");
        }

        const isNameAvailable = await ctx.runQuery(api.project.checkNameAvailability, {
            name: slugifiedName,
            orgId: organizationId
        });
        if (!isNameAvailable) throw new ConvexError("Project name is already taken");

        const project = await ctx.db.insert("project", {
            name: slugifiedName,
            organizationId,
            environments,
            defaultEnvironmentId
        });
        return project;
    }
});

export const checkNameAvailability = query({
    args: {
        name: v.string(),
        orgId: v.string()
    },
    handler: async (ctx, { name, orgId }) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) return;

        const projects = await ctx.db
            .query("project")
            .withIndex("name", (q) => q.eq("name", name))
            .filter((q) => q.eq(q.field("organizationId"), orgId))
            .collect();
        return projects.length === 0;
    }
});
