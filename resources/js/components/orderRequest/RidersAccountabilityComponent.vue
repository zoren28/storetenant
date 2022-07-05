<!-- @format -->

<template>
  <div class="container">
    <div class="table-responsive">
      <div class="row">
        <div class="col"></div>
        <div class="col-md-3 col-sm-6 mb-1">
          <div class="d-flex">
            <p class="" style="width:79px;">Filter Date:</p>
            <select
              v-model="dateToday"
              class="form-control form-control-sm pr-0"
              style="width:69%"
            >
              <option
                v-for="(ds, index) in deliverySchedules"
                :key="index"
                :value="ds.date"
                >{{ ds.date | moment }}</option
              >
            </select>
          </div>
        </div>
      </div>
      <table
        class="table table-sm table-hover"
        id="dt-delivered-list"
        style="width:100%"
      >
        <thead>
          <tr>
            <th style="white-space: nowrap;"></th>
            <th style="white-space: nowrap;"></th>
            <th style="white-space: nowrap;">Rider's Name</th>
            <th style="white-space: nowrap;">Ticket #</th>
            <th style="white-space: nowrap;">Customer's Name</th>
            <th style="white-space: nowrap;">Price</th>
            <!-- <th style="white-space: nowrap;">Discount</th> -->
            <th style="white-space: nowrap;">Change Given</th>
            <th style="white-space: nowrap;">Total Remitted</th>
            <th style="white-space: nowrap;">Transaction Status</th>
            <th style="white-space: nowrap;">Action</th>
            <th style="white-space: nowrap;"></th>
            <th style="white-space: nowrap;"></th>
            <th style="white-space: nowrap;"></th>
            <th style="white-space: nowrap;"></th>
            <th style="white-space: nowrap;"></th>
            <th style="white-space: nowrap;"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, ticket, index) in getList" :key="index">
            <td style="white-space: nowrap;"></td>
            <td style="white-space: nowrap;">
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
            <td style="white-space: nowrap;">
              <span class="font-weight-bold text-dark">{{
                riderDetail(item).riderName
              }}</span>
            </td>
            <td style="white-space: nowrap;">
              <span class="font-weight-bold text-dark">{{
                customerDetails(item).ticket_id
              }}</span>
            </td>
            <td style="white-space: nowrap;">
              <span class="font-weight-bold text-dark">{{
                customerDetails(item).customerName
              }}</span>
            </td>
            <td style="white-space: nowrap;">
              <span class="font-weight-bold text-dark"
                >₱ {{ priceDetail(item).totalPrice | numberFormat }}</span
              >
            </td>
            <!-- <td style="white-space: nowrap;">
              <button class="btn btn-sm btn-warning">View Discount</button>
            </td> -->
            <td>
              <span class="font-weight-bold text-dark"
                >₱
                {{ item[0].customer_order_detail.change | numberFormat }}</span
              >
            </td>
            <td style="white-space: nowrap;">
              <span class="font-weight-bold text-dark"
                >₱
                {{
                  (priceDetail(item).totalPrice +
                    item[0].customer_order_detail.change)
                    | numberFormat
                }}</span
              >
            </td>
            <td style="white-space: nowrap;">
              <span
                v-if="item[0].cancelled_status === 1"
                class="badge badge-light-danger"
                >Cancelled Order</span
              >
            </td>
            <td style="white-space: nowrap;">
              <button
                v-if="item[0].complete_status === 0"
                class="btn btn-bordered-warning btn-sm waves-effect waves-light btn-block"
                @click="
                  tagForSuccessfullyDelivered(
                    item[0].rider_id,
                    ticket,
                    item[0].tag_riders_id,
                    priceDetail(item).totalPrice,
                    item[0].customer_order_detail.change
                  )
                "
              >
                <span style="font-size:12px;"
                  >Tag for Successfully Delivered</span
                >
              </button>
              <button
                v-else
                class="btn  btn-bordered-warning btn-sm waves-effect waves-light btn-block"
                disabled
              >
                <span style="font-size:12px;">Successfully Delivered</span>
              </button>
            </td>
            <td>
              {{
                orderTimeFrame(item).orderSubmitted.timestamp | dateTimeFormat
              }}
            </td>
            <td>
              {{ orderTimeFrame(item).preparation.timestamp | dateTimeFormat }}
              / {{ orderTimeFrame(item).preparation.consumed }}
            </td>
            <td>
              {{ orderTimeFrame(item).picking.timestamp | dateTimeFormat }} /
              {{ orderTimeFrame(item).picking.consumed }}
            </td>
            <td>
              {{ orderTimeFrame(item).intransit.timestamp | dateTimeFormat }} /
              {{ orderTimeFrame(item).intransit.consumed }}
            </td>
            <td>
              {{ orderTimeFrame(item).delivered.timestamp | dateTimeFormat }} /
              {{ orderTimeFrame(item).delivered.consumed }}
            </td>
            <td>
              <span v-if="orderTimeFrame(item).completed.timestamp">
                {{ orderTimeFrame(item).completed.timestamp | dateTimeFormat }}
                / {{ orderTimeFrame(item).completed.consumed }}
              </span>
              <span v-else>-/--/----, -:-- --</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      id="remit-amount"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <remit-amount :orderDetails="orderDetails" />
    </div>
    <!-- /.modal -->
  </div>
