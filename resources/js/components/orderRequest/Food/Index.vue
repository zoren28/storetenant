<!-- @format -->

<template>
  <div class="main">
    <div class="container-fluid">
      <ul class="breadcrumb">
        <li class="active">categories</li>
      </ul>
      <div class="row margin-bottom-40">
        <div class="col-md-9 col-sm-7">
          <div class="portlet light">
            <div class="portlet-title">
              <!-- <div v-if="tT" class="caption">
                <img
                  class="img-rounded"
                  width="75"
                  height="75"
                  :src="`${superAdminDomain}${tenantData.logo}`"
                />
                {{ tenantData.tenant | capitalizeFirstLetter }} - {{ tenantData.business_unit.business_unit | capitalizeFirstLetter }}
              </div>-->
              <div class="actions">
                <router-link
                  :to="{ name: 'tenants', params: { business_unit: bu } }"
                  type="button"
                  class="btn btn-circle btn-default bold"
                >
                  <i class="fa fa-arrow-left"></i> Back to Tenants
                </router-link>
              </div>
            </div>
            <div class="portlet-body">
              <Items
                :tenant="tenant"
                :foodCategories="foodCategories"
                :foodProducts="foodProducts"
                :selectedCategory="selectedCategory"
                :editItemOrderForm="editItemOrderForm"
                :modalMode="modalMode"
                :foodProductDetails="foodProductDetails"
                @getResults="getResults"
                @searchForItem="searchForItem"
                @retrieveFoodProductsByCategory="retrieveFoodProductsByCategory"
                @viewProduct="viewProduct"
                @clearFoodProductDetails="clearFoodProductDetails"
              />
            </div>
          </div>
        </div>
        <div class="sidebar col-md-3 col-sm-5">
          <div class="portlet light">
            <div class="portlet-title bold">
              <div class="caption">{{ `${currentCustomer}'s Cart` }}</div>
              <div class="action">
                <router-link
                  tag="button"
                  :to="{ name: 'checkout' }"
                  v-if="$root.tempOrders.length > 0"
                  class="btn btn-primary btn-circle btn-block btn-sm bold"
                >Proceed to Checkout</router-link>
              </div>
            </div>
            <div class="portlet-body">
              <div style="max-height: 500px; overflow-y: auto;">
                <h4
                  v-if="$root.tempOrders.length === 0"
                  class="text-center bold"
                >No Orders to Display</h4>
                <div
                  class="portlet box grey"
                  v-for="tempOrder in $root.descendingTempOrders"
                  :key="tempOrder.id"
                >
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <img
                        width="30"
                        height="30"
                        :src="`${tenantDomain}${tempOrder.product.image}`"
                        alt
                      />
                      <a
                        href="javascript:;"
                        @click="editProduct(tempOrder.id, tempOrder.quantity, tempOrder.product_id)"
                      >{{ tempOrder.product.product_name }}</a>
                    </div>
                    <div class="panel-body">
                      <div class="col-md-12">
                        <div class="col-md-5">
                          <input
                            :value="tempOrder.quantity"
                            type="number"
                            min="1"
                            class="form-control form-control-sm"
                            @keyup="changeQuantity($event, tempOrder, productPrice(tempOrder.product.prices), tempOrder.total_price, tempOrder.quantity)"
                          />
                        </div>
                        <div
                          class="col-md-5"
                          style="margin-top: 9px;"
                        >₱ {{ tempOrder.total_price | numberFormat }}</div>
                        <div class="col-md-2 text-center" style="margin-top: 7px;">
                          <button
                            class="btn btn-xs btn-danger btn-circle"
                            @click="removeTempOrder(tempOrder.id)"
                          >
                            <i class="fa fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="portlet-footer">
              <div class="col-md-12">
                <router-link
                  tag="button"
                  :to="{ name: 'checkout' }"
                  v-if="$root.tempOrders.length > 0"
                  class="btn btn-primary btn-circle btn-block bold"
                >Proceed to Checkout</router-link>
                <button
                  v-else
                  disabled
                  class="btn btn-primary btn-circle btn-block bold"
                >No orders to display</button>
              </div>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/** @format */

import NProgress from 'nprogress'
import { csMixins } from '../../../mixins'
import Items from './Items/FoodItems'
import { debounce } from 'lodash'

