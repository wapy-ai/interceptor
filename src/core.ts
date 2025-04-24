import { sha256, sealedBox } from './crypto'
import type { AIOptions, Trace } from './types'
import { fetch } from 'undici'

export async function sendTrace(trace: Trace, opts: AIOptions) {
  const cipherJson = JSON.stringify({
    headers: trace.headers,
    body: trace.body
  })
  const hash   = sha256(cipherJson)
  const cipher = await sealedBox(Buffer.from(cipherJson), opts.publicKey)

  const headers: Record<string, string> = {
    'content-type': 'application/octet-stream',
    'x-ai-key':  opts.apiKey,
    'x-ai-hash': hash,
    'x-ai-name': trace.name,
    'x-ai-method': trace.method,
    'x-ai-path': trace.url
  }

  if (trace.schema) {
    headers['x-ai-schema'] = Buffer
      .from(JSON.stringify(trace.schema))
      .toString('base64')
  }

  await fetch('https://ingest.wapy.com.br/traces', {
    method: 'POST',
    headers,
    body: Buffer.from(cipher)
  })
}