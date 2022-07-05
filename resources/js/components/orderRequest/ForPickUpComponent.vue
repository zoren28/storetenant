<!-- @format -->

<template>
  <div class="container">
    <div class="table-responsive">
      <table class="table table-sm table-hover" id="dt-pickup-list">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>Rider's Name</th>
            <th>Vehicle Type</th>
            <th>Ticket #</th>
            <th>Customer's Name</th>
            <th>Location/Destination</th>
            <th>Action</th>
            <th></th>
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
              <a
                href="javascript:void(0);"
                @click="viewRidersInfo(item[0].tag_riders)"
                ><i class="fa fa-eye" title="View Rider's Info"></i
              ></a>
            </td>
            <td v-if="item[0].tag_riders.length > 1">
              <select class="custom-select">
                <option
                  v-for="(rIds, rId) in item[0].tag_riders"
                  :key="rId"
                  value=""
                  >{{ riderDetail(rIds).riderName }}</option
                >
              </select>
            </td>
            <td v-else>
              <span class="font-weight-bold text-dark">{{
                riderDetail(item[0].tag_riders[0]).riderName
              }}</span>
            </td>
            <td v-if="item[0].tag_riders.length > 1">
              <select class="custom-select">
                <option
                  v-for="(rIds, rId) in item[0].tag_riders"
                  :key="rId"
                  value=""
                  >{{ rIds.rider_detail.vehicle.transpo_name }}</option
                >
              </select>
            </td>
            <td v-else>
              <span class="font-weight-bold text-dark">{{
                item[0].tag_riders[0].rider_detail.vehicle.transpo_name
              }}</span>
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
            <td>
              <span class="font-weight-bold text-dark">{{
                customerDetails(item).address
              }}</span>
            </td>
            <td>
              <button
                v-if="
                  item[0].trans_status === 0 &&
                    item[0].tag_status !== 0 &&
                    item[0].tag_riders.length > 1 &&
                    item[0].customer_order_detail.last_tenant === 1
                "
                class="btn btn-bordered-warning btn-sm waves-effect waves-light btn-block"
                @click="
                  updateCustomerTender(
                    ticket,
                    item[0].tag_riders_id,
                    item[0].tag_riders.length
                  )
                "
              >
                Tag for In Transit
              </button>
              <button
                v-else-if="
                  item[0].trans_status === 0 && item[0].tag_status !== 0
                "
                class="btn btn-bordered-warning btn-sm waves-effect waves-light btn-block"
                @click="tagForInTransit(ticket, item[0].tag_riders_id)"
              >
                Tag for In Transit
              </button>
              <button
                v-else
                class="btn  btn-bordered-warning btn-sm waves-effect waves-light btn-block"
                disabled
              >
                In Transit
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
              <span v-if="orderTimeFrame(item).intransit.timestamp">
                {{ orderTimeFrame(item).intransit.timestamp | dateTimeFormat }}
                / {{ orderTimeFrame(item).intransit.consumed }}
              </span>
              <span v-else>-/--/----, -:-- --</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      id="modal-update-bill"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <edit-customer-bill :orderDetails="infos" :vehicle_list="vehicle_list" />
    </div>
    <!-- /.modal -->

    <div
      id="modal-rider-detail"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <view-rider-detail :riderDetails="rider_infos" />
    </div>
    <!-- /.modal -->
  </div>
</template>
<script>
import EditCustomerBill from './EditCustomerBillComponent.vue'
import ViewRiderDetail from './ViewRiderDetailComponent.vue'

