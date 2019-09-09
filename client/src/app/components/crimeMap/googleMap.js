import React, { Component } from 'react';
import Config from '../../config/config';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
    this.map = {};

   
  }
  
  createMap() {
    this.map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options); 

      window.google.maps.event.addListener(this.map, 'click', (e)=> {
        const event = e; 
        this.props.onMapClick(event);});  
  }

  onScriptLoad() { 
    this.createMap() 
    // reduce to Locations
    this.displayMarkers(); 
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
    if (this.props.mapMode ==='search' || 'statistics') {
      this.onScriptLoad();
    } 
    else if (this.props.mapMode === 'move_center' ) {
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

  displayMarkers() {

    this.props.crimeLocations.forEach(crimeLocation => {
      if (!crimeLocation.hidden) { 
      const image = this.getMarkerIcon(crimeLocation.category);

      const marker = new window.google.maps.Marker({
        position: { lat: crimeLocation.location.latitude , lng: crimeLocation.location.longitude },
        map: this.map,
        url : {image}
      });
      
     
      const contentText = `<div id="content"><p>crime id: ${crimeLocation.id}</p>
      <p>Month Reported: ${crimeLocation.month}</p>
      <p>Category: ${crimeLocation.category}</p> 
      </div>`
      

      const infoWindow = new window.google.maps.InfoWindow({
        content: contentText
      });
      
      marker.addListener('click', function() {
        infoWindow.open(this.map, marker);
      }); 
      }
    })
  
  } 


  render() {
    this.displayMarkers()

  return (
     <div style={{ height:this.props.mapHeight, width:this.props.mapWidth}} id={this.props.id} />
     );
}

}
export default GoogleMap;
