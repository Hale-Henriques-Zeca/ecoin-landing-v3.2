
import type {
  KyberApiEnvelope,
  KyberChain,
} from "./types";

const KYBER_API_BASE =
  "https://aggregator-api.kyberswap.com";

const DEFAULT_TIMEOUT_MS = 15_000;

export class KyberApiError extends Error {
  public readonly status: number;
  public readonly apiCode?: number;
  public readonly requestId?: string;

  constructor(params: {
    message: string;
    status: number;
    apiCode?: number;
    requestId?: string;
  }) {
    super(params.message);

    this.name = "KyberApiError";
    this.status = params.status;
    this.apiCode = params.apiCode;
    this.requestId = params.requestId;
  }
}

function getClientId(): string {
  const clientId = process.env.KYBER_CLIENT_ID;

  if (!clientId || !clientId.trim()) {
    throw new Error(
      "Missing KYBER_CLIENT_ID environment variable.",
    );
  }

  return clientId.trim();
}

function validateChain(chain: KyberChain): void {
  if (chain !== "bsc") {
    throw new Error(
      `Unsupported KyberSwap chain: ${chain}`,
    );
  }
}

function buildUrl(
  chain: KyberChain,
  path: string,
  params?: Record<string, string | boolean | undefined>,
): string {
  validateChain(chain);

  const url = new URL(
    `${KYBER_API_BASE}/${chain}/api/v1/${path}`,
  );

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

async function parseResponse<T>(
  response: Response,
): Promise<KyberApiEnvelope<T>> {
  let body: unknown;

  try {
    body = await response.json();
  } catch {
    throw new KyberApiError({
      message: "KyberSwap returned an invalid JSON response.",
      status: response.status,
    });
  }

  if (!response.ok) {
    const errorBody = body as {
      code?: number;
      message?: string;
      requestId?: string;
    };

    throw new KyberApiError({
      message:
        errorBody?.message ||
        `KyberSwap request failed (${response.status}).`,
      status: response.status,
      apiCode: errorBody?.code,
      requestId: errorBody?.requestId,
    });
  }

  const envelope = body as KyberApiEnvelope<T>;

  if (
    typeof envelope.code !== "number" ||
    envelope.code !== 0 ||
    !envelope.data
  ) {
    throw new KyberApiError({
      message:
        envelope.message ||
        "KyberSwap returned an unsuccessful response.",
      status: response.status,
      apiCode: envelope.code,
      requestId: envelope.requestId,
    });
  }

  return envelope;
}

export async function kyberGet<T>(params: {
  chain: KyberChain;
  path: string;
  query?: Record<
    string,
    string | boolean | undefined
  >;
}): Promise<T> {
  const url = buildUrl(
    params.chain,
    params.path,
    params.query,
  );

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-client-id": getClientId(),
    },
    cache: "no-store",
    signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
  });

  const result = await parseResponse<T>(response);

  return result.data;
}

export async function kyberPost<T>(params: {
  chain: KyberChain;
  path: string;
  body: unknown;
}): Promise<T> {
  const url = buildUrl(
    params.chain,
    params.path,
  );

  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-client-id": getClientId(),
    },
    body: JSON.stringify(params.body),
    cache: "no-store",
    signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
  });

  const result = await parseResponse<T>(response);

  return result.data;
}
