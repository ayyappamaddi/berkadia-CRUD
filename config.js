const dotenv = require('dotenv');

function getConfig() {
    let cfg;
    // Loads env variables from .env file (does nothing when the file does not exist)
    if (process.env.NODE_ENV === 'test') {
        // cfg =   dotenv.load({ path: '.env-test' });
    } else {
        cfg = dotenv.config()
    }

    return cfg.parsed;
}

function validateConfig() {
    // if a value is set in process.env, it is always a string
    // if a value is not set in process.env, it is undefined
    // therefore we need to test for both cases
    const cfg = getConfig();
    Object.keys(cfg).forEach((key) => {
        if (cfg[key] === 'undefined' || typeof cfg[key] === 'undefined' || cfg[key] === '') {
            throw new Error(`Please define "${key}" configuration value. See your .env file or the environment variables of your system to configure the missing parameters.`);
        }
    });

    return true;
}

const config = getConfig();

module.exports = {
    config,
    validateConfig
};
