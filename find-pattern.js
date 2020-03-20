/**
 * Usage of EventEmitter
 */

const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

class FindPattern extends EventEmitter {
  constructor (regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile (file) {
    this.files.push(file);
    return this;
  }

  find () {
    this.files.forEach(file => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          return this.emit('error', err, file);
        }

        this.emit('fileread', file);

        let match = null;
        if (match = data.match(this.regex)) {
          match.forEach(elem => this.emit('found', file, elem));
        }
      });
    });

    return this;
  }
}


const finder = new FindPattern(/examplse/g);

finder.addFile('./file.txt')
  .find()
  .on('fileread', (file) => console.log(`Searching in file '${file}'`))
  .on('found', (file, match) => console.log(`Found '${match}' in file '${file}'`))
  .on('error', (err, file) => console.log(`Error searching in file '${file}'. ${err.message}`))
