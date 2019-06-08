import React from 'react';
import { CrimeListItems } from '../crimeListItems/';
import './crimeList.css';

export const CrimeList = ({crimeLocations}) => {

  let listItems = "";
  if (crimeLocations){
      listItems = crimeLocations.map(crimeLocation => {
      return <CrimeListItems crimeLocation={crimeLocation} key={crimeLocation.id} />  
    });
  }
  return (
     <div className="crimeList">
      {listItems}
    </div>
  )
}


