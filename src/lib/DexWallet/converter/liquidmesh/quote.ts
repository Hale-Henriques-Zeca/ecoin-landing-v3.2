
import "server-only";

import { liquidMeshRequest } from "./client";

import type {
  LiquidMeshQuoteParams,
  LiquidMeshQuoteResponse,
  LiquidMeshQuoteResult,
} from "./types";

function validateAddress(
  address: string,
  field: string
): void {
  if (
    typeof address !== "string" ||
    !/^0x[a-fA-F0-9]{40}$/.test(address)
  ) {
    throw new Error(`Invalid ${field} address.`);
  }
}

export async function getLiquidMeshQuote(
  params: LiquidMeshQuoteParams
): Promise<LiquidMeshQuoteResult> {
  // 1. Validar a rede
  if (params.chainId !== 56) {
    throw new Error(
      "Only BNB Smart Chain Mainnet is supported."
    );
  }

  // 2. Validar enderecos
  validateAddress(params.inputToken, "input token");
  validateAddress(params.outputToken, "output token");
  validateAddress(params.userAddress, "user");

  // 3. Impedir conversao do mesmo token
  if (
    params.inputToken.toLowerCase() ===
    params.outputToken.toLowerCase()
  ) {
    throw new Error(
      "Input and output tokens must be different."
    );
  }

  // 4. Validar quantidade
  if (
    typeof params.amount !== "string" ||
    !/^[0-9]+$/.test(params.amount) ||
    BigInt(params.amount) <= 0n
  ) {
    throw new Error(
      "Amount must be a positive integer in token base units."
    );
  }

  // 5. Construir parametros da cotacao
  const query = new URLSearchParams({
    amount: params.amount,
    chainId: String(params.chainId),
    inputToken: params.inputToken,
    outputToken: params.outputToken,
    userAddress: params.userAddress,
  });

  const path = `/v1/bsc/quote?${query.toString()}`;

  // 6. Consultar API LiquidMesh
  const rawQuote = await liquidMeshRequest<unknown>(
    "GET",
    path
  );

  // 7. Diagnostico temporario
  // Activar apenas em ambiente de desenvolvimento.
  if (process.env.NODE_ENV === "development") {
    console.log(
      "[LiquidMesh Raw Quote]",
      JSON.stringify(rawQuote, null, 2)
    );
  }

  // 8. Validar estrutura da resposta
  if (
    !rawQuote ||
    typeof rawQuote !== "object" ||
    Array.isArray(rawQuote)
  ) {
    throw new Error(
      "LiquidMesh returned an invalid or empty quote."
    );
  }

  const quote =
    rawQuote as LiquidMeshQuoteResponse;

  // 9. Verificar erros da API
  if (quote.success === false) {
    throw new Error(
      quote.message ||
      "LiquidMesh could not generate a quote."
    );
  }

  if (
    typeof quote.code === "number" &&
    quote.code !== 0
  ) {
    const apiMessage =
      typeof quote.message === "string"
        ? quote.message
        : typeof quote.msg === "string"
          ? quote.msg
          : "Unknown LiquidMesh error.";

    throw new Error(
      `LiquidMesh API error ${quote.code}: ${apiMessage}`
    );
  }

  // 10. Verificar se existem dados de cotacao
  // Nao rejeitamos ainda respostas vazias,
  // pois estamos a investigar a estrutura real.
  if (
    process.env.NODE_ENV === "development" &&
    (!quote.data ||
      (typeof quote.data === "object" &&
        Object.keys(quote.data).length === 0))
  ) {
    console.warn(
      "[LiquidMesh Quote] API returned success, " +
      "but quote data appears empty."
    );
  }

  // 11. Devolver resultado
  return {
    success: true,
    provider: "LIQUIDMESH",
    chainId: 56,
    inputToken: params.inputToken,
    outputToken: params.outputToken,
    inputAmount: params.amount,
    userAddress: params.userAddress,
    quote,
  };
}
