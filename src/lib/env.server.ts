import { z } from "zod";

const isProduction = process.env.NODE_ENV === "production";
const redisUrlSchema = isProduction
    ? z.string({ error: "REDIS_URL is required in production" }).url()
    : z.string().url().default("redis://localhost:6379");

const envSchema = z.object({
    REDIS_URL: redisUrlSchema,
    ENCRYPTION_KEY: z.string().min(1, "ENCRYPTION_KEY is required"),
    POOF_DEFAULT_TTL_SECONDS: z.coerce.number().int().positive().default(604_800)
});

export function getServerEnv() {
    return envSchema.parse(process.env);
}
