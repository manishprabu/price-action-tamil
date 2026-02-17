# AWS S3 Deployment Script for Price Action Tamil
# This script builds the project and deploys it to the S3 bucket created via CloudFormation.

$StackName = "price-action-tamil-stack"
$CertStackName = "price-action-tamil-cert-stack"
$Region = "ap-south-1"
$CertRegion = "us-east-1"
$Profile = "pat"

Write-Host "--- Starting Deployment to AWS ---" -ForegroundColor Cyan

# 1. Build the React project
Write-Host "1. Building the project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Build failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

# 2. Deploy Certificate Stack (us-east-1)
Write-Host "2. Deploying Certificate Stack to $CertRegion..." -ForegroundColor Yellow
aws cloudformation deploy `
    --stack-name $CertStackName `
    --template-file infrastructure/certificate.yaml `
    --region $CertRegion `
    --profile $Profile `
    --capabilities CAPABILITY_IAM `
    --no-fail-on-empty-changeset

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Certificate deployment failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

$CertArn = aws cloudformation describe-stacks --stack-name $CertStackName --region $CertRegion --profile $Profile --query "Stacks[0].Outputs[?OutputKey=='CertificateArn'].OutputValue" --output text
Write-Host "Certificate ARN: $CertArn" -ForegroundColor Cyan

# 3. Deploy Main CloudFormation Stack (ap-south-1)
Write-Host "3. Deploying Main CloudFormation stack to $Region..." -ForegroundColor Yellow
$BucketNameParam = "price-action-tamil-$(Get-Random -Minimum 1000 -Maximum 9999)"

aws cloudformation deploy `
    --stack-name $StackName `
    --template-file infrastructure/template.yaml `
    --region $Region `
    --profile $Profile `
    --parameter-overrides BucketName=$BucketNameParam CertificateArn=$CertArn `
    --capabilities CAPABILITY_IAM `
    --no-fail-on-empty-changeset

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: CloudFormation deployment failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

# 4. Sync build folder to S3
$BucketName = aws cloudformation describe-stacks --stack-name $StackName --region $Region --profile $Profile --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text

if ([string]::IsNullOrEmpty($BucketName) -or $BucketName -eq "None") {
    Write-Host "Error: Could not retrieve S3 Bucket Name from stack outputs." -ForegroundColor Red
    exit 1
}

Write-Host "4. Syncing dist/ to s3://$BucketName..." -ForegroundColor Yellow
aws s3 sync dist/ "s3://$BucketName" --delete --region $Region --profile $Profile

# 5. Get Website URL
$WebsiteURL = aws cloudformation describe-stacks --stack-name $StackName --region $Region --profile $Profile --query "Stacks[0].Outputs[?OutputKey=='WebsiteURL'].OutputValue" --output text

Write-Host "`n--- Deployment Successful! ---" -ForegroundColor Green
Write-Host "Your website is live at: $WebsiteURL" -ForegroundColor Cyan
