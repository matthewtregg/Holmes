import React, { Component } from 'react';
import Config from '../../config/config'

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
    this.map = {};
  }
  
  onScriptLoad() {
    this.map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options); 
    
    window.google.maps.event.addListener(this.map, 'click', (e)=> {
       const event = e; 
       this.props.onMapClick(event);

    }); 

    this.props.crimeLocations.forEach(crimeLocation => {
      if (!crimeLocation.hidden){ 
      new window.google.maps.Marker({
        position: { lat: Number(crimeLocation.location.latitude) , lng: Number(crimeLocation.location.longitude) },
        map: this.map
      });
      
    }
    })
    
  }
  componentDidUpdate() {
    if (this.props.mapMode!=='add'){
      this.onScriptLoad();
    } else {
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
     <div style={{ widgth: 1300, height: 500 }} id={this.props.id} />
     );
}

}
export default GoogleMap;