import { z } from 'zod';
import { deltakelserSchema } from '../schemas/deltakelserSchema';
import { deltakelseSchema, rapporteringsperiodeSchema } from '../schemas/deltakelseSchema';
import { periodeMedInntektSchema } from '../schemas/periodeMedInntektSchema';
import { kontonummerSchema, personaliaApiDataSchema } from '../schemas/personaliaSchema';
import { søknadApiDataSchema } from '../schemas/søknadApiDataSchema';

export type Deltakelse = z.infer<typeof deltakelseSchema>;
export type Deltakelser = z.infer<typeof deltakelserSchema>;
export type PeriodeMedInntekt = z.infer<typeof periodeMedInntektSchema>;
export type Rapporteringsperiode = z.infer<typeof rapporteringsperiodeSchema>;
export type SøknadApiData = z.infer<typeof søknadApiDataSchema>;
export type PersonaliaApiData = z.infer<typeof personaliaApiDataSchema>;
export type KontonummerInfo = z.infer<typeof kontonummerSchema>;
