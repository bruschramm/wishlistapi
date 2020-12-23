const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        id: {
            type: String,
        },
    },
    { versionKey: false, timestamps: true }
);

const ClientModel = mongoose.model("Client", ClientSchema);

module.exports = ClientModel;
