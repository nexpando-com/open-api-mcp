# Pocketbase MCP Server

This is an example to create `pocketbase` `mcp server` with its `open-api.json`

- `docker-compose.yml`

```yml
services:
  pocketbase-mcp:
    image: nexpando/open-api-mcp
    container_name: pocketbase-mcp
    ports:
      - "3000:3000"
    volumes:
    - type: bind
      source: ./get-axios.ts
      target: /app/get-axios.ts
    - ./specs:/app/specs
    environment:
      - OPEN_API_FILE=/app/specs/open-api.yml
      - API_URL=http://pocketbase:8080
      - API_KEY=${API_KEY}
      - MCP_NAME=Pocketbase MCP
      - MCP_VERSION=0.0.1
```

- Up

```sh
docker-compose up

 ✔ Container pocketbase-mcp  Created                                                                                                                                                     0.0s 
Attaching to pocketbase-mcp
pocketbase-mcp  | Generating API client from provided OpenAPI schema file: /app/specs/open-api.yml
pocketbase-mcp  | Tool get-collections added to Pocketbase MCP.
pocketbase-mcp  | Tool get-collection added to Pocketbase MCP.
pocketbase-mcp  | [FastMCP info] server is running on SSE at http://localhost:3000/sse
pocketbase-mcp  | Pocketbase MCP 0.0.1 running as sse
```