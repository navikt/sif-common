require('dotenv').config();

const process = require('process');

const envSettings = () => {
    const appSettings = `
     window.appSettings = {
        API_URL: '${process.env.API_URL}',
        VEDLEGG_API_URL: '${process.env.VEDLEGG_API_URL}',
        FRONTEND_API_PATH: '${process.env.FRONTEND_API_PATH}',
        FRONTEND_VEDLEGG_URL:'${process.env.FRONTEND_VEDLEGG_URL}',
        PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
        LOGIN_URL: '${process.env.LOGIN_URL}',
        APPSTATUS_PROJECT_ID: '${process.env.APPSTATUS_PROJECT_ID}',
        APPSTATUS_DATASET: '${process.env.APPSTATUS_DATASET}',
        USE_AMPLITUDE: '${process.env.USE_AMPLITUDE}',
        APP_VERSION: '${process.env.APP_VERSION}',
        IMAGE: '${process.env.IMAGE}',
        MINSIDE_URL: '${process.env.MINSIDE_URL}',
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
