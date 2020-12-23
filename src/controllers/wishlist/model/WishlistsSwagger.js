"use strict";

const Joi = require("joi");

const productModelSchema = Joi.object({
    id: Joi.string().example("product id").description("product id"),
    title: Joi.string().example("product title").description("product title"),
    url: Joi.string().example("product url").description("product url"),
    image: Joi.string().example("product image").description("product image"),
    price: Joi.number().example("product price").description("product price"),
    reviewScore: Joi.number()
        .example("product review score")
        .description("product score"),
});

const paginationSchema = Joi.object({
    page: Joi.number().default(1).example(1).description("page"),
    size: Joi.number().default(100).example(100).description("size"),
});

const wishlistResponseSchema = Joi.object({
    meta: paginationSchema,
    records: Joi.array().items(productModelSchema),
});

const wishlistQueryParams = Joi.object({
    page: Joi.number().default(1).example(1).description("pagination"),
});

const wishlistUpdateQueryParams = Joi.object({
    product: Joi.string()
        .example("product id")
        .description("product id")
        .required(),
});

const wishlistHeaders = Joi.object({
    "Content-Type": Joi.string()
        .valid("application/json")
        .default("application/json"),
}).unknown();

module.exports = {
    wishlistHeaders,
    wishlistQueryParams,
    wishlistResponseSchema,
    wishlistUpdateQueryParams,
};
