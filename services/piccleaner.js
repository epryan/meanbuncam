const fs = require('fs');
// Current path: the relative path from services/ to bunpics/
const picPath = '../public/bunpics/'
// Current threshold: 1MB (Smaller images tend to be too dark to use)
const sizeThreshold = 1024 * 1024; // = 1048576

// Get an array of items in the directory
fs.readdir(picPath, function(err, items) {
	// Traverse the array eliminating unwanted items
	for (var i = 0; i < items.length - 1; i++) {
		var file = picPath + items[i];
		fs.stat(file, validateFile(file, items[i]));
	}
});

// Check the file's size and delete if below threshold
function validateFile(file, item) {
	return function(err, stats) {

		// Determine if the file is smaller than 1MB
		if (stats['size'] < sizeThreshold) {

			// Attempt to delete the full image
			// console.log('File: ' + file + '  Size: ' + stats['size']);
			fs.unlink(file, (err) => {
				if (err) { throw err; }

				// On success, acknowledge the image deletion
				console.log('Removed ' + file);

				// Attempt to delete the thumbnail image
				var thumb = 'pics/thumbs/thumb_' + item;
				fs.unlink(thumb, (err) => {
					if (err) { throw err; }

					// On success, acknowledge the thumbnail deletion
					console.log('Removed ' + thumb);
				});
			});
		}
	}
}

