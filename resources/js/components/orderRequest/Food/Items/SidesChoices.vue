<template>
    <div class="row">
      <div class="col-md-12">
      <div class="d-flex justify-content-between mb-0">
            <h5>Choice of Sides</h5>
            <span> 1REQUIRED</span>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div v-for="side in sidesChoices" :key="side.id" class="form-group d-flex justify-content-between">
                    <div class="custom-control custom-radio">
                        <input type="radio" 
                          name="food-side"
                          :disabled="productStatus(side.availability, side.uom_id) === 0"
                          :value="{ uomId: side.uom_id, productId: side.choice_id, price: side.addon_price }"
                          v-model="itemOrderForm.cSide"
                          class="custom-control-input check-option dessert_" :id="`food-side-${side.choice_id}`">
                        <label class="custom-control-label" :for="`food-side-${side.choice_id}`">
                          <span v-if="productStatus(side.availability, side.uom_id) === 0" class="text-danger">
                            <del>{{ side.uom ? side.uom.unit_measure : '' }} {{ side.sub_food_products.product_name }} </del>(Unavailable)
                          </span>
                          <span v-else>{{ side.uom ? side.uom.unit_measure : '' }} {{ side.sub_food_products.product_name }}</span>
                        </label>
                    </div>
                    <span :class="productStatus(side.availability, side.uom_id) === 0 ? 'text-danger' : ''" >{{ side.addon_price == '0.00' ? '' : `+ ₱ ${side.addon_price}` }}</span>
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
		sidesChoices: {
			type: Array,
			required: true
		}
	},
	computed: {
		sortedSidesChoices() {
			return this.sidesChoices.sort((a, b) =>
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