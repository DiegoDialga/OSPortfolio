#!/bin/bash

echo "🚀 Starting Backend…"
cd backend
npm install
npm start &
BACKEND_PID=$!

echo "🚀 Starting Frontend…"
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo "✔ Both servers running!"

# Wait so user can Ctrl+C to kill both
wait $FRONTEND_PID $BACKEND_PID
