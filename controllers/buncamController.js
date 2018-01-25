var WebcamImage = require('../models/webcamimage');

//Display the images index page
exports.index = function(req, res) {

  WebcamImage.find({})
    .sort([['file_name', 'descending']])
    .limit(50)
    .exec( function (err, images) {
      if (err) { return next(err); }
      // On success, render buncam index with recent pictures
      res.render('buncam', {title: 'Recent Captures', bunpics: images});
    });
}

// TODO: Incorporate last hour, last day, last week links present on the homepage

// exports.last_hour = function(req, res) {
//   WebcamImage.find({})
//     .sort([['file_name', 'descending']])
//     .exec( function (err, images) {
//       if (err) { return next(err); }
//       // On success, render buncam index with recent pictures
//       res.render('buncam', {title: 'Recent Captures', bunpics: images});
//     });
// }
