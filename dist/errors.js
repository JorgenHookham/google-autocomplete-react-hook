"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MissingAPIKeyError extends Error {
    constructor() {
        super("You must pass a valid API key.");
        this.name = "MissingAPIKeyError";
    }
}
exports.MissingAPIKeyError = MissingAPIKeyError;
