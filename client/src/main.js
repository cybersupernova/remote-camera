import io from 'socket.io-client';
import Vue from 'vue'
import App from './App.vue'
import VueSocketIOExt from 'vue-socket.io-extended';
import './vee-validate'
import store from './store'


Vue.use(VueSocketIOExt, io('http://localhost:3000'), { store, actionPrefix: 'socket_', mutationPrefix: 'socket_' });

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
