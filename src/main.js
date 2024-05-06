import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Default from "./layout/masterpage.vue";
import Empty from "./layout/empty.vue";

import store from "./store";
import mitt from "mitt";

const app = createApp(App);

const emitter = mitt();
app.config.globalProperties.emitter = emitter;

app.use(router);
app.use(store);
app.component("default-layout", Default);
app.component("empty-layout", Empty);

app.mount("#app");
