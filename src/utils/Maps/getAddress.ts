import { PlaceData } from "@/interfaces/favorite.interface";

const getAddress = async (location: google.maps.LatLngLiteral, geoCodingLibrary: google.maps.GeocodingLibrary): Promise<PlaceData | null> => {

    if (!geoCodingLibrary) return null;
    const geoCoder = new geoCodingLibrary.Geocoder();

    const geoCoderRequest: google.maps.GeocoderRequest = {
        location: location,
        language: "th",
    }

    const response = await geoCoder.geocode(geoCoderRequest);

    console.log(response);

    if (response.results.length > 0) {
        return {
            formatted_address: response.results[0].formatted_address,
            place_id: response.results[0].place_id
        }
    }

    return null;
}

export default getAddress;