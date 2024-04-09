import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { HttpStatusCode } from 'axios';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import {
    fetchMellomlagringer,
    fetchSaker,
    fetchSaksbehandlingstid,
    fetchSøker,
    fetchSøknader,
} from '../../server/apiService';
import { Innsynsdata } from '../../types/InnsynData';
import { getBrukerprofil } from '../../utils/amplitude/getBrukerprofil';
import { getXRequestId } from '../../utils/apiUtils';
import { Feature } from '../../utils/features';
import { sortInnsendtSøknadEtterOpprettetDato } from '../../utils/innsendtSøknadUtils';
import { fetchAppStatus } from './appStatus.api';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const childLogger = createChildLogger(getXRequestId(req));
    childLogger.info(
        {
            mellomlagring: Feature.HENT_MELLOMLAGRING,
            saker: Feature.HENT_SAKER,
            behandlingstid: Feature.HENT_BEHANDLINGSTID,
        },
        `Henter innsynsdata`,
    );
    try {
        /** Hent søker først for å se om bruker har tilgang */
        const søker = await fetchSøker(req);

        /** Bruker har tilgang, hent resten av informasjonen */
        const [søknaderReq, mellomlagringReq, sakerReq, saksbehandlingstidReq, appStatus] = await Promise.allSettled([
            fetchSøknader(req),
            Feature.HENT_MELLOMLAGRING ? fetchMellomlagringer(req) : Promise.resolve({}),
            Feature.HENT_SAKER ? fetchSaker(req) : Promise.resolve([]),
            Feature.HENT_BEHANDLINGSTID
                ? fetchSaksbehandlingstid(req)
                : Promise.resolve({ saksbehandlingstidUker: undefined }),
            Feature.HENT_BEHANDLINGSTID ? fetchAppStatus() : Promise.resolve(undefined),
        ]);
        childLogger.info(`Hentet innsynsdata`);

        if (søknaderReq.status === 'rejected') {
            childLogger.error(
                new Error(`Hent søknader feilet: ${søknaderReq.reason.message}`, { cause: søknaderReq.reason }),
            );
        }

        childLogger.info(`Parser innsynsdata`);

        const innsendteSøknader =
            søknaderReq.status === 'fulfilled' ? søknaderReq.value.sort(sortInnsendtSøknadEtterOpprettetDato) : [];

        const saker = sakerReq.status === 'fulfilled' ? sakerReq.value : [];

        const søknader =
            søknaderReq.status === 'fulfilled' ? søknaderReq.value.sort(sortInnsendtSøknadEtterOpprettetDato) : [];
        const saksbehandlingstidUker =
            saksbehandlingstidReq.status === 'fulfilled'
                ? saksbehandlingstidReq.value.saksbehandlingstidUker
                : undefined;

        childLogger.info(getBrukerprofil(søknader, saker, saksbehandlingstidUker), `Innsynsdata parset`);

        const innsynsdata: Innsynsdata = {
            appStatus: appStatus.status === 'fulfilled' ? appStatus.value : undefined,
            søker,
            innsendteSøknader,
            mellomlagring: mellomlagringReq.status === 'fulfilled' ? mellomlagringReq.value : {},
            saksbehandlingstidUker,
            saker,
            harSak: saker.length > 0,
        };
        res.json(innsynsdata);
    } catch (err) {
        childLogger.error(`Hent innsynsdata feilet: ${err}`);
        if (
            err.response.status === HttpStatusCode.Forbidden ||
            err.response.status === HttpStatusCode.UnavailableForLegalReasons
        ) {
            res.status(403).json({ error: 'Ikke tilgang' });
        } else {
            res.status(500).json({ error: 'Kunne ikke hente innsynsdata' });
        }
    }
}

export default withAuthenticatedApi(handler);
