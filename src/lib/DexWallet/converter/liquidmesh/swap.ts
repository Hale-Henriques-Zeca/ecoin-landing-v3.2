
import "server-only";

import { getLiquidMeshQuote } from "./quote";
import { liquidMeshRequest } from "./client";

import type {
  LiquidMeshSwapParams,
  LiquidMeshSwapResponse,
  LiquidMeshSwapResult,
} from "./types";

/*//////////////////////////////////////////////////////////////
                         CONFIGURATION
//////////////////////////////////////////////////////////////*/

const LIQUIDMESH_ROUTER =
  "0x3d90f66B534Dd8482b181e24655A9e8265316BE9";

const NATIVE_BNB_SENTINEL =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

const NATIVE_BNB_ZERO =
  "0x0000000000000000000000000000000000000000";

/*//////////////////////////////////////////////////////////////
                         VALIDATION
//////////////////////////////////////////////////////////////*/

function validateAddress(
  address: string,
  field: string
): void {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error(`Invalid ${field} address.`);
  }
}

function sameAddress(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

function validateAmount(amount: string): void {
  if (
    !/^[0-9]+$/.test(amount) ||
    BigInt(amount) <= 0n
  ) {
    throw new Error(
      "Amount must be a positive integer in token base units."
    );
  }
}

function validateSlippage(slippageBps: number): void {
  if (
    !Number.isInteger(slippageBps) ||
    slippageBps < 1 ||
    slippageBps > 10000
  ) {
    throw new Error(
      "Slippage must be an integer between 1 and 10000 BPS."
    );
  }
}

/*//////////////////////////////////////////////////////////////
                   LIQUIDMESH CALL VALIDATION
//////////////////////////////////////////////////////////////*/

function validateLiquidMeshCall(
  swap: LiquidMeshSwapResponse,
  expectedUser: string,
  expectedInput: string
): void {
  if (swap.code !== 0 || !swap.data) {
    throw new Error(
      swap.msg ||
      swap.message ||
      "Invalid LiquidMesh swap."
    );
  }

  const {
    chainId,
    callMsg,
    expiryTimestamp,
  } = swap.data;

  // Validate BSC network.
  if (String(chainId) !== "56") {
    throw new Error(
      "Unexpected LiquidMesh chain ID."
    );
  }

  // Validate transaction object.
  if (
    !callMsg ||
    typeof callMsg !== "object"
  ) {
    throw new Error(
      "Missing LiquidMesh callMsg."
    );
  }

  validateAddress(
    callMsg.from,
    "callMsg.from"
  );

  validateAddress(
    callMsg.to,
    "callMsg.to"
  );

  // Verify wallet sender.
  if (
    !sameAddress(
      callMsg.from,
      expectedUser
    )
  ) {
    throw new Error(
      "LiquidMesh transaction sender mismatch."
    );
  }

  // Verify official LiquidMesh Router.
  if (
    !sameAddress(
      callMsg.to,
      LIQUIDMESH_ROUTER
    )
  ) {
    throw new Error(
      "Unapproved LiquidMesh Router."
    );
  }

  // Validate calldata.
  if (
    typeof callMsg.data !== "string" ||
    !/^0x(?:[0-9a-fA-F]{2}){4,}$/.test(
      callMsg.data
    )
  ) {
    throw new Error(
      "Invalid LiquidMesh calldata."
    );
  }

  // Validate native transaction value.
  if (
    typeof callMsg.value !== "string" ||
    !/^0x[0-9a-fA-F]+$/.test(
      callMsg.value
    )
  ) {
    throw new Error(
      "Invalid LiquidMesh transaction value."
    );
  }

  const normalizedInput =
    expectedInput.toLowerCase();

  const nativeBNB =
    normalizedInput === NATIVE_BNB_SENTINEL ||
    normalizedInput === NATIVE_BNB_ZERO;

  // ERC20 input must not unexpectedly attach BNB.
  if (
    !nativeBNB &&
    BigInt(callMsg.value) !== 0n
  ) {
    throw new Error(
      "Unexpected native BNB value for ERC20 input."
    );
  }

  // Validate order expiration.
  if (expiryTimestamp !== undefined) {
    const expiry = Number(expiryTimestamp);

    if (
      !Number.isSafeInteger(expiry) ||
      expiry <= 0
    ) {
      throw new Error(
        "Invalid LiquidMesh expiry."
      );
    }

    if (
      Math.floor(Date.now() / 1000) >= expiry
    ) {
      throw new Error(
        "LiquidMesh order has expired."
      );
    }
  }
}

/*//////////////////////////////////////////////////////////////
                    LIQUIDMESH SWAP CREATION
//////////////////////////////////////////////////////////////*/

export async function createLiquidMeshSwap(
  params: LiquidMeshSwapParams
): Promise<LiquidMeshSwapResult> {

  // 1. Validate network.
  if (params.chainId !== 56) {
    throw new Error(
      "Only BNB Smart Chain Mainnet is supported."
    );
  }

  // 2. Validate addresses.
  validateAddress(
    params.inputToken,
    "input token"
  );

  validateAddress(
    params.outputToken,
    "output token"
  );

  validateAddress(
    params.userAddress,
    "user"
  );

  // 3. Reject identical input/output assets.
  if (
    params.inputToken.toLowerCase() ===
    params.outputToken.toLowerCase()
  ) {
    throw new Error(
      "Input and output tokens must be different."
    );
  }

  // 4. Validate amount and slippage.
  validateAmount(params.amount);

  validateSlippage(params.slippageBps);

  // 5. Obtain a fresh quote from LiquidMesh.
  const quoteResult = await getLiquidMeshQuote({
    chainId: 56,
    inputToken: params.inputToken,
    outputToken: params.outputToken,
    amount: params.amount,
    userAddress: params.userAddress,
  });

  const quoteData = quoteResult.quote?.data;

  if (
    !quoteData ||
    typeof quoteData !== "object"
  ) {
    throw new Error(
      "LiquidMesh returned invalid quote data."
    );
  }

  // 6. Validate route plans.
  if (
    !Array.isArray(quoteData.routePlans) ||
    quoteData.routePlans.length === 0
  ) {
    throw new Error(
      "LiquidMesh quote contains no executable route plans."
    );
  }

  // 7. Validate expected output.
  if (
    typeof quoteData.outputAmount !== "string" ||
    !/^[0-9]+$/.test(
      quoteData.outputAmount
    ) ||
    BigInt(quoteData.outputAmount) <= 0n
  ) {
    throw new Error(
      "LiquidMesh returned an invalid output amount."
    );
  }

  // 8. Build swapInfo from fresh quote.
  const swapInfo = {
    ...quoteData,
    slippageBps: params.slippageBps,
  };

  // 9. Build LiquidMesh POST body.
  const requestBody = {
    userAddress: params.userAddress,
    slippageBps: params.slippageBps,
    swapInfo,
  };

  // 10. Request executable transaction data.
  let swap: LiquidMeshSwapResponse;

  
try {
  swap = await liquidMeshRequest<LiquidMeshSwapResponse>(
    "POST",
    "/v1/bsc/swap",
    requestBody
  );

  console.log(
    "\n========== LIQUIDMESH SWAP RESPONSE =========="
  );

  console.log(
    JSON.stringify(swap, null, 2)
  );

  if (swap?.data?.callMsg) {
    console.log(
      "\n========== LIQUIDMESH CALL MESSAGE =========="
    );

    console.log("FROM:", swap.data.callMsg.from);
    console.log("TO:", swap.data.callMsg.to);
    console.log("VALUE:", swap.data.callMsg.value);
    console.log("DATA:", swap.data.callMsg.data);
    console.log("DATA LENGTH:", swap.data.callMsg.data.length);
    console.log("SELECTOR:", swap.data.callMsg.data.slice(0, 10));
    console.log("EXPIRY:", swap.data.expiryTimestamp);
    console.log("ORDER ID:", swap.data.orderId);
  } else {
    console.error(
      "[LiquidMesh] Response does not contain callMsg."
    );
  }

  console.log(
    "\n========== END LIQUIDMESH RESPONSE =========="
  );

} catch (error) {
  console.error(
    "[LiquidMesh Swap Diagnostic]",
    error instanceof Error
      ? error.message
      : error
  );

  throw error;
}

  // 11. Validate response.
  if (
    !swap ||
    typeof swap !== "object"
  ) {
    throw new Error(
      "LiquidMesh returned an empty swap response."
    );
  }

  if (swap.code !== 0) {
    throw new Error(
      swap.msg ||
      swap.message ||
      `LiquidMesh swap failed with code ${swap.code}.`
    );
  }

  // 12. Validate generated transaction.
  validateLiquidMeshCall(
    swap,
    params.userAddress,
    params.inputToken
  );

  // 13. Return validated quote and transaction data.
  return {
    success: true,
    provider: "LIQUIDMESH",
    chainId: 56,
    inputToken: params.inputToken,
    outputToken: params.outputToken,
    inputAmount: params.amount,
    userAddress: params.userAddress,
    slippageBps: params.slippageBps,
    quote: quoteResult.quote,
    swap,
  };
}
