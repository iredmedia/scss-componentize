// Import required modules
var scss = require('scss-componentize');

// File paths, new based on old
var filePath = ['./lib/css/test.css'];

scss.componentize('.embedded', filePath, 0, function(){
	console.log('Finished')
});
