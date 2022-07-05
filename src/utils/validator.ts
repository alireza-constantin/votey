import { z } from 'zod';


export const createQuestionValidator = z.object({
    question: z.string().min(5).max(600),
    options: z.array(z.object({ text: z.string().min(2).max(30) })).min(2).max(10),
    endsAt: z.string().or(z.date()).or(z.null())
});

export type createQuestionType = z.infer<typeof createQuestionValidator>