<!-- @format -->

<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Remittance Details</h4>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-hidden="true"
        >
          ×
        </button>
      </div>
      <form @submit.prevent="checkRemittanceForm" method="post">
        <div class="modal-body p-4">
          <!-- <div class="alert alert-info" role="alert"> -->
          <table class="table table-sm table-bordered" width="100%">
            <tr>
              <td width="75%"><span class="font-weight-bold">Price</span></td>
              <td align="right">
                ₱ {{ remittanceForm.total_amount | numberFormat }}
              </td>
            </tr>
            <tr>
              <td width="75%">
                <span class="font-weight-bold">Change Given</span>
              </td>
              <td align="right">
                ₱ {{ remittanceForm.change | numberFormat }}
              </td>
            </tr>
            <tr>
              <td width="75%">
                <span class="font-weight-bold"
                  >Total Rider's Accountability</span
                >
              </td>
              <td align="right">
                <span class="font-weight-bold text-danger"
                  >₱ {{ remittanceForm.total_remitted | numberFormat }}</span
                >
              </td>
            </tr>
          </table>

          <!-- </div> -->
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="field-1">Amount Remitted</label>
                <span class="text-danger">*</span>
                <input
                  type="text"
                  id="field-1"
                  class="form-control"
                  v-model.number="remittanceForm.amount_remitted"
                  :class="{
                    'is-invalid': remittanceForm.errors.has('amount_remitted')
                  }"
                  autocomplete="off"
                />
                <has-error
                  :form="remittanceForm"
                  field="amount_remitted"
                ></has-error>
              </div>
            </div>
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
            Submit
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
  name: 'RemitAmountComponent',
  props: ['orderDetails'],
  data() {
    return {
      remittanceForm: new Form({
        ticket_id: null,
        rider_id: null,
        id: null,
        total_amount: 0,
        total_remitted: 0,
        change: 0,
        amount_remitted: null,
        dateToday: null
      })
    }
  },
  methods: {
    checkRemittanceForm() {
      this.remittanceForm
        .submit(
          'post',
          '/rider_accountability/tag_for_successfully_delivered',
          {
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
          }
        )
        .then(({ data, status }) => {
          const { message } = data

          swal({
            title: 'Success!',
            text: message,
            type: 'success',
            allowOutsideClick: false,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-primary'
          }).then(
            function() {
              this.$parent.fetchDeliveredOrderList(
                this.remittanceForm.dateToday
              )

              this.remittanceForm.clear()
              this.remittanceForm.reset()
              $('div#remit-amount').modal('hide')
            }.bind(this)
          )
        })
        .catch(error => {
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
    orderDetails: function(order) {
      let total_remitted = 0

      this.remittanceForm.ticket_id = order.ticket_id
      this.remittanceForm.rider_id = order.rider_id
      this.remittanceForm.id = order.id
      this.remittanceForm.total_amount = parseFloat(order.total_amt)
      this.remittanceForm.change = parseFloat(order.change)
      this.remittanceForm.dateToday = order.dateToday
      total_remitted = parseFloat(order.total_amt) + parseFloat(order.change)
      this.remittanceForm.total_remitted = total_remitted.toFixed(2) * 1
    }
  }
}
</script>
