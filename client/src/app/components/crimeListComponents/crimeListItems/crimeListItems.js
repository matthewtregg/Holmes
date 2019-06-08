
import React, {useContext} from 'react';
import {MapContext} from "../../../containers";
import './crimeListItems.css';

export const CrimeListItems = ({crimeLocation}) => {

const {markCrimeToFilter,focusInOnCrime} = useContext(MapContext);

console.log(focusInOnCrime);
const crimeOutcome = crimeLocation.outcome ? crimeLocation.outcome.category : "outcome unknown";
// change to crime view filter
const crimeViewCheckbox = crimeLocation.hidden ? <input type="checkbox" onChange={()=>{markCrimeToFilter(crimeLocation.id, false)}}/> : <input type="checkbox" onChange={()=>{markCrimeToFilter(crimeLocation.id, true)}}/> 
const crimeViewButton = crimeLocation.focused ?  <button onClick={()=>{focusInOnCrime(crimeLocation.id, true)}}><p>'focus on item' </p></button>:<button onClick={()=>{focusInOnCrime(crimeLocation.id, false)}}><p>'go back to see all crimes' </p></button>

return (
  <div className="IndCrime">
     <div className="crimeId">
      <h3>Crime Id</h3>
      <p>{crimeLocation.id}</p>
    </div>
    <div className="crimeMonth">
      <h3>Month Reported</h3>
      <p>{crimeLocation.month}</p>
    </div>
    <div className="crimeCategory">
      <h3>Category</h3>
      <p>{crimeLocation.category}</p>
    </div>
    <div className="crimeOutcome">
      <h3>Outcome</h3>
      <p>{crimeOutcome}</p>
    </div> 
    <div className="crimeCheckbox">
      <h3>filter crime to show</h3>
      {crimeViewCheckbox}
    </div>
    <div className="crimeButton">
      {crimeViewButton}
    </div> 
  </div>
)  

}


