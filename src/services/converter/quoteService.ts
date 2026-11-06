import type { Address, Hex } from "viem";

export interface ConverterQuoteRequest {
  providerId: Hex;
  tokenIn: Address;
  tokenOut: Address;
  amountIn: bigint;
  minAmountOut: bigint;
  recipient: Address;
  deadline: bigint;
  slippage: number;
}

export interface ConverterQuoteResult {
  providerId: Hex;
  amountIn: bigint;
  expectedAmountOut: bigint;
  minAmountOut: bigint;
  priceImpact: number | null;
  routeData: Hex;
  validUntil: bigint;
  callValue: bigint;
  quotedAt: number;
}

export class QuoteServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode = 400
  ) {
    super(message);
    this.name = "QuoteServiceError";
  }
}

export async function getConverterQuote(
  _request: ConverterQuoteRequest
): Promise<ConverterQuoteResult> {
  /*
   * Integração pendente:
   *
   * 1. Consultar a API oficial do provider.
   * 2. Validar tokenIn, tokenOut e amountIn.
   * 3. Calcular o valor líquido depois da taxa do protocolo.
   * 4. Obter a rota e callData reais.
   * 5. Calcular minAmountOut com bigint.
   * 6. Validar callValue e validade da rota.
   * 7. Gerar routeData assinado pelo routeSigner.
   *
   * Não devolver uma cotação inventada.
   */
  throw new QuoteServiceError(
    "A integração de cotação do provider ainda não está disponível.",
    "PROVIDER_QUOTE_NOT_INTEGRATED",
    501
  );
}