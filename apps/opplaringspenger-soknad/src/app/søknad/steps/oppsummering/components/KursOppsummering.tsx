import { FormSummary, List, VStack } from '@navikt/ds-react';
import EditStepLink from '@navikt/sif-common-soknad-ds/src/components/edit-step-link/EditStepLink';
import { AppText, useAppIntl } from '../../../../i18n';
import { FerieuttakIPeriodenApiData, KursApiData } from '../../../../types/søknadApiData/SøknadApiData';
import {
    capsFirstCharacter,
    dateFormatter,
    dateRangeFormatter,
    ISODateRangeToDateRange,
    ISODateToDate,
} from '@navikt/sif-common-utils';
import { Sitat, TextareaSvar } from '@navikt/sif-common-ui';

interface Props {
    kurs: KursApiData;
    ferieuttakIPerioden: FerieuttakIPeriodenApiData;
    onEdit?: () => void;
}

const KursOppsummering = ({ onEdit, kurs, ferieuttakIPerioden }: Props) => {
    const { kursholder, perioder } = kurs;
    const { locale } = useAppIntl();
    return (
        <>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">
                        <AppText id="steg.oppsummeringkurs.header" />
                    </FormSummary.Heading>
                    {onEdit && <EditStepLink onEdit={onEdit} />}
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="oppsummering.kurs.institusjon" />
                        </FormSummary.Label>
                        <FormSummary.Value>{kursholder}</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="oppsummering.kurs.perioder" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <List>
                                {perioder.map((periode) => {
                                    const periodeString = dateRangeFormatter.getDateRangeText(
                                        ISODateRangeToDateRange(periode.kursperiode),
                                        locale,
                                    );
                                    return <List.Item key={periodeString}>{periodeString}</List.Item>;
                                })}
                            </List>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    {kurs.reisedager.reiserUtenforKursdager ? (
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                Reisedager du søker opplæringspenger for, som er dager utenfor kurs eller opplæring
                            </FormSummary.Label>
                            <FormSummary.Value>
                                {kurs.reisedager.reiserUtenforKursdager ? (
                                    <VStack>
                                        <List>
                                            {kurs.reisedager.reisedager.map((reisedag) => {
                                                return (
                                                    <List.Item key={reisedag}>
                                                        {capsFirstCharacter(
                                                            dateFormatter.dayCompactDate(ISODateToDate(reisedag)),
                                                        )}
                                                    </List.Item>
                                                );
                                            })}
                                        </List>
                                        <Sitat>
                                            <TextareaSvar text={kurs.reisedager.reisedagerBeskrivelse} />
                                        </Sitat>
                                    </VStack>
                                ) : (
                                    <>Har ikke reisedager som er utenfor </>
                                )}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    ) : (
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="oppsummering.kurs.reisedager" />
                            </FormSummary.Label>
                            <FormSummary.Value>Nei, reiser ikke utenfor</FormSummary.Value>
                        </FormSummary.Answer>
                    )}

                    {ferieuttakIPerioden && (
                        <>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="oppsummering.kurs.ferieuttakIPerioden.header" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <AppText id={ferieuttakIPerioden.skalTaUtFerieIPerioden ? 'Ja' : 'Nei'} />
                                </FormSummary.Value>
                            </FormSummary.Answer>

                            {ferieuttakIPerioden.ferieuttak.length > 0 && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="oppsummering.kurs.ferieuttakIPerioden.listTitle" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <List>
                                            {ferieuttakIPerioden.ferieuttak.map((ferieuttak) => (
                                                <List.Item key={ferieuttak.fraOgMed}>
                                                    {dateFormatter.compact(ISODateToDate(ferieuttak.fraOgMed))} -{' '}
                                                    {dateFormatter.compact(ISODateToDate(ferieuttak.tilOgMed))}
                                                </List.Item>
                                            ))}
                                        </List>
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                        </>
                    )}
                </FormSummary.Answers>
            </FormSummary>
        </>
    );
};

export default KursOppsummering;
