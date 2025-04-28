# open-api-mcp

Open API MCP is a command line tool that generates MCP server based on a OpenApi specifications.

Generate a MCP server based on OpenAPI specifications

# How it works

```
git clone https://github.com/nexpando-com/open-api-mcp.git

cd open-api-mcp

bun install

# prepare an openapi specs
wget -q -O open-api.json https://fakestoreapi.com/fakestoreapi.json

# or using curl
curl -o open-api.json https://fakestoreapi.com/fakestoreapi.json

# start mcp server
./cli.sh open-api.json
```

# Docker
- Create an `open-api.json` or `open-api.yml` in the current directory
- Create `docker-compose.yml` file
- For example:

```
services:
  open-api-mcp:
    image: nexpando/open-api-mcp
    container_name: open-api-mcp
    ports:
      - "3000:3000"
    volumes:
    - type: bind
      source: ./open-api.json
      target: /app/open-api.json
    environment:
      - OPEN_API_FILE=/app/open-api.json
      - API_URL=  # Example: https://fakestoreapi.com
      # - API_KEY
      # - MCP_NAME=My MCP Server
      # - MCP_VERSION=1.0.0
      # - MCP_TRANSPORT_TYPE=sse|stdio
```

- Replace `API_URL` and `API_KEY` with your data
- Start `mcp server`

```
docker-compose up
```

# References

- [zodios](https://github.com/ecyrbe/zodios)
- [openapi-zod-cliet](https://github.com/astahmer/openapi-zod-client)
- [FastCMP](https://github.com/punkpeye/fastmcp)
