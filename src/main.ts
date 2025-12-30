import { createApp } from 'vue';
import App from './App.vue';
import CarbonComponentsVue from '@carbon/vue';
import './styles/main.scss';

const app = createApp(App);
app.use(CarbonComponentsVue);
app.mount('#app');
