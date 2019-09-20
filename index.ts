import { useState, useEffect } from "react";
import loadGoogleMapsAPI from "load-google-maps-api";
import {
  MissingAPIKeyError
} from "./errors";

const useGoogleLocationAutocomplete = (GoogleMapsAPIKey: string): (
  (request: google.maps.places.AutocompletionRequest) => Promise<google.maps.places.AutocompletePrediction[]>
) => {

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

  return (request) => {
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
  };
};

export default useGoogleLocationAutocomplete;
