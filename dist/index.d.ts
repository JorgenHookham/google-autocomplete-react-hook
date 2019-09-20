/// <reference types="googlemaps" />
declare const useGoogleLocationAutocomplete: (GoogleMapsAPIKey: string) => (request: google.maps.places.AutocompletionRequest) => Promise<google.maps.places.AutocompletePrediction[]>;
export default useGoogleLocationAutocomplete;
