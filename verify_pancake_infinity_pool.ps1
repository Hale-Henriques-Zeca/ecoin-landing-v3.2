
# ============================================================
# EDENKINGDOM - PANCAKESWAP INFINITY CL POOL VERIFIER
# BNB SMART CHAIN MAINNET
# ============================================================

$ErrorActionPreference = "Stop"

# ------------------------------------------------------------
# CONFIGURATION
# ------------------------------------------------------------

$rpc = "https://bsc-dataseed.binance.org/"

$manager = "0xa0FfB9c1CE1Fe56963B0321B32E7A0302114058b"

$poolId = "0xec321ef76ef30270411c5f36ab4e0e7ab8b34336533193cdef07bc1002b79705"

$expectedUSDT = "0x55d398326f99059ff775485246999027b3197955"

$expectedECOIN = "0xdf69235019cc416dd5be75dfc0edc922ab4b5964"

$expectedManager = $manager.ToLower()

# ------------------------------------------------------------
# RPC FUNCTION
# ------------------------------------------------------------

function Invoke-Rpc {
    param(
        [string]$Method,
        [array]$Params
    )

    $body = @{
        jsonrpc = "2.0"
        method  = $Method
        params  = $Params
        id      = 1
    } | ConvertTo-Json -Depth 10 -Compress

    $response = Invoke-RestMethod `
        -Uri $rpc `
        -Method POST `
        -ContentType "application/json" `
        -Body $body

    if ($response.error) {
        throw "RPC error: $($response.error.message)"
    }

    return $response.result
}

function Invoke-BscCall {
    param(
        [string]$To,
        [string]$Data
    )

    return Invoke-Rpc "eth_call" @(
        @{
            to   = $To
            data = $Data
        },
        "latest"
    )
}

# ------------------------------------------------------------
# HEX / INTEGER HELPERS
# ------------------------------------------------------------

function Convert-HexToBigInteger {
    param([string]$Hex)

    $clean = $Hex -replace "^0x", ""

    return [System.Numerics.BigInteger]::Parse(
        "0" + $clean,
        [System.Globalization.NumberStyles]::HexNumber
    )
}

function Get-Word {
    param(
        [string]$Data,
        [int]$Index
    )

    $clean = $Data -replace "^0x", ""

    $start = $Index * 64

    if ($clean.Length -lt ($start + 64)) {
        throw "RPC response is shorter than expected."
    }

    return $clean.Substring($start, 64)
}

function Get-AddressFromWord {
    param([string]$Word)

    return "0x" + $Word.Substring(24, 40).ToLower()
}

function Format-Price {
    param([double]$Value)

    return $Value.ToString(
        "N12",
        [System.Globalization.CultureInfo]::InvariantCulture
    )
}

# ------------------------------------------------------------
# START
# ------------------------------------------------------------

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host " EDENKINGDOM - PANCAKESWAP INFINITY POOL CHECK" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# ------------------------------------------------------------
# 1. NETWORK
# ------------------------------------------------------------

$chainHex = Invoke-Rpc "eth_chainId" @()

$chainId = [Convert]::ToInt32(
    $chainHex.Substring(2),
    16
)

Write-Host ""
Write-Host "NETWORK" -ForegroundColor Cyan
Write-Host "Chain ID: $chainId"

if ($chainId -ne 56) {
    throw "Wrong network. Expected BSC Mainnet Chain ID 56."
}

Write-Host "BSC Mainnet confirmed." -ForegroundColor Green

# ------------------------------------------------------------
# 2. POOL ID VALIDATION
# ------------------------------------------------------------

Write-Host ""
Write-Host "POOL ID VALIDATION" -ForegroundColor Cyan

if ($poolId -notmatch "^0x[0-9a-fA-F]{64}$") {
    throw "Invalid Pool ID. It must contain exactly 32 bytes."
}

$poolBytes = ($poolId.Length - 2) / 2

Write-Host "Pool ID: $poolId"
Write-Host "Pool ID bytes: $poolBytes"

if ($poolBytes -ne 32) {
    throw "Pool ID is not bytes32."
}

Write-Host "Pool ID bytes32 confirmed." -ForegroundColor Green

# ------------------------------------------------------------
# 3. POOL MANAGER BYTECODE
# ------------------------------------------------------------

Write-Host ""
Write-Host "POOL MANAGER VALIDATION" -ForegroundColor Cyan

$managerCode = Invoke-Rpc "eth_getCode" @(
    $manager,
    "latest"
)

if ($managerCode -eq "0x") {
    throw "No contract bytecode found at PoolManager."
}

Write-Host "PoolManager: $manager"
Write-Host "Contract bytecode: PRESENT" -ForegroundColor Green

# ------------------------------------------------------------
# 4. GET POOL KEY
# ------------------------------------------------------------

Write-Host ""
Write-Host "POOL KEY" -ForegroundColor Cyan

# getPoolKey(bytes32)
$keyData = "0x0e2d484a" + $poolId.Substring(2)

$keyResult = Invoke-BscCall $manager $keyData

if ($keyResult.Length -lt 322) {
    throw "Invalid getPoolKey response."
}

