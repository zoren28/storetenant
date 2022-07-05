<!-- @format -->

<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item">
                <a href="javascript: void(0);">Setup</a>
              </li>
              <li class="breadcrumb-item active">Product List</li>
            </ol>
          </div>
          <h4 class="page-title">Product List</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <button
                  v-if="clickAddProduct === false"
                  class="btn btn-primary waves-effect waves-light float-right"
                  @click="addProduct"
                >
                  <i class="fas fa-plus-circle"></i> &nbsp; Add Product
                </button>
                <button
                  v-else
                  class="btn btn-primary waves-effect waves-light float-right"
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
            <hr />
            <table
              id="dt-product-list"
              class="table table-sm table-hover"
              width="100%"
            >
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stocks</th>
                  <th>UOM</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(g, index) in getList" :key="index">
                  <td>
                    <a
                      href="javascript:void(0);"
                      style="cursor: pointer;"
                      @click="viewProduct(g.product_id, g.uom_id)"
                    >
                      <span class="font-weight-bold text-dark">{{
                        g.product_name
                      }}</span>
                    </a>
                  </td>
                  <td>
                    <span class="text-dark">{{ g.description }}</span>
                  </td>
                  <td>
                    <span class="text-dark" v-if="g.price !== 0"
                      >₱ {{ g.price }}</span
                    >
                  </td>
                  <td>
                    <span class="text-dark">{{ g.stocks }}</span>
                  </td>
                  <td width="10%">
                    <span v-if="g.uom_id !== null" class="text-dark">{{
                      g.uoms.length > 0 ? g.uoms[0].unit_measure : ''
                    }}</span>
                  </td>
                  <td>
                    <img
                      :src="'storage/' + g.image"
                      width="90"
                      height="60"
                      loading="lazy"
                    />
                  </td>
                  <td>
                    <span class="text-dark" v-if="g.active === 1">yes</span>
                    <span class="text-dark" v-else>no</span>
                  </td>
                  <td>
                    <span class="text-dark" v-if="g.available === 1">yes</span>
                    <span class="text-dark" v-else>no</span>
                  </td>
                  <td>
                    <button
                      class="btn btn-sm btn-light btn-rounded"
                      :class="'update-button-' + g.product_id"
                      @click="editProduct(g.product_id)"
                      data-wenk="Edit Product"
                    >
                      <i class="text-primary remixicon-file-edit-line"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-light btn-rounded"
                      :class="'update-product-' + g.product_id"
                      style="display:none;"
                    >
                      <span
                        class="spinner-border spinner-border-sm text-primary"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </button>
                    <button
                      v-if="g.active === 0"
                      class="btn btn-sm btn-light btn-rounded"
                      @click="changeStatus(index, g.product_id, 1)"
                      data-wenk="Activate Product"
                      data-wenk-pos="left"
                    >
                      <i class="text-success remixicon-check-fill"></i>
                    </button>
                    <button
                      v-else
                      class="btn btn-sm btn-light btn-rounded"
                      @click="changeStatus(index, g.product_id, 0)"
                      data-wenk="Deactivate Product"
                      data-wenk-pos="left"
                    >
                      <i class="text-danger remixicon-close-fill"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-light btn-rounded"
                      @click="updateStocks(g.id)"
                      data-wenk="Input Available Stocks"
                      data-wenk-pos="left"
                    >
                      <i class="text-primary remixicon-shopping-bag-line"></i>
                    </button>
                    <!-- <button
                      class="btn btn-sm btn-light btn-rounded"
                      @click="deleteProduct(g.product_id, g.id)"
                      data-wenk="Delete Product"
                    >
                      <i class="text-danger remixicon-delete-bin-2-line"></i>
                    </button> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end card body-->
        </div>
        <!-- end card -->
      </div>
      <!-- end col-->
    </div>
    <!-- end row-->

    <div
      id="modal-add-product"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <add-product
        :fd_types="fd_types"
        :fd_unit_measures="fd_unit_measures"
        :fd_suggestion="fd_suggestion"
        :fd_drinks="fd_drinks"
        :fd_fries="fd_fries"
        :fd_choice_sides="fd_choice_sides"
        :fd_addon_drinks="fd_addon_drinks"
        :fd_addon_sides="fd_addon_sides"
        :fd_dessert="fd_dessert"
        :fd_upgradable_item="fd_upgradable_item"
      />
    </div>
    <!-- /.modal -->

    <div
      id="modal-edit-product"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <edit-product
        :fd_types="fd_types"
        :fd_unit_measures="fd_unit_measures"
        :fd_suggestion="fd_suggestion"
        :fd_drinks="fd_drinks"
        :fd_fries="fd_fries"
        :fd_choice_sides="fd_choice_sides"
        :fd_addon_drinks="fd_addon_drinks"
        :fd_dessert="fd_dessert"
        :fd_addon_sides="fd_addon_sides"
        :fd_upgradable_item="fd_upgradable_item"
        :product_info="product_info"
      />
    </div>
    <!-- /.modal -->

    <div
      id="viewFoodProductDetail"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <product-details-modal
        :mode="modalMode"
        :addItemOrderForm="addItemOrderForm"
        :editItemOrderForm="editItemOrderForm"
        :foodProductDetails="foodProductDetails"
        @closeFoodProductDetail="closeFoodProductDetail"
      />
    </div>

    <div
      id="modal-location-range"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <location-range
        :location_range="location_range"
        @close-modal="closeModal"
      />
    </div>
  </div>
