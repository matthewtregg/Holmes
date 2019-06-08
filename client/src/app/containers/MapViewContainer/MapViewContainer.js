// get API data from police
import React, {useEffect, useState} from "react";
import {GoogleMap,CrimeList, CrimeSearchBar} from "../../components";
import PoliceAPI from "../../services/PoliceAPI";
import GeocodeAPI from "../../services/GeocodeAPI";
import { CrimeUpdateForm } from "../../components/crimeUpdateForm/crimeUpdatePage/crimeUpdatePage";
const uuidv4 = require('uuid/v4');
export const MapContext = React.createContext(null);

export const  MapView = ({match}) => {

const initialMode = match.params.add ? match.params.add : 'search';
const [crimeLocations, setCrimeLocations] = useState([]);
const [mapMode, setMapMode] = useState(initialMode);
const [crimeCentre, setCrimeCentre] = useState({lat: 52.397, lng: 0.4196, rad:0.005});  


useEffect(()=> {
  // get Police data based on Polygon coordinates
  if (mapMode === 'search') {
  PoliceAPI.getCrimes(crimeCentre)
  .then(crimes => {
    const crimeCoordinates = crimes.map(crime => {return {'id':uuidv4(),'location': crime.location, 'category': crime.category, 'month': crime.month, 'outcome':crime.outcome_status, 'persisted': true, 'hidden':false, 'toAdd':false}});
    setCrimeLocations(crimeCoordinates);
  });
  }
},[crimeCentre, mapMode]);

//geocoding API to turn address into lng lat.
const searchByAddress = (address) => {
  GeocodeAPI.getCoordinates(address).then(({lat,lng}) => {
    setCrimeCentre(crimeCentre=> ({lat:lat, lng:lng, rad:crimeCentre.rad}))
    if (mapMode === "add") setMapMode('move_center');
  })  
};

const resetAddMode = () => {
  setMapMode('add');
}

const addCrimeToMap = (e) => {
  if (mapMode === "add") { 
    const newCrime = {'id': uuidv4(), 'location':{ 'latitude': e.latLng.lat(), 'longitude': e.latLng.lng(), 'address': ''}, 'outcome':'', 'category':'' , 'toAdd':true } 
    console.log(newCrime);
    GeocodeAPI.getAddress(e.latLng.lat(),e.latLng.lng()).then((address) => {
      newCrime.address = address;
      setCrimeLocations(crimeLocations => [...crimeLocations,newCrime])});    
  }
};

const setAddMode = () => {
  const newMode = mapMode !== 'add' ? 'add': 'search';
  if (mapMode === 'add') setCrimeLocations([]);
  setMapMode(newMode);
}

const setRadius = (event) => { 
  const e = event.target.value
  const newRad = Number(e)
  setCrimeCentre(crimeCentre=>({lat:crimeCentre.lat, lng:crimeCentre.lng, rad:newRad}));
};



//toggle whether a crime record is viewed
const toggleCrime = (id, hidden) => {
  const newCrimeLocations = crimeLocations
    .map(crimeLocation => {
    if (crimeLocation.id !== id) crimeLocation.hidden = hidden;
    return crimeLocation})
    setCrimeLocations(newCrimeLocations);
} 

const BottomOfScreen = mapMode === "add"? <CrimeUpdateForm crimeLocations={crimeLocations}/> : <CrimeList crimeLocations={crimeLocations}/>
return (
  <MapContext.Provider value={{toggleCrime}}>
  <CrimeSearchBar setRadius={setRadius} setAddMode={setAddMode}  searchByAddress={searchByAddress} mapMode={mapMode} searchView={true}/>
  <GoogleMap
        id="myMap"
        options={{
          center: crimeCentre,
          zoom: 12
        }}
        crimeLocations = {crimeLocations}
        crimeCentre = {crimeCentre}
        mapMode = {mapMode}
        onMapClick = {addCrimeToMap}
        resetAddMode = {resetAddMode}
      />
  {BottomOfScreen} 
  </MapContext.Provider> 
)

};

