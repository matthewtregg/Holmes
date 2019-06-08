// crime update idea

import React, {useState} from 'react';
import {CrimeFormItem} from '../crimeFormItem/crimeFormItem';
export const CrimeUpdateForm = ({crimeLocations, saveNewCrime, saveAllCrimes}) => {

const [category, setCategory] = useState({});
const [location, setlocation] = useState({})
const [outcome, setOutcome]  = useState({})  

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
        const newCategory = category[crimeLocation.id]? category : "all_crimes";  
        const newOutcome = outcome[crimeLocation.id]  ? outcome : "unknown";
        console.log(newCategory);
        console.log(newOutcome);
      //saveNewCrime(crimeLocation.id, newCategory, newOutcome, newDescription,);
      };

  return  <CrimeFormItem key={crimeLocation.id} category={category[crimeLocation.id]} categoryChange={categoryChange} location={location[crimeLocation.id]} locationChange={locationChange} outcome={outcome[crimeLocation.id]} outcomeChange={outcomeChange} saveCrime={saveCrime}/>
  } else {
    return null
  }
  });

return (
  <div>
    <button onClick={saveAllCrimes}> save all crimes </button>
    {crimesToAdd}
  </div>
);
}  