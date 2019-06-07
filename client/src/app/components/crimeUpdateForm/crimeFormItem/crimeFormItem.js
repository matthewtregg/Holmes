
import React from 'react';
export const CrimeFormItem = ({saveCrime, category, categoryChange, location, locationChange, outcome, outcomeChange}) => {
  return ( <form onSubmit={saveCrime}>
        <input type='text' value={category} onChange={categoryChange} />
        <input type='text' value={location} onChange={locationChange} />
        <input type='text' value={outcome} onChange={outcomeChange}/> 
        <input type='submit' value='add crime' />
  </form>); 
}