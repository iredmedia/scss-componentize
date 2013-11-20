// Include modules for use
var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;

var SCSSComponentize = {
  // Get file contents, and relative paths
  'getFileContents': function(path) {
    return fs.readFileSync(path, {'encoding': 'utf8'});
  },
  'getNewPath': function (originalPath) {
    console.log(originalPath)
    return originalPath.split('.css')[0] + '_embedded.css';
  },
  'componentize_old': function (wrapperClass, oldPath, newPath, callback) {
    var file = writeFile(wrapClass(wrapperClass, this.getFileContents(oldPath)), newPath);

    this.compile(newPath, callback);

    return file;
  },
  // Wrap a given list[index] file contents in a class, process with SCSS.
  'componentize': function (wrapperClass, list, index, callback) {
    var filePath = list[index];
    var newPath = this.getNewPath(list[index]);

    var file = writeFile(wrapClass(wrapperClass, this.getFileContents(filePath)), newPath);
    list[index] = newPath;

    this.compile(newPath, callback);

    return file;
  },
  'compile': function (newPath, callback) {
    var command = "scss " + newPath + ' ' + newPath;
    exec(command, callback);
  }
};



// Wrap provided content in a class name
function wrapClass(wrapper, content) {
  return wrapper + ' {\n' + content + '}';
}

// Clear the file before wrapping and printing
function clearFile(path) {
  fs.writeFileSync(path, '')
}

// Write the concatenated file
function writeFile (content, path) {
  fs.writeFileSync(path, content);
  return content;
}

function puts(error, stdout, stderr) { sys.puts(stdout) }

module.exports = SCSSComponentize;
