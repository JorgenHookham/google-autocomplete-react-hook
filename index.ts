import { useState, useEffect } from "react";
import loadGoogleMapsAPI from "load-google-maps-api";
import {
  MissingAPIKeyError
} from "./errors";

interface useGoogleLocationAutocompleteReturn {
  getPlacePredictions: (request: google.maps.places.AutocompletionRequest) => Promise<google.maps.places.AutocompletePrediction[]>
  geocode: (request: google.maps.GeocoderRequest) => Promise<google.maps.GeocoderResult[]>
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
  const [
    geocoderService,
    setGeocoderService
  ] = useState<google.maps.Geocoder>();

  useEffect((): void => {
    loadGoogleMapsAPI({
      key: GoogleMapsAPIKey,
      libraries: ["places"]
    })
      .then(googleMaps => {
        setSessionToken(new googleMaps.places.AutocompleteSessionToken());
        setAutocompleteService(new googleMaps.places.AutocompleteService());
        setGeocoderService(new googleMaps.Geocoder());
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
    },
    geocode: (request) => {
      return new Promise(
        (resolve): void => {
          if (!geocoderService) {
            resolve([]);
          } else {
            geocoderService.geocode(request, resolve)
          }
        }
      )
    }
  };
};


export default useGoogleLocationAutocomplete;
