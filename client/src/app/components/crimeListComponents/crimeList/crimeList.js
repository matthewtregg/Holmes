import React from 'react';
import { CrimeListItems } from '../crimeListItems/';
export const CrimeList = ({crimeLocations}) => {
  let listItems = "";
  if (crimeLocations){
      listItems = crimeLocations.map(crimeLocation => {
      if (!crimeLocation.hidden) return <CrimeListItems crimeLocation={crimeLocation} key={crimeLocation.id} />  
      else return null;
    })
  }
  return (
     <div>
      {listItems}
    </div>
  )
}


