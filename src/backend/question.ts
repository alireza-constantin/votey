import * as trpc from '@trpc/server';
import { prisma } from '@/db/client'
import { z } from 'zod';
import { createRouter } from './context';

export const questionRouter = createRouter()
    .query('getAll', {
        async resolve() {
            return await prisma.question.findMany()
        }
    })
    .query('getById', {
        input: z.object({
            id: z.string()
        }),
        async resolve({ input, ctx }) {
            console.log(ctx.token)
            return await prisma.question.findFirst({
                where: {
                    id: input.id
                }
            })
        }
    })
    .mutation('create', {
        input: z.object({
            question: z.string().min(5).max(600)
        }),
        async resolve({ input }) {
            return await prisma.question.create({
                data: {
                    question: input.question,
                    options: JSON.stringify([])
                }
            })
        }
    })