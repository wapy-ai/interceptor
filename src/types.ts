import { ZodSchema } from 'zod'

export interface AIOptions {
  apiKey: string
  publicKey: Uint8Array
  name: string
  schema?: ZodSchema
  redact?: (key: string, value: unknown) => boolean
}

export interface Trace {
  tenantKey: string
  name: string
  body: unknown
  headers: Record<string, string | string[] | undefined>
  schema?: unknown
}
