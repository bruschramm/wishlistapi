class ConflictWishlistException extends Error {
    constructor(args) {
        super(args);
        this.name = "ConflictWishlistException";
        this.statusCode = 409;
    }
}
class WishlistNotFoundException extends Error {
    constructor(args) {
        super(args);
        this.name = "WishlistNotFoundException";
        this.statusCode = 404;
    }
}
module.exports = {
    ConflictWishlistException,
    WishlistNotFoundException,
};
