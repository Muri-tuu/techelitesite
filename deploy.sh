#!/bin/bash

# Deploy script for TechElite site
echo "🚀 Starting deployment process..."

# Build the project
echo "📦 Building project..."
npm run build:prod

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Add all changes
    git add .
    
    # Commit changes
    git commit -m "🚀 Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    
    # Push to main
    git push origin main
    
    echo "✅ Changes pushed to main branch"
    echo "🔄 Vercel should automatically deploy from main branch"
    echo "📱 Check your Vercel dashboard for deployment status"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi