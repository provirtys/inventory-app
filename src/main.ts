import '@assets/style/index.scss';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'


const modules = import.meta.glob('./assets/icons/*.svg');
Object.values(modules).forEach(async (el) => await el());

const app = createApp(App);
const pinia = createPinia()

app.use(pinia);
app.mount('#app');
