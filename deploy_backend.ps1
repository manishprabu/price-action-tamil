# AWS Backend Deployment Script for Price Action Tamil
# This script deploys the CloudFormation stack (Lambda, API) without rebuilding/syncing the frontend.

$StackName = "price-action-tamil-stack"
$CertStackName = "price-action-tamil-cert-stack"
$Region = "ap-south-1"
$CertRegion = "us-east-1"
$Profile = "pat"

Write-Host "--- Starting Backend Deployment to AWS ---" -ForegroundColor Cyan

# 1. Get Certificate ARN (Deployed previously or separately)
$CertArn = aws cloudformation describe-stacks --stack-name $CertStackName --region $CertRegion --profile $Profile --query "Stacks[0].Outputs[?OutputKey=='CertificateArn'].OutputValue" --output text

if (-not $CertArn -or $CertArn -eq "None") {
    Write-Host "Error: Certificate ARN not found. Please run full deploy.ps1 first or ensure cert stack is deployed." -ForegroundColor Red
    exit 1
}

Write-Host "Certificate ARN: $CertArn" -ForegroundColor Cyan

# 2. Check if stack exists
Write-Host "Checking if stack exists..." -ForegroundColor Yellow
$StackExists = aws cloudformation describe-stacks --stack-name $StackName --region $Region --profile $Profile 2>$null
$StackFound = $LASTEXITCODE -eq 0

# 3. Deploy Main CloudFormation Stack (ap-south-1)
Write-Host "Deploying CloudFormation stack to $Region..." -ForegroundColor Yellow

if ($StackFound) {
    # Stack exists - only pass CertificateArn to avoid recreating bucket
    Write-Host "Stack exists. Updating with CertificateArn only..." -ForegroundColor Cyan
    aws cloudformation deploy `
        --stack-name $StackName `
        --template-file infrastructure/template.yaml `
        --region $Region `
        --profile $Profile `
        --parameter-overrides CertificateArn=$CertArn `
        --capabilities CAPABILITY_IAM `
        --no-fail-on-empty-changeset
}
else {
    # New stack - pass both parameters
    Write-Host "Creating new stack..." -ForegroundColor Cyan
    $BucketNameParam = "price-action-tamil-$(Get-Random -Minimum 1000 -Maximum 9999)"
    aws cloudformation deploy `
        --stack-name $StackName `
        --template-file infrastructure/template.yaml `
        --region $Region `
        --profile $Profile `
        --parameter-overrides BucketName=$BucketNameParam CertificateArn=$CertArn `
        --capabilities CAPABILITY_IAM `
        --no-fail-on-empty-changeset
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: CloudFormation deployment failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

# 3. Get the Outputs from Stack and write to .env.production
Write-Host "`n--- Backend Deployment Successful! ---" -ForegroundColor Green
$Outputs = aws cloudformation describe-stacks --stack-name $StackName --region $Region --profile $Profile --query "Stacks[0].Outputs" --output json | ConvertFrom-Json

$ApiUrl = ($Outputs | Where-Object { $_.OutputKey -eq "ApiUrl" }).OutputValue
$UserPoolId = ($Outputs | Where-Object { $_.OutputKey -eq "UserPoolId" }).OutputValue
$UserPoolClientId = ($Outputs | Where-Object { $_.OutputKey -eq "UserPoolClientId" }).OutputValue

if ([string]::IsNullOrEmpty($ApiUrl) -or $ApiUrl -eq "None") {
    Write-Host "Warning: Could not retrieve API URL from stack outputs." -ForegroundColor Yellow
}
else {
    Write-Host "Proxy API URL: $ApiUrl" -ForegroundColor Cyan
    Write-Host "User Pool ID: $UserPoolId" -ForegroundColor Cyan
    Write-Host "User Pool Client ID: $UserPoolClientId" -ForegroundColor Cyan
    
    $EnvContent = @(
        "VITE_API_URL=$ApiUrl",
        "VITE_COGNITO_USER_POOL_ID=$UserPoolId",
        "VITE_COGNITO_CLIENT_ID=$UserPoolClientId"
    )
    $EnvContent | Set-Content -Path ".env.production"
    Write-Host "Updated .env.production with API URL and Cognito IDs" -ForegroundColor Green
}
