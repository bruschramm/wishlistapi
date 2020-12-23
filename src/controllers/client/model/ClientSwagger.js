"use strict";

const Joi = require("joi");

const clientModelSchema = Joi.object({
    name: Joi.string()
        .example("client name")
        .description("client name")
        .required(),
    email: Joi.string()
        .example("client email")
        .description("client email")
        .required(),
});

const clientsListSchema = Joi.object({
    meta: Joi.object({
        page: Joi.number().default(1).example(1).description("page"),
        size: Joi.number().default(100).example(100).description("size"),
    }),
    records: Joi.array().items(clientModelSchema),
});

const clientsQueryParams = Joi.object({
    page: Joi.number().default(1).example(1).description("page"),
});

const clientsHeaders = Joi.object({
    "Content-Type": Joi.string()
        .valid("application/json")
        .default("application/json"),
}).unknown();

module.exports = {
    clientModelSchema,
    clientsListSchema,
    clientsQueryParams,
    clientsHeaders,
};
