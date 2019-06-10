import React from 'react';
import { CrimeListItems } from '../crimeListItems/';
import './crimeList.css';

export const CrimeList = ({crimeLocations, filterCrimes, showAllCrimes, mapMode}) => {

  const listItems = crimeLocations ? crimeLocations.map(crimeLocation => {
    if (!crimeLocation.hidden) return <CrimeListItems crimeLocation={crimeLocation} key={crimeLocation.id} />  
    else return null;
  }) : null;
  
  const crimeListClass = mapMode === "search" ? "crimeList": "barCrimeList";
  const crimeListButtonClass = mapMode === "search"? null:"crimeListButton";

  const filterButtons = crimeLocations.length > 0 ? <div><button onClick={filterCrimes}> filter crimes </button>
  <button onClick={showAllCrimes}> show all crimes </button></div>:null;

  return (
    <div className={crimeListButtonClass}>
      {filterButtons}
     <div className={crimeListClass}> 
      {listItems} 
      </div>  
    </div>
    
  )
}


