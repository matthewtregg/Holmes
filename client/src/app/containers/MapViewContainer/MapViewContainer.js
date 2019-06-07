// get API data from police
import React, {useEffect, useState} from "react";
import {GoogleMap,CrimeList, CrimeSearchBar} from "../../components";
import PoliceAPI from "../../services/PoliceAPI";
import GeocodeAPI from "../../services/GeocodeAPI";
import { CrimeUpdateForm } from "../../components/crimeUpdateForm/crimeUpdatePage/crimeUpdatePage";
const uuidv4 = require('uuid/v4');
export const MapContext = React.createContext(null)

export const  MapView = () => {
const [crimeLocations, setCrimeLocations] = useState([]);
const [mapMode, setMapMode] = useState('');
const [crimeCentre, setCrimeCentre] = useState({lat: 52.397, lng: 0.4196});  


useEffect(()=> {
  // get Police data based on Polygon coordinates
  PoliceAPI.getCrimes(crimeCentre)
  .then(crimes => {
    const crimeCoordinates = crimes.map(crime => {return {'id':uuidv4(),'location': crime.location, 'category': crime.category, 'month': crime.month, 'outcome':crime.outcome_status, 'persisted': true, 'hidden':false, 'toAdd':false}});
    setCrimeLocations(crimeCoordinates);
  });
},[crimeCentre]);
//geocoding API to turn address into lng lat.
const searchByAddress = (address) => {
  GeocodeAPI.getCoordinates(address).then(({lat,lng}) => setCrimeCentre({lat,lng}));
}
//addCrimeTomap
const onMapClick = (e) => {
  if (mapMode === "add") { 
    const newCrime = {'id': uuidv4(), 'location':{ 'latitude': e.latLng.lat(), 'longitude': e.latLng.lng()}, 'toAdd':true } 
    setCrimeLocations(crimeLocations => [...crimeLocations,newCrime]);
  }
};
//changeMapmode
const setAddMode = () => {
  const newMode = mapMode === 'add' ? '': 'add';
  setMapMode(newMode);
}

//toggle whether a crime record is viewed
const toggleCrime = (id, hidden) => {
  const newCrimeLocations = crimeLocations
    .map(crimeLocation => {
    if (crimeLocation.id === id) crimeLocation.hidden = hidden;
    return crimeLocation})
    setCrimeLocations(newCrimeLocations);
} 

const BottomOfScreen = mapMode === "add"? <CrimeUpdateForm crimeLocations={crimeLocations}/> : <CrimeList crimeLocations={crimeLocations}/>
return (
  <MapContext.Provider value={{
     toggleCrime
  }}>
  <CrimeSearchBar setAddMode={setAddMode}  searchByAddress={searchByAddress} mapMode={mapMode}/>
  <GoogleMap
        id="myMap"
        options={{
          center: crimeCentre,
          zoom: 12
        }}
        crimeLocations = {crimeLocations}
        crimeCentre = {crimeCentre}
        mapMode = {mapMode}
        onMapClick = {onMapClick}
      />
  {BottomOfScreen} 
  </MapContext.Provider> 
)

};

