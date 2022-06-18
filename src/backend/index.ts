import { z } from 'zod';
import superjson from 'superjson'
import * as trpc from '@trpc/server';
import { questionRouter } from './question';


export const appRouter = trpc
    .router()
    .transformer(superjson)
    .merge("questions.", questionRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
