"use strict";

const sinon = require("sinon");
const { expect } = require("chai");
const Hapi = require("@hapi/hapi");
const ClientController = require("../../controllers/client");
const ClientService = require("../../services/client");
const {
    ClientNotFoundException,
} = require("../../commons/exceptions/ClientExceptions");

describe("Client controller", async function () {
    let server;
    let client;
    let client2;
    let stubClientService;

    before(async function () {
        server = new Hapi.Server({ port: 8080 });
        await server.register(ClientController);
        await server.start();
        client = {
            name: "foo",
            email: "foo@email.com",
        };

        client2 = {
            name: "bar",
            email: "bar@email.com",
        };
    });

    beforeEach(() => {
        stubClientService = sinon.stub(new ClientService());
    });

    afterEach(async function () {
        await server.stop();
        sinon.restore();
    });

    describe("When get", async function () {
        it("Should return all clients", async function () {
            const expectedClients = [client, client2];
            stubClientService.getAll.resolves(expectedClients);

            const res = await server.inject({
                method: "GET",
                url: "/clients/",
            });

            expect(res.statusCode).to.eql(200);
            expect(res.result).to.be.eql(expectedClients);
        });

        it("Should boom error when get all clients", async function () {
            stubClientService.getAll.throws(new Error("fake error"));

            const res = await server.inject({
                method: "GET",
                url: "/clients/",
            });

            expect(res.statusCode).to.be.eql(500);
        });

        it("Should return client by id", async function () {
            const expectedClient = client;
            stubClientService.get.resolves(expectedClient);

            const res = await server.inject({
                method: "GET",
                url: "/clients/client-id",
            });

            expect(res.statusCode).to.eql(200);
            expect(res.result).to.be.eql(expectedClient);
        });

        it("Should boom error when get client by id", async function () {
            stubClientService.get.throws(
                new ClientNotFoundException("id not found")
            );

            const res = await server.inject({
                method: "GET",
                url: "/clients/client-id",
            });

            expect(res.statusCode).to.be.eql(404);
        });
    });

    describe("When post", async function () {
        it("Should create client", async function () {
            stubClientService.create.resolves(client);

            const res = await server.inject({
                method: "POST",
                url: "/clients/",
                payload: client,
            });

            expect(res.statusCode).to.eql(200);
        });

        it("Should boom error", async function () {
            stubClientService.create.throwsException(new Error("fake error"));

            const res = await server.inject({
                method: "POST",
                url: "/clients/",
                payload: client,
            });

            expect(res.statusCode).to.be.eql(500);
        });
    });

    describe("When put", async function () {
        it("Should update client", async function () {
            stubClientService.update.resolves(client);

            const res = await server.inject({
                method: "PUT",
                url: "/clients/client-id",
                payload: client,
            });

            expect(res.statusCode).to.eql(200);
        });

        it("Should boom error", async function () {
            stubClientService.update.throwsException(new Error("fake error"));

            const res = await server.inject({
                method: "PUT",
                url: "/clients/client-id",
                payload: client,
            });

            expect(res.statusCode).to.be.eql(500);
        });
    });

    describe("When delete", async function () {
        it("Should delete client", async function () {
            stubClientService.delete.resolves(client);

            const res = await server.inject({
                method: "DELETE",
                url: "/clients/client-id",
            });

            expect(res.statusCode).to.eql(200);
            expect(res.result).to.be.eql(client);
        });

        it("Should boom error", async function () {
            stubClientService.delete.throwsException(new Error("fake error"));

            const res = await server.inject({
                method: "DELETE",
                url: "/clients/client-id",
            });

            expect(res.statusCode).to.be.eql(500);
        });
    });
});
