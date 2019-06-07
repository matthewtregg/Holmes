
import React, {useContext} from 'react';
import {MapContext} from "../../../containers";
export const CrimeListItems = ({crimeLocation}) => {

const {toggleCrime} = useContext(MapContext);
const crimeOutcome = crimeLocation.outcome ? crimeLocation.outcome.category : "outcome unknown";
const crimeViewToggle = crimeLocation.hidden ? <button onClick={()=>{toggleCrime(crimeLocation.id, false)}}> show crime </button>: <button onClick={()=>{toggleCrime(crimeLocation.id, true)}}> hide crime </button>

return (
  <div>
    <div>
      <h1>{crimeLocation.id}</h1>
    </div>
    <div>
      <h1>{crimeLocation.category}</h1>
    </div>
    <div>
      <h1>{crimeOutcome}</h1>
    </div> 
    <div>
      {crimeViewToggle}
    </div>
  </div>
)  

}


