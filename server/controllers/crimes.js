const Crimes = require('../models/crimes');

const getAllCrimes = async (ctx) => {
  try {
    const res = await Crimes.find({}); 
    ctx.body = res;
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
  }

};

const getCrimes = async (ctx) => {
  try {

  
    // console.log(lng1, lat1, lng2, lat2, lng3, lat3);
    const res = await Crimes.find({
      location: {
        $geoWithin: {
          $polygon: [
            [41.00,2.00],
            [45.00,3.00],
            [41.00,4.00],
            [41.00,2.00]
          ]}
      }
    });
    ctx.status = 200;
    ctx.body = res;
  } catch (e) {
    ctx.status = 500;
  }

};


const saveIndCrime = async (ctx) => {
  try {
    
    const res = await new Crimes(ctx.request.body).save();
    ctx.body = res;
    ctx.status = 200;
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    ctx.status = 500;
  }
};

const saveCrimes = async (ctx) => {
  try {
    await Crimes.insertMany(ctx.request.body);
    ctx.status = 200;
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    ctx.status = 500;
  }

  
};



module.exports = {
  getAllCrimes,
  getCrimes,
  saveCrimes,
  saveIndCrime
};