#!/bin/bash

echo "🎨 Artist Gallery - Setup Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..
echo "✅ Backend dependencies installed"
echo ""

# Install Angular CLI globally if not present
if ! command -v ng &> /dev/null; then
    echo "📦 Installing Angular CLI..."
    npm install -g @angular/cli@16
    if [ $? -ne 0 ]; then
        echo "⚠️  Failed to install Angular CLI globally, continuing..."
    fi
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..
echo "✅ Frontend dependencies installed"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "  Backend:  cd backend && node server.js"
echo "  Frontend: cd frontend && npm start"
echo ""
