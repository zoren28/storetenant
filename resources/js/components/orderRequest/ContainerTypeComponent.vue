<!-- @format -->

<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Number of Bag</h4>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-hidden="true"
        >
          ×
        </button>
      </div>
      <form @submit.prevent="checkContainerForm" method="post">
        <div class="modal-body p-4">
          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive">
                <table
                  class="table table-sm table-bordered table-hover"
                  id="dt-listContainer"
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th></th>
                      <th>Container Type</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(g, index) in getList" :key="index">
                      <input
                        name="chkId[]"
                        type="checkbox"
                        class="chk_"
                        :class="'chk_' + g.id"
                        v-show="false"
                        :value="g.id"
                      />
                      <span
                        v-show="false"
                        class="container_"
                        :class="'container_' + g.id"
                        >{{ g.id }}</span
                      >
                      <td>
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input chk chk_"
                            :id="'chk_' + g.id"
                            @change="selectChkbox(g.id)"
                          />
                          <label
                            class="custom-control-label"
                            :for="'chk_' + g.id"
                          ></label>
                        </div>
                      </td>
                      <td>{{ g.container_type }}</td>
                      <td>
                        <input
                          type="number"
                          size="2"
                          min="0"
                          class="form-control quantity_"
                          :class="'quantity_' + g.id"
                          :id="g.id"
                          @keyup="containerQty(g.id)"
                          @change="containerQty(g.id)"
                          disabled
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
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
            Submit
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
  name: 'ContainerTypeComponent',
  props: ['productItem'],
  data() {
    return {
      clickSubmit: false,
      table_data: {},
      containerForm: new Form({
        ticket_id: null,
        container_ids: [],
        container_quantities: []
      })
    }
  },
  computed: {
    getList() {
      return this.table_data
    }
  },
  methods: {
    fetchContainerType() {
      $('input.chk_').prop('checked', false)
      $('input.quantity_').val('')
      $('input.quantity_').prop('disabled', true)

      axios.get('/container/fetch_active_container_type').then(response => {
        this.table_data = response.data

        var this_data = this
        setTimeout(function() {
          this_data.table = $('#dt-listContainer').DataTable({
            destroy: true,
            order: [[0, 'asc']],
            columnDefs: [
              {
                targets: [0],
                orderable: false,
                className: 'text-center'
              },
              {
                targets: [1, 2],
                orderable: false,
                width: '45%'
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
        }, 100)
      })
    },
    selectChkbox(i) {
      var checkBox = $('input#chk_' + i)
      if (checkBox.is(':checked')) {
        $('input.chk_' + i).prop('checked', true)
        $('input.quantity_' + i).prop('disabled', false)
        $('input.quantity_' + i).val('1')

        var container_id = $('span.container_' + i).text()
        var quantity = $('input.quantity_' + i).val()

        var thisArray = this.containerForm.container_ids
        var thisArray2 = this.containerForm.container_quantities
        if (thisArray.indexOf(container_id) > -1) {
          var arryIndex = thisArray.indexOf(container_id)
          thisArray2.splice(arryIndex, 1, quantity)
        } else {
          this.containerForm.container_ids.push(container_id)
          this.containerForm.container_quantities.push(quantity)
        }
      } else {
        $('input.chk_' + i).prop('checked', false)
        $('input.quantity_' + i).prop('disabled', true)
        $('input.quantity_' + i).val('')

        var container_id = $('span.container_' + i).text()
        var quantity = $('input.quantity_' + i).val()

        var thisArray = this.containerForm.container_ids
        var thisArray2 = this.containerForm.container_quantities
        if (thisArray.indexOf(container_id) > -1) {
          var arryIndex = thisArray.indexOf(container_id)
          thisArray.splice(arryIndex, 1)

          if (quantity !== '' || parseInt(quantity) !== 0) {
            thisArray2.splice(arryIndex, 1)
          }
        }
      }
    },
    containerQty(id) {
      var quantity = $('input.quantity_' + id).val()
      var container_id = $('span.container_' + id).text()

      if (quantity !== '' && parseInt(quantity) !== 0) {
        var thisArray = this.containerForm.container_ids
        var thisArray2 = this.containerForm.container_quantities
        if (thisArray.indexOf(container_id) > -1) {
          var arryIndex = thisArray.indexOf(container_id)
          thisArray2.splice(arryIndex, 1, quantity)
        } else {
          this.containerForm.container_ids.push(container_id)
          this.containerForm.container_quantities.push(quantity)
        }
      } else {
        $('input.quantity_' + id).val('1')

        var thisArray = this.containerForm.container_ids
        var thisArray2 = this.containerForm.container_quantities
        if (thisArray.indexOf(container_id) > -1) {
          var arryIndex = thisArray.indexOf(container_id)
          thisArray2.splice(arryIndex, 1, '1')
        } else {
          this.containerForm.container_ids.push(container_id)
          this.containerForm.container_quantities.push('1')
        }
      }
    },
    checkContainerForm() {
      this.clickSubmit = true

      if (
        this.containerForm.container_ids.length === 0 ||
        this.containerForm.container_quantities === 0
      ) {
        this.clickSubmit = false
        if (this.containerForm.container_ids.length === 0) {
          Swal.fire({
            type: 'warning',
            title: 'Warning',
            text: 'Please choose at least one container type!'
          }).then(result => {
            return
          })
        }

        if (this.containerForm.container_quantities === 0) {
          Swal.fire({
            type: 'warning',
            title: 'Warning',
            text: 'Container Quantity is required!'
          }).then(result => {
            return
          })
        }
      } else {
        this.containerForm
          .submit('post', '/order/tag_for_pickup', {
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
            this.clickSubmit = false

            if (message === 'success') {
              const { change } = data
              const { no_tenants } = data
              Swal.fire({
                type: 'success',
                title: 'Success',
                allowOutsideClick: false,
                text: 'Customer Order has been tagged for pick up!'
              }).then(result => {
                this.$parent.table.destroy()
                this.$parent.table_data = []

                if (change == '00.00' || change == '0.00') {
                  if (no_tenants > 1) {
                    Swal.fire({
                      type: 'info',
                      title: 'Information',
                      text: 'Your the last tenant who Tag for Pick up'
                    }).then(result => {
                      this.$parent.fetchPendingOrder()
                      this.containerForm.clear()
                      this.containerForm.reset()
                      $('div#container_type').modal('hide')
                    })
                  } else {
                    this.$parent.fetchPendingOrder()
                    this.containerForm.clear()
                    this.containerForm.reset()
                    $('div#container_type').modal('hide')
                  }
                } else {
                  Swal.fire({
                    type: 'info',
                    title: 'Information',
                    text: 'Please prepare for customer change of ₱ ' + change
                  }).then(result => {
                    this.$parent.fetchPendingOrder()
                    this.containerForm.clear()
                    this.containerForm.reset()
                    $('div#container_type').modal('hide')
                  })
                }
              })
            } else {
              Swal.fire({
                type: 'success',
                title: 'Success',
                text: message
              }).then(result => {
                this.$parent.fetchPendingOrder()
                this.containerForm.clear()
                this.containerForm.reset()
                $('div#container_type').modal('hide')
              })
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
    }
  },
  watch: {
    productItem: function(item) {
      this.containerForm.ticket_id = item.ticket_id
      this.fetchContainerType()
    }
  }
}
</script>
