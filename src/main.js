import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import App from './App.vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

Vue.use(VueFire)
firebase.initializeApp({
  apiKey: "AIzaSyDKAXAIxwu9T-bdjxDuBS0D3SkElKD5dEg",
  authDomain: "insurance-form.firebaseapp.com",
  databaseURL: "https://insurance-form.firebaseio.com",
  projectId: "insurance-form",
  storageBucket: "insurance-form.appspot.com",
  messagingSenderId: "1056576657852"
})
export const db = firebase.firestore()
export const sg = firebase.storage()

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