</template>
<script>
import AddProduct from './product/AddProductComponent'
import EditProduct from './product/EditProductComponent'
import ProductDetailsModal from '../orderRequest/Food/Items/ProductDetailsModal'
import LocationRange from './product/LocationRangeComponent'

export default {
  components: {
    AddProduct,
    EditProduct,
    ProductDetailsModal,
    LocationRange
  },
  data() {
    return {
      addItemOrderForm: this.newAddForm(),
      editItemOrderForm: {},
      foodProductDetails: {},
      modalMode: 'View',
      table_data: [],
      table: {},
      params: {},
      product_info: {},
      edit_prod: false,
      fd_types: [],
      fd_unit_measures: [],
      fd_suggestion: [],
      fd_drinks: [],
      fd_fries: [],
      fd_choice_sides: [],
      fd_addon_drinks: [],
      fd_addon_sides: [],
      fd_dessert: [],
      fd_upgradable_item: [],
      location_range: [],
      clickAddProduct: false
    }
  },

  computed: {
    getList() {
      return this.table_data
    }
  },

  methods: {
    closeFoodProductDetail() {
      this.addItemOrderForm = this.newAddForm()
    },
    closeModal() {
      $('div#modal-location-range').modal('hide')
      setTimeout(() => {
        $('body').addClass('modal-open')
      }, 500)
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
          productId: null,
          price: null
        },
        aDrinks: [],
        aSides: [],
        aDesserts: []
      }
    },
    async fetchProductList() {
      if ($.fn.DataTable.isDataTable('#dt-product-list')) {
        this.table.destroy()
        this.table_data = []
      }

      const response = await axios.get('/product/fetch_product_list')
      this.table_data = response.data

      var this_data = this
      setTimeout(function() {
        this_data.table = $('#dt-product-list').DataTable({
          destroy: true,
          stateSave: true,
          order: [[0, 'asc']],
          columnDefs: [
            {
              targets: [1, 2, 3],
              orderable: false
            },
            {
              targets: [4, 5, 6, 7],
              orderable: false,
              className: 'text-center'
            },
            {
              targets: [8],
              orderable: false,
              width: '20%',
              className: 'text-center'
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
    },
    async fetch_product_type() {
      return axios.get('/product/fetch_product_type')
    },
    async fetch_addons() {
      return axios.get('/product/fetch_addons')
    },
    async fetch_unit_measures() {
      return axios.get('/product/fetch_unit_measures')
    },
    async fetch_suggestion() {
      return axios.get('/suggestion/fetch_active_suggestions')
    },
    async fetch_drinks() {
      return axios.get('/product/fetch_drinks')
    },
    async fetch_fries() {
      return axios.get('/product/fetch_fries')
    },
    async fetch_choice_sides() {
      return axios.get('/product/fetch_choice_sides')
    },
    async fetch_addon_drinks() {
      return axios.get('/product/fetch_addon_drinks')
    },
    async fetch_addon_sides() {
      return axios.get('/product/fetch_addon_sides')
    },
    async fetch_dessert() {
      return axios.get('/product/fetch_dessert')
    },
    async fetch_upgradable_item() {
      return axios.get('/product/fetch_upgradable_item')
    },
    async fetch_location_range() {
      return axios.get('/product/fetch_location_range')
    },
    async addProduct() {
      this.clickAddProduct = true
      const [
        fd_types,
        fd_unit_measures,
        fd_suggestion,
        fd_drinks,
        fd_fries,
        fd_choice_sides,
        fd_addon_drinks,
        fd_addon_sides,
        fd_dessert,
        fd_upgradable_item,
        location_range
      ] = await Promise.all([
        this.fetch_product_type(),
        this.fetch_unit_measures(),
        this.fetch_suggestion(),
        this.fetch_drinks(),
        this.fetch_fries(),
        this.fetch_choice_sides(),
        this.fetch_addon_drinks(),
        this.fetch_addon_sides(),
        this.fetch_dessert(),
        this.fetch_upgradable_item(),
        this.fetch_location_range()
      ])

      this.fd_types = fd_types.data
      this.fd_unit_measures = fd_unit_measures.data
      this.fd_suggestion = fd_suggestion.data
      this.fd_drinks = fd_drinks.data
      this.fd_fries = fd_fries.data
      this.fd_choice_sides = fd_choice_sides.data
      this.fd_addon_drinks = fd_addon_drinks.data
      this.fd_addon_sides = fd_addon_sides.data
      this.fd_dessert = fd_dessert.data
      this.fd_upgradable_item = fd_upgradable_item.data
      this.location_range = location_range.data

      $('div#modal-add-product').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })

      this.clickAddProduct = false
    },
    async editProduct(product_id) {
      $('button.update-button-' + product_id).hide()
      $('button.update-product-' + product_id).show()
      const [
        fd_types,
        fd_unit_measures,
        fd_suggestion,
        fd_drinks,
        fd_fries,
        fd_choice_sides,
        fd_addon_drinks,
        fd_addon_sides,
        fd_dessert,
        fd_upgradable_item,
        location_range
      ] = await Promise.all([
        this.fetch_product_type(),
        this.fetch_unit_measures(),
        this.fetch_suggestion(),
        this.fetch_drinks(),
        this.fetch_fries(),
        this.fetch_choice_sides(),
        this.fetch_addon_drinks(),
        this.fetch_addon_sides(),
        this.fetch_dessert(),
        this.fetch_upgradable_item(),
        this.fetch_location_range()
      ])

      this.fd_types = fd_types.data
      this.fd_unit_measures = fd_unit_measures.data
      this.fd_suggestion = fd_suggestion.data
      this.fd_drinks = fd_drinks.data
      this.fd_fries = fd_fries.data
      this.fd_choice_sides = fd_choice_sides.data
      this.fd_addon_drinks = fd_addon_drinks.data
      this.fd_addon_sides = fd_addon_sides.data
      this.fd_dessert = fd_dessert.data
      this.fd_upgradable_item = fd_upgradable_item.data
      this.location_range = location_range.data
      this.product_info = {
        product_id: product_id
      }

      $('div#modal-edit-product').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })

      $('button.update-button-' + product_id).show()
      $('button.update-product-' + product_id).hide()
    },
    changeStatus(val, product_id, status) {
      this.params = {
        id: product_id,
        status: status
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
            .post('/product/update_status', this.params)
            .then(({ data, status }) => {
              const { message } = data
              // $.gritter.add({
              //     image: '/assets/libs/gritter/images/confirm.png',
              //     title: 'Opsss!',
              //     text:  message
              // });

              Swal.fire({
                type: 'success',
                title: 'Success',
                text: message
              }).then(result => {
                this.fetchProductList()
              })
            })
        }
      })
    },
    updateStocks(id) {
      Swal.fire({
        title: 'Input available stocks:',
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
                  .put('/product/update_product_stock', this.params)
                  .then(({ data, status }) => {
                    const { message } = data
                    Swal.fire({
                      type: 'success',
                      title: 'Success',
                      text: message
                    }).then(result => {
                      this.fetchProductList()
                    })
                  })
              }
            })
          }
        }.bind(this)
      )
    },
    deleteProduct(product_id, id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          axios
            .delete(`/product/delete_product/${product_id}/${id}`)
            .then(({ data, status }) => {
              const { message } = data

              Swal.fire({
                type: 'success',
                title: 'Success',
                text: message
              }).then(result => {
                this.fetchProductList()
              })
            })
        }
      })
    },
    async viewProduct(productId, uom_id) {
      this.modalMode = 'View'
      const { data } = await axios.get(`/product/details/${productId}`)
      this.foodProductDetails = data.productDetails

      this.addItemOrderForm.uomId = uom_id
      this.$set(this.foodProductDetails, 'quantity', 0)
      this.$set(this.foodProductDetails, 'uom_id', uom_id)
      $('#viewFoodProductDetail').modal('show')
    }
  },
  mounted() {
    this.fetchProductList()
  }
}
</script>
