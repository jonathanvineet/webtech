#!/bin/bash

# Simple but reliable startup script
echo "🎨 Starting Artist Gallery..."
echo ""

cd "$(dirname "$0")"

# Clean up any existing processes
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:4200 | xargs kill -9 2>/dev/null

# Start backend
echo "Starting backend..."
cd backend
node server.js &
BACKEND_PID=$!
cd ..

sleep 2

# Start frontend
echo "Starting frontend..."
cd frontend
npx ng serve --host 0.0.0.0 --port 4200 --disable-host-check &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Servers starting..."
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:4200 (wait ~60 seconds)"
echo ""
echo "Press Ctrl+C to stop"

# Cleanup function
cleanup() {
    echo ""
    echo "Stopping..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    lsof -ti:3000,4200 | xargs kill -9 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Keep running
while true; do
    sleep 1
done
