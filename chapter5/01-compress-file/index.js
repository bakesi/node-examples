/**
 * Example of Stream
 *
 * Memory usage comparison
 *
 *              With Stream:   Without Stream:
 * rss          79.94 MB       1734.27 MB
 * heapTotal    11.43 MB       20.04 MB
 * heapUsed     6.64 MB        14.95 MB
 * external     24.57 MB       2766.02 MB
 *
 * There is no big difference in execution time.
 */
const fs = require('fs');
const zlib = require('zlib');
const Chance = require('chance');

const file = process.argv[2];

function logMemUsage() {
  const used = process.memoryUsage();
  console.log('');
  for (let key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
  console.log('');
}

function fillTheFile() {
  const chance = new Chance();

  const w = fs.createWriteStream(file, {
    flags: 'a'
  })

  logMemUsage();

  console.log('Started writing to file ' + file);

  for(let i = 0; i < 1000000; i++) {
    w.write(chance.string({
      length: 16 * 1024
    }) + '\n');

    if (i % 100 === 0) {
      console.log('Writing line: ' + i);
      logMemUsage();
    }
  }

  w.end();
  w.on('close', () => {
    console.log('Finished writing');
    logMemUsage();
  });
}

function compressFile() {
  console.time('compress');
  console.log('Compressing started');

  logMemUsage()

  fs.readFile(file, (err, buffer) => {
    console.log('File is read');
    logMemUsage()
    zlib.gzip(buffer, (err, buffer) => {
      console.log('Compressed buffer');
      logMemUsage();
      fs.writeFile(file + '.gz', buffer, err => {
        logMemUsage();
        console.timeEnd('compress');
        console.log('File successfully compressed');
      });
    });
  });
}

function compressFileWithStream() {
  console.time('compress');
  console.log('Compressing started');
  logMemUsage();

  const id = setInterval(() => {
    logMemUsage();
  }, 10000);

  fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(file + '.gz'))
    .on('finish', () => {
      clearInterval(id);
      logMemUsage();
      console.timeEnd('compress');
      console.log('File successfully compressed');
    });
}

// fillTheFile();
// compressFile();
compressFileWithStream();
