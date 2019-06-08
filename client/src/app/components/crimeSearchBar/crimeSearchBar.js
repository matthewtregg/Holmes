import React, { useState} from 'react';

export const CrimeSearchBar = ({searchByAddress, setAddMode, mapMode, setRadius, searchView }) => {
const [locationText, setLocationText] = useState('');

const handleLocationChange = (event) => {
  const e = event.target.value;
  setLocationText(e)
}

const handleSubmit = (e) => {
  e.preventDefault();
  searchByAddress(locationText);
}
const buttonModeText = mapMode === 'add' ? 'search for crimes' : 'add crimes'; 

const searchViewForm = searchView ? <div>

  <button onClick={setAddMode}> {buttonModeText} </button>
  <select>
   <option value="all_crime">All Crime</option>
   <option value="anti-social-behaviour">Anti-social behaviour </option>
   <option value="bicycle_theft">Bicycle theft</option>
   <option value="burglary">Burglary</option>
   <option value="criminal-damage-arson">Arson</option>
   <option value="public-order">public order</option>
   <option value="robbery">robbery</option>
   <option value="drugs">Drugs</option>  
   <option value="general_theft">General theft</option>
   <option value="arms_posession">Arms possession</option>
   <option value="other_crime">Other crime</option>
   <option value="violent_crime">Violent crime</option>
   <option value="vehicle_crime">Vehicle crime</option>
  </select>
  <select  onChange={setRadius} >
   <option value="0.005">0.005</option>
   <option value="0.01">0.01</option>
   <option value="0.015">0.015</option>
   <option value="0.02">0.02</option>
   <option value="0.025">0.025</option>
   <option value="0.03">0.03</option>  
  </select>
</div>:null

return (
   <div>
     <form onSubmit={handleSubmit}>
      <input type='text' value={locationText} onChange={handleLocationChange} />
      <input type='submit' value='find crime location' />
    </form> 
     {searchViewForm}
  </div>
)
}




