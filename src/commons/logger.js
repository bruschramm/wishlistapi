"use strict";

const config = require("config");
const { createLogger, format, transports } = require("winston");

const logTransports = [
    new transports.Console({
        timestamp: true,
        level: config.app.logLevel,
    }),
];

const Logger = createLogger({
    format: format.json(),
    transports: logTransports,
});

Logger.warning = Logger.warn;

module.exports = Logger;
