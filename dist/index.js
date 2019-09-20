"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const load_google_maps_api_1 = __importDefault(require("load-google-maps-api"));
const errors_1 = require("./errors");
const useGoogleLocationAutocomplete = (GoogleMapsAPIKey) => {
    if (typeof GoogleMapsAPIKey !== "string") {
        throw new errors_1.MissingAPIKeyError();
    }
    const [sessionToken, setSessionToken] = react_1.useState();
    const [autocompleteService, setAutocompleteService] = react_1.useState();
    react_1.useEffect(() => {
        load_google_maps_api_1.default({
            key: GoogleMapsAPIKey,
            libraries: ["places"]
        })
            .then(googleMaps => {
            setSessionToken(new googleMaps.places.AutocompleteSessionToken());
            setAutocompleteService(new googleMaps.places.AutocompleteService());
        });
    }, []);
    return (request) => {
        return new Promise((resolve) => {
            if (!autocompleteService || !sessionToken) {
                resolve([]);
            }
            else {
                autocompleteService.getPlacePredictions(Object.assign({}, request, { sessionToken }), resolve);
            }
        });
    };
};
exports.default = useGoogleLocationAutocomplete;
