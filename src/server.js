"use strict";

const config = require("config");
const Hapi = require("@hapi/hapi");
const ClientController = require("./controllers/client");
const WishlistController = require("./controllers/wishlist");
const authenticate = require("./commons/AuthUtil");

const Package = require(`${process.cwd()}/package.json`);
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
// HealthCheck = require("./api/handlers/healthcheck"),

module.exports.startServer = async function () {
    const server = new Hapi.Server({
        host: "0.0.0.0",
        port: config.get("app.port"),
    });

    await server.register(require("@hapi/basic"));
    server.auth.strategy("simple", "basic", { validate: authenticate });
    server.auth.default("simple");

    await server.register([ClientController, WishlistController]);

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: {
                auth: "simple",
                info: {
                    title: "Wishlist api documentation",
                    description: "Wishlist api",
                    version: Package.version,
                },
                schemes: [config.get("swagger.scheme")],
                host: config.get("swagger.host"),
                documentationPath: "/docs/",
            },
        },
    ]);

    await server.start();

    return server;
};
