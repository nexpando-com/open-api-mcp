# Metabase MCP Server

This is an example to create `metabase` `mcp server` with its `open-api.json`

- `docker-compose.yml`

```yml
services:
  metabase-mcp:
    image: nexpando/open-api-mcp
    container_name: metabase-mcp
    volumes:
    - type: bind
      source: ./get-axios.ts
      target: /app/get-axios.ts
    - ./specs:/app/specs
    environment:
      - OPEN_API_FILE=/app/specs/open-api.json
      - API_URL=${API_URL}
      - METABASE_USERNAME=${METABASE_USERNAME}
      - METABASE_PASSWORD=${METABASE_PASSWORD}
      - MCP_NAME=Metabase MCP
      - MCP_VERSION=0.0.1
```

- Up

```sh
docker-compose up
WARN[0000] The "API_KEY" variable is not set. Defaulting to a blank string. 
[+] Running 0/1
 ⠙ Container metabase-mcp  Recreated                                                                                                                                                     0.2s 
Attaching to metabase-mcp
metabase-mcp  | Generating API client from provided OpenAPI schema file: /app/specs/open-api.json
metabase-mcp  | session... 07969889-4095-40d5-952c-c9c1c3b5e087
metabase-mcp  | Tool getApiaction added to Metabase MCP.
metabase-mcp  | Tool postApiaction added to Metabase MCP.
metabase-mcp  | Tool getApiactionActionId added to Metabase MCP.
metabase-mcp  | Tool deleteApiactionActionId added to Metabase MCP.
metabase-mcp  | Tool getApiactionActionIdexecute added to Metabase MCP.
metabase-mcp  | Tool putApiactionId added to Metabase MCP.
metabase-mcp  | Tool postApiactionIdexecute added to Metabase MCP.
metabase-mcp  | Tool postApiactionIdpublic_link added to Metabase MCP.
metabase-mcp  | Tool deleteApiactionIdpublic_link added to Metabase MCP.
metabase-mcp  | Tool getApiactionpublic added to Metabase MCP.
metabase-mcp  | Tool getApiactivitymost_recently_viewed_dashboard added to Metabase MCP.
metabase-mcp  | Tool getApiactivitypopular_items added to Metabase MCP.
metabase-mcp  | Tool getApiactivityrecent_views added to Metabase MCP.
metabase-mcp  | Tool getApiactivityrecents added to Metabase MCP.
metabase-mcp  | Tool postApiactivityrecents added to Metabase MCP.
...
metabase-mcp  | [FastMCP info] server is running on SSE at http://localhost:3000/sse
metabase-mcp  | Metabase MCP 0.0.1 running as sse
```