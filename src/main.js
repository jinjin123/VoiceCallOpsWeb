// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
// import resource from './resource'
import 'iview/dist/styles/iview.css'
import { LoadingPlugin } from 'vux'
import { Icon, Scroll, Spin, Page, BackTop, Modal, Select, Option, Input, Button, Table } from 'iview'
import { Form, FormItem } from 'iview'
Vue.component('Icon', Icon)
Vue.component('Scroll', Scroll)
Vue.component('Spin', Spin)
Vue.component('Page', Page)
Vue.component('BackTop', BackTop)
Vue.component('Modal', Modal)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('Button', Button)
Vue.component('Table', Table)

Vue.config.productionTip = false
Vue.use(ElementUI)
const FastClick = require('fastclick')
FastClick.attach(document.body)
Vue.prototype.$axios = axios.create({
  timeout: 10000,
  withCredentials: true
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
    // resource,
  template: '<App/>',
  components: { App }
})
