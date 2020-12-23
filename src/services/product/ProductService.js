const _ = require("lodash");
const ProductProvider = require("../../providers/product/ProductProvider");
const {
    ProductNotFoundException,
} = require("../../commons/exceptions/ProductExceptions");

const internal = {
    instance: null,
};

class ProductService {
    constructor() {
        if (internal.instance) return internal.instance;
        this.productProvider = new ProductProvider();
        internal.instance = this;
        return this;
    }

    async get(productId) {
        const product = await this.productProvider.getProduct(productId);
        if (_.isNil(product)) {
            throw new ProductNotFoundException(
                `Product with id (${productId}) not found`
            );
        }

        return this.formatProduct(product);
    }

    formatProduct(product) {
        const { title, image, price, reviewScore, id } = product;

        let formatedProduct = {
            id,
            title,
            image,
            price,
            url: this.productProvider.getProductUrl(id),
        };

        if (!_.isNil(reviewScore)) {
            formatedProduct.reviewScore = reviewScore;
        }

        return formatedProduct;
    }
}

module.exports = ProductService;
