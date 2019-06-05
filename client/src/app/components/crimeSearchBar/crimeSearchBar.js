import React, {useContext, useState} from 'react';

import {MapContext} from '../../containers/MapViewContainer/MapViewContainer.js';

export const CrimeSearchBar = () => {

//const [date, setDate] = useState('');

const [locationText, setLocationText] = useState('');

const handleLocationChange = (e) => {
  console.log(e.target.value);
  setLocationText(locationText=> e.target.value)
}

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e.target.value);
  searchByAddress(e.target.value);
}

return (
  <form onSubmit={handleSubmit}>
  <input type='text' value={locationText} onChange={handleLocationChange} />
  {/* <input type='date' value={date} onChange={handleDateChange} /> */}
  <input type='submit' value='find crime location' />
</form> 
)

}

export default CrimeSearchBar;