



export default  {

 getCrimes: (crimeCentre) => {
   console.log(crimeCentre)
   return PoliceRequest(crimeCentre);
 }

}

const PoliceRequest = (crimeCentre) => {
return fetch(`https://data.police.uk/api/crimes-street/all-crime?poly=${crimeCentre.lat + 0.005},${crimeCentre.lng -0.005}:${crimeCentre.lat -0.005 },${crimeCentre.lng +0.005}:${crimeCentre.lat + 0.01},${crimeCentre.lng +0.01}`)
.then(res => res.json())

}

 
