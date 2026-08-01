/**
 * ============================================================
 * Protected Regex
 * EdenKingDom AI Translation Framework
 * ============================================================
 *
 * Expressões que NUNCA devem ser traduzidas.
 *
 * São protegidas antes da IA traduzir
 * e restauradas depois.
 */

export const PROTECTED_REGEX = {

    /**
     * Wallet Ethereum / BNB
     */
    WALLET:

/0x[a-fA-F0-9]{40}/g,

    /**
     * Transaction Hash
     */
    TX_HASH:

/0x([A-Fa-f0-9]{64})/g,

    /**
     * Contract Address
     */
    CONTRACT:

/0x[a-fA-F0-9]{40}/g,

    /**
     * UUID
     */
    UUID:

/\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi,

    /**
     * SHA256
     */
    SHA256:

/\b[A-Fa-f0-9]{64}\b/g,

    /**
     * Private Key (Hex)
     */
    PRIVATE_KEY:

/\b[A-Fa-f0-9]{64}\b/g,

    /**
     * API Keys
     */
    API_KEY:

/(sk|pk)-[A-Za-z0-9\-_]+/g,

    /**
     * JWT
     */
    JWT:

/eyJ[A-Za-z0-9_\-=]+\.[A-Za-z0-9_\-=]+\.[A-Za-z0-9_\-=]+/g,

    /**
     * Smart Contract Function
     */
    FUNCTION:

/[a-zA-Z_][a-zA-Z0-9_]*\([^)]*\)/g,

    /**
     * Solidity Address
     */
    SOLIDITY:

/address\s+[a-zA-Z0-9_]+/g,

    /**
     * Solidity uint
     */
    UINT:

/uint(8|16|32|64|128|256)?/g,

    /**
     * ABI JSON
     */
    ABI:

/\[[\s\S]*?"type"\s*:\s*"function"[\s\S]*?\]/g,

    /**
     * IPFS Hash
     */
    IPFS:

/Qm[1-9A-HJ-NP-Za-km-z]{44}/g,

    /**
     * ENS
     */
    ENS:

/[a-zA-Z0-9-]+\.eth/g,

    /**
     * DNS
     */
    DOMAIN:

/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/g,

    /**
     * BIP39
     */
    MNEMONIC:

/([a-z]+ ){11,23}[a-z]+/g

} as const;