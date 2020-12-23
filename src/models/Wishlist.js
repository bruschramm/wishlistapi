const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
    {
        id: {
            type: String,
        },
        clientId: {
            type: String,
            required: true,
        },
        productList: {
            type: [String],
        },
    },
    { versionKey: false, timestamps: true }
);

const WishlistModel = mongoose.model("Wishlist", WishlistSchema);

module.exports = WishlistModel;
