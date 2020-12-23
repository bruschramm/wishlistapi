const _ = require("lodash");
const mongoose = require("mongoose");
const ClientRepository = require("../../repositories/ClientRepository");
const {
    ConflictEmailException,
    ClientNotFoundException,
} = require("../../commons/exceptions/ClientExceptions");

const internal = { instance: null };

class ClientService {
    constructor() {
        if (internal.instance) return internal.instance;
        this.clientRepository = new ClientRepository();
        this.resultSize = 100;
        internal.instance = this;
        return this;
    }

    async get(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ClientNotFoundException(
                `Client with id (${id}) not found`
            );
        }
        const client = await this.clientRepository.findById(id);
        if (_.isEmpty(client)) {
            throw new ClientNotFoundException(
                `Client with id (${id}) not found`
            );
        }
        return client;
    }

    async getAll(page) {
        const start = (page - 1) * this.resultSize;
        const clients = await this.clientRepository.findAll(
            this.resultSize,
            start
        );

        return {
            meta: {
                page,
                size: this.resultSize,
            },
            records: clients,
        };
    }

    async create(client) {
        const emailClient = await this.clientRepository.findByEmail(
            client.email
        );
        if (!_.isEmpty(emailClient)) {
            throw new ConflictEmailException(
                `Client with email (${client.email}) alread exists`
            );
        }
        const createdClient = await this.clientRepository.create(client);
        return `Successfully created client: ${createdClient._id}`;
    }

    async update(client) {
        const emailClient = await this.clientRepository.findByEmail(
            client.email
        );
        const storedClient = await this.get(client._id);
        if (
            !_.isEmpty(emailClient) &&
            !storedClient._id.equals(emailClient._id)
        ) {
            throw new ConflictEmailException(
                `Client with email (${client.email}) alread exists`
            );
        }
        await this.clientRepository.updateOneById(client);
        return "Successfully updated client";
    }

    async delete(id) {
        await this.get(id);
        await this.clientRepository.deleteById(id);
        return "Successfully deleted client";
    }
}

module.exports = ClientService;
