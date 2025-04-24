import { ZodSchema } from 'zod'

export interface AIOptions {
  apiKey: string
  publicKey: Uint8Array
  name: string
  schema?: ZodSchema
  redact?: (key: string, value: unknown) => boolean
}

export interface Trace {
  name: string
  schema?: unknown
  method: string
  url: string
  headers: Record<string, string | string[] | undefined>
  body: unknown
}