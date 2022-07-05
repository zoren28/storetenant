<!-- @format -->

<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
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
          <img
            v-if="foodProductDetails.hasOwnProperty('product')"
            :src="`/storage/${foodProductDetails.product.image}`"
            :alt="`${foodProductDetails.product.product_name} image`"
            width="350"
          />
        </div>
        <div class="product-informations mt-3">
          <div class="product-header d-flex justify-content-between">
            <h4
              v-if="foodProductDetails.hasOwnProperty('product')"
              class="product-name"
            >
              {{ foodProductDetails.product.product_name }}
            </h4>
            <span class="product-price mt-1">PHP {{ foodItemPrice }}</span>
          </div>
        </div>

        <hr v-if="hasUpgradableItems" />
        <UpgradableItems
          v-if="hasUpgradableItems"
          :upgradableItems="foodProductDetails.upgradable_items"
          :itemOrderForm="
            mode === 'Edit' ? editItemOrderForm : addItemOrderForm
          "
          :mode="mode"
        />

        <hr v-if="hasSizes" />
        <FoodSizes
          v-if="hasSizes"
          :sizes="foodProductDetails.food_sizes"
          :itemOrderForm="
            mode === 'Edit' ? editItemOrderForm : addItemOrderForm
          "
        />

        <template v-if="hasTenantSuggestions">
          <hr />
          <SuggestionChoices
            v-for="(suggestions, key) in foodProductDetails.product_suggestions"
            :suggestions="suggestions"
            :itemOrderForm="
              mode === 'Edit' ? editItemOrderForm : addItemOrderForm
            "
            :key="key"
          />
        </template>

        <hr v-if="hasDrinks" />
        <DrinksChoices
          v-if="hasDrinks"
          :drinksChoices="foodProductDetails.drinks_choices"
          :itemOrderForm="
            mode === 'Edit' ? editItemOrderForm : addItemOrderForm
          "
        />

        <hr v-if="hasSides" />
        <SidesChoices
          v-if="hasSides"
          :sidesChoices="foodProductDetails.sides_choices"
          :itemOrderForm="
            mode === 'Edit' ? editItemOrderForm : addItemOrderForm
          "
        />

        <hr v-if="hasFries" />
        <FriesChoices
          v-if="hasFries"
          :friesChoices="foodProductDetails.fries_choices"
          :itemOrderForm="
            mode === 'Edit' ? editItemOrderForm : addItemOrderForm
          "
        />

        <hr v-if="hasDrinksAddons" />
        <DrinksAddOns
          v-if="hasDrinksAddons"
          :drinksAddons="foodProductDetails.drinks_addons"
          :itemOrderForm="
            mode === 'Edit' ? editItemOrderForm : addItemOrderForm
          "
        />

        <hr v-if="hasSidesAddons" />
        <SidesAddOns
          v-if="hasSidesAddons"
          :sidesAddons="foodProductDetails.sides_addons"
          :itemOrderForm="
            mode === 'Edit' ? editItemOrderForm : addItemOrderForm
          "
        />

        <hr v-if="hasDessertsAddons" />
        <DessertsAddOns
          v-if="hasDessertsAddons"
          :dessertsAddons="foodProductDetails.desserts_addons"
          :itemOrderForm="
            mode === 'Edit' ? editItemOrderForm : addItemOrderForm
          "
        />

        <hr />
        <div class="row d-flex justify-content-between mb-0">
          <div class="col-md-6">
            <div class="row" v-if="mode !== 'View'">
              <div class="col-md-3" style="padding-top: 8px;">
                <label class="bold">Quantity</label>
              </div>
              <div class="col-md-9">
                <input
                  v-if="mode === 'Edit'"
                  type="number"
                  class="form-control"
                  v-model.number="editItemOrderForm.quantity"
                  min="1"
                />
                <input
                  v-else
                  type="number"
                  class="form-control"
                  v-model.number="addItemOrderForm.quantity"
                  min="1"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 d-flex flex-row-reverse">
            <button
              type="button"
              class="btn btn-secondary waves-effect"
              data-dismiss="modal"
            >
              Close
            </button>
            &nbsp;&nbsp;
            <button
              v-if="mode === 'Add'"
              type="button"
              class="btn btn-info waves-effect waves-light"
              :disabled="invalidItemOrderForm"
              @click="addToCart"
            >
              Add To Cart
            </button>
            <button
              v-if="mode === 'Edit'"
              type="button"
              class="btn btn-info waves-effect waves-light"
              @click="updateProduct"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SuggestionChoices from './SuggestionChoices'

import DrinksChoices from './DrinksChoices'
import SidesChoices from './SidesChoices'
import FriesChoices from './FriesChoices'

import DrinksAddOns from './DrinksAddOns'
import SidesAddOns from './SidesAddOns'
import DessertsAddOns from './DessertsAddOns'
import UpgradableItems from './UpgradableItems'

import FoodSizes from './FoodSizes'

export default {
  props: {
    mode: {
      type: String,
      default: 'Add'
    },
    addItemOrderForm: {
      type: Object,
      default() {
        return {}
      }
    },
    editItemOrderForm: {
      type: Object,
      default() {
        return {}
      }
    },
    foodProductDetails: {
      type: Object,
      required: true
    }
  },
  components: {
    SuggestionChoices,
    DrinksChoices,
    SidesChoices,
    FriesChoices,
    DrinksAddOns,
    SidesAddOns,
    DessertsAddOns,
    UpgradableItems,
    FoodSizes
  },
  data() {
    return {
      clickSubmit: false,
      unit_price: 0,
      updateModal: false
    }
  },
  watch: {
    foodProductDetails(newValue) {
      if (Object.keys(newValue).length) {
        if (this.mode === 'Edit') {
          this.editItemOrderForm.productId = newValue.product.product_id
          this.editItemOrderForm.uomId = newValue.primary_uom
        } else {
          this.addItemOrderForm.productId = newValue.product.product_id
          this.addItemOrderForm.uomId = newValue.primary_uom

          if (Object.keys(newValue.default_suggestions).length) {
            this.addItemOrderForm.suggestions = newValue.default_suggestions
          }

          if (newValue.default_drink !== null) {
            this.addItemOrderForm.cDrink = newValue.default_drink
          }

          if (newValue.default_fry !== null) {
            this.addItemOrderForm.cFry = newValue.default_fry
          }

          if (newValue.default_side !== null) {
            this.addItemOrderForm.cSide = newValue.default_side
          }

          if (newValue.default_size !== null) {
            this.addItemOrderForm.cSize = newValue.default_size
          }
        }
      }
    }
  },
  computed: {
    invalidItemOrderForm() {
      const form = this.addItemOrderForm
      for (const [key, value] of Object.entries(form)) {
        if (key === 'suggestions') {
          for (const data of Object.values(value)) {
            if (!data.product_suggestion_id) {
              return true
            }
          }
        }

        if (
          key === 'cDrink' &&
          this.foodProductDetails.hasOwnProperty('drinks_choices') &&
          this.foodProductDetails.drinks_choices.length > 0 &&
          !value.productId
        ) {
          return true
        }

        if (
          key === 'cFry' &&
          this.foodProductDetails.hasOwnProperty('fries_choices') &&
          this.foodProductDetails.fries_choices.length > 0 &&
          !value.productId
        ) {
          return true
        }

        if (
          key === 'cSide' &&
          this.foodProductDetails.hasOwnProperty('sides_choices') &&
          this.foodProductDetails.sides_choices.length > 0 &&
          !value.productId
        ) {
          return true
        }

        if (
          key === 'cSize' &&
          this.foodProductDetails.hasOwnProperty('food_sizes') &&
          this.foodProductDetails.food_sizes.length > 0 &&
          !value.price
        ) {
          return true
        }

        // if (key === 'uomId' && !value && form.cSize.required) {
        // 	return true
        // }

        if (key === 'quantity' && value <= 0) {
          return true
        }
      }
      return false
    },
    productHasNoUOM() {
      if (this.foodProductDetails.hasOwnProperty('product')) {
        const b = this.foodProductDetails.product.prices.length == 1

        const c = this.foodProductDetails.product.prices.every(
          price => !price.uom_id
        )

        return b && c
      }

      return false
    },
    foodItemPrice() {
      let product_price = 0
      if (this.foodProductDetails.hasOwnProperty('product')) {
        const prices = this.foodProductDetails.product.prices

        // if (prices.every(price => price.primary_uom === 0)) {
        // 	return prices[0].price
        // }

        // return prices.filter(price => price.primary_uom === 1)[0].price
        product_price = prices.filter(
          price => price.uom_id === this.foodProductDetails.uom_id
        )[0].price
        return product_price
      }

      return product_price
    },
    hasTenantSuggestions() {
      return (
        this.foodProductDetails.hasOwnProperty('product_suggestions') &&
        Object.keys(this.foodProductDetails.product_suggestions).length > 0
      )
    },
    hasDrinks() {
      if (
        this.foodProductDetails.hasOwnProperty('drinks_choices') &&
        this.foodProductDetails.drinks_choices.length > 0
      ) {
        // const defaultDrink = this.foodProductDetails.drinks_choices.filter(
        // 	drink => drink.default_choice
        // )[0].choice_id
        return true
      }

      return false
    },
    hasSides() {
      return (
        this.foodProductDetails.hasOwnProperty('sides_choices') &&
        this.foodProductDetails.sides_choices.length > 0
      )
    },
    hasFries() {
      return (
        this.foodProductDetails.hasOwnProperty('fries_choices') &&
        this.foodProductDetails.fries_choices.length > 0
      )
    },
    hasSizes() {
      return (
        this.foodProductDetails.hasOwnProperty('food_sizes') &&
        this.foodProductDetails.food_sizes.length > 1
      )
    },
    hasDrinksAddons() {
      return (
        this.foodProductDetails.hasOwnProperty('drinks_addons') &&
        this.foodProductDetails.drinks_addons.length > 0
      )
    },
    hasSidesAddons() {
      return (
        this.foodProductDetails.hasOwnProperty('sides_addons') &&
        this.foodProductDetails.sides_addons.length > 0
      )
    },
    hasDessertsAddons() {
      return (
        this.foodProductDetails.hasOwnProperty('desserts_addons') &&
        this.foodProductDetails.desserts_addons.length > 0
      )
    },
    hasUpgradableItems() {
      return (
        this.foodProductDetails.hasOwnProperty('upgradable_items') &&
        this.foodProductDetails.upgradable_items.length > 0
      )
    },
    defaultDrink() {
      return 1
    }
  },
  methods: {
    async updateProduct() {
      this.editItemOrderForm.price = this.foodItemPrice
      await axios.put(
        `/order/single_update/${this.editItemOrderForm.order_id}`,
        this.editItemOrderForm
      )

      swal({
        title: 'Success!',
        text: 'Product has been updated',
        type: 'success',
        allowOutsideClick: false,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary'
      }).then(
        function() {
          $('div#updateFoodProductDetail').modal('hide')
          this.$emit('closeFoodProductDetail')
          this.$emit('return-home')
          this.$parent.retrieveCustomerOrders()
        }.bind(this)
      )
      this.$parent.retrieveCustomerOrders()
      // this.$emit('retrieveCheckoutOrders')
    },
    async addToCart() {
      this.addItemOrderForm.price = this.foodItemPrice
      await axios.post('/order/single_store', this.addItemOrderForm)

      swal({
        title: 'Success!',
        text: 'Product has been added',
        type: 'success',
        allowOutsideClick: false,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary'
      }).then(
        function() {
          $('div#addFoodProductDetail').modal('hide')
          this.$emit('closeFoodProductDetail')
          this.$emit('return-home')
          this.$parent.retrieveCustomerOrders()
        }.bind(this)
      )
    },
    incrementQuantity() {
      if (this.mode === 'Edit') {
        this.editItemOrderForm.quantity += 1
      } else {
        this.addItemOrderForm.quantity += 1
      }
    },
    decrementQuantity() {
      if (this.mode === 'Edit') {
        if (this.editItemOrderForm.quantity > 1) {
          this.editItemOrderForm.quantity -= 1
        }
      } else {
        if (this.addItemOrderForm.quantity > 0) {
          this.addItemOrderForm.quantity -= 1
        }
      }
    },
    closeFoodProductDetail() {
      this.$emit('closeFoodProductDetail')
    }
  }
}
</script>
