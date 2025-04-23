import { sendTrace } from '../core'
import type { AIOptions } from '../types'
import type { FastifyReply, FastifyRequest } from 'fastify'

export const aiFastify =
  (opts: AIOptions) =>
  async (req: FastifyRequest, _res: FastifyReply) => {
    await sendTrace(
      { tenantKey: opts.apiKey, name: opts.name, body: req.body, headers: req.headers, schema: opts.schema },
      opts
    )
  }
