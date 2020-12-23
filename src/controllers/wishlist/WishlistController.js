"use strict";

const Boom = require("boom");
const Package = require(`${process.cwd()}/package.json`);
const {
    wishlistHeaders,
    wishlistQueryParams,
    wishlistResponseSchema,
    wishlistUpdateQueryParams,
} = require("./model/WishlistsSwagger");
const WishlistService = require("../../services/wishlist/WishlistService");
const wishlistService = new WishlistService();

function errorMessage(err) {
    const { message, statusCode } = err;
    const error = Boom.badImplementation(message);
    error.output.statusCode = statusCode || 500;
    error.reformat();
    return error;
}

async function getWishlistHandler({ params, query }, h) {
    try {
        const { clientid } = params;
        let { page } = query;
        return await wishlistService.get(clientid, page);
    } catch (err) {
        throw errorMessage(err);
    }
}

async function updateWishlistHandler({ params, query }, h) {
    try {
        const { clientid } = params;
        const { product } = query;
        return await wishlistService.updateWishlist(clientid, product);
    } catch (err) {
        throw errorMessage(err);
    }
}

async function deleteProductHandler({ params, query }, h) {
    try {
        const { clientid } = params;
        const { product } = query;
        return await wishlistService.deleteProduct(clientid, product);
    } catch (err) {
        throw errorMessage(err);
    }
}

const WishlistController = {
    name: "wishlists",
    version: Package.version,
    register: (server, options) => {
        server.route([
            {
                method: "GET",
                path: "/wishlists/{clientid}",
                handler: getWishlistHandler,
                config: {
                    description: "Wishlist api",
                    notes: "Returns a client wishlist",
                    tags: ["api"],
                    plugins: {
                        "hapi-swagger": {
                            produces: ["application/json"],
                            consumes: ["application/json"],
                            responses: {
                                200: {
                                    description: "Success",
                                    schema: wishlistResponseSchema,
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
                        query: wishlistQueryParams,
                        headers: wishlistHeaders,
                    },
                },
            },
            {
                method: "DELETE",
                path: "/wishlists/{clientid}",
                handler: deleteProductHandler,
                config: {
                    description: "Wishlist api",
                    notes: "Delete product from wishlist",
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
                                    description:
                                        "Client not found or product not found in wishlist",
                                },
                                500: {
                                    description: "Internal Server Error",
                                },
                            },
                        },
                    },
                    validate: {
                        query: wishlistUpdateQueryParams,
                        headers: wishlistHeaders,
                    },
                },
            },
            {
                method: "PUT",
                path: "/wishlists/{clientid}",
                handler: updateWishlistHandler,
                config: {
                    description: "Wishlist api",
                    notes: "Add product to wishlist",
                    tags: ["api"],
                    plugins: {
                        "hapi-swagger": {
                            produces: ["application/json"],
                            responses: {
                                200: {
                                    description: "Success",
                                },
                                404: {
                                    description: "Product or client not found",
                                },
                                409: {
                                    description:
                                        "Product alread added to wishlist",
                                },
                                500: {
                                    description: "Internal Server Error",
                                },
                            },
                        },
                    },
                    validate: {
                        query: wishlistUpdateQueryParams,
                        headers: wishlistHeaders,
                    },
                },
            },
        ]);
    },
};

module.exports = WishlistController;
