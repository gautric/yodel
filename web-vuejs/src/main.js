import Vue from 'vue'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket'

import Map from './components/Map.vue'
import Card from './components/Card.vue'

Vue.component('Map', Map);
Vue.component('Card', Card);

Vue.config.productionTip = false

Vue.use(VueNativeSock, 'ws://localhost:1880/api/ws/generic', {
    format: 'json',
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 3000 // (Number) how long to initially wait before attempting a new (1000)
  })

const vm = new Vue({
  render: h => h(App)
}).$mount('#app')
