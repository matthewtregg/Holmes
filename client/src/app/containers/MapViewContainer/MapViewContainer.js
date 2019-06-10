// get API data from police
import React, {useEffect, useState} from "react";
import {GoogleMap,CrimeList, CrimeSearchBar} from "../../components";
import PoliceAPI from "../../services/PoliceAPI";
import GeocodeAPI from "../../services/GeocodeAPI";
import localAPI from "../../services/localAPI";
import { CrimeUpdateForm } from "../../components/crimeUpdateForm/crimeUpdatePage/crimeUpdatePage";
import { CrimeBarChart } from "../../components/crimeBarChart/crimeBarChart";
import crimeLocationObj from "./crimeObj";
const uuidv4 = require('uuid/v4');

export const MapContext = React.createContext(null);

//"other-theft" "theft-from-the-person"


export const  MapView = ({match}) => {
// set search as the default mode
const initialMode = match.params.add ? match.params.add : 'search';
const [crimeLocations, setCrimeLocations] = useState([]);
const [mapMode, setMapMode] = useState(initialMode);
const [crimeCentre, setCrimeCentre] = useState({lat: 52.397, lng: 0.4196, rad:0.005});  

const setNewMode = (mapMode) => {
  // if moving to add or map search clear crime locations 
  if (mapMode === 'add'|| mapMode ==='search') setCrimeLocations([]);
  setMapMode(mapMode);
}

const resetAddMode = () => {
  setMapMode('add');
}

const resetSearchMode = () => {
  setMapMode('search');
}

// reduce crimes by location
useEffect(()=> {
  // get Police data based on Polygon coordinates
  if (mapMode === 'search' | mapMode === 'statistics') {
    PoliceAPI.getCrimes(crimeCentre)
    .then(crimes => {
      const crimeCoordinates  = crimeLocationObj.parsePoliceCrimes(crimes);
      setCrimeLocations(crimeLocations =>[...crimeLocations,...crimeCoordinates]);
    })
    localAPI.getCrimes(crimeCentre).then((crimes)=> {
    console.log(crimes)
    const newCrimeCoordinates = crimeLocationObj.parseLocalCrimes(crimes);
    console.log(newCrimeCoordinates)
    setCrimeLocations(crimeLocations=>[...crimeLocations,...newCrimeCoordinates]);
    });
    
  }
  
},[crimeCentre, mapMode]);


//geocoding API to turn address into lng lat.
const searchByAddress = (address) => {
    GeocodeAPI.getCoordinates(address).then(({lat,lng}) => {
    setCrimeCentre(crimeCentre=> ({lat:lat, lng:lng, rad:crimeCentre.rad}))
    // allows re-render when centering - but returns to add mode in google maps
    // on component update
    if (mapMode === "add") setMapMode('move_center');
  })  
};

const addCrimeToMap = (e) => {
  if (mapMode === "add") {
    const newCrime = {'id': uuidv4(), 'location':{ 'latitude': e.latLng.lat(), 'longitude': e.latLng.lng(), 'address': ''}, 'outcome':'', 'category':'' , 'toAdd':true } 
    GeocodeAPI.getAddress(e.latLng.lat(),e.latLng.lng()).then((address) => {
      newCrime.address = address;
      setCrimeLocations(crimeLocations => [...crimeLocations,newCrime])});    
  }
};

const setRadius = (event) => { 
  const e = event.target.value;
  const newRad = Number(e);
  setCrimeCentre(crimeCentre=>({lat:crimeCentre.lat, lng:crimeCentre.lng, rad:newRad}));
};

const saveCrimeToDb = (crimeLocation, newCategory, newOutcome, newAddress) => {
  const newCrime = {...crimeLocation, 
    "category": newCategory,
    "outcome": newOutcome,
    "address": newAddress
  } 
 
  localAPI.postCrime(newCrime).then(()=>{
    const newCrimeLocations = crimeLocations.map(crimeLocation => {
      crimeLocation.toAdd = false;
      return crimeLocation;
    })
    setCrimeLocations(crimeLocations=>[...crimeLocations,newCrimeLocations]) 
  });
}

const saveCrimesToDb = (category, outcome, location) => {
  const newCrimes = crimeLocations.filter(crimeLocation => crimeLocation.toAdd === true)
    .map(crimeLocation=>{
      const newCategory = category[crimeLocation.id] ? category[crimeLocation.id] : "all_crimes";  
      const newOutcome = outcome[crimeLocation.id]  ? outcome[crimeLocation.id] : "unknown";
      const address = location[crimeLocation.id] ? location[crimeLocation.id]: crimeLocation.address;
      return {...crimeLocation, 
        "category": newCategory,
        "outcome": newOutcome,
        "address": address
      }   
    });
    localAPI.postCrimes(newCrimes).then(()=>{
      const newCrimeLocations = crimeLocations.map(crimeLocation => {
        crimeLocation.toAdd = false;
        return crimeLocation;
      })
      setCrimeLocations(newCrimeLocations); 
    });  
}

//mark whether a crime record should be filtered
const markCrimeToFilter = (id, toFilter) => {
  const newCrimeLocations = crimeLocations
    .map(crimeLocation => {
    if (crimeLocation.id === id) crimeLocation.toFilter = toFilter;
    return crimeLocation})
    setCrimeLocations(newCrimeLocations);
} 

// filter crimes that have been marked for filtering
const filterCrimes = () => {
  const newCrimeLocations = crimeLocations
  .map(crimeLocation => {
  if (crimeLocation.toFilter) crimeLocation.hidden = true;
  crimeLocation.toFilter = false;
  return crimeLocation})
  setCrimeLocations(newCrimeLocations);
  
}

const filterByCategory = (event) => {
  const category = event.target.value;
  const newCrimeLocations = crimeLocations.map(crimeLocation => {
    crimeLocation.hidden = false;
    if (crimeLocation.category!==category && category!=="all_crimes") crimeLocation.hidden = true;
    return crimeLocation
  })
  setCrimeLocations(newCrimeLocations);
}

// focus in on crime
const focusInOnCrime = (id, focused) => {
  const newCrimeLocations = crimeLocations
    .map(crimeLocation => {
    if (crimeLocation.id !== id) crimeLocation.hidden = focused;
    if (crimeLocation.id === id) crimeLocation.focused = focused;
    return crimeLocation})
    setCrimeLocations(newCrimeLocations);
}

const showAllCrimes = () => {
  const newCrimeLocations = crimeLocations
    .map(crimeLocation => {
     crimeLocation.hidden = false;
     crimeLocation.focused = false;
    return crimeLocation})
    setCrimeLocations(newCrimeLocations);
}

const centralPane = mapMode === "statistics" ? <CrimeBarChart width={600} height={400} crimeLocations = {crimeLocations}/>:null;
const mapWidth = mapMode === "statistics" ? 600 : null
const BottomOfScreen = mapMode === "add"? <CrimeUpdateForm crimeLocations={crimeLocations} saveCrimesToDb={saveCrimesToDb} saveCrimeToDb={saveCrimeToDb} /> : <CrimeList crimeLocations={crimeLocations} mapMode={mapMode} showAllCrimes={showAllCrimes} filterCrimes={filterCrimes}/>


return (
  <MapContext.Provider value={{focusInOnCrime,markCrimeToFilter}}>
  <CrimeSearchBar filterByCategory={filterByCategory} setRadius={setRadius} setNewMode={setNewMode}  searchByAddress={searchByAddress} mapMode={mapMode} />
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
resetSearchMode = {resetSearchMode}
mapHeight={400}
mapWidth={mapWidth}
/>
  {centralPane}
  {BottomOfScreen} 
  </MapContext.Provider> 

)

};

