// remove add view
import React, {useState} from "react";
import {GoogleMap, CrimeSearchBar} from "../../components";
import GeocodeAPI from "../../services/GeocodeAPI";
import { CrimeUpdateForm } from "../../components/crimeUpdateForm/crimeUpdatePage/crimeUpdatePage";
const uuidv4 = require('uuid/v4');
export const AddContext = React.createContext(null);
export const AddView = () => { 
const [addCrimeCentre, setAddCrimeCentre] = useState({lat: 52.397, lng: 0.4196});
const [mapMode, setMapMode] = useState('add');
// improve with REDUX
const [addCrimeLocations, setAddCrimeLocations]= useState([]);

const addCrimeToMap = (e) => {
    const newCrime = {'id': uuidv4(), 'location':{ 'latitude': e.latLng.lat(), 'longitude': e.latLng.lng(), 'address': ''}, 'toAdd':true } 
    GeocodeAPI.getAddress(e.latLng.lat(),e.latLng.lng()).then((address) => {
    newCrime.address = address;
    setAddCrimeLocations(addcrimeLocations => [...addcrimeLocations,newCrime])});    
  }

const resetAddMode = () => {
  setMapMode('add');
}

const searchByAddress = (address) => {
  GeocodeAPI.getCoordinates(address).then(({lat,lng}) => {
    setAddCrimeCentre(crimeCentre=> ({lat:lat, lng:lng, rad:crimeCentre.rad}))
    if (mapMode === "add") setMapMode('move_center');
  })  
};
return (
<div>
<CrimeSearchBar setRadius={null} searchByAddress={searchByAddress} mapMode={mapMode} searchView={false}/>
<GoogleMap
        id="myMap"
        options={{
          center: addCrimeCentre,
          zoom: 12
        }}
        crimeLocations = {addCrimeLocations}
        crimeCentre = {addCrimeCentre}
        mapMode = {mapMode}
        onMapClick = {addCrimeToMap}
        resetAddMode = {resetAddMode}
/>
<CrimeUpdateForm crimeLocations={addCrimeLocations}/>
</div>
);

}





