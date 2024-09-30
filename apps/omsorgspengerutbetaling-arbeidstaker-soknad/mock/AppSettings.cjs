require('dotenv').config();

const process = require('process');

const getAppSettings = () => ({
    APP_VERSION: `${process.env.APP_VERSION}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    IMAGE: `${process.env.IMAGE}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,

    K9_BRUKERDIALOG_PROSESSERING_API_URL: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_URL}`,
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: `${process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}`,

    SIF_PUBLIC_APPSTATUS_DATASET: `${process.env.SIF_PUBLIC_APPSTATUS_DATASET}`,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: `${process.env.SIF_PUBLIC_APPSTATUS_PROJECT_ID}`,
    SIF_PUBLIC_LOGIN_URL: `${process.env.SIF_PUBLIC_LOGIN_URL}`,
    SIF_PUBLIC_MINSIDE_URL: `${process.env.SIF_PUBLIC_MINSIDE_URL}`,
    SIF_PUBLIC_SKIP_ORGNUM_VALIDATION: `${process.env.SIF_PUBLIC_SKIP_ORGNUM_VALIDATION}`,
});

module.exports = getAppSettings;
