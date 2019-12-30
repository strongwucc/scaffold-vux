// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './components/global.js'
import App from './App'
import router from './router'
import store from './store/index'
import Http from './utils/http'
import api from './utils/api'
import './utils/filter'
import FastClick from 'fastclick'
import NP from 'number-precision'

Vue.config.productionTip = false

var passiveSupported = false

try {
  var options = Object.defineProperty({}, "passive", {
    get: function() {
      return passiveSupported = true
    }
  })

  window.addEventListener("test", null, options)
} catch(err) {

}

Vue.prototype.$passiveSupported = passiveSupported

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
    let u = navigator.userAgent
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    FastClick.prototype.focus = function (targetElement) {
      let length
      if (isiOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
        length = targetElement.value.length
        targetElement.focus()
        targetElement.setSelectionRange(length, length)
      } else {
        targetElement.focus()
      }
    }
  }, passiveSupported ? { passive: true } : false)
}

Vue.prototype.$http = new Http(store, api)
Vue.prototype.API = api
Vue.prototype.NP = NP

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
