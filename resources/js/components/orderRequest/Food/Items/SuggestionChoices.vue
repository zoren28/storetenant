<template>
    <div class="row">
      <div class="col-md-12">
      <div class="d-flex justify-content-between mb-0">
            <h5>{{suggestions[0].suggestion}}</h5>
            <span> 1REQUIRED</span>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div v-for="(suggestion, sIndex) in suggestions" :key="sIndex"  class="form-group d-flex justify-content-between">
                    <div class="custom-control custom-radio">
                        <input type="radio" 
                          :name="`food-suggestion-${suggestion.suggestion_id}`"
                          :disabled="suggestion.available === 0"
                          :value="{ 
                            product_suggestion_id: suggestion.product_suggestion_id, 
                            addon_price: suggestion.addon_price 
                          }"
                          v-model="itemOrderForm.suggestions[suggestion.suggestion_id]"
                          class="custom-control-input check-option dessert_" :id="`food-suggestion-${suggestion.suggestion_id}-${sIndex}`">
                        <label class="custom-control-label" :for="`food-suggestion-${suggestion.suggestion_id}-${sIndex}`">
                          <span v-if="suggestion.available === 0" class="text-danger">
                            <del>{{ suggestion.description }} </del>(Unavailable)
                          </span>
                          <span>{{ suggestion.description }}</span>
                        </label>
                    </div>
                    <span :class="suggestion.available === 0 ? 'text-danger' : ''" >{{ suggestion.addon_price == '0.00' ? '' : `+ ₱ ${suggestion.addon_price}` }}</span>
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
		suggestions: {
			type: Array,
			required: true
		}
	}
}
</script>