<!-- @format -->

<template>
  <div class="row">
    <div class="col-md-12">
      <div class="d-flex justify-content-between mb-0">
        <h5>Add-on Drinks</h5>
        <span> </span>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div
            v-for="drink in drinksAddons"
            :key="drink.id"
            class="form-group d-flex justify-content-between"
          >
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                name="food-drink"
                :disabled="
                  productStatus(drink.availability, drink.uom_id) === 0
                "
                :value="{
                  uomId: drink.uom_id,
                  productId: drink.addon_id,
                  price: drink.addon_price
                }"
                v-model="itemOrderForm.aDrinks"
                class="custom-control-input check-option dessert_"
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
  name: 'DrinksAddOns',
  props: {
    itemOrderForm: {
      type: Object,
      required: true
    },
    piece: {
      default: 0
    },
    drinksAddons: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedDrinksAddons() {
      return this.drinksAddons.sort((a, b) =>
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
    }
  }
}
</script>
