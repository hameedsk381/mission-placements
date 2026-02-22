#!/bin/sh

# Wait for database to be ready (optional but good practice)
echo "Ensuring database connectivity..."
npx prisma db push --accept-data-loss

# Start the application
echo "Starting application..."
exec node server.js
