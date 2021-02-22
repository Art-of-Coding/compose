# Compose

Simple utility to compose multiple async/await middleware functions into a single
middleware function.

## Install

```
npm i @art-of-coding/compose
```

## API

#### compose()

```ts
compose<TContext = any> (...middlewares: Middleware<TContext>[]) => Middleware<TContext>
```

Composes the middlewares into a single middleware function.

TypeScript users can provide a context definition (`TContext`) which allows type checking
within the middlewares. For more information about type checking see [index.ts](src/index.ts).

## Example

```ts
import compose from '@art-of-coding/compose'

// Optional context definition
interface MyContext {
  age?: number
}

const composed = compose<MyContext>(
  async (ctx, next) => {
    // 1st middleware
    ctx.age = 18
    await next()
  },
  async (ctx, next) => {
    // 2nd middleware
    await next()
  },
  async ctx => {
    // 3rd middleware
  }
)

const ctx = {}
composed(ctx).then(() => {
  // middleware completed
}).catch(err => {
  // middleware error
})
```

### License

Copyright 2021 [Michiel van der Velde](http://www.michielvdvelde.nl).

This software is licensed under the [MIT License](LICENSE).
