#!/bin/bash

echo "🚀 PowerUp & Win - Docker Deployment"
echo "=================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first:"
    echo "   https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Build the Docker image
echo "🔨 Building Docker image..."
docker-compose build

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    
    # Start the container
    echo "🚀 Starting PowerUp & Win app..."
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 SUCCESS! Your PowerUp & Win app is now running!"
        echo ""
        echo "📍 App URL: http://localhost:3000"
        echo "📍 Admin URL: http://localhost:3000/admin"
        echo ""
        echo "📋 Useful commands:"
        echo "   • View logs: docker-compose logs -f"
        echo "   • Stop app: docker-compose down"
        echo "   • Restart app: docker-compose restart"
        echo "   • Update app: docker-compose up --build -d"
        echo ""
        echo "🌐 To deploy to a server:"
        echo "   1. Copy this entire folder to your server"
        echo "   2. Run: ./deploy-docker.sh"
        echo "   3. Your app will be available on port 3000"
    else
        echo "❌ Failed to start the app"
        exit 1
    fi
else
    echo "❌ Failed to build Docker image"
    exit 1
fi



