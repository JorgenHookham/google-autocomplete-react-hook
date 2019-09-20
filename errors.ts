class MissingAPIKeyError extends Error {
  constructor () {
    super("You must pass a valid API key.");
    this.name = "MissingAPIKeyError";
  }
}

export {
  MissingAPIKeyError
}