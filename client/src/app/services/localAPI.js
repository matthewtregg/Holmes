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
  const doubleRad = crimeCentre.rad*2;
  const coords  = {"coords":[{"lat":crimeCentre.lat + crimeCentre.rad,"lng":crimeCentre.lng - crimeCentre.rad},{"lat":crimeCentre.lat + crimeCentre.rad,"lng":crimeCentre.lng - crimeCentre.rad},{"lat":crimeCentre.lat + doubleRad,"lng":crimeCentre.lng + doubleRad}]}; 
  return fetch(`http://localhost:4000/${url}/points/${coords}`)
    .then(res => res.status === 200 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch((err) => {
      console.log(`${err.message} while fetching /${url}`)
    });
};
