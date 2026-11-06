
import { parseAbi } from "viem";

/**
 * =========================================================
 * 1. DEX WALLET INTERNAL CONVERTER
 * =========================================================
 */

export const DEX_INTERNAL_CONVERTER_ABI = parseAbi([
  // ERC20 conversion
  "function swapToken(bytes32 providerId, address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, uint256 deadline, bytes routeData) external returns (uint256 amountOut)",

  // Native BNB conversion
  "function swapBNB(bytes32 providerId, address tokenOut, uint256 minAmountOut, uint256 deadline, bytes routeData) external payable returns (uint256 amountOut)",

  // Asset configuration
  "function supportedAssets(address asset) external view returns (bool)",

  // Pair configuration
  "function pairEnabled(address tokenIn, address tokenOut) external view returns (bool)",

  // Dependencies
  "function feeCollector() external view returns (address)",
  "function routerRegistry() external view returns (address)",
  "function activityRegistry() external view returns (address)",

  // Nonce
  "function conversionNonce() external view returns (uint256)",

  // Events
  "event SwapExecuted(address indexed user, bytes32 indexed providerId, address indexed adapter, address tokenIn, address tokenOut, uint256 amountIn, uint256 feeAmount, uint256 amountOut)",

  "event UnusedInputRefunded(address indexed wallet, address indexed token, uint256 amount)",

  "event AdapterExecuted(bytes32 indexed providerId, address indexed adapter, address indexed wallet)",

  "event ConversionActivitiesRecorded(address indexed wallet, bytes32 indexed referenceId, address tokenIn, address tokenOut)",

  "event ActivityRecordingFailed(address indexed wallet, bytes32 indexed activityType, bytes32 referenceId)",
]);

/**
 * =========================================================
 * 2. DEX WALLET CONVERTER ROUTER REGISTRY
 * =========================================================
 */

export const DEX_ROUTER_REGISTRY_ABI = parseAbi([
  // Approvals
  "function approvedAdapters(address adapter) external view returns (bool)",
  "function approvedRouters(address router) external view returns (bool)",

  // Provider mapping
  "function providerAdapters(bytes32 providerId) external view returns (address)",
  "function getProviderAdapter(bytes32 providerId) external view returns (address)",

  // Administration
  "function setRouter(address router, bool approved) external",
  "function setAdapter(address adapter, bool approved) external",
  "function setProvider(bytes32 providerId, address adapter, bool approved) external",

  // Events
  "event RouterApprovalUpdated(address indexed router, bool approved)",
  "event AdapterApprovalUpdated(address indexed adapter, bool approved)",
  "event ProviderAdapterUpdated(bytes32 indexed providerId, address indexed adapter, bool approved)",
]);

/**
 * =========================================================
 * 3. DEX WALLET CONVERTER FEE COLLECTOR
 * =========================================================
 */

export const DEX_CONVERTER_FEE_COLLECTOR_ABI = parseAbi([
  // Fee preview
  "function previewFee(uint256 grossAmount) external pure returns (uint256)",

  // Fee configuration
  "function SERVICE_FEE_BP() external view returns (uint256)",
  "function BP() external view returns (uint256)",

  // Supported assets
  "function usdt() external view returns (address)",
  "function eusd() external view returns (address)",
  "function ecoin() external view returns (address)",

  // GasVault
  "function gasVault() external view returns (address)",

  // Events - verify against deployed FeeCollector source
  "event ConverterFeeCollected(address indexed router, address indexed payer, address indexed token, uint256 grossAmount, uint256 feeAmount)",

  "event FeeDistributed(address indexed token, uint256 miningAmount, uint256 liquidityAmount, uint256 salaryAmount, uint256 treasuryAmount, uint256 buybackAmount, uint256 tradingAmount, uint256 ecosystemAmount, uint256 gasAmount)",
]);

/**
 * =========================================================
 * 4. LIQUIDMESH ADAPTER
 * =========================================================
 *
 * Interface and public getters from LiquidMeshAdapter.
 */

export const LIQUIDMESH_ADAPTER_ABI = parseAbi([
  // Main execution
  "function execute(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, address recipient, uint256 deadline, bytes routeData) external payable returns (uint256 amountOut)",

  // Configuration
  "function converter() external view returns (address)",
  "function routeSigner() external view returns (address)",
  "function executionNonce() external view returns (uint256)",

  // Public constants
  "function BSC_CHAIN_ID() external view returns (uint256)",
  "function LIQUIDMESH_ROUTER() external view returns (address)",
  "function LIQUIDMESH_APPROVAL() external view returns (address)",
  "function NATIVE_BNB() external view returns (address)",
  "function ROUTE_TYPEHASH() external view returns (bytes32)",

  // Administration
  "function setConverter(address newConverter) external",
  "function setRouteSigner(address newSigner) external",

  // Events
  "event ConverterUpdated(address indexed oldConverter, address indexed newConverter)",
  "event RouteSignerUpdated(address indexed oldSigner, address indexed newSigner)",

  "event LiquidMeshSwapExecuted(address indexed converter, address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOut, uint256 nonce)",

  "event InputRefunded(address indexed token, address indexed recipient, uint256 amount)",

  "event RouterCallExecuted(address indexed router, bytes32 indexed callDataHash)",
]);

/**
 * =========================================================
 * 5. STANDARD ERC20 ABI
 * =========================================================
 */

export const CONVERTER_ERC20_ABI = parseAbi([
  "function balanceOf(address account) external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function decimals() external view returns (uint8)",
  "function symbol() external view returns (string)",
  "function name() external view returns (string)",

  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
]);
