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
                <a href="javascript: void(0);">Order Request</a>
              </li>
              <li v-if="mode_payment === '0'" class="breadcrumb-item">
                <a href="javascript: void(0);">Delivery</a>
              </li>
              <li v-else class="breadcrumb-item">
                <a href="javascript: void(0);">Pick Up</a>
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
                v-if="mode_payment === '0'"
                :to="{ path: '/order_request' }"
                replace
                class="btn btn-sm btn-bordered-warning waves-effect waves-light float-right"
              >
                <i class="remixicon-arrow-left-circle-line"></i> Back
              </router-link>
              <router-link
                v-else
                :to="{ path: '/pickup_order' }"
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
              <div class="table-responsive">
                <table class="table table-bordered" width="100%">
                  <thead>
                    <tr>
                      <td width="25%" class="font-weight-bold">
                        Customer Details
                      </td>
                      <td width="75%" class="font-weight-bold">
                        Order Details
                      </td>
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
                            <ul class="nav nav-pills navtab-bg nav-justified">
                              <li class="nav-item">
                                <a
                                  href="#recipient"
                                  data-toggle="tab"
                                  aria-expanded="false"
                                  class="nav-link active"
                                >
                                  <span class="d-inline-block d-sm-none"
                                    ><i class="fas fa-home"></i
                                  ></span>
                                  <span class="d-none d-sm-inline-block"
                                    >Recipient</span
                                  >
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  href="#customer1"
                                  data-toggle="tab"
                                  aria-expanded="true"
                                  class="nav-link"
                                >
                                  <span class="d-inline-block d-sm-none"
                                    ><i class="far fa-user"></i
                                  ></span>
                                  <span class="d-none d-sm-inline-block"
                                    >Customer</span
                                  >
                                </a>
                              </li>
                            </ul>
                            <div class="tab-content">
                              <div
                                class="tab-pane fade show active"
                                id="recipient"
                              >
                                <table class="table table-sm">
                                  <tbody>
                                    <tr>
                                      <td class="font-weight-normal">
                                        Customer Recipient:
                                        <i>{{
                                          customerDetails(order).customerName
                                        }}</i>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="font-weight-normal">
                                        Mobile No:
                                        <i>{{
                                          customerDetails(order).mobileNo
                                        }}</i>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="font-weight-normal">
                                        Telephone No:
                                        <i>
                                          <span
                                            v-if="
                                              customerDetails(order)
                                                .telephoneNo !== null
                                            "
                                            >{{
                                              customerDetails(order).telephoneNo
                                            }}</span
                                          >
                                          <span v-else>N/A</span>
                                        </i>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="font-weight-normal">
                                        Address:
                                        <i>{{
                                          customerDetails(order).address
                                        }}</i>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="font-weight-normal">
                                        Nearest Landmark:
                                        <i>{{
                                          customerDetails(order).land_mark
                                        }}</i>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div class="tab-pane fade" id="customer1">
                                <table class="table table-sm">
                                  <tbody>
                                    <tr>
                                      <td class="font-weight-normal">
                                        Customer Name:
                                        <i>{{ recipient }}</i>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="font-weight-normal">
                                        Mobile No:
                                        <ul
                                          v-for="(n,
                                          index1) in recipient_numbers"
                                          :key="index1"
                                        >
                                          <li v-if="n.in_use === 1">
                                            {{ n.mobile_number }}
                                            <span class="badge badge-success"
                                              >Primary</span
                                            >
                                          </li>
                                        </ul>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="font-weight-normal">
                                        Telephone No:
                                        <i>
                                          {{ recipient_phone }}
                                        </i>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="font-weight-normal">
                                        Address:
                                        <i>{{ recipient_address }}</i>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="font-weight-normal">
                                        Nearest Landmark:
                                        <i>{{ recipient_landmark }}</i>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <table class="table table-sm">
                              <tbody>
                                <tr>
                                  <td class="font-weight-normal">
                                    Ticket ID:
                                    <i>{{
                                      customerDetails(order).ticket_id
                                    }}</i>
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
                                    <i class="remixicon-phone-line"></i>
                                    <i>Tele-Ordering</i>
                                  </td>
                                  <td
                                    v-else-if="
                                      customerDetails(order).orderPlatform === 3
                                    "
                                    class="font-weight-normal"
                                  >
                                    Order From:
                                    <i class="remixicon-computer-line"></i>
                                    <i>Web Application</i>
                                  </td>
                                  <td v-else class="font-weight-normal">
                                    Order From:
                                    <i class="remixicon-smartphone-line"></i>
                                    <i>Mobile Application</i>
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
                              <input
                                type="text"
                                class="form-control form-control-sm"
                                :value="date | moment"
                                readonly
                              />
                            </div>
                            <div class="form-group">
                              <label for="">Schedule Time</label>
                              <input
                                v-if="getTimePickup === '0:0:0'"
                                type="text"
                                class="form-control form-control-sm"
                                readonly
                              />
                              <input
                                v-else
                                type="text"
                                class="form-control form-control-sm"
                                :value="timePicker | momentTime"
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
                                    <th>Status</th>
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
                                        v-if="g.uom_id !== null"
                                        style="font-size: 12px;"
                                      >
                                        {{
                                          g.unit_measure.unit_measure +
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
                                          <span
                                            v-if="pc.product_details != null"
                                            >+
                                            <span v-if="pc.uom_id !== null">{{
                                              pc.unit_measure.unit_measure
                                            }}</span>
                                            {{
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
                                          <span
                                            v-if="pa.product_details != null"
                                            >+
                                            <span v-if="pa.uom_id !== null">{{
                                              pa.unit_measure.unit_measure
                                            }}</span>
                                            {{
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
                                      ₱ {{ g.product_price | numberFormat }}
                                    </td>
                                    <td>{{ g.quantity_purchase }}</td>
                                    <td>
                                      ₱ {{ g.total_price | numberFormat }}
                                    </td>
                                    <td align="center">
                                      <div class="custom-control custom-switch">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          :id="'onoffswitch' + i"
                                          :checked="
                                            g.status === 1 &&
                                              g.product_availability === 1 &&
                                              disabledItem(
                                                g.quantity_purchase,
                                                g.product_quantity
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
                                    <td>
                                      <span
                                        v-if="g.product_quantity == null"
                                        class="badge badge-light-success"
                                        >no limit</span
                                      >
                                      <span
                                        v-if="g.product_quantity == 0"
                                        class="badge badge-light-danger"
                                        >out of stock</span
                                      >
                                      <span v-else>{{
                                        g.product_quantity
                                      }}</span>
                                    </td>
                                    <td>
                                      <span
                                        v-if="g.cancelled_status === 1"
                                        class="badge badge-light-danger"
                                        >Cancelled</span
                                      >
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
                                :value="
                                  orderSummary(order).customerOrderRemarks
                                "
                                readonly
                              ></textarea>
                            </div>
                          </div>
                          <div class="col-md-7">
                            <table class="table table-sm" width="100%">
                              <thead>
                                <tr>
                                  <th colspan="2" class="font-weight-bold">
                                    {{ customerDetails(order).tenantName }}
                                    Order Summary
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
                                <tr v-if="mode_payment === '0'">
                                  <td>
                                    {{ customerDetails(order).tenantName }}
                                    Minimum Order:
                                  </td>
                                  <td align="right">
                                    ₱
                                    {{
                                      orderSummary(order).minimumOrder
                                        | numberFormat
                                    }}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {{ customerDetails(order).tenantName }}
                                    Total Amt. Purchase:
                                    <br />
                                    <span
                                      v-if="
                                        orderSummary(order).totalPrice === 0
                                      "
                                      class="badge badge-danger"
                                      >Cancelled</span
                                    >
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
                            <table
                              class="table table-sm"
                              width="100%"
                              v-if="Object.keys(otherTenantOrder).length > 0"
                            >
                              <tbody>
                                <tr
                                  v-for="(item, index) in otherTenantOrder"
                                  :key="index"
                                >
                                  <td width="75%">
                                    {{ otherDetails(item).tenantName }} Total
                                    Amt. Purchase:
                                    <span
                                      v-if="otherDetails(item).totalPrice === 0"
                                      class="badge badge-danger"
                                      >Cancelled</span
                                    >
                                  </td>
                                  <td align="right">
                                    ₱
                                    {{
                                      otherDetails(item).totalPrice
                                        | numberFormat
                                    }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="table table-sm" width="100%">
                              <tbody>
                                <tr
                                  v-for="(d, i) in discount_list"
                                  :key="'discountList_' + i"
                                >
                                  <template
                                    v-if="
                                      countApproved(
                                        order[0].customer_discounted_amt,
                                        d.id
                                      ) > 0
                                    "
                                  >
                                    <td width="75%">
                                      <div class="row">
                                        <div class="col-md-8">
                                          <span class="text-danger"
                                            >{{ d.discount_name }} Discount
                                            :</span
                                          >
                                        </div>
                                        <div class="col-md-4">
                                          <span>{{
                                            countApproved(
                                              order[0].customer_discounted_amt,
                                              d.id
                                            )
                                          }}</span>
                                        </div>
                                      </div>
                                    </td>
                                    <td align="right">
                                      <p class="text-danger">
                                        ₱
                                        {{
                                          discount(
                                            order[0].customer_discounted_amt,
                                            d.id
                                          )
                                        }}
                                      </p>
                                    </td>
                                  </template>
                                </tr>
                                <tr v-if="mode_payment === '0'">
                                  <td width="75%">Rider's Fee</td>
                                  <td align="right">
                                    ₱
                                    {{
                                      orderSummary(order).delivery_charge
                                        | numberFormat
                                    }}
                                  </td>
                                </tr>
                                <tr
                                  v-if="
                                    orderSummary(order).additional_charge === 1
                                  "
                                >
                                  <td>Additional Charge</td>
                                  <td align="right">
                                    ₱ {{ additional_charge }}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span class="text-danger">Grand Total</span>
                                  </td>
                                  <td align="right">
                                    <span class="text-danger"
                                      >₱
                                      {{
                                        computedTotalPrice | numberFormat
                                      }}</span
                                    >
                                  </td>
                                </tr>
                                <tr>
                                  <td>Customer Tender</td>
                                  <td align="right">
                                    ₱
                                    {{
                                      orderSummary(order).tender | numberFormat
                                    }}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Customer Change</td>
                                  <td align="right">
                                    ₱
                                    {{
                                      orderSummary(order).change | numberFormat
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
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </div>
  <!-- end container -->
</template>
<script>
import Vue from 'vue'
import { Form, HasError, AlertError } from 'vform'
import { serialize } from 'object-to-formdata'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

export default {
  props: {
    ticketId: {
      type: String,
      required: true
    },
    mop: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipient: null,
      recipient_address: null,
      recipient_numbers: [],
      recipient_phone: null,
      recepient_landmark: null,
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
      productIds: [],
      qtyIds: [],
      date: null,
      timePicker: null,
      isClickDate: false,
      isClickTime: false,
      clickSubmit: false,
      mode_payment: null,
      getTimePickup: null,
      customer_discount: [],
      discounted_amt: 0,
      additional_charge: 0
    }
  },
  computed: {
    computedTotalPrice: function() {
      // `this` points to the vm instance
      let delivery_fee = this.delivery_fee
      if (this.delivery_fee === null) {
        delivery_fee = 0
      }

      return (
        parseFloat(this.totalPrice) +
        parseFloat(this.otherTotalPrice) +
        parseFloat(delivery_fee) -
        parseFloat(this.discounted_amt)
      )
    },
    computedChange: function() {
      // `this` points to the vm instance

      change =
        parseFloat(this.tender) +
        parseFloat(this.discounted_amt) -
        (parseFloat(this.totalPrice) +
          parseFloat(this.otherTotalPrice) +
          parseFloat(this.delivery_fee))
      this.change = change
      return change
    }
  },
  methods: {
    recipientDetails(data) {
      this.recipient = data.recipient.name

      let complete_address = ''
      if (data.recipient_address.complete_address !== null) {
        complete_address = `${data.recipient_address.complete_address}, `
      }
      this.recipient_address = `${complete_address}${data.recipient_address.street_purok}, ${data.recipient_address.barangay.brgy_name}, ${data.recipient_address.barangay.town.town_name}, ${data.recipient_address.barangay.town.prov_name}`

      this.recipient_numbers = data.recipient_numbers
      this.recipient_phone = 'N/A'
      if (data.recipient_phones !== null) {
        this.recipient_phone = data.recipient_phones
      }
      this.recipient_landmark = data.recipient_address.land_mark
    },
    async retrieveCustomerOrders() {
      const { data } = await axios.get(
        `/order/customer_history/${this.ticketId}`
      )

      for (const key in data[0].tenant_order) {
        this.date = new Date(
          data[0].tenant_order[key][0].pickup_at
        ).toISOString()
        this.timePicker = new Date(
          data[0].tenant_order[key][0].pickup_at
        ).toISOString()

        var timePicker = new Date(data[0].tenant_order[key][0].pickup_at)
        this.getTimePickup =
          timePicker.getHours() +
          ':' +
          timePicker.getMinutes() +
          ':' +
          timePicker.getSeconds()
      }

      this.customerOrders = data[0].tenant_order
      this.otherTenantOrder = data[0].other_tenant_order
      this.discount_list = data[0].discount_list
      this.discountedAmount(data[0].tenant_order)
      this.getTenantPrice(data[0].other_tenant_order)
      this.customerTender(data[0].tenant_order)
      this.calculateInventory(data[0].tenant_order)
      this.recipientDetails(data[0].recipient)

      for (const charge in data[0].tenant_order) {
        if (data[0].tenant_order[charge][0].customer_order_detail !== null) {
          this.additional_charge = parseFloat(
            data[0].tenant_order[charge][0].customer_order_detail
              .additional_charge
          )
        }

        break
      }

      if (this.customerOrders.length === 0) {
        location.replace('/pickup_order')
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
        date = null,
        time = null,
        ticket_id = null,
        land_mark = null

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

        if (order[bu].customer_delivery_info.barangay === null) {
          address = `${order[bu].ticket.app_user.barangay.brgy_name}, ${order[bu].ticket.app_user.barangay.town_name}, ${order[bu].ticket.app_user.barangay.prov_name}`
        } else {
          address = `${complete_address} ${order[bu].customer_delivery_info.street_purok}, ${order[bu].customer_delivery_info.barangay.brgy_name}, ${order[bu].customer_delivery_info.barangay.town.town_name}, ${order[bu].customer_delivery_info.barangay.town.prov_name}`
        }

        dateOrdered = order[bu].submitted_at
        ticket_id = order[bu].ticket.ticket
        land_mark = order[bu].customer_delivery_info.land_mark
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
        date,
        time,
        ticket_id,
        land_mark
      }
    },
    customerTender(data) {
      let tender = 0,
        additional_charge = 0

      for (const bu in data) {
        tender = parseFloat(data[bu][0].customer_tender.amount)
        additional_charge = parseFloat(
          data[bu][0].customer_tender.additional_charge
        )
        break
      }

      this.tender = tender
      this.additional_charge = additional_charge
    },
    calculateInventory(data) {
      this.inventory = []
      this.changeQuantity_ids = []
      this.productIds = []
      this.qtyIds = []
      var inventory = 0
      for (const item in data) {
        for (let i = 0; i < data[item].length; i++) {
          if (data[item][i].cancelled_status === 0) {
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
    itemStatus(data) {
      let status = false
      for (const item in data) {
        if (data[item].status === 0 && data[item].cancelled_status === 1) {
          status = false
        } else if (data[item].status === 0) {
          status = true
          break
        } else if (
          data[item].quantity === '0' &&
          data[item].cancelled_status === 0
        ) {
          status = true
          break
        } else if (data[item].status === 1) {
          status = false
        } else if (parseInt(data[item].qty) > parseInt(data[item].quantity)) {
          status = true
          break
        } else {
          status = false
        }
      }
      return status
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
        tender = 0,
        change = 0,
        minimumOrder = 0,
        additional_charge = 0,
        checker = 0

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

      tender = data[0].customer_tender.amount
      change = data[0].customer_tender.change

      delivery_charge = data[0].customer_tender.delivery_charge
      // minimumOrder = data[0].praduct.tenant.minimum_order.min_order_amt

      if (
        data[0].customer_delivery_info.barangay.town.delivery_charge.length ===
        1
      ) {
        // delivery_charge =
        //   data[0].customer_delivery_info.barangay.town.delivery_charge[0]
        //     .charge_amt
        minimumOrder =
          parseFloat(
            data[0].customer_delivery_info.barangay.town.delivery_charge[0]
              .customer_to_pay
          ) -
          parseFloat(
            data[0].customer_delivery_info.barangay.town.delivery_charge[0]
              .charge_amt
          )
      } else {
        data[0].customer_delivery_info.barangay.town.delivery_charge.forEach(
          charge => {
            if (
              charge.brgy_id ===
                data[0].customer_delivery_info.barangay.brgy_id &&
              charge.town_id === data[0].customer_delivery_info.barangay.town_id
            ) {
              checker++
              // delivery_charge = charge.charge_amt
              minimumOrder =
                parseFloat(charge.customer_to_pay) -
                parseFloat(charge.charge_amt)
            }
          }
        )

        if (checker === 0) {
          // delivery_charge =
          //   data[0].customer_delivery_info.barangay.town.delivery_charge[0]
          //     .charge_amt
          minimumOrder =
            parseFloat(
              data[0].customer_delivery_info.barangay.town.delivery_charge[0]
                .customer_to_pay
            ) -
            parseFloat(
              data[0].customer_delivery_info.barangay.town.delivery_charge[0]
                .charge_amt
            )
        }
      }

      if (data[0].praduct.tenant.tenant_id === 25) {
        minimumOrder = 0
      }

      additional_charge = data[0].praduct.tenant.additional_charge

      data.forEach(order => {
        if (order.cancelled_status === 0 && order.status === 1) {
          if (
            parseInt(order.quantity_purchase) > parseInt(order.product_quantity)
          ) {
          } else {
            totalPrice += parseFloat(order.total_price)
            totalQuantity += order.quantity_purchase
            totalItems++
          }
        }
      })

      if (data[0].praduct.tenant.tenant_id === 25) {
        minimumOrder = 0
      }

      this.totalPrice = totalPrice
      this.delivery_fee = delivery_charge

      return {
        customerRemarks,
        customerOrderRemarks,
        totalItems,
        totalQuantity,
        totalPrice,
        minimumOrder,
        tender,
        change,
        delivery_charge,
        additional_charge
      }
    },
    otherDetails(data) {
      let tenantName = null,
        totalPrice = 0

      tenantName = data[0].praduct.tenant.tenant
      data.forEach(order => {
        if (order.canceled_status === 0 && order.status === 1) {
          totalPrice += parseFloat(order.total_price)
        }
      })

      // this.otherTotalPrice = totalPrice;

      return {
        tenantName,
        totalPrice
      }
    },
    cancelItem(id) {
      this.params = {
        id: id
      }

      //Warning Message
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!'
      }).then(result => {
        if (result.value) {
          axios
            .put('/order/cancel_item', this.params)
            .then(({ data, status }) => {
              const { message } = data

              Swal.fire({
                type: 'success',
                title: 'Success',
                text: message
              }).then(result => {
                this.retrieveCustomerOrders()
              })
            })
        }
      })
    },
    cancelTicket(ticket) {
      this.params = {
        ticket_id: ticket
      }

      //Warning Message
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!'
      }).then(result => {
        if (result.value) {
          axios
            .put('/order/cancel_ticket', this.params)
            .then(({ data, status }) => {
              const { message } = data

              Swal.fire({
                type: 'success',
                title: 'Success',
                text: message
              }).then(result => {
                location.replace('/pickup_order')
              })
            })
        }
      })
    },
    isCancelled(data) {
      let calcelled = true
      for (let index = 0; index < data.length; index++) {
        const cancel = data[index].cancelled_status

        if (cancel == 0) {
          calcelled = false
        }
      }

      return calcelled
    },
    isTagged(data) {
      let tagged = true
      for (let index = 0; index < data.length; index++) {
        const pickup = data[index].tag_status

        if (pickup == 0) {
          tagged = false
        }
      }

      return tagged
    },
    isPreparing(data) {
      let preparing = true
      for (let index = 0; index < data.length; index++) {
        const ispending = data[index].pending_status

        if (ispending == 1) {
          preparing = false
        }
      }

      return preparing
    },
    updateItemServe(product_id, quantity) {
      Swal.fire({
        title: 'Input available quantity:',
        type: 'question',
        input: 'number',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        allowOutsideClick: false
      }).then(
        function(number) {
          if ($.isNumeric(number.value) === true || number.value === '') {
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              allowOutsideClick: false,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, change it!'
            }).then(result => {
              if (result.value) {
                this.params = {
                  prod_id: product_id,
                  item_qty: number.value
                }

                axios
                  .put('/order/update_product_availability', this.params)
                  .then(({ data, status }) => {
                    const { message } = data
                    Swal.fire({
                      type: 'success',
                      title: 'Success',
                      text: message
                    }).then(result => {
                      this.retrieveCustomerOrders()
                    })
                  })
              }
            })
          }
        }.bind(this)
      )
    },
    checkAvailability(checkboxId, id, product_id, event) {
      if (event.target.checked) {
        this.isChecked = 1
      } else {
        this.isChecked = 0
      }

      if (this.isChecked == 0) {
        Swal.fire({
          title: 'Input available quantity:',
          type: 'question',
          input: 'number',
          showCancelButton: true,
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          allowOutsideClick: false
        }).then(
          function(number) {
            if ($.isNumeric(number.value) == true) {
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, change it!'
              }).then(result => {
                if (result.value) {
                  this.params = {
                    id: id,
                    prod_id: product_id,
                    status: this.isChecked,
                    item_qty: number.value
                  }

                  axios
                    .put('/order/update_product_availability', this.params)
                    .then(({ data, status }) => {
                      const { message } = data
                      Swal.fire({
                        type: 'success',
                        title: 'Success',
                        text: message
                      }).then(result => {
                        this.retrieveCustomerOrders()
                      })
                    })
                } else {
                  if (this.isChecked == 1) {
                    $('input#' + checkboxId).prop('checked', false)
                  } else {
                    $('input#' + checkboxId).prop('checked', true)
                  }
                }
              })
            } else {
              if (this.isChecked == 1) {
                $('input#' + checkboxId).prop('checked', false)
              } else {
                $('input#' + checkboxId).prop('checked', true)
              }
            }
          }.bind(this)
        )
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, change it!'
        }).then(result => {
          if (result.value) {
            this.params = {
              id: id,
              prod_id: product_id,
              status: this.isChecked,
              item_qty: ''
            }

            axios
              .put('/order/update_product_availability', this.params)
              .then(({ data, status }) => {
                const { message } = data
                Swal.fire({
                  type: 'success',
                  title: 'Success',
                  text: message
                }).then(result => {
                  this.retrieveCustomerOrders()
                })
              })
          } else {
            if (this.isChecked == 1) {
              $('input#' + checkboxId).prop('checked', false)
            } else {
              $('input#' + checkboxId).prop('checked', true)
            }
          }
        })
      }
    },
    changeQuantity(id, product_id) {
      this.order_id = id
      this.product_id = product_id

      this.CQProductItem = [
        {
          product_id: product_id,
          order_id: id
        }
      ]

      $('div#change-quantity').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    changeItem(id, product_id, price, qty, quantity) {
      this.productItem = [
        {
          product_id: product_id,
          order_id: id,
          price: price,
          quantity: qty,
          stocks: quantity,
          productIds: this.productIds,
          qtyIds: this.qtyIds
        }
      ]

      $('div#change-item').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    addItem(ticket, order) {
      let productIds = [],
        cancelled_status = []

      for (let index = 0; index < order.length; index++) {
        productIds.push(order[index].product_id)
        cancelled_status.push(order[index].cancelled_status)
      }

      this.orderDetails = [
        {
          ticket: ticket,
          productIds: productIds,
          cancelled_status: cancelled_status
        }
      ]

      $('div#add-order').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    submitOrder(ticket) {
      this.clickSubmit = true
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, submit it!'
      }).then(result => {
        this.clickSubmit = false
        if (result.value) {
          this.params = {
            ticket_id: ticket,
            inventory: this.inventory,
            changeQuantity_ids: this.changeQuantity_ids,
            tender: this.tender,
            change: this.change,
            datePickUp: this.date,
            timePickUp: this.timePicker
          }

          axios
            .put('/order/update_for_preparing', this.params)
            .then(({ data, status }) => {
              const { message } = data
              if (message === 'failure') {
                const { tenant } = data
                Swal.fire({
                  type: 'warning',
                  title: 'Warning',
                  text:
                    'Reviewed by ' + tenant + '. Please wait until it finished!'
                }).then(result => {
                  this.retrieveCustomerOrders()
                })
              } else {
                Swal.fire({
                  type: 'success',
                  title: 'Success',
                  text: message
                }).then(result => {
                  location.replace('/pickup_order')
                })
              }
            })
        }
      })
    },
    returnHome() {
      this.returnButton = false
    },
    firstEntry(ticket) {
      this.params = {
        ticket_id: ticket
      }

      axios.post('/order/first_entry', this.params).then(({ data, status }) => {
        const { message } = data

        if (message === 'failure') {
          const { tenant } = data
          Swal.fire({
            type: 'warning',
            title: 'Warning',
            text: 'Reviewed by ' + tenant + '. Please wait until it finished!'
          }).then(result => {
            this.retrieveCustomerOrders()
          })
        }
      })
    },
    countApproved(data, discount_id) {
      let count = 0

      for (const key in data) {
        if (data[key].discount_id === discount_id) {
          count = data[key].rider_no_approved
          break
        }
      }

      return count
    },
    discount(data, discount_id) {
      let discount = 0

      for (const key in data) {
        if (data[key].discount_id === discount_id) {
          discount = parseFloat(data[key].rider_discount)
          break
        }
      }

      return discount
    },
    discountedAmt(data) {
      let discounted_amt = 0

      for (const key in data) {
        discounted_amt += parseFloat(data[key].rider_discount)
      }

      return discounted_amt
    },
    discountedAmount(data) {
      let discount = 0

      for (const key in data) {
        const discounted_amt = data[key][0].customer_discounted_amt

        for (const i in discounted_amt) {
          discount += parseFloat(discounted_amt[i].rider_discount)
        }
        break
      }

      this.discounted_amt = discount
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
    this.mode_payment = atob(this.mop)
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
