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
              <li class="breadcrumb-item">
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
                v-if="returnButton"
                :to="{ name: 'pickup-order' }"
                class="btn btn-sm btn-bordered-warning waves-effect waves-light float-right"
              >
                <i class="remixicon-arrow-left-circle-line"></i> Back
              </router-link>
              <button
                v-else
                class="btn btn-sm btn-bordered-warning waves-effect waves-light float-right"
                disabled
              >
                <i class="remixicon-arrow-left-circle-line"></i> Back
              </button>
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
                                        v-for="(n, index1) in recipient_numbers"
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
                                  <i>{{ customerDetails(order).ticket_id }}</i>
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
                          <button
                            type="button"
                            class="btn btn-block btn-sm btn-bordered-warning waves-effect waves-light"
                            :disabled="
                              (order[0].customer_order_detail !== null &&
                                order[0].customer_order_detail
                                  .cancelled_status === 1) ||
                                dateCheck(order) ||
                                order[0].discount.length === 0
                            "
                            @click="
                              requestDiscount(
                                order[0].ticket_id,
                                order[0].ticket.type
                              )
                            "
                          >
                            Request Discount
                            <span class="badge badge-danger rounded-circle">{{
                              pendingDiscount(
                                order[0].discount,
                                order[0].customer_discount
                              )
                            }}</span>
                          </button>
                          <button
                            type="button"
                            class="btn btn-block btn-sm btn-bordered-warning waves-effect waves-light"
                            @click="cancelTicket(ticket)"
                            :disabled="
                              (order[0].customer_order_detail !== null &&
                                order[0].customer_order_detail
                                  .cancelled_status === 1) ||
                                dateCheck(order)
                            "
                          >
                            Cancel Ticket
                          </button>
                          <button
                            type="button"
                            class="btn btn-block btn-sm btn-bordered-warning waves-effect waves-light mt-1"
                            @click="addItem(ticket, order)"
                            :disabled="
                              (order[0].customer_order_detail !== null &&
                                order[0].customer_order_detail
                                  .cancelled_status === 1) ||
                                dateCheck(order)
                            "
                          >
                            Add Order
                          </button>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <hr />
                          <div class="form-group">
                            <label for>Schedule Date</label>
                            <button
                              class="btn spanHover badge"
                              :class="
                                isClickDate ? 'badge-warning' : 'badge-success'
                              "
                              style="cursor:pointer"
                              @click="isClickDate = false"
                              :disabled="isCancelled(order) || dateCheck(order)"
                            >
                              <i class="remixicon-quill-pen-line"></i> edit
                            </button>
                            <select
                              class="form-control"
                              v-model="deliverySchedule.date"
                              :disabled="isClickDate"
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
                            <label for>Schedule Time</label>
                            <button
                              class="btn spanHover badge"
                              :class="
                                isClickTime ? 'badge-warning' : 'badge-success'
                              "
                              style="cursor:pointer"
                              @click="isClickTime = false"
                              :disabled="isCancelled(order) || dateCheck(order)"
                            >
                              <i class="remixicon-quill-pen-line"></i> edit
                            </button>
                            <input
                              v-if="isClickTime"
                              :type="
                                deliverySchedule.time === null ? 'text' : 'time'
                              "
                              class="form-control"
                              :value="
                                deliverySchedule.time === null
                                  ? 'ASAP'
                                  : deliverySchedule.time
                              "
                              disabled
                            />
                            <input
                              v-else
                              type="time"
                              class="form-control"
                              v-model="deliverySchedule.time"
                              :min="deliverySchedule.time"
                              :max="deliverySchedules[0].time_to"
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
                                    Item Served
                                  </th>
                                  <th>Status</th>
                                  <th style="font-size:10px;">
                                    <center>Out of Stock</center>
                                  </th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(g, i) in order" :key="i">
                                  <td align="center">
                                    <template v-if="g.canceled_status === 0">
                                      <a
                                        href="javascript:void(0)"
                                        class="font-weight-light text-dark"
                                        style="cursor: pointer;"
                                        @click="
                                          viewProductDetails(
                                            g.id,
                                            g.product_id,
                                            $event,
                                            g.quantity,
                                            g.uom_id
                                          )
                                        "
                                      >
                                        <img
                                          class="rounded-circle"
                                          height="36"
                                          width="40"
                                          :src="'/storage/' + g.image"
                                          :alt="g.product_name"
                                          loading="lazy"
                                        />
                                      </a>
                                    </template>
                                    <template v-else>
                                      <img
                                        class="rounded-circle"
                                        height="36"
                                        width="40"
                                        :src="'/storage/' + g.image"
                                        :alt="g.product_name"
                                        loading="lazy"
                                      />
                                    </template>
                                  </td>
                                  <td>
                                    <template v-if="g.canceled_status === 0">
                                      <a
                                        href="javascript:void(0)"
                                        class="font-weight-light text-dark"
                                        style="cursor: pointer;"
                                        @click="
                                          viewProductDetails(
                                            g.id,
                                            g.product_id,
                                            $event,
                                            g.quantity,
                                            g.uom_id
                                          )
                                        "
                                      >
                                        <dt
                                          v-if="
                                            productDetails(g).unit_measure !==
                                              null
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
                                            v-for="(s,
                                            i) in g.product_suggestion"
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
                                            <span
                                              v-if="pa.product_details != null"
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
                                      </a>
                                    </template>
                                    <template v-else>
                                      <dt
                                        v-if="
                                          productDetails(g).unit_measure !==
                                            null
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
                                          <span
                                            v-if="pc.product_details != null"
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
                                          <span
                                            v-if="pa.product_details != null"
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
                                    </template>
                                  </td>
                                  <td style="white-space: nowrap;">
                                    <template
                                      v-if="
                                        g.no_specific_price === 1 &&
                                          g.canceled_status === 0
                                      "
                                    >
                                      <div
                                        :class="'edit-product-price-' + g.id"
                                      >
                                        <span class="text-dark"
                                          >₱
                                          {{
                                            parseFloat(g.product_price)
                                              | numberFormat
                                          }}</span
                                        >
                                        <span v-if="g.measurement > 0">
                                          ({{ g.measurement + ' grams' }})
                                        </span>
                                        <span
                                          style="cursor: pointer;"
                                          @click="
                                            editProductPrice(
                                              g.id,
                                              g.quantity,
                                              g.price_per_gram
                                            )
                                          "
                                        >
                                          <i
                                            class="remixicon-pencil-line text-primary"
                                          ></i>
                                        </span>
                                      </div>
                                      <div
                                        :class="'update-product-price-' + g.id"
                                        style="display:none;"
                                      >
                                        <input
                                          type="text"
                                          size="2"
                                          class="text-right"
                                          :class="'product_price_' + g.id"
                                          :value="g.product_price"
                                          @keyup.enter="
                                            updateProductPrice(g.id)
                                          "
                                        />
                                        <span
                                          style="cursor: pointer;"
                                          @click="updateProductPrice(g.id)"
                                        >
                                          &nbsp;<i
                                            class="remixicon-save-2-line text-primary"
                                          ></i>
                                        </span>
                                      </div>
                                    </template>
                                    <span
                                      v-else
                                      :class="{
                                        'text-dark': g.canceled_status === 0
                                      }"
                                      >₱
                                      {{
                                        parseFloat(g.product_price)
                                          | numberFormat
                                      }}</span
                                    >
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
                                      style="font-size:9px;"
                                      >no limit</span
                                    >
                                    <span
                                      v-if="productDetails(g).stocks === 0"
                                      class="badge badge-light-danger"
                                      style="font-size:9px;"
                                      >out of stock</span
                                    >
                                    <span v-else>{{
                                      productDetails(g).stocks
                                    }}</span>
                                    |
                                    <button
                                      class="btn spanHover badge badge-warning"
                                      @click="
                                        updateItemServe(productDetails(g).id)
                                      "
                                      style="cursor:pointer;font-size:9px;"
                                      :disabled="
                                        g.canceled_status === 1 ||
                                          g.tag_status === 1 ||
                                          g.pending_status === 0 ||
                                          dateCheck(order)
                                      "
                                    >
                                      edit
                                    </button>
                                  </td>
                                  <td>
                                    <span
                                      v-if="g.canceled_status === 1"
                                      class="badge badge-light-danger"
                                      style="font-size:9px;"
                                      >Cancelled</span
                                    >
                                  </td>
                                  <td align="center">
                                    <span
                                      v-if="g.icoos === 0"
                                      class="badge badge-light-danger"
                                      style="font-size:9px;"
                                      >Remove</span
                                    >
                                    <span
                                      v-else
                                      class="badge badge-light-danger"
                                      style="font-size:9px;"
                                      >Cancel Ticket</span
                                    >
                                  </td>
                                  <td
                                    align="center"
                                    style="white-space: nowrap;"
                                  >
                                    <button
                                      type="button"
                                      class="btn btn-block btn-sm btn-bordered-warning waves-effect waves-light"
                                      :disabled="
                                        g.canceled_status === 1 ||
                                          g.tag_status === 1 ||
                                          g.pending_status === 0 ||
                                          dateCheck(order)
                                      "
                                      @click="cancelItem(g.id)"
                                    >
                                      Cancel Item
                                    </button>
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
                                  <span
                                    v-if="orderSummary(order).totalPrice === 0"
                                    class="badge badge-danger"
                                    >Cancelled</span
                                  >
                                  <!-- <span v-else-if="orderSummary(order).totalPrice < 300" class="badge badge-danger">Does not reach minimum order</span>
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
                                  {{ otherDetails(item).tenantName }} Total Amt.
                                  Purchase:
                                  <span
                                    v-if="otherDetails(item).totalPrice === 0"
                                    class="badge badge-danger"
                                    >Cancelled</span
                                  >
                                </td>
                                <td align="right">
                                  ₱
                                  {{
                                    otherDetails(item).totalPrice | numberFormat
                                  }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="table table-sm" width="100%">
                            <tbody>
                              <template
                                v-if="
                                  order[0].customer_discounted_amt.length > 0 &&
                                    is_discounted === true
                                "
                              >
                                <tr
                                  v-for="(vdiscount, i) in order[0]
                                    .customer_discounted_amt"
                                  :key="'view_discounted_amt' + i"
                                >
                                  <td width="75%">
                                    <div class="row">
                                      <div class="col-md-8">
                                        <p class="text-danger">
                                          {{
                                            discount_type(vdiscount.discount_id)
                                          }}
                                          Discount :
                                        </p>
                                      </div>
                                      <div class="col-md-4">
                                        <p>
                                          {{ vdiscount.no_approved }}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td align="right">
                                    ₱ {{ vdiscount.discount | numberFormat }}
                                  </td>
                                </tr>
                              </template>
                              <template v-else>
                                <tr
                                  v-for="(d, i) in discount_list"
                                  :key="'discountList_' + i"
                                >
                                  <template
                                    v-if="
                                      countApproved(
                                        order[0].customer_discount,
                                        d.id
                                      ) > 0
                                    "
                                  >
                                    <td width="75%">
                                      <div class="row">
                                        <div class="col-md-8">
                                          <p class="text-danger">
                                            {{ d.discount_name }} Discount :
                                          </p>
                                        </div>
                                        <div class="col-md-4">
                                          <p>
                                            {{
                                              countApproved(
                                                order[0].customer_discount,
                                                d.id
                                              )
                                            }}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <input
                                        v-show="false"
                                        type="text"
                                        :id="'no_approved_' + d.id"
                                        :value="
                                          countApproved(
                                            order[0].customer_discount,
                                            d.id
                                          )
                                        "
                                      />
                                      <input
                                        type="text"
                                        class="form-control text-right"
                                        style="border-color: #f1556c;"
                                        :id="'discount_' + d.id"
                                        @keyup="
                                          discount(
                                            d.id,
                                            d.vat,
                                            d.discount_percent
                                          )
                                        "
                                      />
                                    </td>
                                  </template>
                                </tr>
                              </template>
                              <tr
                                v-if="
                                  orderSummary(order).additional_charge === 1
                                "
                              >
                                <td width="75%">Additional Charge</td>
                                <td align="right">
                                  <input
                                    v-model.number="additional_charge"
                                    type="text"
                                    class="form-control text-right"
                                    @keyup="checkNumber"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td width="75%">
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
                                <td>
                                  Customer Tender
                                  <span
                                    v-if="computedTotalPrice > tender"
                                    class="float-right"
                                    ><i class="text-danger"
                                      >Insufficient Amount</i
                                    ></span
                                  >
                                </td>
                                <td align="right">
                                  <input
                                    type="text"
                                    class="form-control text-right"
                                    v-model="tender"
                                    v-on:keyup.once="firstEntry(ticket)"
                                    :disabled="
                                      isCancelled(order) || dateCheck(order)
                                    "
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Customer Change</td>
                                <td align="right">
                                  ₱ {{ computedChange | numberFormat }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <button
                            v-if="clickSubmit === false"
                            class="btn btn-block btn-bordered-warning waves-effect waves-light width-lg"
                            @click="submitOrder(ticket)"
                            :disabled="
                              (order[0].customer_order_detail !== null &&
                                order[0].customer_order_detail
                                  .cancelled_status === 1) ||
                                isCancelled(order) ||
                                computedTotalPrice > tender ||
                                itemStatus(order) ||
                                dateCheck(order) ||
                                (order[0].discount.length > 0 &&
                                  order[0].customer_discount.length === 0) ||
                                customerDiscount
                            "
                          >
                            Submit Order
                          </button>
                          <button
                            v-else
                            class="btn btn-block btn-bordered-warning waves-effect waves-light width-lg"
                            type="button"
                            disabled=""
                          >
                            <span
                              class="spinner-border spinner-border-sm mr-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Submitting...
                          </button>
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

    <!-- <div
      id="change-quantity"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <change-quantity :productItem="CQProductItem" @return-home="returnHome" />
    </div> -->
    <!-- /.modal -->

    <!-- <div
      id="change-item"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <change-item :productItem="productItem" @return-home="returnHome" />
    </div> -->
    <!-- /.modal -->

    <div
      id="add-order"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <add-order
        :orderDetails="orderDetails"
        @return-home="returnHome"
        @addProduct="addProduct"
      />
    </div>
    <!-- /.modal -->

    <div
      id="request-discount-tele"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <request-discount-tele
        :request_discount_tele="discount_details"
        :discountList="discountList"
        @closeRequestDiscount="closeRequestDiscount"
      />
    </div>
    <!-- /.modal -->

    <div
      id="addFoodProductDetail"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <ProductDetailsModal
        :mode="modalMode"
        :addItemOrderForm="addItemOrderForm"
        :editItemOrderForm="editItemOrderForm"
        :foodProductDetails="foodProductDetails"
        @closeFoodProductDetail="closeFoodProductDetail"
      />
    </div>
    <!-- /.modal -->

    <div
      id="updateFoodProductDetail"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <ProductDetailsModal
        :mode="modalMode"
        :addItemOrderForm="addItemOrderForm"
        :editItemOrderForm="editItemOrderForm"
        :foodProductDetails="foodProductDetails"
        @closeFoodProductDetail="closeFoodProductDetail"
      />
    </div>
    <!-- /.modal -->

    <div
      id="edit-unit-price"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <edit-unit-price
        :unit_details="unit_details"
        @closeEditUnitPrice="closeEditUnitPrice"
      />
    </div>

    <div
      id="view_ids"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal">×</button>
            <br /><br />
            <center><img id="customer_id" src="" alt="" /></center>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary waves-effect"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- /.modal -->
  </div>
  <!-- end container -->
</template>
<script>
import Vue from 'vue'
// import ChangeQuantity from './ChangeQuantityComponent'
// import ChangeItem from './ChangeItemComponent'
import AddOrder from './AddOrderComponent'
import RequestDiscountTele from './RequestDiscountTeleComponent'
import EditUnitPrice from './EditUnitPriceComponent'
import ProductDetailsModal from '../orderRequest/Food/Items/ProductDetailsModal'

import { Form, HasError, AlertError } from 'vform'
import { serialize } from 'object-to-formdata'
import { Datetime } from 'vue-datetime'
import { DateTime } from 'luxon'
import 'vue-datetime/dist/vue-datetime.css'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

export default {
  props: {
    ticketId: {
      type: String,
      required: true
    }
  },
  components: {
    // ChangeQuantity,
    // ChangeItem,
    AddOrder,
    datetime: Datetime,
    timePicker: Datetime,
    RequestDiscountTele,
    EditUnitPrice,
    ProductDetailsModal
  },
  data() {
    return {
      recipient: null,
      recipient_address: null,
      recipient_numbers: [],
      recipient_phone: null,
      recepient_landmark: null,
      addItemOrderForm: this.newAddForm(),
      editItemOrderForm: {},
      foodProductDetails: {},
      modalMode: 'Add',
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
      mop: 1,
      productIds: [],
      qtyIds: [],
      deliverySchedule: {
        date: null,
        time: null
      },
      isClickDate: true,
      isClickTime: true,
      clickSubmit: false,
      dateTimePlus: null,
      dateTimeEnd: null,
      getTimePickup: null,
      timeCount: 0,
      cancelled_ticket: false,
      product_details: {},
      discount_details: {},
      discount_list: [],
      discountForm: {
        discount_ids: [],
        no_approve: [],
        discount: []
      },
      discountList: [],
      stocks_uom_ids: [],
      deliverySchedules: [],
      other_discounted_amt: [],
      is_discounted: true,
      tenant_discount: 0,
      unit_details: {},
      additional_charge: 0
    }
  },
  computed: {
    computedTotalPrice: function() {
      // `this` points to the vm instance
      let discount = 0

      if (this.discountForm.discount.length > 0) {
        for (let i = 0; i < this.discountForm.discount.length; i++) {
          discount += parseFloat(this.discountForm.discount[i])
        }
      }

      return (
        parseFloat(this.totalPrice) +
        parseFloat(this.otherTotalPrice) +
        parseFloat(this.delivery_fee) +
        parseFloat(this.additional_charge) -
        (parseFloat(discount) + parseFloat(this.tenant_discount))
      )
    },
    computedChange: function() {
      // `this` points to the vm instance

      let discount = 0,
        change = 0

      if (this.discountForm.discount.length > 0) {
        for (let i = 0; i < this.discountForm.discount.length; i++) {
          discount += parseFloat(this.discountForm.discount[i])
        }
      }

      change =
        parseFloat(this.tender) +
        (parseFloat(discount) + parseFloat(this.tenant_discount)) -
        (parseFloat(this.totalPrice) +
          parseFloat(this.otherTotalPrice) +
          parseFloat(this.delivery_fee) +
          parseFloat(this.additional_charge))

      if (Number.isNaN(change)) {
        change = 0
      }

      this.change = change
      return change
    },
    customerDiscount: function() {
      let order = null,
        discountList = 0
      for (const key in this.customerOrders) {
        order = this.customerOrders[key]
        break
      }

      for (const d in this.discount_list) {
        if (
          this.countApproved(
            order[0].customer_discount,
            this.discount_list[d].id
          ) > 0
        ) {
          discountList++
        }
      }

      if (order[0].customer_discounted_amt.length === 0) {
        if (discountList !== this.discountForm.discount.length) {
          return true
        }
      }

      return false
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.cancelled_ticket) {
      next()
    } else {
      Swal.fire({
        title: 'Do you really want to leave?',
        text: 'You have unsaved changes!',
        type: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      }).then(result => {
        if (result.value) {
          next()
        } else {
          next(false)
        }
      })
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
      const { data } = await axios.get(`/order/customer/${this.ticketId}`)

      this.customerOrders = data.tenant_order
      this.otherTenantOrder = data.other_tenant_order
      this.other_discounted_amt = data.other_discounted_amt
      this.discount_list = data.discount_list
      this.deliverySchedules = data.deliverySchedules
      this.customerTender(data.tenant_order)
      this.calculateInventory(data.tenant_order)
      this.calculateDiscount(data.tenant_order)
      this.getTenantPrice(data.other_tenant_order)
      this.recipientDetails(data.recipient)

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

      for (const charge in data.tenant_order) {
        if (data.tenant_order[charge][0].customer_order_detail !== null) {
          this.additional_charge = parseFloat(
            data.tenant_order[charge][0].customer_order_detail.additional_charge
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
      this.stocks_uom_ids = []
      this.productIds = []
      this.qtyIds = []
      var inventory = 0

      for (const item in data) {
        for (let i = 0; i < data[item].length; i++) {
          if (data[item][i].canceled_status === 0) {
            this.productIds.push(data[item][i].product_id)
            this.qtyIds.push(data[item][i].quantity)
          }

          let stocks = null
          for (const key in data[item][i].product_prices) {
            if (
              (data[item][i].uom_id != null || data[item][i].uom_id != '') &&
              data[item][i].product_prices[key].uom_id == data[item][i].uom_id
            ) {
              stocks = data[item][i].product_prices[key].stocks
            }

            if (data[item][i].uom_id == null) {
              stocks = data[item][i].product_prices[key].stocks
            }
          }

          if (stocks != '' && stocks != null && stocks != 0) {
            inventory = parseInt(stocks) - parseInt(data[item][i].quantity)

            this.inventory.push(inventory)
            this.changeQuantity_ids.push(data[item][i].product_id)
            this.stocks_uom_ids.push(data[item][i].uom_id)
          }
        }
      }
    },
    itemStatus(data) {
      let status = false
      for (const item in data) {
        if (data[item].status === 0 && data[item].canceled_status === 1) {
          status = false
        } else if (data[item].status === 0) {
          status = true
          break
        } else if (
          data[item].quantity === '0' &&
          data[item].canceled_status === 0
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
        minimumOrder = 0,
        additional_charge = 0

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

      delivery_charge =
        data[0].customer_delivery_info.barangay.town.delivery_charge.charge_amt
      minimumOrder =
        parseFloat(
          data[0].customer_delivery_info.barangay.town.delivery_charge
            .customer_to_pay
        ) -
        parseFloat(
          data[0].customer_delivery_info.barangay.town.delivery_charge
            .charge_amt
        )
      additional_charge = data[0].locate_tenant.additional_charge

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
      // this.delivery_fee = delivery_charge;

      return {
        customerRemarks,
        customerOrderRemarks,
        totalItems,
        totalQuantity,
        totalPrice,
        minimumOrder,
        delivery_charge,
        additional_charge
      }
    },
    otherDetails(data) {
      let tenantName = null,
        totalPrice = 0,
        tenant_id = null,
        discounted_amt = 0

      tenantName = data[0].praduct.tenant.tenant
      tenant_id = data[0].praduct.tenant.tenant_id

      data.forEach(order => {
        if (order.canceled_status === 0 && order.status === 1) {
          totalPrice += parseFloat(order.total_price)
        }
      })

      if (this.other_discounted_amt.length > 0) {
        this.other_discounted_amt.forEach(other => {
          if (other.tenant_id === tenant_id) {
            discounted_amt += parseFloat(other.discount)
          }
        })
      }

      totalPrice = totalPrice - discounted_amt

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
      let canceled = true
      for (let index = 0; index < data.length; index++) {
        const cancel = data[index].canceled_status

        if (cancel == 0) {
          canceled = false
        }
      }

      this.cancelled_ticket = canceled
      return canceled
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
    dateCheck(data) {
      var order_date = new Date(moment(data[0].pickup_at).format('YYYY-MM-DD'))
      var date_today = new Date(moment(this.dateToday).format('YYYY-MM-DD'))
      if (order_date.getTime() > date_today.getTime()) {
        return true
      } else {
        return false
      }
    },
    updateItemServe(id, quantity) {
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
                  id: id,
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
    changeQuantity(id, product_id, product_price_id, totalPrice) {
      this.order_id = id
      this.product_id = product_id

      this.CQProductItem = [
        {
          product_id: product_id,
          order_id: id,
          product_price_id: product_price_id,
          total_price: totalPrice
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
        cancelled_status.push(order[index].canceled_status)
      }

      this.orderDetails = [
        {
          ticket: ticket,
          productIds: productIds,
          cancelled_status: cancelled_status,
          mop: order[0].mop,
          icoos: order[0].icoos,
          pickup_at: order[0].pickup_at
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
        if (result.value) {
          this.params = {
            ticket_id: ticket,
            inventory: this.inventory,
            changeQuantity_ids: this.changeQuantity_ids,
            stocks_uom_ids: this.stocks_uom_ids,
            tender: this.tender,
            change: this.change,
            additional_charge: this.additional_charge,
            datePickUp: this.deliverySchedule.date,
            timePickUp: this.deliverySchedule.time,
            discount_details: this.discountForm
          }

          axios
            .put('/order/update_for_preparing', this.params)
            .then(({ data, status }) => {
              this.clickSubmit = false
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
    closeFoodProductDetail() {
      $('#foodProductDetail').modal('hide')
      this.addItemOrderForm = this.newAddForm()
    },
    newAddForm() {
      return {
        productId: null,
        uomId: null,
        quantity: 1,
        price: null,
        suggestions: {},
        cFlavor: {
          flavorId: null,
          price: null
        },
        cDrink: {
          uomId: null,
          productId: null,
          price: null
        },
        cSide: {
          uomId: null,
          productId: null,
          price: null
        },
        cFry: {
          uomId: null,
          productId: null,
          price: null
        },
        cSize: {
          uomId: null,
          price: null
        },
        aSides: [],
        aDrinks: [],
        aDesserts: []
      }
    },
    async viewProductDetails(order_id, product_id, e, quantity, uom_id) {
      const thisButton = e.target
      this.modalMode = 'Edit'

      // const [a, b] = await Promise.all([
      // 	await axios.get(`/product/details/${product_id}?orderId=${order_id}`),
      // 	await axios.get(`/order/view/${order_id}`)
      // ])

      // this.foodProductDetails = a.data

      const { data } = await axios.get(
        `/product/details/${product_id}?orderId=${order_id}`
      )

      const { productDetails, productSubs } = data

      this.foodProductDetails = productDetails

      let suggestions = {}

      for (const [key, value] of Object.entries(productSubs.suggestions)) {
        suggestions[key] = {
          product_suggestion_id: value[0].product_suggestion_id,
          addon_price: value[0].addon_price
        }
      }

      this.editItemOrderForm = {
        order_id,
        productId: null,
        uomId: null,
        quantity,
        price: null,
        suggestions,
        cDrink: {
          uomId: productSubs.drinks_choices.length
            ? productSubs.drinks_choices[0].uom_id
            : null,
          productId: productSubs.drinks_choices.length
            ? productSubs.drinks_choices[0].choice_id
            : null,
          price: productSubs.drinks_choices.length
            ? productSubs.drinks_choices[0].addon_price
            : null
        },
        cSide: {
          uomId: productSubs.sides_choices.length
            ? productSubs.sides_choices[0].uom_id
            : null,
          productId: productSubs.sides_choices.length
            ? productSubs.sides_choices[0].choice_id
            : null,
          price: productSubs.sides_choices.length
            ? productSubs.sides_choices[0].addon_price
            : null
        },
        cFry: {
          uomId: productSubs.fries_choices.length
            ? productSubs.fries_choices[0].uom_id
            : null,
          productId: productSubs.fries_choices.length
            ? productSubs.fries_choices[0].choice_id
            : null,
          price: productSubs.fries_choices.length
            ? productSubs.fries_choices[0].addon_price
            : null
        },
        cSize: {
          uomId: productSubs.sizes_choices.length
            ? productSubs.sizes_choices[0].uom_id
            : null,
          price: productSubs.sizes_choices.length
            ? parseFloat(productSubs.sizes_choices[0].product_price)
            : null
        },
        aDrinks: productSubs.drinks_addons.map(addon => {
          return {
            uomId: addon.uom_id,
            productId: addon.addon_id,
            price: addon.addon_price
          }
        }),
        aSides: productSubs.sides_addons.map(addon => {
          return {
            uomId: addon.uom_id,
            productId: addon.addon_id,
            price: addon.addon_price
          }
        }),
        aDesserts: productSubs.desserts_addons.map(addon => {
          return {
            uomId: addon.uom_id,
            productId: addon.addon_id,
            price: addon.addon_price
          }
        })
      }

      this.$set(this.foodProductDetails, 'quantity', 0)
      this.$set(this.foodProductDetails, 'order_id', order_id)
      this.$set(this.foodProductDetails, 'uom_id', uom_id)

      $('#updateFoodProductDetail').modal('show')
    },
    async addProduct({ productId, ticket_id, icoos, pickup_at, mop, uom_id }) {
      this.modalMode = 'Add'

      const { data } = await axios.get(`/product/details/${productId}`)
      this.foodProductDetails = data.productDetails

      this.$set(this.addItemOrderForm, 'ticket_id', ticket_id)
      this.$set(this.addItemOrderForm, 'icoos', icoos)
      this.$set(this.addItemOrderForm, 'pickup_at', pickup_at)
      this.$set(this.addItemOrderForm, 'mop', mop)
      this.addItemOrderForm.uomId = uom_id
      this.$set(this.foodProductDetails, 'quantity', 0)
      this.$set(this.foodProductDetails, 'uom_id', uom_id)
      $('#addFoodProductDetail').modal('show')
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
    },
    async requestDiscount(ticket_id, platform) {
      this.discount_details = {
        ticket_id: ticket_id
      }

      const { data } = await axios.get('/discount/discount_lists')
      this.discountList = data

      $('div#request-discount-tele').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    pendingDiscount(discounts, customer_discount) {
      let pending = 0

      for (const key in discounts) {
        pending += 1
      }

      if (customer_discount.length > 0) {
        pending = 0
      }

      return pending
    },
    countApproved(data, discount_id) {
      let count = 0

      data.forEach(customer_discount => {
        if (
          customer_discount.status === 1 &&
          customer_discount.discount_id === discount_id
        ) {
          count += 1
        }
      })

      return count
    },
    discount(id, vat, percentage) {
      var discount = $('input#discount_' + id).val()
      var no_approve = $('input#no_approved_' + id).val()
      // console.log(parseFloat(this.totalPrice) * (percentage / 100))
      if (
        discount >
          (parseFloat(this.totalPrice) / parseFloat(vat)) *
            (percentage / 100) &&
        percentage !== null &&
        vat !== null
      ) {
        $('input#discount_' + id).val('')
        Swal.fire({
          type: 'warning',
          title: 'Warning',
          text: 'Discount must not be greater than total amout purchase!'
        })

        return
      }

      if (discount != '' && parseFloat(discount) > 0) {
        var thisArray = this.discountForm.discount_ids
        if (thisArray.indexOf(id) > -1) {
          var arryIndex = thisArray.indexOf(id)
          this.discountForm.discount.splice(arryIndex, 1, parseFloat(discount))
        } else {
          this.discountForm.discount_ids.push(id)
          this.discountForm.no_approve.push(no_approve)
          this.discountForm.discount.push(discount)
        }
      } else {
        $('input#discount_' + id).val('')
        var thisArray = this.discountForm.discount_ids
        if (thisArray.indexOf(id) > -1) {
          var arryIndex = thisArray.indexOf(id)
          this.discountForm.discount_ids.splice(arryIndex, 1)
          this.discountForm.no_approve.splice(arryIndex, 1)
          this.discountForm.discount.splice(arryIndex, 1)
        }
      }
    },
    discount_type(id) {
      let discount_name = null

      for (const key in this.discount_list) {
        if (this.discount_list[key].id === id) {
          discount_name = this.discount_list[key].discount_name
          break
        }
      }

      return discount_name
    },
    calculateDiscount(data) {
      let total_discounted_amt = 0

      if (this.is_discounted === true) {
        for (const key in data) {
          if (data[key][0].customer_discounted_amt.length > 0) {
            const discounted_amt = data[key][0].customer_discounted_amt
            discounted_amt.forEach(discount => {
              total_discounted_amt += parseFloat(discount.discount)
            })
          }
        }
      }

      this.tenant_discount = total_discounted_amt
    },
    closeRequestDiscount() {
      this.is_discounted = false
      this.retrieveCustomerOrders()
    },
    editProductPrice(id, quantity, price_per_gram) {
      this.unit_details = {
        id,
        quantity,
        price_per_gram
      }

      $('div#edit-unit-price').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    closeEditUnitPrice() {
      this.retrieveCustomerOrders()
    },
    checkNumber() {
      if (parseFloat(this.additional_charge) < 0) {
        this.additional_charge = 0
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
  },
  watch: {
    'deliverySchedule.time': function(data) {
      const order_time = {
        from_time: this.deliverySchedules[1].time_from,
        to_time: this.deliverySchedules[1].time_to,
        order_time: data
      }

      axios.post('/order/check_time', order_time).then(({ data, status }) => {
        const { validate } = data

        if (validate) {
          const { message } = data
          Swal.fire({
            type: 'warning',
            title: 'Opsss ...',
            text: message
          }).then(result => {
            for (const delivery in this.customerOrders) {
              this.deliverySchedule.time =
                this.customerOrders[delivery][0].pickup_at.split(' ')[1] ==
                '00:00:00'
                  ? null
                  : this.customerOrders[delivery][0].pickup_at.split(' ')[1]
              break
            }
          })
        } else {
          Swal.close()
        }
      })
    }
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
