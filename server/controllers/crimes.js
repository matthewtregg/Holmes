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
    const lng1 = Number(ctx.params.lng1).toFixed(4);
    const lat1 = Number(ctx.params.lat1).toFixed(4);
    const lng2 = Number(ctx.params.lng2).toFixed(4);
    const lat2 = Number(ctx.params.lat2).toFixed(4);
    const lng3 = Number(ctx.params.lng3).toFixed(4);
    const lat3 = Number(ctx.params.lat3).toFixed(4);
  

    const res = await Crimes.find({
      location: {
        $geoWithin: {
          $polygon: [
            [lng1,lat1],
            [lng2,lat2],
            [lng3,lat3],
            [lng1,lat1]
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