import AsyncQueue from '../AsyncQueue';
import ImmediateExecutor from '../ImmediateExecutor';
import Heap from '../Heap';

describe('Async Queue', async () => {
  it('should do the thing', async () => {
    const heap = new Heap((a, b) => a.priority - b.priority);
    const queue = new AsyncQueue({
      executor: new ImmediateExecutor(),
      queue: heap
    });
    const events = [];

    queue.enqueue(() => events.push(1), { priority: 1 });
    queue.enqueue(() => events.push(2), { priority: 2 });

    expect(heap.length).toBe(2);

    await Promise.resolve(1); // next tick
    expect(heap.length).toBe(1);
    expect(events).toEqual([2]);

    await Promise.resolve(1); // next tick
    expect(heap.length).toBe(0);
    expect(events).toEqual([2, 1]);
  });

  it('should execute a set of tasks', async () => {
    const array = [];
    const queue = new AsyncQueue({
      executor: new ImmediateExecutor(),
      queue: array,
      bandwidth: 2
    });
    const events = [];

    queue.enqueue(() => events.push(1));
    queue.enqueue(() => events.push(2));
    queue.enqueue(() => events.push(3));

    expect(array.length).toBe(3);

    await Promise.resolve(1); // next tick
    expect(array.length).toBe(1);
    expect(events).toEqual([1, 2]);

    await Promise.resolve(1); // next tick
    expect(array.length).toBe(0);
    expect(events).toEqual([1, 2, 3]);
  });
});
