"use strict";

const { expect } = require("chai");
const sinon = require("sinon");
const ProductService = require("../../../services/product");
const ProductProvider = require("../../../providers/product/ProductProvider");

describe("Product service", function () {
    let productService;
    let productProviderStub;

    let resolvedProduct;

    beforeEach(function () {
        productProviderStub = sinon.stub(new ProductProvider());
        productService = new ProductService();
        sinon
            .stub(productService, "productProvider")
            .value(productProviderStub);

        resolvedProduct = {
            reviewScore: 5,
            title: "Secador de Cabelo 1900W 2 Velocidades",
            price: 229.9,
            brand: "wahl clipper",
            id: "af04c0ee-7137-4848-fd33-a2d148412095",
            image:
                "http://challenge-api.luizalabs.com/images/af04c0ee-7137-4848-fd33-a2d148412095.jpg",
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("When get a product", async function () {
        it("Should return product", async function () {
            productProviderStub.getProduct.resolves(resolvedProduct);
            productProviderStub.getProductUrl.returns(
                "https://challenge-api.luizalabs.com/api/product/af04c0ee-7137-4848-fd33-a2d148412095/"
            );
            const result = await productService.get("prod-id");

            const expectedResult = {
                id: "af04c0ee-7137-4848-fd33-a2d148412095",
                title: "Secador de Cabelo 1900W 2 Velocidades",
                image:
                    "http://challenge-api.luizalabs.com/images/af04c0ee-7137-4848-fd33-a2d148412095.jpg",
                price: 229.9,
                url:
                    "https://challenge-api.luizalabs.com/api/product/af04c0ee-7137-4848-fd33-a2d148412095/",
                reviewScore: 5,
            };
            expect(result).to.be.eql(expectedResult);
        });

        it("Should return product without review", async function () {
            delete resolvedProduct.reviewScore;
            productProviderStub.getProduct.resolves(resolvedProduct);
            productProviderStub.getProductUrl.returns(
                "https://challenge-api.luizalabs.com/api/product/af04c0ee-7137-4848-fd33-a2d148412095/"
            );
            const result = await productService.get("prod-id");

            const expectedResult = {
                id: "af04c0ee-7137-4848-fd33-a2d148412095",
                title: "Secador de Cabelo 1900W 2 Velocidades",
                image:
                    "http://challenge-api.luizalabs.com/images/af04c0ee-7137-4848-fd33-a2d148412095.jpg",
                price: 229.9,
                url:
                    "https://challenge-api.luizalabs.com/api/product/af04c0ee-7137-4848-fd33-a2d148412095/",
            };
            expect(result).to.be.eql(expectedResult);
        });

        it("should boom error", async function () {
            productProviderStub.getProduct.resolves(null);
            try {
                await productService.get("prod-id");
            } catch (err) {
                expect(err.name).to.be.equal("ProductNotFoundException");
            }
        });
    });
});
