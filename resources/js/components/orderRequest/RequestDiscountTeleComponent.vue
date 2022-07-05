<!-- @format -->

<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <br /><br />

        <div v-for="(discount, index) in discount_details" :key="index">
          <template v-if="discount.discount_type.length > 0">
            <div class="alert alert-info" role="alert">
              <i class="mdi mdi-alert-circle-outline mr-2"></i>Number of
              {{ discount.discount_name }}
              Citizen : {{ discount.discount_type.length }}
            </div>
            <div style="max-width:95%;">
              <div class="row d-flex justify-content-between mb-1 ml-2">
                <table class="table table-sm table-bordered" width="100%">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>ID. Number</th>
                      <th><center>Image</center></th>
                      <th><center>Status</center></th>
                    </tr>
                  </thead>
                  <tbody
                    v-for="(d, i) in discount.discount_type"
                    :key="'discount' + i"
                  >
                    <tr>
                      <td width="5%">{{ i + 1 }}.</td>
                      <td width="30%">{{ d.name }}</td>
                      <td width="30%">{{ d.id_number }}</td>
                      <td>
                        <center>
                          <button
                            class="btn btn-sm btn-bordered-warning waves-effect waves-light btn-rounded"
                            @click="viewDiscountID(d.image_path)"
                            :disabled="d.image_path === null"
                          >
                            View Uploaded ID
                          </button>
                        </center>
                      </td>
                      <td align="center">
                        <button
                          class="btn btn-sm btn-success btn-rounded"
                          :disabled="
                            d.customer_discount_status != null &&
                              d.customer_discount_status.status === 1
                          "
                          :class="'approved_' + d.id"
                          data-wenk="Approved"
                          @click="approved(d.id, d.discount_id)"
                        >
                          <i class="remixicon-check-line"></i>
                        </button>
                        <button
                          class="btn btn-sm btn-danger btn-rounded"
                          :disabled="
                            d.customer_discount_status != null &&
                              d.customer_discount_status.status === 0
                          "
                          :class="'disapproved_' + d.id"
                          data-wenk="Disapproved"
                          @click="disapproved(d.id, d.discount_id)"
                        >
                          <i class="remixicon-close-line"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </div>
        <div class="discount-list">
          <div class="alert alert-info" role="alert">
            <i class="mdi mdi-alert-circle-outline mr-2"></i>Discount(s) List
          </div>
          <div style="max-width:95%;">
            <table class="table table-sm table-bordered" width="100%">
              <tbody>
                <tr
                  v-for="(discount, i) in discount_details"
                  :key="`count` + i"
                >
                  <template v-if="discount.discount_type.length > 0">
                    <td>Number of {{ discount.discount_name }} :</td>
                    <td>
                      {{
                        countApprovedDiscount(
                          discount.discount_type[0].discount_id
                        )
                      }}
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
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
          @click="checkDiscountForm"
          type="submit"
          class="btn btn-info waves-effect waves-light"
        >
          Save
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
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Form, HasError, AlertError } from 'vform'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
export default {
  name: 'RequestDiscountTeleComponent',
  props: ['request_discount_tele', 'discountList'],
  data() {
    return {
      clickSubmit: false,
      discount_details: [],
      discount_id: {},
      discountForm: new Form({
        ids: [],
        discountIds: [],
        requests: [],
        ticket_id: null
      })
    }
  },
  methods: {
    async fetchRequestDiscount(ticket_id) {
      const { data } = await axios.get(
        `/order/fetch_request_discounts/${ticket_id}`
      )

      this.discount_details = data.discounts
      this.discount(data.discounts)
    },
    discount(data) {
      this.discountForm.ids = []
      this.discountForm.discountIds = []
      this.discountForm.requests = []

      for (const key in data) {
        if (data[key].discount_type) {
          data[key].discount_type.forEach(discount => {
            this.discountForm.ids.push(discount.id)
            this.discountForm.discountIds.push(discount.discount_id)
            this.discountForm.requests.push(
              discount.customer_discount_status === null
                ? 0
                : discount.customer_discount_status.status
            )
          })
        }
      }
    },
    approved(id, discount_id) {
      $('button.approved_' + id).prop('disabled', true)
      $('button.disapproved_' + id).prop('disabled', false)

      Swal.fire({
        type: 'success',
        title: 'Success',
        text: 'Discount status has been updated'
      })

      var thisArray = this.discountForm.ids
      if (thisArray.indexOf(id) > -1) {
        var arryIndex = thisArray.indexOf(id)
        this.discountForm.requests.splice(arryIndex, 1, 1)

        this.countApprovedDiscount(discount_id)
      }
    },
    disapproved(id, discount_id) {
      $('button.approved_' + id).prop('disabled', false)
      $('button.disapproved_' + id).prop('disabled', true)

      Swal.fire({
        type: 'success',
        title: 'Success',
        text: 'Discount status has been updated'
      })

      var thisArray = this.discountForm.ids
      if (thisArray.indexOf(id) > -1) {
        var arryIndex = thisArray.indexOf(id)
        this.discountForm.requests.splice(arryIndex, 1, 0)

        this.countApprovedDiscount(discount_id)
      }
    },
    countApprovedDiscount(discount_id) {
      let count_approved = 0

      this.discountForm.ids.forEach(id => {
        const arrayIndex = this.discountForm.ids.indexOf(id)

        if (discount_id == this.discountForm.discountIds[arrayIndex]) {
          if (this.discountForm.requests[arrayIndex] == 1) {
            count_approved += 1
          }
        }
      })

      return count_approved
    },
    checkDiscountForm() {
      this.clickSubmit = true

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
            .put('/order/approve_disapprove_discount', this.discountForm)
            .then(({ data, status }) => {
              const { message } = data

              Swal.fire({
                type: 'success',
                title: 'Success',
                text: message
              }).then(result => {
                this.$emit('closeRequestDiscount')
                this.clickSubmit = false
                // this.$parent.retrieveCustomerOrders();
                $('div#request-discount-tele').modal('hide')
              })
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
        } else {
          this.clickSubmit = false
        }
      })
    },
    viewDiscountID(image) {
      $('div#view_ids').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })

      $('img#customer_id').attr(
        'src',
        'https://storetenant.alturush.com/' + image
      )
    }
  },
  watch: {
    request_discount_tele: function(data) {
      this.discountForm.ticket_id = data.ticket_id
      this.fetchRequestDiscount(data.ticket_id)
    }
  }
}
</script>
