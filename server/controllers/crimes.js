const Crimes = require('../models/crimes');


const getCrimes = async (ctx) => {
  try {
    const lng1 = Number(ctx.params.lng1);
    const lat1 = Number(ctx.params.lat1);
    const lng2 = Number(ctx.params.lng2);
    const lat2 = Number(ctx.params.lat2);
    const lng3 = Number(ctx.params.lng3);
    const lat3 = Number(ctx.params.lat3);
    
    const searchArea = {
      type: 'Polygon',
      coordinates: [[
        [lng1, lat1],
        [lng2, lat2],
        [lng3, lat3],
      ]]
    };
    
    const res = await Crimes.find({
      location: {
        $geoWithin: {
          $geometry: searchArea
        }
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
    ctx.body = await new Crimes(ctx.request.body).save();
    ctx.status = 200;
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    ctx.status = 500;
  }
};

const saveCrimes = async (ctx) => {
  try {
    await Movies.insertMany(ctx.request.body);
    ctx.status = 200;
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    ctx.status = 500;
  }

  
};



module.exports = {
  getCrimes,
  saveCrimes,
  saveIndCrime
};