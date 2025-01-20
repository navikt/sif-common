import React from 'react';
import { getFeriedagerIUkeTekst } from '@utils';
import FerieTag from '../../../components/tags/FerieTag';
import KortUkeTag from '../../../components/tags/KortUkeTag';
import TagsContainer from '../../../components/tags/tags-container/TagsContainer';

interface Props {
    erKortUke?: boolean;
    dagerMedFerie: Date[] | undefined;
    dagerMedFjernetFerie?: Date[] | undefined;
    arbeidsdagerIkkeAnsatt: Date[] | undefined;
    visDagNavn?: boolean;
}

const UkeTags = ({
    dagerMedFerie = [],
    dagerMedFjernetFerie = [],
    visDagNavn,
    erKortUke,
    arbeidsdagerIkkeAnsatt = [],
}: Props) => {
    const tags: React.ReactNode[] = [];
    if (erKortUke || arbeidsdagerIkkeAnsatt.length > 0) {
        tags.push(<KortUkeTag style={{ marginRight: '.5rem', marginBottom: '.25rem' }} />);
    }
    if (dagerMedFerie?.length > 0) {
        tags.push(
            <FerieTag style={{ marginRight: '.5rem', marginBottom: '.25rem' }}>
                {visDagNavn
                    ? `Ferie: ${getFeriedagerIUkeTekst(dagerMedFerie)}`
                    : dagerMedFerie?.length === 1
                      ? 'Feriedag'
                      : 'Feriedager'}
            </FerieTag>,
        );
    }
    if (dagerMedFjernetFerie?.length > 0) {
        tags.push(
            <FerieTag type="fjernet" size="small">
                Ferie fjernet
            </FerieTag>,
        );
    }

    if (dagerMedFjernetFerie.length + dagerMedFerie.length > 0 || erKortUke) {
        return (
            <>
                <TagsContainer>
                    {erKortUke && <KortUkeTag />}
                    {dagerMedFerie?.length > 0 && (
                        <FerieTag>
                            {visDagNavn
                                ? `Ferie: ${getFeriedagerIUkeTekst(dagerMedFerie)}`
                                : dagerMedFerie?.length === 1
                                  ? 'Feriedag'
                                  : 'Feriedager'}
                        </FerieTag>
                    )}
                    {dagerMedFjernetFerie?.length > 0 && (
                        <FerieTag type="fjernet" size="small">
                            Ferie fjernet
                        </FerieTag>
                    )}
                </TagsContainer>
            </>
        );
    }
    return null;
};

export default UkeTags;
