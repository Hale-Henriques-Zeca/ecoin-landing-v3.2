
param(
    [string]$InputToken = "",
    [string]$OutputToken = "",
    [string]$Amount = "",
    [string]$UserAddress = "",
    [int]$SlippageBps = 50,
    [string]$LocalApi = "http://localhost:3000/api/liquidmesh/swap"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "       EDENKINGDOM - LIQUIDMESH DIAGNOSTIC" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# 1. Collect parameters

if ([string]::IsNullOrWhiteSpace($InputToken)) {
    $InputToken = Read-Host "Input token address"
}

if ([string]::IsNullOrWhiteSpace($OutputToken)) {
    $OutputToken = Read-Host "Output token address"
}

if ([string]::IsNullOrWhiteSpace($Amount)) {
    $Amount = Read-Host "Amount in token base units"
}

if ([string]::IsNullOrWhiteSpace($UserAddress)) {
    $UserAddress = Read-Host "Wallet address"
}

# 2. Validate parameters

if ($InputToken -notmatch '^0x[a-fA-F0-9]{40}$') {
    throw "Invalid input token address."
}

if ($OutputToken -notmatch '^0x[a-fA-F0-9]{40}$') {
    throw "Invalid output token address."
}

if ($UserAddress -notmatch '^0x[a-fA-F0-9]{40}$') {
    throw "Invalid wallet address."
}

if ($InputToken -ieq $OutputToken) {
    throw "Input and output tokens must be different."
}

if ($Amount -notmatch '^[0-9]+$' -or [decimal]$Amount -le 0) {
    throw "Invalid amount. Use token base units."
}

if ($SlippageBps -lt 1 -or $SlippageBps -gt 10000) {
    throw "Slippage must be between 1 and 10000 BPS."
}

# 3. Build JSON request

$body = @{
    inputToken  = $InputToken
    outputToken = $OutputToken
    amount      = $Amount
    userAddress = $UserAddress
    slippageBps = $SlippageBps
}

$jsonBody = $body | ConvertTo-Json -Depth 20 -Compress

# 4. Output file

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$outputFile = Join-Path $scriptDir "liquidmesh-swap-response.json"

Write-Host "Input token:  $InputToken"
Write-Host "Output token: $OutputToken"
Write-Host "Amount:       $Amount"
Write-Host "Wallet:       $UserAddress"
Write-Host "Slippage:     $SlippageBps BPS"
Write-Host ""

Write-Host "Requesting local API..." -ForegroundColor Yellow

$statusCode = 0
$responseText = ""

$httpClient = $null
$request = $null
$response = $null
$content = $null

# 5. Send request using HttpClient

try {

    $httpClient = [System.Net.Http.HttpClient]::new()

    $httpClient.Timeout = [TimeSpan]::FromSeconds(120)

    $request = [System.Net.Http.HttpRequestMessage]::new(
        [System.Net.Http.HttpMethod]::Post,
        $LocalApi
    )

    $content = [System.Net.Http.StringContent]::new(
        $jsonBody,
        [System.Text.Encoding]::UTF8,
        "application/json"
    )

    $request.Content = $content

    $response = $httpClient.SendAsync(
        $request
    ).GetAwaiter().GetResult()

    # IMPORTANT:
    # Read the response body before disposing HttpResponseMessage.

    $statusCode = [int]$response.StatusCode

    $responseText = $response.Content.
        ReadAsStringAsync().
        GetAwaiter().
        GetResult()

}
catch {

    Write-Host ""
    Write-Host "HTTP REQUEST FAILED" -ForegroundColor Red
    Write-Host $_.Exception.ToString() -ForegroundColor Red

    if ([string]::IsNullOrWhiteSpace($responseText)) {
        $responseText = $_.Exception.ToString()
    }

}
finally {

    if ($response -ne $null) {
        $response.Dispose()
    }

    if ($request -ne $null) {
        $request.Dispose()
    }

    if ($httpClient -ne $null) {
        $httpClient.Dispose()
    }

}

# 6. Save complete response

$responseText | Set-Content -Path $outputFile -Encoding UTF8

Write-Host ""
Write-Host "HTTP STATUS: $statusCode" -ForegroundColor Cyan

Write-Host "Response saved:" -ForegroundColor Green
Write-Host $outputFile
Write-Host ""

# 7. Parse JSON

$result = $null

try {

    $result = $responseText | ConvertFrom-Json -ErrorAction Stop

    Write-Host "========== RESPONSE SUMMARY ==========" -ForegroundColor Cyan

    if ($null -ne $result.success) {
        Write-Host "Success: $($result.success)"
    }

    if ($result.provider) {
        Write-Host "Provider: $($result.provider)"
    }

    if ($result.service) {
        Write-Host "Service: $($result.service)"
    }

    if ($result.message) {
        Write-Host "Message: $($result.message)"
    }

    if ($result.swap) {

        Write-Host ""
        Write-Host "LIQUIDMESH RESPONSE FOUND" -ForegroundColor Green

        if ($null -ne $result.swap.code) {
            Write-Host "LiquidMesh code: $($result.swap.code)"
        }

        if ($result.swap.msg) {
            Write-Host "LiquidMesh message: $($result.swap.msg)"
        }

        if ($result.swap.data) {
            Write-Host ""
            Write-Host "SWAP DATA:"
            $result.swap.data | ConvertTo-Json -Depth 40
        }
    }

    Write-Host ""
    Write-Host "========== COMPLETE JSON ==========" -ForegroundColor Cyan

    $result | ConvertTo-Json -Depth 40

}
catch {

    Write-Host "Response is not valid JSON." -ForegroundColor Red
    Write-Host $responseText

}

# 8. Final status

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan

if ($statusCode -ge 200 -and $statusCode -lt 300) {

    Write-Host "Diagnostic request completed." -ForegroundColor Green

}
elseif ($statusCode -gt 0) {

    Write-Host "Diagnostic request returned HTTP $statusCode." -ForegroundColor Red

}
else {

    Write-Host "No valid HTTP response was received." -ForegroundColor Red

}

Write-Host ""
Write-Host "No blockchain transaction was signed or broadcast by this script." -ForegroundColor Yellow
Write-Host ""
