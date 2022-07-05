<!-- @format -->

<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Product Details</h4>
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
        @submit.prevent="checkProductForm"
        method="post"
        enctype="multipart/form-data"
      >
        <div class="modal-body p-4">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="control-label">Product Name</label>
                <span class="text-danger">*</span>
                <input
                  v-model="editProductForm.product_name"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': editProductForm.errors.has('product_name')
                  }"
                  placeholder="Product Name"
                  autocomplete="off"
                />
                <has-error
                  :form="editProductForm"
                  field="product_name"
                ></has-error>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="control-label">Product Image</label>
                <span class="text-danger">*</span>
                <input
                  type="file"
                  class="form-control"
                  :class="{ 'is-invalid': editProductForm.errors.has('image') }"
                  ref="image"
                  placeholder="Product Image"
                />
                <has-error :form="editProductForm" field="image"></has-error>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Categories <span class="text-danger">*</span></label>
                <br />
                <div
                  class="checkbox checkbox-primary"
                  v-for="(fd_type, index) in fd_types"
                  :key="index"
                >
                  <input
                    type="checkbox"
                    v-bind:value="fd_type.category_id"
                    v-model="editProductForm.categories"
                    :id="'editcategory_id_' + fd_type.category_id"
                  />
                  <label :for="'editcategory_id_' + fd_type.category_id">{{
                    fd_type.category
                  }}</label>
                  <br />
                </div>
                <small v-if="!editProductForm.categories.length"
                  ><code>Note:</code> Please choose atleast one category.</small
                >
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label
                      >Description <span class="text-danger">*</span></label
                    >
                    <textarea
                      v-model="editProductForm.description"
                      class="form-control"
                      rows="4"
                      :class="{
                        'is-invalid': editProductForm.errors.has('description')
                      }"
                    ></textarea>
                    <has-error
                      :form="editProductForm"
                      field="description"
                    ></has-error>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <a href="javascript:void(0)" @click="locationRange"
                      ><label>Location Range</label></a
                    >
                    <select
                      v-model="editProductForm.location_range"
                      class="form-control"
                      :class="{
                        'is-invalid': editProductForm.errors.has(
                          'location_range'
                        )
                      }"
                    >
                      <option value="0">Within the agreed location</option>
                      <option value="1">Rider's Fee is ₱ 30</option>
                      <option value="2"
                        >Rider's Fee is from ₱ 30 to ₱ 50</option
                      >
                      <option value="3"
                        >Rider's Fee is from ₱ 30 to ₱ 70</option
                      >
                      <option value="4"
                        >Rider's Fee is from ₱ 30 to ₱ 90</option
                      >
                      <option value="5"
                        >Rider's Fee is from ₱ 30 to ₱ 110</option
                      >
                      <option value="6"
                        >Rider's Fee is from ₱ 30 to ₱ 135</option
                      >
                      <option value="7"
                        >Rider's Fee is from ₱ 30 to ₱ 150</option
                      >
                    </select>
                    <has-error
                      :form="editProductForm"
                      field="location_range"
                    ></has-error>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Price <span class="text-danger">*</span></label>
                    <input
                      type="text"
                      v-model.number="editProductForm.price"
                      class="form-control"
                      :class="{
                        'is-invalid': editProductForm.errors.has('price')
                      }"
                      autocomplete="off"
                      @keyup="inputPrice('price', $event)"
                    />
                    <has-error
                      :form="editProductForm"
                      field="price"
                    ></has-error>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>No. of Item Available</label>
                    <input
                      class="form-control"
                      v-model.number="editProductForm.stocks"
                      type="number"
                      min="0"
                      :class="{
                        'is-invalid': editProductForm.errors.has('stocks')
                      }"
                    />
                    <has-error
                      :form="editProductForm"
                      field="stocks"
                    ></has-error>
                  </div>
                </div>
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
            Save changes
          </button>
          <button
            v-else
            class="btn btn-info waves-effect waves-light"
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
  name: 'EditProductComponent',
  props: ['fd_types', 'product_info'],
  data() {
    return {
      editProductForm: new Form({
        product_id: null,
        product_name: null,
        description: null,
        categories: [],
        stocks: null,
        price: null,
        location_range: 0
      }),
      clickSubmit: false
    }
  },
  methods: {
    async fetch_product_details(product_id) {
      const { data } = await axios.get(
        `/product/fetch_all_product_details/${product_id}`
      )

      this.product_details(data)
      this.category_type(data.product_categories)
      this.product_price(data.product_price)
    },
    product_details(data) {
      this.editProductForm.product_name = data.product_name
      this.editProductForm.description = data.description
      this.editProductForm.previous_image = data.image
      this.editProductForm.location_range = data.location_range
    },
    category_type(data) {
      for (const key in data) {
        this.editProductForm.categories.push(data[key].category_id)
      }
    },
    product_price(data) {
      this.editProductForm.stocks = data[0].stocks
      this.editProductForm.price = data[0].price
    },
    inputPrice(id, e) {
      var price = e.target.value
      if (price !== '' && isNaN(parseFloat(price)) === false) {
      } else {
        this.productForm.price = null
        $('input#' + id).val('')
      }
    },
    checkProductForm() {
      if (this.editProductForm.categories.length) {
        this.clickSubmit = true
        this.editProductForm.image = this.$refs.image.files[0]
        this.editProductForm
          .submit('post', '/product/update_all_product_details', {
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
                this.editProductForm.clear()
                this.editProductForm.reset()
                this.$refs.image.value = null

                $('div#modal-edit-product').modal('hide')
                this.$parent.fetchProductList()
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
      } else {
        Swal.fire({
          type: 'warning',
          title: 'Warning',
          text: 'Please choose atleast one category.'
        }).then(result => {
          return
        })
      }
    },
    locationRange() {
      $('div#modal-location-range').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    }
  },
  watch: {
    product_info: function(details) {
      this.editProductForm.clear()
      this.editProductForm.reset()
      this.editProductForm.product_id = details.product_id
      this.$refs.image.value = null
      this.fetch_product_details(details.product_id)
    }
  }
}
</script>
