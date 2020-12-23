const axios = require("axios");
const config = require("config");

class ProductProvider {
    constructor() {
        const { host, timeout } = config.get("product");

        this.host = host;
        this.timeout = timeout;
    }

    async getProduct(productId) {
        const url = this.getProductUrl(productId);

        const response = await axios.get(url, {
            timeout: this.timeout,
        });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }

    getProductUrl(productId) {
        return `${this.host}api/product/${productId}/`;
    }
}

module.exports = ProductProvider;
