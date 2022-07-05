<!-- @format -->

<template>
  <div class="container">
    <div class="table-responsive">
      <table
        class="table table-sm table-hover"
        id="dt-remmitance-list"
        style="width:100%"
      >
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Ticket</th>
            <th>Customer's Name</th>
            <th><center>Discount</center></th>
            <th>Price</th>
            <th>Payment Amount</th>
            <th>Status</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, ticket, index) in getList" :key="index">
            <td></td>
            <td>
              <i
                v-if="customerDetails(item).orderPlatform === 1"
                class="remixicon-phone-line"
              ></i>
              <i
                v-else-if="customerDetails(item).orderPlatform === 3"
                class="remixicon-computer-line"
              ></i>
              <i v-else class="remixicon-smartphone-line"></i>
            </td>
            <td>
              <span class="font-weight-bold text-dark">{{
                customerDetails(item).ticket_id
              }}</span>
            </td>
            <td>
              <span class="font-weight-bold text-dark">{{
                customerDetails(item).customerName
              }}</span>
            </td>
            <td style="white-space: nowrap;">
              <button
                class="btn btn-bordered-warning btn-sm waves-effect waves-light"
                :disabled="
                  item[0].customer_discounted_amt.length === 0 ||
                    item[0].tags.length > 0
                "
                @click="checkDiscount(item[0].ticket_id)"
              >
                Check Discount
              </button>
            </td>
            <td>
              <span class="font-weight-bold text-dark"
                >₱ {{ priceDetail(item).totalPrice | numberFormat }}</span
              >
            </td>
            <td>
              <button
                v-if="
                  item[0].customer_discounted_amt.length > 0 &&
                    is_discounted === true
                "
                class="btn btn-bordered-warning btn-sm waves-effect waves-light"
                disabled
              >
                Payment Amount
              </button>
              <button
                v-else
                class="btn btn-bordered-warning btn-sm waves-effect waves-light"
                @click="
                  paymentOrder(
                    ticket,
                    item[0].customer_id,
                    priceDetail(item).totalPrice
                  )
                "
                :disabled="checkPayment(item[0])"
              >
                Payment Amount
              </button>
            </td>
            <td>
              <span
                class="badge badge-light-primary"
                v-if="checkPayment(item[0])"
                >Paid & Released</span
              >
              <span class="badge badge-light-success" v-else>For Pick Up</span>
            </td>
            <td>
              {{
                orderTimeFrame(item).orderSubmitted.timestamp | dateTimeFormat
              }}
            </td>
            <td>
              {{ orderTimeFrame(item).picking.timestamp | dateTimeFormat }} /
              {{ orderTimeFrame(item).picking.consumed }}
            </td>
            <td>
              <span v-if="orderTimeFrame(item).released.timestamp">
                {{ orderTimeFrame(item).released.timestamp | dateTimeFormat }} /
                {{ orderTimeFrame(item).released.consumed }}
              </span>
              <span v-else>-/--/----, -:-- --</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      id="payment-amount"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <payment-amount :orderDetails="orderDetails" />
    </div>
    <!-- /.modal -->

    <div
      id="check-discount-tele"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <check-discount-tele
        :check_discount_tele="discount_details"
        @closeRequestDiscount="closeRequestDiscount"
      />
    </div>
    <!-- /.modal -->
  </div>
</template>
<script>
import Vue from 'vue'
import momentDurationFormatSetup from 'moment-duration-format'
import PaymentAmount from './PaymentAmountComponent.vue'
import CheckDiscountTele from './discount/CheckDiscountTeleComponent.vue'

