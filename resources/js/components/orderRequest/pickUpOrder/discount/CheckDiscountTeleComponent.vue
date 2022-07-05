<!-- @format -->

<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <br /><br />
        <div
          class="row"
          v-for="(customer_discount, index) in customer_discounts"
          :key="index"
        >
          <div class="col-md-12" v-if="customer_discount.length > 0">
            <div class="alert alert-info" role="alert">
              <i class="mdi mdi-alert-circle-outline mr-2"></i>Number of
              {{ customer_discount[0].discount_list.discount_name }} :
              {{ customer_discount.length }}
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
                    v-for="(d, i) in customer_discount"
                    :key="'discount' + i"
                  >
                    <tr>
                      <td width="5%">{{ i + 1 }}.</td>
                      <td width="30%">
                        {{ d.customer_discount.discount_storage.name }}
                      </td>
                      <td width="30%">
                        {{ d.customer_discount.discount_storage.id_number }}
                      </td>
                      <td>
                        <center>
                          <button
                            class="btn btn-sm btn-bordered-warning waves-effect waves-light btn-rounded"
                            @click="
                              viewDiscountID(
                                d.customer_discount.discount_storage.image_path
                              )
                            "
                            :disabled="
                              d.customer_discount.discount_storage
                                .image_path === null
                            "
                          >
                            View Uploaded ID
                          </button>
                        </center>
                      </td>
                      <td align="center">
                        <button
                          class="btn btn-sm btn-success btn-rounded"
                          :disabled="d.status === 1"
                          :class="'approved_' + d.customer_discount.id"
                          data-wenk="Approved"
                          @click="
                            approved(d.customer_discount.id, d.discount_id)
                          "
                        >
                          <i class="remixicon-check-line"></i>
                        </button>
                        <button
                          class="btn btn-sm btn-danger btn-rounded"
                          :disabled="d.status === 0"
                          :class="'disapproved_' + d.customer_discount.id"
                          data-wenk="Disapproved"
                          @click="
                            disapproved(d.customer_discount.id, d.discount_id)
                          "
                        >
                          <i class="remixicon-close-line"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="discount-list">
          <div class="alert alert-info" role="alert">
            <i class="mdi mdi-alert-circle-outline mr-2"></i>Discount(s) List
          </div>
          <div style="max-width:95%;">
            <table class="table table-sm table-bordered" width="100%">
              <tbody>
                <tr
                  v-for="(discount, index) in customer_discounts"
                  :key="'approved' + index"
                >
                  <template v-if="discount.length > 0">
                    <td>
                      Number of {{ discount[0].discount_list.discount_name }} :
                    </td>
                    <td>
                      {{ countApprovedDiscount(discount[0].discount_id) }}
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
export default {
  name: 'CheckDiscountTeleComponent',
  props: {
    check_discount_tele: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      clickSubmit: false,
      customer_discounts: [],
      discountsForm: {
        ids: [],
        discountIds: [],
        requests: [],
        ticket_id: null
      }
    }
  },
  methods: {
    checkDiscountForm() {
      this.clickSubmit = true

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
            .post('/order/update_discount_amt', this.discountsForm)
            .then(({ data, status }) => {
              const { message } = data

              Swal.fire({
                type: 'success',
                title: 'Success',
                text: message
              }).then(result => {
                this.$emit('closeRequestDiscount', this.discountsForm.ticket_id)
                this.customer_discounts = []
                this.discountsForm = {
                  ids: [],
                  discountIds: [],
                  requests: [],
                  ticket_id: null
                }
                this.clickSubmit = false
                // this.$parent.retrieveCustomerOrders();
                $('div#check-discount-tele').modal('hide')
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
    async fetchApprovedDiscount(ticket_id) {
      const { data } = await axios.get(
        `/discount/fetch_approved_discount/${ticket_id}`
      )

      this.discountsForm.ids = []
      this.discountsForm.discountIds = []
      this.discountsForm.requests = []

      this.customer_discounts = data.customer_discounts
      data.customer_discounts.forEach(discount => {
        for (const key in discount) {
          this.discountsForm.ids.push(discount[key].customer_discount.id)
          this.discountsForm.discountIds.push(discount[key].discount_id)
          this.discountsForm.requests.push(discount[key].status)
        }
      })
    },
    approved(id, discount_id) {
      $('button.approved_' + id).prop('disabled', true)
      $('button.disapproved_' + id).prop('disabled', false)

      Swal.fire({
        type: 'success',
        title: 'Success',
        text: 'Discount status has been updated'
      })

      const arrayIndex = this.discountsForm.ids.indexOf(id)
      this.discountsForm.requests.splice(arrayIndex, 1, 1)
      this.countApprovedDiscount(discount_id)
    },
    disapproved(id, discount_id) {
      $('button.approved_' + id).prop('disabled', false)
      $('button.disapproved_' + id).prop('disabled', true)

      Swal.fire({
        type: 'success',
        title: 'Success',
        text: 'Discount status has been updated'
      })

      const arrayIndex = this.discountsForm.ids.indexOf(id)
      this.discountsForm.requests.splice(arrayIndex, 1, 0)
      this.countApprovedDiscount(discount_id)
    },
    countApprovedDiscount(discount_id) {
      let count_approved = 0

      this.discountsForm.ids.forEach(id => {
        const arrayIndex = this.discountsForm.ids.indexOf(id)

        if (discount_id == this.discountsForm.discountIds[arrayIndex]) {
          if (this.discountsForm.requests[arrayIndex] === 1) {
            count_approved += 1
          }
        }
      })

      return count_approved
    }
  },
  watch: {
    check_discount_tele: function(data) {
      this.discountsForm.ticket_id = data.ticket_id
      this.fetchApprovedDiscount(data.ticket_id)
    }
  }
}
</script>
