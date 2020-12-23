"use strict";

const Bcrypt = require("bcrypt");
const fs = require("fs");
const yaml = require("js-yaml");

class Authenticator {
    constructor() {
        const fileContents = fs.readFileSync("credentials.yaml", "utf8");
        this.credentials = yaml.safeLoad(fileContents);
    }

    async authenticate(username, password) {
        const user = this.credentials.users[username];
        if (!user) {
            return { credentials: null, isValid: false };
        }

        const isValid = await Bcrypt.compare(password, user.password);
        const credentials = { name: username };

        return { isValid, credentials };
    }
}

const authenticator = new Authenticator();

const authenticate = async (request, username, password, h) => {
    return authenticator.authenticate(username, password);
};

module.exports = authenticate;
