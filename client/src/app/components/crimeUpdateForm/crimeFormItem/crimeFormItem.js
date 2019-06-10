
import React from 'react';
export const CrimeFormItem = ({saveCrime, categoryChange, location, locationChange,savedLocation, outcomeChange}) => {
  const formLocation = location ? location : savedLocation
  return ( <form onSubmit={saveCrime}>
        <select onChange={categoryChange} >          
        <option value="all_crime">All Crime</option>
          <option value="Anti-social behaviour">Anti-social behaviour </option>
          <option value="Bicycle theft">Bicycle theft</option>
          <option value="Burglary">Burglary</option>
          <option value="Criminal damage and arson">Arson</option>
          <option value="Drugs">Drugs</option>  
          <option value="Other crime">Other crime</option>  
          <option value="Other theft">Other theft</option>  
          <option value="possession of weapons">Arms possession</option>
          <option value="public-order">public order</option>
          <option value="Robbery">robbery</option>
          <option value="shoplifting">shoplifting</option>
          <option value="general_theft">General theft</option>
          <option value="other_crime">Other crime</option>
          <option value="violent_crime">Violent crime</option>
          <option value="vehicle_crime">Vehicle crime</option>
          <option value="violence and sexual offences">Violence and sexual offences</option>
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