</template>
<script>
import momentDurationFormatSetup from 'moment-duration-format'
import RemitAmount from './RemitAmountComponent.vue'

export default {
  name: 'RidersAccountabilityComponent',
  components: {
    RemitAmount
  },
  data() {
    return {
      table_data: {},
      table: {},
      orderDetails: {},
      deliverySchedules: [],
      dateToday: null
    }
  },
  computed: {
    getList() {
      return this.table_data
    }
  },
  methods: {
    async fetchServerDate() {
      const { data } = await axios.get('/rider_accountability/server_date')
      this.deliverySchedules = data.deliverySchedules
      this.dateToday = data.deliverySchedules[0].date
    },
    fetchDeliveredOrderList(filterDate) {
      if ($.fn.DataTable.isDataTable('#dt-delivered-list')) {
        this.table.destroy()
        this.table_data = []
      }

      axios
        .get(`/rider_accountability/fetch_delivered_order_list/${filterDate}`)
        .then(response => {
          this.table_data = response.data

          var this_data = this
          setTimeout(function() {
            this_data.table = $('#dt-delivered-list')
              .removeAttr('width')
              .DataTable({
                destroy: true,
                order: [[3, 'asc']],
                columnDefs: [
                  {
                    targets: [0],
                    className: 'details-control',
                    orderable: false,
                    data: null,
                    defaultContent: ''
                  },
                  {
                    targets: [5, 6, 7],
                    orderable: false
                  },
                  {
                    targets: [9],
                    className: 'text-center',
                    orderable: false,
                    width: '20%'
                  },
                  {
                    targets: [10, 11, 12, 13, 14, 15],
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

            $('#dt-delivered-list tbody').on(
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
    tagForSuccessfullyDelivered(rider_id, ticket_id, id, total_amt, change) {
      this.orderDetails = {
        rider_id: rider_id,
        ticket_id: ticket_id,
        id: id,
        total_amt: total_amt,
        change: change,
        dateToday: this.dateToday
      }

      $('div#remit-amount').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    customerDetails(order) {
      let customerName = null,
        mobileNo = null,
        telephoneNo = null,
        address = null,
        orderPlatform = null,
        ticket_id = null

      // console.log(order);
      // console.log(order[0].length);

      for (const bu in order) {
        customerName = `${order[bu].customer_delivery_info.lastname}, ${order[bu].customer_delivery_info.firstname}`
        orderPlatform = order[bu].ticket.type
        mobileNo = order[bu].customer_delivery_info.mobile_number
        telephoneNo = order[bu].customer_delivery_info.telephone_number
        address = `${order[bu].customer_delivery_info.complete_address}, ${order[bu].customer_delivery_info.street_purok}, ${order[bu].customer_delivery_info.barangay.brgy_name}, ${order[bu].customer_delivery_info.barangay.town.town_name}, ${order[bu].customer_delivery_info.barangay.town.prov_name}`
        ticket_id = order[bu].ticket.ticket
        break
      }

      this.customerName = customerName

      return {
        customerName,
        mobileNo,
        telephoneNo,
        address,
        orderPlatform,
        ticket_id
      }
    },
    riderDetail(data) {
      let riderName = null

      for (const dtl in data) {
        riderName = `${data[dtl].rider_detail.r_lastname}, ${data[dtl].rider_detail.r_firstname}`
        break
      }

      return {
        riderName
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
        intransit = {
          timestamp: null,
          consumed: null
        },
        delivered = {
          timestamp: null,
          consumed: null
        },
        completed = {
          timestamp: null,
          consumed: null
        }

      orderSubmitted.timestamp = data[0].prepared_at

      preparation.timestamp = data[0].tag_status_at
        ? data[0].tag_status_at
        : null

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

      picking.timestamp = data[0].r_setup_stat_at
        ? data[0].r_setup_stat_at
        : null

      picking.consumed = picking.timestamp
        ? moment
            .duration(
              moment(picking.timestamp).diff(
                moment(preparation.timestamp),
                'seconds'
              ),
              'seconds'
            )
            .format('h [hrs], m [min], s [secs]')
        : '--, --'

      intransit.timestamp = data[0].trans_at ? data[0].trans_at : null

      intransit.consumed = intransit.timestamp
        ? moment
            .duration(
              moment(intransit.timestamp).diff(
                moment(picking.timestamp),
                'seconds'
              ),
              'seconds'
            )
            .format('h [hrs], m [min], s [secs]')
        : '--, --'

      delivered.timestamp = data[0].delevered_at ? data[0].delevered_at : null

      delivered.consumed = delivered.timestamp
        ? moment
            .duration(
              moment(delivered.timestamp).diff(
                moment(intransit.timestamp),
                'seconds'
              ),
              'seconds'
            )
            .format('h [hrs], m [min], s [secs]')
        : '--, --'

      completed.timestamp = data[0].completed_at ? data[0].completed_at : null

      completed.consumed = completed.timestamp
        ? moment
            .duration(
              moment(completed.timestamp).diff(
                moment(delivered.timestamp),
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
        intransit,
        delivered,
        completed
      }
    }
  },
  mounted() {
    this.fetchServerDate()
  },
  filters: {
    moment: function(date) {
      return moment(date).format('MMM DD, YYYY')
    }
  },
  watch: {
    dateToday() {
      this.fetchDeliveredOrderList(this.dateToday)
    }
  }
}

function format(d) {
  // `d` is the original data object for the row
  return (
    '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
    '<tr>' +
    '<td><span class="font-weight-bold">Order Submitted:</span></td>' +
    '<td><span class="text-danger">(Submitted Order by Tenant)</span></td>' +
    '<td>' +
    d[10] +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<td><span class="font-weight-bold">Food Preparation / Time Consumed:</span></td>' +
    '<td><span class="text-danger">(Order Submission -> For Pick-up Tagging)</span></td>' +
    '<td>' +
    d[11] +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<td><span class="font-weight-bold">Picking Assignment / Time Consumed:</span></td>' +
    '<td><span class="text-danger">(For Pick-up Tagging -> Rider To Setup)</span></td>' +
    '<td>' +
    d[12] +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<td><span class="font-weight-bold">Order Claiming / Time Consumed:</span></td>' +
    '<td><span class="text-danger">(Rider To Setup -> In Transit Taggging by Tenant)</span></td>' +
    '<td>' +
    d[13] +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<td><span class="font-weight-bold">Delivery Period / Time Consumed:</span></td>' +
    '<td><span class="text-danger">(In Transit Taggging by Tenant -> Customer)</span></td>' +
    '<td>' +
    d[14] +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<td><span class="font-weight-bold">Completed Period / Time Consumed:</span></td>' +
    '<td><span class="text-danger">(Remitted Amount by Rider -> Tagging Succesfully Remitted by Tenant)</span></td>' +
    '<td>' +
    d[15] +
    '</td>' +
    '</tr>' +
    '</table>'
  )
}
</script>
