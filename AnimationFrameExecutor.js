export default class AnimationFrameExecutor {
  execute(task) {
    return new Promise((resolve) => {
      requestAnimationFrame(() => resolve(task.routine()));
    });
  }
}
