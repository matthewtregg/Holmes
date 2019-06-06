
import React, {useContext} from 'react';
import {MapContext} from "../../../containers";
export const CrimeListItems = ({crimeLocation}) => {
const {viewCrime} = useContext(MapContext);
const crimeOutcome = crimeLocation.outcome ? crimeLocation.outcome.category : "outcome unknown";
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
      <button onClick={()=>{viewCrime(crimeLocation.id)}}> view crime </button>
    </div>
  </div>
)  

}


