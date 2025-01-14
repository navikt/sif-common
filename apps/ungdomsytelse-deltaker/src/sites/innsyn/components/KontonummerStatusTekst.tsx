import { Alert } from '@navikt/ds-react';
import { KontonummerInfo as KontonummerStatusTekst } from '../../../api/types';

interface Props {
    kontonummerInfo?: KontonummerStatusTekst;
}

const KontonummerStatusTekst = ({ kontonummerInfo }: Props) => {
    if (!kontonummerInfo) {
        return 'Informasjon om kontonummer mangler';
    }
    const { kontonr, kontoregisterStatus } = kontonummerInfo;
    if (kontoregisterStatus === 'SUCCESS' && kontonr) {
        return `${kontonr}`;
    } else if (kontoregisterStatus === 'FAILURE' && kontonr) {
        return (
            <Alert variant="warning" inline={true}>
                Ugyldig kontonummer - {kontonr}
            </Alert>
        );
    } else if (kontoregisterStatus === 'FAILURE' && !kontonr) {
        return `Kontonummer mangler`;
    }

    return null;
};

export default KontonummerStatusTekst;
