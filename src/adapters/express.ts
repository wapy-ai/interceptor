import type { Request, Response, NextFunction } from 'express'
import { sendTrace } from '../core'
import type { AIOptions } from '../types'

export const aiInterceptor =
  (opts: AIOptions) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    await sendTrace(
      {
        name:    opts.name,
        schema:  opts.schema,
        method:  req.method,
        url:     req.originalUrl ?? req.url,
        headers: req.headers as Record<string, string | string[] | undefined>,
        body:    req.body
      },
      opts
    )
    next()
  }