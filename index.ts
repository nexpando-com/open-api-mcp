import { FastMCP } from 'fastmcp'
import { createApiClient } from './open-api.client'
import { getTool } from './get-tool'
import { getAxiosInstance } from './get-axios'

const serverName = process.env.MCP_NAME || 'OpenApi MCP server'
const serverVersion = process.env.MCP_VERSION || '0.0.1'
const transportType = process.env.MCP_TRANSPORT_TYPE || 'sse'

const server = new FastMCP({
  name: serverName,
  // @ts-ignore
  version: serverVersion,
})

const API_URL = process.env.API_URL || ''
const PORT = process.env.PORT || 3000

if (!API_URL) throw Error('API_URL is not defined!')

;(async () => {
  const axiosInstance = await getAxiosInstance()

  const zodiosApiClient = createApiClient(API_URL, {
    validate: 'request',
    axiosInstance,
  })

  const endpoints = zodiosApiClient.api
  for (const endpoint of endpoints) {
    const { method, alias } = endpoint
    if (!method || !alias) {
      continue
    }
    const tool = await getTool(zodiosApiClient, endpoint)
    console.log(`Tool ${tool.name} added to ${serverName}.`)
    server.addTool(tool)
  }

  let serverOptions = { transportType } as any
  if (transportType == 'sse') {
    serverOptions = {
      ...serverOptions,
      sse: {
        endpoint: '/sse',
        port: Number(PORT),
      },
    }
  }

  try {
    await server.start(serverOptions)
    console.log(`${serverName} ${serverVersion} running as ${transportType}`)
  } catch (error) {
    console.error(`Failed to start ${serverName} ${serverVersion}`, error)
    process.exit(1)
  }
})()
