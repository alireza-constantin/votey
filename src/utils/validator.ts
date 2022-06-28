import { z } from 'zod';


export const createQuestionValidator = z.object({
    question: z.string().min(5).max(600)
});

export type createQuestionType = z.infer<typeof createQuestionValidator>