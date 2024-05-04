import axios from "@/core/BaseRequest";
import CoreFunction from "@/core/CoreFunction";

export default {
  async fetchFinishedTasks({ commit }) {
    try {
      const response = await axios.get("tasks/data-finished");
      commit("setListTaskFinished", response.data.tasks);
    } catch (error) {
      console.error("Error fetching finished tasks:", error);
    }
  },
  async fetchUnFinishedTasks({ commit }) {
    try {
      const response = await axios.get("tasks/data-unfinished");
      commit("setListTaskUnFinished", response.data.tasks);
    } catch (error) {
      console.error("Error fetching unfinished tasks:", error);
    }
  },
  async fetchAllTasks({ commit }) {
    try {
      const response = await axios.get("tasks/data");
      commit("setListAllTask", response.data.tasks);
    } catch (error) {
      console.error("Error fetching all tasks:", error);
    }
  },
  async fetchListTypeTasks({ commit }) {
    try {
      const res = await axios.get("type-task");
      commit("setListTypeTask", res.data.types);
    } catch (error) {
      console.error("Error fetching type tasks:", error);
    }
  },
  updateTask({ commit }, payload) {
    axios
      .post("tasks/update", payload)
      .then((res) => {
        commit("replaceTask", res.data.task);
        CoreFunction.displayNotification(res.data.message, 200);
      })
      .catch((res) => {
        for (const [key, value] of Object.entries(res.response.data.errors)) {
          CoreFunction.displayNotification(value);
        }
      });
  },
  createTask({ commit }, payload) {
    axios
      .post("tasks/create", payload)
      .then((res) => {
        commit("addTaskToBeginning", res.data.task);
      })
      .catch((res) => {
        for (const [key, value] of Object.entries(res.response.data.errors)) {
          CoreFunction.displayNotification(value);
        }
      });
  },
  deleteTask({ commit }, payload) {
    axios.post("tasks/delete", payload).then((res) => {
      if (res.data.status == 200) {
        commit("deleteTaskById", payload.id);
      }
    });
  },
};
