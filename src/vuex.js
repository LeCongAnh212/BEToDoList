import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      listTask: [],
    };
  },
  mutations: {
    setListTask(state, tasks) {
      state.listTask = tasks;
    },
  },
});

export default store;
