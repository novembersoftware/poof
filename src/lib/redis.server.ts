import { createClient, type RedisClientType } from "redis";
import { getServerEnv } from "./env.server";

let redisClient: RedisClientType | undefined;

export async function getRedisClient() {
    if (!redisClient) {
        const env = getServerEnv();
        redisClient = createClient({ url: env.REDIS_URL });
        redisClient.on("error", (error) => {
            console.error("Redis error", error);
        });
    }

    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    return redisClient;
}
