/**
 * This is an example of parallel execution of async funcitons using callbacks.
 * `parallelAsync` will call the function `task` for each item of the `collection`.
 * `task` should perform its async operations and call the `done` callback passed as an argument.
 * `allFinished` will be called when all of the tasks are completed.
 * Error handling is omitted.
 */

function parallelAsync(collection, task, allFinished) {
  let completed = 0;
  collection.forEach((value) => {
    task(value, () => {
      if (++completed === collection.length) {
        allFinished();
      }
    });
  });
}

const collection = Array(30).fill(null).map((_, index) => index + 1);
parallelAsync(
  collection,
  (value, done) => {
    console.log(`Starting task for "${value}"`);
    setTimeout(() => {
      console.log(`Finished task for "${value}"`)
      done();
    }, value * 100);
  },
  () => {
    console.log("All the tasks are finished");
  }
)
