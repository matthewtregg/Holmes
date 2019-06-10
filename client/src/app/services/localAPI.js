const BASE_URL = 'http://localhost:4000/'


export default { 
  getCrimes: (crimeCentre) => {
    return fetchRequest('crimes', crimeCentre);
  },
  postCrime: (crime) => {
    return postRequest(crime,'crime');
  },
  postCrimes: (crimes) => {
    return postRequest(crimes,'crimes');
  }
};

const postRequest = (crimes, url) => {
  return fetch(`${BASE_URL}${url}`, {
    'method': 'POST',
    'headers':{ 
    'content-type': 'application/json'
    },
    'body': JSON.stringify(crimes)
  })
  .then(res => {
    return res.status === 200 ? res : Promise.reject(res)})
  .then((res)=> res.json())
  .catch((err) => {
    console.log(`${err.message} while fetching /${url}`)
  });
}

const fetchRequest = (url, crimeCentre) => {
  return fetch(`http://localhost:4000/${url}/lat1/${crimeCentre.lat + crimeCentre.rad}/lng1/${crimeCentre.lng - crimeCentre.rad}/lat2/${crimeCentre.lat - crimeCentre.rad }/lng2/${crimeCentre.lng + crimeCentre.rad}/lat3/${crimeCentre.lat + (crimeCentre.rad *2)}/lng3/${crimeCentre.lng + (crimeCentre.rad*2)}`)
    .then(res => res.status === 200 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch((err) => {
      console.log(`${err.message} while fetching /${url}`)
    });
};
