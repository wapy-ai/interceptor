import { sendTrace } from '../core'
import type { AIOptions } from '../types'
import type { FastifyReply, FastifyRequest } from 'fastify'

export const aiFastify =
  (opts: AIOptions) =>
  async (req: FastifyRequest, _res: FastifyReply) => {
    await sendTrace(
      {
        name: opts.name,
        schema: opts.schema,
        method: req.method,
        url:    req.url,
        headers: req.headers as Record<string, string | string[] | undefined>,
        body: req.body
      },
      opts
    )
  }
