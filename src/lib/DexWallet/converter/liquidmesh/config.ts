import "server-only";

export interface LiquidMeshConfig {
  baseUrl: string;
  apiKey: string;
  publicKey: string;
  privateKeySeed: string;
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function decodeBase64(value: string): Buffer {
  const normalized = value
    .trim()
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .replace(/\s/g, "");

  return Buffer.from(normalized, "base64");
}

function toBase64Url(value: Buffer): string {
  return value.toString("base64url");
}

export function getLiquidMeshConfig(): LiquidMeshConfig {
  const baseUrl = requiredEnv("LIQUIDMESH_BASE_URL");
  const parsedUrl = new URL(baseUrl);

  if (
    parsedUrl.protocol !== "https:" ||
    parsedUrl.hostname !== "api.liquidmesh.io"
  ) {
    throw new Error("Invalid LiquidMesh API URL.");
  }

  const apiKey = requiredEnv("LIQUIDMESH_API_KEY");

  const publicBytes = decodeBase64(
    requiredEnv("LIQUIDMESH_PUBLIC_KEY_BASE64")
  );

  const privateBytes = decodeBase64(
    requiredEnv("LIQUIDMESH_PRIVATE_KEY_BASE64_SEED")
  );

  if (publicBytes.length !== 32) {
    throw new Error("LiquidMesh public key must contain 32 bytes.");
  }

  // O portal pode fornecer uma secret key Ed25519 de 64 bytes:
  // primeiros 32 bytes = seed; últimos 32 bytes = public key.
  if (privateBytes.length !== 64) {
    throw new Error(
      "LiquidMesh private key must contain 64 bytes."
    );
  }

  const seed = privateBytes.subarray(0, 32);
  const embeddedPublicKey = privateBytes.subarray(32, 64);

  if (!embeddedPublicKey.equals(publicBytes)) {
    throw new Error(
      "The public key embedded in the private key does not match the configured public key."
    );
  }

  return {
    baseUrl: baseUrl.replace(/\/+$/, ""),
    apiKey,
    publicKey: toBase64Url(publicBytes),
    privateKeySeed: toBase64Url(seed),
  };
}