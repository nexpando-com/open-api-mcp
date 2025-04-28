# Mailgun - MCP Server Example
In this example we implement custom authentication and expose a `get events` API of `mailgun`
- Write a `get-axios.ts` file

```javascript
import axios from 'axios'

console.log('Customizing axios instance...')
export const getAxiosInstance = () => {
  const auth = Buffer.from(`api:${process.env.API_KEY}`).toString("base64");
  const options = {
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }
  const instance = axios.create(options)
  return instance
}
```

- `docker-compose.yml`

```
services:
  mailgun-mcp:
    image: nexpando/open-api-mcp
    container_name: mailgun-mcp
    #ports:
    #  - "3000:3000"
    volumes:
    - type: bind
      source: ./get-axios.ts
      target: /app/get-axios.ts
    - type: bind
      source: ./open-api.yml
      target: /app/open-api.yml
    environment:
      - OPEN_API_FILE=/app/open-api.yml
      - API_URL=https://api.mailgun.net
      - API_KEY=secret
      - MCP_NAME=Mailgun MCP
      - MCP_VERSION=0.0.1
```

- Up

```sh
docker-compose up

[+] Running 0/1
 ⠙ Container mailgun-mcp  Recreated                                                                                                                                                               0.1s 
Attaching to mailgun-mcp
mailgun-mcp  | Generating API client from provided OpenAPI schema file: /app/open-api.yml
mailgun-mcp  | Overried axios instance...
mailgun-mcp  | Tool get-v3-events added to Mailgun MCP.
mailgun-mcp  | [FastMCP info] server is running on SSE at http://localhost:3000/sse
mailgun-mcp  | Mailgun MCP 0.0.1 running as sse
```