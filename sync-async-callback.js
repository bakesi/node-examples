/**
 * This code is an example of sync and aSync calls inside of a function.
 * In case of sync call, it is better to return the result directly.
 * In case of aSync call, the result is returned via callback. Other options are Promise and Generator
 *
 * Best practice is to be consistent about how the result is returned.
 * If a function has aSync call, it should *always* invoke the callback asynchronously
 */

const fs = require('fs');
let cache = {};

function consistentReadSync(filename) {
  if (cache[filename]) {
    return cache[filename];
  } else {
    cache[filename] = fs.readFileSync(filename, 'utf8');
    return cache[filename];
  }
}

console.log('first call');
console.log(consistentReadSync('file.txt'));
console.log('second call');
console.log(consistentReadSync('file.txt'));
console.log('third call');
console.log(consistentReadSync('file.txt'));

// Async implementation
cache = {};
function consistentReadAsync(filename, callback) {
  if (cache[filename]) {
    process.nextTick(() => callback(null, cache[filename])); // Invoke the callback asynchronously to be consistent
  } else {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        return callback(err);
      }

      cache[filename] = data;
      callback(null, data);
    })
  }
}

console.log('first call');
consistentReadAsync('file.txt', console.log);
console.log('second call');
consistentReadAsync('file.txt', console.log);
console.log('third call');
consistentReadAsync('file.txt', console.log);
