<!-- @format -->

<template>
  <div class="row">
    <div class="col-md-12">
      <div class="d-flex justify-content-between mb-0">
        <h5>Add-on Desserts</h5>
        <span> </span>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div
            v-for="dessert in dessertsAddons"
            :key="dessert.id"
            class="form-group d-flex justify-content-between"
          >
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                name="food-dessert"
                :disabled="
                  productStatus(dessert.availability, dessert.uom_id) === 0
                "
                :value="{
                  uomId: dessert.uom_id,
                  productId: dessert.addon_id,
                  price: dessert.addon_price
                }"
                v-model="itemOrderForm.aDesserts"
                class="custom-control-input check-option dessert_"
                :id="`food-dessert-${dessert.id}`"
              />
              <label
                class="custom-control-label"
                :for="`food-dessert-${dessert.id}`"
              >
                <span
                  v-if="
                    productStatus(dessert.availability, dessert.uom_id) === 0
                  "
                  class="text-danger"
                >
                  <del
                    >{{ dessert.uom ? dessert.uom.unit_measure : '' }}
                    {{ dessert.sub_food_products.product_name }} </del
                  >(Unavailable)
                </span>
                <span v-else
                  >{{ dessert.uom ? dessert.uom.unit_measure : '' }}
                  {{ dessert.sub_food_products.product_name }}</span
                >
              </label>
            </div>
            <span
              :class="
                productStatus(dessert.availability, dessert.uom_id) === 0
                  ? 'text-danger'
                  : ''
              "
              >{{
                dessert.addon_price == '0.00'
                  ? ''
                  : `+ ₱ ${dessert.addon_price}`
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
    dessertsAddons: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedDessertsAddons() {
      return this.dessertsAddons.sort((a, b) =>
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
