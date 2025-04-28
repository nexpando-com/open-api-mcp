import z from 'zod'
import { sanitize } from './utils'

export const getTool = async (client: any, endpoint: any) => {
  const { alias, description, method } = endpoint
  const parameters = getParameters(endpoint)

  const execute = async (args: any) => {
    try {
      const _args = getQueryParams(endpoint, args)
      const { params, queries, body } = _args
      let resp
      if (method === 'delete') {
        resp = await client[alias](null, { params, queries })
      } else if (body) {
        resp = await client[alias](body, { params })
      } else {
        resp = await client[alias]({ params, queries })
      }
      const text = JSON.stringify(resp, null, 2)
      return {
        content: [
          {
            type: 'text',
            text,
          },
        ],
      }
    } catch (error) {
      // @ts-ignore
      const text = JSON.stringify({ error: `Failed to execute tool: ${error.message || 'Unknown error'}` })
      return {
        content: [
          {
            type: 'text',
            text,
          },
        ],
      }
    }
  }

  const tool = builder()
    .name(alias)
    .description(description || alias)
    .parameters(parameters)
    .execute(execute)
    .build()
  return tool
}

export const getParameters = (endpoint: any) => {
  const { parameters = [] } = endpoint
  const object = parameters.reduce((acc: any, param: any) => {
    const { name, schema, type } = param
    if (name && schema) {
      if (type?.toLowerCase() === 'body') {
        if (schema.shape) {
          // Merge the body schema fields into the parameters
          Object.entries(schema.shape).forEach(([fieldName, fieldSchema]) => {
            acc[fieldName] = fieldSchema
          })
        } else {
          // If we can't extract the shape, use the whole schema as a parameter
          acc[name] = schema
        }
      } else {
        // For other parameter types (query, path), use as is
        acc[name] = schema
      }
    }
    return acc
  }, {})
  return z.object(object)
}

export const getQueryParams = (endpoint: any, args: any) => {
  const { parameters = [], method = 'get' } = endpoint

  const queries = {} as any
  const params = {} as any
  let body = undefined as any
  const keys = Object.keys(args)
  for (const key of keys) {
    const param = parameters.find((param: any) => param.name === key)
    if (param) {
      const { type } = param
      if (type?.toLowerCase() === 'query') {
        queries[key] = args[key] === null ? '' : args[key]
      } else if (type?.toLowerCase() === 'path') {
        params[key] = args[key]
      } else if (type?.toLowerCase() === 'body') {
        body = args[key]
      }
    } else {
      if (!body) body = {}
      body[key] = args[key]
    }
  }

  if (body) {
    return { queries, params, body }
  }
  return { queries, params }
}

export const builder = () => {
  let tool = {} as any
  const name = (_name: string) => {
    tool.name = sanitize(_name)
    return api
  }

  const description = (_desc: string) => {
    tool.description = _desc
    return api
  }

  const parameters = (_params: any) => {
    tool.parameters = _params
    return api
  }

  const execute = (_execute: Function) => {
    tool.execute = _execute
    return api
  }

  const build = () => {
    return tool
  }

  const api = {
    name,
    description,
    parameters,
    execute,
    build,
  }

  return api
}
