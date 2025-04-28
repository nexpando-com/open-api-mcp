#!/bin/sh

FILE=""

if [ -n "$1" ]; then
  echo "Using openapi specs from command line: $1"
  FILE=$1
else [ -n "$1" ];
  FILE="${OPEN_API_FILE}"
fi

echo "Generating API client from provided OpenAPI schema file: $FILE"
bun generate-client "$FILE"

# Start the application
exec bun run index.ts