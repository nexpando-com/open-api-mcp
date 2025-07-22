# open-api-mcp

Open API MCP is a command-line tool that generates an MCP (Model Context Protocol) server based on OpenAPI specifications.

It simplifies the process of creating API clients and servers by leveraging OpenAPI schemas and generating strongly-typed clients using Zod.

## Features

- Generate MCP servers from OpenAPI specifications.
- Automatically create Zod-based API clients for type-safe interactions.
- Supports both JSON and YAML OpenAPI specification formats.
- Easily configurable via environment variables or Docker Compose.

## How It Works

1. Clone the repository:
   ```sh
   git clone https://github.com/nexpando-com/open-api-mcp.git
   cd open-api-mcp
   ```

2. Install dependencies:
   ```sh
   bun install
   ```

3. Prepare an OpenAPI specification:
   - Download an OpenAPI schema:
     ```sh
     wget -q -O open-api.json https://fakestoreapi.com/fakestoreapi.json
     ```
   - Or use `curl`:
     ```sh
     curl -o open-api.json https://fakestoreapi.com/fakestoreapi.json
     ```

4. Define environment variables:
   ```sh
   cp .env.template .env
   ```

5. Start the MCP server:
   ```sh
   bun dev
   # or
   ./cli.sh open-api.json
   ```
6. Console output:
   ```sh
    Tool loginUser added to OpenApi MCP server.
    Tool getAllCarts added to OpenApi MCP server.
    Tool addCart added to OpenApi MCP server.
    Tool getCartById added to OpenApi MCP server.
    Tool updateCart added to OpenApi MCP server.
    Tool deleteCart added to OpenApi MCP server.
    Tool getAllProducts added to OpenApi MCP server.
    Tool addProduct added to OpenApi MCP server.
    Tool getProductById added to OpenApi MCP server.
    Tool updateProduct added to OpenApi MCP server.
    Tool deleteProduct added to OpenApi MCP server.
    Tool getAllUsers added to OpenApi MCP server.
    Tool addUser added to OpenApi MCP server.
    Tool getUserById added to OpenApi MCP server.
    Tool updateUser added to OpenApi MCP server.
    Tool deleteUser added to OpenApi MCP server.
    [FastMCP info] server is running on HTTP Stream at http://localhost:3000/stream
    OpenApi MCP server 0.0.1 running as httpStream
   ```

## Docker Setup

1. Create a specs directory:
   ```sh
   mkdir specs
   ```

2. Add your OpenAPI specification (`open-api.json` or `open-api.yml`) to the specs directory.

3. Create a docker-compose.yml file. Example configuration:
   ```yml
   services:
     open-api-mcp:
       image: nexpando/open-api-mcp
       container_name: open-api-mcp
       # ports:
       #  - "3000:3000"
       volumes:
         - ./specs:/app/specs
       environment:
         - OPEN_API_FILE=/app/specs/open-api.json
         - API_URL=  # Example: https://fakestoreapi.com
         # - API_KEY
         # - MCP_NAME=My MCP Server
         # - MCP_VERSION=1.0.0
         # - MCP_TRANSPORT_TYPE=httpStream|sse|stdio
   ```

4. Replace `API_URL` and `API_KEY` with your data.

5. Start the MCP server:
   ```sh
   docker-compose up
   ```

## Example MCP servers in Librechat
- See [https://github.com/danny-avila/LibreChat](https://github.com/danny-avila/LibreChat) 
- `librechat.yaml`

```yml
version: 1.1.4
cache: true
...
mcpServers:
  my-mcp:
    type: streamable-http
    url: http://my-mcp:3000/stream
  mailgun:
    type: streamable-http
    url: http://mailgun-mcp:3000/stream
```

## Project Structure

```
.
├── cli.sh                  # CLI script to start the MCP server
├── generate-client.ts      # Script to generate Zod-based API clients
├── get-input-output.ts     # Utility functions for input/output paths
├── specs/                  # Directory for OpenAPI specifications
├── mcp-servers/            # Example MCP server configurations
├── Dockerfile              # Dockerfile for containerized deployment
├── docker-compose.yml      # Example Docker Compose configuration
├── README.md               # Project documentation
└── ...
```

## Customizing Authentication

The project uses Axios for making HTTP requests, and the default authentication method is configured in the `get-axios.ts` file. By default, it uses a Bearer token retrieved from the `API_KEY` environment variable.

If you need to customize the authentication method (e.g., use a different header, token type, or authentication mechanism), you can override the `get-axios.ts` file. For example:

```typescript
// filepath: [get-axios.ts](http://_vscodecontentref_/1)
import axios from 'axios'

export const getAxiosInstance = () => {
  const options = {
    headers: {
      'X-Custom-Auth': 'YourCustomAuthValue',
      'Content-Type': 'application/json',
    },
  }
  const instance = axios.create(options)
  return instance
}
```

## Customizing Authentication with Docker Compose

The project uses Axios for making HTTP requests, and the default authentication method is configured in the `get-axios.ts` file. By default, it uses a Bearer token retrieved from the `API_KEY` environment variable.

If you are using Docker Compose, you can override the `get-axios.ts` file by mounting a custom version of the file as a volume. This allows you to customize the authentication method without modifying the original source code.

### Steps to Customize

1. Create a custom `get-axios.ts` file with your desired authentication logic. For example:

   ```typescript
   // filepath: ./custom/get-axios.ts
   import axios from 'axios'

   export const getAxiosInstance = () => {
     const options = {
       headers: {
         'X-Custom-Auth': 'YourCustomAuthValue',
         'Content-Type': 'application/json',
       },
     }
     const instance = axios.create(options)
     return instance
   }
   ```

2. Update your `docker-compose.yml` file to override the default `get-axios.ts` file with your custom version:

   ```yml
   services:
     open-api-mcp:
       image: nexpando/open-api-mcp
       container_name: open-api-mcp
       volumes:
         - ./specs:/app/specs
         - ./custom/get-axios.ts:/app/get-axios.ts
       environment:
         - OPEN_API_FILE=/app/specs/open-api.json
         - API_URL= ...
   ```

3. Start the MCP server with Docker Compose:
   ```sh
   docker-compose up
   ```

By overriding the `get-axios.ts` file, you can adapt the project to various authentication schemes, such as API keys, or custom headers, while keeping the original source code intact.

## References
- [open-api-mcp](https://github.com/nexpando-com/open-api-mcp)
- [zodios](https://github.com/ecyrbe/zodios)
- [openapi-zod-client](https://github.com/astahmer/openapi-zod-client)
- [FastMCP](https://github.com/punkpeye/fastmcp)

## License

This project is licensed under the MIT License. See the LICENSE file for details.
