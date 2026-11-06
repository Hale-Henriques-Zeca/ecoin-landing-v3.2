import {
  encodeAbiParameters,
  keccak256,
  parseAbiParameters,
  type Address,
  type Hex,
  isAddress,
  isHex,
  toBytes,
} from "viem";

import { privateKeyToAccount } from "viem/accounts";

const ROUTE_TYPEHASH = keccak256(
  toBytes(
    "LiquidMeshRoute(uint256 chainId,address adapter,address converter,address recipient,address tokenIn,address tokenOut,uint256 amountIn,uint256 minAmountOut,uint256 deadline,uint256 callValue,uint256 validUntil,uint256 nonce,bytes32 callDataHash)"
  )
);

export interface SignLiquidMeshRouteParams {
  adapter: Address;
  converter: Address;
  recipient: Address;
  tokenIn: Address;
  tokenOut: Address;
  amountIn: bigint;
  minAmountOut: bigint;
  deadline: bigint;
  callValue: bigint;
  validUntil: bigint;
  nonce: bigint;
  callData: Hex;
  signedMinAmountOut: bigint;
}

export interface SignedLiquidMeshRoute {
  signature: Hex;
  structHash: Hex;
  routeData: Hex;
}

function getSigner() {
  const privateKey = process.env.LIQUIDMESH_ROUTE_SIGNER_PRIVATE_KEY;

  if (!privateKey || !isHex(privateKey) || privateKey.length !== 66) {
    throw new Error(
      "LIQUIDMESH_ROUTE_SIGNER_PRIVATE_KEY não está configurada corretamente."
    );
  }

  return privateKeyToAccount(privateKey as Hex);
}

function validateParams(params: SignLiquidMeshRouteParams) {
  const addresses = [
    params.adapter,
    params.converter,
    params.recipient,
    params.tokenIn,
    params.tokenOut,
  ];

  if (!addresses.every((address) => isAddress(address))) {
    throw new Error("Um ou mais endereços da rota são inválidos.");
  }

  if (
    params.amountIn <= 0n ||
    params.minAmountOut <= 0n ||
    params.signedMinAmountOut < params.minAmountOut
  ) {
    throw new Error("Valores de entrada ou saída inválidos.");
  }

  if (
    params.deadline <= 0n ||
    params.validUntil <= 0n ||
    params.validUntil > params.deadline ||
    params.nonce < 0n ||
    params.callValue < 0n
  ) {
    throw new Error("Validade, nonce ou callValue inválidos.");
  }

  if (!isHex(params.callData)) {
    throw new Error("callData inválido.");
  }
}

export async function signLiquidMeshRoute(
  params: SignLiquidMeshRouteParams
): Promise<SignedLiquidMeshRoute> {
  validateParams(params);

  const chainId = 56n;

  const callDataHash = keccak256(params.callData);

  const structHash = keccak256(
    encodeAbiParameters(
      parseAbiParameters(
        "bytes32 typeHash, uint256 chainId, address adapter, address converter, address recipient, address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, uint256 deadline, uint256 callValue, uint256 validUntil, uint256 nonce, bytes32 callDataHash"
      ),
      [
        ROUTE_TYPEHASH,
        chainId,
        params.adapter,
        params.converter,
        params.recipient,
        params.tokenIn,
        params.tokenOut,
        params.amountIn,
        params.minAmountOut,
        params.deadline,
        params.callValue,
        params.validUntil,
        params.nonce,
        callDataHash,
      ]
    )
  );

  const account = getSigner();

  // O contrato usa ECDSA.toEthSignedMessageHash(structHash).
  // signMessage({ raw }) produz o prefixo EIP-191 correspondente.
  const signature = await account.signMessage({
    message: {
      raw: structHash,
    },
  });

  const routeData = encodeAbiParameters(
    parseAbiParameters(
      "bytes callData, uint256 callValue, uint256 validUntil, uint256 signedMinAmountOut, bytes signature"
    ),
    [
      params.callData,
      params.callValue,
      params.validUntil,
      params.signedMinAmountOut,
      signature,
    ]
  );

  return {
    signature,
    structHash,
    routeData,
  };
}