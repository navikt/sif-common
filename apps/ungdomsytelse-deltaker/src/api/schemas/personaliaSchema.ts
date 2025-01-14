import { z } from 'zod';

export const kontonummerSchema = z.object({
    kontoregisterStatus: z.enum(['SUCCESS', 'FAILURE']),
    kontonr: z.string().nullable(),
    utenlandskbank: z.boolean().nullable(),
});

export const personaliaApiDataSchema = z.object({
    personalia: kontonummerSchema,
});
