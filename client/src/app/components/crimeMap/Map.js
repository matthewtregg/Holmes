import React, { useContext} from 'react';
import './Map.css';
import GoogleMap from './googleMap.js';
import {MapContext} from "../../containers";

//center on crimes in London
export const CrimeMap = ({crimeLocations}) => {
const {crimeCentre, mapMode, onMapClick } = useContext(MapContext);
    
    return (
      <div>
       <GoogleMap
        id="myMap"
        options={{
          center: crimeCentre,
          zoom: 12
        }}
        crimeLocations = {crimeLocations}
        crimeCentre = {crimeCentre}
        mapMode = {mapMode}
        onMapClick = {onMapClick}
      />
      </div>
    );
  }









