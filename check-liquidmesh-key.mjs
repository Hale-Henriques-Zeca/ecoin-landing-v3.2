import dotenv from "dotenv";
import { createPrivateKey, createPublicKey } from "node:crypto";

dotenv.config({ path: ".env.local" });

const privateKey = process.env.LIQUIDMESH_PRIVATE_KEY_BASE64_SEED;
const publicKey = process.env.LIQUIDMESH_PUBLIC_KEY_BASE64;

if (!privateKey || !publicKey) {
  throw new Error("LiquidMesh key variables are missing.");
}

function decodeBase64(value) {
  const normalized = value
    .trim()
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  return Buffer.from(normalized, "base64");
}

const privateBytes = decodeBase64(privateKey);
const publicBytes = decodeBase64(publicKey);

console.log("Private key decoded bytes:", privateBytes.length);
console.log("Public key decoded bytes:", publicBytes.length);

if (privateBytes.length === 64 && publicBytes.length === 32) {
  const seed = privateBytes.subarray(0, 32);
  const embeddedPublicKey = privateBytes.subarray(32, 64);

  console.log(
    "Embedded public key matches:",
    embeddedPublicKey.equals(publicBytes)
  );

  const prefix = Buffer.from(
    "302e020100300506032b657004220420",
    "hex"
  );

  const keyObject = createPrivateKey({
    key: Buffer.concat([prefix, seed]),
    format: "der",
    type: "pkcs8",
  });

  const derivedPublicKey = createPublicKey(keyObject)
    .export({ format: "der", type: "spki" })
    .subarray(-32);

  console.log(
    "Derived public key matches:",
    derivedPublicKey.equals(publicBytes)
  );
} else {
  console.log("Unexpected key length. No key transformation performed.");
}