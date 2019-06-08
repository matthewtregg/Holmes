
import React, {useContext} from 'react';
import {MapContext} from "../../../containers";
import './crimeListItems.css';

export const CrimeListItems = ({crimeLocation}) => {
const {toggleCrime} = useContext(MapContext);
const crimeOutcome = crimeLocation.outcome ? crimeLocation.outcome.category : "outcome unknown";
const crimeViewToggle = crimeLocation.hidden ? <input type="checkbox" onChange={()=>{toggleCrime(crimeLocation.id, false)}}/> : <input type="checkbox" onChange={()=>{toggleCrime(crimeLocation.id, true)}}/> 
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
      {crimeViewToggle}
    </div>
    {/* <div className="crimeButton">
      <h3>select crime to show</h3>
      {crimeViewToggle}
    </div> */}
  </div>
)  

}


