const process = require('process');
require('dotenv').config();

const envSettings = () => {
    const appSettings = `
    window.appSettings = {
        API_URL: '${process.env.API_URL}',
        APPSTATUS_PROJECT_ID: '${process.env.APPSTATUS_PROJECT_ID}',
        APPSTATUS_DATASET: '${process.env.APPSTATUS_DATASET}',
        APP_VERSION: '${process.env.APP_VERSION}',
        FRONTEND_API_PATH: '${process.env.FRONTEND_API_PATH}',
        FRONTEND_VEDLEGG_URL:'${process.env.FRONTEND_VEDLEGG_URL}',
        GITHUB_REF_NAME: '${process.env.GITHUB_REF_NAME}',
        IMAGE: '${process.env.IMAGE}',
        LOGIN_URL: '${process.env.LOGIN_URL}',
        MINSIDE_URL: '${process.env.MINSIDE_URL}',
        PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
        USE_AMPLITUDE: '${process.env.USE_AMPLITUDE}',
        VEDLEGG_API_URL: '${process.env.VEDLEGG_API_URL}',
    };`
        .trim()
        .replace(/ /g, '');

    try {
        return appSettings;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
    }
};

module.exports = envSettings;
