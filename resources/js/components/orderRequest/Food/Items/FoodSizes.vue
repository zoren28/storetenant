<template>
    <div class="row">
      <div class="col-md-12">
      <div class="d-flex justify-content-between mb-0">
            <h5>Choice of Size</h5>
            <span> 1REQUIRED</span>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div v-for="size in sizes" :key="size.id" class="form-group d-flex justify-content-between">
                    <div class="custom-control custom-radio">
                        <input type="radio" 
                          name="food-size"
                          :value="{ uomId: size.uom_id, price: size.price }"
                          :disabled="size.available === 0"
                          v-model="itemOrderForm.cSize"
                          class="custom-control-input check-option dessert_" :id="`food-uom-${size.id}`">
                        <label class="custom-control-label" :for="`food-uom-${size.id}`">
                          <span v-if="size.available === 0" class="text-danger">
                            <del>{{ size.uom ? `${size.uom.unit_measure}` : '' }} </del>(Unavailable)
                          </span>
                          <span>{{ size.uom ? `${size.uom.unit_measure}` : '' }}</span>
                        </label>
                    </div>
                    <span :class="size.available === 0 ? 'text-danger' : ''" >{{ size.price == '0.00' ? '' : `₱ ${size.price}` }}</span>
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
		sizes: {
			type: Array,
			required: true
		}
	}
}
</script>