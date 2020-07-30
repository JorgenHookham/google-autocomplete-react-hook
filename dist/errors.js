"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingAPIKeyError = void 0;
class MissingAPIKeyError extends Error {
    constructor() {
        super("You must pass a valid API key.");
        this.name = "MissingAPIKeyError";
    }
}
exports.MissingAPIKeyError = MissingAPIKeyError;
