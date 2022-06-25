import { appRouter } from '@/backend';
import { createContext } from '@/backend/context';
import * as trpcNext from '@trpc/server/adapters/next';

// export API handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: createContext,
});