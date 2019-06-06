import React, { useState, useContext} from 'react';
import {MapContext} from '../../containers';

export const CrimeSearchBar = () => {
//const [date, setDate] = useState('');
const [locationText, setLocationText] = useState('');
const {searchByAddress, setAddMode} = useContext(MapContext);

const handleLocationChange = (event) => {
  const e = event.target.value;
  setLocationText(locationText=> e)
}

const handleSubmit = (e) => {
  e.preventDefault();
  searchByAddress(locationText);
}

return (
   <div>
  <form onSubmit={handleSubmit}>
  <input type='text' value={locationText} onChange={handleLocationChange} />
  {/* <input type='date' value={date} onChange={handleDateChange} /> */}
  <input type='submit' value='find crime location' />
</form> 
  <button onClick={setAddMode}> add new crimes </button>
  </div>
)

}

