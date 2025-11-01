#!/bin/bash
# Quick Start - Artist Gallery Platform

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║              🎨 ARTIST GALLERY PLATFORM 🎨                 ║"
echo "║                                                            ║"
echo "║               ONE COMMAND TO START IT ALL!                 ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Starting your artist gallery application..."
echo ""

# Change to script directory
cd "$(dirname "$0")"

# Check if dependencies are installed
if [ ! -d "backend/node_modules" ] || [ ! -d "frontend/node_modules" ]; then
    echo "⚠️  Dependencies not installed. Running setup..."
    echo ""
    ./setup.sh
    echo ""
fi

# Start the application
./start.sh
