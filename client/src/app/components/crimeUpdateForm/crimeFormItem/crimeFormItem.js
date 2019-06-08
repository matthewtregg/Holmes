
import React from 'react';
export const CrimeFormItem = ({saveCrime, categoryChange, location, locationChange, outcomeChange}) => {
  return ( <form onSubmit={saveCrime}>
          <select onChange={categoryChange} >
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
         {/* <select onChange={outcomeChange} >
            <option value="unknown">Unknown</option>
            <option value="Under">Anti-social behaviour </option>
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
        </select> */}
        <input type='text' value={location} onChange={locationChange} /> 
        <input type='submit' value='add crime' />
  </form>); 
}



