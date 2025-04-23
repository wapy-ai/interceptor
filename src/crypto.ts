import sodium from 'libsodium-wrappers'
import { createHash } from 'node:crypto'

let ready: Promise<void> | null = null
function sodiumReady() {
  if (!ready) ready = sodium.ready as unknown as Promise<void>
  return ready
}

export function sha256(buf: string | Uint8Array) {
  return createHash('sha256').update(buf).digest('hex')
}

export async function sealedBox(
  msg: Uint8Array,
  publicKey: Uint8Array
): Promise<Uint8Array> {
  await sodiumReady()
  return sodium.crypto_box_seal(msg, publicKey)
}
