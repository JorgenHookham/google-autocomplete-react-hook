/// <reference types="googlemaps" />
interface useGoogleLocationAutocompleteReturn {
    getPlacePredictions: (request: google.maps.places.AutocompletionRequest) => Promise<google.maps.places.AutocompletePrediction[]>;
}
declare const useGoogleLocationAutocomplete: (GoogleMapsAPIKey: string) => useGoogleLocationAutocompleteReturn;
export default useGoogleLocationAutocomplete;
