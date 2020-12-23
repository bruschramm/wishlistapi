"use strict";

const axios = require("axios");
const { expect } = require("chai");
const sinon = require("sinon");
const ProductProvider = require("../../../providers/product/ProductProvider");

describe("Product provider", function () {
    let productProvider;
    let resolvedProduct;
    let axiosStub;

    beforeEach(function () {
        axiosStub = sinon.stub(axios, "get");

        productProvider = new ProductProvider();

        resolvedProduct = {
            status: 200,
            data: {
                reviewScore: 5,
                title: "Secador de Cabelo 1900W 2 Velocidades",
                price: 229.9,
                brand: "wahl clipper",
                id: "af04c0ee-7137-4848-fd33-a2d148412095",
                image:
                    "http://challenge-api.luizalabs.com/images/af04c0ee-7137-4848-fd33-a2d148412095.jpg",
            },
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("When get a product", async function () {
        it("Should return product", async function () {
            axiosStub.resolves(resolvedProduct);
            const result = await productProvider.getProduct("prod-id");
            expect(result).to.be.eql(resolvedProduct.data);
        });

        it("should not return product", async function () {
            resolvedProduct.status = 404;
            axiosStub.resolves(resolvedProduct);
            const result = await productProvider.getProduct("prod-id");
            expect(result).to.be.null;
        });

        it("should boom error", async function () {
            axiosStub.throws({ statusCode: 500 });
            try {
                await productProvider.getProduct("prod-id");
            } catch (err) {
                expect(err.statusCode).to.be.equal(500);
            }
        });
    });
});