$currency0 = Get-AddressFromWord (Get-Word $keyResult 0)
$currency1 = Get-AddressFromWord (Get-Word $keyResult 1)
$hooks     = Get-AddressFromWord (Get-Word $keyResult 2)
$poolMgr   = Get-AddressFromWord (Get-Word $keyResult 3)

$feeHex = Get-Word $keyResult 4

$fee = [Convert]::ToInt32($feeHex, 16)

Write-Host "Token0: $currency0"
Write-Host "Token1: $currency1"
Write-Host "Hooks: $hooks"
Write-Host "PoolManager in PoolKey: $poolMgr"
Write-Host "LP Fee: $fee"

if ($currency0 -ne $expectedUSDT.ToLower()) {
    throw "Token0 is not the expected USDT contract."
}

if ($currency1 -ne $expectedECOIN.ToLower()) {
    throw "Token1 is not the expected ECOIN contract."
}

if ($poolMgr -ne $expectedManager) {
    throw "PoolKey PoolManager does not match configured PoolManager."
}

Write-Host "USDT / ECOIN PoolKey confirmed." -ForegroundColor Green

# ------------------------------------------------------------
# 5. GET SLOT0
# ------------------------------------------------------------

Write-Host ""
Write-Host "SLOT0 / PRICE STATE" -ForegroundColor Cyan

# getSlot0(bytes32)
$slotData = "0xc815641c" + $poolId.Substring(2)

$slotResult = Invoke-BscCall $manager $slotData

if ($slotResult.Length -lt 258) {
    throw "Invalid getSlot0 response."
}

$sqrtHex       = Get-Word $slotResult 0
$tickHex       = Get-Word $slotResult 1
$protocolHex   = Get-Word $slotResult 2
$lpFeeHex      = Get-Word $slotResult 3

$sqrtRaw = Convert-HexToBigInteger $sqrtHex

# Decode signed int24 tick.
$tickValue = [Convert]::ToInt64(
    $tickHex.Substring(48, 16),
    16
)

if ($tickValue -ge 8388608) {
    $tickValue -= 16777216
}

$protocolFee = [Convert]::ToInt32(
    $protocolHex.Substring(56, 8),
    16
)

$lpFee = [Convert]::ToInt32(
    $lpFeeHex.Substring(56, 8),
    16
)

if ($sqrtRaw -eq 0) {
    throw "Pool is not initialized or has no valid price."
}

Write-Host "sqrtPriceX96: $sqrtRaw"
Write-Host "Current Tick: $tickValue"
Write-Host "Protocol Fee raw: $protocolFee"
Write-Host "LP Fee: $lpFee"

# ------------------------------------------------------------
# 6. PRICE CALCULATION
# ------------------------------------------------------------

Write-Host ""
Write-Host "LIVE PRICE" -ForegroundColor Cyan

# Pool order:
# token0 = USDT
# token1 = ECOIN
#
# Both tokens have 18 decimals.
#
# token1/token0 = (sqrtPriceX96 / 2^96)^2

$sqrtDouble = [double]$sqrtRaw
$q96 = [math]::Pow(2, 96)

$ratio = $sqrtDouble / $q96

$ecoinPerUSDT = $ratio * $ratio

if ($ecoinPerUSDT -le 0) {
    throw "Invalid calculated pool price."
}

$usdtPerEcoin = 1.0 / $ecoinPerUSDT

Write-Host ""
Write-Host ("1 USDT = {0} ECOIN" -f (Format-Price $ecoinPerUSDT)) -ForegroundColor Cyan

Write-Host ("1 ECOIN = {0} USDT" -f (Format-Price $usdtPerEcoin)) -ForegroundColor Green

Write-Host ""
Write-Host ("LP fee: {0} ppm ({1:N4}%)" -f $lpFee, ($lpFee / 10000.0)) 

# ------------------------------------------------------------
# 7. ACTIVE LIQUIDITY
# ------------------------------------------------------------

Write-Host ""
Write-Host "ACTIVE LIQUIDITY" -ForegroundColor Cyan

# getLiquidity(bytes32)
$liquidityData = "0xfa6793d5" + $poolId.Substring(2)

$liquidityHex = Invoke-BscCall $manager $liquidityData

$liquidityRaw = Convert-HexToBigInteger $liquidityHex.Substring(2)

Write-Host "Active Liquidity raw: $liquidityRaw"

# ------------------------------------------------------------
# 8. FINAL SUMMARY
# ------------------------------------------------------------

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host " VERIFICATION COMPLETED" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

Write-Host "Network: BNB Smart Chain Mainnet"
Write-Host "Pool: USDT / ECOIN"
Write-Host "PoolManager: $manager"
Write-Host "Pool ID: $poolId"
Write-Host "Pool ID size: $poolBytes bytes"
Write-Host "LP Fee: $lpFee"
Write-Host "Tick: $tickValue"
Write-Host "Active Liquidity: $liquidityRaw"

Write-Host ""
Write-Host "1 USDT = $(Format-Price $ecoinPerUSDT) ECOIN"
Write-Host "1 ECOIN = $(Format-Price $usdtPerEcoin) USDT"

Write-Host ""
Write-Host "Source: PancakeSwap Infinity CL PoolManager"
Write-Host "Method: eth_call / getPoolKey / getSlot0 / getLiquidity"
