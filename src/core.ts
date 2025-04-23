import { sha256, sealedBox } from './crypto'
import type { AIOptions, Trace } from './types'
import { fetch } from 'undici'

export async function sendTrace(trace: Trace, opts: AIOptions) {
  const json = JSON.stringify(trace.body)
  const hash = sha256(json)

  const cipher = await sealedBox(Buffer.from(json), opts.publicKey)

  const res = await fetch('https://ingest.wapy.ai/traces', {
    method: 'POST',
    headers: {
      'content-type': 'application/octet-stream',
      'x-ai-key': opts.apiKey,
      'x-ai-hash': hash,
      'x-ai-name': trace.name
    },
    body: Buffer.from(cipher)
  }).catch(() => null)

  if (res && !res.ok) console.warn('[ai] ingest error', res.status)
}
