const config = require("config");
const mongoose = require("mongoose");

class MongoConnection {
    async connect() {
        const { mongoUri } = config.get("mongo");

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
}

module.exports = new MongoConnection();
