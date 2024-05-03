import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      listAllTask: [],
      listTaskFinished: [],
    };
  },
  mutations: {
    setListTask(state, tasks) {
      state.listAllTask = tasks;
    },
    setListTaskFinished(state, tasks) {
      state.listTaskFinished = tasks;
    }
  },
});

export default store;
