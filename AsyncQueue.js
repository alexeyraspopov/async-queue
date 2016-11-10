export default class AsyncQueue {
  constructor(options) {
    Object.assign(this, { queue: [], bandwidth: 1 }, options);
    this.isDequeuing = false;
  }

  enqueue(routine, options = {}) {
    return new Promise(async (resolve) => {
      this.queue.push(Object.assign({ routine, resolve }, options));

      if (!this.isDequeuing) {
        this.isDequeuing = true;
        await Promise.resolve();
        await this.dequeue();
        this.isDequeuing = false;
      }
    });
  }

  async dequeue() {
    while (this.queue.length > 0) {
      const tasks = this.queue.splice(0, this.bandwidth);
      const batchTask = new BatchTask(tasks);
      const results = await this.executor.execute(batchTask);

      batchTask.resolve(results);
    }
  }
}

class BatchTask {
  constructor(tasks) {
    this.tasks = tasks;
  }

  routine() {
    return this.tasks.map(t => t.routine());
  }

  resolve(results) {
    this.tasks.map((t, i) => t.resolve(results[i]));
  }
}
