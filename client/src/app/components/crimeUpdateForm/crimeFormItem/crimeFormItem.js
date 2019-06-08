
import React from 'react';
export const CrimeFormItem = ({saveCrime, categoryChange, location, locationChange,savedLocation, outcomeChange}) => {
  console.log(savedLocation)
  console.log(location)
  const formLocation = location ? location : savedLocation
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
        <select onChange={outcomeChange} >
            <option value="outcome unknown">Unknown</option>
            <option value="Under investigation">Under investigation</option>
            <option value="Awaiting court outcome">Awaiting court outcome</option>
            <option value="Further investigation is not in the public interest">Further Investigation not in public interest</option> 
            <option value="Offender sent to prison">Offender sent to prison</option>
        </select> 
        <input type='text' value={formLocation} onChange={locationChange} /> 
        <input type='submit' value='add crime' />
  </form>); 
}



