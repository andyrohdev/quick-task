#!/usr/bin/env sh

# Exit on errors
set -e

# Build
npm run build

# Vercel
vercel --prod
