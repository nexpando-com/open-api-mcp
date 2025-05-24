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

## Setup environment variables

```
cp .env.template .env

# edit metabase parameters in .env file

API_URL=
METABASE_USERNAME=
METABASE_PASSWORD=
```
## Up

```sh
WARN[0000] The "API_KEY" variable is not set. Defaulting to a blank string. 
[+] Running 0/1
 ⠙ Container metabase-mcp  Recreated                                                                                                                                                          0.1s 
Attaching to metabase-mcp
metabase-mcp  | Generating API client from provided OpenAPI schema file: /app/specs/open-api.json
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
...
metabase-mcp  | [FastMCP info] server is running on HTTP Stream at http://localhost:3000/stream
metabase-mcp  | Metabase MCP 0.0.1 running as httpStream
```

## Setup MCP in Librechat

- `librechat.yml`

```
mcpServers:
  metabase:
    type: streamable-http
    url: http://metabase:3000/stream
```