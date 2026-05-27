import { z } from "zod";

const envSchema = z.object({
    REDIS_URL: z.string().url().default("redis://localhost:6379"),
    ENCRYPTION_KEY: z.string().min(1, "ENCRYPTION_KEY is required"),
    POOF_DEFAULT_TTL_SECONDS: z.coerce.number().int().positive().default(604_800)
});

export function getServerEnv() {
    return envSchema.parse(process.env);
}
