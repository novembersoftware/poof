import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const environmentSchema = v.object({
    name: v.string()
});

export const projectSchema = v.object({
    name: v.string(),
    organizationId: v.string(),
    environments: v.array(environmentSchema),
    defaultEnvironmentId: v.string()
});

export const secretSchema = v.object({
    projectId: v.string(),
    environmentId: v.string(),
    key: v.string(),
    encryptedValue: v.string()
});

export const auditLogSchema = v.object({
    projectId: v.string(),
    userId: v.string(),
    event: v.string()
});

export const tables = {
    project: defineTable(projectSchema)
        .index("organizationId", ["organizationId"])
        .index("name", ["name"]),
    secret: defineTable(secretSchema)
        .index("projectId", ["projectId"])
        .index("environmentId", ["environmentId"])
        .index("key", ["key"]),
    auditLog: defineTable(auditLogSchema)
        .index("projectId", ["projectId"])
        .index("userId", ["userId"])
        .index("event", ["event"])
};

const schema = defineSchema({
    ...tables
});

export default schema;
