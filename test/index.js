"use strict";

var expect = require("chai").expect;
var useGoogleLocationAutocomplete = require("../dist/index").default;
var MissingAPIKeyError = require("../dist/errors").MissingAPIKeyError;

describe("useGoogleLocationAutocomplete", () => {

  it("Provides a helpful error when not passed an API key", () => {
    expect(useGoogleLocationAutocomplete).to.throw(MissingAPIKeyError);
  });

  it("Initializes correctly when given an API key", () => {
    expect(() => {
      return useGoogleLocationAutocomplete("qwerty")
    }).to.be.a("function");
  });
});