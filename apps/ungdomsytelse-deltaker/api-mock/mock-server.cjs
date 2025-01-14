/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet');
const busboyCons = require('busboy');
const os = require('os');
const fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

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

const MELLOMLAGRING_JSON = `${os.tmpdir()}/omsorgspengesoknad-mellomlagring.json`;

const isJSON = (str) => {
    try {
        return JSON.parse(str) && !!str;
    } catch (e) {
        return false;
    }
};

const writeFileAsync = async (path, text) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, text, 'utf8', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const readFileSync = (path) => {
    return fs.readFileSync(path, 'utf8');
};

const existsSync = (path) => fs.existsSync(path);

const mockPath = `${__dirname}/data`;
const soker = 'søker1';

const søkerFileName = `søker-mock.json`;
const barnFileName = `barn-mock.json`;
const innvilgetVedtakFileName = `innvilget-vedtak-mock.json`;
const ikkeInnvilgetVedtakFileName = `ikke-innvilget-vedtak-mock.json`;

const readMockFile = (file, responseObject) => {
    const filePath = `${mockPath}/${soker}/${file}`;
    if (existsSync(filePath)) {
        const body = readFileSync(filePath);
        responseObject.send(JSON.parse(body));
    } else {
        responseObject.send({});
    }
};

const startExpressServer = () => {
    const port = process.env.PORT || 8099;

    server.get('/oppslag/soker', (req, res) => {
        setTimeout(() => {
            readMockFile(søkerFileName, res);
        }, 250);
    });

    server.get('/oppslag/barn', (req, res) => {
        setTimeout(() => {
            readMockFile(barnFileName, res);
        }, 250);
    });

    server.get('/deltakelse/register/hent/alle', (req, res) => {
        const response = [
            {
                id: '123',
                programperiodeFraOgMed: '2024-07-01',
                programperiodeTilOgMed: '2025-06-30',
                harSøkt: false,
                rapporteringsPerioder: [
                    {
                        fraOgMed: '2024-07-01',
                        tilOgMed: '2024-07-31',
                        harRapportert: false,
                        inntekt: null,
                    },
                    {
                        fraOgMed: '2024-08-01',
                        tilOgMed: '2024-08-31',
                        harRapportert: false,
                        inntekt: null,
                    },
                    {
                        fraOgMed: '2024-09-01',
                        tilOgMed: '2024-09-30',
                        harRapportert: false,
                        inntekt: null,
                    },
                    {
                        fraOgMed: '2024-10-01',
                        tilOgMed: '2024-10-31',
                        harRapportert: false,
                        inntekt: null,
                    },
                    {
                        fraOgMed: '2024-11-01',
                        tilOgMed: '2024-11-30',
                        harRapportert: false,
                        inntekt: null,
                    },
                    {
                        fraOgMed: '2024-12-01',
                        tilOgMed: '2024-12-31',
                        harRapportert: false,
                        inntekt: null,
                    },
                    {
                        fraOgMed: '2025-01-01',
                        tilOgMed: '2025-01-31',
                        harRapportert: false,
                        inntekt: null,
                    },
                    {
                        fraOgMed: '2025-02-01',
                        tilOgMed: '2025-02-28',
                        harRapportert: false,
                        inntekt: null,
                    },
                    {
                        fraOgMed: '2025-03-01',
                        tilOgMed: '2025-03-31',
                        harRapportert: false,
                        inntekt: null,
                    },
                    {
                        fraOgMed: '2025-04-01',
                        tilOgMed: '2025-04-30',
                        harRapportert: false,
                        inntekt: null,
                    },
                    {
                        fraOgMed: '2025-05-01',
                        tilOgMed: '2025-05-31',
                        harRapportert: false,
                        inntekt: null,
                    },
                    {
                        fraOgMed: '2025-06-01',
                        tilOgMed: '2025-06-30',
                        harRapportert: false,
                        inntekt: null,
                    },
                ],
            },
        ];
        setTimeout(() => {
            res.status(200).send(response);
        }, 50);
    });

    /** --- Send søknad ---------- */

    server.post('/ungdomsytelse/soknad/innsending', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        setTimeout(() => {
            res.sendStatus(200);
        }, 500);
    });

    server.put('/deltakelse/register/:id/marker-har-søkt', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        setTimeout(() => {
            res.sendStatus(200);
        }, 500);
    });

    /** --- Rapporter inntekt for en måned -------------- */

    server.post('/deltakelse/register/:id/registrer-inntekt-i-periode', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        setTimeout(() => {
            res.sendStatus(200);
        }, 500);
    });

    const errorResponse = {
        type: '/problem-details/invalid-request-parameters',
        title: 'invalid-request-parameters',
        status: 400,
        detail: 'Requesten inneholder ugyldige paramtere.',
        instance: 'about:blank',
        invalid_parameters: [
            'høyereRisikoForFraværBeskrivelse matcher ikke tilatt møønster: ^[\\p{Punct}\\p{L}\\p{M}\\p{N}\\p{Sc}\\p{Space}«»–§�\\u2018\\u2019\\u201a\\u201b\\u201c\\u201d\\u201e\\u201f\\u00b4\\u2026]*$',
        ],
    };
    server.post('/omsorgspenger-utvidet-rett/innsending-error', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        setTimeout(() => {
            res.status(400).send(errorResponse);
        }, 100);
    });

    /** --- Vedlegg ---------- */

    server.post('/vedlegg', (req, res) => {
        res.set('Access-Control-Expose-Headers', 'Location');
        res.set('Location', 'nav.no');
        const busboy = busboyCons({ headers: req.headers });
        busboy.on('finish', () => {
            res.writeHead(200, {
                Location: `http://localhost:8089/vedlegg/${uuidv4()}`,
            });
            res.end();
        });
        req.pipe(busboy);
    });

    server.delete('/vedlegg/**', (req, res) => {
        res.sendStatus(200);
    });

    /** --- Mellomlagring ---------- */

    server.get('/mellomlagring/OMSORGSPENGER_UTVIDET_RETT', (req, res) => {
        if (existsSync(MELLOMLAGRING_JSON)) {
            const body = readFileSync(MELLOMLAGRING_JSON);
            res.send(JSON.parse(body));
        } else {
            res.send({});
        }
    });
    server.post('/mellomlagring/OMSORGSPENGER_UTVIDET_RETT', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });
    server.put('/mellomlagring/OMSORGSPENGER_UTVIDET_RETT', (req, res) => {
        const body = req.body;
        const jsBody = isJSON(body) ? JSON.parse(body) : body;
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify(jsBody, null, 2));
        res.sendStatus(200);
    });
    server.delete('/mellomlagring/OMSORGSPENGER_UTVIDET_RETT', (req, res) => {
        writeFileAsync(MELLOMLAGRING_JSON, JSON.stringify({}, null, 2));
        res.sendStatus(200);
    });

    server.listen(port, () => {
        console.log(`Express mock-api server listening on port: ${port}`);
    });

    /** --- Sjekk tidligere innvilget vedtak ---------- */

    server.post('/k9-sak-innsyn-api/k9sak/omsorgsdager-kronisk-sykt-barn/har-gyldig-vedtak', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        setTimeout(() => {
            if (body.pleietrengendeAktørId === '2') {
                readMockFile(innvilgetVedtakFileName, res);
            } else {
                readMockFile(ikkeInnvilgetVedtakFileName, res);
            }
        }, 2500);
    });
};

startExpressServer();
