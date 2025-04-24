import { applyDecorators, UseInterceptors } from '@nestjs/common'
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { sendTrace } from '../core'
import type { AIOptions } from '../types'

export function AiIntercept(opts: AIOptions) {
  class Interceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        tap(async () => {
          const req = ctx.switchToHttp().getRequest()
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
        })
      )
    }
  }
  return applyDecorators(UseInterceptors(new Interceptor()))
}