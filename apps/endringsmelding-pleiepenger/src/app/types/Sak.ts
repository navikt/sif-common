import { DateRange, Duration, ISODate, ISODateRangeMap } from '@navikt/sif-common-utils/lib';
import { FeriedagMap } from '../søknad/steps/lovbestemt-ferie/LovbestemtFerieStep';
import { Arbeidsgiver } from './Arbeidsgiver';
import { K9SakBarn } from './K9Sak';

export enum ArbeidAktivitetType {
    arbeidstaker = 'arbeidstaker',
    frilanser = 'frilanser',
    selvstendigNæringsdrivende = 'selvstendigNæringsdrivende',
}

export type FaktiskOgNormalArbeidstid = {
    faktisk: Duration;
    normalt: Duration;
};

export type ArbeidstidEnkeltdagMap = {
    [key: ISODate]: FaktiskOgNormalArbeidstid;
};

export interface ArbeidsukeTimer {
    dag: Duration;
    uke: Duration;
}

export interface Arbeidsuke {
    isoDateRange: string;
    periode: DateRange;
    arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap;
    faktisk: ArbeidsukeTimer;
    normalt: ArbeidsukeTimer;
    antallDagerMedArbeidstid: number;
}

export type ArbeidsukeMap = ISODateRangeMap<Arbeidsuke>;

export interface PeriodeMedArbeidstid extends DateRange {
    arbeidsuker: ArbeidsukeMap;
}

interface ArbeidAktivitetBase {
    id: string;
    type: ArbeidAktivitetType;
    perioderMedArbeidstid: PeriodeMedArbeidstid[];
    harPerioderFørTillattEndringsperiode: boolean;
    harPerioderEtterTillattEndringsperiode: boolean;
}

export interface ArbeidAktivitetArbeidstaker extends ArbeidAktivitetBase {
    type: ArbeidAktivitetType.arbeidstaker;
    arbeidsgiver: Arbeidsgiver;
}
export interface ArbeidAktivitetFrilanser extends ArbeidAktivitetBase {
    type: ArbeidAktivitetType.frilanser;
}

export interface ArbeidAktivitetSelvstendigNæringsdrivende extends ArbeidAktivitetBase {
    type: ArbeidAktivitetType.selvstendigNæringsdrivende;
}

export type ArbeidAktivitet =
    | ArbeidAktivitetArbeidstaker
    | ArbeidAktivitetFrilanser
    | ArbeidAktivitetSelvstendigNæringsdrivende;

export interface ArbeidAktiviteter {
    arbeidstakerArktiviteter: ArbeidAktivitetArbeidstaker[];
    frilanser?: ArbeidAktivitetFrilanser;
    selvstendigNæringsdrivende?: ArbeidAktivitetSelvstendigNæringsdrivende;
}

export interface SakLovbestemtFerie {
    feriedager: FeriedagMap;
}

export interface Sak {
    barn: K9SakBarn;
    arbeidAktiviteter: ArbeidAktiviteter;
    lovbestemtFerie: SakLovbestemtFerie;
    søknadsperioder: DateRange[];
    samletSøknadsperiode: DateRange;
    ytelse: {
        type: string;
    };
}
