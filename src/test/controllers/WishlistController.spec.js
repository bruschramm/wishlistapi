"use strict";

const sinon = require("sinon");
const { expect } = require("chai");
const Hapi = require("@hapi/hapi");
const WishlistController = require("../../controllers/wishlist");
const WishlistService = require("../../services/wishlist");
const {
    WishlistNotFoundException,
} = require("../../commons/exceptions/WishlistExceptions");

describe("Wishlist controller", async function () {
    let server;
    let stubWishlistService;

    before(async function () {
        server = new Hapi.Server({ port: 8080 });
        await server.register(WishlistController);
        await server.start();
    });

    beforeEach(() => {
        stubWishlistService = sinon.stub(new WishlistService());
    });

    afterEach(async function () {
        await server.stop();
        sinon.restore();
    });

    describe("When get", async function () {
        const expectedResult = {
            meta: {
                page: 1,
                size: 100,
            },
            records: [
                {
                    id: "af04c0ee-7137-4848-fd33-a2d148412095",
                    title: "Secador de Cabelo 1900W 2 Velocidades",
                    image:
                        "http://challenge-api.luizalabs.com/images/af04c0ee-7137-4848-fd33-a2d148412095.jpg",
                    price: 229.9,
                    url:
                        "https://challenge-api.luizalabs.com/api/product/af04c0ee-7137-4848-fd33-a2d148412095/",
                    reviewScore: 5,
                },
            ],
        };

        it("Should return client wishlist", async function () {
            stubWishlistService.get
                .withArgs("client-id", 1)
                .resolves(expectedResult);

            const res = await server.inject({
                method: "GET",
                url: "/wishlists/client-id?page=1",
            });

            expect(res.statusCode).to.eql(200);
            expect(res.result).to.be.eql(expectedResult);
        });

        it("Should return default page", async function () {
            stubWishlistService.get
                .withArgs("client-id", 1)
                .resolves(expectedResult);

            const res = await server.inject({
                method: "GET",
                url: "/wishlists/client-id",
            });

            expect(res.statusCode).to.eql(200);
            expect(res.result).to.be.eql(expectedResult);
        });

        it("Should boom error", async function () {
            stubWishlistService.get.throws(
                new WishlistNotFoundException("id not found")
            );

            const res = await server.inject({
                method: "GET",
                url: "/wishlists/client-id",
            });

            expect(res.statusCode).to.be.eql(404);
        });
    });

    describe("When put", async function () {
        it("Should update wishlist", async function () {
            stubWishlistService.updateWishlist
                .withArgs("client-id", "prod-id")
                .resolves("ok");

            const res = await server.inject({
                method: "PUT",
                url: "/wishlists/client-id?product=prod-id",
            });

            expect(res.statusCode).to.eql(200);
            expect(res.result).to.be.eql("ok");
        });

        it("Should boom error", async function () {
            stubWishlistService.updateWishlist
                .withArgs("client-id", "prod-id")
                .throwsException(new Error("fake error"));

            const res = await server.inject({
                method: "PUT",
                url: "/wishlists/client-id?product=prod-id",
            });

            expect(res.statusCode).to.be.eql(500);
        });
    });

    describe("When delete", async function () {
        it("Should delete product from wishlist", async function () {
            stubWishlistService.deleteProduct
                .withArgs("client-id", "prod-id")
                .resolves("ok");

            const res = await server.inject({
                method: "DELETE",
                url: "/wishlists/client-id?product=prod-id",
            });

            expect(res.statusCode).to.eql(200);
            expect(res.result).to.be.eql("ok");
        });

        it("Should boom error", async function () {
            stubWishlistService.deleteProduct
                .withArgs("client-id", "prod-id")
                .throwsException(new Error("fake error"));

            const res = await server.inject({
                method: "DELETE",
                url: "/wishlists/client-id?product=prod-id",
            });

            expect(res.statusCode).to.be.eql(500);
        });
    });
});