export default {
  name: 'RemittanceMonitoringComponent',
  components: {
    PaymentAmount,
    CheckDiscountTele
  },
  data() {
    return {
      table_data: [],
      table: {},
      orderDetails: {},
      discount_details: {},
      is_discounted: true
    }
  },
  computed: {
    getList() {
      return this.table_data
    }
  },
  methods: {
    fetchSuccessfullyPickUp() {
      axios
        .get('/pickup_payment_monitoring/fetch_pickup_payment')
        .then(response => {
          this.table_data = response.data

          var this_data = this
          setTimeout(function() {
            this_data.table = $('#dt-remmitance-list')
              .removeAttr('width')
              .DataTable({
                destroy: true,
                order: [[3, 'asc']],
                scrollX: true,
                columnDefs: [
                  {
                    targets: [0],
                    className: 'details-control',
                    orderable: false,
                    data: null,
                    defaultContent: ''
                  },
                  {
                    width: '3%',
                    targets: [0, 1]
                  },
                  {
                    width: '10%',
                    targets: [2]
                  },
                  {
                    width: '15%',
                    targets: [3]
                  },
                  {
                    width: '10%',
                    targets: [5],
                    className: 'text-right'
                  },
                  {
                    width: '15%',
                    targets: [4, 6, 7],
                    className: 'text-center'
                  },
                  {
                    targets: [8, 9, 10],
                    visible: false
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

            $('#dt-remmitance-list tbody').on(
              'click',
              'td.details-control',
              function() {
                var tr = $(this).closest('tr')
                var row = this_data.table.row(tr)

                if (row.child.isShown()) {
                  // This row is already open - close it
                  row.child.hide()
                  tr.removeClass('shown')
                } else {
                  // Open this row
                  row.child(format(row.data())).show()
                  tr.addClass('shown')
                }
              }
            )
          }, 100)
        })
    },
    paymentOrder(ticket_id, customer_id, total_amt) {
      this.orderDetails = {
        ticket_id: ticket_id,
        customer_id: customer_id,
        total_amt: total_amt
      }

      $('div#payment-amount').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    checkPayment(data) {
      if (data.tags.length === 0) {
        return false
      } else {
        return true
      }
    },
    customerDetails(order) {
      let customerName = null,
        orderPlatform = null,
        ticket_id = null

      for (const bu in order) {
        customerName = `${order[bu].customer_delivery_info.lastname}, ${order[bu].customer_delivery_info.firstname}`
        orderPlatform = order[bu].ticket.type
        ticket_id = order[bu].ticket.ticket
        break
      }

      return {
        customerName,
        orderPlatform,
        ticket_id
      }
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
          totalPrice += parseFloat(order.total_price)
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
    orderTimeFrame(data) {
      let orderSubmitted = {
          timestamp: null,
          consumed: null
        },
        preparation = {
          timestamp: null,
          consumed: null
        },
        picking = {
          timestamp: null,
          consumed: null
        },
        released = {
          timestamp: null,
          consumed: null
        }

      orderSubmitted.timestamp = data[0].submitted_at

      preparation.timestamp = data[0].prepared_at ? data[0].prepared_at : null

      preparation.consumed = preparation.timestamp
        ? moment
            .duration(
              moment(preparation.timestamp).diff(
                moment(orderSubmitted.timestamp),
                'seconds'
              ),
              'seconds'
            )
            .format('h [hrs], m [min], s [secs]')
        : '--, --'

      picking.timestamp = data[0].tag_pickup_at ? data[0].tag_pickup_at : null

      picking.consumed = picking.timestamp
        ? moment
            .duration(
              moment(picking.timestamp).diff(
                moment(orderSubmitted.timestamp),
                'seconds'
              ),
              'seconds'
            )
            .format('h [hrs], m [min], s [secs]')
        : '--, --'

      if (data[0].tags.length === 0) {
        released.timestamp = null
      } else {
        released.timestamp = data[0].tags[0].remitted_at
          ? data[0].tags[0].remitted_at
          : null
      }

      released.consumed = released.timestamp
        ? moment
            .duration(
              moment(released.timestamp).diff(
                moment(picking.timestamp),
                'seconds'
              ),
              'seconds'
            )
            .format('h [hrs], m [min], s [secs]')
        : '--, --'

      return {
        orderSubmitted,
        preparation,
        picking,
        released
      }
    },
    checkDiscount(ticket_id) {
      this.discount_details = {
        ticket_id: ticket_id
      }

      $('div#check-discount-tele').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    closeRequestDiscount() {
      this.is_discounted = false
      this.fetchSuccessfullyPickUp()
    }
  },
  mounted() {
    this.fetchSuccessfullyPickUp()
  }
}

function format(d) {
  // `d` is the original data object for the row
  return (
    '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
    '<tr>' +
    '<td><span class="font-weight-bold">Order Submitted:</span></td>' +
    '<td></td>' +
    '<td>' +
    d[7] +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<td><span class="font-weight-bold">Food Preparation / Time Consumed:</span></td>' +
    '<td><span class="text-danger">(Order Submission -> Ready for pick-up Tagging)</span></td>' +
    '<td>' +
    d[8] +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<td><span class="font-weight-bold">Released Period / Time Consumed:</span></td>' +
    '<td><span class="text-danger">(Amount Remitted by tenant -> Customer)</span></td>' +
    '<td>' +
    d[9] +
    '</td>' +
    '</tr>' +
    '</table>'
  )
}
</script>
