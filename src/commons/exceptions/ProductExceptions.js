class ProductNotFoundException extends Error {
    constructor(args) {
        super(args);
        this.name = "ProductNotFoundException";
        this.statusCode = 404;
    }
}
module.exports = {
    ProductNotFoundException,
};
