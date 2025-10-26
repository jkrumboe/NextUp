# Pre-push hook for Windows (PowerShell)
# This script runs before git push

Write-Host "🚀 Pre-push: Checking version..." -ForegroundColor Cyan

# Check if we're pushing to main branch
$currentBranch = git symbolic-ref --short HEAD

if ($currentBranch -eq "main" -or $currentBranch -eq "master") {
    Write-Host "📦 Pushing to main branch - checking for version bump..." -ForegroundColor Yellow
    
    # Check if version was already bumped in this commit
    $versionChanged = git diff HEAD~1 HEAD -- package.json | Select-String '"version"'
    
    if (-not $versionChanged) {
        Write-Host "⚠️  Version not bumped. Please run: pnpm version:bump [major|minor|patch]" -ForegroundColor Red
        Write-Host "Or to skip version bump: git push --no-verify" -ForegroundColor Yellow
        exit 1
    } else {
        Write-Host "✅ Version was bumped in last commit" -ForegroundColor Green
    }
}

exit 0
