const logger = require("./src/commons/logger");
const MongoConnection = require("./src/commons/MongoConnection");
const { startServer } = require("./src/server");

(async function () {
    MongoConnection.connect();
    const server = await startServer();
    logger.info(`Server running at: ${server.info.uri}`);
})();
