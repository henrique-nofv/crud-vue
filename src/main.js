import Vue from 'vue';
import VueSimpleAlert from 'vue-simple-alert';
import './plugins/axios';
import './plugins/vuetify-mask';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './assets/scss/reset.scss';

Vue.config.productionTip = false;

Vue.use(VueSimpleAlert);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
