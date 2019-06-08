import Geocode from "react-geocode";
import Config from "../config/config";

export default  {

  getCoordinates: (crimeCentre) => {
    return geocodeGetCoord(crimeCentre);
  },
 
  getAddress: (lat,lng) => {
    return geocodeGetAddress(lat,lng);
  }
} 

const geocodeGetAddress = (lat,lng) => {
  Geocode.setApiKey(Config.googleAPIKEY)
  return Geocode.fromLatLng(lat, lng).then(
    response => {
      const address = response.results[0].formatted_address;
      return address;
    },
    error => {
      console.error(error);
    }
  ); 
}
const geocodeGetCoord = (address) => {
  Geocode.setApiKey(Config.googleAPIKEY)
  return Geocode.fromAddress(address).then(
  response => {
      if (response) {
      const  { lat, lng } = response.results[0].geometry.location;
      return { lat, lng};
      } 
  },
    error => {
      console.error(error);
    }
  )
} 

 