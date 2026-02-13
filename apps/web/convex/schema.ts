import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const environmentSchema = v.object({
    id: v.string(),
    name: v.string()
});

export default defineSchema({
    project: defineTable({
        name: v.string(),
        organizationId: v.string(),
        environments: v.array(environmentSchema),
        defaultEnvironmentId: v.string(),
        encryptedEncryptionKey: v.string(),
        createdAt: v.number(),
        updatedAt: v.number()
    })
        .index("organizationId", ["organizationId"])
        .index("name", ["name"]),

    secret: defineTable({
        projectId: v.string(),
        environmentId: v.string(),
        key: v.string(),
        encryptedValue: v.string(),
        createdAt: v.number(),
        updatedAt: v.number()
    })
        .index("projectId", ["projectId"])
        .index("environmentId", ["environmentId"])
        .index("key", ["key"]),

    auditLog: defineTable({
        projectId: v.string(),
        userId: v.string(),
        event: v.string()
    })
});
