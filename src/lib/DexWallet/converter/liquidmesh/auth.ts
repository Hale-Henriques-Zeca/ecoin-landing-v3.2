import "server-only";

import { createHash } from "node:crypto";
import { importJWK, SignJWT } from "jose";

import { getLiquidMeshConfig } from "./config";

export async function createLiquidMeshJWT(
  method: string,
  path: string,
  body = ""
): Promise<string> {
  const config = getLiquidMeshConfig();

  const timestamp = Date.now();
  const httpMethod = method.toUpperCase();

  // A assinatura usa exactamente o método, path e body
  // que serão enviados no pedido HTTP.
  const preimage = `${timestamp}${httpMethod}${path}${body}`;

  const message = createHash("sha256")
    .update(preimage, "utf8")
    .digest("hex");

  const privateKey = await importJWK(
    {
      kty: "OKP",
      crv: "Ed25519",
      d: config.privateKeySeed,
      x: config.publicKey,
    },
    "EdDSA"
  );

  return new SignJWT({
    tim: timestamp,
    message,
    iss: config.apiKey,
  })
    .setProtectedHeader({
      typ: "JWT",
      alg: "EdDSA",
    })
    .setIssuedAt()
    .setExpirationTime("2s")
    .sign(privateKey);
}