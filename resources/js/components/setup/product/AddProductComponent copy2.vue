<!-- @format -->

<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Product Details</h4>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-hidden="true"
        >
          ×
        </button>
      </div>
      <form
        @submit.prevent="checkProductForm"
        method="post"
        enctype="multipart/form-data"
      >
        <div class="modal-body p-4">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="field-1" class="control-label">Product Name</label>
                <span class="text-danger">*</span>
                <input
                  v-model="productForm.product_name"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': productForm.errors.has('product_name')
                  }"
                  id="field-1"
                  placeholder="Product Name"
                  autocomplete="off"
                />
                <has-error :form="productForm" field="product_name"></has-error>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="product-image" class="control-label"
                  >Product Image</label
                >
                <span class="text-danger">*</span>
                <input
                  type="file"
                  class="form-control"
                  :class="{ 'is-invalid': productForm.errors.has('image') }"
                  id="product-image"
                  ref="image"
                  placeholder="Product Image"
                />
                <has-error :form="productForm" field="image"></has-error>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Categories <span class="text-danger">*</span></label>
                <br />
                <div
                  class="checkbox checkbox-primary"
                  v-for="(fd_type, index) in fd_types"
                  :key="index"
                >
                  <input
                    type="checkbox"
                    v-bind:value="fd_type.category_id"
                    v-model="productForm.categories"
                    :id="'category_id_' + fd_type.category_id"
                  />
                  <label :for="'category_id_' + fd_type.category_id">{{
                    fd_type.category
                  }}</label>
                  <br />
                </div>
                <small v-if="!productForm.categories.length"
                  ><code>Note:</code> Please choose atleast one category.</small
                >
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="field-3"
                      >Description <span class="text-danger">*</span></label
                    >
                    <textarea
                      v-model="productForm.description"
                      id="field-3"
                      class="form-control"
                      rows="4"
                      :class="{
                        'is-invalid': productForm.errors.has('description')
                      }"
                    ></textarea>
                    <has-error
                      :form="productForm"
                      field="description"
                    ></has-error>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input check-choice"
                      id="variation"
                      @change="disabledVariation"
                    />
                    <label class="custom-control-label" for="variation">
                      Select Variation (Optional)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col md-12">
                  <div class="mt-2 pl-3">
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        v-model="productForm.variation"
                        name="variation"
                        class="custom-control-input check-option variation"
                        id="solo"
                        value="solo"
                        disabled
                      />
                      <label class="custom-control-label" for="solo">
                        Solo</label
                      >
                    </div>
                  </div>
                  <div class="mt-1 pl-3">
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        v-model="productForm.variation"
                        name="variation"
                        class="custom-control-input check-option variation"
                        id="value-meal"
                        value="value meal"
                        disabled
                      />
                      <label class="custom-control-label" for="value-meal">
                        Value Meal</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input check-choice"
                      id="breakfast"
                      @change="disabledBreakfast"
                    />
                    <label class="custom-control-label" for="breakfast">
                      Breakfast (Optional)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group mt-1 pl-3">
                    <label for="bf_start">Time Start</label>
                    <input
                      v-if="productForm.breakfast === 0"
                      type="text"
                      id="bf_start"
                      class="form-control"
                      disabled
                    />
                    <timeStart
                      v-model="productForm.time_start"
                      v-else
                      input-class="form-control"
                      class="theme-orange"
                      type="time"
                      title="Schedule Time Start"
                      use12-hour
                      value-zone="Asia/Manila"
                      zone="Asia/Manila"
                      :format="{ hour: 'numeric', minute: '2-digit' }"
                    >
                    </timeStart>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mt-1">
                    <label for="bf_end">Time End</label>
                    <input
                      v-if="productForm.breakfast === 0"
                      type="text"
                      id="bf_end"
                      class="form-control"
                      disabled
                    />
                    <timeEnd
                      v-model="productForm.time_end"
                      v-else
                      input-class="form-control"
                      class="theme-orange"
                      type="time"
                      title="Schedule Time End"
                      use12-hour
                      value-zone="Asia/Manila"
                      zone="Asia/Manila"
                      :format="{ hour: 'numeric', minute: '2-digit' }"
                    >
                    </timeEnd>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      v-model="productForm.no_specific_price"
                      value="1"
                      class="custom-control-input check-choice"
                      id="editno_specific_price"
                    />
                    <label
                      class="custom-control-label"
                      for="editno_specific_price"
                    >
                      No Specific Price
                      <span class="text-danger"
                        >(For Prawn Farm Only)</span
                      ></label
                    >
                  </div>
                </div>
              </div>
              <div class="row" v-show="productForm.no_specific_price">
                <div class="col-md-6">
                  <div class="form-group mt-1 pl-3">
                    <label for="price_per_gram"
                      >Converted Price per 1 gram</label
                    >
                    <input
                      v-model.number="productForm.price_per_gram"
                      id="price_per_gram"
                      type="text"
                      class="form-control"
                      @keyup="inputPriceGram($event)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      v-model="productForm.free_menu"
                      class="custom-control-input check-choice"
                      id="free_menu"
                    />
                    <label class="custom-control-label" for="free_menu">
                      Free Menu
                      <span class="text-danger">(No Price)</span></label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      v-model="productForm.promo"
                      class="custom-control-input check-choice"
                      id="promo"
                    />
                    <label class="custom-control-label" for="promo">
                      Promo
                      <span class="text-danger"
                        >(check if this product is categorize as promo)</span
                      ></label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input check-choice"
                      id="uom"
                      :disabled="fd_unit_measures.length === 0"
                      @change="disabledUOM"
                    />
                    <label class="custom-control-label" for="uom">
                      Unit of Measurement (Optional)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <table
                    class="table table-sm table-bordered table-hover"
                    width="100%"
                  >
                    <thead>
                      <tr>
                        <th width="40%">Unit of Measure</th>
                        <th>Price</th>
                        <th>No. of Item Available</th>
                        <th width="5%">Default</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(uom, i) in fd_unit_measures" :key="i">
                        <input
                          v-show="false"
                          class="uomId_"
                          :class="'uomId_' + uom.id"
                          :value="uom.id"
                        />
                        <td width="40%">
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input check-option uom_"
                              :id="'chk_uom_' + uom.id"
                              disabled
                              @change="selectChkUOM(uom.id)"
                            />
                            <label
                              class="custom-control-label"
                              :for="'chk_uom_' + uom.id"
                              >{{ uom.unit_measure }}</label
                            >
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            class="form-control input-option price_uom_"
                            :class="'price_uom_' + uom.id"
                            disabled
                            @keyup="uomPrice(uom.id)"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            class="form-control input-option stocks_"
                            :class="'stocks_' + uom.id"
                            disabled
                            min="0"
                            @keyup="uomStocks(uom.id)"
                            @change="uomStocks(uom.id)"
                          />
                        </td>
                        <td align="center">
                          <div class="custom-control custom-radio">
                            <input
                              type="radio"
                              name="set_default"
                              class="custom-control-input check-option radio_uom_"
                              :id="'radio_uom_' + uom.id"
                              disabled
                              @click="uomDefault(uom.id)"
                            />
                            <label
                              class="custom-control-label"
                              :for="'radio_uom_' + uom.id"
                            ></label>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div v-show="showPriceForm">
            <hr />
            <div class="row">
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="price"
                        >Price <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model.number="productForm.price"
                        id="price"
                        class="form-control"
                        autocomplete="off"
                        @keyup="inputPrice('price', $event)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="stocks">No. of Item Available</label>
                      <input
                        class="form-control"
                        id="stocks"
                        v-model.number="productForm.stocks"
                        type="number"
                        min="0"
                        :class="{
                          'is-invalid': productForm.errors.has('stocks')
                        }"
                      />
                      <has-error :form="productForm" field="stocks"></has-error>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <!-- dynamic -->
          <div
            class="row"
            v-for="(suggestion, index) in fd_suggestion"
            :key="'suggestion' + index"
          >
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input check-choice"
                      :id="'suggestion_' + index"
                      @change="disabledSuggestion(index)"
                    />
                    <label
                      class="custom-control-label"
                      :for="'suggestion_' + index"
                    >
                      {{ suggestion.suggestion }} (Optional)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="no_flavor">No of Pieces of Chicken</label>
                      <input
                        type="number"
                        v-model.number="productForm.no_flavor"
                        min="1"
                        id="no_flavor"
                        class="form-control input-option"
                        autocomplete="off"
                        disabled
                        @keyup="inputNumber('no_flavor')"
                        @change="inputNumber('no_flavor')"
                      />
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <table
                        class="table table-sm table-bordered table-hover"
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th width="40%">{{ suggestion.suggestion }}</th>
                            <th>Addon Price</th>
                            <th width="5%">Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(ps, i) in suggestion.product_suggestion"
                            :key="'ps_' + i"
                          >
                            <input
                              v-show="false"
                              class="suggestionId"
                              :class="`suggestionId_${index}_${ps.id}`"
                              :value="ps.id"
                            />
                            <td width="40%">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input check-option"
                                  :class="`product_suggestion_${index}`"
                                  :id="`product_suggestion_${index}_${ps.id}`"
                                  disabled
                                  @change="
                                    selectProductSuggestion(index, ps.id)
                                  "
                                />
                                <label
                                  class="custom-control-label"
                                  :for="`product_suggestion_${index}_${ps.id}`"
                                  >{{ ps.description }}</label
                                >
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control input-option"
                                :class="
                                  `price_product_suggestion_${index}_${ps.id} price_product_suggestion_${index}`
                                "
                                disabled
                                @keyup="productSuggestionPrice(index, ps.id)"
                              />
                            </td>
                            <td align="center">
                              <div class="custom-control custom-radio">
                                <input
                                  type="radio"
                                  name="default_product_suggestion"
                                  class="custom-control-input check-option"
                                  :id="
                                    `radio_product_suggestion_${index}_${ps.id} radio_product_suggestion_${index}`
                                  "
                                  disabled
                                  @click="
                                    productSuggestionDefault(index, ps.id)
                                  "
                                />
                                <label
                                  class="custom-control-label"
                                  :for="
                                    `radio_product_suggestion_${index}_${ps.id}`
                                  "
                                ></label>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end dynamic -->
          <div class="row" v-show="fd_flavors.length > 0">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input check-choice"
                      id="flavor"
                      @change="disabledFlavor"
                    />
                    <label class="custom-control-label" for="flavor">
                      Flavor (Optional)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="no_flavor">No of Pieces of Chicken</label>
                      <input
                        type="number"
                        v-model.number="productForm.no_flavor"
                        min="1"
                        id="no_flavor"
                        class="form-control input-option"
                        autocomplete="off"
                        disabled
                        @keyup="inputNumber('no_flavor')"
                        @change="inputNumber('no_flavor')"
                      />
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <table
                        class="table table-sm table-bordered table-hover"
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th width="40%">Types of Flavor</th>
                            <th>Addon Price</th>
                            <th width="5%">Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(f, ind) in fd_flavors" :key="ind">
                            <input
                              v-show="false"
                              class="flavorId_"
                              :class="'flavorId_' + f.id"
                              :value="f.id"
                            />
                            <td width="40%">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input check-option flavor_"
                                  :id="'flavor_' + f.id"
                                  disabled
                                  @change="selectChkFlavor(f.id)"
                                />
                                <label
                                  class="custom-control-label"
                                  :for="'flavor_' + f.id"
                                  >{{ f.description }}</label
                                >
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control input-option price_flavor_"
                                :class="'price_flavor_' + f.id"
                                disabled
                                @keyup="flavorPrice(f.id)"
                              />
                            </td>
                            <td align="center">
                              <div class="custom-control custom-radio">
                                <input
                                  type="radio"
                                  name="default_flavor"
                                  class="custom-control-input check-option radio_flavor_"
                                  :id="'radio_flavor_' + f.id"
                                  disabled
                                  @click="flavorDefault(f.id)"
                                />
                                <label
                                  class="custom-control-label"
                                  :for="'radio_flavor_' + f.id"
                                ></label>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-show="fd_drinks.length > 0">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input check-choice"
                      id="drinks"
                      @change="disabledDrinks"
                    />
                    <label class="custom-control-label" for="drinks">
                      Choice of Drinks (For Upgrade)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="no_drinks">No of Pieces</label>
                      <input
                        type="number"
                        v-model.number="productForm.no_drinks"
                        min="1"
                        id="no_drinks"
                        class="form-control input-option"
                        disabled
                        @keyup="inputNumber('no_drinks')"
                        @change="inputNumber('no_drinks')"
                      />
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <table
                        class="table table-sm table-bordered table-hover"
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th width="40%">Drinks</th>
                            <th>Addon Price</th>
                            <th width="5%">Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(d, inde) in fd_drinks" :key="inde">
                            <input
                              v-show="false"
                              class="drinksId_"
                              :class="
                                'drinksId_' + d.product_id + '_' + d.uom_id
                              "
                              :value="d.product_id"
                            />
                            <input
                              v-show="false"
                              class="drinks_detailId_"
                              :class="
                                'drinks_detailId_' +
                                  d.product_id +
                                  '_' +
                                  d.uom_id
                              "
                              :value="d.product_id + '_' + d.uom_id"
                            />
                            <input
                              v-show="false"
                              class="drinks_uomId_"
                              :class="
                                'drinks_uomId_' + d.product_id + '_' + d.uom_id
                              "
                              :value="d.uom_id"
                            />
                            <td width="40%">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input check-option drinks_"
                                  :id="
                                    'drinks_' + d.product_id + '_' + d.uom_id
                                  "
                                  disabled
                                  @change="
                                    selectChkDrinks(
                                      d.product_id + '_' + d.uom_id
                                    )
                                  "
                                />
                                <label
                                  v-if="d.uom_id === null"
                                  class="custom-control-label"
                                  :for="
                                    'drinks_' + d.product_id + '_' + d.uom_id
                                  "
                                  >{{ d.product_name }}</label
                                >
                                <label
                                  v-else
                                  class="custom-control-label"
                                  :for="
                                    'drinks_' + d.product_id + '_' + d.uom_id
                                  "
                                  >{{
                                    d.uoms[0].unit_measure +
                                      ' ' +
                                      d.product_name
                                  }}</label
                                >
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control input-option price_drinks_"
                                :class="
                                  'price_drinks_' +
                                    d.product_id +
                                    '_' +
                                    d.uom_id
                                "
                                disabled
                                @keyup="
                                  drinkPrice(d.product_id + '_' + d.uom_id)
                                "
                              />
                            </td>
                            <td align="center">
                              <div class="custom-control custom-radio">
                                <input
                                  type="radio"
                                  name="default_drinks"
                                  class="custom-control-input check-option radio_drinks_"
                                  :id="
                                    'radio_drinks_' +
                                      d.product_id +
                                      '_' +
                                      d.uom_id
                                  "
                                  disabled
                                  @click="
                                    drinksDefault(d.product_id + '_' + d.uom_id)
                                  "
                                />
                                <label
                                  class="custom-control-label"
                                  :for="
                                    'radio_drinks_' +
                                      d.product_id +
                                      '_' +
                                      d.uom_id
                                  "
                                ></label>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-show="fd_fries.length > 0">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input check-choice"
                      id="fries"
                      @change="disabledFries"
                    />
                    <label class="custom-control-label" for="fries">
                      Choice of Fries (For Upgrade)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="no_fries">No of Pieces</label>
                      <input
                        type="number"
                        v-model.number="productForm.no_fries"
                        min="1"
                        id="no_fries"
                        class="form-control input-option"
                        disabled
                        @keyup="inputNumber('no_fries')"
                        @change="inputNumber('no_fries')"
                      />
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <table
                        class="table table-sm table-bordered table-hover"
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th width="40%">Fries</th>
                            <th>Addon Price</th>
                            <th width="5%">Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(f, inde) in fd_fries" :key="inde">
                            <input
                              v-show="false"
                              class="friesId_"
                              :class="
                                'friesId_' + f.product_id + '_' + f.uom_id
                              "
                              :value="f.product_id"
                            />
                            <input
                              v-show="false"
                              class="fries_detailId_"
                              :class="
                                'fries_detailId_' +
                                  f.product_id +
                                  '_' +
                                  f.uom_id
                              "
                              :value="f.product_id + '_' + f.uom_id"
                            />
                            <input
                              v-show="false"
                              class="fries_uomId_"
                              :class="
                                'fries_uomId_' + f.product_id + '_' + f.uom_id
                              "
                              :value="f.uom_id"
                            />
                            <td width="40%">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input check-option fries_"
                                  :id="'fries_' + f.product_id + '_' + f.uom_id"
                                  disabled
                                  @change="
                                    selectChkFries(
                                      f.product_id + '_' + f.uom_id
                                    )
                                  "
                                />
                                <label
                                  v-if="f.uom_id === null"
                                  class="custom-control-label"
                                  :for="
                                    'fries_' + f.product_id + '_' + f.uom_id
                                  "
                                  >{{ f.product_name }}</label
                                >
                                <label
                                  v-else
                                  class="custom-control-label"
                                  :for="
                                    'fries_' + f.product_id + '_' + f.uom_id
                                  "
                                  >{{
                                    f.uoms[0].unit_measure +
                                      ' ' +
                                      f.product_name
                                  }}</label
                                >
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control input-option price_fries_"
                                :class="
                                  'price_fries_' + f.product_id + '_' + f.uom_id
                                "
                                disabled
                                @keyup="
                                  friesPrice(f.product_id + '_' + f.uom_id)
                                "
                              />
                            </td>
                            <td align="center">
                              <div class="custom-control custom-radio">
                                <input
                                  type="radio"
                                  name="default_fries"
                                  class="custom-control-input check-option radio_fries_"
                                  :id="
                                    'radio_fries_' +
                                      f.product_id +
                                      '_' +
                                      f.uom_id
                                  "
                                  disabled
                                  @click="
                                    friesDefault(f.product_id + '_' + f.uom_id)
                                  "
                                />
                                <label
                                  class="custom-control-label"
                                  :for="
                                    'radio_fries_' +
                                      f.product_id +
                                      '_' +
                                      f.uom_id
                                  "
                                ></label>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-show="fd_choice_sides.length > 0">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input check-choice"
                      id="choice_sides"
                      :disabled="fd_choice_sides.length === 0"
                      @change="disabledChoiceSides"
                    />
                    <label class="custom-control-label" for="choice_sides">
                      Choice of Sides (For Upgrade)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="no_choice_sides">No of Pieces</label>
                      <input
                        type="number"
                        v-model.number="productForm.no_choice_sides"
                        min="1"
                        id="no_choice_sides"
                        class="form-control input-option"
                        disabled
                        @keyup="inputNumber('no_choice_sides')"
                        @change="inputNumber('no_choice_sides')"
                      />
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <table
                        class="table table-sm table-bordered table-hover"
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th width="40%">Sides</th>
                            <th>Addon Price</th>
                            <th width="5%">Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(cs, inde) in fd_choice_sides" :key="inde">
                            <input
                              v-show="false"
                              class="choice_sidesId_"
                              :class="
                                'choice_sidesId_' +
                                  cs.product_id +
                                  '_' +
                                  cs.uom_id
                              "
                              :value="cs.product_id"
                            />
                            <input
                              v-show="false"
                              class="choice_sides_detailId_"
                              :class="
                                'choice_sides_detailId_' +
                                  cs.product_id +
                                  '_' +
                                  cs.uom_id
                              "
                              :value="cs.product_id + '_' + cs.uom_id"
                            />
                            <input
                              v-show="false"
                              class="choice_sides_uomId_"
                              :class="
                                'choice_sides_uomId_' +
                                  cs.product_id +
                                  '_' +
                                  cs.uom_id
                              "
                              :value="cs.uom_id"
                            />
                            <td width="40%">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input check-option choice_sides_"
                                  :id="
                                    'choice_sides_' +
                                      cs.product_id +
                                      '_' +
                                      cs.uom_id
                                  "
                                  disabled
                                  @change="
                                    selectChkChoiceSides(
                                      cs.product_id + '_' + cs.uom_id
                                    )
                                  "
                                />
                                <label
                                  v-if="cs.uom_id === null"
                                  class="custom-control-label"
                                  :for="
                                    'choice_sides_' +
                                      cs.product_id +
                                      '_' +
                                      cs.uom_id
                                  "
                                  >{{ cs.product_name }}</label
                                >
                                <label
                                  v-else
                                  class="custom-control-label"
                                  :for="
                                    'choice_sides_' +
                                      cs.product_id +
                                      '_' +
                                      cs.uom_id
                                  "
                                  >{{
                                    cs.uoms[0].unit_measure +
                                      ' ' +
                                      cs.product_name
                                  }}</label
                                >
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control input-option price_choice_sides_"
                                :class="
                                  'price_choice_sides_' +
                                    cs.product_id +
                                    '_' +
                                    cs.uom_id
                                "
                                disabled
                                @keyup="
                                  choiceSidesPrice(
                                    cs.product_id + '_' + cs.uom_id
                                  )
                                "
                              />
                            </td>
                            <td align="center">
                              <div class="custom-control custom-radio">
                                <input
                                  type="radio"
                                  name="default_sides"
                                  class="custom-control-input check-option radio_sides_"
                                  :id="
                                    'radio_sides_' +
                                      cs.product_id +
                                      '_' +
                                      cs.uom_id
                                  "
                                  disabled
                                  @click="
                                    sidesDefault(
                                      cs.product_id + '_' + cs.uom_id
                                    )
                                  "
                                />
                                <label
                                  class="custom-control-label"
                                  :for="
                                    'radio_sides_' +
                                      cs.product_id +
                                      '_' +
                                      cs.uom_id
                                  "
                                ></label>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-show="fd_addon_drinks.length > 0">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input check-choice"
                      id="addon-drinks"
                      :disabled="fd_addon_drinks.length === 0"
                      @change="disabledAddonDrinks"
                    />
                    <label class="custom-control-label" for="addon-drinks">
                      Addon Drinks (Optional)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <table
                        class="table table-sm table-bordered table-hover"
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th width="40%">Drinks</th>
                            <th>Addon Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(ad, i) in fd_addon_drinks"
                            :key="'addon_drinks_' + i"
                          >
                            <input
                              v-show="false"
                              class="addonDrinksId_"
                              :class="
                                'addonDrinksId_' +
                                  ad.product_id +
                                  '_' +
                                  ad.uom_id
                              "
                              :value="ad.product_id"
                            />
                            <input
                              v-show="false"
                              class="addon_drinks_detailId_"
                              :class="
                                'addon_drinks_detailId_' +
                                  ad.product_id +
                                  '_' +
                                  ad.uom_id
                              "
                              :value="ad.product_id + '_' + ad.uom_id"
                            />
                            <input
                              v-show="false"
                              class="addon_drinks_uomId_"
                              :class="
                                'addon_drinks_uomId_' +
                                  ad.product_id +
                                  '_' +
                                  ad.uom_id
                              "
                              :value="ad.uom_id"
                            />
                            <input
                              v-show="false"
                              class="drinks_original_price_"
                              :class="
                                'drinks_original_price_' +
                                  ad.product_id +
                                  '_' +
                                  ad.uom_id
                              "
                              :value="ad.price"
                            />
                            <td width="40%">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input check-option addon_drinks_"
                                  :id="
                                    'addon_drinks_' +
                                      ad.product_id +
                                      '_' +
                                      ad.uom_id
                                  "
                                  disabled
                                  @change="
                                    selectChkAddonDrinks(
                                      ad.product_id + '_' + ad.uom_id
                                    )
                                  "
                                />
                                <label
                                  v-if="ad.uom_id === null"
                                  class="custom-control-label"
                                  :for="
                                    'addon_drinks_' +
                                      ad.product_id +
                                      '_' +
                                      ad.uom_id
                                  "
                                  >{{ ad.product_name }}</label
                                >
                                <label
                                  v-else
                                  class="custom-control-label"
                                  :for="
                                    'addon_drinks_' +
                                      ad.product_id +
                                      '_' +
                                      ad.uom_id
                                  "
                                  >{{
                                    ad.uoms[0].unit_measure +
                                      ' ' +
                                      ad.product_name
                                  }}</label
                                >
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control input-option price_addon_drinks_"
                                :class="
                                  'price_addon_drinks_' +
                                    ad.product_id +
                                    '_' +
                                    ad.uom_id
                                "
                                :value="ad.price"
                                disabled
                                @keyup="
                                  addonDrinksPrice(
                                    ad.product_id + '_' + ad.uom_id
                                  )
                                "
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-show="fd_addon_sides.length > 0">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input check-choice"
                      id="sides"
                      :disabled="fd_addon_sides.length === 0"
                      @change="disabledSides"
                    />
                    <label class="custom-control-label" for="sides">
                      Addon Sides (Optional)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <table
                        class="table table-sm table-bordered table-hover"
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th width="40%">Sides</th>
                            <th>Addon Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(s, indee) in fd_addon_sides" :key="indee">
                            <input
                              v-show="false"
                              class="sidesId_"
                              :class="
                                'sidesId_' + s.product_id + '_' + s.uom_id
                              "
                              :value="s.product_id"
                            />
                            <input
                              v-show="false"
                              class="sides_detailId_"
                              :class="
                                'sides_detailId_' +
                                  s.product_id +
                                  '_' +
                                  s.uom_id
                              "
                              :value="s.product_id + '_' + s.uom_id"
                            />
                            <input
                              v-show="false"
                              class="sides_uomId_"
                              :class="
                                'sides_uomId_' + s.product_id + '_' + s.uom_id
                              "
                              :value="s.uom_id"
                            />
                            <input
                              v-show="false"
                              class="sides_original_price_"
                              :class="
                                'sides_original_price_' +
                                  s.product_id +
                                  '_' +
                                  s.uom_id
                              "
                              :value="s.price"
                            />
                            <td width="40%">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input check-option sides_"
                                  :id="'sides_' + s.product_id + '_' + s.uom_id"
                                  disabled
                                  @change="
                                    selectChkSides(
                                      s.product_id + '_' + s.uom_id
                                    )
                                  "
                                />
                                <label
                                  v-if="s.uom_id === null"
                                  class="custom-control-label"
                                  :for="
                                    'sides_' + s.product_id + '_' + s.uom_id
                                  "
                                  >{{ s.product_name }}</label
                                >
                                <label
                                  v-else
                                  class="custom-control-label"
                                  :for="
                                    'sides_' + s.product_id + '_' + s.uom_id
                                  "
                                  >{{
                                    s.uoms[0].unit_measure +
                                      ' ' +
                                      s.product_name
                                  }}</label
                                >
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control input-option price_sides_"
                                :class="
                                  'price_sides_' + s.product_id + '_' + s.uom_id
                                "
                                :value="s.price"
                                disabled
                                @keyup="
                                  sidesPrice(s.product_id + '_' + s.uom_id)
                                "
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-show="fd_dessert.length > 0">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input check-choice"
                      id="dessert"
                      :disabled="fd_dessert.length === 0"
                      @change="disabledDessert"
                    />
                    <label class="custom-control-label" for="dessert">
                      Addon Desserts (Optional)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <table
                        class="table table-sm table-bordered table-hover"
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th width="40%">Dessert</th>
                            <th>Addon Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(ds, indeex) in fd_dessert" :key="indeex">
                            <input
                              v-show="false"
                              class="dessertId_"
                              :class="
                                'dessertId_' + ds.product_id + '_' + ds.uom_id
                              "
                              :value="ds.product_id"
                            />
                            <input
                              v-show="false"
                              class="dessert_detailId_"
                              :class="
                                'dessert_detailId_' +
                                  ds.product_id +
                                  '_' +
                                  ds.uom_id
                              "
                              :value="ds.product_id + '_' + ds.uom_id"
                            />
                            <input
                              v-show="false"
                              class="dessert_uomId_"
                              :class="
                                'dessert_uomId_' +
                                  ds.product_id +
                                  '_' +
                                  ds.uom_id
                              "
                              :value="ds.uom_id"
                            />
                            <input
                              v-show="false"
                              class="dessert_original_price_"
                              :class="
                                'dessert_original_price_' +
                                  ds.product_id +
                                  '_' +
                                  ds.uom_id
                              "
                              :value="ds.price"
                            />
                            <td width="40%">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input check-option dessert_"
                                  :id="
                                    'dessert_' + ds.product_id + '_' + ds.uom_id
                                  "
                                  disabled
                                  @change="
                                    selectChkDessert(
                                      ds.product_id + '_' + ds.uom_id
                                    )
                                  "
                                />
                                <label
                                  v-if="ds.uom_id === null"
                                  class="custom-control-label"
                                  :for="
                                    'dessert_' + ds.product_id + '_' + ds.uom_id
                                  "
                                  >{{ ds.product_name }}</label
                                >
                                <label
                                  v-else
                                  class="custom-control-label"
                                  :for="
                                    'dessert_' + ds.product_id + '_' + ds.uom_id
                                  "
                                  >{{
                                    ds.uoms[0].unit_measure +
                                      ' ' +
                                      ds.product_name
                                  }}</label
                                >
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control input-option price_dessert_"
                                :class="
                                  'price_dessert_' +
                                    ds.product_id +
                                    '_' +
                                    ds.uom_id
                                "
                                :value="ds.price"
                                disabled
                                @keyup="
                                  dessertPrice(ds.product_id + '_' + ds.uom_id)
                                "
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-show="fd_upgradable_item.length > 0">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input check-choice"
                      id="upgradable-item"
                      :disabled="fd_upgradable_item.length === 0"
                      @change="disabledUpgradableItem"
                    />
                    <label class="custom-control-label" for="upgradable-item">
                      Upgradable Item (Optional)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <table
                        class="table table-sm table-bordered table-hover"
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th width="40%">Upgradable Item</th>
                            <th>Addon Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(ui, i) in fd_upgradable_item"
                            :key="'upgradable_item_' + i"
                          >
                            <input
                              v-show="false"
                              class="upgradeId_"
                              :class="
                                'upgradeId_' + ui.product_id + '_' + ui.uom_id
                              "
                              :value="ui.product_id"
                            />
                            <input
                              v-show="false"
                              class="upgrade_detailId_"
                              :class="
                                'upgrade_detailId_' +
                                  ui.product_id +
                                  '_' +
                                  ui.uom_id
                              "
                              :value="ui.product_id + '_' + ui.uom_id"
                            />
                            <input
                              v-show="false"
                              class="upgrade_uomId_"
                              :class="
                                'upgrade_uomId_' +
                                  ui.product_id +
                                  '_' +
                                  ui.uom_id
                              "
                              :value="ui.uom_id"
                            />
                            <input
                              v-show="false"
                              class="upgrade_original_price_"
                              :class="
                                'upgrade_original_price_' +
                                  ui.product_id +
                                  '_' +
                                  ui.uom_id
                              "
                              :value="ui.price"
                            />
                            <td width="40%">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input check-option upgrade_"
                                  :id="
                                    'upgrade_' + ui.product_id + '_' + ui.uom_id
                                  "
                                  disabled
                                  @change="
                                    selectChkUpgrade(
                                      ui.product_id + '_' + ui.uom_id
                                    )
                                  "
                                />
                                <label
                                  v-if="ui.uom_id === null"
                                  class="custom-control-label"
                                  :for="
                                    'upgrade_' + ui.product_id + '_' + ui.uom_id
                                  "
                                  >{{ ui.product_name }}</label
                                >
                                <label
                                  v-else
                                  class="custom-control-label"
                                  :for="
                                    'upgrade_' + ui.product_id + '_' + ui.uom_id
                                  "
                                  >{{
                                    ui.uoms[0].unit_measure +
                                      ' ' +
                                      ui.product_name
                                  }}</label
                                >
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                class="form-control input-option price_upgrade_"
                                :class="
                                  'price_upgrade_' +
                                    ui.product_id +
                                    '_' +
                                    ui.uom_id
                                "
                                disabled
                                @keyup="
                                  upgradePrice(ui.product_id + '_' + ui.uom_id)
                                "
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary waves-effect"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            v-if="clickSubmit === false"
            type="submit"
            class="btn btn-info waves-effect waves-light"
          >
            Save changes
          </button>
          <button
            v-else
            class="btn btn-info waves-effect waves-light"
            disabled=""
          >
            <span
              class="spinner-border spinner-border-sm mr-1"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Form, HasError, AlertError } from 'vform'
