import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'
import axios from 'axios'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrysw-ky4zx8A33y64gEF3feyYm-UKwyY",
  authDomain: "blogify-one.firebaseapp.com",
  projectId: "blogify-one",
  storageBucket: "blogify-one.appspot.com",
  messagingSenderId: "242347299888",
  appId: "1:242347299888:web:b871a5cab9713c737989f5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
const functions = firebase.functions();

// export const auth = firebase.auth();
export { functions }

export default db;


Vue.prototype.$axios = axios;
Vue.config.productionTip = false

Vue.filter('snippet', function (value) {
  return value.slice(0, 200) + '...'
});



// State change override
let app;

firebase.auth().onAuthStateChanged(user => {
  // console.log(user)
  user
  if (!app) {
    // Vue instance
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
