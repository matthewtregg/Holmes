import React from 'react';
import { CrimeListItems } from '../crimeListItems/';
export const CrimeList = ({crimeLocations}) => {

  let listItems = "";
  if (crimeLocations){
      listItems = crimeLocations.map(crimeLocation => {
      return <CrimeListItems crimeLocation={crimeLocation} key={crimeLocation.id} />  
    });
  }
  return (
     <div>
      {listItems}
    </div>
  )
}


