
function parallelAsync(collection, task, allFinished) {
  const concurrency = 2;
  let completed = 0, running = 0, index = 0;
  function next() {
    while(running < concurrency && index < collection.length) {
      item = collection[index++];
      task(item, () => {
        if (completed === collection.length) {
          return allFinished();
        }
        completed++;
        running--;
        next();
      });

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
      done(value);
    }, value * 100);
  },
  () => {
    console.log("All the tasks are finished");
  }
)
