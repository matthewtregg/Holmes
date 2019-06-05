// get API data from police
import Geocode from "react-geocode";
import React, {useEffect, useState} from "react";
import {CrimeMap} from "../../components/crimeMap/Map.js";

const uuidv4 = require('uuid/v4');
export const MapContext = React.createContext(null)

export const  MapView = () => {

const searchByAddress =(address) => {
  console.log(address);
  Geocode.setApiKey("AIzaSyBdf4RIrlAQ1io81BPgnZEhJD98l9Qu_AI");
  Geocode.fromAddress(address).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    error => {
      console.error(error);
    }
  );
  }

const [crimeLocations, setCrimeLocations] = useState([]);
// const [mapMode, setMapMode] = useState('');
// const [crimeCentre, setCrimeCentre] = useState('');

const url = "https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478"

useEffect(()=> {
  fetch(url)
  .then(res => res.json())
  .then(crimes => {
    const crimeCoordinates = crimes.map(crime => {return {'id':uuidv4(),'location': crime.location}});
    setCrimeLocations(crimeLocations => crimeCoordinates);
   });

}, []);

const onMapClick = (e) => {
  if (mapMode === "add") {
  const crimeLocation = {'id':uuidv4(), 'location':{latitude:e.latLng.lat(),longitude:e.latLng.lng()}}
  setCrimeLocations(crimeLocations => [...crimeLocations,crimeLocation]);
  }
};



return (
  <MapContext.Provider value={{
     onMapClick,
     searchByAddress
  }}>
  <CrimeMap crimeLocations={crimeLocations} />
  </MapContext.Provider> 
)


};


