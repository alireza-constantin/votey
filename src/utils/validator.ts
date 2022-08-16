import { z } from 'zod';


export const createQuestionValidator = z.object({
    question: z.string().min(5, { message: 'Must be 5 or more characters long' }).max(256, { message: 'Must be 256 or fewer characters long' }),
    options: z.array(z.object({ text: z.string().min(2).max(30) })).min(2).max(10),
    endsAt: z.string().or(z.date())
});

export type createQuestionType = z.infer<typeof createQuestionValidator>