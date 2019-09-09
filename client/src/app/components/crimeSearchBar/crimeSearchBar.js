import React, { useState} from 'react';

// map mode
export const CrimeSearchBar = ({setNewMode, filterByCategory,searchByAddress, setRadius, mapMode }) => {
const [locationText, setLocationText] = useState('');
const [modeButtonValue, setModeButtonValue] = useState('');

const handleLocationChange = (event) => {
  const e = event.target.value;
  setLocationText(e)
}

const handleSubmit = (e) => {
  e.preventDefault();
  searchByAddress(locationText);
}

const handleModeChange = (event) => {
  const e = event.target.value;
  setModeButtonValue(e)
}
   
const handleModeSubmit = (e) => {
  e.preventDefault();
  setNewMode(modeButtonValue);
}

const searchViewFilter = mapMode !== "add"? <div>
  <select onChange={filterByCategory}>
   <option value="all_crime">All Crime</option>
   <option value="anti-social-behaviour">Anti-social behaviour </option>
   <option value="bicycle-theft">Bicycle theft</option>
   <option value="burglary">Burglary</option>
   <option value="criminal-damage-arson">Arson</option>
   <option value="public-order">public order</option>
   <option value="robbery">robbery</option>
   <option value="drugs">Drugs</option>  
   <option value="general_theft">General theft</option>
   <option value="possession of weapons">Arms possession</option>
   <option value="shoplifting">shoplifting</option>
   <option value="other-crime">Other crime</option>
   <option value="theft"> theft</option>
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
</div> :null

return (
   <div>
     <form onSubmit={handleModeSubmit}>
      <input type="radio" name="mode" value="add"  onChange={handleModeChange}/> Add
      <input type="radio" name="mode" value="search"  onChange={handleModeChange}/> Search
      <input type="radio" name="mode" value="statistics" onChange={handleModeChange}/> Statistics 
      <input type='submit' value='set mode' />
    </form>
     <form onSubmit={handleSubmit}>
      <input type='text' value={locationText} onChange={handleLocationChange} />
      <input type='submit' value='find crime location' />
    </form> 
    {/* <button onClick="useCurrentLocation"> Use Current Location</button> */}
     {searchViewFilter}
  </div>
)
}




