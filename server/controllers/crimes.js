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

    const coords = JSON.parse(ctx.params.coords);
    const res = await Crimes.find({
      location: {
        $geoWithin: {
          $polygon: [
            [coords[0].lat,coords[0].lng],
            [coords[1].lat,coords[1].lng],
            [coords[2].lat,coords[2].lng],
            [coords[0].lat,coords[0].lng]
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