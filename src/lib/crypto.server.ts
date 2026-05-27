import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const NONCE_BYTES = 12;
const AUTH_TAG_BYTES = 16;

function deriveKey(secret: string) {
    return createHash("sha256").update(secret).digest();
}

export function encryptText(plaintext: string, secret: string) {
    if (!secret) {
        throw new Error("Encryption key is required");
    }

    const nonce = randomBytes(NONCE_BYTES);
    const cipher = createCipheriv(ALGORITHM, deriveKey(secret), nonce, {
        authTagLength: AUTH_TAG_BYTES
    });
    const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
    const authTag = cipher.getAuthTag();

    return Buffer.concat([nonce, authTag, ciphertext]).toString("base64");
}

export function decryptText(payload: string, secret: string) {
    if (!secret) {
        throw new Error("Encryption key is required");
    }

    const data = Buffer.from(payload, "base64");
    if (data.length <= NONCE_BYTES + AUTH_TAG_BYTES) {
        throw new Error("Ciphertext is too short");
    }

    const nonce = data.subarray(0, NONCE_BYTES);
    const authTag = data.subarray(NONCE_BYTES, NONCE_BYTES + AUTH_TAG_BYTES);
    const ciphertext = data.subarray(NONCE_BYTES + AUTH_TAG_BYTES);
    const decipher = createDecipheriv(ALGORITHM, deriveKey(secret), nonce, {
        authTagLength: AUTH_TAG_BYTES
    });

    decipher.setAuthTag(authTag);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
}
