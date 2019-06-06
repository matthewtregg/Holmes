// crime update idea

import React, {useContext, useState} from 'react';
import { MapContext } from '../../containers';
export const CrimeUpdateForm = ({crimeLocations}) => {

const [category, setCategory] = useState({});
const [location, setlocation] = useState({})
const [outcome, setOutcome]  = useState({})  
  
  //month 
const {saveCrime} = useContext(MapContext);
let categoryChangeFunctions = {}; 
let locationChangeFunctions = {};
let outcomeChangeFunctions = {};
let saveCrimeFunctions = {};

crimeLocations.forEach((crimeLocation) => {
  
const categoryChange = (event) => {
  const e = event.target.value;
  setCategory(category => ({...category,[crimeLocation.id]:e}));
};         

const locationChange = (event) => {
  const e = event.target.value;
  setlocation(location => ({...location,[crimeLocation.id]:e}));
};

const outcomeChange = (event) => {
  const e = event.target.value;
  setOutcome(outcome => ({...outcome,[crimeLocation.id]:e}));
};

const saveCrime = (e) => {
  e.preventDefault();
   
}

categoryChangeFunctions = {...categoryChangeFunctions, [crimeLocation.id]:categoryChange}
locationChangeFunctions = {...locationChangeFunctions, [crimeLocation.id]:locationChange} 
outcomeChangeFunctions = {...outcomeChangeFunctions,[crimeLocation.id]:outcomeChange}
saveCrimeFunctions = {...saveCrimeFunctions, [crimeLocation.id]: saveCrime}
});



const crimesToAdd = crimeLocations.map((crimeLocation)=>{
  if(crimeLocation.toAdd) {
    console.log(crimeLocation)
  return <form onSubmit={saveCrime[crimeLocation.id]} key={crimeLocation.id}>
      <input type='text' value={category[crimeLocation.id]} onChange={categoryChangeFunctions[crimeLocation.id]} />
      <input type='text' value={location[crimeLocation.id]} onChange={locationChangeFunctions[crimeLocation.id]} />
      <input type='text' value={outcome[crimeLocation.id]} onChange={outcomeChangeFunctions[crimeLocation.id]}/> 
      <input type='submit' value='add crime' />
  </form>; 
  } else {
    return null
  }
  });

return (

  <div>
    {crimesToAdd}
  </div>
);
}  