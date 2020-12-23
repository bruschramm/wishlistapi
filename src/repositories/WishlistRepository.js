const WishlistModel = require("../models/Wishlist");

class WishlistRepository {
    constructor() {}

    async findByClientId(clientId) {
        return await WishlistModel.findOne({ clientId: clientId });
    }

    async create(wishlist) {
        return await WishlistModel.create(wishlist);
    }

    async update(wishlist) {
        return await WishlistModel.updateOne(
            { clientId: wishlist.clientId },
            wishlist
        );
    }
}

module.exports = WishlistRepository;
