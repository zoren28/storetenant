<!-- @format -->

<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Update Customer Tender</h4>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-hidden="true"
        >
          ×
        </button>
      </div>
      <form
        class="form-horizontal"
        role="form"
        @submit.prevent="checkCustomerBillForm"
        method="post"
        enctype="multipart/form-data"
      >
        <div class="modal-body p-4">
          <!-- <div class="alert alert-info" role="alert">
            <i class="mdi mdi-alert-circle-outline mr-2"></i
            ><span> Please contact customer for changes.</span>.
          </div> -->
          <div class="table-responsive">
            <table class="table table-bordered" width="100%">
              <thead>
                <tr>
                  <th>Vehicle Type</th>
                  <th>No. of Rider</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v, index) in vehicle_list" :key="index">
                  <td width="75%">{{ v.vehicle.transpo_name }}</td>
                  <td align="right">{{ v.count }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-responsive">
            <table class="table table-bordered" width="100%">
              <thead>
                <tr>
                  <th colspan="2">Order Summary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="75%">Grand Total</td>
                  <td align="right">
                    ₱ {{ computedTotalPrice | numberFormat }}
                  </td>
                </tr>
                <tr>
                  <td>New Rider's Fee</td>
                  <td align="right">
                    ₱ {{ customerBillForm.delivery_charge | numberFormat }}
                  </td>
                </tr>
                <tr>
                  <td>Discounted Amount</td>
                  <td align="right">
                    ₱ {{ customerBillForm.discounted_amt | numberFormat }}
                  </td>
                </tr>
                <tr>
                  <td>Customer Tender</td>
                  <td align="right">
                    ₱ {{ customerBillForm.amount | numberFormat }}
                  </td>
                </tr>
                <tr>
                  <td>Change</td>
                  <td align="right">
                    ₱ {{ customerBillForm.change | numberFormat }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary waves-effect"
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-info waves-effect waves-light">
            Ok
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Form, HasError, AlertError } from 'vform'
import { serialize } from 'object-to-formdata'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
export default {
  name: 'EditCustomerBillComponent',
  props: ['orderDetails', 'vehicle_list'],
  data() {
    return {
      no_rider: null,
      customerBillForm: new Form({
        grandTotal: 0,
        tag_riders_id: null,
        ticket_id: null,
        delivery_charge: 0,
        amount: 0,
        change: 0,
        discounted_amt: 0
      })
    }
  },
  computed: {
    computedTotalPrice: function() {
      // `this` points to the vm instance
      let grandtotal = 0

      grandtotal =
        parseFloat(this.customerBillForm.grandTotal) -
        parseFloat(this.customerBillForm.discounted_amt)

      return grandtotal
    }
  },
  methods: {
    fetchCustomerBill(details) {
      axios.post('/order/fetch_customer_bill', details).then(({ data }) => {
        this.customerBillForm.delivery_charge = parseFloat(data.delivery_charge)
        this.customerBillForm.amount = parseFloat(data.amount) * 1
        this.customerBillForm.change = data.change
        this.customerBillForm.discounted_amt = this.calculateDiscountedAmt(
          data.discounted_amount
        )
        this.customerGrandTotal(data.grand_total)
      })
    },
    calculateDiscountedAmt(data) {
      let discounted_amt = 0

      data.forEach(d => {
        discounted_amt += parseFloat(d.discount) * 1
      })

      return discounted_amt
    },
    customerGrandTotal(data) {
      let grandTotal = 0

      data.forEach(order => {
        grandTotal += parseFloat(order.total_price)
      })

      this.customerBillForm.grandTotal =
        grandTotal + parseInt(this.customerBillForm.delivery_charge)
    },
    checkCustomerBillForm() {
      this.customerBillForm
        .submit('post', '/order/update_customer_bill', {
          // Transform form data to FormData
          transformRequest: [
            function(data, headers) {
              return serialize(data)
            }
          ],

          onUploadProgress: e => {
            // Do whatever you want with the progress event
            // console.log(e)
          }
        })
        .then(({ data, status }) => {
          const { message } = data
          const { last_tenant } = data
          if (last_tenant === 'true') {
            const { change } = data
            swal({
              title: 'Success!',
              text: message,
              type: 'success',
              allowOutsideClick: false,
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-primary'
            }).then(
              function() {
                if (change == '00.00' || change == '0.00' || change == '0') {
                  this.$parent.tagForInTransit(
                    this.customerBillForm.ticket_id,
                    this.customerBillForm.tag_riders_id
                  )
                  this.customerBillForm.clear()
                  this.customerBillForm.reset()
                  $('div#modal-update-bill').modal('hide')
                } else {
                  Swal.fire({
                    type: 'info',
                    title: 'Information',
                    text: 'Please prepare for customer change of ₱ ' + change
                  }).then(result => {
                    this.$parent.tagForInTransit(
                      this.customerBillForm.ticket_id,
                      this.customerBillForm.tag_riders_id
                    )
                    this.customerBillForm.clear()
                    this.customerBillForm.reset()
                    $('div#modal-update-bill').modal('hide')
                  })
                }
              }.bind(this)
            )
          } else {
            swal({
              title: 'Success!',
              text: message,
              type: 'success',
              allowOutsideClick: false,
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-primary'
            }).then(
              function() {
                this.$parent.tagForInTransit(
                  this.customerBillForm.ticket_id,
                  this.customerBillForm.tag_riders_id
                )
                this.customerBillForm.clear()
                this.customerBillForm.reset()
                $('div#modal-update-bill').modal('hide')
              }.bind(this)
            )
          }
        })
        .catch(error => {
          this.clickSubmit = false
          var { data, status } = error.response
          if (status === 401) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Session has been expired.'
            })
          } else if (status === 422) {
            const { message } = data

            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: message
            })
          } else {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'Oops, something went wrong!'
            })
          }
        })
    }
  },
  watch: {
    orderDetails: function(data) {
      this.customerBillForm.ticket_id = data.ticket_id
      this.customerBillForm.tag_riders_id = data.tag_riders_id
      this.no_rider = data.no_rider
      this.fetchCustomerBill(data)
    }
  }
}
</script>
