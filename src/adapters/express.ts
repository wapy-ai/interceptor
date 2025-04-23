import type { Request, Response, NextFunction } from 'express'
import { sendTrace } from '../core'
import type { AIOptions } from '../types'

export const aiInterceptor =
  (opts: AIOptions) => async (req: Request, _res: Response, next: NextFunction) => {
    const body = req.body ?? {}
    try {
      await sendTrace(
        { tenantKey: opts.apiKey, name: opts.name, body, headers: req.headers, schema: opts.schema },
        opts
      )
    } catch (e) {
      console.warn('[ai] trace failed', e)
    }
    next()
  }
