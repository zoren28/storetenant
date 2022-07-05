<template>
    <div class="row">
      <div class="col-md-12">
      <div class="d-flex justify-content-between mb-0">
            <h5>Choice of Fries</h5>
            <span> 1REQUIRED</span>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div v-for="fry in friesChoices" :key="fry.id" class="form-group d-flex justify-content-between">
                    <div class="custom-control custom-radio">
                        <input type="radio" 
                          name="food-fry"
                          :disabled="productStatus(fry.availability, fry.uom_id) === 0"
                          :value="{ uomId: fry.uom_id, productId: fry.choice_id, price: fry.addon_price }"
                          v-model="itemOrderForm.cFry"
                          class="custom-control-input check-option dessert_" :id="`food-fry-${fry.choice_id}`">
                        <label class="custom-control-label" :for="`food-fry-${fry.choice_id}`">
                          <span v-if="productStatus(fry.availability, fry.uom_id) === 0" class="text-danger">
                            <del>{{ fry.uom ? fry.uom.unit_measure : '' }} {{ fry.sub_food_products.product_name }} </del>(Unavailable)
                          </span>
                          <span v-else>{{ fry.uom ? fry.uom.unit_measure : '' }} {{ fry.sub_food_products.product_name }}</span>
                        </label>
                    </div>
                    <span :class="productStatus(fry.availability, fry.uom_id) === 0 ? 'text-danger' : ''" >{{ fry.addon_price == '0.00' ? '' : `+ ₱ ${fry.addon_price}` }}</span>
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
		friesChoices: {
			type: Array,
			required: true
		}
	},
	computed: {
		sortedFriesChoices() {
			return this.friesChoices.sort((a, b) =>
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