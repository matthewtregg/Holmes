const uuidv4 = require('uuid/v4');

export default class CrimeObj {

  constructor(lat, lng) {
    this.id = uuidv4();
    this.location = { 
      'type': 'Point',
      'coordinates': [lat,  lng]
      }
    this.address = '';
    this.outcome = '';
    this.category = '';
    this.month = "2019-04";
    this.toAdd = true;  
  }

  static parsePoliceCrimes = (PoliceCrimes) => {
  return  PoliceCrimes.map(crime => {
      const parsedCat = crime.outcome_status? crime.outcome_status.category : 'unknown';
      return {'id':uuidv4(),'location': {'latitude':Number(crime.location.latitude), 'longitude':Number(crime.location.longitude)}, 'category': crime.category, 'month': crime.month, 'outcome':parsedCat, 'persisted': true, 'hidden':false, 'toAdd':false , 'toFilter':false, 'focused': false}});
  }
  static parseLocalCrimes = (LocalCrimes) => { 
    return LocalCrimes.map(crime => {return {'id':crime.id,'location':{'latitude':crime.location.coordinates[0], 'longitude':crime.location.coordinates[1]}, 'category': crime.category, 'month': crime.month, 'outcome':crime.outcome, 'persisted': true, 'hidden':false, 'toAdd':false , 'toFilter':false, 'focused': false}});
  }


}

