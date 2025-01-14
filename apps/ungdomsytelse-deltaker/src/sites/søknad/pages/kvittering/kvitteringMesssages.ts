const nb = {
    'kvittering.tittel': 'Vi har mottatt søknad om å være med i ungdomsprogrammet',
    'kvittering.info.tittel': '[TODO] Hva skjer videre nå?',
    'kvittering.info.1': 'Hva skal vi ha med her? Hva skjer egentlig',
    'kvittering.info.2': 'Vi kontakter deg hvis vi trenger flere opplysninger.',
    'kvittering.info.3': 'Du kan følge saken din på <Lenke>Ungdomsprogrammet</Lenke>.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const kvitteringMessages = {
    nb,
    nn,
};
