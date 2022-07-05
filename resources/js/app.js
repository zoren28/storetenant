/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 *
 * @format
 */

require('./bootstrap')
window.Vue = require('vue')
window.moment = require('moment')
import Echo from 'laravel-echo'
import router from './routes'

Vue.filter('numberFormat', number => {
  return new Intl.NumberFormat().format(number)
})

Vue.filter('dateTimeFormat', date => {
  return new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(date))
})

Vue.component(
  'delivery-order',
  require('./components/counter/DeliveryOrderComponent.vue').default
)
Vue.component(
  'pickup-order',
  require('./components/counter/PickUpOrderComponent.vue').default
)
Vue.component(
  'advance-order',
  require('./components/counter/AdvanceOrderComponent.vue').default
)
Vue.component(
  'project-menu',
  require('./components/ProjectMenuComponent.vue').default
)

const tenant_id = document.head.querySelector('meta[name="auth_user"]')

new Vue({
  el: '#app',
  router,
  data() {
    return {
      delivery_order: {},
      pickup_order: {},
      advance_order: {},
      adminAccess: 'https://apanel.alturush.com/',
      riderAccess: 'https://customerservice.alturush.com/',
      reloadOnGoingProcess: 0
    }
  },
  computed: {
    getDeliveryOrders() {
      return this.delivery_order
    },
    getPickUpOrders() {
      return this.pickup_order
    },
    getAdvanceOrders() {
      return this.advance_order
    }
  },
  methods: {
    async fetchDeliveryOrders() {
      const { data } = await axios.get('/order/fetch_delivery_order')
      this.delivery_order = data[0].delivery_order

      if (Object.keys(data[0].sound_deliverOrder).length > 0) {
        let sound = setInterval(() => {
          PlaySound()
        }, 5000)
      }
    },
    async fetchPickUpOrders() {
      const { data } = await axios.get('/pickup_order/fetch_pickup_order')
      this.pickup_order = data[0].pickup_order

      if (Object.keys(data[0].sound_pickupOrder).length > 0) {
        setTimeout(() => {
          let sound2 = setInterval(() => {
            PlaySound2()
          }, 5000)
        }, 1000)
      }
    },
    async fetchAdvanceOrders() {
      const { data } = await axios.get('/order/fetch_advance_order')
      this.advance_order = data
    }
  },
  mounted() {
    this.fetchDeliveryOrders()
    this.fetchPickUpOrders()
    this.fetchAdvanceOrders()

    window.Echo.private(`order-submitted.${tenant_id.content}`).listen(
      'OrderSubmitted',
      async e => {
        setTimeout(() => {
          this.fetchDeliveryOrders()
          this.fetchPickUpOrders()
          this.fetchAdvanceOrders()
          this.reloadOnGoingProcess = this.reloadOnGoingProcess + 1
        }, 1000)
      }
    )
  }
})
