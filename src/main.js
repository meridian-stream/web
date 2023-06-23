import { createApp } from 'vue'
import App from './App.vue'
import router from './Router/Router'
import './assets/main.scss'
import 'bootstrap';

const app = createApp(App)
app.use(router)
app.mount('#app')
