#!/bin/bash

echo "🎨 Starting Artist Gallery Application"
echo "======================================"
echo ""

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Kill any existing processes on these ports
echo "Checking for existing processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:4200 | xargs kill -9 2>/dev/null
sleep 1

# Start backend in background
echo "🚀 Starting backend server..."
cd "$SCRIPT_DIR/backend"
nohup node server.js > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"

# Wait for backend to start
sleep 3

# Check if backend started successfully
if ps -p $BACKEND_PID > /dev/null && curl -s http://localhost:3000/api/artists > /dev/null 2>&1; then
    echo "✅ Backend running on http://localhost:3000"
else
    echo "❌ Failed to start backend"
    echo "Last 20 lines of backend.log:"
    tail -20 backend.log
    exit 1
fi

echo ""
echo "🚀 Starting frontend..."
cd "$SCRIPT_DIR/frontend"
nohup npx ng serve --port 4200 --host 0.0.0.0 > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"

cd "$SCRIPT_DIR"

echo ""
echo "✅ Application is starting..."
echo ""
echo "   📡 Backend:  http://localhost:3000"
echo "   🎨 Frontend: http://localhost:4200"
echo ""
echo "   📋 Logs:"
echo "      Backend:  tail -f backend.log"
echo "      Frontend: tail -f frontend.log"
echo ""
echo "⏳ Waiting for frontend to compile (30-60 seconds)..."
echo ""
echo "💡 TIP: This terminal will stay open. Press Ctrl+C to stop both servers"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    
    # Kill any remaining processes on these ports
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    lsof -ti:4200 | xargs kill -9 2>/dev/null
    
    echo "✅ Servers stopped"
    exit 0
}

# Trap Ctrl+C and other termination signals
trap cleanup SIGINT SIGTERM EXIT

# Wait for frontend to be ready
echo "Waiting for Angular compilation..."
sleep 15

# Check if frontend is accessible
for i in {1..20}; do
    if curl -s http://localhost:4200 > /dev/null 2>&1; then
        echo ""
        echo "════════════════════════════════════════════════════════"
        echo ""
        echo "   🎉 SUCCESS! Application is ready!"
        echo ""
        echo "   👉 Open your browser to:"
        echo "      http://localhost:4200"
        echo ""
        echo "   📊 Both servers are running:"
        echo "      ✅ Backend:  http://localhost:3000/api/artists"
        echo "      ✅ Frontend: http://localhost:4200"
        echo ""
        echo "════════════════════════════════════════════════════════"
        echo ""
        echo "Keep this terminal open. Press Ctrl+C to stop servers."
        echo ""
        break
    fi
    if [ $i -eq 20 ]; then
        echo ""
        echo "⚠️  Frontend is still compiling..."
        echo "   It might take a bit longer. Check: http://localhost:4200"
        echo "   Or check frontend.log for details"
        echo ""
    fi
    sleep 3
done

# Keep script running and monitor processes
while true; do
    if ! ps -p $BACKEND_PID > /dev/null; then
        echo "❌ Backend stopped unexpectedly!"
        cat backend.log
        cleanup
    fi
    if ! ps -p $FRONTEND_PID > /dev/null; then
        echo "❌ Frontend stopped unexpectedly!"
        tail -50 frontend.log
        cleanup
    fi
    sleep 5
done
