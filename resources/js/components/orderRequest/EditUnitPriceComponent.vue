<!-- @format -->
<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Unit Price Details</h4>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-hidden="true"
        >
          ×
        </button>
      </div>
      <form @submit.prevent="checkUnitPriceForm" method="post">
        <div class="modal-body p-4">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="measurement"
                  >Measurement per gram
                  <span class="text-danger">*</span></label
                >
                <input
                  type="number"
                  class="form-control"
                  min="1"
                  v-model="unitPriceForm.measurement"
                  id="measurement"
                  autocomplete="off"
                  :class="{
                    'is-invalid': unitPriceForm.errors.has('measurement')
                  }"
                  @keyup="calculatePrice($event)"
                />
                <has-error
                  :form="unitPriceForm"
                  field="measurement"
                ></has-error>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="unit_price">Current Unit Price</label>
                <input
                  type="number"
                  class="form-control"
                  min="1"
                  disabled
                  v-model="unitPriceForm.product_price"
                  id="unit_price"
                  autocomplete="off"
                  :class="{
                    'is-invalid': unitPriceForm.errors.has('product_price')
                  }"
                />
                <has-error
                  :form="unitPriceForm"
                  field="product_price"
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
          <button
            v-if="clickSubmit === false"
            type="submit"
            class="btn btn-info waves-effect waves-light"
          >
            Update Unit Price
          </button>
          <button
            v-else
            class="btn btn-primary waves-effect waves-light"
            type="button"
            disabled=""
          >
            <span
              class="spinner-border spinner-border-sm mr-1"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
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
  name: 'EditUnitPriceComponent',
  props: {
    unit_details: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      clickSubmit: false,
      unitPriceForm: new Form({
        id: null,
        quantity: 0,
        product_price: null,
        measurement: null,
        price_per_gram: 0
      })
    }
  },
  methods: {
    checkUnitPriceForm() {
      this.unitPriceForm
        .submit('post', '/order/update_unit_price', {
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

          swal({
            title: 'Success!',
            text: message,
            type: 'success',
            allowOutsideClick: false,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-primary'
          }).then(
            function() {
              this.clickSubmit = false
              $('div#edit-unit-price').modal('hide')
              this.unitPriceForm.clear()
              this.unitPriceForm.reset()
              this.$emit('closeEditUnitPrice')
            }.bind(this)
          )
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
    },
    calculatePrice(e) {
      let total = 0

      var gram = e.target.value

      total = parseFloat(gram) * parseFloat(this.unitPriceForm.price_per_gram)

      this.unitPriceForm.product_price = total
    }
  },
  watch: {
    unit_details: function(data) {
      this.unitPriceForm.id = data.id
      this.unitPriceForm.quantity = data.quantity
      this.unitPriceForm.price_per_gram = data.price_per_gram
    }
  }
}
</script>
