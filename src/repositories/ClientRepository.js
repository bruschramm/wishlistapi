const ClientModel = require("../models/Client");

class ClientRepository {
    constructor() {}

    async deleteById(id) {
        return await ClientModel.deleteOne({ _id: id });
    }

    async create(client) {
        return await ClientModel.create(client);
    }

    async updateOneById(client) {
        return await ClientModel.updateOne({ _id: client._id }, client);
    }

    async findById(id) {
        return await ClientModel.findById(id);
    }

    async findByEmail(value) {
        return await ClientModel.findOne({ email: value });
    }

    async findAll(limit, skip) {
        return await ClientModel.find().limit(limit).skip(skip);
    }
}

module.exports = ClientRepository;
