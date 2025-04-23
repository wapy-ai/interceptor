import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { sendTrace } from '../core'
import type { AIOptions } from '../types'

export function AiIntercept(opts: AIOptions) {
  class Interceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        tap(async () => {
          const ctx = context.switchToHttp()
          const req = ctx.getRequest()
          await sendTrace(
            { tenantKey: opts.apiKey, name: opts.name, body: req.body, headers: req.headers, schema: opts.schema },
            opts
          )
        })
      )
    }
  }
  return applyDecorators(UseInterceptors(new Interceptor()))
}
