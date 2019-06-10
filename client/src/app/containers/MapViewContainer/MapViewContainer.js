// get API data from police
import React, {useEffect, useState} from "react";
import {GoogleMap,CrimeList, CrimeSearchBar} from "../../components";
import PoliceAPI from "../../services/PoliceAPI";
import GeocodeAPI from "../../services/GeocodeAPI";
import localAPI from "../../services/localAPI";
import { CrimeUpdateForm } from "../../components/crimeUpdateForm/crimeUpdatePage/crimeUpdatePage";
import { CrimeBarChart } from "../../components/crimeBarChart/crimeBarChart";
const uuidv4 = require('uuid/v4');
export const MapContext = React.createContext(null);

//"other-theft" "theft-from-the-person"


export const  MapView = ({match}) => {

const initialMode = match.params.add ? match.params.add : 'search';
const [crimeLocations, setCrimeLocations] = useState([]);
const [mapMode, setMapMode] = useState(initialMode);
const [crimeCentre, setCrimeCentre] = useState({lat: 52.397, lng: 0.4196, rad:0.005});  

const setNewMode = (mapMode) => {
  if (mapMode === 'add') setCrimeLocations([]);
  setMapMode(mapMode);
}

const resetAddMode = () => {
  setMapMode('add');
}

const resetSearchMode = () => {
  setMapMode('search');
}

useEffect(()=> {
  // get Police data based on Polygon coordinates
  if (mapMode === 'search' | mapMode === 'statistics') {
    PoliceAPI.getCrimes(crimeCentre)
    .then(crimes => {
      const crimeCoordinates = crimes.map(crime => {return {'id':uuidv4(),'location': crime.location, 'category': crime.category, 'month': crime.month, 'outcome':crime.outcome_status, 'persisted': true, 'hidden':false, 'toAdd':false , 'toFilter':false, 'focused': false}});
      setCrimeLocations(crimeCoordinates);
    });
    //localAPI.getCrimes(crimeCentre)

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

// const useCurrentPosition = async() => {
//   const currentPos = await navigator.geolocation.getCurrentPosition();
// }

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
  const newCrime = {
    "id" : crimeLocation.id,
    "category": newCategory,
    "month": "2019-04",
    "address": newAddress,
    "outcome": newOutcome,
    "location": {
     "type": "Point",
  	 "coordinates": [crimeLocation.location.latitude, crimeLocation.location.longitude]
    }
  }
  localAPI.postCrime(newCrime).then((newCrime)=>{
    const newCrimeLocations = crimeLocations.map((crimeLocation) => {
      if (crimeLocation.id ===newCrime.id) crimeLocation.toAdd = false;
      return crimeLocation;
    });
    setCrimeLocations(newCrimeLocations) 
  });
}

const saveCrimesToDb = (category, outcome, location) => {
  const newCrimes = crimeLocations.filter(crimeLocation => crimeLocation.toAdd === true)
    .map(crimeLocation=>{
      const newCategory = category[crimeLocation.id] ? category[crimeLocation.id] : "all_crimes";  
      const newOutcome = outcome[crimeLocation.id]  ? outcome[crimeLocation.id] : "unknown";
      const address = location[crimeLocation.id] ? location[crimeLocation.id]: crimeLocation.address;
      return {
        "id" : crimeLocation.id,
        "category": newCategory,
        "month": "2019-04",
        "address": address,
        "outcome": newOutcome,
        "location": {
         "type": "Point",
         "coordinates": [crimeLocation.location.latitude, crimeLocation.location.longitude]
        }
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

const centralPane = mapMode === "statistics" ? <CrimeBarChart width={1200} height={600} crimeLocations = {crimeLocations}/>:null;
const mapWidth = mapMode === "statistics" ? 600 : null


const BottomOfScreen = mapMode === "add"? <CrimeUpdateForm crimeLocations={crimeLocations} saveCrimesToDb={saveCrimesToDb} saveCrimeToDb={saveCrimeToDb} /> : <CrimeList crimeLocations={crimeLocations} showAllCrimes={showAllCrimes} filterCrimes={filterCrimes}/>
return (
  <MapContext.Provider value={{focusInOnCrime,markCrimeToFilter}}>
  <CrimeSearchBar filterByCategory={filterByCategory} setRadius={setRadius} setNewMode={setNewMode}  searchByAddress={searchByAddress} mapMode={mapMode} searchView={true}/>
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
  {BottomOfScreen} 
  </MapContext.Provider> 

)

};

