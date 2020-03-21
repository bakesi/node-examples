
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
      done(value);
    }, value * 100);
  },
  () => {
    console.log("All the tasks are finished");
  }
)
