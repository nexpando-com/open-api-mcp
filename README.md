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
