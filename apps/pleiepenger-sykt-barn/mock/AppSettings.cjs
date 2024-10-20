require('dotenv').config();

const envSchema = require('./envSchema.cjs');

const getAppSettings = () => {
    const result = envSchema.safeParse({
        ENV: process.env.ENV,
        APP_VERSION: process.env.APP_VERSION,
        PUBLIC_PATH: process.env.PUBLIC_PATH,
        GITHUB_REF_NAME: process.env.GITHUB_REF_NAME,

        SIF_PUBLIC_APPSTATUS_DATASET: process.env.SIF_PUBLIC_APPSTATUS_DATASET,
        SIF_PUBLIC_APPSTATUS_PROJECT_ID: process.env.SIF_PUBLIC_APPSTATUS_PROJECT_ID,
        SIF_PUBLIC_DEKORATOR_URL: process.env.SIF_PUBLIC_DEKORATOR_URL,
        SIF_PUBLIC_INNSYN_URL: process.env.SIF_PUBLIC_INNSYN_URL,
        SIF_PUBLIC_LOGIN_URL: process.env.SIF_PUBLIC_LOGIN_URL,
        SIF_PUBLIC_MINSIDE_URL: process.env.SIF_PUBLIC_MINSIDE_URL,
        SIF_PUBLIC_USE_AMPLITUDE: process.env.SIF_PUBLIC_USE_AMPLITUDE,

        K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
        K9_BRUKERDIALOG_PROSESSERING_API_URL: process.env.K9_BRUKERDIALOG_PROSESSERING_API_URL,

        MOCK_DATE: process.env.MOCK_DATE,
        USE_MOCK_DATE: process.env.USE_MOCK_DATE,
    });

    if (!result.success) {
        console.error('Invalid environment variables:', result.error.format());
        process.exit(1); // Exit the server if validation fails
    }
    return result.data;
};

module.exports = getAppSettings;
