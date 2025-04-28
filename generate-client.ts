import SwaggerParser from '@apidevtools/swagger-parser'
import type { OpenAPIObject } from 'openapi3-ts'

import { getOpenApiClientFile, getOpenApiFile } from './get-input-output'
import { generateZodClientFromOpenAPI } from 'openapi-zod-client'

const input = getOpenApiFile()
const distPath = getOpenApiClientFile()
const openApiDoc = (await SwaggerParser.bundle(input)) as OpenAPIObject

await generateZodClientFromOpenAPI({
  openApiDoc,
  distPath,
  options: {
    withAlias: true,
    additionalPropertiesDefaultValue: true,
  },
})
