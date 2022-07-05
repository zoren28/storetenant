<!-- @format -->

<template>
  <div class="container">
    <div class="table-responsive">
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
      <table class="table table-sm table-hover" id="dt-transaction-list">
        <thead>
          <tr>
            <th></th>
            <th>Ticket #</th>
            <th>Customer's Name</th>
            <th>Date and Time for Delivery</th>
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
            <td>
              <span
                class="badge badge-info"
                v-if="
                  isPending(g) === true &&
                    g[0].cancel_status === 0 &&
                    (g[0].customer_order_detail === null ||
                      g[0].customer_order_detail.cancelled_status === 0) &&
                    isPrepared(g) === false
                "
                >Pending Order</span
              >
              <span
                class="badge badge-primary"
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
                class="badge badge-success"
                v-else-if="
                  isPending(g) === false &&
                    g[0].cancel_status === 0 &&
                    (g[0].customer_order_detail === null ||
                      g[0].customer_order_detail.cancelled_status === 0) &&
                    isPrepared(g) === true &&
                    g[0].tags.length === 0
                "
                >For Pick Up</span
              >
              <span
                class="badge badge-success"
                v-else-if="
                  isPending(g) === false &&
                    g[0].cancel_status === 0 &&
                    (g[0].customer_order_detail === null ||
                      g[0].customer_order_detail.cancelled_status === 0) &&
                    isPrepared(g) === true &&
                    g[0].tags[0].trans_status === 0 &&
                    g[0].tags[0].delevered_status === 0
                "
                >For Pick Up</span
              >
              <span
                class="badge badge-pink"
                v-else-if="
                  isPending(g) === false &&
                    g[0].cancel_status === 0 &&
                    (g[0].customer_order_detail === null ||
                      g[0].customer_order_detail.cancelled_status === 0) &&
                    isPrepared(g) === true &&
                    g[0].tags[0].trans_status === 1 &&
                    g[0].tags[0].delevered_status === 0 &&
                    g[0].tags[0].complete_status === 0
                "
                >In Transit</span
              >
              <span
                class="badge badge-pink"
                v-else-if="
                  isPending(g) === false &&
                    g[0].cancel_status === 0 &&
                    (g[0].customer_order_detail === null ||
                      g[0].customer_order_detail.cancelled_status === 0) &&
                    isPrepared(g) === true &&
                    g[0].tags[0].trans_status === 1 &&
                    g[0].tags[0].delevered_status === 1 &&
                    g[0].tags[0].complete_status === 0
                "
                >Delivered</span
              >
              <span
                class="badge badge-purple"
                v-else-if="
                  isPending(g) === false &&
                    g[0].cancel_status === 0 &&
                    (g[0].customer_order_detail === null ||
                      g[0].customer_order_detail.cancelled_status === 0) &&
                    isPrepared(g) === true &&
                    g[0].tags[0].trans_status === 1 &&
                    g[0].tags[0].delevered_status === 1 &&
                    g[0].tags[0].complete_status === 1
                "
                >Remitted</span
              >
              <span v-else class="badge badge-danger">Cancelled Order</span>
            </td>
            <td align="center">
              <button
                v-if="
                  (isPending(g) === false &&
                    (g[0].customer_order_detail === null ||
                      g[0].customer_order_detail.cancelled_status === 0) &&
                    isPrepared(g) === true &&
                    g[0].tags.length > 0 &&
                    g[0].tags[0].trans_status === 1 &&
                    g[0].tags[0].delevered_status === 0 &&
                    g[0].tags[0].complete_status === 0) ||
                    (isPending(g) === false &&
                      (g[0].customer_order_detail === null ||
                        g[0].customer_order_detail.cancelled_status === 0) &&
                      isPrepared(g) === true &&
                      g[0].tags.length > 0 &&
                      g[0].tags[0].trans_status === 1 &&
                      g[0].tags[0].delevered_status === 1 &&
                      g[0].tags[0].complete_status === 0) ||
                    (isPending(g) === false &&
                      (g[0].customer_order_detail === null ||
                        g[0].customer_order_detail.cancelled_status === 0) &&
                      isPrepared(g) === true &&
                      g[0].tags.length > 0 &&
                      g[0].tags[0].trans_status === 1 &&
                      g[0].tags[0].delevered_status === 1 &&
                      g[0].tags[0].complete_status === 1)
                "
                class="btn btn-bordered-warning btn-sm waves-effect waves-light"
                @click="viewOrderHistory(g[0].ticket_id, 0)"
              >
                View
              </button>
              <button
                v-else
                class="btn btn-bordered-warning btn-sm waves-effect waves-light"
                @click="viewOrder(g[0].ticket_id)"
              >
                View
              </button>

              <!-- <button v-if="isPending(g) === true" class="btn btn-bordered-warning btn-sm waves-effect waves-light" @click="viewOrder(g[0].ticket_id)">View</button>
                            <button v-else class="btn btn-bordered-warning btn-sm waves-effect waves-light" @click="viewOrderHistory(g[0].ticket_id, 0)">View</button> -->
              <button
                v-if="g[0].locate_tenant.global_cat_id === 3"
                class="btn tagForPickUp btn-bordered-warning btn-sm waves-effect waves-light"
                @click="tfpElectronic(ticket, g[0].customer_id)"
                :disabled="
                  isCancelled(g) === true ||
                    isPending(g) === true ||
                    isPrepared(g) === true
                "
              >
                Tag for Pick Up
              </button>
              <button
                v-else
                class="btn tagForPickUp btn-bordered-warning btn-sm waves-effect waves-light"
                @click="tagForPickUp(ticket, g[0].customer_id)"
                :disabled="
                  isCancelled(g) === true ||
                    isPending(g) === true ||
                    isPrepared(g) === true
                "
              >
                Tag for Pick Up
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        id="container_type"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
        style="display: none;"
      >
        <container-type :productItem="productItem" />
      </div>
      <!-- /.modal -->
    </div>
  </div>
