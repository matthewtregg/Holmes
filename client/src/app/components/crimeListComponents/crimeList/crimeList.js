import React from 'react';
import { CrimeListItems } from '../crimeListItems/';
import './crimeList.css';

export const CrimeList = ({crimeLocations, filterCrimes, showAllCrimes}) => {

  const listItems = crimeLocations ? crimeLocations.map(crimeLocation => {
    if (!crimeLocation.hidden) return <CrimeListItems crimeLocation={crimeLocation} key={crimeLocation.id} />  
    else return null;
  }) : null;
  
  return (
    <div>
      <button onClick={filterCrimes}> filter crimes </button>
      <button onClick={showAllCrimes}> show all crimes </button>
     <div className="crimeList"> 
      {listItems} 
      </div>  
    </div>
    
  )
}


