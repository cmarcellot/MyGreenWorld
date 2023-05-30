import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';

library.add(faVolumeUp, faVolumeMute);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');