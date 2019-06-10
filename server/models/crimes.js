const mongoose = require('./index.js');
mongoose.set('debug', true);
const Schema = mongoose.Schema;

const crimeSchema = new Schema({
  'id': String,
  'location': {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  'address': String,
  'category': String,
  'month' : String,
  'outcome': String 
    
});

crimeSchema.index({location: '2dsphere'});
const Crimes = mongoose.model('crimes', crimeSchema);
module.exports = Crimes;