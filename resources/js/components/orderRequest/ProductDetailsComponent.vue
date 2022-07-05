<!-- @format -->

<template>
  <div class="modal-dialog" style="max-width:650px;">
    <div class="modal-content">
      <form @submit.prevent="checkProductDetails" method="post">
        <div class="modal-body">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-hidden="true"
          >
            ×
          </button>
          <div class="d-flex justify-content-center mt-4">
            <img :src="productForm.image" alt="" width="270" />
          </div>
          <div class="product-informations mt-3">
            <div class="product-header d-flex justify-content-between">
              <h4 class="product-name">
                {{ productForm.product_name }}
              </h4>
              <span class="product-price mt-1"
                >PHP {{ Number(productForm.price).toFixed(2) }}</span
              >
            </div>
          </div>
          <hr />
          <div v-for="(s, i) in fd_suggestion" :key="'suggestion' + i">
            <div class="d-flex justify-content-between mb-0">
              <h5>Choice of {{ s.suggestion }}</h5>
              <span> 1REQUIRED</span>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div
                  v-for="(item, index) in addon_suggestion"
                  :key="index"
                  class="form-group d-flex justify-content-between"
                >
                  <template v-if="s.id == item.suggestion_id">
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        name="flavor"
                        class="custom-control-input check-option dessert_"
                        :id="'suggestion_' + index"
                      />
                      <label
                        class="custom-control-label"
                        :for="'suggestion_' + index"
                        >{{}}</label
                      >
                    </div>
                    <span class="product-price"
                      >+ PHP {{ item.addon_price }}</span
                    >
                  </template>
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
            Update
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

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
export default {
  name: 'ProductDetailsComponent',
  props: ['product_details', 'fd_suggestion'],
  data() {
    return {
      clickSubmit: false,
      addon_suggestion: [],
      details_data: [],
      productForm: new Form({
        image: null,
        product_name: null,
        price: 0
      })
    }
  },
  methods: {
    async fetch_product_details(order_id, product_id) {
      const { data } = await axios.get(
        `/order/fetch_product_details/${order_id}/${product_id}`
      )
      this.productForm.image = '/storage/' + data.image
      this.productForm.product_name = data.product_name
      this.productForm.price = data.product_price
      this.addon_suggestion = data.addon_suggestion
      this.details_data = data
    }
  },
  watch: {
    product_details: function(data) {
      this.fetch_product_details(data.order_id, data.product_id)
    }
  }
}
</script>
<style>
.product-price {
  font-size: 15px;
  font-weight: 300;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  color: #707070;
  line-height: 24px;
}
</style>
