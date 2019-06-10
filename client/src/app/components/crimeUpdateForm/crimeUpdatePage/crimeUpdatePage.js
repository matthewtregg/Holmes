// crime update idea

import React, {useState} from 'react';
import {CrimeFormItem} from '../crimeFormItem/crimeFormItem';
export const CrimeUpdateForm = ({crimeLocations,saveCrimeToDb, saveCrimesToDb}) => {

const [category, setCategory] = useState({});
const [location, setlocation] = useState({});
const [outcome, setOutcome]  = useState({});  

const crimesToAdd = crimeLocations.map((crimeLocation)=>{
  if (crimeLocation.toAdd) {
 
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
        if(!category[crimeLocation.id]) setCategory(category=>({...category,[crimeLocation.id]:"all_crimes"}))
        if(!outcome[crimeLocation.id]) setOutcome(outcome => ({...outcome,[crimeLocation.id]:"unknown"}))
        if(!location[crimeLocation.id]) setlocation(location=> ({...location,[crimeLocation.id]:crimeLocation.address}))
        const newCategory = category[crimeLocation.id]? category[crimeLocation.id] : "all_crimes";  
        const newOutcome = outcome[crimeLocation.id]  ? outcome[crimeLocation.id] : "unknown";
        const address = location[crimeLocation.id] ? location[crimeLocation.id]: crimeLocation.address;
        saveCrimeToDb(crimeLocation, newCategory, newOutcome,address);
      };
    
  return  <CrimeFormItem key={crimeLocation.id} category={category[crimeLocation.id]} categoryChange={categoryChange} savedLocation={crimeLocation.address}location={location[crimeLocation.id]} locationChange={locationChange} outcome={outcome[crimeLocation.id]} outcomeChange={outcomeChange} saveCrime={saveCrime}/>
  } else {
    return null
  }
  });

return (
  <div>
    <button onClick={()=>{saveCrimesToDb(category,outcome,location)}}> save all crimes </button>
    <div>
      <h3> Crime category </h3>
    </div>
    <div>
      <h3> Crime outcome  </h3>
    </div>
    <div>
      <h3> Crime location </h3>
    </div>
      {crimesToAdd}
  </div>
);
}  