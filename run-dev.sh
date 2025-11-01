#!/bin/bash
# Artist Gallery - Development Server

cd "$(dirname "$0")"

echo "🎨 Artist Gallery - Starting Development Servers"
echo "================================================"
echo ""

# Kill existing processes
pkill -f "node.*server.js" 2>/dev/null
pkill -f "ng serve" 2>/dev/null
lsof -ti:3000,4200 | xargs kill -9 2>/dev/null
sleep 1

# Start backend
echo "[1/2] Starting Backend API..."
cd backend
node server.js > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo "      PID: $BACKEND_PID"
cd ..

sleep 2

# Verify backend
if curl -s http://localhost:3000/api/artists > /dev/null 2>&1; then
    echo "      ✅ Backend ready at http://localhost:3000"
else
    echo "      ⚠️  Backend starting..."
fi

echo ""
echo "[2/2] Starting Frontend (Angular)..."
cd frontend
npx ng serve --host 0.0.0.0 --port 4200 --disable-host-check > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "      PID: $FRONTEND_PID"
cd ..

echo ""
echo "================================================"
echo ""
echo "✅ Servers are running!"
echo ""
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:4200"
echo ""
echo "   Logs:"
echo "   • tail -f logs/backend.log"
echo "   • tail -f logs/frontend.log"
echo ""
echo "⏳ Frontend will be ready in ~30-60 seconds"
echo "   Open http://localhost:4200 in your browser"
echo ""
echo "================================================"
echo ""
echo "💡 Keep this terminal open!"
echo "   Press Ctrl+C to stop both servers"
echo ""

# Trap signals
cleanup() {
    echo ""
    echo "🛑 Shutting down..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    pkill -P $BACKEND_PID 2>/dev/null
    pkill -P $FRONTEND_PID 2>/dev/null
    lsof -ti:3000,4200 | xargs kill -9 2>/dev/null
    echo "✅ Stopped"
    exit 0
}

trap cleanup INT TERM

# Monitor and keep alive
while true; do
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo "❌ Backend died! Check logs/backend.log"
        cleanup
    fi
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo "❌ Frontend died! Check logs/frontend.log"
        cleanup
    fi
    sleep 2
done
