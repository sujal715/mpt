#!/bin/bash

echo "🚀 Deploying to GitHub Pages..."

# Build the project
cd frontend
npm run build

# Create a new branch for deployment
cd ..
git checkout -b gh-pages

# Copy build files to root
cp -r frontend/build/* .

# Add and commit
git add .
git commit -m "Deploy to GitHub Pages"

# Push to GitHub Pages branch
git push origin gh-pages

# Go back to main branch
git checkout main

echo "✅ GitHub Pages deployment complete!"
echo "🌐 Your site will be available at: https://sujal715.github.io/mpt/"
