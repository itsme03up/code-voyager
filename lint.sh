#!/bin/zsh

# Python lint
if [ -f backend/requirements.txt ]; then
  echo "Running flake8 for Python..."
  flake8 backend/app || exit 1
  echo "Running black for Python..."
  black --check backend/app || exit 1
fi

# TypeScript lint
if [ -f frontend/package.json ]; then
  echo "Running eslint for TypeScript..."
  cd frontend && npx eslint src --ext .ts,.tsx || exit 1
  cd ..
fi

echo "Lint checks passed!"
