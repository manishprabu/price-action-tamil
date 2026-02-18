# Frontend Update Script
# This script only builds the React app and pushes it to S3 (and invalidates CloudFront if applicable).
# It skips the CloudFormation stack deployment to save time.

$StackName = "price-action-tamil-stack"
$Region = "ap-south-1"
$Profile = "pat"

Write-Host "--- Starting Frontend Update ---" -ForegroundColor Cyan

# 1. Get the API URL from Stack Outputs and write to .env.production
Write-Host "1. Retrieving API URL from stack outputs..." -ForegroundColor Yellow
$ApiUrl = aws cloudformation describe-stacks --stack-name $StackName --region $Region --profile $Profile --query "Stacks[0].Outputs[?OutputKey=='ApiUrl'].OutputValue" --output text

if ([string]::IsNullOrEmpty($ApiUrl) -or $ApiUrl -eq "None") {
    Write-Host "Warning: Could not retrieve API URL from stack outputs. Proceeding without it." -ForegroundColor Yellow
}
else {
    Write-Host "API URL: $ApiUrl" -ForegroundColor Cyan
    $EnvContent = "VITE_API_URL=$ApiUrl"
    Set-Content -Path ".env.production" -Value $EnvContent
    Write-Host "Updated .env.production with VITE_API_URL" -ForegroundColor Green
}

# 2. Build the React project
Write-Host "2. Building the project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Build failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

# 3. Get the S3 Bucket Name from Stack Outputs
Write-Host "3. Retrieving S3 Bucket Name..." -ForegroundColor Yellow
$BucketName = aws cloudformation describe-stacks --stack-name $StackName --region $Region --profile $Profile --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text

if ([string]::IsNullOrEmpty($BucketName) -or $BucketName -eq "None") {
    Write-Host "Error: Could not retrieve S3 Bucket Name from stack outputs. Make sure the stack is deployed." -ForegroundColor Red
    exit 1
}

# 4. Sync build folder to S3
Write-Host "4. Syncing build files to S3 bucket: $BucketName..." -ForegroundColor Yellow
aws s3 sync dist/ "s3://$BucketName" --delete --region $Region --profile $Profile

# 5. Invalidate CloudFront
$DistributionId = aws cloudformation describe-stacks --stack-name $StackName --region $Region --profile $Profile --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" --output text

if (-not [string]::IsNullOrEmpty($DistributionId) -and $DistributionId -ne "None") {
    Write-Host "5. Invalidating CloudFront cache for Distribution: $DistributionId..." -ForegroundColor Yellow
    aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*" --profile $Profile
}
else {
    Write-Host "5. No CloudFront Distribution ID found in stack outputs. Skipping invalidation." -ForegroundColor DarkGray
}

Write-Host "`n--- Frontend Update Successful! ---" -ForegroundColor Green
