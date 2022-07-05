<template>
  <div class="container-fluid">
    <div class="row">
      <!-- <div class="col-md-12">
        <div class="form-group">
          <label for="category">Select Category</label>
          <select
            id="category"
            class="form-control"
            v-model="selectedCategory"
            @change="retrieveFoodProductsByCategory"
          >
            <option value="0" selected>All</option>
            <option
              v-for="category in foodCategories"
              :value="category.category_id"
              :key="category.category_id"
            >{{ category.category }}</option>
          </select>
        </div>
      </div>-->
      <!-- <div class="col-md-9">
        <div class="input-icon">
          <i class="fa fa-search"></i>
          <input
            v-model.trim="searchItem"
            type="text"
            class="form-control"
            placeholder="Search item name"
            @input="searchForItem"
          />
        </div>
      </div>-->
      <!-- <div class="col-md-3">
        <button
          class="btn btn-block btn-primary btn-circle bold"
          @click="addToCart"
          :disabled="invalidItemsSelection"
        >Add Selected Item(s) to Cart</button>
      </div>-->
    </div>
    <br />
    <table id="foodTable" class="table table-bordered table-responsive">
      <thead>
        <tr>
          <th class="text-center font-15" width="10%">Image</th>
          <th class="text-center font-15" width="30%">Name</th>
          <th class="text-center font-15" width="30%">Description</th>
          <th class="text-center font-15" width="10%">Unit Price</th>
          <th class="text-center font-15" width="10%">Status</th>
          <th class="text-center font-15" width="5%">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(food, foodIndex) in foodProducts" :key="foodIndex">
          <!-- <td class="text-center">
            <div class="checker">
              <span class="checked">
                <input
                  type="checkbox"
                  :value="food.product_id"
                  v-model="selectedFoodItems2"
                  @change="setSelectedFoodItem($event)"
                />
              </span>
            </div>
          </td>-->
          <td class="text-center">
            <img
              class="img-rounded"
              width="75"
              height="60"
              :src="tenantDomain + food.image"
              :alt="`${food.product_name} image`"
              loading="lazy"
            />
          </td>
          <td
            class="text-center font-15 bold"
            :class="{'text-red' : productIsUnavailable(food) === true}"
            v-text="food.product_name"
          ></td>
          <td
            class="text-center font-15"
            :class="{'text-red' : productIsUnavailable(food) === true}"
            v-text="food.description"
          ></td>
          <td
            class="text-center font-15 bold"
            :class="{'text-red' : productIsUnavailable(food) === true}"
          >₱ {{ productPrice(food.prices) }}</td>
          <td class="text-center font-15 bold">
            <span
              class="badge badge-success bold"
              v-if="productIsUnavailable(food) === false"
            >Available</span>
            <span
              class="badge badge-danger bold"
              v-else-if="productIsUnavailable(food) === true"
            >Unavailable</span>
          </td>

          <!-- <td v-if="food.prices.length" class="text-center font-15">
            <select
              :id="`uom-${food.product_id}`"
              :ref="`uom-${food.product_id}`"
              class="form-control text-center"
              :disabled="!selectedFoodItems2.includes(food.product_id)"
              v-model="selectedFoodUOM[food.product_id]"
              @input="setFoodItemDetails(food.product_id, $event)"
            >
              <option
                v-for="{id, uom_id, uom} in food.prices"
                :value="!uom_id ? 0 : uom_id"
                :key="id"
              >{{ uom ? uom.unit_measure : 'N/A' }}</option>
            </select>
          </td>-->
          <!-- <td class="text-center font-15" v-else v-text="'N/A'"></td> -->
          <!-- <td
            class="text-center font-15"
            v-html="foodItem[food.product_id] ? foodItem[food.product_id].status: ''"
          ></td>
          <td
            class="text-center font-15"
            v-html="foodItem[food.product_id] ? foodItem[food.product_id].price: ''"
          ></td>-->
          <!-- <td class="text-center font-15">₱ {{ foodItemUOMPrice(food.product_id) | numberFormat }}</td> -->
          <!-- <td class="text-center font-15">
            <input
              type="number"
              v-model.number="selectedFoodQuantity[food.product_id]"
              class="form-control form-control-sm"
              :disabled="!selectedFoodItems2.includes(food.product_id)"
              min="1"
            />
          </td>-->
          <td class="text-center font-15">
            <button
              class="btn btn-xs btn-info btn-circle bold"
              @click="viewProduct(food.product_id, $event)"
              :disabled="productIsUnavailable(food) === true"
            >View</button>
          </td>
        </tr>
      </tbody>
      <!-- <tbody v-else>
        <tr>
          <td class="text-center font-15" colspan="6">No item(s) found</td>
        </tr>
      </tbody>-->
    </table>
    <!-- <div class="pull-left">{{ tableDetails }}</div>
    <div class="pull-right">
      <Pagination
        :limit="2"
        align="right"
        :data="foodProducts"
        @pagination-change-page="getResults"
      ></Pagination>
    </div>-->

    <!-- Modal -->
    <ProductDetailsModal
      :foodProductDetails="foodProductDetails"
      :addItemOrderForm="addItemOrderForm"
      :editItemOrderForm="editItemOrderForm"
      :mode="modalMode"
      :toCart="toCart"
      @closeFoodProductDetail="closeFoodProductDetail"
      @newFormAdd="newFormAdd"
    />
  </div>
