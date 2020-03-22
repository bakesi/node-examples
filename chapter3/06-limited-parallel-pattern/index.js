/**
 * This is an example of parallel execution of async funcitons with concurrency limitation using callbacks
 * `next` will call the function `task` for as many items in collection as concurency limitation.
 * `task` should perform its async operations and call the `done` callback passed as an argument.
 * `done` will update the values of currently running and completed tasks and trigger the next tasks.
 * `allFinished` will be called when all of the tasks are completed.
 * Error handling is omitted.
 */

function parallelAsync(collection, task, allFinished) {
  const concurrency = 2;
  let completed = 0, running = 0, index = 0;

  function next() {
    while(running < concurrency && index < collection.length) {
      item = collection[index++];

      const done = () => {
        if (completed === collection.length) {
          return allFinished();
        }
        completed++;
        running--;
        next();
      };

      task(item, done);

      running++;
    }
  }

  next();
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
