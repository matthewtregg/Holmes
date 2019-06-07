import React, { useState} from 'react';

export const CrimeSearchBar = ({searchByAddress, setAddMode, mapMode }) => {
//const [date, setDate] = useState('');
const [locationText, setLocationText] = useState('');

const handleLocationChange = (event) => {
  const e = event.target.value;
  setLocationText(locationText=> e)
}

const handleSubmit = (e) => {
  e.preventDefault();
  searchByAddress(locationText);
}
const buttonModeText = mapMode === 'add' ? 'search for crimes' : 'add crimes'; 

return (
   <div>
  <form onSubmit={handleSubmit}>
  <input type='text' value={locationText} onChange={handleLocationChange} />
  {/* <input type='date' value={date} onChange={handleDateChange} /> */}
  <input type='submit' value='find crime location' />
</form> 
    <button onClick={setAddMode}> {buttonModeText} </button>
  </div>
)

}

