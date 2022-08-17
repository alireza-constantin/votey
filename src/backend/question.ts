import { prisma } from '@/db/client'
import { z } from 'zod';
import { createRouter } from './context';
import { createQuestionValidator } from '@/utils/validator';

export const questionRouter = createRouter()
    .query('getAllMyQuestions', {
        async resolve({ ctx }) {
            if (!ctx.token) return []
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

            let isEnded = false;
            if (question?.endsAt) {
                isEnded = new Date() > question?.endsAt
            }

            const myVote = await prisma.vote.findFirst({
                where: {
                    questionsId: input.id,
                    voterToken: ctx.token
                }
            })
            const rest = { question, vote: myVote, isOwner: question?.ownerToken === ctx.token, isEnded }

            if (rest.vote || rest.isOwner) {
                const votes = await prisma.vote.groupBy({
                    where: { questionsId: input.id },
                    by: ['choice'],
                    _count: true,
                    orderBy: {
                        choice: 'asc'
                    }

                })


                return {
                    ...rest,
                    votes,

                }
            }

            return { ...rest, votes: undefined, }
        }
    })
    .mutation('create', {
        input: createQuestionValidator,
        async resolve({ input, ctx }) {
            if (!ctx.token) throw new Error('unauthorized')
            return await prisma.question.create({
                data: {
                    question: input.question,
                    options: input.options,
                    ownerToken: ctx.token || '',
                    endsAt: input.endsAt
                }
            })
        }
    })
    .mutation('vote', {
        input: z.object({
            questionId: z.string(),
            option: z.number().min(0).max(10)
        }),
        async resolve({ input, ctx }) {
            if (!ctx.token) throw new Error('unauthorized')
            return await prisma.vote.create({
                data: {
                    questionsId: input.questionId,
                    choice: input.option,
                    voterToken: ctx.token
                }
            })
        }
    })