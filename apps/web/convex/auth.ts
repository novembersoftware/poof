import { AuthFunctions, createClient } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import type { GenericCtx } from "@convex-dev/better-auth/utils";
import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { components, internal } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import authConfig from "./auth.config";

// Better Auth Component
const authFunctions: AuthFunctions = internal.auth;

export const authComponent = createClient<DataModel>(components.betterAuth, {
    authFunctions,
    triggers: {
        user: {
            onCreate: async (ctx, doc) => {
                if (!ctx) return;
                console.log("doc", doc);
                await ctx.runMutation(internal.organization.createDefault, {
                    userId: doc._id!
                });
            }
        }
    }
});

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();

// Better Auth Options
export const createAuthOptions = (ctx: GenericCtx<DataModel>) => {
    return {
        appName: "poof.sh",
        baseURL: process.env.SITE_URL,
        secret: process.env.BETTER_AUTH_SECRET,
        database: authComponent.adapter(ctx),
        socialProviders: {
            github: {
                clientId: process.env.GITHUB_CLIENT_ID!,
                clientSecret: process.env.GITHUB_CLIENT_SECRET!
            }
        },
        plugins: [
            convex({ authConfig }),
            organization()
            // magicLink({
            //     sendMagicLink: async ({ email, token, url }, ctx) => {
            //         // send email to user
            //     }
            // })
        ]
    } satisfies BetterAuthOptions;
};

// For `@better-auth/cli`
export const options = createAuthOptions({} as GenericCtx<DataModel>);

// Better Auth Instance
export const createAuth = (ctx: GenericCtx<DataModel>) => {
    return betterAuth(createAuthOptions(ctx));
};

export const getCurrentUserAndOrgs = query({
    args: {},
    handler: async (ctx) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) return;

        const { auth, headers } = await authComponent.getAuth(createAuth, ctx);
        if (!auth) return;

        const orgs = await auth.api.listOrganizations({
            headers
        });
        return {
            user,
            orgs
        };
    }
});

export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) return;
        return user;
    }
});
