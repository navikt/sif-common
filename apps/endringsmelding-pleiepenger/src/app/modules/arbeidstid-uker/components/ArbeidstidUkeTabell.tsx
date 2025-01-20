import { Checkbox, Table, Tooltip } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import AriaText from '@navikt/sif-common-core-ds/src/atoms/aria-text/AriaText';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { DurationText } from '@navikt/sif-common-ui';
import { dateFormatter, getDateRangeText } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { SelectableListType } from '../../../hooks/useSelectableList';
import { AppText, useAppIntl } from '../../../i18n';
import { ArbeidstidUkerItem } from '../types/ArbeidstidUkerItem';
import ArbeidstidUkeInfo from './ArbeidstidUkeInfo';
import UkeInfoTooltip from './UkeInfoTooltip';
import UkeTags from './UkeTags';
import VelgArbeidsukeItem from './VelgArbeidsukeItem';

interface Props {
    arbeidsgivernavn: string;
    uker: ArbeidstidUkerItem[];
    selectableList: SelectableListType<ArbeidstidUkerItem>;
    visEndringSomOpprinnelig?: boolean;
    renderCompactTable: boolean;
    arbeidstidKolonneTittel?: string;
    renderEditButton: (uke: ArbeidstidUkerItem, ukenummer: number, renderLabel: boolean) => ReactElement | undefined;
    renderUkerFooter: () => ReactElement;
}

