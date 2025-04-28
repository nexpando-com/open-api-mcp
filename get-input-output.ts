import path from 'path'
import { parseArgs } from 'util'

const args = Bun.argv
const { values, positionals } = parseArgs({
  args,
  options: {
    'open-api': {
      type: 'string',
    },
    out: {
      type: 'string',
    },
  },
  strict: true,
  allowPositionals: true,
})

export const getOpenApiFile = () => {
  let file = process.env.OPEN_API_FILE

  if (!file) {
    file = values['open-api']
  }

  if (!file && positionals.length >= 2) {
    file = positionals[2]
  }

  if (!file) {
    throw new Error('Open api file not available')
  }
  const fullPath = path.resolve(file)
  return fullPath
}

export const getOpenApiClientFile = () => {
  let file = 'open-api.client.ts'
  const fullPath = path.resolve(file)
  return fullPath
}
