class ConflictEmailException extends Error {
    constructor(args) {
        super(args);
        this.name = "ConflictEmailException";
        this.statusCode = 409;
    }
}
class ClientNotFoundException extends Error {
    constructor(args) {
        super(args);
        this.name = "ClientNotFoundException";
        this.statusCode = 404;
    }
}
module.exports = {
    ConflictEmailException,
    ClientNotFoundException,
};
