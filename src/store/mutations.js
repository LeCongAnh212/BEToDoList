export default {
  setCurrentTask(state, task) {
    state.currentTask = task;
  },
  setListAllTask(state, tasks) {
    state.listAllTask = tasks;
  },
  setListTaskFinished(state, tasks) {
    state.listTaskFinished = tasks;
  },
  setListTaskUnFinished(state, tasks) {
    state.listTaskUnFinished = tasks;
  },
  addTaskToBeginning(state, task) {
    state.listAllTask.unshift(task);
    state.listTaskUnFinished.unshift(task);
  },
  deleteTaskById(state, id) {
    state.listAllTask = state.listAllTask.filter((task) => task.id != id);
    state.listTaskUnFinished = state.listTaskUnFinished.filter(
      (task) => task.id != id
    );
    state.listTaskFinished = state.listTaskFinished.filter(
      (task) => task.id != id
    );
  },
  replaceTask(state, task) {
    const reloadList = (list) => {
      const index = list.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        list.splice(index, 1, task);
      }
    };

    reloadList(state.listAllTask);
    reloadList(state.listTaskFinished);
    reloadList(state.listTaskUnFinished);
  },
  setListTypeTask(state, typeTasks) {
    state.listTypeTask = typeTasks;
  },
};
