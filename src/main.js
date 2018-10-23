import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  //mounted(){ // do something when page is loaded
    // do something when page is loaded
  //} // do something when page is loaded
}).$mount("#app");


//var VueScrollTo = require('vue-scrollto');
//Vue.use(VueScrollTo);