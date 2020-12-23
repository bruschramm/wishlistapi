"use strict";

const { expect } = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");
const ClientService = require("../../../services/client");
const ClientRepository = require("../../../repositories/ClientRepository");

describe("Client service", function () {
    let clientService;
    let clientRepositoryStub;

    let client1;
    let client2;

    beforeEach(function () {
        clientRepositoryStub = sinon.stub(new ClientRepository());
        clientService = new ClientService();
        sinon
            .stub(clientService, "clientRepository")
            .value(clientRepositoryStub);

        client1 = {
            name: "foo",
            email: "foo@email.com",
        };

        client2 = {
            name: "bar",
            email: "bar@email.com",
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("When get a client", async function () {
        it("Should return client by id", async function () {
            const expectedClient = client1;
            clientRepositoryStub.findById.resolves(expectedClient);
            const resolvedClient = await clientService.get(
                mongoose.Types.ObjectId()
            );
            expect(resolvedClient).to.be.equal(expectedClient);
        });

        it("should boom error", async function () {
            clientRepositoryStub.findById.resolves({});
            try {
                await clientService.get(mongoose.Types.ObjectId());
            } catch (err) {
                expect(err.name).to.be.equal("ClientNotFoundException");
            }

            try {
                await clientService.get("id");
            } catch (err) {
                expect(err.name).to.be.equal("ClientNotFoundException");
            }
        });
    });

    describe("When get all clients", async function () {
        it("Should return all clients", async function () {
            clientRepositoryStub.findAll.resolves([client1, client2]);

            const res = await clientService.getAll(1);
            const expectedResponse = {
                meta: {
                    page: 1,
                    size: 100,
                },
                records: [client1, client2],
            };
            expect(res).to.be.eql(expectedResponse);
        });
    });

    describe("When delete a client", async function () {
        it("Should delete client", async function () {
            clientRepositoryStub.findById.resolves(client1);
            clientRepositoryStub.deleteById.resolves();
            const res = await clientService.delete(mongoose.Types.ObjectId());
            expect(res).to.be.equal("Successfully deleted client");
        });

        it("should boom error", async function () {
            clientRepositoryStub.findById.resolves({});
            try {
                await clientService.delete(mongoose.Types.ObjectId());
            } catch (err) {
                expect(err.name).to.be.equal("ClientNotFoundException");
            }
        });
    });

    describe("When create a client", async function () {
        it("Should create a client", async function () {
            clientRepositoryStub.findByEmail.resolves({});
            clientRepositoryStub.create.resolves(client1);
            const resolvedClient = await clientService.create(client1);
            expect(resolvedClient).to.have.string(
                "Successfully created client"
            );
        });

        it("should boom error", async function () {
            clientRepositoryStub.findByEmail.resolves(client2);
            try {
                await clientService.create(client1);
            } catch (err) {
                expect(err.name).to.be.equal("ConflictEmailException");
            }
        });
    });

    describe("When update a client", async function () {
        it("Should update a client", async function () {
            client1._id = mongoose.Types.ObjectId();
            clientRepositoryStub.findById.resolves(client1);
            clientRepositoryStub.findByEmail.resolves(client1);
            clientRepositoryStub.updateOneById.resolves();
            let resolvedClient = await clientService.update(client1);
            expect(resolvedClient).to.be.equal("Successfully updated client");

            client2._id = mongoose.Types.ObjectId();
            clientRepositoryStub.findById.resolves(client2);
            clientRepositoryStub.findByEmail.resolves({});
            clientRepositoryStub.updateOneById.resolves();
            resolvedClient = await clientService.update(client2);
            expect(resolvedClient).to.be.equal("Successfully updated client");
        });

        it("should boom error when email conflicts", async function () {
            client1._id = mongoose.Types.ObjectId();
            client2._id = "id2";
            clientRepositoryStub.findById.resolves(client1);
            clientRepositoryStub.findByEmail.resolves(client2);
            clientRepositoryStub.updateOneById.resolves();
            try {
                await clientService.update(client1);
            } catch (err) {
                expect(err.name).to.be.equal("ConflictEmailException");
            }
        });

        it("should boom error when client is not found", async function () {
            client1._id = mongoose.Types.ObjectId();
            clientRepositoryStub.findById.resolves({});
            clientRepositoryStub.findByEmail.resolves({});
            try {
                await clientService.update(client1);
            } catch (err) {
                expect(err.name).to.be.equal("ClientNotFoundException");
            }
        });
    });
});
