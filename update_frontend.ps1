# Frontend Update Script
# This script only builds the React app and pushes it to S3 (and invalidates CloudFront if applicable).
# It skips the CloudFormation stack deployment to save time.

$StackName = "price-action-tamil-stack"
$Region = "us-east-1"

Write-Host "--- Starting Frontend Update ---" -ForegroundColor Cyan

# 1. Build the React project
Write-Host "1. Building the project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Build failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

# 2. Get the S3 Bucket Name from Stack Outputs
Write-Host "2. Retrieving S3 Bucket Name..." -ForegroundColor Yellow
$BucketName = aws cloudformation describe-stacks --stack-name $StackName --region $Region --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text

if ([string]::IsNullOrEmpty($BucketName) -or $BucketName -eq "None") {
    Write-Host "Error: Could not retrieve S3 Bucket Name from stack outputs. Make sure the stack is deployed." -ForegroundColor Red
    exit 1
}

# 3. Sync build folder to S3
Write-Host "3. Syncing build files to S3 bucket: $BucketName..." -ForegroundColor Yellow
aws s3 sync dist/ "s3://$BucketName" --delete --region $Region

# 4. Invalidate CloudFront (Optional - only if Distribution ID is found)
# Note: The current stack template might not output CloudFrontDistributionId yet.
$DistributionId = aws cloudformation describe-stacks --stack-name $StackName --region $Region --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" --output text

if (-not [string]::IsNullOrEmpty($DistributionId) -and $DistributionId -ne "None") {
    Write-Host "4. Invalidating CloudFront cache for Distribution: $DistributionId..." -ForegroundColor Yellow
    aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*" --region $Region
}
else {
    Write-Host "4. No CloudFront Distribution ID found in stack outputs. Skipping invalidation." -ForegroundColor DarkGray
}

Write-Host "`n--- Frontend Update Successful! ---" -ForegroundColor Green
