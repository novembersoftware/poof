import { ConvexError, v } from "convex/values";
import uniqueSlug from "unique-slug";
import { internalMutation, mutation, query } from "./_generated/server";
import { authComponent, createAuth } from "./auth";

export const create = mutation({
    args: {
        name: v.string(),
        isTeam: v.boolean(),
        slug: v.string()
    },
    handler: async (ctx, args) => {
        const owner = await ctx.auth.getUserIdentity();
        if (!owner) return;

        if (args.name.length < 3) throw new ConvexError("Name must be at least 3 characters long");

        // TODO: check if the user has an active subscription if isTeam = true
        // org is created after payment is processed
        // (https://www.better-auth.com/docs/plugins/organization#restrict-who-can-create-an-organization)

        const { auth, headers } = await authComponent.getAuth(createAuth, ctx);
        if (!auth) return;

        let slug = args.slug;
        const isSlugAvailable = await auth.api.checkOrganizationSlug({
            headers,
            body: {
                slug
            }
        });
        if (!isSlugAvailable.status) {
            slug = `${slug}-${uniqueSlug()}`;
        }

        await auth.api.createOrganization({
            headers,
            body: {
                name: args.name,
                slug,
                metadata: {
                    isTeam: args.isTeam
                },
                keepCurrentActiveOrganization: true // users can be in multiple orgs
            }
        });
    }
});

// used in the user onCreate trigger
export const createDefault = internalMutation({
    args: {
        userId: v.string()
    },
    handler: async (ctx, { userId }) => {
        const slug = `personal-${uniqueSlug()}`;
        const { auth } = await authComponent.getAuth(createAuth, ctx);
        if (!auth) return;

        await auth.api.createOrganization({
            body: {
                userId,
                name: "Personal",
                slug,
                metadata: {
                    isTeam: false
                },
                keepCurrentActiveOrganization: true
            }
        });
    }
});

export const checkSlug = query({
    args: {
        slug: v.string()
    },
    handler: async (ctx, { slug }) => {
        const { auth, headers } = await authComponent.getAuth(createAuth, ctx);
        if (!auth) return;

        const res = await auth.api.checkOrganizationSlug({
            headers,
            body: {
                slug
            }
        });
        return res.status;
    }
});

// get an org for a signed in user
export const getUserOrgBySlug = query({
    args: {
        slug: v.string()
    },
    handler: async (ctx, { slug }) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) return;
        //
    }
});
