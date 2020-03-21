
function iterateSeries(collection, iteratorCallback, finalCallback) {
  function iterate(index) {
    if (index === collection.length) {
      return finalCallback();
    }

    process.nextTick(() => {
      iteratorCallback(collection[index], (err) => {
        if (err) {
          return finalCallback(err);
        }

        iterate(index + 1);
      });
    });
  }

  iterate(0);
}

const coll = [1, 2, 3, 4, 5];

iterateSeries(
  [1, 2, 3, 4, 5],
  (value, done) => {
    console.log(`Task for "${value}" started`);
    setTimeout(() => {
      console.log(`Task for "${value}" finished`);
      done(null);
    }, value * 100);
  },
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('All tasks are finished');
  }
)
