# Google Autocomplete React Hook

A react hook wrapper for the google maps location autocomplete api. See also [Google's places autocomplete docs](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service).

## Installation

```sh
npm i google-autocomplete-react-hook
yarn add google-autocomplete-react-hook
```

## Usage

The hook accepts an API key and will return a function that you can use to make autocompletion requests to Google's API.

The returned getPlacePredictions function accepts an [AutocompletionRequest](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest)
and returns a promise-wrapped list of [AutocompletePrediction](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletePrediction).

The returned geocode function accepts an [GeocoderRequest](https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest)
and returns a promise-wrapped list of [GeocoderResult](https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderResult)

**Basic Example**

```typescript
import useGoogleLocationAutocomplete from "google-autocomplete-react-hook";

const MyComponent: React.FC = () => {
  const { getPlacePredictions, geocode } = useGoogleLocationAutocomplete("mygoogleapikey");
  getPlacePredictions({input: "Calif"}).then(results => {
    results.map(r => {
      geocode({placeId: r.place_id}, console.log)
    })
  });
}
```

## Tests

```sh
npm run test
```
