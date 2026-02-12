import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const create = query({
    args: {
        name: v.string(),
        slug: v.string(),
        isTeam: v.boolean()
    },
    handler: async (ctx, args) => {
        const owner = await ctx.auth.getUserIdentity();
        if (!owner) throw new ConvexError("Unauthorized");

        // const org = await ctx.
    }
});
