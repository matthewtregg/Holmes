import React, {useContext} from 'react';
import './Map.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import {MapContext} from "../../containers/MapViewContainer/MapViewContainer.js"
import CrimeSearchBar from '../crimeSearchBar/crimeSearchBar';

//const uuidv4 = require('uuid/v4');


//center on crimes in London 
export const CrimeMap = ({crimeLocations}) => {
const {onMapClick, onMarkerMounted } = useContext(MapContext);
const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 52.397, lng: 0.4196 }}
    onClick={onMapClick}
  >
  {crimeLocations.map((crimeLocation,index)=>{
    return <Marker
        key = {crimeLocation.id}
        ref={onMarkerMounted}
        position={ {lat: parseFloat(crimeLocation.location.latitude), lng: parseFloat(crimeLocation.location.longitude)} }
    />})}
  </GoogleMap>
));

  //CrimeMapView
 return (   
 <div>
 <CrimeSearchBar/>
 <MapWithAMarker
 googleMapURL= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBdf4RIrlAQ1io81BPgnZEhJD98l9Qu_AI&v=3.exp&libraries=geometry,drawing,places'
 loadingElement={<div style={{ height: `100%` }} />}
 containerElement={<div style={{ height: `400px` }} />}
 mapElement={<div style={{ height: `100%` }} />}
 />
</div>  
 
 );
}

