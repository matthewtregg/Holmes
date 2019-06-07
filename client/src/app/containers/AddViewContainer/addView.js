import React, {useState} from "react";
import {GoogleMap} from "../../components";
import { CrimeUpdateForm } from "../../components/crimeUpdateForm/crimeUpdatePage/crimeUpdatePage";
const uuidv4 = require('uuid/v4');
export const AddContext = React.createContext(null);

export const AddView = () => { 
const [addCrimeCentre, setAddCrimeCentre] = useState({lat: 52.397, lng: 0.4196});
const [addCrimeLocations, setAddCrimeLocations]= useState([]);
const onMapClick = (e) => {
      console.log(e);
      const newCrime = {'id': uuidv4(), 'location':{ 'latitude': e.latLng.lat(), 'longitude': e.latLng.lng()}, 'toAdd':true } 
      setAddCrimeLocations(addCrimeLocations => [...addCrimeLocations,newCrime]);
}

console.log(addCrimeCentre);
return (
<div>
<GoogleMap
        id="myMap"
        options={{
          center: addCrimeCentre,
          zoom: 12
        }}
        crimeLocations = {addCrimeLocations}
        crimeCentre = {addCrimeCentre}
        mapMode = {'add'}
        onMapClick = {onMapClick}
/>
<CrimeUpdateForm crimeLocations={addCrimeLocations}/>
</div>
);

}




