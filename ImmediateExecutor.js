export default class ImmediateExecutor {
  execute(task) {
    return new Promise((resolve) => resolve(task.routine()));
  }
}