</template>
<script>
import ContainerType from './ContainerTypeComponent.vue'
// import { Datetime } from 'vue-datetime';
// import { DateTime } from 'luxon'
// import 'vue-datetime/dist/vue-datetime.css'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default {
  name: 'OngoingTransactionComponent',
  data() {
    return {
      table_data: [],
      table: {},
      isChecked: null,
      button_pickup_tag: false,
      params: {},
      date: null,
      dateToday: null,
      orderDetails: {},
      ticket: null,
      productItem: {}
    }
  },
  components: {
    // datetime: Datetime,
    ContainerType
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
    tfpElectronic(ticket_id, customer_id) {
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
            .post('/order/tfp_electronic', this.params)
            .then(({ data, status }) => {
              const { message } = data

              if (message === 'success') {
                const { change } = data
                const { no_tenants } = data
                Swal.fire({
                  type: 'success',
                  title: 'Success',
                  allowOutsideClick: false,
                  text: 'Customer Order has been tagged for pick up!'
                }).then(result => {
                  this.table.destroy()
                  this.table_data = []

                  if (change == '00.00' || change == '0.00') {
                    if (no_tenants > 1) {
                      Swal.fire({
                        type: 'info',
                        title: 'Information',
                        text: 'Your the last tenant who Tag for Pick up'
                      }).then(result => {
                        this.fetchPendingOrder()
                      })
                    } else {
                      this.fetchPendingOrder()
                    }
                  } else {
                    Swal.fire({
                      type: 'info',
                      title: 'Information',
                      text: 'Please prepare for customer change of ₱ ' + change
                    }).then(result => {
                      this.fetchPendingOrder()
                    })
                  }
                })
              } else {
                Swal.fire({
                  type: 'success',
                  title: 'Success',
                  text: message
                }).then(result => {
                  this.fetchPendingOrder()
                })
              }
            })
        }
      })
    },
    encryptTicket(data) {
      return btoa(data)
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
        const status = data[index].tag_status

        if (status == 0) {
          prepared = false
        }
      }

      return prepared
    },
    fetchPendingOrder() {
      if ($.fn.DataTable.isDataTable('#dt-transaction-list')) {
        this.table.destroy()
        this.table_data = []
      }

      axios.get('/order/fetch_transaction_list').then(response => {
        this.table_data = response.data

        var this_data = this
        setTimeout(function() {
          this_data.table = $('#dt-transaction-list').DataTable({
            destroy: true,
            order: [[3, 'asc']],
            columnDefs: [
              {
                targets: [0, 1],
                orderable: false
              },
              {
                targets: [4],
                orderable: false,
                className: 'text-center'
              },
              {
                targets: [5],
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
    tagForPickUp(ticket_id, customer_id) {
      this.productItem = {
        ticket_id: ticket_id
      }

      var this_data = this
      $('#dt-transaction-list').on('click', 'button.tagForPickUp', function() {
        if (
          !$(this)
            .parents('tr')
            .hasClass('selected')
        ) {
          this_data.table.$('tr.selected').removeClass('selected')
          $(this)
            .parents('tr')
            .addClass('selected')
        }
      })

      $('div#container_type').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    viewOrder(ticket_id) {
      this.params = {
        ticket_id: ticket_id
      }

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
            name: 'view-order',
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
    getServerDateTime() {
      axios.get('/order/server_datetime').then(response => {
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
