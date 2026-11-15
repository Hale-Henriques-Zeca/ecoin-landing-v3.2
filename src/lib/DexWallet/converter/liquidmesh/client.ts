
import "server-only";

import { createLiquidMeshJWT } from "./auth";
import { getLiquidMeshConfig } from "./config";

export async function liquidMeshRequest<T>(
  method: "GET" | "POST",
  path: string,
  body?: unknown
): Promise<T> {
  const config = getLiquidMeshConfig();

  // 1. Validar o caminho permitido da API.
  if (!path.startsWith("/v1/bsc/")) {
    throw new Error("Invalid LiquidMesh API path.");
  }

  if (path.includes("#")) {
    throw new Error("URL fragments are not allowed.");
  }

  // 2. Serializar o corpo uma única vez.
  // GET utiliza corpo vazio.
  const serializedBody =
    method === "POST"
      ? JSON.stringify(body ?? {})
      : "";

  // 3. Criar o JWT com exactamente os mesmos
  // parâmetros que serão utilizados no pedido HTTP.
  const jwt = await createLiquidMeshJWT(
    method,
    path,
    serializedBody
  );

  // 4. Diagnóstico temporário, apenas em desenvolvimento.
  // Não registar JWT, API Key ou chaves privadas.
  if (process.env.NODE_ENV === "development") {
    console.info("[LiquidMesh Request Diagnostic]", {
      method,
      path,
      bodyLength: serializedBody.length,
      observedAtMs: Date.now(),
      observedAtSeconds: Math.floor(Date.now() / 1000),
      jwtLifetime: "2 seconds",
      timestampUnitExpectedByAuth: "milliseconds",
    });
  }

  // 5. Enviar o pedido à LiquidMesh.
  const response = await fetch(
    `${config.baseUrl}${path}`,
    {
      method,
      headers: {
        "LM-API-KEY": config.apiKey,
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        ...(method === "POST"
          ? {
              "Content-Type": "application/json",
            }
          : {}),
      },
      ...(method === "POST"
        ? {
            body: serializedBody,
          }
        : {}),
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    }
  );

  // 6. Ler a resposta uma única vez.
  const responseText = await response.text();

  let data: unknown = null;

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      if (!response.ok) {
        throw new Error(
          `LiquidMesh API error: HTTP ${response.status}. ` +
          `Response: ${responseText.slice(0, 1000)}`
        );
      }

      throw new Error(
        `LiquidMesh returned invalid JSON. HTTP ${response.status}.`
      );
    }
  }

  // 7. Tratar erros devolvidos pela API.
  if (!response.ok) {
    const apiMessage =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : responseText.slice(0, 1000) ||
          `HTTP ${response.status}`;

    if (process.env.NODE_ENV === "development") {
      console.error("[LiquidMesh Response Error]", {
        status: response.status,
        statusText: response.statusText,
        message: apiMessage,
      });
    }

    throw new Error(
      `LiquidMesh API error: HTTP ${response.status}. ${apiMessage}`
    );
  }

  // 8. Devolver os dados.
  return data as T;
}
