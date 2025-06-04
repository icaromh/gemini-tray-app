#!/bin/bash

# Gemini Quick Chat - Development Utilities
# This script provides common development tasks

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
check_directory() {
    if [[ ! -f "package.json" ]] || [[ ! -d "src" ]]; then
        print_error "Please run this script from the project root directory"
        exit 1
    fi
}

# Install dependencies
install_deps() {
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed"
}

# Start development server
dev() {
    print_status "Starting development server..."
    npm start
}

# Build the application
build() {
    print_status "Building application..."
    npm run build
    print_success "Build completed"
}

# Clean build artifacts
clean() {
    print_status "Cleaning build artifacts..."
    rm -rf dist/
    rm -rf node_modules/
    print_success "Cleaned build artifacts"
}

# Run tests
test() {
    print_status "Running tests..."
    npm test
}

# Lint code
lint() {
    print_status "Running linter..."
    npm run lint
}

# Format code
format() {
    print_status "Formatting code..."
    npm run format
}

# Show project structure
structure() {
    print_status "Project structure:"
    tree -I 'node_modules|dist|.git' || ls -la
}

# Show help
help() {
    echo "Gemini Quick Chat - Development Utilities"
    echo ""
    echo "Usage: $0 <command>"
    echo ""
    echo "Available commands:"
    echo "  install     Install dependencies"
    echo "  dev         Start development server"
    echo "  build       Build application for distribution"
    echo "  clean       Clean build artifacts"
    echo "  test        Run tests"
    echo "  lint        Lint code"
    echo "  format      Format code"
    echo "  structure   Show project structure"
    echo "  help        Show this help message"
    echo ""
}

# Main script logic
main() {
    check_directory

    case "${1:-help}" in
        "install")
            install_deps
            ;;
        "dev")
            dev
            ;;
        "build")
            build
            ;;
        "clean")
            clean
            ;;
        "test")
            test
            ;;
        "lint")
            lint
            ;;
        "format")
            format
            ;;
        "structure")
            structure
            ;;
        "help"|*)
            help
            ;;
    esac
}

# Run main function with all arguments
main "$@"