export default {
  name: 'ForPickUpComponent',
  components: {
    EditCustomerBill,
    ViewRiderDetail
  },
  data() {
    return {
      table_data: [],
      table: {},
      infos: {},
      rider_infos: {},
      vehicle_list: []
    }
  },
  computed: {
    getList() {
      // if(Object.keys(this.table_data).length){
      //     loadData();
      // }
      return this.table_data
    }
  },
  methods: {
    fetchForPickingList() {
      axios.get('/pickup/fetch_for_pickup_list').then(response => {
        this.table_data = response.data

        var this_data = this
        setTimeout(function() {
          this_data.table = $('#dt-pickup-list').DataTable({
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
                targets: [8],
                className: 'text-center',
                orderable: false,
                width: '15%'
              },
              {
                targets: [9, 10, 11, 12],
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

          $('#dt-pickup-list tbody').on(
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
    customerDetails(order) {
      let customerName = null,
        mobileNo = null,
        telephoneNo = null,
        address = null,
        orderPlatform = null,
        ticket_id = null

      for (const bu in order) {
        var complete_address =
          order[bu].customer_delivery_info.complete_address + ','
        if (
          order[bu].customer_delivery_info.complete_address == null ||
          order[bu].customer_delivery_info.complete_address == ''
        ) {
          complete_address = ''
        }

        customerName = `${order[bu].customer_delivery_info.lastname}, ${order[bu].customer_delivery_info.firstname}`
        orderPlatform = order[bu].ticket.type
        mobileNo = order[bu].customer_delivery_info.mobile_number
        telephoneNo = order[bu].customer_delivery_info.telephone_number
        address = `${complete_address} ${order[bu].customer_delivery_info.street_purok}, ${order[bu].customer_delivery_info.barangay.brgy_name}, ${order[bu].customer_delivery_info.barangay.town.town_name}, ${order[bu].customer_delivery_info.barangay.town.prov_name}`
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

      riderName = `${data.rider_detail.r_lastname}, ${data.rider_detail.r_firstname}`

      return {
        riderName
      }
    },
    priceDetail(data) {
      let totalPrice = 0

      data.forEach(order => {
        // totalPrice += parseFloat(order.total_price);
        if (order.canceled_status === 0 && order.status === 1) {
          if (parseInt(order.qty) > parseInt(order.quantity)) {
          } else {
            totalPrice += parseFloat(order.total_price)
          }
        }
      })

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

      return {
        orderSubmitted,
        preparation,
        picking,
        intransit
      }
    },
    tagForInTransit(ticket_id, id) {
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
            ticket_id: ticket_id,
            id: id
          }

          axios
            .post('/pickup/tag_for_in_transit', this.params)
            .then(({ data, status }) => {
              const { message } = data

              Swal.fire({
                type: 'success',
                title: 'Success',
                text: message
              }).then(result => {
                this.table.clear().destroy()
                this.table_data = []
                this.fetchForPickingList()

                var this_data = this
                $('#dt-pickup-list tbody').on(
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
              })
            })
        }
      })
    },
    async updateCustomerTender(ticket_id, id, no_rider) {
      this.infos = {
        ticket_id: ticket_id,
        tag_riders_id: id,
        no_rider: no_rider
      }

      const { data } = await axios.get(`vehicle/count_rider/${ticket_id}`)
      this.vehicle_list = data

      $('div#modal-update-bill').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    viewRidersInfo(riders_details) {
      this.rider_infos = {
        riders_details: riders_details
      }

      $('div#modal-rider-detail').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    }
  },
  mounted() {
    this.fetchForPickingList()
  }
}

function loadData() {}

function format(d) {
  // `d` is the original data object for the row
  return (
    '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
    '<tr>' +
    '<td><span class="font-weight-bold">Order Submitted:</span></td>' +
    '<td><span class="text-danger">(Submitted Order by Tenant)</span></td>' +
    '<td>' +
    d[9] +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<td><span class="font-weight-bold">Food Preparation / Time Consumed:</span></td>' +
    '<td><span class="text-danger">(Order Submission -> For Pick-up Tagging)</span></td>' +
    '<td>' +
    d[10] +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<td><span class="font-weight-bold">Picking Assignment / Time Consumed:</span></td>' +
    '<td><span class="text-danger">(For Pick-up Tagging -> Rider To Setup)</span></td>' +
    '<td>' +
    d[11] +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<td><span class="font-weight-bold">Order Claiming / Time Consumed:</span></td>' +
    '<td><span class="text-danger">(Rider To Setup -> In Transit Taggging by Tenant)</span></td>' +
    '<td>' +
    d[12] +
    '</td>' +
    '</tr>' +
    '</table>'
  )
}
</script>
