<!-- @format -->

<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <br /><br />

        <div
          v-if="countDiscount(discount_details).senior > 0"
          class="senior-citizen"
        >
          <div class="alert alert-info" role="alert">
            <i class="mdi mdi-alert-circle-outline mr-2"></i>Number of Senior
            Citizen : {{ countDiscount(discount_details).senior }}
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
                <tbody v-for="(d, i) in seniorListDiscount" :key="'senior' + i">
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
                        @click="approved(d.id)"
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
                        @click="disapproved(d.id)"
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
        <div v-if="countDiscount(discount_details).pwd > 0" class="pwd">
          <div class="alert alert-info" role="alert">
            <i class="mdi mdi-alert-circle-outline mr-2"></i>Number of PWD :
            {{ countDiscount(discount_details).pwd }}
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
                <tbody v-for="(p, i) in pwdListDiscount" :key="'pwd' + i">
                  <tr>
                    <td width="5%">{{ i + 1 }}.</td>
                    <td width="30%">{{ p.name }}</td>
                    <td width="30%">{{ p.id_number }}</td>
                    <td>
                      <center>
                        <button
                          class="btn btn-sm btn-bordered-warning waves-effect waves-light btn-rounded"
                          @click="viewDiscountID(p.image_path)"
                          :disabled="p.image_path === null"
                        >
                          View Uploaded ID
                        </button>
                      </center>
                    </td>
                    <td align="center">
                      <button
                        class="btn btn-sm btn-success btn-rounded"
                        :disabled="
                          p.customer_discount_status != null &&
                            p.customer_discount_status.status === 1
                        "
                        :class="'approved_' + p.id"
                        data-wenk="Approved"
                        @click="approved(p.id)"
                      >
                        <i class="remixicon-check-line"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-danger btn-rounded"
                        :disabled="
                          p.customer_discount_status != null &&
                            p.customer_discount_status.status === 0
                        "
                        :class="'disapproved_' + p.id"
                        data-wenk="Disapproved"
                        @click="disapproved(p.id)"
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
        <div v-if="countDiscount(discount_details).manager > 0" class="manager">
          <div class="alert alert-info" role="alert">
            <i class="mdi mdi-alert-circle-outline mr-2"></i>Number of Manager :
            {{ countDiscount(discount_details).manager }}
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
                  v-for="(m, i) in managerListDiscount"
                  :key="'manager' + i"
                >
                  <tr>
                    <td width="5%">{{ i + 1 }}.</td>
                    <td width="30%">{{ m.name }}</td>
                    <td width="30%">{{ m.id_number }}</td>
                    <td>
                      <center>
                        <button
                          class="btn btn-sm btn-bordered-warning waves-effect waves-light btn-rounded"
                          @click="viewDiscountID(m.image_path)"
                          :disabled="m.image_path === null"
                        >
                          View Uploaded ID
                        </button>
                      </center>
                    </td>
                    <td align="center">
                      <button
                        class="btn btn-sm btn-success btn-rounded"
                        :disabled="
                          m.customer_discount_status != null &&
                            m.customer_discount_status.status === 1
                        "
                        :class="'approved_' + m.id"
                        data-wenk="Approved"
                        @click="approved(m.id)"
                      >
                        <i class="remixicon-check-line"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-danger btn-rounded"
                        :disabled="
                          m.customer_discount_status != null &&
                            m.customer_discount_status.status === 0
                        "
                        :class="'disapproved_' + m.id"
                        data-wenk="Disapproved"
                        @click="disapproved(m.id)"
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
        <div v-if="countDiscount(discount_details).owner > 0" class="owner">
          <div class="alert alert-info" role="alert">
            <i class="mdi mdi-alert-circle-outline mr-2"></i>Number of Owner :
            {{ countDiscount(discount_details).owner }}
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
                <tbody v-for="(o, i) in ownerListDiscount" :key="'owner' + i">
                  <tr>
                    <td width="5%">{{ i + 1 }}.</td>
                    <td width="30%">{{ o.name }}</td>
                    <td width="30%">{{ o.id_number }}</td>
                    <td>
                      <center>
                        <button
                          class="btn btn-sm btn-bordered-warning waves-effect waves-light btn-rounded"
                          @click="viewDiscountID(o.image_path)"
                          :disabled="o.image_path === null"
                        >
                          View Uploaded ID
                        </button>
                      </center>
                    </td>
                    <td align="center">
                      <button
                        class="btn btn-sm btn-success btn-rounded"
                        :disabled="
                          o.customer_discount_status != null &&
                            o.customer_discount_status.status === 1
                        "
                        :class="'approved_' + o.id"
                        data-wenk="Approved"
                        @click="approved(o.id)"
                      >
                        <i class="remixicon-check-line"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-danger btn-rounded"
                        :disabled="
                          o.customer_discount_status != null &&
                            o.customer_discount_status.status === 0
                        "
                        :class="'disapproved_' + o.id"
                        data-wenk="Disapproved"
                        @click="disapproved(o.id)"
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
        <div class="discount-list">
          <div class="alert alert-info" role="alert">
            <i class="mdi mdi-alert-circle-outline mr-2"></i>Discount(s) List
          </div>
          <div style="max-width:95%;">
            <table class="table table-sm table-bordered" width="100%">
              <tbody>
                <tr>
                  <td>Number of Senior Citizen :</td>
                  <td>{{ countApprovedSenior }}</td>
                </tr>
                <tr>
                  <td>Number of PWD :</td>
                  <td>{{ countApprovedPWD }}</td>
                </tr>
                <tr>
                  <td>Number of Manager :</td>
                  <td>{{ countApprovedManager }}</td>
                </tr>
                <tr>
                  <td>Number of Owner :</td>
                  <td>{{ countApprovedOwner }}</td>
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
      seniorCheck: [],
      senior_ids: [],
      pwdCheck: [],
      pwd_ids: [],
      managerCheck: [],
      manager_ids: [],
      ownerCheck: [],
      owner_ids: [],
      discount_id: {},
      discountForm: new Form({
        ids: [],
        discountIds: [],
        requests: [],
        ticket_id: null
      })
    }
  },
  computed: {
    seniorListDiscount() {
      let senior = []

      this.discount_details.forEach(data => {
        if (data.discount_id === 1) {
          senior.push(data)
        }
      })

      return senior
    },
    pwdListDiscount() {
      let pwd = []

      this.discount_details.forEach(data => {
        if (data.discount_id === 2) {
          pwd.push(data)
        }
      })

      return pwd
    },
    managerListDiscount() {
      let manager = []

      this.discount_details.forEach(data => {
        if (data.discount_id === 3) {
          manager.push(data)
        }
      })

      return manager
    },
    ownerListDiscount() {
      let owner = []

      this.discount_details.forEach(data => {
        if (data.discount_id === 4) {
          owner.push(data)
        }
      })

      return owner
    },
    countApprovedSenior() {
      let numOfTrue = 0
      for (var i = 0; i < this.discountForm.discountIds.length; i++) {
        if (this.discountForm.discountIds[i] === 1) {
          if (this.discountForm.requests[i] == '1') {
            numOfTrue++
          }
        }
      }

      return numOfTrue
    },
    countApprovedPWD() {
      let numOfTrue = 0
      for (var i = 0; i < this.discountForm.discountIds.length; i++) {
        if (this.discountForm.discountIds[i] === 2) {
          if (this.discountForm.requests[i] == '1') {
            numOfTrue++
          }
        }
      }

      return numOfTrue
    },
    countApprovedManager() {
      let numOfTrue = 0
      for (var i = 0; i < this.discountForm.discountIds.length; i++) {
        if (this.discountForm.discountIds[i] === 3) {
          if (this.discountForm.requests[i] == '1') {
            numOfTrue++
          }
        }
      }

      return numOfTrue
    },
    countApprovedOwner() {
      let numOfTrue = 0
      for (var i = 0; i < this.discountForm.discountIds.length; i++) {
        if (this.discountForm.discountIds[i] === 4) {
          if (this.discountForm.requests[i] == '1') {
            numOfTrue++
          }
        }
      }

      return numOfTrue
    }
  },
  methods: {
    async fetchRequestDiscount(ticket_id) {
      const { data } = await axios.get(
        `/order/fetch_request_discounts/${ticket_id}`
      )
      this.discount_details = data
      this.discount(data)
    },
    countDiscount(data) {
      let senior = 0,
        pwd = 0,
        manager = 0,
        owner = 0

      data.forEach(discount => {
        if (discount.discount_id === 1) {
          senior += 1
        } else if (discount.discount_id === 2) {
          pwd += 1
        } else if (discount.discount_id === 3) {
          manager += 1
        } else {
          owner += 1
        }
      })

      return {
        senior,
        pwd,
        manager,
        owner
      }
    },
    discount(data) {
      this.discountForm.ids = []
      this.discountForm.discountIds = []
      this.discountForm.requests = []

      for (const key in data) {
        this.discountForm.ids.push(data[key].id)
        this.discountForm.discountIds.push(data[key].discount_id)
        this.discountForm.requests.push(
          data[key].customer_discount_status === null
            ? '0'
            : data[key].customer_discount_status.status
        )

        if (data[key].discount_id === 1) {
          this.seniorCheck.push('0')
          this.senior_ids.push(data[key].id)
        }

        if (data[key].discount_id === 2) {
          this.pwdCheck.push('0')
          this.pwd_ids.push(data[key].id)
        }

        if (data[key].discount_id === 3) {
          this.managerCheck.push('0')
          this.manager_ids.push(data[key].id)
        }

        if (data[key].discount_id === 4) {
          this.ownerCheck.push('0')
          this.owner_ids.push(data[key].id)
        }
      }
    },
    approved(id) {
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
        this.discountForm.requests.splice(arryIndex, 1, '1')

        if (this.senior_ids.indexOf(id) > -1) {
          var seniorIndex = this.senior_ids.indexOf(id)
          this.seniorCheck.splice(seniorIndex, 1, '1')
        }

        if (this.pwd_ids.indexOf(id) > -1) {
          var pwdIndex = this.pwd_ids.indexOf(id)
          this.pwdCheck.splice(pwdIndex, 1, '1')
        }

        if (this.manager_ids.indexOf(id) > -1) {
          var managerIndex = this.manager_ids.indexOf(id)
          this.managerCheck.splice(managerIndex, 1, '1')
        }

        if (this.owner_ids.indexOf(id) > -1) {
          var ownerIndex = this.owner_ids.indexOf(id)
          this.ownerCheck.splice(ownerIndex, 1, '1')
        }
      }
    },
    disapproved(id) {
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
        this.discountForm.requests.splice(arryIndex, 1, '0')

        if (this.senior_ids.indexOf(id) > -1) {
          var seniorIndex = this.senior_ids.indexOf(id)
          this.seniorCheck.splice(seniorIndex, 1, '1')
        }

        if (this.pwd_ids.indexOf(id) > -1) {
          var pwdIndex = this.pwd_ids.indexOf(id)
          this.pwdCheck.splice(pwdIndex, 1, '1')
        }

        if (this.manager_ids.indexOf(id) > -1) {
          var managerIndex = this.manager_ids.indexOf(id)
          this.managerCheck.splice(managerIndex, 1, '1')
        }

        if (this.owner_ids.indexOf(id) > -1) {
          var ownerIndex = this.owner_ids.indexOf(id)
          this.ownerCheck.splice(ownerIndex, 1, '1')
        }
      }
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

      $('img#customer_id').attr('src', 'http://172.16.43.239:2000/' + image)
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