import { serialize } from 'object-to-formdata'
import { Datetime } from 'vue-datetime'
import { DateTime } from 'luxon'
import 'vue-datetime/dist/vue-datetime.css'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
export default {
  name: 'AddProductComponent',
  props: [
    'fd_types',
    'fd_unit_measures',
    'fd_suggestion',
    'fd_drinks',
    'fd_fries',
    'fd_choice_sides',
    'fd_addon_drinks',
    'fd_addon_sides',
    'fd_dessert',
    'fd_upgradable_item'
  ],
  components: {
    timeStart: Datetime,
    timeEnd: Datetime
  },
  data() {
    return {
      showPriceForm: true,
      clickSubmit: false,
      fd_flavors: [],
      productForm: new Form({
        product_name: null,
        description: null,
        categories: [],
        stocks: null,
        no_specific_price: false,
        price_per_gram: 0,
        addon_id: null,
        uom_ids: [],
        uom_prices: [],
        uom_stocks: [],
        uom_default: [],
        price: null,
        variation: null,
        no_flavor: null,
        suggestion_ids: [],
        suggestion_prices: [],
        suggestion_default: [],
        no_drinks: null,
        drinks_ids: [],
        drinks_detail_ids: [],
        drinks_prices: [],
        drinks_uom_ids: [],
        drinks_default: [],
        no_fries: null,
        fries_ids: [],
        fries_detail_ids: [],
        fries_uom_ids: [],
        fries_prices: [],
        fries_default: [],
        no_choice_sides: null,
        choice_sides_ids: [],
        choice_sides_detail_ids: [],
        choice_sides_uom_ids: [],
        choice_sides_prices: [],
        choice_sides_default: [],
        addon_drinks_ids: [],
        addon_drinks_detail_ids: [],
        addon_drinks_uom_ids: [],
        addon_drinks_prices: [],
        sides_ids: [],
        sides_detail_ids: [],
        sides_uom_ids: [],
        sides_prices: [],
        dessert_ids: [],
        dessert_detail_ids: [],
        dessert_uom_ids: [],
        dessert_prices: [],
        upgrade_ids: [],
        upgrade_detail_ids: [],
        upgrade_uom_ids: [],
        upgrade_prices: [],
        breakfast: 0,
        time_start: null,
        time_end: null,
        free_menu: false,
        promo: false
      })
    }
  },
  methods: {
    convertUCWords(str) {
      return (str + '').replace(/^(.)|\s+(.)/g, function($1) {
        return $1.toUpperCase()
      })
    },
    disabledUOM() {
      var checkBox = $('input#uom')
      if (checkBox.is(':checked')) {
        $('input.uom_').prop('disabled', false)
        this.showPriceForm = false
        this.productForm.price = null
        this.productForm.stocks = null
      } else {
        $('input.uom_').prop('checked', false)
        $('input.uom_').prop('disabled', true)
        $('input.price_uom_').prop('disabled', true)
        $('input.price_uom_').val('')
        $('input.stocks_').prop('disabled', true)
        $('input.stocks_').val('')
        $('input.radio_uom_').prop('checked', false)
        $('input.radio_uom_').prop('disabled', true)

        this.productForm.uom_ids = []
        this.productForm.uom_prices = []
        this.productForm.uom_stocks = []
        this.productForm.uom_default = []
        this.showPriceForm = true
        this.productForm.price = null
        this.productForm.stocks = null
      }
    },
    selectChkUOM(i) {
      var checkBox = $('input#chk_uom_' + i)
      if (checkBox.is(':checked')) {
        $('input.price_uom_' + i).prop('disabled', false)
        $('input.price_uom_' + i).val('')
        $('input#radio_uom_' + i).prop('disabled', false)

        var price = '0'
        var uom_id = $('input.uomId_' + i).val()

        var thisUOMArray = this.productForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.productForm.uom_prices.splice(arryIndex, 1, price)
        } else {
          this.productForm.uom_ids.push(uom_id)
          this.productForm.uom_prices.push(price)
          this.productForm.uom_stocks.push('')
          this.productForm.uom_default.push('0')
        }
      } else {
        $('input.price_uom_' + i).prop('disabled', true)
        $('input.price_uom_' + i).val('')
        $('input.stocks_' + i).prop('disabled', true)
        $('input.stocks_' + i).val('')
        $('input#radio_uom_' + i).prop('disabled', true)
        $('input#radio_uom_' + i).prop('checked', false)

        var uom_id = $('input.uomId_' + i).val()
        var price = $('input.price_uom_' + i).val()
        var stocks = $('input.stocks_' + i).val()

        var thisUOMArray = this.productForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.productForm.uom_ids.splice(arryIndex, 1)
          this.productForm.uom_prices.splice(arryIndex, 1)
          this.productForm.uom_stocks.splice(arryIndex, 1)
          this.productForm.uom_default.splice(arryIndex, 1)
        }
      }
    },
    uomPrice(id) {
      var price = $('input.price_uom_' + id).val()
      var uom_id = $('input.uomId_' + id).val()
      if (
        price === '' ||
        parseFloat(price) === 0 ||
        isNaN(parseFloat(price)) === false
      ) {
        $('input.stocks_' + id).prop('disabled', false)
        var thisUOMArray = this.productForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.productForm.uom_prices.splice(arryIndex, 1, price)
        } else {
          this.productForm.uom_ids.push(uom_id)
          this.productForm.uom_prices.push(price)
          this.productForm.uom_stocks.push('')
          this.productForm.uom_default.push('0')
        }
      } else {
        $('input.price_uom_' + id).val('')
        $('input.stocks_' + id).prop('disabled', false)
        $('input.stocks_' + id).val('')
        var thisUOMArray = this.productForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.productForm.uom_prices.splice(arryIndex, 1, '0')
          this.productForm.uom_stocks.splice(arryIndex, 1, '')
        }
      }
    },
    uomStocks(id) {
      var stocks = $('input.stocks_' + id).val()
      var uom_id = $('input.uomId_' + id).val()
      if (
        stocks === '' ||
        parseFloat(stocks) === 0 ||
        isNaN(parseFloat(stocks)) === false
      ) {
        var thisUOMArray = this.productForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.productForm.uom_stocks.splice(arryIndex, 1, stocks)
        }
      } else {
        $('input.stocks_' + id).val('')
        var thisUOMArray = this.productForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.productForm.uom_stocks.splice(arryIndex, 1, '')
        }
      }
    },
    uomDefault(id) {
      var uom_id = $('input.uomId_' + id).val()

      var thisUOMArray = this.productForm.uom_default
      if (thisUOMArray.indexOf('1') > -1) {
        var arryIndex = thisUOMArray.indexOf('1')
        this.productForm.uom_default.splice(arryIndex, 1, '0')
      }

      var checkBox = $('input#radio_uom_' + id)
      if (checkBox.is(':checked')) {
        var thisUOMArray = this.productForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.productForm.uom_default.splice(arryIndex, 1, '1')
        }
      }
    },
    inputNumber(id) {
      var price = $('input#' + id).val()
      if (
        price !== '' &&
        parseInt(price) !== 0 &&
        isNaN(parseFloat(price)) === false
      ) {
      } else {
        $('input#' + id).val('')
      }
    },
    inputPriceGram(e) {
      var price = e.target.value
      if (price !== '' && price > 0 && isNaN(parseFloat(price)) === false) {
      } else {
        this.productForm.price_per_gram = 0
        $('input#price_per_gram').val('')
      }
    },
    inputPrice(id, e) {
      var price = e.target.value
      if (price !== '' && isNaN(parseFloat(price)) === false) {
      } else {
        this.productForm.price = null
        $('input#' + id).val('')
      }
    },
    disabledVariation() {
      var checkBox = $('input#variation')
      if (checkBox.is(':checked')) {
        $('input.variation').prop('disabled', false)
      } else {
        $('input.variation').prop('disabled', true)
        $('input.variation').prop('checked', false)
        this.productForm.variation = null
      }
    },
    disabledFlavor() {
      var checkBox = $('input#flavor')
      if (checkBox.is(':checked')) {
        $('input#no_flavor').prop('disabled', false)
        $('input.flavor_').prop('disabled', false)
      } else {
        $('input#no_flavor').prop('disabled', true)
        $('input.flavor_').prop('disabled', true)
        $('input.flavor_').prop('checked', false)
        $('input.price_flavor_').prop('disabled', true)
        $('input.price_flavor_').val('')
        $('input.radio_flavor_').prop('checked', false)
        $('input.radio_flavor_').prop('disabled', true)

        this.productForm.no_flavor = null
        this.productForm.flavor_ids = []
        this.productForm.flavor_prices = []
        this.productForm.flavor_default = []
      }
    },
    selectChkFlavor(i) {
      var checkBox = $('input#flavor_' + i)
      if (checkBox.is(':checked')) {
        $('input.price_flavor_' + i).prop('disabled', false)
        $('input.price_flavor_' + i).val('')
        $('input#radio_flavor_' + i).prop('disabled', false)

        var price = '0'
        var flavor_id = $('input.flavorId_' + i).val()

        var thisArray = this.productForm.flavor_ids
        if (thisArray.indexOf(flavor_id) > -1) {
          var arryIndex = thisArray.indexOf(flavor_id)
          this.productForm.flavor_prices.splice(arryIndex, 1, price)
        } else {
          this.productForm.flavor_ids.push(flavor_id)
          this.productForm.flavor_prices.push(price)
          this.productForm.flavor_default.push('0')
        }
      } else {
        $('input.price_flavor_' + i).prop('disabled', true)
        $('input.price_flavor_' + i).val('')
        $('input#radio_flavor_' + i).prop('disabled', true)
        $('input#radio_flavor_' + i).prop('checked', false)

        var flavor_id = $('input.flavorId_' + i).val()
        var price = $('input.price_flavor_' + i).val()

        var thisArray = this.productForm.flavor_ids
        if (thisArray.indexOf(flavor_id) > -1) {
          var arryIndex = thisArray.indexOf(flavor_id)
          this.productForm.flavor_ids.splice(arryIndex, 1)
          this.productForm.flavor_prices.splice(arryIndex, 1)
          this.productForm.flavor_default.splice(arryIndex, 1)
        }
      }
    },
    flavorPrice(id) {
      var price = $('input.price_flavor_' + id).val()
      var flavor_id = $('input.flavorId_' + id).val()
      var fprice = parseFloat(price)

      if (
        price === '' ||
        parseFloat(price) === 0 ||
        isNaN(parseFloat(price)) === false
      ) {
        if (price === '') {
          fprice = 0
          $('input.price_flavor_' + id).val('')
        }

        var thisArray = this.productForm.flavor_ids
        if (thisArray.indexOf(flavor_id) > -1) {
          var arryIndex = thisArray.indexOf(flavor_id)
          this.productForm.flavor_prices.splice(arryIndex, 1, fprice)
        } else {
          this.productForm.flavor_ids.push(flavor_id)
          this.productForm.flavor_prices.push(fprice)
          this.productForm.flavor_default.push('0')
        }
      } else {
        fprice = 0

        var thisArray = this.productForm.flavor_ids
        if (thisArray.indexOf(flavor_id) > -1) {
          var arryIndex = thisArray.indexOf(flavor_id)
          this.productForm.flavor_prices.splice(arryIndex, 1, fprice)
        } else {
          this.productForm.flavor_ids.push(flavor_id)
          this.productForm.flavor_prices.push(fprice)
          this.productForm.flavor_default.push('0')
        }

        $('input.price_flavor_' + id).val('')
      }
    },
    flavorDefault(id) {
      var flavor_id = $('input.flavorId_' + id).val()

      var thisUOMArray = this.productForm.flavor_default
      if (thisUOMArray.indexOf('1') > -1) {
        var arryIndex = thisUOMArray.indexOf('1')
        this.productForm.flavor_default.splice(arryIndex, 1, '0')
      }

      var checkBox = $('input#radio_flavor_' + id)
      if (checkBox.is(':checked')) {
        var thisUOMArray = this.productForm.flavor_ids
        if (thisUOMArray.indexOf(flavor_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(flavor_id)
          this.productForm.flavor_default.splice(arryIndex, 1, '1')
        }
      }
    },
    disabledSuggestion(i) {
      var checkBox = $('input#suggestion_' + i)
      if (checkBox.is(':checked')) {
        $('input.product_suggestion_' + i).prop('disabled', false)
      } else {
        $('input.product_suggestion_' + i).prop('disabled', true)
        $('input.product_suggestion_' + i).prop('checked', false)
        $('input.price_product_suggestion_' + i).prop('disabled', true)
        $('input.price_product_suggestion_' + i).val('')
        $('input.radio_product_suggestion_' + i).prop('checked', false)
        $('input.radio_product_suggestion_' + i).prop('disabled', true)

        this.productForm.suggestion_ids = []
        this.productForm.suggestion_prices = []
        this.productForm.suggestion_default = []
      }
    },
    selectProductSuggestion(i, id) {
      var checkBox = $(`input#product_suggestion_${i}_${id}`)
      if (checkBox.is(':checked')) {
        alert('true')
        $(`input.price_product_suggestion_${i}_${id}`).prop('disabled', false)
        $(`input.price_product_suggestion_${i}_${id}`).val('')
        $(`input#radio_product_suggestion_${i}_${id}`).prop('disabled', false)

        var price = '0'
        var suggestion_id = $(`input.suggestionId_${i}_${id}`).val()

        var thisArray = this.productForm.suggestion_ids
        if (thisArray.indexOf(suggestion_id) > -1) {
          var arryIndex = thisArray.indexOf(suggestion_id)
          this.productForm.suggestion_prices.splice(arryIndex, 1, price)
        } else {
          this.productForm.suggestion_ids.push(suggestion_id)
          this.productForm.suggestion_prices.push(price)
          this.productForm.suggestion_default.push('0')
        }
      } else {
        $(`input.price_product_suggestion_${i}_${id}`).prop('disabled', true)
        $(`input.price_product_suggestion_${i}_${id}`).val('')
        $(`input#radio_product_suggestion_${i}_${id}`).prop('disabled', true)
        $(`input#radio_product_suggestion_${i}_${id}`).prop('checked', false)

        var suggestion_id = $(`input.suggestionId_${i}_${id}`).val()
        var price = $(`input.price_product_suggestion_${i}_${id}`).val()

        var thisArray = this.productForm.suggestion_ids
        if (thisArray.indexOf(suggestion_id) > -1) {
          var arryIndex = thisArray.indexOf(suggestion_id)
          this.productForm.suggestion_ids.splice(arryIndex, 1)
          this.productForm.suggestion_prices.splice(arryIndex, 1)
          this.productForm.suggestion_default.splice(arryIndex, 1)
        }
      }
    },
    productSuggestionPrice(i, id) {
      var price = $(`input.price_product_suggestion_${i}_${id}`).val()
      var suggestion_id = $(`input.suggestionId_${i}_${id}`).val()
      var fprice = parseFloat(price)

      if (
        price === '' ||
        parseFloat(price) === 0 ||
        isNaN(parseFloat(price)) === false
      ) {
        if (price === '') {
          fprice = 0
          $(`input.price_product_suggestion_${i}_${id}`).val('')
        }

        var thisArray = this.productForm.suggestion_ids
        if (thisArray.indexOf(suggestion_id) > -1) {
          var arryIndex = thisArray.indexOf(suggestion_id)
          this.productForm.suggestion_prices.splice(arryIndex, 1, fprice)
        } else {
          this.productForm.suggestion_ids.push(suggestion_id)
          this.productForm.suggestion_prices.push(fprice)
          this.productForm.suggestion_default.push('0')
        }
      } else {
        fprice = 0

        var thisArray = this.productForm.suggestion_ids
        if (thisArray.indexOf(suggestion_id) > -1) {
          var arryIndex = thisArray.indexOf(suggestion_id)
          this.productForm.suggestion_prices.splice(arryIndex, 1, fprice)
        } else {
          this.productForm.suggestion_ids.push(suggestion_id)
          this.productForm.suggestion_prices.push(fprice)
          this.productForm.suggestion_default.push('0')
        }

        $(`input.price_product_suggestion_${i}_${id}`).val('')
      }
    },
    productSuggestionDefault(i, id) {
      var suggestion_id = $(`input.suggestionId_${i}_${id}`).val()

      var thisUOMArray = this.productForm.suggestion_default
      if (thisUOMArray.indexOf('1') > -1) {
        var arryIndex = thisUOMArray.indexOf('1')
        this.productForm.suggestion_default.splice(arryIndex, 1, '0')
      }

      var checkBox = $(`input#radio_product_suggestion_${i}_${id}`)
      if (checkBox.is(':checked')) {
        var thisUOMArray = this.productForm.suggestion_id
        if (thisUOMArray.indexOf(suggestion_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(suggestion_id)
          this.productForm.suggestion_default.splice(arryIndex, 1, '1')
        }
      }
    },
    disabledDrinks() {
      var checkBox = $('input#drinks')
      if (checkBox.is(':checked')) {
        $('input#no_drinks').prop('disabled', false)
        $('input.drinks_').prop('disabled', false)
      } else {
        $('input#no_drinks').prop('disabled', true)
        $('input.drinks_').prop('disabled', true)
        $('input.drinks_').prop('checked', false)
        $('input.price_drinks_').prop('disabled', true)
        $('input.price_drinks_').val('')
        $('input.radio_drinks_').prop('checked', false)
        $('input.radio_drinks_').prop('disabled', true)

        this.productForm.no_drinks = null
        this.productForm.drinks_ids = []
        this.productForm.drinks_detail_ids = []
        this.productForm.drinks_prices = []
        this.productForm.drinks_uom_ids = []
        this.productForm.drinks_default = []
      }
    },
    selectChkDrinks(i) {
      var checkBox = $('input#drinks_' + i)
      if (checkBox.is(':checked')) {
        $('input.price_drinks_' + i).prop('disabled', false)
        $('input.price_drinks_' + i).val('')
        $('input#radio_drinks_' + i).prop('disabled', false)
        var price = 0

        var drinks_id = $('input.drinksId_' + i).val()
        var drinks_detail_id = $('input.drinks_detailId_' + i).val()
        var drinks_uom_id = $('input.drinks_uomId_' + i).val()

        var thisArray = this.productForm.drinks_detail_ids
        if (thisArray.indexOf(drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(drinks_detail_id)
          this.productForm.drinks_prices.splice(arryIndex, 1, price)
        } else {
          this.productForm.drinks_ids.push(drinks_id)
          this.productForm.drinks_detail_ids.push(drinks_detail_id)
          this.productForm.drinks_prices.push(price)
          this.productForm.drinks_uom_ids.push(drinks_uom_id)
          this.productForm.drinks_default.push('0')
        }
      } else {
        $('input.price_drinks_' + i).prop('disabled', true)
        $('input.price_drinks_' + i).val('')
        $('input#radio_drinks_' + i).prop('disabled', true)
        $('input#radio_drinks_' + i).prop('checked', false)

        var drinks_detail_id = $('input.drinks_detailId_' + i).val()

        var thisArray = this.productForm.drinks_detail_ids
        if (thisArray.indexOf(drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(drinks_detail_id)
          this.productForm.drinks_ids.splice(arryIndex, 1)
          this.productForm.drinks_detail_ids.splice(arryIndex, 1)
          this.productForm.drinks_prices.splice(arryIndex, 1)
          this.productForm.drinks_uom_ids.splice(arryIndex, 1)
          this.productForm.drinks_default.splice(arryIndex, 1)
        }
      }
    },
    drinkPrice(id) {
      var price = $('input.price_drinks_' + id).val()
      var drinks_id = $('input.drinksId_' + id).val()
      var drinks_detail_id = $('input.drinks_detailId_' + id).val()
      var drinks_uom_id = $('input.drinks_uomId_' + id).val()
      var dprice = parseFloat(price)

      if (
        price === '' ||
        parseFloat(price) === 0 ||
        isNaN(parseFloat(price)) === false
      ) {
        if (price === '') {
          dprice = 0
          $('input.price_drinks_' + id).val('')
        }

        var thisArray = this.productForm.drinks_detail_ids
        if (thisArray.indexOf(drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(drinks_detail_id)
          this.productForm.drinks_prices.splice(arryIndex, 1, dprice)
        } else {
          this.productForm.drinks_ids.push(drinks_id)
          this.productForm.drinks_detail_ids.push(drinks_detail_id)
          this.productForm.drinks_prices.push(dprice)
          this.productForm.drinks_uom_ids.push(drinks_uom_id)
          this.productForm.drinks_default.push('0')
        }
      } else {
        dprice = 0

        var thisArray = this.productForm.drinks_detail_ids
        if (thisArray.indexOf(drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(drinks_detail_id)
          this.productForm.drinks_prices.splice(arryIndex, 1, dprice)
        } else {
          this.productForm.drinks_ids.push(drinks_id)
          this.productForm.drinks_detail_ids.push(drinks_detail_id)
          this.productForm.drinks_prices.push(dprice)
          this.productForm.drinks_uom_ids.push(drinks_uom_id)
          this.productForm.drinks_default.push('0')
        }

        $('input.price_drinks_' + id).val('')
      }
    },
    drinksDefault(id) {
      var drinks_id = $('input.drinks_detailId_' + id).val()

      var thisUOMArray = this.productForm.drinks_default
      if (thisUOMArray.indexOf('1') > -1) {
        var arryIndex = thisUOMArray.indexOf('1')
        this.productForm.drinks_default.splice(arryIndex, 1, '0')
      }

      var checkBox = $('input#radio_drinks_' + id)
      if (checkBox.is(':checked')) {
        var thisUOMArray = this.productForm.drinks_detail_ids
        if (thisUOMArray.indexOf(drinks_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(drinks_id)
          this.productForm.drinks_default.splice(arryIndex, 1, '1')
        }
      }
    },
    disabledFries() {
      var checkBox = $('input#fries')
      if (checkBox.is(':checked')) {
        $('input#no_fries').prop('disabled', false)
        $('input.fries_').prop('disabled', false)
      } else {
        $('input#no_fries').prop('disabled', true)
        $('input.fries_').prop('disabled', true)
        $('input.fries_').prop('checked', false)
        $('input.price_fries_').prop('disabled', true)
        $('input.price_fries_').val('')
        $('input.radio_fries_').prop('checked', false)
        $('input.radio_fries_').prop('disabled', true)

        this.productForm.no_fries = null
        this.productForm.fries_ids = []
        this.productForm.fries_detail_ids = []
        this.productForm.fries_prices = []
        this.productForm.fries_uom_ids = []
        this.productForm.fries_default = []
      }
    },
    selectChkFries(i) {
      var checkBox = $('input#fries_' + i)
      if (checkBox.is(':checked')) {
        $('input.price_fries_' + i).prop('disabled', false)
        $('input.price_fries_' + i).val('')
        $('input#radio_fries_' + i).prop('disabled', false)

        var price = 0
        var fries_id = $('input.friesId_' + i).val()
        var fries_detail_id = $('input.fries_detailId_' + i).val()
        var fries_uom_id = $('input.fries_uomId_' + i).val()

        var thisArray = this.productForm.fries_detail_ids
        if (thisArray.indexOf(fries_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(fries_detail_id)
          this.productForm.fries_prices.splice(arryIndex, 1, price)
        } else {
          this.productForm.fries_ids.push(fries_id)
          this.productForm.fries_detail_ids.push(fries_detail_id)
          this.productForm.fries_prices.push(price)
          this.productForm.fries_uom_ids.push(fries_uom_id)
          this.productForm.fries_default.push('0')
        }
      } else {
        $('input.price_fries_' + i).prop('disabled', true)
        $('input.price_fries_' + i).val('')
        $('input#radio_fries_' + i).prop('disabled', true)
        $('input#radio_fries_' + i).prop('checked', false)

        var fries_detail_id = $('input.fries_detailId_' + i).val()

        var thisArray = this.productForm.fries_detail_ids
        if (thisArray.indexOf(fries_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(fries_detail_id)
          this.productForm.fries_ids.splice(arryIndex, 1)
          this.productForm.fries_detail_ids.splice(arryIndex, 1)
          this.productForm.fries_prices.splice(arryIndex, 1)
          this.productForm.fries_uom_ids.splice(arryIndex, 1)
          this.productForm.fries_default.splice(arryIndex, 1)
        }
      }
    },
    friesPrice(id) {
      var price = $('input.price_fries_' + id).val()
      var fries_id = $('input.friesId_' + id).val()
      var fries_detail_id = $('input.fries_detailId_' + id).val()
      var fries_uom_id = $('input.fries_uomId_' + id).val()
      var dprice = parseFloat(price)

      if (
        price === '' ||
        parseFloat(price) === 0 ||
        isNaN(parseFloat(price)) === false
      ) {
        if (price === '') {
          dprice = 0
          $('input.price_fries_' + id).val('')
        }

        var thisArray = this.productForm.fries_detail_ids
        if (thisArray.indexOf(fries_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(fries_detail_id)
          this.productForm.fries_prices.splice(arryIndex, 1, dprice)
        } else {
          this.productForm.fries_ids.push(fries_id)
          this.productForm.fries_detail_ids.push(fries_detail_id)
          this.productForm.fries_prices.push(dprice)
          this.productForm.fries_uom_ids.push(fries_uom_id)
          this.productForm.fries_default.push('0')
        }
      } else {
        dprice = 0

        var thisArray = this.productForm.fries_detail_ids
        if (thisArray.indexOf(fries_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(fries_detail_id)
          this.productForm.fries_prices.splice(arryIndex, 1, dprice)
        } else {
          this.productForm.fries_ids.push(fries_id)
          this.productForm.fries_detail_ids.push(fries_detail_id)
          this.productForm.fries_prices.push(dprice)
          this.productForm.fries_uom_ids.push(fries_uom_id)
          this.productForm.fries_default.push('0')
        }

        $('input.price_fries_' + id).val('')
      }
    },
    friesDefault(id) {
      var fries_id = $('input.fries_detailId_' + id).val()

      var thisUOMArray = this.productForm.fries_default
      if (thisUOMArray.indexOf('1') > -1) {
        var arryIndex = thisUOMArray.indexOf('1')
        this.productForm.fries_default.splice(arryIndex, 1, '0')
      }

      var checkBox = $('input#radio_fries_' + id)
      if (checkBox.is(':checked')) {
        var thisUOMArray = this.productForm.fries_detail_ids
        if (thisUOMArray.indexOf(fries_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(fries_id)
          this.productForm.fries_default.splice(arryIndex, 1, '1')
        }
      }
    },
    disabledChoiceSides() {
      var checkBox = $('input#choice_sides')
      if (checkBox.is(':checked')) {
        $('input#no_choice_sides').prop('disabled', false)
        $('input.choice_sides_').prop('disabled', false)
      } else {
        $('input#no_choice_sides').prop('disabled', true)
        $('input.choice_sides_').prop('disabled', true)
        $('input.choice_sides_').prop('checked', false)
        $('input.price_choice_sides_').prop('disabled', true)
        $('input.price_choice_sides_').val('')
        $('input.radio_sides_').prop('checked', false)
        $('input.radio_sides_').prop('disabled', true)

        this.productForm.no_choice_sides = null
        this.productForm.choice_sides_ids = []
        this.productForm.choice_sides_detail_ids = []
        this.productForm.choice_sides_prices = []
        this.productForm.choice_sides_uom_ids = []
        this.productForm.choice_sides_default = []
      }
    },
    selectChkChoiceSides(i) {
      var checkBox = $('input#choice_sides_' + i)
      if (checkBox.is(':checked')) {
        $('input.price_choice_sides_' + i).prop('disabled', false)
        $('input.price_choice_sides_' + i).val('')
        $('input#radio_sides_' + i).prop('disabled', false)

        var price = 0
        var choice_sides_id = $('input.choice_sidesId_' + i).val()
        var choice_sides_detail_id = $('input.choice_sides_detailId_' + i).val()
        var choice_sides_uom_id = $('input.choice_sides_uomId_' + i).val()

        var thisArray = this.productForm.choice_sides_detail_ids
        if (thisArray.indexOf(choice_sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(choice_sides_detail_id)
          this.productForm.choice_sides_prices.splice(arryIndex, 1, price)
        } else {
          this.productForm.choice_sides_ids.push(choice_sides_id)
          this.productForm.choice_sides_detail_ids.push(choice_sides_detail_id)
          this.productForm.choice_sides_prices.push(price)
          this.productForm.choice_sides_uom_ids.push(choice_sides_uom_id)
          this.productForm.choice_sides_default.push('0')
        }
      } else {
        $('input.price_choice_sides_' + i).prop('disabled', true)
        $('input.price_choice_sides_' + i).val('')
        $('input#radio_sides_' + i).prop('disabled', true)
        $('input#radio_sides_' + i).prop('checked', false)

        var choice_sides_detail_id = $('input.choice_sides_detailId_' + i).val()

        var thisArray = this.productForm.choice_sides_detail_ids
        if (thisArray.indexOf(choice_sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(choice_sides_detail_id)
          this.productForm.choice_sides_ids.splice(arryIndex, 1)
          this.productForm.choice_sides_detail_ids.splice(arryIndex, 1)
          this.productForm.choice_sides_prices.splice(arryIndex, 1)
          this.productForm.choice_sides_uom_ids.splice(arryIndex, 1)
          this.productForm.choice_sides_default.splice(arryIndex, 1)
        }
      }
    },
    choiceSidesPrice(id) {
      var price = $('input.price_choice_sides_' + id).val()
      var choice_sides_id = $('input.choice_sidesId_' + id).val()
      var choice_sides_detail_id = $('input.choice_sides_detailId_' + id).val()
      var choice_sides_uom_id = $('input.choice_sides_uomId_' + id).val()
      var dprice = parseFloat(price)

      if (
        price === '' ||
        parseFloat(price) === 0 ||
        isNaN(parseFloat(price)) === false
      ) {
        if (price === '') {
          dprice = 0
          $('input.price_choice_sides_' + id).val('')
        }

        var thisArray = this.productForm.choice_sides_detail_ids
        if (thisArray.indexOf(choice_sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(choice_sides_detail_id)
          this.productForm.choice_sides_prices.splice(arryIndex, 1, dprice)
        } else {
          this.productForm.choice_sides_ids.push(choice_sides_id)
          this.productForm.choice_sides_detail_ids.push(choice_sides_detail_id)
          this.productForm.choice_sides_prices.push(dprice)
          this.productForm.choice_sides_uom_ids.push(choice_sides_uom_id)
          this.productForm.choice_sides_default.push('0')
        }
      } else {
        dprice = 0

        var thisArray = this.productForm.choice_sides_detail_ids
        if (thisArray.indexOf(choice_sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(choice_sides_detail_id)
          this.productForm.choice_sides_prices.splice(arryIndex, 1, dprice)
        } else {
          this.productForm.choice_sides_ids.push(choice_sides_id)
          this.productForm.choice_sides_detail_ids.push(choice_sides_detail_id)
          this.productForm.choice_sides_prices.push(dprice)
          this.productForm.choice_sides_uom_ids.push(choice_sides_uom_id)
          this.productForm.choice_sides_default.push('0')
        }

        $('input.price_choice_sides_' + id).val('')
      }
    },
    sidesDefault(id) {
      var sides_id = $('input.choice_sides_detailId_' + id).val()

      var thisUOMArray = this.productForm.choice_sides_default
      if (thisUOMArray.indexOf('1') > -1) {
        var arryIndex = thisUOMArray.indexOf('1')
        this.productForm.choice_sides_default.splice(arryIndex, 1, '0')
      }

      var checkBox = $('input#radio_sides_' + id)
      if (checkBox.is(':checked')) {
        var thisUOMArray = this.productForm.choice_sides_detail_ids
        if (thisUOMArray.indexOf(sides_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(sides_id)
          this.productForm.choice_sides_default.splice(arryIndex, 1, '1')
        }
      }
    },
    disabledAddonDrinks() {
      var checkBox = $('input#addon-drinks')
      if (checkBox.is(':checked')) {
        $('input.addon_drinks_').prop('disabled', false)
        $('input.price_sides_').prop('disabled', false)
      } else {
        $('input.addon_drinks_').prop('disabled', true)
        $('input.addon_drinks_').prop('checked', false)
        $('input.price_sides_').prop('disabled', true)

        this.productForm.addon_drinks_ids = []
        this.productForm.addon_drinks_detail_ids = []
        this.productForm.addon_drinks_uom_ids = []
        this.productForm.addon_drinks_prices = []
      }
    },
    selectChkAddonDrinks(i) {
      var checkBox = $('input#addon_drinks_' + i)
      if (checkBox.is(':checked')) {
        var addon_drinks_id = $('input.addonDrinksId_' + i).val()
        var addon_drinks_detail_id = $('input.addon_drinks_detailId_' + i).val()
        var addon_drinks_uomId = $('input.addon_drinks_uomId_' + i).val()
        var price = $('input.price_addon_drinks_' + i).val()
        $('input.price_addon_drinks_' + i).prop('disabled', false)

        var thisArray = this.productForm.addon_drinks_detail_ids
        if (thisArray.indexOf(addon_drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(addon_drinks_detail_id)
          this.productForm.addon_drinks_prices.splice(arryIndex, 1, price)
        } else {
          this.productForm.addon_drinks_ids.push(addon_drinks_id)
          this.productForm.addon_drinks_detail_ids.push(addon_drinks_detail_id)
          this.productForm.addon_drinks_uom_ids.push(addon_drinks_uomId)
          this.productForm.addon_drinks_prices.push(price)
        }
      } else {
        var addon_drinks_detail_id = $('input.addon_drinks_detailId_' + i).val()
        $('input.price_addon_drinks_' + i).prop('disabled', true)

        var thisArray = this.productForm.addon_drinks_detail_ids
        if (thisArray.indexOf(addon_drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(addon_drinks_detail_id)
          this.productForm.addon_drinks_ids.splice(arryIndex, 1)
          this.productForm.addon_drinks_detail_ids.splice(arryIndex, 1)
          this.productForm.addon_drinks_uom_ids.splice(arryIndex, 1)
          this.productForm.addon_drinks_prices.splice(arryIndex, 1)
        }
      }
    },
    addonDrinksPrice(id) {
      var price = $('input.price_addon_drinks_' + id).val()
      var addon_drinks_id = $('input.addonDrinksId_' + id).val()
      var addon_drinks_detail_id = $('input.addon_drinks_detailId_' + id).val()
      var addon_drinks_uomId = $('input.addon_drinks_uomId_' + id).val()
      var original_price = $('input.drinks_original_price_' + id).val()
      var dprice = parseFloat(price)

      if (
        price !== '' &&
        parseInt(price) > 0 &&
        isNaN(parseFloat(price)) === false
      ) {
        var thisArray = this.productForm.addon_drinks_detail_ids
        if (thisArray.indexOf(addon_drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(addon_drinks_detail_id)
          this.productForm.addon_drinks_prices.splice(arryIndex, 1, dprice)
        } else {
          this.productForm.addon_drinks_ids.push(addon_drinks_id)
          this.productForm.addon_drinks_detail_ids.push(addon_drinks_detail_id)
          this.productForm.addon_drinks_prices.push(dprice)
          this.productForm.addon_drinks_uom_ids.push(addon_drinks_uomId)
        }
      } else {
        $('input.price_addon_drinks_' + id).val(original_price)
        var thisArray = this.productForm.addon_drinks_detail_ids
        if (thisArray.indexOf(addon_drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(addon_drinks_detail_id)
          this.productForm.addon_drinks_prices.splice(
            arryIndex,
            1,
            original_price
          )
        } else {
          this.productForm.addon_drinks_ids.push(addon_drinks_id)
          this.productForm.addon_drinks_detail_ids.push(addon_drinks_detail_id)
          this.productForm.addon_drinks_prices.push(original_price)
          this.productForm.addon_drinks_uom_ids.push(addon_drinks_uomId)
        }
      }
    },
    disabledSides() {
      var checkBox = $('input#sides')
      if (checkBox.is(':checked')) {
        $('input.sides_').prop('disabled', false)
      } else {
        $('input.sides_').prop('disabled', true)
        $('input.sides_').prop('checked', false)
        $('input.price_sides_').prop('disabled', true)

        this.productForm.sides_ids = []
        this.productForm.sides_detail_ids = []
        this.productForm.sides_prices = []
        this.productForm.sides_uom_ids = []
      }
    },
    selectChkSides(i) {
      var checkBox = $('input#sides_' + i)
      if (checkBox.is(':checked')) {
        var sides_id = $('input.sidesId_' + i).val()
        var sides_detail_id = $('input.sides_detailId_' + i).val()
        var sides_uomId = $('input.sides_uomId_' + i).val()
        var price = $('input.price_sides_' + i).val()
        $('input.price_sides_' + i).prop('disabled', false)

        var thisArray = this.productForm.sides_detail_ids
        if (thisArray.indexOf(sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(sides_detail_id)
          this.productForm.sides_prices.splice(arryIndex, 1, price)
        } else {
          this.productForm.sides_ids.push(sides_id)
          this.productForm.sides_detail_ids.push(sides_detail_id)
          this.productForm.sides_uom_ids.push(sides_uomId)
          this.productForm.sides_prices.push(price)
        }
      } else {
        var sides_detail_id = $('input.sides_detailId_' + i).val()
        $('input.price_sides_' + i).prop('disabled', true)

        var thisArray = this.productForm.sides_detail_ids
        if (thisArray.indexOf(sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(sides_detail_id)
          this.productForm.sides_ids.splice(arryIndex, 1)
          this.productForm.sides_detail_ids.splice(arryIndex, 1)
          this.productForm.sides_uom_ids.splice(arryIndex, 1)
          this.productForm.sides_prices.splice(arryIndex, 1)
        }
      }
    },
    sidesPrice(id) {
      var price = $('input.price_sides_' + id).val()
      var sides_id = $('input.sidesId_' + id).val()
      var sides_detail_id = $('input.sides_detailId_' + id).val()
      var sides_uomId = $('input.sides_uomId_' + id).val()
      var original_price = $('input.sides_original_price_' + id).val()
      var dprice = parseFloat(price)

      if (
        price !== '' &&
        parseInt(price) > 0 &&
        isNaN(parseFloat(price)) === false
      ) {
        var thisArray = this.productForm.sides_detail_ids
        if (thisArray.indexOf(sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(sides_detail_id)
          this.productForm.sides_prices.splice(arryIndex, 1, dprice)
        } else {
          this.productForm.sides_ids.push(sides_id)
          this.productForm.sides_detail_ids.push(sides_detail_id)
          this.productForm.sides_prices.push(dprice)
          this.productForm.sides_uom_ids.push(sides_uomId)
        }
      } else {
        $('input.price_sides_' + id).val(original_price)
        var thisArray = this.productForm.sides_detail_ids
        if (thisArray.indexOf(sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(sides_detail_id)
          this.productForm.sides_prices.splice(arryIndex, 1, original_price)
        } else {
          this.productForm.sides_ids.push(sides_id)
          this.productForm.sides_detail_ids.push(sides_detail_id)
          this.productForm.sides_prices.push(original_price)
          this.productForm.sides_uom_ids.push(sides_uomId)
        }
      }
    },
    disabledDessert() {
      var checkBox = $('input#dessert')
      if (checkBox.is(':checked')) {
        $('input.dessert_').prop('disabled', false)
      } else {
        $('input.dessert_').prop('disabled', true)
        $('input.dessert_').prop('checked', false)
        $('input.price_dessert_').prop('disabled', true)

        this.productForm.dessert_ids = []
        this.productForm.dessert_detail_ids = []
        this.productForm.dessert_prices = []
        this.productForm.dessert_uom_ids = []
      }
    },
    selectChkDessert(i) {
      var checkBox = $('input#dessert_' + i)
      if (checkBox.is(':checked')) {
        var price = $('input.price_dessert_' + i).val()
        var dessert_id = $('input.dessertId_' + i).val()
        var dessert_detail_id = $('input.dessert_detailId_' + i).val()
        var dessert_uom_id = $('input.dessert_uomId_' + i).val()
        $('input.price_dessert_' + i).prop('disabled', false)

        var thisArray = this.productForm.dessert_detail_ids
        if (thisArray.indexOf(dessert_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(dessert_detail_id)
          this.productForm.dessert_prices.splice(arryIndex, 1, price)
        } else {
          this.productForm.dessert_ids.push(dessert_id)
          this.productForm.dessert_detail_ids.push(dessert_detail_id)
          this.productForm.dessert_prices.push(price)
          this.productForm.dessert_uom_ids.push(dessert_uom_id)
        }
      } else {
        var dessert_detail_id = $('input.dessert_detailId_' + i).val()
        $('input.price_dessert_' + i).prop('disabled', true)

        var thisArray = this.productForm.dessert_detail_ids
        if (thisArray.indexOf(dessert_detail_id) > -1) {
          this.productForm.dessert_ids.splice(arryIndex, 1)
          this.productForm.dessert_detail_ids.splice(arryIndex, 1)
          this.productForm.dessert_prices.splice(arryIndex, 1)
          this.productForm.dessert_uom_ids.splice(arryIndex, 1)
        }
      }
    },
    dessertPrice(id) {
      var price = $('input.price_dessert_' + id).val()
      var dessert_id = $('input.dessertId_' + id).val()
      var dessert_detail_id = $('input.dessert_detailId_' + id).val()
      var dessert_uomId = $('input.dessert_uomId_' + id).val()
      var original_price = $('input.dessert_original_price_' + id).val()
      var dprice = parseFloat(price)

      if (
        price !== '' &&
        parseInt(price) > 0 &&
        isNaN(parseFloat(price)) === false
      ) {
        var thisArray = this.productForm.dessert_detail_ids
        if (thisArray.indexOf(dessert_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(dessert_detail_id)
          this.productForm.dessert_prices.splice(arryIndex, 1, dprice)
        } else {
          this.productForm.dessert_ids.push(dessert_id)
          this.productForm.dessert_detail_ids.push(dessert_detail_id)
          this.productForm.dessert_prices.push(dprice)
          this.productForm.dessert_uom_ids.push(dessert_uomId)
        }
      } else {
        $('input.price_dessert_' + id).val(original_price)
        var thisArray = this.productForm.dessert_detail_ids
        if (thisArray.indexOf(dessert_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(dessert_detail_id)
          this.productForm.dessert_prices.splice(arryIndex, 1, original_price)
        } else {
          this.productForm.dessert_ids.push(dessert_id)
          this.productForm.dessert_detail_ids.push(dessert_detail_id)
          this.productForm.dessert_prices.push(original_price)
          this.productForm.dessert_uom_ids.push(dessert_uomId)
        }
      }
    },
    disabledUpgradableItem() {
      var checkBox = $('input#upgradable-item')
      if (checkBox.is(':checked')) {
        $('input.upgrade_').prop('disabled', false)
      } else {
        $('input.upgrade_').prop('disabled', true)
        $('input.upgrade_').prop('checked', false)
        $('input.price_upgrade_').prop('disabled', true)
        $('input.price_upgrade_').val('')

        this.productForm.upgrade_ids = []
        this.productForm.upgrade_detail_ids = []
        this.productForm.upgrade_prices = []
        this.productForm.upgrade_uom_ids = []
      }
    },
    selectChkUpgrade(i) {
      var checkBox = $('input#upgrade_' + i)
      if (checkBox.is(':checked')) {
        var price = 0
        var upgrade_id = $('input.upgradeId_' + i).val()
        var upgrade_detail_id = $('input.upgrade_detailId_' + i).val()
        var upgrade_uom_id = $('input.upgrade_uomId_' + i).val()
        $('input.price_upgrade_' + i).prop('disabled', false)

        var thisArray = this.productForm.upgrade_detail_ids
        if (thisArray.indexOf(upgrade_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(upgrade_detail_id)
          this.productForm.upgrade_prices.splice(arryIndex, 1, price)
        } else {
          this.productForm.upgrade_ids.push(upgrade_id)
          this.productForm.upgrade_detail_ids.push(upgrade_detail_id)
          this.productForm.upgrade_prices.push(price)
          this.productForm.upgrade_uom_ids.push(upgrade_uom_id)
        }
      } else {
        var upgrade_detail_id = $('input.upgrade_detailId_' + i).val()
        $('input.price_upgrade_' + i).prop('disabled', true)
        $('input.price_upgrade_' + i).val('')

        var thisArray = this.productForm.upgrade_detail_ids
        if (thisArray.indexOf(upgrade_detail_id) > -1) {
          this.productForm.upgrade_ids.splice(arryIndex, 1)
          this.productForm.upgrade_detail_ids.splice(arryIndex, 1)
          this.productForm.upgrade_prices.splice(arryIndex, 1)
          this.productForm.upgrade_uom_ids.splice(arryIndex, 1)
        }
      }
    },
    upgradePrice(id) {
      var price = $('input.price_upgrade_' + id).val()
      var upgrade_id = $('input.upgradeId_' + id).val()
      var upgrade_detail_id = $('input.upgrade_detailId_' + id).val()
      var upgrade_uomId = $('input.upgrade_uomId_' + id).val()
      var dprice = parseFloat(price)

      if (
        price === '' ||
        parseFloat(price) === 0 ||
        isNaN(parseFloat(price)) === false
      ) {
        if (price === '') {
          dprice = 0
          $('input.price_upgrade_' + id).val('')
        }

        var thisArray = this.productForm.upgrade_detail_ids
        if (thisArray.indexOf(upgrade_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(upgrade_detail_id)
          this.productForm.upgrade_prices.splice(arryIndex, 1, dprice)
        } else {
          this.productForm.upgrade_ids.push(upgrade_id)
          this.productForm.upgrade_detail_ids.push(upgrade_detail_id)
          this.productForm.upgrade_prices.push(dprice)
          this.productForm.upgrade_uom_ids.push(upgrade_uomId)
        }
      } else {
        dprice = 0

        var thisArray = this.productForm.upgrade_detail_ids
        if (thisArray.indexOf(upgrade_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(upgrade_detail_id)
          this.productForm.upgrade_prices.splice(arryIndex, 1, dprice)
        } else {
          this.productForm.upgrade_ids.push(upgrade_id)
          this.productForm.upgrade_detail_ids.push(upgrade_detail_id)
          this.productForm.upgrade_prices.push(dprice)
          this.productForm.upgrade_uom_ids.push(upgrade_uom_id)
        }

        $('input.price_upgrade_' + id).val('')
      }
    },
    disabledBreakfast() {
      var checkBox = $('input#breakfast')
      if (checkBox.is(':checked')) {
        this.productForm.breakfast = 1
      } else {
        this.productForm.breakfast = 0
        this.productForm.time_start = null
        this.productForm.time_end = null
      }
    },
    checkProductForm() {
      if (this.productForm.categories.length) {
        if (
          this.productForm.breakfast === 1 &&
          (this.productForm.time_start === '' ||
            this.productForm.time_start === null ||
            this.productForm.time_end === '' ||
            this.productForm.time_end === '')
        ) {
          if (
            this.productForm.time_start === '' ||
            this.productForm.time_start === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Breakfast (time start) is required.'
            })

            return
          }

          if (
            this.productForm.time_end === '' ||
            this.productForm.time_end === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Breakfast (time end) is required.'
            })

            return
          }
        }

        if (
          this.productForm.breakfast === 1 &&
          this.productForm.time_start !== null &&
          this.productForm.time_end !== null
        ) {
          var dateToday = '2020-10-14'
          var time_start = new Date(this.productForm.time_start)
          if (isNaN(time_start.getTime())) {
            time_start = new Date(dateToday + ' ' + this.productForm.time_start)
          }

          var time_end = new Date(this.productForm.time_end)
          if (isNaN(time_end.getTime())) {
            time_end = new Date(dateToday + ' ' + this.productForm.time_end)
          }

          if (time_start.getTime() >= time_end.getTime()) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Time Start must be earlier than Time End.'
            })

            return
          }
        }

        var UOM = $('input#uom')
        if (UOM.is(':checked')) {
          if (
            this.productForm.uom_ids.length === 0 ||
            this.productForm.uom_ids.length !=
              this.productForm.uom_prices.length
          ) {
            if (
              this.productForm.uom_ids.length !=
              this.productForm.uom_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Product price is required.'
              })

              return
            }

            if (this.productForm.uom_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one unit of measure and please input its corresponding product price.'
              })

              return
            }
          }

          var thisArray = this.productForm.uom_default
          if (thisArray.indexOf('1') == -1) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Please choose atleast one default unit of measure.'
            })

            return
          }
        } else {
          if (
            this.productForm.price === '' ||
            this.productForm.price === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Product price is required.'
            })

            return
          }
        }

        var no_specific_price = $('input#editno_specific_price')
        if (no_specific_price.is(':checked')) {
          if (this.price_per_gram === 0.0) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Price per gram is required.'
            })

            return
          }
        }

        var variation = $('input#variation')
        if (variation.is(':checked')) {
          if (
            this.productForm.variation === '' ||
            this.productForm.variation === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Variation is required.'
            })

            return
          }
        }

        var flavor = $('input#flavor')
        if (flavor.is(':checked')) {
          if (
            this.productForm.no_flavor === '' ||
            this.productForm.no_flavor === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'The field no of pieces under flavor is required.'
            })

            return
          }

          if (
            this.productForm.flavor_ids.length === 0 ||
            this.productForm.flavor_ids.length !=
              this.productForm.flavor_prices.length
          ) {
            if (
              this.productForm.flavor_ids.length !=
              this.productForm.flavor_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon price for types of flavor is required.'
              })

              return
            }

            if (this.productForm.flavor_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one flavor and please input its corresponding price.'
              })

              return
            }
          }

          var thisArray = this.productForm.flavor_default
          if (thisArray.indexOf('1') == -1) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Please choose atleast one default for flavor.'
            })

            return
          }
        }

        var cooking_way = $('input#cooking_way')
        if (cooking_way.is(':checked')) {
          if (
            this.productForm.cooking_ids.length === 0 ||
            this.productForm.cooking_ids.length !=
              this.productForm.cooking_prices.length
          ) {
            if (
              this.productForm.cooking_ids.length !=
              this.productForm.cooking_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon price for types of cooking way is required.'
              })

              return
            }

            if (this.productForm.cooking_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one cooking way and please input its corresponding price.'
              })

              return
            }
          }

          var thisArray = this.productForm.cooking_default
          if (thisArray.indexOf('1') == -1) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Please choose atleast one default for type of cooking way.'
            })

            return
          }
        }

        var sauce_type = $('input#sauce_type')
        if (sauce_type.is(':checked')) {
          if (
            this.productForm.sauce_ids.length === 0 ||
            this.productForm.sauce_ids.length !=
              this.productForm.sauce_prices.length
          ) {
            if (
              this.productForm.sauce_ids.length !=
              this.productForm.sauce_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon price for type of sauce is required.'
              })

              return
            }

            if (this.productForm.sauce_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one type of sauce and please input its corresponding price.'
              })

              return
            }
          }

          var thisArray = this.productForm.sauce_default
          if (thisArray.indexOf('1') == -1) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Please choose atleast one default for type of sauce.'
            })

            return
          }
        }

        var noodles_type = $('input#noodles_type')
        if (noodles_type.is(':checked')) {
          if (
            this.productForm.noodles_ids.length === 0 ||
            this.productForm.noodles_ids.length !=
              this.productForm.noodles_prices.length
          ) {
            if (
              this.productForm.noodles_ids.length !=
              this.productForm.noodles_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon Price for type of noodles is required.'
              })

              return
            }

            if (this.productForm.noodles_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one type of noodles and please input its corresponding price.'
              })

              return
            }
          }

          var thisArray = this.productForm.noodles_default
          if (thisArray.indexOf('1') == -1) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Please choose atleast one default for type of noodles.'
            })

            return
          }
        }

        var toppings = $('input#toppings')
        if (toppings.is(':checked')) {
          if (
            this.productForm.toppings_ids.length === 0 ||
            this.productForm.toppings_ids.length !=
              this.productForm.toppings_prices.length
          ) {
            if (
              this.productForm.toppings_ids.length !=
              this.productForm.toppings_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon Price for type of toppings is required.'
              })

              return
            }

            if (this.productForm.toppings_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one type of toppings and please input its corresponding price.'
              })

              return
            }
          }

          var thisArray = this.productForm.toppings_default
          if (thisArray.indexOf('1') == -1) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Please choose atleast one default for type of toppings.'
            })

            return
          }
        }

        var drinks = $('input#drinks')
        if (drinks.is(':checked')) {
          if (
            this.productForm.no_drinks === '' ||
            this.productForm.no_drinks === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'The field no of pieces under drinks is required.'
            })

            return
          }

          if (
            this.productForm.drinks_ids.length === 0 ||
            this.productForm.drinks_ids.length !=
              this.productForm.drinks_prices.length
          ) {
            if (
              this.productForm.drinks_ids.length !=
              this.productForm.drinks_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon price for drink is required.'
              })

              return
            }

            if (this.productForm.drinks_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one drink and please input its corresponding product price.'
              })

              return
            }
          }

          var thisArray = this.productForm.drinks_default
          if (thisArray.indexOf('1') == -1) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Please choose atleast one default for drinks.'
            })

            return
          }
        }

        var fries = $('input#fries')
        if (fries.is(':checked')) {
          if (
            this.productForm.no_fries === '' ||
            this.productForm.no_fries === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'The field no of pieces under fries is required.'
            })

            return
          }

          if (
            this.productForm.fries_ids.length === 0 ||
            this.productForm.fries_ids.length !=
              this.productForm.fries_prices.length
          ) {
            if (
              this.productForm.fries_ids.length !=
              this.productForm.fries_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon price for drink is required.'
              })

              return
            }

            if (this.productForm.fries_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one fries and please input its corresponding product price.'
              })

              return
            }
          }

          var thisArray = this.productForm.fries_default
          if (thisArray.indexOf('1') == -1) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Please choose atleast one default for fries.'
            })

            return
          }
        }

        var choice_sides = $('input#choice_sides')
        if (choice_sides.is(':checked')) {
          if (
            this.productForm.no_choice_sides === '' ||
            this.productForm.no_choice_sides === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'The field no of pieces under sides is required.'
            })

            return
          }

          if (
            this.productForm.choice_sides_ids.length === 0 ||
            this.productForm.choice_sides_ids.length !=
              this.productForm.choice_sides_prices.length
          ) {
            if (
              this.productForm.choice_sides_ids.length !=
              this.productForm.choice_sides_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon price for side is required.'
              })

              return
            }

            if (this.productForm.choice_sides_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one side and please input its corresponding product price.'
              })

              return
            }
          }

          var thisArray = this.productForm.choice_sides_default
          if (thisArray.indexOf('1') == -1) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Please choose atleast one default for choosen sides.'
            })

            return
          }
        }

        var addon_drinks = $('input#addon-drinks')
        if (addon_drinks.is(':checked')) {
          if (
            this.productForm.addon_drinks_ids.length === 0 ||
            this.productForm.addon_drinks_ids.length !=
              this.productForm.addon_drinks_prices.length
          ) {
            if (
              this.productForm.addon_drinks_ids.length !=
              this.productForm.addon_drinks_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon price for drinks is required.'
              })

              return
            }

            if (this.productForm.addon_drinks_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one drink and please input its corresponding product price.'
              })

              return
            }
          }
        }

        var sides = $('input#sides')
        if (sides.is(':checked')) {
          if (
            this.productForm.sides_ids.length === 0 ||
            this.productForm.sides_ids.length !=
              this.productForm.sides_prices.length
          ) {
            if (
              this.productForm.sides_ids.length !=
              this.productForm.sides_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon price for dessert is required.'
              })

              return
            }

            if (this.productForm.sides_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one side and please input its corresponding product price.'
              })

              return
            }
          }
        }

        var dessert = $('input#dessert')
        if (dessert.is(':checked')) {
          if (
            this.productForm.dessert_ids.length === 0 ||
            this.productForm.dessert_ids.length !=
              this.productForm.dessert_prices.length
          ) {
            if (
              this.productForm.dessert_ids.length !=
              this.productForm.dessert_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon price for dessert is required.'
              })

              return
            }

            if (this.productForm.dessert_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one dessert and please input its corresponding product price.'
              })

              return
            }
          }
        }

        var upgradable_item = $('input#upgradable-item')
        if (upgradable_item.is(':checked')) {
          if (
            this.productForm.upgrade_ids.length === 0 ||
            this.productForm.upgrade_ids.length !=
              this.productForm.upgrade_prices.length
          ) {
            if (
              this.productForm.upgrade_ids.length !=
              this.productForm.upgrade_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon price for upgradable item is required.'
              })

              return
            }

            if (this.productForm.upgrade_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one upgradable item and please input its corresponding product price.'
              })

              return
            }
          }
        }

        this.clickSubmit = true
        this.productForm.image = this.$refs.image.files[0]
        this.productForm
          .submit('post', '/product/saved_product_details', {
            // Transform form data to FormData
            transformRequest: [
              function(data, headers) {
                return serialize(data)
              }
            ],

            onUploadProgress: e => {
              // Do whatever you want with the progress event
              // console.log(e)
            }
          })
          .then(({ data, status }) => {
            const { message } = data

            swal({
              title: 'Success!',
              text: message,
              type: 'success',
              allowOutsideClick: false,
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-primary'
            }).then(
              function() {
                this.clickSubmit = false
                this.productForm.clear()
                this.productForm.reset()
                this.$refs.image.value = null
                this.showPriceForm = true
                $('input.check-choice').prop('checked', false)
                $('input.check-option').prop('checked', false)
                $('input.check-option').prop('disabled', true)
                $('input.input-option').val('')
                $('input.input-option').prop('disabled', true)

                $('div#modal-add-product').modal('hide')
                this.$parent.fetchProductList()
              }.bind(this)
            )
          })
          .catch(error => {
            this.clickSubmit = false
            var { data, status } = error.response
            if (status === 401) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Session has been expired.'
              })
            } else if (status === 422) {
              const { message } = data

              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: message
              })
            } else {
              Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Oops, something went wrong!'
              })
            }
          })
      } else {
        Swal.fire({
          type: 'warning',
          title: 'Warning',
          text: 'Please choose atleast one category.'
        }).then(result => {
          return
        })
      }
    }
  }
}
</script>
