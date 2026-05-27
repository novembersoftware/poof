import { describe, expect, it } from "vitest";
import { decryptText, encryptText } from "../lib/crypto.server";
import { generatePoofId, readOnce } from "../lib/poof.server";
import { createPoofInputSchema, poofIdSchema } from "../lib/poof.schema";

describe("poof crypto", () => {
    it("round-trips encrypted text", () => {
        const encrypted = encryptText("secret\nvalue", "test-key");

        expect(encrypted).not.toContain("secret");
        expect(decryptText(encrypted, "test-key")).toBe("secret\nvalue");
    });

    it("rejects missing encryption keys", () => {
        expect(() => encryptText("secret", "")).toThrow("Encryption key is required");
        expect(() => decryptText("secret", "")).toThrow("Encryption key is required");
    });
});

describe("poof validation", () => {
    it("accepts generated ids", () => {
        const id = generatePoofId();

        expect(id).toHaveLength(12);
        expect(poofIdSchema.parse(id)).toBe(id);
    });

    it("rejects empty and oversized content", () => {
        expect(createPoofInputSchema.safeParse({ text: "   " }).success).toBe(false);
        expect(createPoofInputSchema.safeParse({ text: "a".repeat(10_001) }).success).toBe(false);
    });
});

describe("readOnce", () => {
    it("uses getDel when available", async () => {
        let value: string | null = "encrypted";
        const redis = {
            set: async () => undefined,
            getDel: async () => {
                const current = value;
                value = null;
                return current;
            },
            eval: async () => {
                throw new Error("eval should not be called");
            }
        };

        expect(await readOnce(redis, "poof:text:id")).toBe("encrypted");
        expect(await readOnce(redis, "poof:text:id")).toBeNull();
    });

    it("falls back to an atomic lua read-delete path", async () => {
        let value: string | null = "encrypted";
        const redis = {
            set: async () => undefined,
            eval: async () => {
                const current = value;
                value = null;
                return current;
            }
        };

        expect(await readOnce(redis, "poof:text:id")).toBe("encrypted");
        expect(await readOnce(redis, "poof:text:id")).toBeNull();
    });
});
