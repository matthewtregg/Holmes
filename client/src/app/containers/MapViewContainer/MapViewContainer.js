// get API data from police
import Geocode from "react-geocode";
import React, {useEffect, useState} from "react";
import {CrimeMap,CrimeList, CrimeSearchBar} from "../../components";
import { CrimeUpdateForm } from "../../components/crimeUpdateForm/crimeUpdatePage";
const uuidv4 = require('uuid/v4');
export const MapContext = React.createContext(null)

export const  MapView = () => {

const searchByAddress =(address) => {
  Geocode.setApiKey("AIzaSyBRgCQikRzUSKgQrMjYvylRHH-vWxfKLIg");
  Geocode.fromAddress(address).then(
    response => {
      if (response) {
      const { lat, lng } = response.results[0].geometry.location;
      setCrimeCentre({lat, lng}); 
      console.log(lat, lng);
      } 
    },
    error => {
      console.error(error);
    }
  );
  }

const [crimeLocations, setCrimeLocations] = useState([]);
// locations to save locally on my own storage
const [mapMode, setMapMode] = useState('');
const [crimeCentre, setCrimeCentre] = useState({lat: 52.397, lng: 0.4196});


useEffect(()=> {
  const url = `https://data.police.uk/api/crimes-street/all-crime?poly=${crimeCentre.lat + 0.005},${crimeCentre.lng -0.005}:${crimeCentre.lat -0.005 },${crimeCentre.lng +0.005}:${crimeCentre.lat + 0.01},${crimeCentre.lng +0.01}`

  fetch(url)
  .then(res => res.json())
  .then(crimes => {
    console.log(crimes)
    const crimeCoordinates = crimes.map(crime => {return {'id':uuidv4(),'location': crime.location, 'category': crime.category, 'month': crime.month, 'outcome':crime.outcome_status, 'persisted': true, 'hidden':false, 'toAdd':false}});
    setCrimeLocations(crimeLocations => crimeCoordinates);
   });

},[crimeCentre]);

const onMapClick = (e) => {
  if (mapMode === "add") { 
    const newCrime = {'id': uuidv4(), 'location':{ 'latitude': e.latLng.lat(), 'longitude': e.latLng.lng()}, 'toAdd':true } 
    setCrimeLocations(crimeLocations => [...crimeLocations,newCrime]);
  }
};

const setAddMode = () => {
  setMapMode(mapMode =>"add")
}

const viewCrime = (id) => {
  const newCrimeLocations = crimeLocations.map(crimeLocation => {
    if (crimeLocation.id !== id) crimeLocation.hidden = true;
    return crimeLocation})
  setCrimeLocations(crimeLocations => newCrimeLocations);
} 

let BottomOfScreen = {}; 
mapMode === "add"? BottomOfScreen = <CrimeUpdateForm crimeLocations={crimeLocations}/> : BottomOfScreen = <CrimeList crimeLocations={crimeLocations}/>
return (
  <MapContext.Provider value={{
     onMapClick,
     searchByAddress,
     crimeCentre,
     setAddMode,
     viewCrime
  }}>
  <CrimeSearchBar/>
  <CrimeMap crimeLocations={crimeLocations} />
  {BottomOfScreen} 
  </MapContext.Provider> 
)


};

