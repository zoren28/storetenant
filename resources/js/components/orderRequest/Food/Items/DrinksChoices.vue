<!-- @format -->

<template>
  <div class="row">
    <div class="col-md-12">
      <div class="d-flex justify-content-between mb-0">
        <h5>Choice of Drinks</h5>
        <span> 1REQUIRED</span>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div
            v-for="drink in drinksChoices"
            :key="drink.id"
            class="form-group d-flex justify-content-between"
          >
            <div class="custom-control custom-radio">
              <input
                type="radio"
                name="food-drink"
                :disabled="
                  productStatus(drink.availability, drink.uom_id) === 0
                "
                :value="{
                  uomId: drink.uom_id,
                  productId: drink.choice_id,
                  price: drink.addon_price
                }"
                v-model="itemOrderForm.cDrink"
                class="custom-control-input check-option drinks_"
                :id="`food-drink-${drink.id}`"
              />
              <label
                class="custom-control-label"
                :for="`food-drink-${drink.id}`"
              >
                <span
                  v-if="productStatus(drink.availability, drink.uom_id) === 0"
                  class="text-danger"
                >
                  <del
                    >{{ drink.uom ? drink.uom.unit_measure : '' }}
                    {{ drink.sub_food_products.product_name }} </del
                  >(Unavailable)
                </span>
                <span v-else
                  >{{ drink.uom ? drink.uom.unit_measure : '' }}
                  {{ drink.sub_food_products.product_name }}</span
                >
              </label>
            </div>
            <span
              :class="
                productStatus(drink.availability, drink.uom_id) === 0
                  ? 'text-danger'
                  : ''
              "
              >{{
                drink.addon_price == '0.00' ? '' : `+ ₱ ${drink.addon_price}`
              }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemOrderForm: {
      type: Object,
      required: true
    },
    piece: {
      default: 0
    },
    drinksChoices: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedDrinksChoices() {
      return this.drinksChoices.sort((a, b) =>
        a.sub_food_products.product_name.localeCompare(
          b.sub_food_products.product_name
        )
      )
    }
  },
  methods: {
    productStatus(availability, uomId) {
      const available = availability.filter(a => a.uom_id == uomId)

      if (available.length) {
        return available[0].available
      }

      return availability[0].available
    },
    productDrinkDetails(productDrink, UOM) {
      return {
        name: productDrink.product_name,
        uom: UOM ? UOM.unit_measure : ''
      }
    }
  }
}
</script>
