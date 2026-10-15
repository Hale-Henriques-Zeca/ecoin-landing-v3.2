import { parseAbi, parseAbiItem } from "viem";

/**
 * ABI for EdenActivityRegistry.
 *
 * This includes the public getters, administrative/write functions, and events
 * present in the supplied Solidity contract. Keep this file as the single
 * frontend ABI source for this contract.
 */
export const EDEN_ACTIVITY_REGISTRY_ABI = parseAbi([
  // Initializer / ownership / UUPS
  "function initialize(address owner_)",
  "function owner() view returns (address)",
  "function transferOwnership(address newOwner)",
  "function renounceOwnership()",
  "function upgradeTo(address newImplementation)",
  "function upgradeToAndCall(address newImplementation, bytes data) payable",

  // Core storage getters
  "function authorizedRecorders(address) view returns (bool)",
  "function activityCount(address user) view returns (uint256)",

  // Activity type constants
  "function ACTIVITY_DEPOSIT() view returns (bytes32)",
  "function ACTIVITY_WITHDRAWAL() view returns (bytes32)",
  "function ACTIVITY_STAKING() view returns (bytes32)",
  "function ACTIVITY_UNSTAKE() view returns (bytes32)",
  "function ACTIVITY_PROFIT() view returns (bytes32)",
  "function ACTIVITY_REFERRAL() view returns (bytes32)",
  "function ACTIVITY_REFERRAL_CLAIM() view returns (bytes32)",
  "function ACTIVITY_CS_EMISSION() view returns (bytes32)",
  "function ACTIVITY_CLAIM() view returns (bytes32)",
  "function ACTIVITY_TRADING() view returns (bytes32)",
  "function ACTIVITY_INVESTMENT() view returns (bytes32)",
  "function ACTIVITY_REFERRAL_LINK() view returns (bytes32)",
  "function ACTIVITY_REFERRAL_CODE_REGISTERED() view returns (bytes32)",
  "function ACTIVITY_OFFICIAL_TOKEN_REGISTERED() view returns (bytes32)",
  "function ACTIVITY_CUSTOM_TOKEN_ADDED() view returns (bytes32)",
  "function ACTIVITY_CUSTOM_TOKEN_REMOVED() view returns (bytes32)",
  "function ACTIVITY_CUSTOM_TOKEN_DETECTED() view returns (bytes32)",
  "function ACTIVITY_CUSTOM_TOKEN_TRANSFERRED() view returns (bytes32)",
  "function ACTIVITY_CUSTOM_TOKEN_APPROVED() view returns (bytes32)",
  "function ACTIVITY_CONVERSION() view returns (bytes32)",
  "function ACTIVITY_WALLET_RECOVERY() view returns (bytes32)",
  "function ACTIVITY_SESSION_CREATED() view returns (bytes32)",
  "function ACTIVITY_SESSION_REVOKED() view returns (bytes32)",
  "function ACTIVITY_SESSION_CONSUMED() view returns (bytes32)",
  "function ACTIVITY_SESSIONS_INVALIDATED() view returns (bytes32)",
  "function ACTIVITY_CONTROLLER_AUTHORIZED() view returns (bytes32)",
  "function ACTIVITY_CONTROLLER_PERMISSIONS_UPDATED() view returns (bytes32)",
  "function ACTIVITY_CONTROLLER_REVOKED() view returns (bytes32)",
  "function ACTIVITY_DEVICE_AUTHORIZED() view returns (bytes32)",
  "function ACTIVITY_DEVICE_REVOKED() view returns (bytes32)",
  "function ACTIVITY_WALLET_FROZEN() view returns (bytes32)",
  "function ACTIVITY_WALLET_UNFROZEN() view returns (bytes32)",
  "function ACTIVITY_GUARDIAN_STATUS_CHANGED() view returns (bytes32)",
  "function ACTIVITY_SECURITY_OPERATOR_UPDATED() view returns (bytes32)",
  "function ACTIVITY_WALLET_GUARDIAN_FACTORY_UPDATED() view returns (bytes32)",
  "function ACTIVITY_GAS_SPONSORSHIP_AUTHORIZED() view returns (bytes32)",
  "function ACTIVITY_GAS_SPONSORSHIP_COMPLETED() view returns (bytes32)",
  "function ACTIVITY_TRANSFER() view returns (bytes32)",
  "function ACTIVITY_SERVICE_FEE() view returns (bytes32)",
  "function ACTIVITY_WALLET_CREATED() view returns (bytes32)",
  "function ACTIVITY_WALLET_EXECUTED() view returns (bytes32)",
  "function ACTIVITY_WALLET_BATCH_EXECUTED() view returns (bytes32)",
  "function ACTIVITY_WALLET_SESSION_EXECUTED() view returns (bytes32)",

  // Write functions
  "function recordActivity(address user, bytes32 activityType, address token, uint256 amount, bytes32 referenceId)",
  "function recordReferralLink(address upline, address downline, bytes32 referenceId)",
  "function recordReferralCodeUsed(address upline, address downline, string code)",
  "function recordReferralCodeRegistered(address user, string code)",
  "function setAuthorizedRecorder(address recorder, bool allowed)",

  // Events
  "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
  "event Upgraded(address indexed implementation)",
  "event RecorderAuthorized(address indexed recorder, bool allowed)",
  "event ActivityRecorded(address indexed user, bytes32 indexed activityType, address indexed token, uint256 amount, address source, bytes32 referenceId, uint256 timestamp)",
  "event ReferralLinkRecorded(address indexed upline, address indexed downline, bytes32 indexed referenceId, uint256 timestamp)",
  "event ReferralCodeUsed(address indexed upline, address indexed downline, bytes32 indexed codeHash, string code, uint256 timestamp)",
  "event ReferralCodeRegistered(address indexed user, bytes32 indexed codeHash, string code, uint256 timestamp)",
] as const);

/** Strongly typed event item used by getLogs in the history hook. */
export const EDEN_ACTIVITY_RECORDED_EVENT = parseAbiItem(
  "event ActivityRecorded(address indexed user, bytes32 indexed activityType, address indexed token, uint256 amount, address source, bytes32 referenceId, uint256 timestamp)",
);
