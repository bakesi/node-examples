/**
 * This is an example of sequential execution of async functions using callbacks.
 * `iterateSeries` will iterate over the collection and call `iteratorCallback` for each of them.
 * `iteratorCallback` should perform its async operation and call the `done` callback passed as an argument.
 * `done` will trigger the next iteration.
 * `finalCallback` will be called when `iteratorCallback` is finshed for every item or `done` is called with an error.
 */

function iterateSeries(collection, iteratorCallback, finalCallback) {
  function iterate(index) {
    if (index === collection.length) {
      return finalCallback();
    }

    // Add to nextTick in case `done` is called synchronously
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

iterateSeries(
  [1, 2, 3, 4, 5],
  (value, done) => {
    console.log(`Task for "${value}" started`);
    setTimeout(() => {
      console.log(`Task for "${value}" finished`);
      // Call `done` when async operation is finished
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
