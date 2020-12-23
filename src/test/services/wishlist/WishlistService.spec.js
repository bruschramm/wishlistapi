"use strict";

const { expect } = require("chai");
const sinon = require("sinon");
const WishlistService = require("../../../services/wishlist");
const ClientService = require("../../../services/client");
const ProductService = require("../../../services/product");
const WishlistRepository = require("../../../repositories/WishlistRepository");

describe("Wishlist service", function () {
    let wishlistService;
    let clientServiceStub;
    let wishlistRepositoryStub;
    let productServiceStub;

    let resolvedProduct;
    let resolvedWishlist;
    let client;

    beforeEach(function () {
        wishlistRepositoryStub = sinon.stub(new WishlistRepository());
        clientServiceStub = sinon.stub(new ClientService());
        productServiceStub = sinon.stub(new ProductService());

        wishlistService = new WishlistService();
        sinon
            .stub(wishlistService, "wishlistRepository")
            .value(wishlistRepositoryStub);
        sinon.stub(wishlistService, "clientService").value(clientServiceStub);
        sinon.stub(wishlistService, "productService").value(productServiceStub);

        resolvedProduct = {
            id: "af04c0ee-7137-4848-fd33-a2d148412095",
            title: "Secador de Cabelo 1900W 2 Velocidades",
            image:
                "http://challenge-api.luizalabs.com/images/af04c0ee-7137-4848-fd33-a2d148412095.jpg",
            price: 229.9,
            url:
                "https://challenge-api.luizalabs.com/api/product/af04c0ee-7137-4848-fd33-a2d148412095/",
            reviewScore: 5,
        };

        resolvedWishlist = {
            _id: "prod-id",
            clientId: "client-id",
            productList: [
                "af04c0ee-7137-4848-fd33-a2d148412095",
                "958ec015-cfcf-258d-c6df-1721de0ab6ea",
                "1bf0f365-fbdd-4e21-9786-da459d78dd1f",
            ],
        };

        client = {
            name: "foo",
            email: "foo@email.com",
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("When get a client wishlist", async function () {
        it("Should return wihslist", async function () {
            wishlistRepositoryStub.findByClientId.resolves(resolvedWishlist);
            productServiceStub.get
                .withArgs("af04c0ee-7137-4848-fd33-a2d148412095")
                .resolves(resolvedProduct);
            const result = await wishlistService.get("client-id", 1);

            const expectedResult = {
                meta: {
                    page: 1,
                    size: 100,
                },
                records: [resolvedProduct],
            };

            expect(result).to.be.eql(expectedResult);
        });

        it("should boom error", async function () {
            wishlistRepositoryStub.findByClientId.resolves({});
            try {
                await wishlistService.get("client-id", 1);
            } catch (err) {
                expect(err.name).to.be.equal("WishlistNotFoundException");
            }
        });
    });

    describe("When delete a product from wishlist", async function () {
        it("Should delete product", async function () {
            wishlistRepositoryStub.findByClientId.resolves(resolvedWishlist);
            wishlistRepositoryStub.update.resolves();
            const res = await wishlistService.deleteProduct(
                "client-id",
                "af04c0ee-7137-4848-fd33-a2d148412095"
            );
            expect(res).to.be.equal(
                "Product successfully deleted from wishlist"
            );
        });

        it("should boom error", async function () {
            wishlistRepositoryStub.findByClientId.resolves(resolvedWishlist);
            try {
                await wishlistService.deleteProduct(
                    "client-id",
                    "prod-not-found"
                );
            } catch (err) {
                expect(err.name).to.be.equal("WishlistNotFoundException");
            }
        });
    });

    describe("When add a product to a new wishlist", async function () {
        it("Should create a wishlist", async function () {
            wishlistRepositoryStub.findByClientId.resolves({});
            clientServiceStub.get.resolves(client);
            wishlistRepositoryStub.create.resolves();
            const result = await wishlistService.updateWishlist(
                "client-id",
                "prod-id"
            );
            expect(result).to.be.equal(
                "Product successfully added to wishlist"
            );
        });

        it("should boom error", async function () {
            wishlistRepositoryStub.findByClientId.resolves({});
            clientServiceStub.get.resolves({});
            try {
                await wishlistService.updateWishlist("client-id", "prod-id");
            } catch (err) {
                expect(err.name).to.be.equal("ClientNotFoundException");
            }
        });
    });

    describe("When add a product to a existing wishlist", async function () {
        it("Should update wishlist", async function () {
            wishlistRepositoryStub.findByClientId.resolves(resolvedWishlist);
            clientServiceStub.get.resolves(client);
            wishlistRepositoryStub.update.resolves();
            const result = await wishlistService.updateWishlist(
                "client-id",
                "prod-id"
            );
            expect(result).to.be.equal(
                "Product successfully added to wishlist"
            );
        });

        it("should boom error", async function () {
            wishlistRepositoryStub.findByClientId.resolves(resolvedWishlist);
            clientServiceStub.get.resolves(client);
            try {
                await wishlistService.updateWishlist(
                    "client-id",
                    "af04c0ee-7137-4848-fd33-a2d148412095"
                );
            } catch (err) {
                expect(err.name).to.be.equal("ConflictWishlistException");
            }
        });
    });
});
