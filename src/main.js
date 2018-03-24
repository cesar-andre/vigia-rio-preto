// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import {auth} from './firebase/setup';
import './assets/scss/styles.scss';
import './assets/css/projeto.css';
import '../node_modules/vue-googlemaps/dist/vue-googlemaps.css'
import Notifications from 'vue-notification';
import VueSweetalert2 from 'vue-sweetalert2';
import Vuelidate from 'vuelidate';

Vue.use(Notifications);
Vue.use(VueSweetalert2);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted () {
    auth.onAuthStateChanged(user => {
      if(!user){
        localStorage.removeItem('antuser');
        //this.$router.push({path: '/login'});
      } else{
        localStorage.setItem('antuser', JSON.stringify(user));
        this.$router.push({path: '/opinioes'});
      }
    })
  }
})
