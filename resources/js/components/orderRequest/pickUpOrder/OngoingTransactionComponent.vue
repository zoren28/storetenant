<!-- @format -->

<template>
  <div class="container">
    <div class="">
      <!-- <div class="row">
                <div class="col"></div>
                <div class="col-md-3 d-flex mb-2" style="margin-right:-10px;">
                    <p class="" style="width:100px; margin-right: -1.5rem !important">Filter Date:</p>
                    <datetime 
                        v-model="date"
                        input-class="form-control form-control-sm"
                        class="theme-orange"
                        :min-datetime="dateToday"
                        auto
                        backdrop-click
                        title="Filter Date"
                        value-zone="Asia/Manila"
                        zone="Asia/Manila"
                    >
                    </datetime>
                </div>
            </div> -->
      <table
        class="table table-sm table-hover"
        id="dt-pickup-transaction-list"
        style="width:100%"
      >
        <thead>
          <tr>
            <th></th>
            <th>Ticket #</th>
            <th>Customer's Name</th>
            <th>Date and Time for Pick Up</th>
            <th>Total Amount</th>
            <th>Transaction Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="Object.keys(getList).length > 0">
          <tr v-for="(g, ticket, index) in getList" :key="index">
            <td>
              <i v-if="g[0].type === 1" class="remixicon-phone-line"></i>
              <i
                v-else-if="g[0].type === 3"
                class="remixicon-computer-line"
              ></i>
              <i v-else class="remixicon-smartphone-line"></i>
            </td>
            <td>
              <span class="font-weight-bold text-dark">{{ g[0].ticket }}</span>
            </td>
            <td>
              <span class="font-weight-bold text-dark">{{
                g[0].customer_delivery_info.lastname +
                  ', ' +
                  g[0].customer_delivery_info.firstname
              }}</span>
            </td>
            <td>
              <span style="display:none;">{{
                checkTime(g[0].pickup_at).getTime
              }}</span>
              <span
                v-if="checkTime(g[0].pickup_at).getHis === '0:0:0'"
                class="font-weight-bold text-dark"
                >{{ g[0].pickup_at | moment }}</span
              >
              <span v-else class="font-weight-bold text-dark">{{
                g[0].pickup_at | momentTime
              }}</span>
            </td>
            <td align="center">
              <span class="font-weight-bold text-dark"
                >₱ {{ priceDetail(g).totalPrice | numberFormat }}</span
              >
            </td>
            <td align="center">
              <span class="badge badge-light-success" v-if="checkPayment(g[0])"
                >Paid & Released</span
              >
              <span
                class="badge badge-light-info"
                v-else-if="
                  isPending(g) === true &&
                    g[0].cancel_status === 0 &&
                    (g[0].customer_order_detail === null ||
                      g[0].customer_order_detail.cancelled_status === 0) &&
                    isPrepared(g) === false
                "
                >Pending Order</span
              >
              <span
                class="badge badge-light-primary"
                v-else-if="
                  isPending(g) === false &&
                    g[0].cancel_status === 0 &&
                    (g[0].customer_order_detail === null ||
                      g[0].customer_order_detail.cancelled_status === 0) &&
                    isPrepared(g) === false
                "
                >Preparing Order</span
              >
              <span
                class="badge badge-light-success"
                v-else-if="
                  isPending(g) === false &&
                    g[0].cancel_status === 0 &&
                    (g[0].customer_order_detail === null ||
                      g[0].customer_order_detail.cancelled_status === 0) &&
                    isPrepared(g) === true
                "
                >Ready for Pickup</span
              >
              <span v-else class="badge badge-light-danger"
                >Cancelled Order</span
              >
            </td>
            <td width="20%">
              <button
                v-if="isPending(g) === true"
                class="btn btn-bordered-warning btn-sm waves-effect waves-light"
                @click="viewOrder(g[0].ticket_id)"
              >
                View
              </button>
              <button
                v-else
                class="btn btn-bordered-warning btn-sm waves-effect waves-light"
                @click="viewOrderHistory(g[0].ticket_id, 1)"
              >
                View
              </button>
              <button
                class="btn btn-bordered-warning btn-sm waves-effect waves-light"
                @click="tagForPickUp(ticket)"
                :disabled="
                  isCancelled(g) === true ||
                    isPending(g) === true ||
                    isPrepared(g) === true
                "
              >
                Ready for Pick Up
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
// import { Datetime } from 'vue-datetime';
// import { DateTime } from 'luxon'
// import 'vue-datetime/dist/vue-datetime.css'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default {
  name: 'OngoingTransactionComponent',
  components: {
    // datetime: Datetime
  },
  data() {
    return {
      table_data: [],
      table: {},
      isChecked: null,
      button_pickup_tag: false,
      params: [],
      date: null,
      dateToday: null
    }
  },
  computed: {
    reloadOnGoingProcess() {
      return this.$root.reloadOnGoingProcess
    },
    getList() {
      return this.table_data
    }
  },
  methods: {
    encryptTicket(data) {
      return btoa(data)
    },
    checkPayment(data) {
      if (data.tags.length === 0) {
        return false
      } else {
        return true
      }
    },
    isPending(data) {
      let pending = true
      for (let index = 0; index < data.length; index++) {
        const status = data[index].pending_status

        if (status == 0) {
          pending = false
        }
      }

      return pending
    },
    priceDetail(data) {
      let totalPrice = 0,
        discounted_amt = 0

      data.forEach(order => {
        var stocks = null
        for (const key in order.product_prices) {
          if (
            (order.uom_id != null || order.uom_id != '') &&
            order.product_prices[key].uom_id == order.uom_id
          ) {
            stocks = order.product_prices[key].stocks
          } else {
            stocks = order.product_prices[key].stocks
          }
        }

        if (order.canceled_status === 0 && order.status === 1) {
          if (parseInt(order.quantity) > parseInt(stocks)) {
          } else {
            totalPrice += parseFloat(order.total_price)
          }
        }
      })

      data[0].customer_discounted_amt.forEach(discount => {
        discounted_amt += parseFloat(discount.rider_discount)
      })

      totalPrice = parseFloat(totalPrice) - parseFloat(discounted_amt)
      return {
        totalPrice
      }
    },
    isCancelled(data) {
      let calcelled = true
      for (let index = 0; index < data.length; index++) {
        const cancel = data[index].canceled_status

        if (cancel == 0) {
          calcelled = false
        }
      }

      return calcelled
    },
    isPrepared(data) {
      let prepared = true
      for (let index = 0; index < data.length; index++) {
        const status = data[index].tag_pickup_status

        if (status == 0) {
          prepared = false
        }
      }

      return prepared
    },
    fetchPendingOrder() {
      axios
        .get('/pickup_order/fetch_pickup_transaction_list')
        .then(response => {
          this.table_data = response.data

          var this_data = this
          setTimeout(function() {
            this_data.table = $('#dt-pickup-transaction-list').DataTable({
              destroy: true,
              order: [[3, 'asc']],
              columnDefs: [
                {
                  targets: [0, 1],
                  orderable: false
                },
                {
                  targets: [3],
                  orderable: false
                },
                {
                  targets: [4, 5],
                  orderable: false,
                  className: 'text-center'
                },
                {
                  targets: [6],
                  orderable: false,
                  width: '20%',
                  className: 'text-center'
                }
              ],
              language: {
                paginate: {
                  previous: "<i class='mdi mdi-chevron-left'>",
                  next: "<i class='mdi mdi-chevron-right'>"
                }
              },
              drawCallback: function() {
                $('.dataTables_paginate > .pagination').addClass(
                  'pagination-rounded'
                )
              }
            })
          }, 100)
        })
    },
    tagForPickUp(ticket_id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, please proceed!'
      }).then(result => {
        if (result.value) {
          this.params = {
            ticket_id: ticket_id
          }

          axios
            .post('/pickup_order/tag_for_pickup', this.params)
            .then(({ data, status }) => {
              const { message } = data

              Swal.fire({
                type: 'success',
                title: 'Success',
                text: message
              }).then(result => {
                this.table.destroy()
                this.table_data = []
                this.fetchPendingOrder()
              })
            })
        }
      })
    },
    viewOrder(ticket_id) {
      this.params = {
        ticket_id: ticket_id
      }
      // axios.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
      axios.post('/order/check_order', this.params).then(({ data, status }) => {
        const { order_status } = data
        if (order_status === 'preparing') {
          const { name } = data
          Swal.fire({
            type: 'info',
            title: 'Opsss!!',
            text: 'Order reviewed by: ' + name + '.'
          }).then(result => {
            this.fetchPendingOrder()
          })
        } else {
          this.$router.push({
            name: 'view-pickup-order',
            params: { ticketId: this.encryptTicket(ticket_id) }
          })
        }
      })
    },
    viewOrderHistory(ticket_id, mop) {
      this.$router.push({
        name: 'view-order-history',
        params: {
          ticketId: this.encryptTicket(ticket_id),
          mop: this.encryptTicket(mop)
        }
      })
    },
    async getServerDateTime() {
      await axios.get('/order/server_datetime').then(response => {
        this.date = new Date(response.data).toISOString()
        this.dateToday = new Date(response.data).toISOString()
      })
    },
    checkTime(date) {
      let getTime = null,
        getHis = null

      var d = new Date(date)
      getTime = d.getTime()
      getHis = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()

      return {
        getTime,
        getHis
      }
    }
  },
  mounted() {
    // this.getServerDateTime();
    this.fetchPendingOrder()
  },
  filters: {
    moment: function(date) {
      return moment(date).format('MMMM DD, YYYY')
    },
    momentTime: function(date) {
      return moment(date).format('MMMM DD, YYYY, h:mm A')
    }
  },
  watch: {
    reloadOnGoingProcess() {
      this.fetchPendingOrder()
    }
  }
}
</script>
