



export default  {

 getCrimes: (crimeCentre) => {
   return PoliceRequest(crimeCentre);
 }

}

const PoliceRequest = (crimeCentre) => {
return fetch(`https://data.police.uk/api/crimes-street/all-crime?poly=${crimeCentre.lat + crimeCentre.rad},${crimeCentre.lng - crimeCentre.rad}:${crimeCentre.lat - crimeCentre.rad },${crimeCentre.lng + crimeCentre.rad}:${crimeCentre.lat + (crimeCentre.rad *2)},${crimeCentre.lng + (crimeCentre.rad*2)}`)
.then(res => res.json())

}

 
