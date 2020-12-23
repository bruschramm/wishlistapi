"use strict";

const { expect } = require("chai");
const Hapi = require("@hapi/hapi");
const ClientController = require("../../controllers/client");
const authenticate = require("../../commons/AuthUtil");

describe("Auth util", () => {
    let server;

    before(async () => {
        server = new Hapi.Server({ port: 3001 });
        await server.register(require("@hapi/basic"));
        server.auth.strategy("simple", "basic", { validate: authenticate });
        server.auth.default("simple");

        await server.register(ClientController);
    });

    after(async () => {
        await server.stop();
    });

    it("should authorize when credential is valid", async () => {
        const res = await server.inject({
            method: "Get",
            url: "/clients/client-id",
            headers: {
                Authorization: "Basic dXNlcjpzZWNyZXQ=",
            },
        });
        expect(res.statusCode).to.not.be.equal(401);
    });

    it("shouldn't authorize when credential is invalid", async () => {
        const res = await server.inject({
            method: "Get",
            url: "/clients/client-id",
            headers: {
                Authorization: "Basic dXNlcjI6c2VjcmV0Mg==",
            },
        });
        expect(res.statusCode).to.be.equal(401);
    });

    it("shouldn't authorize when credential is missing", async () => {
        const res = await server.inject({
            method: "Get",
            url: "/clients/client-id",
        });
        expect(res.statusCode).to.be.equal(401);
    });
});
