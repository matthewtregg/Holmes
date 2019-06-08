import React, { Component } from 'react';
import Config from '../../config/config'
class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
    this.map = {};

   
  }
  
  createMap(){
    this.map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options); 

      window.google.maps.event.addListener(this.map, 'click', (e)=> {
        const event = e; 
        this.props.onMapClick(event);
 
     }); 
 
  }

  onScriptLoad() { 
    this.createMap() 
    this.props.crimeLocations.forEach(crimeLocation => {
      const image = this.getMarkerIcon(crimeLocation.category);
      if (!crimeLocation.hidden){ 
      new window.google.maps.Marker({
        position: { lat: Number(crimeLocation.location.latitude) , lng: Number(crimeLocation.location.longitude) },
        map: this.map,
        icon: {url: image}
      });  
    }
    
    })
    
    const polygonCoords = [{ lat:this.props.crimeCentre.lat + this.props.crimeCentre.rad ,lng:this.props.crimeCentre.lng - this.props.crimeCentre.rad},{lat:this.props.crimeCentre.lat - this.props.crimeCentre.rad ,lng:this.props.crimeCentre.lng + this.props.crimeCentre.rad},{lat:this.props.crimeCentre.lat + (2*this.props.crimeCentre.rad) ,lng:this.props.crimeCentre.lng + (2*this.props.crimeCentre.rad)}]
    const Polygon = new window.google.maps.Polygon({
      paths: polygonCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
    Polygon.setMap(this.map);
     
  }
  
  getMarkerIcon(category) {
    switch(category) {
      case "criminal-damage-arson":
      return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      case "violent-crime":
      return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
      case "vehicle-crime":
      return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      case "public-order":
      return "http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png";
      case "bicycle-theft":
      return "http://maps.google.com/mapfiles/ms/icons/cycling.png";
      case "drugs":
      return "http://maps.google.com/mapfiles/ms/icons/cycling.png";
      default:
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
      
    }
  }


  componentDidUpdate() {
    if (this.props.mapMode ==='search' ) {
      this.onScriptLoad();
    } 
    else if (this.props.mapMode === 'move_center') {
      this.props.resetAddMode();
      this.createMap()
    }
    else { 
      return false;
    }

  }
  
  componentDidMount() {
    if (!window.google) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${Config.googleAPIKEY}`;
      const x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    this.props.crimeLocations.forEach(crimeLocation => {
      if (!crimeLocation.hidden){ 
      new window.google.maps.Marker({
        position: { lat: Number(crimeLocation.location.latitude) , lng: Number(crimeLocation.location.longitude) },
        map: this.map
      });
      
    }
    })

  return (
     <div style={{ height: 500 }} id={this.props.id} />
     );
}

}
export default GoogleMap;