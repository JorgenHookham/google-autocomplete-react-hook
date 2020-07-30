/// <reference types="googlemaps" />
interface useGoogleLocationAutocompleteReturn {
    getPlacePredictions: (request: google.maps.places.AutocompletionRequest) => Promise<google.maps.places.AutocompletePrediction[]>;
    geocode: (request: google.maps.GeocoderRequest) => Promise<google.maps.GeocoderResult[]>;
}
declare const useGoogleLocationAutocomplete: (GoogleMapsAPIKey: string) => useGoogleLocationAutocompleteReturn;
export default useGoogleLocationAutocomplete;
