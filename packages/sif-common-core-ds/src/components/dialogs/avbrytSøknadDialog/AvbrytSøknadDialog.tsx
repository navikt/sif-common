import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import intlHelper from '../../../utils/intlUtils';
import ConfirmationDialog from '../confirmation-dialog/ConfirmationDialog';

export interface Props {
    synlig: boolean;
    onAvbrytSøknad: () => void;
    onFortsettSøknad: () => void;
}

const AvbrytSøknadDialog = (props: Props) => {
    const intl = useIntl();
    const { synlig, onFortsettSøknad, onAvbrytSøknad } = props;
    return (
        <ConfirmationDialog
            open={synlig}
            okLabel={intlHelper(intl, 'avbrytSøknadDialog.avbrytSøknadLabel')}
            cancelLabel={intlHelper(intl, 'avbrytSøknadDialog.fortsettSøknadLabel')}
            closeButton={false}
            onConfirm={onAvbrytSøknad}
            onCancel={onFortsettSøknad}
            title={intlHelper(intl, 'avbrytSøknadDialog.tittel')}>
            <p>
                <FormattedMessage id="avbrytSøknadDialog.intro" />
            </p>
            <p>
                <FormattedMessage id="avbrytSøknadDialog.spørsmål" />
            </p>
        </ConfirmationDialog>
    );
};
export default AvbrytSøknadDialog;
