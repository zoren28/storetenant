<!-- @format -->

<template>
  <div>
    <div class="modal-dialog modal-full">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Order</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-hidden="true"
          >
            ×
          </button>
        </div>
        <form @submit.prevent="checkAddOrderForm" method="post">
          <div class="modal-body p-4">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive">
                  <table
                    class="table table-sm table-hover table-bordered"
                    id="dt-product-menu"
                    width="100%"
                  >
                    <thead>
                      <tr>
                        <th>
                          <center>Item</center>
                        </th>
                        <th>Status</th>
                        <th style="white-space: nowrap;">Unit Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in getList" :key="index">
                        <td
                          v-if="item.uom_id === null"
                          style="white-space: nowrap;"
                        >
                          <a
                            href="javascript:void(0);"
                            style="cursor: pointer;"
                            class="text-dark"
                            @click="addProduct(item.product_id, item.uom_id)"
                          >
                            <img
                              :src="'/storage/' + item.image"
                              width="90"
                              height="60"
                            />
                            <span class="font-weight-bold">{{
                              item.product_name
                            }}</span>
                          </a>
                        </td>
                        <td v-else style="white-space: nowrap;">
                          <a
                            href="javascript:void(0);"
                            style="cursor: pointer;"
                            class="text-dark"
                            @click="addProduct(item.product_id, item.uom_id)"
                          >
                            <img
                              :src="'/storage/' + item.image"
                              width="90"
                              height="60"
                            />
                            <span class="font-weight-bold">{{
                              item.uoms[0].unit_measure +
                                ' ' +
                                item.product_name
                            }}</span>
                          </a>
                        </td>
                        <td>
                          <span
                            v-if="item.available === 1"
                            class="badge badge-light-success"
                            >Available</span
                          >
                          <span v-else class="badge badge-light-secondary"
                            >Unavailable</span
                          >
                        </td>
                        <td>
                          <span class="font-weight-bold"
                            >₱ {{ item.price }}</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </form>
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
</template>
<script>
export default {
  name: 'AddOrderComponent',
  props: ['orderDetails'],
  data() {
    return {
      table_data: [],
      table: {},
      order_productIds: [],
      canceled_status: [],
      ticket_id: null,
      addOrderForm: {},
      product_ids: [],
      product_quantities: [],
      product_price: [],
      mop: null,
      icoos: null,
      pickup_at: null,
      uom_id: null
    }
  },
  computed: {
    getList() {
      // if(Object.keys(this.table_data).length){
      //     loadData();
      // }
      return this.table_data
    }
  },
  methods: {
    async addProduct(productId, uom_id) {
      this.$emit('addProduct', {
        productId,
        ticket_id: this.ticket_id,
        icoos: this.icoos,
        pickup_at: this.pickup_at,
        mop: this.mop,
        uom_id: uom_id
      })
    },
    closeFoodProductDetail() {},
    async fetchProductList() {
      const response = await axios.get('/product/fetch_product_list')
      this.table_data = response.data

      var this_data = this
      setTimeout(function() {
        this_data.table = $('#dt-product-menu').DataTable({
          destroy: true,
          order: [[0, 'asc']],
          lengthMenu: [5, 10, 15, 20, 25],
          columnDefs: [
            {
              targets: [1],
              orderable: false
            },
            {
              targets: [2],
              orderable: false,
              className: 'text-right'
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
    }
  },
  watch: {
    orderDetails: function(item) {
      this.order_productIds = item[0].productIds
      this.canceled_status = item[0].cancelled_status
      this.ticket_id = item[0].ticket
      this.mop = item[0].mop
      this.icoos = item[0].icoos
      this.pickup_at = item[0].pickup_at
      this.product_ids = []
      this.product_quantities = []
      this.product_price = []
      this.fetchProductList()
    }
  }
}

function loadData() {}
</script>
