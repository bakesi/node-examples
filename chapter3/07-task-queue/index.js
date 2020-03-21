class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  pushTask(task) {
    this.queue.push(task);
    this.next();
  }

  next() {
    while(this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      task(() => {
        this.running--;
        this.next()
      });
      this.running++;
    }
  }
};

const queue = new TaskQueue(2);

const collection = Array(30).fill(null).map((_, index) => index + 1);
collection.forEach(item => {
  queue.pushTask((done) => {
    console.log(`Starting task for "${item}"`);

    setTimeout(() => {
      console.log(`Finished task for "${item}"`);
      done()
    }, 100);
  });
});

