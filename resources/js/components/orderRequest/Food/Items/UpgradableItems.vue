<!-- @format -->

<template>
  <div class="row">
    <div class="col-md-12">
      <div class="d-flex justify-content-between mb-0">
        <h5>Upgrades</h5>
        <span></span>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div
            v-for="upgrade in upgradableItems"
            :key="upgrade.id"
            class="d-flex justify-content-between"
          >
            <div class="">
              <input
                type="radio"
                name="food-upgrade"
                :disabled="
                  productStatus(upgrade.availability, upgrade.uom_id) === 0
                "
                :value="{
                  uomId: upgrade.uom_id,
                  productId: upgrade.addon_id,
                  price: upgrade.addon_price
                }"
                v-model="itemOrderForm.upgradableItems"
                class=""
                :id="`food-upgrade-${upgrade.id}`"
              />
              <span
                v-if="productStatus(upgrade.availability, upgrade.uom_id) === 0"
                class="text-danger"
              >
                <del
                  >{{ upgrade.uom ? upgrade.uom.unit_measure : '' }}
                  {{ upgrade.sub_food_products.product_name }} </del
                >(Unavailable)
              </span>
              <span v-else
                >{{ upgrade.uom ? upgrade.uom.unit_measure : '' }}
                {{ upgrade.sub_food_products.product_name }}</span
              >
            </div>
            <div class="text-right">
              <span
                :class="
                  productStatus(upgrade.availability, upgrade.uom_id) === 0
                    ? 'text-danger'
                    : ''
                "
                >{{
                  upgrade.addon_price == '0.00'
                    ? ''
                    : `+ ₱ ${upgrade.addon_price}`
                }}</span
              >
            </div>
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
    upgradableItems: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedupgradableItems() {
      return this.upgradableItems.sort((a, b) =>
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
    productupgradeDetails(productupgrade, UOM) {
      return {
        name: productupgrade.product_name,
        uom: UOM ? UOM.unit_measure : ''
      }
    }
  }
}
</script>
