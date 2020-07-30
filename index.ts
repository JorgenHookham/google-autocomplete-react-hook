import { useState, useEffect } from "react";
import loadGoogleMapsAPI from "load-google-maps-api";
import {
  MissingAPIKeyError
} from "./errors";

interface useGoogleLocationAutocompleteReturn {
  getPlacePredictions: (request: google.maps.places.AutocompletionRequest) => Promise<google.maps.places.AutocompletePrediction[]>;
}

const useGoogleLocationAutocomplete = (GoogleMapsAPIKey: string): useGoogleLocationAutocompleteReturn => {

  if (typeof GoogleMapsAPIKey !== "string") {
    throw new MissingAPIKeyError();
  }

  const [
    sessionToken,
    setSessionToken
  ] = useState<google.maps.places.AutocompleteSessionToken>();
  const [
    autocompleteService,
    setAutocompleteService
  ] = useState<google.maps.places.AutocompleteService>();

  useEffect((): void => {
    loadGoogleMapsAPI({
      key: GoogleMapsAPIKey,
      libraries: ["places"]
    })
      .then(googleMaps => {
        setSessionToken(new googleMaps.places.AutocompleteSessionToken());
        setAutocompleteService(new googleMaps.places.AutocompleteService());
      });
  }, []);

  return {
    getPlacePredictions: (request) => {
      return new Promise(
        (resolve): void => {
          if (!autocompleteService || !sessionToken) {
            resolve([]);
          } else {
            autocompleteService.getPlacePredictions(
              Object.assign({}, request, {sessionToken}),
              resolve
            );
          }
        }
      );
    }
  };
};


export default useGoogleLocationAutocomplete;
