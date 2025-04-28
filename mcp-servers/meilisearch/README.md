# Meilisearch MCP Server

This is an example to create `meilisearch` `mcp server` with its `open-api.json`

- Download the specs from [github](https://github.com/meilisearch/open-api/blob/main/open-api.json) to the current directory
- `docker-compose.yml`

```yml
services:
  meilisearch-mcp:
    image: nexpando/open-api-mcp
    container_name: meilisearch-mcp
    ports:
      - "3000:3000"
    volumes:
    - type: bind
      source: ./open-api.json
      target: /app/open-api.json
    environment:
      - OPEN_API_FILE=/app/open-api.json
      - API_URL=https://meilisearch:7700
      - API_KEY=secret
      - MCP_NAME=Meilisearch MCP
      - MCP_VERSION=0.0.1
```

- Up

```
docker-compose up
[+] Running 1/2
 ✔ Network meilisearch_default  Created                                                                                                                                                0.1s 
 ⠙ Container meilisearch-mcp    Created                                                                                                                                                0.1s 
Attaching to meilisearch-mcp
meilisearch-mcp  | Generating API client from provided OpenAPI schema file: /app/open-api.json
meilisearch-mcp  | Tool get_batches added to Meilisearch MCP.
meilisearch-mcp  | Tool get_batch added to Meilisearch MCP.
meilisearch-mcp  | Tool create_dump added to Meilisearch MCP.
meilisearch-mcp  | Tool get_features added to Meilisearch MCP.
meilisearch-mcp  | Tool patch_features added to Meilisearch MCP.
meilisearch-mcp  | Tool get_health added to Meilisearch MCP.
meilisearch-mcp  | Tool list_indexes added to Meilisearch MCP.
meilisearch-mcp  | Tool create_index added to Meilisearch MCP.
meilisearch-mcp  | Tool get_index added to Meilisearch MCP.
...
```