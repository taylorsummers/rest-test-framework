// Configure to handle multiple environments here
const configFile = require('./env.config.json');

// Read environment variable set in test scripts in package.json
const environmentName = process.env.API_ENV;

// Make a copy of the environment specific section of envConfig
const envConfig = configFile[environmentName];

// Set envConfig to equal shallow copy
process.envConfig = envConfig;
