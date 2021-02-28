'use strict'

/** Middleware interface. */
export interface Middleware<TContext> {
  (ctx: TContext, next: () => Promise<void>): Promise<void>
}

/**
 * Compose multiple middlewares into a single middleware.
 * @param stack One or more middlewares
 */
export default function compose<TContext = any> (...stack: Middleware<TContext>[]): Middleware<TContext> {
  if (!stack.length) {
    throw new TypeError('compose() expects at least one middleware')
  }

  return async function composed (ctx: TContext, next?: () => Promise<void>) {
    let index = -1

    function dispatch (i: number): Promise<void> {
      if (i <= index) {
        throw new Error('next() called multiple times')
      }

      index = i
      const fn = stack[i]

      if (fn) {
        return fn(ctx, dispatch.bind(null, i + 1))
      } else if (next) {
        return next()
      }
    }

    return dispatch(0)
  }
}
