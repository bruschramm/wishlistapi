"use strict";

const Boom = require("boom");
const Package = require(`${process.cwd()}/package.json`);
const {
    clientModelSchema,
    clientsListSchema,
    clientsQueryParams,
    clientsHeaders,
} = require("./model/ClientSwagger");
const ClientService = require("../../services/client/ClientService");
const clientService = new ClientService();

function errorMessage(err) {
    const { message, statusCode } = err;
    const error = Boom.badImplementation(message);
    error.output.statusCode = statusCode || 500;
    error.reformat();
    return error;
}

async function getAllClientsHandler({ query }, h) {
    try {
        const { page } = query;
        return await clientService.getAll(page);
    } catch (err) {
        throw errorMessage(err);
    }
}

async function getOneClientHandler({ params }, h) {
    try {
        const { id } = params;
        return await clientService.get(id);
    } catch (err) {
        throw errorMessage(err);
    }
}

async function createClientsHandler({ payload }, h) {
    try {
        return await clientService.create(payload);
    } catch (err) {
        throw errorMessage(err);
    }
}

async function updateClientsHandler({ payload, params }, h) {
    const { id } = params;

    try {
        payload._id = id;
        return await clientService.update(payload);
    } catch (err) {
        throw errorMessage(err);
    }
}

async function deleteClientsHandler({ params }, h) {
    try {
        const { id } = params;
        return await clientService.delete(id);
    } catch (err) {
        throw errorMessage(err);
    }
}

const Clients = {
    name: "clients",
    version: Package.version,
    register: (server, options) => {
        server.route([
            {
                method: "GET",
                path: "/clients/",
                handler: getAllClientsHandler,
                config: {
                    description: "Clients api",
                    notes: "Returns all clients",
                    tags: ["api"],
                    plugins: {
                        "hapi-swagger": {
                            produces: ["application/json"],
                            consumes: ["application/json"],
                            responses: {
                                200: {
                                    description: "Success",
                                    schema: clientsListSchema,
                                },
                                500: {
                                    description: "Internal Server Error",
                                },
                            },
                        },
                    },
                    validate: {
                        query: clientsQueryParams,
                        headers: clientsHeaders,
                    },
                },
            },
            {
                method: "GET",
                path: "/clients/{id}",
                handler: getOneClientHandler,
                config: {
                    description: "Clients api",
                    notes: "Returns a client",
                    tags: ["api"],
                    plugins: {
                        "hapi-swagger": {
                            produces: ["application/json"],
                            consumes: ["application/json"],
                            responses: {
                                200: {
                                    description: "Success",
                                    schema: clientModelSchema,
                                },
                                404: {
                                    description: "Client not found",
                                },
                                500: {
                                    description: "Internal Server Error",
                                },
                            },
                        },
                    },
                    validate: {
                        headers: clientsHeaders,
                    },
                },
            },
            {
                method: "POST",
                path: "/clients/",
                handler: createClientsHandler,
                config: {
                    description: "Client api",
                    notes: "Create client",
                    tags: ["api"],
                    plugins: {
                        "hapi-swagger": {
                            produces: ["application/json"],
                            responses: {
                                200: {
                                    description: "Success",
                                },
                                400: {
                                    description:
                                        "Invalid request payload input",
                                },
                                409: {
                                    description:
                                        "Client with email alread exists",
                                },
                                500: {
                                    description: "Internal Server Error",
                                },
                            },
                        },
                    },
                    validate: {
                        payload: clientModelSchema,
                        headers: clientsHeaders,
                    },
                },
            },
            {
                method: "DELETE",
                path: "/clients/{id}",
                handler: deleteClientsHandler,
                config: {
                    description: "Clients api",
                    notes: "Delete clients",
                    tags: ["api"],
                    plugins: {
                        "hapi-swagger": {
                            produces: ["application/json"],
                            consumes: ["application/json"],
                            responses: {
                                200: {
                                    description: "Success",
                                },
                                404: {
                                    description: "Client not found",
                                },
                                500: {
                                    description: "Internal Server Error",
                                },
                            },
                        },
                    },
                    validate: {
                        headers: clientsHeaders,
                    },
                },
            },
            {
                method: "PUT",
                path: "/clients/{id}",
                handler: updateClientsHandler,
                config: {
                    description: "Clients api",
                    notes: "Update client",
                    tags: ["api"],
                    plugins: {
                        "hapi-swagger": {
                            produces: ["application/json"],
                            consumes: ["application/json"],
                            responses: {
                                200: {
                                    description: "Success",
                                },
                                400: {
                                    description:
                                        "Invalid request payload input",
                                },
                                404: {
                                    description: "Client not found",
                                },
                                409: {
                                    description:
                                        "Client with email alread exists",
                                },
                                500: {
                                    description: "Internal Server Error",
                                },
                            },
                        },
                    },
                    validate: {
                        payload: clientModelSchema,
                        headers: clientsHeaders,
                    },
                },
            },
        ]);
    },
};

module.exports = Clients;
