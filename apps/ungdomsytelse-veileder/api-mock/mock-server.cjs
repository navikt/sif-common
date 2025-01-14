/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(
    helmet({
        contentSecurityPolicy: true,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    }),
);

server.use(
    cors({
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
        allowedHeaders: ['content-type', 'X-Brukerdialog-Git-Sha', 'x_correlation_id'],
        credentials: true,
    }),
);
server.options('*', cors());

const nyDeltaker = {
    id: null,
    deltakerIdent: '56857102105',
    navn: {
        fornavn: 'GLORETE',
        mellomnavn: null,
        etternavn: 'TØFFEL',
    },
};

const nyDeltakerRegistrert = {
    ...nyDeltaker,
    id: 'd-n',
};

const registrertDeltaker = {
    id: 'd-r',
    deltakerIdent: '03867198392',
    navn: {
        fornavn: 'PRESENTABEL',
        mellomnavn: null,
        etternavn: 'HOFTE',
    },
};

const deltakelse1 = {
    id: '3ebb8cb3-a2eb-45a5-aeee-22a2766aaab0-1',
    deltakerIdent: '03867198392',
    deltaker: {
        id: 'd-r',
        deltakerIdent: '03867198392',
    },
    fraOgMed: '2025-01-01',
    tilOgMed: '2025-05-01',
    harSøkt: true,
};
const deltakelse2 = {
    id: '3ebb8cb3-a2eb-45a5-aeee-22a2766aaab2',
    deltakerIdent: '03867198392',
    deltaker: {
        id: 'd-r',
        deltakerIdent: '03867198392',
    },
    fraOgMed: '2025-01-02',
    tilOgMed: '2025-02-04',
    harSøkt: false,
};
const deltakelser = [deltakelse1, deltakelse2];

const getDeltaker = ({ deltakerIdent, deltakerId }) => {
    if (deltakerIdent) {
        console.log('henter deltaker med deltakerIdent', deltakerIdent);
        switch (deltakerIdent) {
            case nyDeltaker.deltakerIdent:
                return nyDeltaker;
            case registrertDeltaker.deltakerIdent:
                return registrertDeltaker;
            default:
                console.log('fant ikke deltaker med deltakerIdent', deltakerIdent);
                return null;
        }
    }
    if (deltakerId) {
        console.log('henter deltaker med id', deltakerId);
        switch (deltakerId) {
            case registrertDeltaker.id:
                return registrertDeltaker;
            case nyDeltakerRegistrert.id:
                return nyDeltakerRegistrert;
            default:
                console.log('fant ikke deltaker med id', deltakerId);
                return null;
        }
    }
};

const getDeltakelser = (id) => {
    console.log('getDeltakelser', id);
    return id === 'd-n' ? [] : deltakelser;
};

const startExpressServer = () => {
    const port = process.env.PORT || 8099;

    server.get('/oppslag/deltaker/:id', (req, res) => {
        console.log('/oppslag/deltaker', req.params);
        const response = getDeltaker({ deltakerId: req.params.id });
        setTimeout(() => {
            res.status(200).send(response);
        }, 350);
    });

    server.post('/oppslag/deltaker', (req, res) => {
        const response = getDeltaker({ deltakerIdent: req.body.deltakerIdent });
        setTimeout(() => {
            res.status(200).send(response);
        }, 350);
    });

    server.post('/oppslag/deltaker-500', (req, res) => {
        const response = getDeltaker(req.body);
        setTimeout(() => {
            res.status(500).send(response);
        }, 350);
    });

    server.get('/veileder/register/deltaker/:deltakerId/deltakelser', (req, res) => {
        const response = getDeltakelser(req.params.deltakerId);
        console.log(response);
        setTimeout(() => {
            res.status(200).send(response);
        }, 250);
    });

    server.post('/veileder/register/deltaker/innmelding', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        const response = {
            id: 'd-n',
            deltakerIdent: req.body.deltakerIdent,
            deltaker: {
                id: 'd-n',
                deltakerIdent: req.body.deltakerIdent,
            },
            harSøkt: false,
            fraOgMed: req.body.startdato,
        };
        setTimeout(() => {
            res.status(200).send(response);
        }, 1500);
    });

    server.put('/veileder/register/deltakelse/:id/avslutt', (req, res) => {
        const response = {
            ...deltakelse1,
            tilOgMed: req.body.utmeldingsdato,
        };
        setTimeout(() => {
            res.status(200).send(response);
        }, 1500);
    });

    server.put('/veileder/register/deltakelse/:id/oppdater', (req, res) => {
        const body = req.body;
        const response = {
            ...deltakelse1,
            ...body,
        };
        setTimeout(() => {
            res.status(200).send(response);
        }, 50);
    });

    server.delete('/veileder/register/deltakelse/:id/fjern', (req, res) => {
        res.sendStatus(200);
    });

    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

startExpressServer();
