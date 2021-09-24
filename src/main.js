import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';

import 'bulma/css/bulma.min.css';
import 'buefy/dist/buefy.min.css';

Vue.use(Buefy);

new Vue({ render: (h) => h(App) }).$mount('#app');
