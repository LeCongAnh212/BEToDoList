import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Default from './layout/masterpage.vue' 
import Empty from './layout/empty.vue'

const app = createApp(App)

app.use(router)
app.component('default-layout', Default)
app.component("empty-layout", Empty);

app.mount('#app')