const ArbeidstidUkeTabell: React.FunctionComponent<Props> = ({
    uker,
    visEndringSomOpprinnelig,
    selectableList,
    arbeidstidKolonneTittel,
    renderCompactTable,
    arbeidsgivernavn,
    renderEditButton,
}) => {
    const { text, intl } = useAppIntl();
    const {
        isItemSelected,
        setItemSelected,
        setShowSelectItemsMessage,
        setSelectedItems,
        listState: { itemsAreSelectable, singleSelectEnabled, selectedItems },
    } = selectableList;

    return (
        <Table className="arbeidstidUkeTabell">
            <Table.Header>
                <Table.Row>
                    {itemsAreSelectable && (
                        <Table.HeaderCell className="arbeidstidUkeTabell__velgUke">
                            <AriaText>
                                <AppText id="arbeidstidUkeTabell.aria.velgUke" />
                            </AriaText>
                            <Checkbox
                                checked={selectedItems.length === uker.length}
                                indeterminate={selectedItems.length > 0 && selectedItems.length !== uker.length}
                                onChange={() => {
                                    setShowSelectItemsMessage(false);
                                    if (selectedItems.length > 0) {
                                        setSelectedItems([]);
                                    } else {
                                        setSelectedItems(uker.filter((uke) => uke.kanEndres && uke.kanVelges));
                                    }
                                }}
                                hideLabel>
                                <AppText id="arbeidstidUkeTabell.velgAlleUker.cb" />
                            </Checkbox>
                        </Table.HeaderCell>
                    )}
                    {renderCompactTable && <Table.HeaderCell>Uke</Table.HeaderCell>}
                    {!renderCompactTable && (
                        <>
                            <Table.HeaderCell className="arbeidstidUker__ukenummer">
                                <AppText id="arbeidstidUkeTabell.header.uke" />
                            </Table.HeaderCell>
                            <Table.HeaderCell className="arbeidstidUker__periode">
                                <AppText id="arbeidstidUkeTabell.header.dato" />
                            </Table.HeaderCell>
                            <Table.HeaderCell className="arbeidstidUker__normalt">
                                <Tooltip content={text('arbeidstidUkeTabell.header.normalt.tooltip')}>
                                    <span>
                                        <AppText id="arbeidstidUkeTabell.header.normalt.title" />
                                    </span>
                                </Tooltip>
                            </Table.HeaderCell>
                        </>
                    )}

                    <Table.HeaderCell className="arbeidstidUker__faktisk">
                        {arbeidstidKolonneTittel || (
                            <Tooltip content={text('arbeidstidUkeTabell.header.arbeidstid.tooltip')}>
                                <span>
                                    <AppText id="arbeidstidUkeTabell.header.arbeidstid.title" />
                                </span>
                            </Tooltip>
                        )}
                    </Table.HeaderCell>

                    {singleSelectEnabled && (
                        <Table.HeaderCell className="arbeidstidUker__endre">
                            <AppText id="arbeidstidUkeTabell.header.endre" />
                        </Table.HeaderCell>
                    )}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {uker.map((uke) => {
                    const ukenummer = dayjs(uke.periode.from).isoWeek();
                    const selected = isItemSelected(uke);

                    return (
                        <Table.Row
                            key={uke.isoDateRange}
                            selected={selected}
                            style={{ verticalAlign: 'top' }}
                            data-testid={`uke_${ukenummer}`}>
                            {itemsAreSelectable && (
                                <Table.DataCell className="arbeidstidUkeTabell__velgUke">
                                    <VelgArbeidsukeItem
                                        uke={uke}
                                        selected={selected}
                                        onChange={() => setItemSelected(uke, selected)}
                                    />
                                </Table.DataCell>
                            )}
                            {renderCompactTable && (
                                <Table.DataCell>
                                    <div>
                                        <AppText id="arbeidstidUkeTabell.compact.uke" values={{ ukenummer }} />
                                        <div>
                                            {dateFormatter.compact(uke.periode.from)} - {` `}
                                            {dateFormatter.compact(uke.periode.to)}
                                        </div>
                                    </div>

                                    <div>
                                        <AppText
                                            id="arbeidstidUkeTabell.compact.normalarbeidstid"
                                            values={{
                                                Varighet: () => (
                                                    <span style={{ whiteSpace: 'nowrap' }}>
                                                        <DurationText duration={uke.opprinnelig.normalt} />
                                                    </span>
                                                ),
                                            }}
                                        />
                                    </div>

                                    {(uke.harFeriedager || uke.harFjernetFeriedager || uke.erKortUke) && (
                                        <Block margin="s">
                                            <UkeTags
                                                dagerMedFerie={uke.ferie?.dagerMedFerie}
                                                dagerMedFjernetFerie={uke.ferie?.dagerMedFjernetFerie}
                                                erKortUke={uke.erKortUke}
                                                arbeidsdagerIkkeAnsatt={uke.dagerIkkeAnsatt}
                                            />
                                        </Block>
                                    )}
                                </Table.DataCell>
                            )}
                            {!renderCompactTable && (
                                <>
                                    <Table.DataCell data-testid="ukenummer" className="arbeidstidUker__ukenummer">
                                        <AriaText>
                                            <AppText id="arbeidstidUkeTabell.aria.uke" />
                                        </AriaText>{' '}
                                        {ukenummer}
                                    </Table.DataCell>
                                    <Table.DataCell data-testid="periode" className="arbeidstidUker__periode">
                                        <div>
                                            <div className="arbeidsukeTidsrom">
                                                <span className="arbeidsukeTidsrom__tekst">
                                                    {getDateRangeText(uke.periode, intl.locale)}
                                                    {(uke.harFeriedager || uke.harFjernetFeriedager) && (
                                                        <Block margin="s">
                                                            <UkeTags
                                                                dagerMedFerie={uke.ferie?.dagerMedFerie}
                                                                dagerMedFjernetFerie={uke.ferie?.dagerMedFjernetFerie}
                                                                arbeidsdagerIkkeAnsatt={uke.dagerIkkeAnsatt}
                                                            />
                                                        </Block>
                                                    )}
                                                </span>
                                                <span className="arbeidsukeTidsrom__info">
                                                    {(uke.erKortUke || uke.dagerIkkeAnsatt.length > 0) && (
                                                        <UkeInfoTooltip uke={uke} arbeidsgivernavn={arbeidsgivernavn} />
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </Table.DataCell>
                                    <Table.DataCell data-testid="normalt-timer" className="arbeidstidUker__normalt">
                                        <DurationText duration={uke.opprinnelig.normalt} />
                                    </Table.DataCell>
                                </>
                            )}
                            <Table.DataCell data-testid="arbeidstid-faktisk" className="arbeidstidUker__faktisk">
                                <ArbeidstidUkeInfo uke={uke} visEndringSomOpprinnelig={visEndringSomOpprinnelig} />
                            </Table.DataCell>
                            {singleSelectEnabled && (
                                <Table.DataCell className="arbeidstidUker__endre">
                                    {renderEditButton(uke, ukenummer, false)}
                                </Table.DataCell>
                            )}
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default ArbeidstidUkeTabell;
