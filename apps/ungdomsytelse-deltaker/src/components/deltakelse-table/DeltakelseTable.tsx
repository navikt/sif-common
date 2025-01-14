import { Table } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '@api/types';
import Inntektsrapportering from '../inntektsrapportering/Inntektsrapportering';

interface Props {
    deltakelser: Deltakelse[];
}

const DeltakelseTable = ({ deltakelser }: Props) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Fra og med</Table.HeaderCell>
                    <Table.HeaderCell>Til og med</Table.HeaderCell>
                    <Table.HeaderCell>Søkt for</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {deltakelser.map((d) => {
                    const key = JSON.stringify(d.programPeriode);
                    return d.harSøkt ? (
                        <Table.ExpandableRow key={key} content={<Inntektsrapportering deltakelse={d} />}>
                            <Table.DataCell>{dateFormatter.compact(d.programPeriode.from)}</Table.DataCell>
                            <Table.DataCell>
                                {d.programPeriode.to ? dateFormatter.compact(d.programPeriode.to) : null}
                            </Table.DataCell>
                            <Table.DataCell>{d.harSøkt ? 'Ja' : 'Nei'}</Table.DataCell>
                        </Table.ExpandableRow>
                    ) : (
                        <Table.Row key={key}>
                            <Table.DataCell></Table.DataCell>
                            <Table.DataCell>{dateFormatter.compact(d.programPeriode.from)}</Table.DataCell>
                            <Table.DataCell>
                                {d.programPeriode.to ? dateFormatter.compact(d.programPeriode.to) : null}
                            </Table.DataCell>
                            <Table.DataCell>{d.harSøkt ? 'Ja' : 'Nei'}</Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default DeltakelseTable;
