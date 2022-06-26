import * as trpc from '@trpc/server';
import { prisma } from '@/db/client'
import { z } from 'zod';
import { createRouter } from './context';

export const questionRouter = createRouter()
    .query('getAllMyQuestions', {
        async resolve({ ctx }) {
            return await prisma.question.findMany({
                where: {
                    ownerToken: {
                        equals: ctx.token
                    }
                }
            })
        }
    })
    .query('getById', {
        input: z.object({
            id: z.string()
        }),
        async resolve({ input, ctx }) {

            const question = await prisma.question.findFirst({
                where: {
                    id: input.id
                }
            })

            return { question, isOwner: ctx.token }
        }
    })
    .mutation('create', {
        input: z.object({
            question: z.string().min(5).max(600)
        }),
        async resolve({ input, ctx }) {
            return await prisma.question.create({
                data: {
                    question: input.question,
                    options: JSON.stringify([]),
                    ownerToken: ctx.token || ''
                }
            })
        }
    })