export default {
  name: 'FoodIndex',
  props: {
    bu: {
      required: true
    },
    tenant: {
      required: true
    }
  },
  components: {
    Items
  },
  data() {
    return {
      modalMode: 'Add',
      isRetrievingProductDetails: false,
      foodCategories: [],
      foodProducts: {},
      editItemOrderForm: {},
      foodProductDetails: {},
      selectedCategory: {
        id: 0,
        text: 'All'
      }
    }
  },
  computed: {
    currentCustomer() {
      return this.$root.getCurrentCustomer
    }
  },
  methods: {
    clearFoodProductDetails() {
      this.foodProductDetails = {}
    },
    viewProduct(data) {
      this.modalMode = 'Add'
      this.foodProductDetails = data
      this.$set(this.foodProductDetails, 'quantity', 0)
    },
    async editProduct(tempOrderId, quantity, productId) {
      if (this.isRetrievingProductDetails) {
        return
      }
      this.modalMode = 'Edit'
      this.tempOrderId = tempOrderId
      this.isRetrievingProductDetails = true
      const [a, b] = await Promise.all([
        axios.get(
          `/products/tenant_product/${productId}?tempOrderId=${tempOrderId}`
        ),
        axios.get(`/temp_orders/product/${tempOrderId}`)
      ])

      this.foodProductDetails = a.data

      let suggestions = {}

      for (const [key, value] of Object.entries(b.data.suggestions)) {
        suggestions[key] = {
          product_suggestion_id: value[0].product_suggestion_id,
          addon_price: value[0].addon_price,
        }
      }

      console.log(suggestions)

      this.editItemOrderForm = {
        tempOrderId,
        productId: null,
        uomId: null,
        quantity,
        price: null,
        suggestions,
        cDrink: {
          uomId: b.data.drinks_choices.length
            ? b.data.drinks_choices[0].uom_id
            : null,
          productId: b.data.drinks_choices.length
            ? b.data.drinks_choices[0].choice_id
            : null,
          price: b.data.drinks_choices.length
            ? b.data.drinks_choices[0].addon_price
            : null
        },
        cSide: {
          uomId: b.data.sides_choices.length
            ? b.data.sides_choices[0].uom_id
            : null,
          productId: b.data.sides_choices.length
            ? b.data.sides_choices[0].choice_id
            : null,
          price: b.data.sides_choices.length
            ? b.data.sides_choices[0].addon_price
            : null
        },
        cFry: {
          uomId: b.data.fries_choices.length
            ? b.data.fries_choices[0].uom_id
            : null,
          productId: b.data.fries_choices.length
            ? b.data.fries_choices[0].choice_id
            : null,
          price: b.data.fries_choices.length
            ? b.data.fries_choices[0].addon_price
            : null
        },
        cSize: {
          uomId: b.data.sizes_choices.length
            ? b.data.sizes_choices[0].uom_id
            : null,
          productId: b.data.sizes_choices.length
            ? b.data.sizes_choices[0].choice_id
            : null,
          price: b.data.sizes_choices.length
            ? b.data.sizes_choices[0].addon_price
            : null
        },
        aSides: b.data.sides_addons.map(addon => {
          return {
            uomId: addon.uom_id,
            productId: addon.addon_id,
            price: addon.addon_price
          }
        }),
        aDesserts: b.data.desserts_addons.map(addon => {
          return {
            uomId: addon.uom_id,
            productId: addon.addon_id,
            price: addon.addon_price
          }
        })
      }

      this.$set(this.foodProductDetails, 'quantity', 0)
      this.$set(this.foodProductDetails, 'tempOrderId', tempOrderId)
      $('#foodProductDetail').modal('show')
      this.isRetrievingProductDetails = false
      // thisButton.disabled = false
      // thisButton.innerHTML = 'View'
    },
    productPrice(prices) {
      if (prices.every(price => price.primary_uom === 0)) {
        return prices[0].price
      }

      return prices.filter(price => price.primary_uom === 1)[0].price
    },
    changeQuantity(e, { id, product_id }, price, total_price, currentQuantity) {
      const quantity = e.target.value

      this.updateQuantity(
        e,
        quantity,
        { id, product_id },
        price,
        total_price,
        currentQuantity,
        this
      )
    },
    updateQuantity: debounce(
      async (
        e,
        quantity,
        { id, product_id },
        price,
        total_price,
        currentQuantity,
        vm
      ) => {
        if (quantity <= 0) {
          e.target.value = currentQuantity
        } else {
          await axios.put(`/orders/update_quantity`, {
            id,
            product_id,
            quantity,
            price,
            total_price
          })
          vm.$root.retrieveTempOrders()
        }
      },
      500
    ),
    async removeTempOrder(tempOrderId) {
      await this.$root.removeTempOrder(tempOrderId)
      toastr['info']('Removed from cart', 'Information')
    },
    async searchForItem({ searchItem, categoryId }) {
      NProgress.start()

      const { data } = await axios.get(
        `/products/tenant_search_products/${this.tenant}?category=${categoryId}&item=${searchItem}`
      )
      this.foodProducts = data
      NProgress.done()
    },
    async retrieveFoodProductsByCategory(categoryId) {
      NProgress.start()
      const { data } = await axios.get(
        `/products/tenant_products/${this.tenant}/${categoryId}`
      )
      this.foodProducts = data
      NProgress.done()
    },
    retrieveFoodCategories() {
      return axios.get(`/products/tenant_categories/${this.tenant}`)
    },
    retrieveFoodProducts() {
      return axios.get(`/products/tenant_products/${this.tenant}`)
    },
    retrieveTempOrders() {
      return axios.get(`/temp_orders`)
    },
    getResults(products) {
      this.foodProducts = products
      NProgress.done()
    },
    async initializeView() {
      const [categories, products, tempOrders] = await Promise.all([
        this.retrieveFoodCategories(),
        this.retrieveFoodProducts(),
        this.retrieveTempOrders()
      ])
      this.foodCategories = categories.data
      this.foodProducts = products.data
      this.$root.tempOrders = tempOrders.data
    }
  },
  created() {
    this.initializeView()
    NProgress.done()
  }
}
</script>
<style scoped>
/** @format */

.sortable-column {
  cursor: pointer;
}
.unavailable-row {
  color: #f2565c;
  /* text-decoration: line-through; */
}
</style>
