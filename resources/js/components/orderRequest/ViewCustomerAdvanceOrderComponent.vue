<!-- @format -->

<template>
  <div class="custom-container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item">
                <a href="javascript: void(0);">Advance Order</a>
              </li>
              <li class="breadcrumb-item active">Customer Monitoring</li>
            </ol>
          </div>
          <h4 class="page-title">Customer Monitoring</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-lg-12">
        <div class="card-box">
          <div class="row">
            <div class="col-lg-6">
              <h4 class="header-title">Orders of {{ customerName }}</h4>
            </div>
            <div class="col-lg-6">
              <router-link
                :to="{ path: '/advance_order' }"
                replace
                class="btn btn-sm btn-bordered-warning waves-effect waves-light float-right"
              >
                <i class="remixicon-arrow-left-circle-line"></i> Back
              </router-link>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-lg-12">
              <table class="table table-bordered" width="100%">
                <thead>
                  <tr>
                    <td width="25%" class="font-weight-bold">
                      Customer Details
                    </td>
                    <td width="75%" class="font-weight-bold">Order Details</td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(order, ticket, ticketIndex) in customerOrders"
                    :key="ticketIndex"
                  >
                    <td>
                      <div class="row">
                        <div class="col-md-12">
                          <table class="table table-sm">
                            <tbody>
                              <tr>
                                <td class="font-weight-normal">
                                  Ticket ID:
                                  <i>{{ customerDetails(order).ticket_id }}</i>
                                </td>
                              </tr>
                              <tr>
                                <td class="font-weight-normal">
                                  Customer Name:
                                  <i>{{
                                    customerDetails(order).customerName
                                  }}</i>
                                </td>
                              </tr>
                              <tr>
                                <td class="font-weight-normal">
                                  Mobile No:
                                  <i>{{ customerDetails(order).mobileNo }}</i>
                                </td>
                              </tr>
                              <tr>
                                <td class="font-weight-normal">
                                  Telephone No:
                                  <i
                                    ><span
                                      v-if="
                                        customerDetails(order).telephoneNo !==
                                          null
                                      "
                                      >{{
                                        customerDetails(order).telephoneNo
                                      }}</span
                                    ><span v-else>N/A</span></i
                                  >
                                </td>
                              </tr>
                              <tr>
                                <td class="font-weight-normal">
                                  Address:
                                  <i>{{ customerDetails(order).address }}</i>
                                </td>
                              </tr>
                              <tr>
                                <td class="font-weight-normal">
                                  Date Order:
                                  <i>{{
                                    customerDetails(order).dateOrdered
                                      | dateTimeFormat
                                  }}</i>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  v-if="
                                    customerDetails(order).orderPlatform === 1
                                  "
                                  class="font-weight-normal"
                                >
                                  Order From:
                                  <i class="remixicon-phone-line"></i
                                  ><i>Tele-Ordering</i>
                                </td>
                                <td
                                  v-else-if="
                                    customerDetails(order).orderPlatform === 3
                                  "
                                  class="font-weight-normal"
                                >
                                  Order From:
                                  <i class="remixicon-computer-line"></i
                                  ><i>Web Application</i>
                                </td>
                                <td v-else class="font-weight-normal">
                                  Order From:
                                  <i class="remixicon-smartphone-line"></i
                                  ><i>Mobile Application</i>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <hr />
                          <div class="form-group">
                            <label for="">Schedule Date</label>
                            <select
                              class="form-control"
                              v-model="deliverySchedule.date"
                              disabled
                            >
                              <option
                                v-for="(ds, index) in deliverySchedules"
                                :key="index"
                                :value="ds.date"
                                >{{ ds.date | moment }}</option
                              >
                            </select>
                          </div>
                          <div class="form-group">
                            <label for="">Schedule Time</label>
                            <input
                              type="time"
                              class="form-control"
                              v-model="deliverySchedule.time"
                              :min="deliverySchedule.time"
                              :max="deliverySchedules[0].time_to"
                              readonly
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="row">
                        <div class="col-md-12">
                          <div style="table-responsive">
                            <table class="table table-sm table-hover">
                              <thead>
                                <tr>
                                  <th><center>Image</center></th>
                                  <th style="white-space: nowrap;">
                                    Product Name
                                  </th>
                                  <th
                                    style="white-space: nowrap;"
                                    align="right"
                                  >
                                    Unit Price
                                  </th>
                                  <th>Qty.</th>
                                  <th
                                    style="white-space: nowrap;"
                                    align="right"
                                  >
                                    Total Price
                                  </th>
                                  <th>Availability</th>
                                  <th style="white-space: nowrap;">
                                    <center>Item Served</center>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(g, i) in order" :key="i">
                                  <td align="center">
                                    <img
                                      class="rounded-circle"
                                      height="66"
                                      width="70"
                                      :src="'/storage/' + g.image"
                                      :alt="g.product_name"
                                    />
                                  </td>
                                  <td>
                                    <dt
                                      v-if="
                                        productDetails(g).unit_measure !== null
                                      "
                                      style="font-size: 12px;"
                                    >
                                      {{
                                        productDetails(g).unit_measure +
                                          ' ' +
                                          g.product_name
                                      }}
                                    </dt>
                                    <dt v-else style="font-size: 12px;">
                                      {{ g.product_name }}
                                    </dt>

                                    <dd
                                      v-if="g.product_suggestion.length > 0"
                                      style="font-size: 10px;"
                                    >
                                      <div
                                        v-for="(s, i) in g.product_suggestion"
                                        :key="'suggestion' + i"
                                      >
                                        <span
                                          >+
                                          <span class="text-danger"
                                            >{{
                                              s.suggestion.suggestion
                                            }}
                                            :</span
                                          >
                                          {{
                                            s.item_suggested.description
                                          }}</span
                                        >
                                        <span
                                          v-if="s.addon_price !== '0.00'"
                                          class="float-right"
                                          >₱ {{ s.addon_price }}</span
                                        >
                                      </div>
                                    </dd>
                                    <dd
                                      style="font-size: 10px;"
                                      v-for="(pc, i) in g.product_choices"
                                      :key="'choice' + i"
                                    >
                                      <div>
                                        <span v-if="pc.product_details != null"
                                          >+
                                          <span v-if="pc.uom_id !== null"
                                            >{{
                                              pc.unit_measure.unit_measure
                                            }} </span
                                          >{{
                                            pc.product_details.product_name
                                          }}</span
                                        >
                                        <span
                                          v-if="pc.addon_price !== '0.00'"
                                          class="float-right"
                                          >₱ {{ pc.addon_price }}</span
                                        >
                                      </div>
                                    </dd>
                                    <dd
                                      style="font-size: 10px;"
                                      v-for="(pa, i) in g.product_addons"
                                      :key="'addon' + i"
                                    >
                                      <div>
                                        <span v-if="pa.product_details != null"
                                          >+
                                          <span v-if="pa.uom_id !== null"
                                            >{{
                                              pa.unit_measure.unit_measure
                                            }} </span
                                          >{{
                                            pa.product_details.product_name
                                          }}</span
                                        >
                                        <span
                                          v-if="pa.addon_price !== '0.00'"
                                          class="float-right"
                                          >₱ {{ pa.addon_price }}</span
                                        >
                                      </div>
                                    </dd>
                                  </td>
                                  <td>
                                    ₱
                                    {{
                                      parseFloat(g.product_price) | numberFormat
                                    }}
                                  </td>
                                  <td>{{ g.quantity }}</td>
                                  <td>
                                    ₱
                                    {{
                                      parseFloat(g.total_price) | numberFormat
                                    }}
                                  </td>
                                  <td align="center">
                                    <div class="custom-control custom-switch">
                                      <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        :id="'onoffswitch' + i"
                                        :checked="
                                          g.status === 1 &&
                                            productDetails(g).available === 1 &&
                                            disabledItem(
                                              g.quantity,
                                              productDetails(g).stocks
                                            )
                                        "
                                        disabled
                                      />
                                      <label
                                        class="custom-control-label"
                                        :for="'onoffswitch' + i"
                                      ></label>
                                    </div>
                                  </td>
                                  <td align="center">
                                    <span
                                      v-if="productDetails(g).stocks === null"
                                      class="badge badge-light-success"
                                      >no limit</span
                                    >
                                    <span
                                      v-if="productDetails(g).stocks === 0"
                                      class="badge badge-light-danger"
                                      >out of stock</span
                                    >
                                    <span v-else>{{
                                      productDetails(g).stocks
                                    }}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-5">
                          <div class="form-group">
                            <label for="text-1">Unfound Items</label>
                            <textarea
                              name=""
                              id="text-1"
                              cols="30"
                              rows="3"
                              class="form-control"
                              :value="orderSummary(order).customerRemarks"
                              readonly
                            ></textarea>
                          </div>
                          <div class="form-group">
                            <label for="text-2">Special Instructions</label>
                            <textarea
                              name=""
                              id="text-2"
                              cols="30"
                              rows="3"
                              class="form-control"
                              :value="orderSummary(order).customerOrderRemarks"
                              readonly
                            ></textarea>
                          </div>
                        </div>
                        <div class="col-md-7">
                          <table class="table table-sm" width="100%">
                            <thead>
                              <tr>
                                <th colspan="2" class="font-weight-bold">
                                  {{ customerDetails(order).tenantName }} Order
                                  Summary
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td width="75%">No of Item:</td>
                                <td align="right" width="25%">
                                  {{ orderSummary(order).totalItems }}
                                </td>
                              </tr>
                              <tr>
                                <td>Total Quantity:</td>
                                <td align="right">
                                  {{ orderSummary(order).totalQuantity }}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  {{ customerDetails(order).tenantName }} Total
                                  Amt. Purchase:
                                  <br />
                                  <!-- <span v-if="orderSummary(order).totalPrice < 300" class="badge badge-danger">Does not reach minimum order</span>
                                                                    <span v-else class="badge badge-success">Minimum order reached</span> -->
                                </td>
                                <td align="right">
                                  ₱
                                  {{
                                    orderSummary(order).totalPrice
                                      | numberFormat
                                  }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </div>
  <!-- end container -->
</template>
<script>
export default {
  name: 'ViewCustomerAdvanceOrderComponent',
  props: {
    ticketId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      customerOrders: [],
      otherTenantOrder: [],
      customerName: null,
      isChecked: null,
      product_id: null,
      order_id: null,
      productItem: [],
      CQProductItem: [],
      orderDetails: [],
      params: {},
      inventory: [],
      changeQuantity_ids: [],
      returnButton: true,
      totalPrice: 0,
      otherTotalPrice: 0,
      delivery_fee: 0,
      tender: 0,
      customer_tender: 0,
      change: 0,
      mop: 0,
      productIds: [],
      qtyIds: [],
      deliverySchedule: {
        date: null,
        time: null
      },
      clickSubmit: false,
      deliverySchedules: []
    }
  },
  methods: {
    async retrieveCustomerOrders() {
      const { data } = await axios.get(`/order/customer/${this.ticketId}`)

      this.customerOrders = data.tenant_order
      this.otherTenantOrder = data.other_tenant_order
      this.deliverySchedules = data.deliverySchedules
      this.customerTender(data.tenant_order)
      this.calculateInventory(data.tenant_order)
      this.getTenantPrice(data.other_tenant_order)

      for (const delivery in data.tenant_order) {
        this.deliverySchedule.date = data.tenant_order[
          delivery
        ][0].pickup_at.split(' ')[0]
        this.deliverySchedule.time =
          data.tenant_order[delivery][0].pickup_at.split(' ')[1] == '00:00:00'
            ? null
            : data.tenant_order[delivery][0].pickup_at.split(' ')[1]
        break
      }
      if (this.customerOrders.length === 0) {
        location.replace('/order_request')
      }
    },
    getTenantPrice(data) {
      var totalPrice = 0
      for (const tenant in data) {
        var price = 0
        for (const key in data[tenant]) {
          if (
            data[tenant][key].canceled_status === 0 &&
            data[tenant][key].status === 1
          ) {
            price += parseFloat(data[tenant][key].total_price)
          }
        }
        totalPrice += parseFloat(price)
      }
      this.otherTotalPrice = totalPrice
    },
    customerDetails(order) {
      let customerName = null,
        mobileNo = null,
        telephoneNo = null,
        address = null,
        dateOrdered = null,
        orderPlatform = null,
        tenantName = null,
        ticket_id = null

      for (const bu in order) {
        let complete_address =
          order[bu].customer_delivery_info.complete_address + ','
        if (
          order[bu].customer_delivery_info.complete_address == null ||
          order[bu].customer_delivery_info.complete_address == ''
        ) {
          complete_address = ''
        }

        customerName = `${order[bu].customer_delivery_info.lastname}, ${order[bu].customer_delivery_info.firstname}`
        tenantName = order[bu].praduct.tenant.tenant
        orderPlatform = order[bu].ticket.type
        mobileNo = order[bu].customer_delivery_info.mobile_number
        telephoneNo = order[bu].customer_delivery_info.telephone_number
        address = `${complete_address} ${order[bu].customer_delivery_info.street_purok}, ${order[bu].customer_delivery_info.barangay.brgy_name}, ${order[bu].customer_delivery_info.barangay.town.town_name}, ${order[bu].customer_delivery_info.barangay.town.prov_name}`
        dateOrdered = order[bu].submitted_at
        ticket_id = order[bu].ticket.ticket
        break
      }

      this.customerName = customerName

      return {
        customerName,
        mobileNo,
        telephoneNo,
        address,
        dateOrdered,
        orderPlatform,
        tenantName,
        ticket_id
      }
    },
    customerTender(data) {
      var tender = 0
      for (const bu in data) {
        tender = parseFloat(data[bu][0].customer_tender.amount)
        break
      }

      this.tender = tender
    },
    calculateInventory(data) {
      this.inventory = []
      this.changeQuantity_ids = []
      this.productIds = []
      this.qtyIds = []
      var inventory = 0

      for (const item in data) {
        for (let i = 0; i < data[item].length; i++) {
          if (data[item][i].canceled_status === 0) {
            this.productIds.push(data[item][i].product_id)
            this.qtyIds.push(data[item][i].qty)
          }

          if (data[item][i].quantity !== '' && data[item][i].quantity !== '0') {
            inventory =
              parseInt(data[item][i].quantity) - parseInt(data[item][i].qty)

            this.inventory.push(inventory)
            this.changeQuantity_ids.push(data[item][i].product_id)
          }
        }
      }
    },
    disabledItem(qty, quantity) {
      var status = true
      var qty = parseInt(qty)
      var quantity = parseInt(quantity)
      if (isNaN(quantity)) {
        status = true
      } else {
        if (qty > quantity) {
          status = false
        } else {
          status = true
        }
      }

      return status
    },
    orderSummary(data) {
      let customerRemarks = '',
        customerOrderRemarks = '',
        totalItems = 0,
        totalQuantity = 0,
        totalPrice = 0,
        delivery_charge = 0,
        minimumOrder = 0

      if (data[0].order_remarks === null) {
        customerRemarks = ''
      } else {
        customerRemarks = data[0].order_remarks.remarks
      }

      if (data[0].customer_order_remarks === null) {
        customerOrderRemarks = ''
      } else {
        customerOrderRemarks = data[0].customer_order_remarks.instructions
      }

      delivery_charge = data[0].customer_tender.delivery_charge
      minimumOrder =
        parseFloat(
          data[0].customer_delivery_info.barangay.town.delivery_charge
            .customer_to_pay
        ) -
        parseFloat(
          data[0].customer_delivery_info.barangay.town.delivery_charge
            .charge_amt
        )
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
            totalQuantity += parseInt(order.quantity)
            totalItems++
          }
        }
      })

      this.totalPrice = totalPrice
      this.delivery_fee = delivery_charge
      // this.tender = tender;

      return {
        customerRemarks,
        customerOrderRemarks,
        totalItems,
        totalQuantity,
        totalPrice,
        minimumOrder,
        // tender,
        // change,
        delivery_charge
      }
    },
    productDetails(data) {
      let id = null,
        unit_measure = null,
        stocks = null,
        available = 0

      for (const order in data.product_prices) {
        if (data.uom_id != null) {
          if (data.product_prices[order].uom_id == data.uom_id) {
            id = data.product_prices[order].id
            unit_measure = data.product_prices[order].unit_measure.unit_measure
            stocks = data.product_prices[order].stocks
            available = data.product_prices[order].available
          }
        } else {
          id = data.product_prices[order].id
          unit_measure = null
          stocks = data.product_prices[order].stocks
          available = data.product_prices[order].available
        }
      }

      return {
        id,
        unit_measure,
        stocks,
        available
      }
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format('MMM DD, YYYY')
    },
    momentTime: function(date) {
      return moment(date).format('h:mm A')
    }
  },
  mounted() {
    this.retrieveCustomerOrders()
  }
}
</script>
<style>
.custom-container-fluid {
  max-width: 100%;
}
button.spanHover:hover {
  color: #fff;
}
</style>
