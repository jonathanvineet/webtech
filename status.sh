#!/bin/bash
# Check status of Artist Gallery servers

echo "🎨 Artist Gallery - Server Status"
echo "=================================="
echo ""

# Check backend
if curl -s http://localhost:3000/api/artists > /dev/null 2>&1; then
    echo "✅ Backend:  RUNNING at http://localhost:3000"
else
    echo "❌ Backend:  NOT RUNNING"
fi

# Check frontend
if curl -s http://localhost:4200 > /dev/null 2>&1; then
    echo "✅ Frontend: RUNNING at http://localhost:4200"
else
    echo "❌ Frontend: NOT RUNNING"
fi

echo ""
echo "Processes:"
ps aux | grep -E "(node server.js|ng serve)" | grep -v grep | awk '{print "  PID "$2": "$11" "$12" "$13}'

echo ""
echo "Ports:"
lsof -i :3000,4200 2>/dev/null | tail -n +2 || echo "  No processes found"

echo ""
