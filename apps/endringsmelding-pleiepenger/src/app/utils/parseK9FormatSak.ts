import {
    durationUtils,
    ISODateRangeToDateRange,
    ISODateToDate,
    ISODurationToDuration,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { K9Format, K9FormatArbeidstid, K9FormatArbeidstidInfo, K9FormatBarn } from '../types/k9Format';
import { K9Sak, K9SakArbeidstid, K9SakArbeidstidInfo, K9SakArbeidstidPeriodeMap, K9SakBarn } from '../types/K9Sak';

/**
 * Henter ut informasjon om barn fra k9sak
 * @param barn K9FormatBarn
 * @returns Barn
 */

const parseBarn = (barn: K9FormatBarn): K9SakBarn => {
    return {
        ...barn,
        fødselsdato: ISODateToDate(barn.fødselsdato),
        mellomnavn: barn.mellomnavn || undefined,
    };
};

const parseArbeidstidInfo = (arbeidstid: K9FormatArbeidstidInfo): K9SakArbeidstidInfo => {
    const { perioder = {} } = arbeidstid;
    const periodeMap: K9SakArbeidstidPeriodeMap = {};

    Object.keys(perioder).forEach((key) => {
        const periode = perioder[key];
        periodeMap[key] = {
            faktiskArbeidTimerPerDag: ISODurationToDuration(periode.faktiskArbeidTimerPerDag),
            jobberNormaltTimerPerDag: ISODurationToDuration(periode.jobberNormaltTimerPerDag),
        };
    });

    return {
        perioder: periodeMap,
    };
};
/**
 *
 * @param arbeidstid: K9FormatArbeidstid
 * @returns YtelseArbeidstid
 */
const parseArbeidstid = ({
    arbeidstakerList,
    frilanserArbeidstidInfo,
    selvstendigNæringsdrivendeArbeidstidInfo,
}: K9FormatArbeidstid): K9SakArbeidstid => {
    return {
        arbeidstakerList: arbeidstakerList?.map((arbeidstaker) => ({
            organisasjonsnummer: arbeidstaker.organisasjonsnummer,
            norskIdentitetsnummer: arbeidstaker.norskIdentitetsnummer || undefined,
            arbeidstidInfo: parseArbeidstidInfo(arbeidstaker.arbeidstidInfo),
        })),
        frilanserArbeidstidInfo: frilanserArbeidstidInfo?.perioder
            ? parseArbeidstidInfo(frilanserArbeidstidInfo)
            : undefined,
        selvstendigNæringsdrivendeArbeidstidInfo: selvstendigNæringsdrivendeArbeidstidInfo?.perioder
            ? parseArbeidstidInfo(selvstendigNæringsdrivendeArbeidstidInfo)
            : undefined,
    };
};

const harNormalarbeidstid = (arbeidstidInfo?: K9SakArbeidstidInfo): boolean => {
    if (!arbeidstidInfo) {
        return false;
    }
    const { perioder } = arbeidstidInfo;
    const keys = Object.keys(perioder);
    if (keys.length === 1) {
        const periode = perioder[keys[0]];
        return durationUtils.durationIsGreatherThanZero(periode.jobberNormaltTimerPerDag);
    }
    return keys.length > 0;
};

const fjernArbeidstidMedIngenNormalarbeidstid = (arbeidstid: K9SakArbeidstid): K9SakArbeidstid => {
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;

    return {
        arbeidstakerList: arbeidstakerList?.filter((a) => harNormalarbeidstid(a.arbeidstidInfo)),
        frilanserArbeidstidInfo: harNormalarbeidstid(frilanserArbeidstidInfo) ? frilanserArbeidstidInfo : undefined,
        selvstendigNæringsdrivendeArbeidstidInfo: harNormalarbeidstid(selvstendigNæringsdrivendeArbeidstidInfo)
            ? selvstendigNæringsdrivendeArbeidstidInfo
            : undefined,
    };
};
/**
 * Parser K9Format sak
 * @param data data mottat fra backend
 * @returns K9Sak
 */
export const parseK9FormatSak = (data: K9Format): K9Sak => {
    const {
        søknad: { ytelse, søker, søknadId },
        barn,
    } = data;
    const sak: K9Sak = {
        søker: søker,
        søknadId: søknadId,
        språk: data.søknad.språk,
        mottattDato: dayjs(data.søknad.mottattDato).toDate(),
        barn: parseBarn(data.barn),
        ytelse: {
            type: 'PLEIEPENGER_SYKT_BARN',
            barn: {
                norskIdentitetsnummer: barn.identitetsnummer,
                fødselsdato: barn.fødselsdato ? ISODateToDate(barn.fødselsdato) : undefined,
            },
            søknadsperioder: ytelse.søknadsperiode.map((periode) => ISODateRangeToDateRange(periode)),
            opptjeningAktivitet: {
                frilanser: ytelse.opptjeningAktivitet.frilanser
                    ? {
                          jobberFortsattSomFrilanser: ytelse.opptjeningAktivitet.frilanser.jobberFortsattSomFrilanser,
                          startdato: ISODateToDate(ytelse.opptjeningAktivitet.frilanser.startdato),
                          sluttdato: ytelse.opptjeningAktivitet.frilanser.sluttdato
                              ? ISODateToDate(ytelse.opptjeningAktivitet.frilanser.sluttdato)
                              : undefined,
                      }
                    : undefined,
            },
            arbeidstid: fjernArbeidstidMedIngenNormalarbeidstid(parseArbeidstid(ytelse.arbeidstid)),
        },
    };
    return sak;
};
