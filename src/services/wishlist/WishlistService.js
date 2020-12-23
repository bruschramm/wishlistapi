const _ = require("lodash");
const WishlistRepository = require("../../repositories/WishlistRepository");
const ClientService = require("../client");
const ProductService = require("../product");
const {
    ConflictWishlistException,
    WishlistNotFoundException,
} = require("../../commons/exceptions/WishlistExceptions");

const internal = { instance: null };

class WishlistService {
    constructor() {
        if (internal.instance) return internal.instance;
        this.wishlistRepository = new WishlistRepository();
        this.clientService = new ClientService();
        this.productService = new ProductService();
        this.resultSize = 100;
        internal.instance = this;
        return this;
    }

    async getWishlist(clientId) {
        const wishlist = await this.wishlistRepository.findByClientId(clientId);

        if (_.isEmpty(wishlist)) {
            throw new WishlistNotFoundException(
                `Wishlist not found for client (${clientId})`
            );
        }

        return wishlist;
    }

    async get(clientId, page) {
        const clientWishlist = await this.getWishlist(clientId);

        const pagedProducts = this.getPagedProducts(
            clientWishlist.productList,
            page
        );

        let products = await Promise.all(
            pagedProducts.map((productId) => this.productService.get(productId))
        );

        products = products.filter((product) => !!product);

        return {
            meta: {
                page,
                size: this.resultSize,
            },
            records: products,
        };
    }

    getPagedProducts(productList, page) {
        const startIndex = (page - 1) * this.resultSize;
        return _.slice(productList, [startIndex], [this.resultSize]);
    }

    async updateWishlist(clientId, productId) {
        const clientWishlist = await this.wishlistRepository.findByClientId(
            clientId
        );

        if (!_.isEmpty(clientWishlist)) {
            await this.addProduct(clientWishlist, productId);
        } else {
            await this.createWishlist(clientId, productId);
        }
        return "Product successfully added to wishlist";
    }

    async addProduct(wishlist, productId) {
        if (wishlist.productList.includes(productId)) {
            throw new ConflictWishlistException(
                `Product (${productId}) alread added to wishlist`
            );
        } else {
            await this.productService.get(productId);
            wishlist.productList.push(productId);
        }
        return this.wishlistRepository.update(wishlist);
    }

    async createWishlist(clientId, productId) {
        await this.clientService.get(clientId);

        const wishlist = {
            clientId,
            productList: [productId],
        };

        return this.wishlistRepository.create(wishlist);
    }

    async deleteProduct(clientId, productId) {
        const wishlist = await this.getWishlist(clientId);
        if (!wishlist.productList.includes(productId)) {
            throw new WishlistNotFoundException(
                `Product not found in wishlist (${clientId})`
            );
        }
        wishlist.productList = wishlist.productList.filter(
            (v) => v != productId
        );
        await this.wishlistRepository.update(wishlist);
        return "Product successfully deleted from wishlist";
    }
}

module.exports = WishlistService;
