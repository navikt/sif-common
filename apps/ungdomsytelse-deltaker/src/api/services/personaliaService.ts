import { personaliaApiDataSchema } from '../schemas/personaliaSchema';
import { PersonaliaApiData } from '../types';

export const personaliaService = {
    fetch: async (): Promise<PersonaliaApiData | undefined> => {
        try {
            const response = await fetch(`person/personopplysninger-api/personalia`);
            if (!response.ok) {
                throw new Error(`Failed to fetch personalia: ${response.status}`);
            }
            const json = await response.json();
            return await personaliaApiDataSchema.parse(json);
        } catch (e) {
            console.log(e);
            return undefined;
        }
    },
};
