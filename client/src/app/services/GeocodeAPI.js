import Geocode from "react-geocode";
import Config from "../config/config";

export default  {

  getCoordinates: (crimeCentre) => {
    return geocodeGetCoord(crimeCentre);
  }
 
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

 