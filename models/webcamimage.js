//Require Mongoose
var mongoose = require('mongoose');
var moment = require('moment');

//Define the schema
var Schema = mongoose.Schema;

var WebcamImageSchema = new Schema({
  file_name: {type: String, required: true, min: 1},
  date: {type: Date, set: fileNameToDate, get: formatDate },
  size_in_bytes: {type: Number, set: sizeInBytes},
  type: {type: String, required: true, min: 1, max: 5}
});

// Utilize fs to retrive the size of a file
function sizeInBytes(file) {
  //return the size of file
  // eg. size_in_bytes: {Number, set: sizeInBytes},
}

// Clip the extension off of any dated filenames 
function fileNameToDate(fileName) {
  var extension = fileName.slice(-4);
  if (extension == '.jpg') {
    return fileName.slice(0,-4);
  } else {
    return fileName;
  }
}

//Using moment(ISODATE).format('M-D h:ma') for '1-31 5:54pm' timestamps
function formatDate(date) {
  return moment(date).format('M-D h:ma');
}

//Export function to create the model class
module.exports = mongoose.model('WebcamImageSchema', WebcamImageSchema);
