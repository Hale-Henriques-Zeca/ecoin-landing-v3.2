
import { parseAbi } from "viem";

/**
 * =========================================================
 * EDENKINGDOM CONVERTER ROUTER
 * =========================================================
 *
 * Dedicated ABI for EdenKingDomConverterRouter.sol
 *
 * BNB Smart Chain
 * Solidity: ^0.8.19
 *
 * This ABI describes only the Router contract.
 */

export const EDENKINGDOM_CONVERTER_ROUTER_ABI = parseAbi([
  // =======================================================
  // 1. ERC20 -> ERC20
  // 1. ERC20 -> Native BNB
  // =======================================================

  "function executeSwap(address tokenIn, address tokenOut, uint256 grossAmountIn, uint256 minAmountOut, uint256 deadline, address router, address spender, bytes routerCallData) external",

  // =======================================================
  // 2. Native BNB -> ERC20
  // =======================================================

  "function executeSwapNative(address tokenOut, uint256 minAmountOut, uint256 deadline, address router, address spender, bytes routerCallData) external payable",

  // =======================================================
  // 3. CONFIGURATION / PUBLIC STATE
  // =======================================================

  "function feeCollector() external view returns (address)",

  "function allowedRouters(address router) external view returns (bool)",

  "function allowedSpenders(address spender) external view returns (bool)",

  // =======================================================
  // 4. ADMINISTRATION
  // =======================================================

  "function setFeeCollector(address newCollector) external",

  "function setRouterAllowed(address router, bool status) external",

  "function setSpenderAllowed(address spender, bool status) external",

  "function pause() external",

  "function unpause() external",

  // =======================================================
  // 5. PAUSABLE / OWNABLE / REENTRANCYGUARD
  // =======================================================

  "function paused() external view returns (bool)",

  "function owner() external view returns (address)",

  "function transferOwnership(address newOwner) external",

  "function renounceOwnership() external",

  // =======================================================
  // 6. CONSTANTS
  // =======================================================

  "function NATIVE_BNB() external view returns (address)",

  // =======================================================
  // 7. EVENTS
  // =======================================================

  "event SwapExecuted(address indexed user, address indexed tokenIn, address indexed tokenOut, uint256 grossAmountIn, uint256 feeAmount, uint256 netAmountIn, uint256 amountOut)",

  "event NativeSwapExecuted(address indexed user, address indexed tokenOut, uint256 grossAmountIn, uint256 feeAmount, uint256 netAmountIn, uint256 amountOut)",

  "event NativeOutputSwapExecuted(address indexed user, address indexed tokenIn, uint256 grossAmountIn, uint256 feeAmount, uint256 netAmountIn, uint256 amountOut)",

  "event FeeCollectorUpdated(address indexed newCollector)",

  "event RouterStatusUpdated(address indexed router, bool status)",

  "event SpenderStatusUpdated(address indexed spender, bool status)",

  // =======================================================
  // 8. OWNABLE EVENT
  // =======================================================

  "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",

  // =======================================================
  // 9. PAUSABLE EVENT
  // =======================================================

  "event Paused(address account)",

  "event Unpaused(address account)",
]);

/**
 * =========================================================
 * TYPE EXPORT
 * =========================================================
 */

export type EdenKingDomConverterRouterABI =
  typeof EDENKINGDOM_CONVERTER_ROUTER_ABI;