</template>

<script>
/** @format */
import { debounce } from 'lodash'
import Pagination from 'laravel-vue-pagination'
import NProgress from 'nprogress'
import ProductDetailsModal from './ProductDetailsModal'
import { DateTime, Interval } from 'luxon'

export default {
	name: 'FoodItems',
	props: {
		modalMode: {
			type: String,
			required: true
		},
		tenant: {
			required: true
		},
		foodCategories: {
			type: Array,
			required: true
		},
		foodProducts: {
			type: Array,
			required: true
		},
		editItemOrderForm: {
			type: Object
		},
		foodProductDetails: {
			type: Object
		}
	},
	components: {
		ProductDetailsModal,
		Pagination
	},
	data() {
		return {
			toCart: true,
			foodTable: {},
			searchItem: '',
			selectedCategory: 0,
			isRetrievingProductDetails: false,
			selectedFoodItems2: [],
			selectedFoodItems: {},
			selectedFoodUOM: {},
			selectedFoodQuantity: {},
			foodItem: {},
			addItemOrderForm: this.newAddForm()
		}
	},
	watch: {
		foodProducts(newValue) {
			setTimeout(() => {
				this.foodTable = $('#foodTable').DataTable({
					destroy: true
				})
			}, 100)
		},
		selectedFoodUOM(newValue) {
			for (const [key, value] of Object.entries(newValue)) {
				if (value === undefined) {
					this.$delete(newValue, key)
				}
			}
		}
	},
	computed: {
		// invalidItemsSelection() {
		// 	const a = this.selectedFoodItems2.length
		// 	const b = Object.keys(this.selectedFoodQuantity).length
		// 	const c = Object.keys(this.selectedFoodUOM).length
		// 	if (a === 0 || b === 0 || c === 0 || a !== b || a !== c) {
		// 		return true
		// 	}
		// 	for (const value of Object.values(this.selectedFoodQuantity)) {
		// 		if (value <= 0 || !value) {
		// 			return true
		// 		}
		// 		3
		// 	}
		// 	return false
		// }
		// hasProducts() {
		// 	if (this.foodProducts.hasOwnProperty('data')) {
		// 		return this.foodProducts.length > 0
		// 	}
		// 	return false
		// }
		// tableDetails() {
		// 	const total = this.foodProducts.total | 0,
		// 		from = this.foodProducts.from | 0,
		// 		to = this.foodProducts.to | 0
		// 	return `Items ${from} to ${to} of ${total} total`
		// }
	},
	methods: {
		newFormAdd() {
			this.addItemOrderForm.aDrinks = []
			this.addItemOrderForm.aSides = []
			this.addItemOrderForm.aDesserts = []
			this.addItemOrderForm.quantity = 0
		},
		newAddForm() {
			return {
				productId: null,
				uomId: null,
				quantity: 1,
				price: null,
				suggestions: {},
				cFlavor: {
					flavorId: null,
					price: null
				},
				cDrink: {
					uomId: null,
					productId: null,
					price: null
				},
				cSide: {
					uomId: null,
					productId: null,
					price: null
				},
				cFry: {
					uomId: null,
					productId: null,
					price: null
				},
				cSize: {
					uomId: null,
					price: null
				},
				aSides: [],
				aDrinks: [],
				aDesserts: []
			}
		},
		productPrice(productPrices) {
			const prices = productPrices.filter(price => price.primary_uom)

			if (prices.length) {
				return prices[0].price
			}

			return productPrices[0].price
		},
		productIsUnavailable({
			prices,
			breakfast,
			breakfast_start,
			breakfast_end
		}) {
			if (breakfast == 1) {
				const currentDateTime = this.$root.serverDateTime
				const breakFastStart = DateTime.fromSQL(breakfast_start).setZone(
					'Asia/Manila'
				)
				const breakFastEnd = DateTime.fromSQL(breakfast_end).setZone(
					'Asia/Manila'
				)

				const result = Interval.fromDateTimes(
					breakFastStart,
					breakFastEnd
				).contains(currentDateTime)

				if (result === false) {
					return true
				}
			}

			return prices.every(price => price.available == 0)
		},
		// setFoodItemDetails(productId, e) {
		// 	const UOMId = e.target.value
		// 	const foodItem = this.foodProducts.filter(
		// 		food => food.product_id == productId
		// 	)[0]
		// 	const x = foodItem.prices.filter(x => x.uom_id == UOMId)
		// 	if (x.length) {
		// 		this.$set(this.foodItem, productId, {
		// 			status: x[0]
		// 				? '<span class="badge badge-round badge-success bold">Available</span>'
		// 				: '<span class="badge badge-round badge-danger bold">Unavailable</span>',
		// 			price: `₱ ${x[0].price}`
		// 		})
		// 	} else {
		// 		const y = foodItem.prices[0]
		// 		this.$set(this.foodItem, productId, {
		// 			status: y
		// 				? '<span class="badge badge-round badge-success bold">Available</span>'
		// 				: '<span class="badge badge-round badge-danger bold">Unavailable</span>',
		// 			price: `₱ ${y.price}`
		// 		})
		// 	}
		// },
		// setSelectedFoodItem(e) {
		// 	const thisCheckbox = e.target
		// 	const productId = thisCheckbox._value

		// 	// const hasUOMSelection = this.$refs[`uom-${productId}`]

		// 	if (!thisCheckbox.checked) {
		// 		// this.$set(this.selectedFoodUOM, productId, null)
		// 		this.$delete(this.selectedFoodUOM, productId)
		// 		this.$delete(this.selectedFoodQuantity, productId)
		// 		this.$delete(this.foodItem, productId)
		// 	}
		// },
		foodItemUOMPrice(productId) {
			const foodItem = this.foodProducts.filter(
				({ product_id }) => product_id == productId
			)[0]

			const foodPrice = foodItem.prices.filter(
				foodPrice => foodPrice.pivot.uom_id == this.selectedFoodUOM[productId]
			)[0]

			if (!foodPrice) {
				return 0
			}

			return foodPrice.pivot.price
		},
		setSelectedFoodUOM(productId, e) {
			const thisSelectedValue = e.target.value
			// this.$set(this.selectedFoodItems, productId, true)
			this.$set(this.selectedFoodUOM, productId, parseInt(thisSelectedValue))
			this.$set(this.selectedFoodQuantity, productId, 1)

			if (thisSelectedValue == -1) {
				// this.$delete(this.selectedFoodItems, productId)
				this.$delete(this.selectedFoodUOM, productId)
				this.$delete(this.selectedFoodQuantity, productId)
			}
		},
		// async addToCart() {
		// 	try {
		// 		await axios.post('/temp_orders/store', {
		// 			product: this.selectedFoodItems2,
		// 			quantity: this.selectedFoodQuantity,
		// 			uom: this.selectedFoodUOM
		// 		})
		// 		this.selectedFoodItems2 = []
		// 		this.selectedFoodUOM = {}
		// 		this.selectedFoodQuantity = {}
		// 	} catch (error) {
		// 		const { status, data } = error.response
		// 		if (status === 422) {
		// 			toastr['info'](data.message, 'Information')
		// 		}
		// 	}
		// },
		retrieveFoodProductsByCategory() {
			this.searchItem = ''
			this.$emit('retrieveFoodProductsByCategory', this.selectedCategory)
		},
		closeFoodProductDetail() {
			$('#foodProductDetail').modal('hide')
			this.$emit('clearFoodProductDetails')
			this.addItemOrderForm = this.newAddForm()
		},
		async searchForItem() {
			this.search(this.searchItem, this.selectedCategory, this)
		},
		search: debounce((searchItem, categoryId, vm) => {
			vm.$emit('searchForItem', { searchItem, categoryId })
		}, 250),
		// async getResults(page = 1) {
		// 	NProgress.start()
		// 	const { data } = await axios.get(
		// 		`/products/tenant_products/${this.tenant}?category=${this.selectedCategory}&item=${this.searchItem}&page=${page}`
		// 	)
		// 	this.$emit('getResults', data)
		// },
		async viewProduct(productId, e) {
			if (this.isRetrievingProductDetails) {
				return
			}
			const thisButton = e.target
			this.isRetrievingProductDetails = true
			thisButton.disabled = true
			thisButton.innerHTML = '<i class="fa fa-spinner fa-pulse"></i>'
			const { data } = await axios.get(`/products/tenant_product/${productId}`)
			const { productDetails } = data
			this.$emit('viewProduct', productDetails)
			$('#foodProductDetail').modal('show')
			this.isRetrievingProductDetails = false
			thisButton.disabled = false
			thisButton.innerHTML = 'View'
		}
	}
}
</script>