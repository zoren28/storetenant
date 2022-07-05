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
                <label for="product_name" class="control-label"
                  >Product Name</label
                >
                <span class="text-danger">*</span>
                <input
                  v-model="editProductForm.product_name"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': editProductForm.errors.has('product_name')
                  }"
                  id="product_name"
                  placeholder="Product Name"
                  autocomplete="off"
                />
                <has-error
                  :form="editProductForm"
                  field="product_name"
                ></has-error>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="editproduct-image" class="control-label"
                  >Product Image</label
                >
                <input
                  type="file"
                  class="form-control"
                  :class="{ 'is-invalid': editProductForm.errors.has('image') }"
                  id="editproduct-image"
                  ref="image"
                  placeholder="Product Image"
                />
                <has-error :form="editProductForm" field="image"></has-error>
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
                    v-model="editProductForm.categories"
                    :id="'editcategory_id_' + fd_type.category_id"
                  />
                  <label :for="'editcategory_id_' + fd_type.category_id">{{
                    fd_type.category
                  }}</label>
                  <br />
                </div>
                <small v-if="!editProductForm.categories.length"
                  ><code>Note:</code> Please choose atleast one category.</small
                >
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="description"
                      >Description <span class="text-danger">*</span></label
                    >
                    <textarea
                      v-model="editProductForm.description"
                      id="description"
                      class="form-control"
                      rows="4"
                      :class="{
                        'is-invalid': editProductForm.errors.has('description')
                      }"
                    ></textarea>
                    <has-error
                      :form="editProductForm"
                      field="description"
                    ></has-error>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <a href="javascript:void(0)" @click="locationRange"
                      ><label>Location Range</label></a
                    >
                    <select
                      v-model="editProductForm.location_range"
                      class="form-control"
                      :class="{
                        'is-invalid': editProductForm.errors.has(
                          'location_range'
                        )
                      }"
                    >
                      <option value="0">Within the agreed location</option>
                      <option value="1">Rider's Fee is ₱ 30</option>
                      <option value="2"
                        >Rider's Fee is from ₱ 30 to ₱ 50</option
                      >
                      <option value="3"
                        >Rider's Fee is from ₱ 30 to ₱ 70</option
                      >
                      <option value="4"
                        >Rider's Fee is from ₱ 30 to ₱ 90</option
                      >
                      <option value="5"
                        >Rider's Fee is from ₱ 30 to ₱ 110</option
                      >
                      <option value="6"
                        >Rider's Fee is from ₱ 30 to ₱ 135</option
                      >
                      <option value="7"
                        >Rider's Fee is from ₱ 30 to ₱ 150</option
                      >
                    </select>
                    <has-error
                      :form="editProductForm"
                      field="location_range"
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
                      id="editvariation"
                      @change="disabledVariation"
                    />
                    <label class="custom-control-label" for="editvariation">
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
                        v-model="editProductForm.variation"
                        name="variation"
                        class="custom-control-input check-option variation"
                        id="editsolo"
                        value="solo"
                        disabled
                      />
                      <label class="custom-control-label" for="editsolo">
                        Solo</label
                      >
                    </div>
                  </div>
                  <div class="mt-1 pl-3">
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        v-model="editProductForm.variation"
                        name="variation"
                        class="custom-control-input check-option variation"
                        id="editvalue-meal"
                        value="value meal"
                        disabled
                      />
                      <label class="custom-control-label" for="editvalue-meal">
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
                      class="custom-control-input"
                      id="editbreakfast"
                      @change="disabledBreakfast"
                    />
                    <label class="custom-control-label" for="editbreakfast">
                      Breakfast (Optional)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group mt-1 pl-3">
                    <label for="editbf_start">Time Start</label>
                    <input
                      v-if="editProductForm.breakfast === 0"
                      type="text"
                      id="editbf_start"
                      class="form-control"
                      disabled
                    />
                    <timeStart
                      v-model="editProductForm.time_start"
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
                    <label for="editbf_end">Time End</label>
                    <input
                      v-if="editProductForm.breakfast === 0"
                      type="text"
                      id="editbf_end"
                      class="form-control"
                      disabled
                    />
                    <timeEnd
                      v-model="editProductForm.time_end"
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
                      v-model="editProductForm.no_specific_price"
                      class="custom-control-input check-choice"
                      id="no_specific_price"
                    />
                    <label class="custom-control-label" for="no_specific_price">
                      No Specific Price
                      <span class="text-danger"
                        >(For Prawn Farm Only)</span
                      ></label
                    >
                  </div>
                </div>
              </div>
              <div class="row" v-show="editProductForm.no_specific_price">
                <div class="col-md-6">
                  <div class="form-group mt-1 pl-3">
                    <label for="editprice_per_gram"
                      >Converted Price per 1 gram</label
                    >
                    <input
                      v-model.number="editProductForm.price_per_gram"
                      id="editprice_per_gram"
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
                      v-model="editProductForm.free_menu"
                      class="custom-control-input check-choice"
                      id="editfree_menu"
                    />
                    <label class="custom-control-label" for="editfree_menu">
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
                      v-model="editProductForm.promo"
                      class="custom-control-input check-choice"
                      id="editpromo"
                    />
                    <label class="custom-control-label" for="editpromo">
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
                      id="edituom"
                      :disabled="fd_unit_measures.length === 0"
                      @change="disabledUOM"
                    />
                    <label class="custom-control-label" for="edituom">
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
                        <th>Default</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(uom, i) in fd_unit_measures" :key="i">
                        <input
                          v-show="false"
                          class="uomId_"
                          :class="'edituomId_' + uom.id"
                          :value="uom.id"
                        />
                        <td width="40%">
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input check-option uom_"
                              :id="'editchk_uom_' + uom.id"
                              disabled
                              @change="selectChkUOM(uom.id)"
                            />
                            <label
                              class="custom-control-label"
                              :for="'editchk_uom_' + uom.id"
                              >{{ uom.unit_measure }}</label
                            >
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            class="form-control input-option price_uom_"
                            :class="'editprice_uom_' + uom.id"
                            disabled
                            @keyup="uomPrice(uom.id)"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            class="form-control input-option stocks_"
                            :class="'editstocks_' + uom.id"
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
                              :id="'editradio_uom_' + uom.id"
                              disabled
                              @click="uomDefault(uom.id)"
                            />
                            <label
                              class="custom-control-label"
                              :for="'editradio_uom_' + uom.id"
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
                      <label for="editprice"
                        >Price <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model.number="editProductForm.price"
                        id="editprice"
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
                      <label for="editstocks">No. of Item Available</label>
                      <input
                        class="form-control"
                        id="editstocks"
                        v-model.number="editProductForm.stocks"
                        type="number"
                        min="0"
                        :class="{
                          'is-invalid': editProductForm.errors.has('stocks')
                        }"
                      />
                      <has-error
                        :form="editProductForm"
                        field="stocks"
                      ></has-error>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div
            class="row"
            v-for="(suggest, index) in fd_suggestion"
            :key="index"
          >
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input check-choice"
                      :id="`editsuggestion${suggest.id}`"
                      @change="disabledSuggestion(suggest.id)"
                    />
                    <label
                      class="custom-control-label"
                      :for="`editsuggestion${suggest.id}`"
                    >
                      {{ suggest.suggestion }} (Optional)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <div class="row" v-if="suggest.id === 1">
                    <div class="col-md-6">
                      <label :for="`editno_pieces${suggest.id}`"
                        >No of Pieces</label
                      >
                      <input
                        type="number"
                        v-model.number="editProductForm.no_flavor"
                        min="1"
                        :id="`editno_pieces${suggest.id}`"
                        class="form-control input-option"
                        autocomplete="off"
                        disabled
                        @keyup="inputNumber(`editno_pieces${suggest.id}`)"
                        @change="inputNumber(`editno_pieces${suggest.id}`)"
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
                            <th width="40%">{{ suggest.suggestion }}</th>
                            <th>Addon Price</th>
                            <th width="5%">Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="suggest.product_suggestion.length > 0"
                          >
                            <tr
                              v-for="(ps, index) in suggest.product_suggestion"
                              :key="index"
                            >
                              <input
                                v-show="false"
                                :class="
                                  `editsuggestionId${suggest.id} editsuggestionId${suggest.id}${ps.id}`
                                "
                                :value="ps.id"
                              />
                              <td width="40%">
                                <div class="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    class="custom-control-input check-option"
                                    :class="`editsuggest_${suggest.id}`"
                                    :id="`editsuggest_${suggest.id}${ps.id}`"
                                    disabled
                                    @change="
                                      selectChkSuggest(suggest.id, ps.id)
                                    "
                                  />
                                  <label
                                    class="custom-control-label"
                                    :for="`editsuggest_${suggest.id}${ps.id}`"
                                    >{{ ps.description }}</label
                                  >
                                </div>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  class="form-control input-option"
                                  :class="
                                    `editprice_suggest_${suggest.id} editprice_suggest_${suggest.id}${ps.id}`
                                  "
                                  disabled
                                  @keyup="suggestPrice(suggest.id, ps.id)"
                                />
                              </td>
                              <td align="center">
                                <div class="custom-control custom-radio">
                                  <input
                                    type="radio"
                                    :name="`default_suggest${suggest.id}`"
                                    class="custom-control-input check-option"
                                    :class="`editradio_suggest_${suggest.id}`"
                                    :id="
                                      `editradio_suggest${suggest.id}${ps.id}`
                                    "
                                    disabled
                                    @click="suggestDefault(suggest.id, ps.id)"
                                  />
                                  <label
                                    class="custom-control-label"
                                    :for="
                                      `editradio_suggest${suggest.id}${ps.id}`
                                    "
                                  ></label>
                                </div>
                              </td>
                            </tr>
                          </template>
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
                      id="editdrinks"
                      :disabled="fd_drinks.length === 0"
                      @change="disabledDrinks"
                    />
                    <label class="custom-control-label" for="editdrinks">
                      Choice of Drinks (For Upgrade)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="editno_drinks">No of Pieces</label>
                      <input
                        type="number"
                        v-model.number="editProductForm.no_drinks"
                        min="1"
                        id="editno_drinks"
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
                                'editdrinksId_' + d.product_id + '_' + d.uom_id
                              "
                              :value="d.product_id"
                            />
                            <input
                              v-show="false"
                              class="drinks_detailId_"
                              :class="
                                'editdrinks_detailId_' +
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
                                'editdrinks_uomId_' +
                                  d.product_id +
                                  '_' +
                                  d.uom_id
                              "
                              :value="d.uom_id"
                            />
                            <td width="40%">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input check-option drinks_"
                                  :id="
                                    'editdrinks_' +
                                      d.product_id +
                                      '_' +
                                      d.uom_id
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
                                    'editdrinks_' +
                                      d.product_id +
                                      '_' +
                                      d.uom_id
                                  "
                                  >{{ d.product_name }}</label
                                >
                                <label
                                  v-else
                                  class="custom-control-label"
                                  :for="
                                    'editdrinks_' +
                                      d.product_id +
                                      '_' +
                                      d.uom_id
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
                                  'editprice_drinks_' +
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
                                  name="drinks_default"
                                  class="custom-control-input check-option radio_drinks_"
                                  :id="
                                    'editradio_drinks_' +
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
                                    'editradio_drinks_' +
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
                      id="editfries"
                      :disabled="fd_fries.length === 0"
                      @change="disabledFries"
                    />
                    <label class="custom-control-label" for="editfries">
                      Choice of Fries (For Upgrade)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="editno_fries">No of Pieces</label>
                      <input
                        type="number"
                        v-model.number="editProductForm.no_fries"
                        min="1"
                        id="editno_fries"
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
                                'editfriesId_' + f.product_id + '_' + f.uom_id
                              "
                              :value="f.product_id"
                            />
                            <input
                              v-show="false"
                              class="fries_detailId_"
                              :class="
                                'editfries_detailId_' +
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
                                'editfries_uomId_' +
                                  f.product_id +
                                  '_' +
                                  f.uom_id
                              "
                              :value="f.uom_id"
                            />
                            <td width="40%">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input check-option fries_"
                                  :id="
                                    'editfries_' + f.product_id + '_' + f.uom_id
                                  "
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
                                    'editfries_' + f.product_id + '_' + f.uom_id
                                  "
                                  >{{ f.product_name }}</label
                                >
                                <label
                                  v-else
                                  class="custom-control-label"
                                  :for="
                                    'editfries_' + f.product_id + '_' + f.uom_id
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
                                  'editprice_fries_' +
                                    f.product_id +
                                    '_' +
                                    f.uom_id
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
                                  name="fries_default"
                                  class="custom-control-input check-option radio_fries_"
                                  :id="
                                    'editradio_fries_' +
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
                                    'editradio_fries_' +
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
                      id="editchoice_sides"
                      :disabled="fd_choice_sides.length === 0"
                      @change="disabledChoiceSides"
                    />
                    <label class="custom-control-label" for="editchoice_sides">
                      Choice of Sides (For Upgrade)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-2 pl-3">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="editno_choice_sides">No of Pieces</label>
                      <input
                        type="number"
                        v-model.number="editProductForm.no_choice_sides"
                        min="1"
                        id="editno_choice_sides"
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
                                'editchoice_sidesId_' +
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
                                'editchoice_sides_detailId_' +
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
                                'editchoice_sides_uomId_' +
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
                                    'editchoice_sides_' +
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
                                    'editchoice_sides_' +
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
                                    'editchoice_sides_' +
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
                                  'editprice_choice_sides_' +
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
                                  name="choicesides_default"
                                  class="custom-control-input check-option radio_sides_"
                                  :id="
                                    'editradio_sides_' +
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
                                    'editradio_sides_' +
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
                      id="editaddon-drinks"
                      :disabled="fd_addon_drinks.length === 0"
                      @change="disabledAddonDrinks"
                    />
                    <label class="custom-control-label" for="editaddon-drinks">
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
                                'editaddonDrinksId_' +
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
                                'editaddon_drinks_detailId_' +
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
                                'editaddon_drinks_uomId_' +
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
                                'editdrinks_original_price_' +
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
                                    'editaddon_drinks_' +
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
                                    'editaddon_drinks_' +
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
                                    'editaddon_drinks_' +
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
                                  'editprice_addon_drinks_' +
                                    ad.product_id +
                                    '_' +
                                    ad.uom_id
                                "
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
                      id="editsides"
                      :disabled="fd_addon_sides.length === 0"
                      @change="disabledSides"
                    />
                    <label class="custom-control-label" for="editsides">
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
                                'editsidesId_' + s.product_id + '_' + s.uom_id
                              "
                              :value="s.product_id"
                            />
                            <input
                              v-show="false"
                              class="sides_detailId_"
                              :class="
                                'editsides_detailId_' +
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
                                'editsides_uomId_' +
                                  s.product_id +
                                  '_' +
                                  s.uom_id
                              "
                              :value="s.uom_id"
                            />
                            <td width="40%">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input check-option sides_"
                                  :id="
                                    'editsides_' + s.product_id + '_' + s.uom_id
                                  "
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
                                    'editsides_' + s.product_id + '_' + s.uom_id
                                  "
                                  >{{ s.product_name }}</label
                                >
                                <label
                                  v-else
                                  class="custom-control-label"
                                  :for="
                                    'editsides_' + s.product_id + '_' + s.uom_id
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
                                  'editprice_sides_' +
                                    s.product_id +
                                    '_' +
                                    s.uom_id
                                "
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
                      id="editdessert"
                      :disabled="fd_dessert.length === 0"
                      @change="disabledDessert"
                    />
                    <label class="custom-control-label" for="editdessert">
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
                                'editdessertId_' +
                                  ds.product_id +
                                  '_' +
                                  ds.uom_id
                              "
                              :value="ds.product_id"
                            />
                            <input
                              v-show="false"
                              class="dessert_detailId_"
                              :class="
                                'editdessert_detailId_' +
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
                                'editdessert_uomId_' +
                                  ds.product_id +
                                  '_' +
                                  ds.uom_id
                              "
                              :value="ds.uom_id"
                            />
                            <td width="40%">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input check-option dessert_"
                                  :id="
                                    'editdessert_' +
                                      ds.product_id +
                                      '_' +
                                      ds.uom_id
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
                                    'editdessert_' +
                                      ds.product_id +
                                      '_' +
                                      ds.uom_id
                                  "
                                  >{{ ds.product_name }}</label
                                >
                                <label
                                  v-else
                                  class="custom-control-label"
                                  :for="
                                    'editdessert_' +
                                      ds.product_id +
                                      '_' +
                                      ds.uom_id
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
                                  'editprice_dessert_' +
                                    ds.product_id +
                                    '_' +
                                    ds.uom_id
                                "
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
                      id="editupgradable-item"
                      :disabled="fd_upgradable_item.length === 0"
                      @change="disabledUpgradableItem"
                    />
                    <label
                      class="custom-control-label"
                      for="editupgradable-item"
                    >
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
                                'editupgradeId_' +
                                  ui.product_id +
                                  '_' +
                                  ui.uom_id
                              "
                              :value="ui.product_id"
                            />
                            <input
                              v-show="false"
                              class="upgrade_detailId_"
                              :class="
                                'editupgrade_detailId_' +
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
                                'editupgrade_uomId_' +
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
                                'editupgrade_original_price_' +
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
                                    'editupgrade_' +
                                      ui.product_id +
                                      '_' +
                                      ui.uom_id
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
                                    'editupgrade_' +
                                      ui.product_id +
                                      '_' +
                                      ui.uom_id
                                  "
                                  >{{ ui.product_name }}</label
                                >
                                <label
                                  v-else
                                  class="custom-control-label"
                                  :for="
                                    'editupgrade_' +
                                      ui.product_id +
                                      '_' +
                                      ui.uom_id
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
                                  'editprice_upgrade_' +
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
    <!-- /.modal -->
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
  name: 'EditProductComponent',
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
    'fd_upgradable_item',
    'product_info'
  ],
  components: {
    timeStart: Datetime,
    timeEnd: Datetime
  },
  data() {
    return {
      showPriceForm: true,
      clickSubmit: false,
      editProductForm: new Form({
        product_id: null,
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
        suggestion: {},
        no_flavor: null,
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
        promo: false,
        location_range: null
      })
    }
  },
  methods: {
    disabledSuggestion(suggestion_id) {
      var checkBox = $('input#editsuggestion' + suggestion_id)
      if (checkBox.is(':checked')) {
        $('input#editno_pieces' + suggestion_id).prop('disabled', false)
        $('input.editsuggest_' + suggestion_id).prop('disabled', false)

        this.$set(this.editProductForm.suggestion, suggestion_id, {
          ids: [],
          prices: [],
          default: []
        })
      } else {
        $('input#editno_pieces' + suggestion_id).prop('disabled', true)
        $('input.editsuggest_' + suggestion_id).prop('disabled', true)
        $('input.editsuggest_' + suggestion_id).prop('checked', false)
        $('input.editprice_suggest_' + suggestion_id).prop('disabled', true)
        $('input.editprice_suggest_' + suggestion_id).val('')
        $('input.editradio_suggest_' + suggestion_id).prop('checked', false)
        $('input.editradio_suggest_' + suggestion_id).prop('disabled', true)

        this.editProductForm.no_flavor = null
        this.$delete(this.editProductForm.suggestion, suggestion_id)
      }
    },
    selectChkSuggest(suggestion_id, ps_id) {
      $(`input.editprice_suggest_${suggestion_id}${ps_id}`).val('')
      var checkBox = $(`input#editsuggest_${suggestion_id}${ps_id}`)
      if (checkBox.is(':checked')) {
        $(`input.editprice_suggest_${suggestion_id}${ps_id}`).prop(
          'disabled',
          false
        )
        $(`input#editradio_suggest${suggestion_id}${ps_id}`).prop(
          'disabled',
          false
        )

        var price = '0'
        var suggest_id = $(
          `input.editsuggestionId${suggestion_id}${ps_id}`
        ).val()

        var thisArray = this.editProductForm.suggestion[suggestion_id].ids
        if (thisArray.indexOf(suggest_id) > -1) {
          var arryIndex = thisArray.indexOf(suggest_id)
          this.editProductForm.suggestion[suggestion_id].prices.splice(
            arryIndex,
            1,
            price
          )
        } else {
          this.editProductForm.suggestion[suggestion_id].ids.push(suggest_id)
          this.editProductForm.suggestion[suggestion_id].prices.push(price)
          this.editProductForm.suggestion[suggestion_id].default.push('0')
        }
      } else {
        $(`input.editprice_suggest_${suggestion_id}${ps_id}`).prop(
          'disabled',
          true
        )
        $(`input#editradio_suggest${suggestion_id}${ps_id}`).prop(
          'disabled',
          true
        )
        $(`input#editradio_suggest${suggestion_id}${ps_id}`).prop(
          'checked',
          false
        )

        var suggest_id = $(
          `input.editsuggestionId${suggestion_id}${ps_id}`
        ).val()

        var thisArray = this.editProductForm.suggestion[suggestion_id].ids
        if (thisArray.indexOf(suggest_id) > -1) {
          var arryIndex = thisArray.indexOf(suggest_id)
          this.editProductForm.suggestion[suggestion_id].ids.splice(
            arryIndex,
            1
          )
          this.editProductForm.suggestion[suggestion_id].prices.splice(
            arryIndex,
            1
          )
          this.editProductForm.suggestion[suggestion_id].default.splice(
            arryIndex,
            1
          )
        }
      }
    },
    suggestPrice(suggestion_id, ps_id) {
      var price = $(`input.editprice_suggest_${suggestion_id}${ps_id}`).val()
      var suggest_id = $(`input.editsuggestionId${suggestion_id}${ps_id}`).val()
      var fprice = parseFloat(price)

      if (
        price === '' ||
        parseFloat(price) === 0 ||
        isNaN(parseFloat(price)) === false
      ) {
        if (price === '') {
          fprice = 0
          $(`input.editprice_suggest_${suggestion_id}${ps_id}`).val('')
        }
        var thisArray = this.editProductForm.suggestion[suggestion_id].ids
        if (thisArray.indexOf(suggest_id) > -1) {
          var arryIndex = thisArray.indexOf(suggest_id)
          this.editProductForm.suggestion[suggestion_id].prices.splice(
            arryIndex,
            1,
            fprice
          )
        } else {
          this.editProductForm.suggestion[suggestion_id].ids.push(suggest_id)
          this.editProductForm.suggestion[suggestion_id].prices.push(fprice)
          this.editProductForm.suggestion[suggestion_id].default.push('0')
        }
      } else {
        fprice = 0
        var thisArray = this.editProductForm.suggestion[suggestion_id].ids
        if (thisArray.indexOf(suggest_id) > -1) {
          var arryIndex = thisArray.indexOf(suggest_id)
          this.editProductForm.suggestion[suggestion_id].prices.splice(
            arryIndex,
            1,
            fprice
          )
        } else {
          this.editProductForm.suggestion[suggestion_id].ids.push(suggest_id)
          this.editProductForm.suggestion[suggestion_id].prices.push(fprice)
          this.editProductForm.suggestion[suggestion_id].default.push('0')
        }
        $(`input.editprice_suggest_${suggestion_id}${ps_id}`).val('')
      }
    },
    suggestDefault(suggestion_id, ps_id) {
      var suggest_id = $(`input.editsuggestionId${suggestion_id}${ps_id}`).val()

      var thisUOMArray = this.editProductForm.suggestion[suggestion_id].default
      if (thisUOMArray.indexOf('1') > -1) {
        var arryIndex = thisUOMArray.indexOf('1')
        this.editProductForm.suggestion[suggestion_id].default.splice(
          arryIndex,
          1,
          '0'
        )
      }

      var checkBox = $(`input#editradio_suggest${suggestion_id}${ps_id}`)
      if (checkBox.is(':checked')) {
        var thisUOMArray = this.editProductForm.suggestion[suggestion_id].ids
        if (thisUOMArray.indexOf(suggest_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(suggest_id)
          this.editProductForm.suggestion[suggestion_id].default.splice(
            arryIndex,
            1,
            '1'
          )
        }
      }
    },
    locationRange() {
      $('div#modal-location-range').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    async fetch_product_details(product_id) {
      const { data } = await axios.get(
        `/product/fetch_product_details/${product_id}`
      )

      this.product_details(data)
      this.category_type(data.product_categories)
      this.product_price(data.product_price)
      this.product_variation(data.variation)
      this.product_suggestion(data.addon_suggestion, data.no_flavor)
      this.choice_drinks(data.product_choice, data.no_drinks)
      this.choice_fries(data.product_choice, data.no_fries)
      this.choice_sides(data.product_choice, data.no_sides)
      this.addon_drinks(data.product_addon)
      this.addon_sides(data.product_addon)
      this.addon_dessert(data.product_addon)
      this.upgradable_item(data.product_addon)
    },
    product_details(data) {
      this.editProductForm.product_name = data.product_name
      this.editProductForm.description = data.description
      this.editProductForm.addon_id = data.addon_id
      this.editProductForm.previous_image = data.image
      this.editProductForm.no_specific_price = data.no_specific_price
      this.editProductForm.price_per_gram = data.price_per_gram
      this.editProductForm.free_menu = data.free_menu
      this.editProductForm.promo = data.promo
      this.editProductForm.location_range = data.location_range

      // breakfast
      this.editProductForm.breakfast = data.breakfast
      if (data.breakfast === 1) {
        $('input#editbreakfast').prop('checked', true)
      }
      this.editProductForm.time_start = data.breakfast_start
      this.editProductForm.time_end = data.breakfast_end
    },
    category_type(data) {
      for (const key in data) {
        this.editProductForm.categories.push(data[key].category_id)
      }
    },
    product_variation(variation) {
      if (variation !== null) {
        $('input#editvariation').prop('checked', true)
        $('input.variation').prop('disabled', false)
        this.editProductForm.variation = variation
      }
    },
    product_price(data) {
      if (data[0].uom_id !== null) {
        this.showPriceForm = false
        $('input#edituom').prop('checked', true)
        $('input.uom_').prop('disabled', false)

        for (const key in data) {
          $('input#editchk_uom_' + data[key].uom_id).prop('checked', true)
          $('input.editprice_uom_' + data[key].uom_id).prop('disabled', false)
          $('input.editstocks_' + data[key].uom_id).prop('disabled', false)

          if (data[key].price == '0.00') {
            $('input.editprice_uom_' + data[key].uom_id).val('')
          } else {
            $('input.editprice_uom_' + data[key].uom_id).val(data[key].price)
          }

          $('input.editstocks_' + data[key].uom_id).val(data[key].stocks)
          $('input#editradio_uom_' + data[key].uom_id).prop('disabled', false)

          if (data[key].primary_uom === 1) {
            $('input#editradio_uom_' + data[key].uom_id).prop('checked', true)
          }
          this.editProductForm.uom_ids.push(data[key].uom_id.toString())
          this.editProductForm.uom_prices.push(data[key].price)
          this.editProductForm.uom_stocks.push(data[key].stocks)
          this.editProductForm.uom_default.push(
            data[key].primary_uom.toString()
          )
        }
      } else {
        this.showPriceForm = true
        this.editProductForm.stocks = data[0].stocks
        this.editProductForm.price = data[0].price
      }
    },
    product_suggestion(data, no_flavor) {
      for (const suggest of this.fd_suggestion) {
        this.$set(this.editProductForm.suggestion, suggest.id, {
          ids: [],
          prices: [],
          default: []
        })

        data.forEach(ps => {
          if (suggest.id === ps.product_suggestion.suggestion_id) {
            if (ps.product_suggestion.suggestion_id === 1) {
              $(`input#editno_pieces${suggest.id}`).prop('disabled', false)
              this.editProductForm.no_flavor = no_flavor
            }

            $(`input#editsuggestion${suggest.id}`).prop('checked', true)
            $(
              `input#editsuggest_${suggest.id}${ps.product_suggestion_id}`
            ).prop('checked', true)
            $(`input.editsuggest_${suggest.id}`).prop('disabled', false)
            $(
              `input.editprice_suggest_${suggest.id}${ps.product_suggestion_id}`
            ).prop('disabled', false)

            if (ps.addon_price === '0.00') {
              $(
                `input.editprice_suggest_${suggest.id}${ps.product_suggestion_id}`
              ).val('')
            } else {
              $(
                `input.editprice_suggest_${suggest.id}${ps.product_suggestion_id}`
              ).val(parseFloat(ps.addon_price))
            }

            $(
              `input#editradio_suggest${suggest.id}${ps.product_suggestion_id}`
            ).prop('disabled', false)

            if (ps.default_choice === 1) {
              $(
                `input#editradio_suggest${suggest.id}${ps.product_suggestion_id}`
              ).prop('checked', true)
            }

            this.editProductForm.suggestion[suggest.id].ids.push(
              ps.product_suggestion_id.toString()
            )
            this.editProductForm.suggestion[suggest.id].prices.push(
              parseFloat(ps.addon_price)
            )
            this.editProductForm.suggestion[suggest.id].default.push(
              ps.default_choice.toString()
            )
          }
        })
      }
    },
    choice_drinks(data, no_drinks) {
      if (no_drinks > 0) {
        $('input#editdrinks').prop('checked', true)
        $('input#editno_drinks').prop('disableed', false)
        $('input.drinks_').prop('disabled', false)
        this.editProductForm.no_drinks = no_drinks

        for (const key in data) {
          if (data[key].details_id.indexOf('_') > -1) {
            if (data[key].choice_drinks === 1) {
              $('input#editdrinks_' + data[key].details_id).prop(
                'checked',
                true
              )
              $('input.editprice_drinks_' + data[key].details_id).prop(
                'disabled',
                false
              )

              if (data[key].addon_price == '0.00') {
                $('input.editprice_drinks_' + data[key].details_id).val('')
              } else {
                $('input.editprice_drinks_' + data[key].details_id).val(
                  parseFloat(data[key].addon_price)
                )
              }

              $('input#editradio_drinks_' + data[key].details_id).prop(
                'disabled',
                false
              )
              if (data[key].default_choice === 1) {
                $('input#editradio_drinks_' + data[key].details_id).prop(
                  'checked',
                  true
                )
              }

              this.editProductForm.drinks_ids.push(data[key].choice_id)
              this.editProductForm.drinks_detail_ids.push(
                data[key].details_id.toString()
              )
              this.editProductForm.drinks_uom_ids.push(data[key].uom_id)
              this.editProductForm.drinks_prices.push(
                parseFloat(data[key].addon_price)
              )
              this.editProductForm.drinks_default.push(
                data[key].default_choice.toString()
              )
            }
          }
        }
      }
    },
    choice_fries(data, no_fries) {
      if (no_fries > 0) {
        $('input#editfries').prop('checked', true)
        $('input#editno_fries').prop('disabled', false)
        $('input.fries_').prop('disabled', false)
        this.editProductForm.no_fries = no_fries

        for (const key in data) {
          if (data[key].details_id.indexOf('_') > -1) {
            if (data[key].choice_fries === 1) {
              $('input#editfries_' + data[key].details_id).prop('checked', true)
              $('input.editprice_fries_' + data[key].details_id).prop(
                'disabled',
                false
              )

              if (data[key].addon_price == '0.00') {
                $('input.editprice_fries_' + data[key].details_id).val('')
              } else {
                $('input.editprice_fries_' + data[key].details_id).val(
                  parseFloat(data[key].addon_price)
                )
              }

              $('input#editradio_fries_' + data[key].details_id).prop(
                'disabled',
                false
              )
              if (data[key].default_choice === 1) {
                $('input#editradio_fries_' + data[key].details_id).prop(
                  'checked',
                  true
                )
              }

              this.editProductForm.fries_ids.push(data[key].choice_id)
              this.editProductForm.fries_detail_ids.push(
                data[key].details_id.toString()
              )
              this.editProductForm.fries_uom_ids.push(data[key].uom_id)
              this.editProductForm.fries_prices.push(
                parseFloat(data[key].addon_price)
              )
              this.editProductForm.fries_default.push(
                data[key].default_choice.toString()
              )
            }
          }
        }
      }
    },
    choice_sides(data, no_sides) {
      if (no_sides > 0) {
        $('input#editchoice_sides').prop('checked', true)
        $('input#editno_choice_sides').prop('disabled', false)
        $('input.choice_sides_').prop('disabled', false)
        this.editProductForm.no_choice_sides = no_sides

        for (const key in data) {
          if (data[key].details_id.indexOf('_') > -1) {
            if (data[key].choice_sides === 1) {
              $('input#editchoice_sides_' + data[key].details_id).prop(
                'checked',
                true
              )
              $('input.editprice_choice_sides_' + data[key].details_id).prop(
                'disabled',
                false
              )

              if (data[key].addon_price == '0.00') {
                $('input.editprice_choice_sides_' + data[key].details_id).val(
                  ''
                )
              } else {
                $('input.editprice_choice_sides_' + data[key].details_id).val(
                  parseFloat(data[key].addon_price)
                )
              }

              $('input#editradio_sides_' + data[key].details_id).prop(
                'disabled',
                false
              )
              if (data[key].default_choice === 1) {
                $('input#editradio_sides_' + data[key].details_id).prop(
                  'checked',
                  true
                )
              }

              this.editProductForm.choice_sides_ids.push(data[key].choice_id)
              this.editProductForm.choice_sides_detail_ids.push(
                data[key].details_id.toString()
              )
              this.editProductForm.choice_sides_uom_ids.push(data[key].uom_id)
              this.editProductForm.choice_sides_prices.push(
                parseFloat(data[key].addon_price)
              )
              this.editProductForm.choice_sides_default.push(
                data[key].default_choice.toString()
              )
            }
          }
        }
      }
    },
    addon_drinks(data) {
      for (let i = 0; i < this.fd_addon_drinks.length; i++) {
        $(
          'input.editprice_addon_drinks_' +
            this.fd_addon_drinks[i].product_id +
            '_' +
            this.fd_addon_drinks[i].uom_id
        ).val(parseFloat(this.fd_addon_drinks[i].price))
      }

      for (const key in data) {
        if (data[key].details_id.indexOf('_') > -1) {
          if (data[key].addon_drinks === 1) {
            $('input#editaddon-drinks').prop('checked', true)
            $('input.addon_drinks_').prop('disabled', false)
            $('input#editaddon_drinks_' + data[key].details_id).prop(
              'checked',
              true
            )

            if (data[key].addon_price == '0.00') {
              $('input.editprice_addon_drinks_' + data[key].details_id).val('')
            } else {
              $('input.editprice_addon_drinks_' + data[key].details_id).val(
                parseFloat(data[key].addon_price)
              )
            }

            this.editProductForm.addon_drinks_ids.push(data[key].addon_id)
            this.editProductForm.addon_drinks_detail_ids.push(
              data[key].details_id.toString()
            )
            this.editProductForm.addon_drinks_uom_ids.push(data[key].uom_id)
            this.editProductForm.addon_drinks_prices.push(
              parseFloat(data[key].addon_price)
            )
          }
        }
      }
    },
    addon_sides(data) {
      for (let i = 0; i < this.fd_addon_sides.length; i++) {
        $(
          'input.editprice_sides_' +
            this.fd_addon_sides[i].product_id +
            '_' +
            this.fd_addon_sides[i].uom_id
        ).val(parseFloat(this.fd_addon_sides[i].price))
      }

      for (const key in data) {
        if (data[key].details_id.indexOf('_') > -1) {
          if (data[key].addon_sides === 1) {
            $('input#editsides').prop('checked', true)
            $('input.sides_').prop('disabled', false)
            $('input#editsides_' + data[key].details_id).prop('checked', true)
            $('input.editprice_sides_' + data[key].details_id).prop(
              'disabled',
              false
            )

            if (data[key].addon_price == '0.00') {
              $('input.editprice_sides_' + data[key].details_id).val('')
            } else {
              $('input.editprice_sides_' + data[key].details_id).val(
                parseFloat(data[key].addon_price)
              )
            }

            this.editProductForm.sides_ids.push(data[key].addon_id)
            this.editProductForm.sides_detail_ids.push(
              data[key].details_id.toString()
            )
            this.editProductForm.sides_uom_ids.push(data[key].uom_id)
            this.editProductForm.sides_prices.push(
              parseFloat(data[key].addon_price)
            )
          }
        }
      }
    },
    addon_dessert(data) {
      for (let i = 0; i < this.fd_dessert.length; i++) {
        $(
          'input.editprice_dessert_' +
            this.fd_dessert[i].product_id +
            '_' +
            this.fd_dessert[i].uom_id
        ).val(parseFloat(this.fd_dessert[i].price))
      }

      for (const key in data) {
        if (data[key].details_id.indexOf('_') > -1) {
          if (data[key].addon_dessert === 1) {
            $('input#editdessert').prop('checked', true)
            $('input.dessert_').prop('disabled', false)
            $('input.editprice_dessert_' + data[key].details_id).removeAttr(
              'value'
            )
            $('input#editdessert_' + data[key].details_id).prop('checked', true)
            $('input.editprice_dessert_' + data[key].details_id).prop(
              'disabled',
              false
            )

            if (data[key].addon_price == '0.00') {
              $('input.editprice_dessert_' + data[key].details_id).val('')
            } else {
              $('input.editprice_dessert_' + data[key].details_id).val(
                parseFloat(data[key].addon_price)
              )
            }

            this.editProductForm.dessert_ids.push(data[key].addon_id)
            this.editProductForm.dessert_detail_ids.push(
              data[key].details_id.toString()
            )
            this.editProductForm.dessert_uom_ids.push(data[key].uom_id)
            this.editProductForm.dessert_prices.push(
              parseFloat(data[key].addon_price)
            )
          }
        }
      }
    },
    upgradable_item(data) {
      for (const key in data) {
        if (data[key].details_id.indexOf('_') > -1) {
          if (data[key].upgradable_item === 1) {
            $('input#editupgradable-item').prop('checked', true)
            $('input.upgrade_').prop('disabled', false)
            $('input#editupgrade_' + data[key].details_id).prop('checked', true)

            if (data[key].addon_price == '0.00') {
              $('input.editprice_upgrade_' + data[key].details_id).val('')
            } else {
              $('input.editprice_upgrade_' + data[key].details_id).val(
                data[key].addon_price
              )
            }

            this.editProductForm.upgrade_ids.push(data[key].addon_id)
            this.editProductForm.upgrade_detail_ids.push(
              data[key].details_id.toString()
            )
            this.editProductForm.upgrade_uom_ids.push(data[key].uom_id)
            this.editProductForm.upgrade_prices.push(data[key].addon_price)
          }
        }
      }
    },
    convertUCWords(str) {
      return (str + '').replace(/^(.)|\s+(.)/g, function($1) {
        return $1.toUpperCase()
      })
    },
    disabledUOM() {
      var checkBox = $('input#edituom')
      if (checkBox.is(':checked')) {
        $('input.uom_').prop('disabled', false)
        this.showPriceForm = false
        this.editProductForm.price = null
        this.editProductForm.stocks = null
      } else {
        $('input.uom_').prop('checked', false)
        $('input.uom_').prop('disabled', true)
        $('input.price_uom_').prop('disabled', true)
        $('input.price_uom_').val('')
        $('input.stocks_').prop('disabled', true)
        $('input.stocks_').val('')
        $('input.radio_uom_').prop('checked', false)
        $('input.radio_uom_').prop('disabled', true)

        this.editProductForm.uom_ids = []
        this.editProductForm.uom_prices = []
        this.editProductForm.uom_stocks = []
        this.editProductForm.uom_default = []
        this.showPriceForm = true
        this.editProductForm.price = null
        this.editProductForm.stocks = null
      }
    },
    selectChkUOM(i) {
      var checkBox = $('input#editchk_uom_' + i)
      if (checkBox.is(':checked')) {
        $('input.editprice_uom_' + i).prop('disabled', false)
        $('input.editprice_uom_' + i).val('')
        $('input#editradio_uom_' + i).prop('disabled', false)

        var price = '0'
        var uom_id = $('input.edituomId_' + i).val()

        var thisUOMArray = this.editProductForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.editProductForm.uom_prices.splice(arryIndex, 1, price)
        } else {
          this.editProductForm.uom_ids.push(uom_id)
          this.editProductForm.uom_prices.push(price)
          this.editProductForm.uom_stocks.push('')
          this.editProductForm.uom_default.push('0')
        }
      } else {
        $('input.editprice_uom_' + i).prop('disabled', true)
        $('input.editprice_uom_' + i).val('')
        $('input.editstocks_' + i).prop('disabled', true)
        $('input.editstocks_' + i).val('')
        $('input#editradio_uom_' + i).prop('disabled', true)
        $('input#editradio_uom_' + i).prop('checked', false)

        var uom_id = $('input.edituomId_' + i).val()
        var price = $('input.editprice_uom_' + i).val()
        var stocks = $('input.editstocks_' + i).val()

        var thisUOMArray = this.editProductForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.editProductForm.uom_ids.splice(arryIndex, 1)
          this.editProductForm.uom_prices.splice(arryIndex, 1)
          this.editProductForm.uom_stocks.splice(arryIndex, 1)
          this.editProductForm.uom_default.splice(arryIndex, 1)
        }
      }
    },
    uomPrice(id) {
      var price = $('input.editprice_uom_' + id).val()
      var uom_id = $('input.edituomId_' + id).val()
      if (
        price === '' ||
        parseFloat(price) === 0 ||
        isNaN(parseFloat(price)) === false
      ) {
        $('input.editstocks_' + id).prop('disabled', false)
        var thisUOMArray = this.editProductForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.editProductForm.uom_prices.splice(arryIndex, 1, price)
        } else {
          this.editProductForm.uom_ids.push(uom_id)
          this.editProductForm.uom_prices.push(price)
          this.editProductForm.uom_stocks.push('')
          this.editProductForm.uom_default.push('0')
        }
      } else {
        $('input.editprice_uom_' + id).val('')
        $('input.editstocks_' + id).prop('disabled', false)
        $('input.editstocks_' + id).val('')
        var thisUOMArray = this.editProductForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.editProductForm.uom_prices.splice(arryIndex, 1, '0')
          this.editProductForm.uom_stocks.splice(arryIndex, 1, '')
        }
      }
    },
    uomStocks(id) {
      var stocks = $('input.editstocks_' + id).val()
      var uom_id = $('input.edituomId_' + id).val()
      if (
        stocks === '' ||
        parseFloat(stocks) === 0 ||
        isNaN(parseFloat(stocks)) === false
      ) {
        var thisUOMArray = this.editProductForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.editProductForm.uom_stocks.splice(arryIndex, 1, stocks)
        }
      } else {
        $('input.editstocks_' + id).val('')
        var thisUOMArray = this.editProductForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.editProductForm.uom_stocks.splice(arryIndex, 1, '')
        }
      }
    },
    uomDefault(id) {
      var uom_id = $('input.edituomId_' + id).val()

      var thisUOMArray = this.editProductForm.uom_default
      if (thisUOMArray.indexOf('1') > -1) {
        var arryIndex = thisUOMArray.indexOf('1')
        this.editProductForm.uom_default.splice(arryIndex, 1, '0')
      }

      var checkBox = $('input#editradio_uom_' + id)
      if (checkBox.is(':checked')) {
        var thisUOMArray = this.editProductForm.uom_ids
        if (thisUOMArray.indexOf(uom_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(uom_id)
          this.editProductForm.uom_default.splice(arryIndex, 1, '1')
        }
      }
    },
    inputNumber(id) {
      var price = $('input#edit' + id).val()
      if (
        price !== '' &&
        parseInt(price) !== 0 &&
        isNaN(parseFloat(price)) === false
      ) {
      } else {
        $('input#edit' + id).val('')
      }
    },
    inputPriceGram(e) {
      var price = e.target.value
      if (price !== '' && price > 0 && isNaN(parseFloat(price)) === false) {
      } else {
        this.editProductForm.price_per_gram = 0
        $('input#editprice_per_gram').val('')
      }
    },
    inputPrice(id, e) {
      var price = e.target.value
      if (price !== '' && isNaN(parseFloat(price)) === false) {
      } else {
        this.editProductForm.price = null
        $('input#' + id).val('')
      }
    },
    disabledVariation() {
      var checkBox = $('input#editvariation')
      if (checkBox.is(':checked')) {
        $('input.variation').prop('disabled', false)
      } else {
        $('input.variation').prop('disabled', true)
        $('input.variation').prop('checked', false)
        this.editProductForm.variation = null
      }
    },
    disabledDrinks() {
      var checkBox = $('input#editdrinks')
      if (checkBox.is(':checked')) {
        $('input#editno_drinks').prop('disabled', false)
        $('input.drinks_').prop('disabled', false)
      } else {
        $('input#editno_drinks').prop('disabled', true)
        $('input.drinks_').prop('disabled', true)
        $('input.drinks_').prop('checked', false)
        $('input.price_drinks_').prop('disabled', true)
        $('input.price_drinks_').val('')
        $('input.radio_drinks_').prop('checked', false)
        $('input.radio_drinks_').prop('disabled', true)

        this.editProductForm.no_drinks = null
        this.editProductForm.drinks_ids = []
        this.editProductForm.drinks_detail_ids = []
        this.editProductForm.drinks_prices = []
        this.editProductForm.drinks_uom_ids = []
        this.editProductForm.drinks_default = []
      }
    },
    selectChkDrinks(i) {
      var checkBox = $('input#editdrinks_' + i)
      if (checkBox.is(':checked')) {
        $('input.editprice_drinks_' + i).prop('disabled', false)
        $('input.editprice_drinks_' + i).val('')
        $('input#editradio_drinks_' + i).prop('disabled', false)

        var price = 0
        var drinks_id = $('input.editdrinksId_' + i).val()
        var drinks_detail_id = $('input.editdrinks_detailId_' + i).val()
        var drinks_uom_id = $('input.editdrinks_uomId_' + i).val()

        var thisArray = this.editProductForm.drinks_detail_ids
        if (thisArray.indexOf(drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(drinks_detail_id)
          this.editProductForm.drinks_prices.splice(arryIndex, 1, price)
        } else {
          this.editProductForm.drinks_ids.push(drinks_id)
          this.editProductForm.drinks_detail_ids.push(drinks_detail_id)
          this.editProductForm.drinks_prices.push(price)
          this.editProductForm.drinks_uom_ids.push(drinks_uom_id)
          this.editProductForm.drinks_default.push('0')
        }
      } else {
        $('input.editprice_drinks_' + i).prop('disabled', true)
        $('input.editprice_drinks_' + i).val('')
        $('input#editradio_drinks_' + i).prop('disabled', true)
        $('input#editradio_drinks_' + i).prop('checked', false)

        var drinks_detail_id = $('input.editdrinks_detailId_' + i).val()

        var thisArray = this.editProductForm.drinks_detail_ids
        if (thisArray.indexOf(drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(drinks_detail_id)
          this.editProductForm.drinks_ids.splice(arryIndex, 1)
          this.editProductForm.drinks_detail_ids.splice(arryIndex, 1)
          this.editProductForm.drinks_prices.splice(arryIndex, 1)
          this.editProductForm.drinks_uom_ids.splice(arryIndex, 1)
          this.editProductForm.drinks_default.splice(arryIndex, 1)
        }
      }
    },
    drinkPrice(id) {
      var price = $('input.editprice_drinks_' + id).val()
      var drinks_id = $('input.editdrinksId_' + id).val()
      var drinks_detail_id = $('input.editdrinks_detailId_' + id).val()
      var drinks_uom_id = $('input.editdrinks_uomId_' + id).val()
      var dprice = parseFloat(price)

      if (
        price === '' ||
        parseFloat(price) === 0 ||
        isNaN(parseFloat(price)) === false
      ) {
        if (price === '') {
          dprice = 0
          $('input.editprice_drinks_' + id).val('')
        }

        var thisArray = this.editProductForm.drinks_detail_ids
        if (thisArray.indexOf(drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(drinks_detail_id)
          this.editProductForm.drinks_prices.splice(arryIndex, 1, dprice)
        } else {
          this.editProductForm.drinks_ids.push(drinks_id)
          this.editProductForm.drinks_detail_ids.push(drinks_detail_id)
          this.editProductForm.drinks_prices.push(dprice)
          this.editProductForm.drinks_uom_ids.push(drinks_uom_id)
          this.editProductForm.drinks_default.push('0')
        }
      } else {
        dprice = 0

        var thisArray = this.editProductForm.drinks_detail_ids
        if (thisArray.indexOf(drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(drinks_detail_id)
          this.editProductForm.drinks_prices.splice(arryIndex, 1, dprice)
        } else {
          this.editProductForm.drinks_ids.push(drinks_id)
          this.editProductForm.drinks_detail_ids.push(drinks_detail_id)
          this.editProductForm.drinks_prices.push(dprice)
          this.editProductForm.drinks_uom_ids.push(drinks_uom_id)
          this.editProductForm.drinks_default.push('0')
        }

        $('input.editprice_drinks_' + id).val('')
      }
    },
    drinksDefault(id) {
      var drinks_id = $('input.editdrinks_detailId_' + id).val()

      var thisUOMArray = this.editProductForm.drinks_default
      if (thisUOMArray.indexOf('1') > -1) {
        var arryIndex = thisUOMArray.indexOf('1')
        this.editProductForm.drinks_default.splice(arryIndex, 1, '0')
      }

      var checkBox = $('input#editradio_drinks_' + id)
      if (checkBox.is(':checked')) {
        var thisUOMArray = this.editProductForm.drinks_detail_ids
        if (thisUOMArray.indexOf(drinks_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(drinks_id)
          this.editProductForm.drinks_default.splice(arryIndex, 1, '1')
        }
      }
    },
    disabledFries() {
      var checkBox = $('input#editfries')
      if (checkBox.is(':checked')) {
        $('input#editno_fries').prop('disabled', false)
        $('input.fries_').prop('disabled', false)
      } else {
        $('input#editno_fries').prop('disabled', true)
        $('input.fries_').prop('disabled', true)
        $('input.fries_').prop('checked', false)
        $('input.price_fries_').prop('disabled', true)
        $('input.price_fries_').val('')
        $('input.radio_fries_').prop('checked', false)
        $('input.radio_fries_').prop('disabled', true)

        this.editProductForm.no_fries = null
        this.editProductForm.fries_ids = []
        this.editProductForm.fries_detail_ids = []
        this.editProductForm.fries_prices = []
        this.editProductForm.fries_uom_ids = []
        this.editProductForm.fries_default = []
      }
    },
    selectChkFries(i) {
      var checkBox = $('input#editfries_' + i)
      if (checkBox.is(':checked')) {
        $('input.editprice_fries_' + i).prop('disabled', false)
        $('input.editprice_fries_' + i).val('')
        $('input#editradio_fries_' + i).prop('disabled', false)

        var price = 0
        var fries_id = $('input.editfriesId_' + i).val()
        var fries_detail_id = $('input.editfries_detailId_' + i).val()
        var fries_uom_id = $('input.editfries_uomId_' + i).val()

        var thisArray = this.editProductForm.fries_detail_ids
        if (thisArray.indexOf(fries_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(fries_detail_id)
          this.editProductForm.fries_prices.splice(arryIndex, 1, price)
        } else {
          this.editProductForm.fries_ids.push(fries_id)
          this.editProductForm.fries_detail_ids.push(fries_detail_id)
          this.editProductForm.fries_prices.push(price)
          this.editProductForm.fries_uom_ids.push(fries_uom_id)
          this.editProductForm.fries_default.push('0')
        }
      } else {
        $('input.editprice_fries_' + i).prop('disabled', true)
        $('input.editprice_fries_' + i).val('')
        $('input#editradio_fries_' + i).prop('disabled', true)
        $('input#editradio_fries_' + i).prop('checked', false)

        var fries_detail_id = $('input.editfries_detailId_' + i).val()

        var thisArray = this.editProductForm.fries_detail_ids
        if (thisArray.indexOf(fries_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(fries_detail_id)
          this.editProductForm.fries_ids.splice(arryIndex, 1)
          this.editProductForm.fries_detail_ids.splice(arryIndex, 1)
          this.editProductForm.fries_prices.splice(arryIndex, 1)
          this.editProductForm.fries_uom_ids.splice(arryIndex, 1)
          this.editProductForm.fries_default.splice(arryIndex, 1)
        }
      }
    },
    friesPrice(id) {
      var price = $('input.editprice_fries_' + id).val()
      var fries_id = $('input.editfriesId_' + id).val()
      var fries_detail_id = $('input.editfries_detailId_' + id).val()
      var fries_uom_id = $('input.editfries_uomId_' + id).val()
      var dprice = parseFloat(price)

      if (
        price === '' ||
        parseFloat(price) === 0 ||
        isNaN(parseFloat(price)) === false
      ) {
        if (price === '') {
          dprice = 0
          $('input.editprice_fries_' + id).val('')
        }

        var thisArray = this.editProductForm.fries_detail_ids
        if (thisArray.indexOf(fries_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(fries_detail_id)
          this.editProductForm.fries_prices.splice(arryIndex, 1, dprice)
        } else {
          this.editProductForm.fries_ids.push(fries_id)
          this.editProductForm.fries_detail_ids.push(fries_detail_id)
          this.editProductForm.fries_prices.push(dprice)
          this.editProductForm.fries_uom_ids.push(fries_uom_id)
          this.editProductForm.fries_default.push('0')
        }
      } else {
        dprice = 0

        var thisArray = this.editProductForm.fries_detail_ids
        if (thisArray.indexOf(fries_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(fries_detail_id)
          this.editProductForm.fries_prices.splice(arryIndex, 1, dprice)
        } else {
          this.editProductForm.fries_ids.push(fries_id)
          this.editProductForm.fries_detail_ids.push(fries_detail_id)
          this.editProductForm.fries_prices.push(dprice)
          this.editProductForm.fries_uom_ids.push(fries_uom_id)
          this.editProductForm.fries_default.push('0')
        }

        $('input.editprice_fries_' + id).val('')
      }
    },
    friesDefault(id) {
      var fries_id = $('input.editfries_detailId_' + id).val()

      var thisUOMArray = this.editProductForm.fries_default
      if (thisUOMArray.indexOf('1') > -1) {
        var arryIndex = thisUOMArray.indexOf('1')
        this.editProductForm.fries_default.splice(arryIndex, 1, '0')
      }

      var checkBox = $('input#editradio_fries_' + id)
      if (checkBox.is(':checked')) {
        var thisUOMArray = this.editProductForm.fries_detail_ids
        if (thisUOMArray.indexOf(fries_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(fries_id)
          this.editProductForm.fries_default.splice(arryIndex, 1, '1')
        }
      }
    },
    disabledChoiceSides() {
      var checkBox = $('input#editchoice_sides')
      if (checkBox.is(':checked')) {
        $('input#editno_choice_sides').prop('disabled', false)
        $('input.choice_sides_').prop('disabled', false)
      } else {
        $('input#editno_choice_sides').prop('disabled', true)
        $('input.choice_sides_').prop('disabled', true)
        $('input.choice_sides_').prop('checked', false)
        $('input.price_choice_sides_').prop('disabled', true)
        $('input.price_choice_sides_').val('')
        $('input.radio_sides_').prop('checked', false)
        $('input.radio_sides_').prop('disabled', true)

        this.editProductForm.no_choice_sides = null
        this.editProductForm.choice_sides_ids = []
        this.editProductForm.choice_sides_detail_ids = []
        this.editProductForm.choice_sides_prices = []
        this.editProductForm.choice_sides_uom_ids = []
        this.editProductForm.choice_sides_default = []
      }
    },
    selectChkChoiceSides(i) {
      var checkBox = $('input#editchoice_sides_' + i)
      if (checkBox.is(':checked')) {
        $('input.editprice_choice_sides_' + i).prop('disabled', false)
        $('input.editprice_choice_sides_' + i).val('')
        $('input#editradio_sides_' + i).prop('disabled', false)

        var price = 0
        var choice_sides_id = $('input.editchoice_sidesId_' + i).val()
        var choice_sides_detail_id = $(
          'input.editchoice_sides_detailId_' + i
        ).val()
        var choice_sides_uom_id = $('input.editchoice_sides_uomId_' + i).val()

        var thisArray = this.editProductForm.choice_sides_detail_ids
        if (thisArray.indexOf(choice_sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(choice_sides_detail_id)
          this.editProductForm.choice_sides_prices.splice(arryIndex, 1, price)
        } else {
          this.editProductForm.choice_sides_ids.push(choice_sides_id)
          this.editProductForm.choice_sides_detail_ids.push(
            choice_sides_detail_id
          )
          this.editProductForm.choice_sides_prices.push(price)
          this.editProductForm.choice_sides_uom_ids.push(choice_sides_uom_id)
          this.editProductForm.choice_sides_default.push('0')
        }
      } else {
        $('input.editprice_choice_sides_' + i).prop('disabled', true)
        $('input.editprice_choice_sides_' + i).val('')
        $('input#editradio_sides_' + i).prop('disabled', true)
        $('input#editradio_sides_' + i).prop('checked', false)

        var choice_sides_detail_id = $(
          'input.editchoice_sides_detailId_' + i
        ).val()

        var thisArray = this.editProductForm.choice_sides_detail_ids
        if (thisArray.indexOf(choice_sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(choice_sides_detail_id)
          this.editProductForm.choice_sides_ids.splice(arryIndex, 1)
          this.editProductForm.choice_sides_detail_ids.splice(arryIndex, 1)
          this.editProductForm.choice_sides_prices.splice(arryIndex, 1)
          this.editProductForm.choice_sides_uom_ids.splice(arryIndex, 1)
          this.editProductForm.choice_sides_default.splice(arryIndex, 1)
        }
      }
    },
    choiceSidesPrice(id) {
      var price = $('input.editprice_choice_sides_' + id).val()
      var choice_sides_id = $('input.editchoice_sidesId_' + id).val()
      var choice_sides_detail_id = $(
        'input.editchoice_sides_detailId_' + id
      ).val()
      var choice_sides_uom_id = $('input.editchoice_sides_uomId_' + id).val()
      var dprice = parseFloat(price)

      if (
        price === '' ||
        parseFloat(price) === 0 ||
        isNaN(parseFloat(price)) === false
      ) {
        if (price === '') {
          dprice = 0
          $('input.editprice_choice_sides_' + id).val('')
        }

        var thisArray = this.editProductForm.choice_sides_detail_ids
        if (thisArray.indexOf(choice_sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(choice_sides_detail_id)
          this.editProductForm.choice_sides_prices.splice(arryIndex, 1, dprice)
        } else {
          this.editProductForm.choice_sides_ids.push(choice_sides_id)
          this.editProductForm.choice_sides_detail_ids.push(
            choice_sides_detail_id
          )
          this.editProductForm.choice_sides_prices.push(dprice)
          this.editProductForm.choice_sides_uom_ids.push(choice_sides_uom_id)
          this.editProductForm.choice_sides_default.push('0')
        }
      } else {
        dprice = 0

        var thisArray = this.editProductForm.choice_sides_detail_ids
        if (thisArray.indexOf(choice_sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(choice_sides_detail_id)
          this.editProductForm.choice_sides_prices.splice(arryIndex, 1, dprice)
        } else {
          this.editProductForm.choice_sides_ids.push(choice_sides_id)
          this.editProductForm.choice_sides_detail_ids.push(
            choice_sides_detail_id
          )
          this.editProductForm.choice_sides_prices.push(dprice)
          this.editProductForm.choice_sides_uom_ids.push(choice_sides_uom_id)
          this.editProductForm.choice_sides_default.push('0')
        }

        $('input.editprice_choice_sides_' + id).val('')
      }
    },
    sidesDefault(id) {
      var sides_id = $('input.editchoice_sides_detailId_' + id).val()

      var thisUOMArray = this.editProductForm.choice_sides_default
      if (thisUOMArray.indexOf('1') > -1) {
        var arryIndex = thisUOMArray.indexOf('1')
        this.editProductForm.choice_sides_default.splice(arryIndex, 1, '0')
      }

      var checkBox = $('input#editradio_sides_' + id)
      if (checkBox.is(':checked')) {
        var thisUOMArray = this.editProductForm.choice_sides_detail_ids
        if (thisUOMArray.indexOf(sides_id) > -1) {
          var arryIndex = thisUOMArray.indexOf(sides_id)
          this.editProductForm.choice_sides_default.splice(arryIndex, 1, '1')
        }
      }
    },
    disabledAddonDrinks() {
      var checkBox = $('input#editaddon-drinks')
      if (checkBox.is(':checked')) {
        $('input.addon_drinks_').prop('disabled', false)
        $('input.price_sides_').prop('disabled', false)
      } else {
        $('input.addon_drinks_').prop('disabled', true)
        $('input.addon_drinks_').prop('checked', false)
        $('input.price_sides_').prop('disabled', true)

        this.editProductForm.addon_drinks_ids = []
        this.editProductForm.addon_drinks_detail_ids = []
        this.editProductForm.addon_drinks_uom_ids = []
        this.editProductForm.addon_drinks_prices = []
      }
    },
    selectChkAddonDrinks(i) {
      var checkBox = $('input#editaddon_drinks_' + i)
      if (checkBox.is(':checked')) {
        var addon_drinks_id = $('input.editaddonDrinksId_' + i).val()
        var addon_drinks_detail_id = $(
          'input.editaddon_drinks_detailId_' + i
        ).val()
        var addon_drinks_uomId = $('input.editaddon_drinks_uomId_' + i).val()
        var price = $('input.editprice_addon_drinks_' + i).val()
        $('input.editprice_addon_drinks_' + i).prop('disabled', false)

        var thisArray = this.editProductForm.addon_drinks_detail_ids
        if (thisArray.indexOf(addon_drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(addon_drinks_detail_id)
          this.editProductForm.addon_drinks_prices.splice(arryIndex, 1, price)
        } else {
          this.editProductForm.addon_drinks_ids.push(addon_drinks_id)
          this.editProductForm.addon_drinks_detail_ids.push(
            addon_drinks_detail_id
          )
          this.editProductForm.addon_drinks_uom_ids.push(addon_drinks_uomId)
          this.editProductForm.addon_drinks_prices.push(price)
        }
      } else {
        var addon_drinks_detail_id = $(
          'input.editaddon_drinks_detailId_' + i
        ).val()
        $('input.editprice_addon_drinks_' + i).prop('disabled', true)

        var thisArray = this.editProductForm.addon_drinks_detail_ids
        if (thisArray.indexOf(addon_drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(addon_drinks_detail_id)
          this.editProductForm.addon_drinks_ids.splice(arryIndex, 1)
          this.editProductForm.addon_drinks_detail_ids.splice(arryIndex, 1)
          this.editProductForm.addon_drinks_uom_ids.splice(arryIndex, 1)
          this.editProductForm.addon_drinks_prices.splice(arryIndex, 1)
        }
      }
    },
    addonDrinksPrice(id) {
      var price = $('input.editprice_addon_drinks_' + id).val()
      var addon_drinks_id = $('input.editaddonDrinksId_' + id).val()
      var addon_drinks_detail_id = $(
        'input.editaddon_drinks_detailId_' + id
      ).val()
      var addon_drinks_uomId = $('input.editaddon_drinks_uomId_' + id).val()
      var original_price = $('input.editdrinks_original_price_' + id).val()
      var dprice = parseFloat(price)

      if (
        price !== '' &&
        parseInt(price) > 0 &&
        isNaN(parseFloat(price)) === false
      ) {
        var thisArray = this.editProductForm.addon_drinks_detail_ids
        if (thisArray.indexOf(addon_drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(addon_drinks_detail_id)
          this.editProductForm.addon_drinks_prices.splice(arryIndex, 1, dprice)
        } else {
          this.editProductForm.addon_drinks_ids.push(addon_drinks_id)
          this.editProductForm.addon_drinks_detail_ids.push(
            addon_drinks_detail_id
          )
          this.editProductForm.addon_drinks_prices.push(dprice)
          this.editProductForm.addon_drinks_uom_ids.push(addon_drinks_uomId)
        }
      } else {
        $('input.editprice_addon_drinks_' + id).val(original_price)
        var thisArray = this.editProductForm.addon_drinks_detail_ids
        if (thisArray.indexOf(addon_drinks_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(addon_drinks_detail_id)
          this.editProductForm.addon_drinks_prices.splice(
            arryIndex,
            1,
            original_price
          )
        } else {
          this.editProductForm.addon_drinks_ids.push(addon_drinks_id)
          this.editProductForm.addon_drinks_detail_ids.push(
            addon_drinks_detail_id
          )
          this.editProductForm.addon_drinks_prices.push(original_price)
          this.editProductForm.addon_drinks_uom_ids.push(addon_drinks_uomId)
        }
      }
    },
    disabledSides() {
      var checkBox = $('input#editsides')
      if (checkBox.is(':checked')) {
        $('input#editno_sides').prop('disabled', false)
        $('input.sides_').prop('disabled', false)
      } else {
        $('input#editno_sides').prop('disabled', true)
        $('input.sides_').prop('disabled', true)
        $('input.sides_').prop('checked', false)
        $('input.price_sides_').prop('disabled', true)

        this.editProductForm.sides_ids = []
        this.editProductForm.sides_uom_ids = []
        this.editProductForm.sides_detail_ids = []
        this.editProductForm.sides_prices = []
      }
    },
    selectChkSides(i) {
      var checkBox = $('input#editsides_' + i)
      if (checkBox.is(':checked')) {
        var sides_id = $('input.editsidesId_' + i).val()
        var sides_detail_id = $('input.editsides_detailId_' + i).val()
        var sides_uomId = $('input.editsides_uomId_' + i).val()
        var price = $('input.editprice_sides_' + i).val()
        $('input.editprice_sides_' + i).prop('disabled', false)

        var thisArray = this.editProductForm.sides_detail_ids
        if (thisArray.indexOf(sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(sides_detail_id)
          this.editProductForm.sides_prices.splice(arryIndex, 1, price)
        } else {
          this.editProductForm.sides_ids.push(sides_id)
          this.editProductForm.sides_detail_ids.push(sides_detail_id)
          this.editProductForm.sides_uom_ids.push(sides_uomId)
          this.editProductForm.sides_prices.push(price)
        }
      } else {
        var sides_detail_id = $('input.editsides_detailId_' + i).val()
        $('input.editprice_sides_' + i).prop('disabled', true)

        var thisArray = this.editProductForm.sides_detail_ids
        if (thisArray.indexOf(sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(sides_detail_id)
          this.editProductForm.sides_ids.splice(arryIndex, 1)
          this.editProductForm.sides_detail_ids.splice(arryIndex, 1)
          this.editProductForm.sides_uom_ids.splice(arryIndex, 1)
          this.editProductForm.sides_prices.splice(arryIndex, 1)
        }
      }
    },
    sidesPrice(id) {
      var price = $('input.editprice_sides_' + id).val()
      var sides_id = $('input.editsidesId_' + id).val()
      var sides_detail_id = $('input.editsides_detailId_' + id).val()
      var sides_uomId = $('input.editsides_uomId_' + id).val()
      var original_price = $('input.editsides_original_price_' + id).val()
      var dprice = parseFloat(price)

      if (
        price !== '' &&
        parseInt(price) > 0 &&
        isNaN(parseFloat(price)) === false
      ) {
        var thisArray = this.editProductForm.sides_detail_ids
        if (thisArray.indexOf(sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(sides_detail_id)
          this.editProductForm.sides_prices.splice(arryIndex, 1, dprice)
        } else {
          this.editProductForm.sides_ids.push(sides_id)
          this.editProductForm.sides_detail_ids.push(sides_detail_id)
          this.editProductForm.sides_prices.push(dprice)
          this.editProductForm.sides_uom_ids.push(sides_uomId)
        }
      } else {
        $('input.editprice_sides_' + id).val(original_price)
        var thisArray = this.editProductForm.sides_detail_ids
        if (thisArray.indexOf(sides_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(sides_detail_id)
          this.editProductForm.sides_prices.splice(arryIndex, 1, original_price)
        } else {
          this.editProductForm.sides_ids.push(sides_id)
          this.editProductForm.sides_detail_ids.push(sides_detail_id)
          this.editProductForm.sides_prices.push(original_price)
          this.editProductForm.sides_uom_ids.push(sides_uomId)
        }
      }
    },
    disabledDessert() {
      var checkBox = $('input#editdessert')
      if (checkBox.is(':checked')) {
        $('input#editno_dessert').prop('disabled', false)
        $('input.dessert_').prop('disabled', false)
      } else {
        $('input#editno_dessert').prop('disabled', true)
        $('input.dessert_').prop('disabled', true)
        $('input.dessert_').prop('checked', false)
        $('input.price_dessert_').prop('disabled', true)

        this.editProductForm.dessert_ids = []
        this.editProductForm.dessert_detail_ids = []
        this.editProductForm.dessert_prices = []
        this.editProductForm.dessert_uom_ids = []
      }
    },
    selectChkDessert(i) {
      var checkBox = $('input#editdessert_' + i)
      if (checkBox.is(':checked')) {
        var price = $('input.editprice_dessert_' + i).val()
        var dessert_id = $('input.editdessertId_' + i).val()
        var dessert_detail_id = $('input.editdessert_detailId_' + i).val()
        var dessert_uom_id = $('input.editdessert_uomId_' + i).val()
        $('input.editprice_dessert_' + i).prop('disabled', false)

        var thisArray = this.editProductForm.dessert_detail_ids
        if (thisArray.indexOf(dessert_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(dessert_detail_id)
          this.editProductForm.dessert_prices.splice(arryIndex, 1, price)
        } else {
          this.editProductForm.dessert_ids.push(dessert_id)
          this.editProductForm.dessert_detail_ids.push(dessert_detail_id)
          this.editProductForm.dessert_prices.push(price)
          this.editProductForm.dessert_uom_ids.push(dessert_uom_id)
        }
      } else {
        var dessert_detail_id = $('input.editdessert_detailId_' + i).val()
        $('input.editprice_dessert_' + i).prop('disabled', true)

        var thisArray = this.editProductForm.dessert_detail_ids
        if (thisArray.indexOf(dessert_detail_id) > -1) {
          this.editProductForm.dessert_ids.splice(arryIndex, 1)
          this.editProductForm.dessert_detail_ids.splice(arryIndex, 1)
          this.editProductForm.dessert_prices.splice(arryIndex, 1)
          this.editProductForm.dessert_uom_ids.splice(arryIndex, 1)
        }
      }
    },
    dessertPrice(id) {
      var price = $('input.editprice_dessert_' + id).val()
      var dessert_id = $('input.editdessertId_' + id).val()
      var dessert_detail_id = $('input.editdessert_detailId_' + id).val()
      var dessert_uomId = $('input.editdessert_uomId_' + id).val()
      var original_price = $('input.editdessert_original_price_' + id).val()
      var dprice = parseFloat(price)

      if (
        price !== '' &&
        parseInt(price) > 0 &&
        isNaN(parseFloat(price)) === false
      ) {
        var thisArray = this.editProductForm.dessert_detail_ids
        if (thisArray.indexOf(dessert_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(dessert_detail_id)
          this.editProductForm.dessert_prices.splice(arryIndex, 1, dprice)
        } else {
          this.editProductForm.dessert_ids.push(dessert_id)
          this.editProductForm.dessert_detail_ids.push(dessert_detail_id)
          this.editProductForm.dessert_prices.push(dprice)
          this.editProductForm.dessert_uom_ids.push(dessert_uomId)
        }
      } else {
        $('input.editprice_dessert_' + id).val(original_price)
        var thisArray = this.editProductForm.dessert_detail_ids
        if (thisArray.indexOf(dessert_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(dessert_detail_id)
          this.editProductForm.dessert_prices.splice(
            arryIndex,
            1,
            original_price
          )
        } else {
          this.editProductForm.dessert_ids.push(dessert_id)
          this.editProductForm.dessert_detail_ids.push(dessert_detail_id)
          this.editProductForm.dessert_prices.push(original_price)
          this.editProductForm.dessert_uom_ids.push(dessert_uomId)
        }
      }
    },
    disabledUpgradableItem() {
      var checkBox = $('input#editupgradable-item')
      if (checkBox.is(':checked')) {
        $('input.upgrade_').prop('disabled', false)
      } else {
        $('input.upgrade_').prop('disabled', true)
        $('input.upgrade_').prop('checked', false)
        $('input.price_upgrade_').prop('disabled', true)
        $('input.price_upgrade_').val('')

        this.editProductForm.upgrade_ids = []
        this.editProductForm.upgrade_detail_ids = []
        this.editProductForm.upgrade_prices = []
        this.editProductForm.upgrade_uom_ids = []
      }
    },
    selectChkUpgrade(i) {
      var checkBox = $('input#editupgrade_' + i)
      if (checkBox.is(':checked')) {
        var price = 0
        var upgrade_id = $('input.editupgradeId_' + i).val()
        var upgrade_detail_id = $('input.editupgrade_detailId_' + i).val()
        var upgrade_uom_id = $('input.editupgrade_uomId_' + i).val()
        $('input.editprice_upgrade_' + i).prop('disabled', false)

        var thisArray = this.editProductForm.upgrade_detail_ids
        if (thisArray.indexOf(upgrade_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(upgrade_detail_id)
          this.editProductForm.upgrade_prices.splice(arryIndex, 1, price)
        } else {
          this.editProductForm.upgrade_ids.push(upgrade_id)
          this.editProductForm.upgrade_detail_ids.push(upgrade_detail_id)
          this.editProductForm.upgrade_prices.push(price)
          this.editProductForm.upgrade_uom_ids.push(upgrade_uom_id)
        }
      } else {
        var upgrade_detail_id = $('input.editupgrade_detailId_' + i).val()
        $('input.editprice_upgrade_' + i).prop('disabled', true)
        $('input.editprice_upgrade_' + i).val('')

        var thisArray = this.editProductForm.upgrade_detail_ids
        if (thisArray.indexOf(upgrade_detail_id) > -1) {
          this.editProductForm.upgrade_ids.splice(arryIndex, 1)
          this.editProductForm.upgrade_detail_ids.splice(arryIndex, 1)
          this.editProductForm.upgrade_prices.splice(arryIndex, 1)
          this.editProductForm.upgrade_uom_ids.splice(arryIndex, 1)
        }
      }
    },
    upgradePrice(id) {
      var price = $('input.editprice_upgrade_' + id).val()
      var upgrade_id = $('input.editupgradeId_' + id).val()
      var upgrade_detail_id = $('input.editupgrade_detailId_' + id).val()
      var upgrade_uomId = $('input.editupgrade_uomId_' + id).val()
      var dprice = parseFloat(price)

      if (
        price === '' ||
        parseFloat(price) === 0 ||
        isNaN(parseFloat(price)) === false
      ) {
        if (price === '') {
          dprice = 0
          $('input.editprice_upgrade_' + id).val('')
        }

        var thisArray = this.editProductForm.upgrade_detail_ids
        if (thisArray.indexOf(upgrade_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(upgrade_detail_id)
          this.editProductForm.upgrade_prices.splice(arryIndex, 1, dprice)
        } else {
          this.editProductForm.upgrade_ids.push(upgrade_id)
          this.editProductForm.upgrade_detail_ids.push(upgrade_detail_id)
          this.editProductForm.upgrade_prices.push(dprice)
          this.editProductForm.upgrade_uom_ids.push(upgrade_uomId)
        }
      } else {
        dprice = 0

        var thisArray = this.editProductForm.upgrade_detail_ids
        if (thisArray.indexOf(upgrade_detail_id) > -1) {
          var arryIndex = thisArray.indexOf(upgrade_detail_id)
          this.editProductForm.upgrade_prices.splice(arryIndex, 1, dprice)
        } else {
          this.editProductForm.upgrade_ids.push(upgrade_id)
          this.editProductForm.upgrade_detail_ids.push(upgrade_detail_id)
          this.editProductForm.upgrade_prices.push(dprice)
          this.editProductForm.upgrade_uom_ids.push(upgrade_uom_id)
        }

        $('input.editprice_upgrade_' + id).val('')
      }
    },
    disabledBreakfast() {
      var checkBox = $('input#editbreakfast')
      if (checkBox.is(':checked')) {
        this.editProductForm.breakfast = 1
      } else {
        this.editProductForm.breakfast = 0
        this.editProductForm.time_start = null
        this.editProductForm.time_end = null
      }
    },
    checkProductForm() {
      if (this.editProductForm.categories.length) {
        if (
          this.editProductForm.breakfast === 1 &&
          (this.editProductForm.time_start === '' ||
            this.editProductForm.time_start === null ||
            this.editProductForm.time_end === '' ||
            this.editProductForm.time_end === '')
        ) {
          if (
            this.editProductForm.time_start === '' ||
            this.editProductForm.time_start === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Breakfast (time start) is required.'
            })

            return
          }

          if (
            this.editProductForm.time_end === '' ||
            this.editProductForm.time_end === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Breakfast (time end) is required.'
            })

            return
          }

          return
        }

        if (
          this.editProductForm.breakfast === 1 &&
          this.editProductForm.time_start !== null &&
          this.editProductForm.time_end !== null
        ) {
          var dateToday = '2020-10-14'
          var time_start = new Date(this.editProductForm.time_start)
          if (isNaN(time_start.getTime())) {
            time_start = new Date(
              dateToday + ' ' + this.editProductForm.time_start
            )
          }

          var time_end = new Date(this.editProductForm.time_end)
          if (isNaN(time_end.getTime())) {
            time_end = new Date(dateToday + ' ' + this.editProductForm.time_end)
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

        var UOM = $('input#edituom')
        if (UOM.is(':checked')) {
          if (
            this.editProductForm.uom_ids.length === 0 ||
            this.editProductForm.uom_ids.length !=
              this.editProductForm.uom_prices.length
          ) {
            if (
              this.editProductForm.uom_ids.length !=
              this.editProductForm.uom_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Product price is required.'
              })

              return
            }

            if (this.editProductForm.uom_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one unit of measure and please input its corresponding product price.'
              })

              return
            }
          }

          var thisArray = this.editProductForm.uom_default
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
            this.editProductForm.price === '' ||
            this.editProductForm.price === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Product price is required.'
            })

            return
          }
        }

        var no_specific_price = $('input#no_specific_price')
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

        var variation = $('input#editvariation')
        if (variation.is(':checked')) {
          if (
            this.editProductForm.variation === '' ||
            this.editProductForm.variation === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Variation is required.'
            })

            return
          }
        }

        for (let index = 0; index < this.fd_suggestion.length; index++) {
          const suggest = this.fd_suggestion[index]
          var checkBox = $(`input#editsuggestion${suggest.id}`)
          if (checkBox.is(':checked')) {
            if (
              suggest.id === 1 &&
              (this.editProductForm.no_flavor === '' ||
                this.editProductForm.no_flavor === null)
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'No of pieces under flavor is required.'
              })

              return
            }

            if (
              this.editProductForm.suggestion[suggest.id].ids.length === 0 ||
              this.editProductForm.suggestion[suggest.id].ids.length !=
                this.editProductForm.suggestion[suggest.id].prices.length
            ) {
              if (
                this.editProductForm.suggestion[suggest.id].ids.length !=
                this.editProductForm.suggestion[suggest.id].prices.length
              ) {
                Swal.fire({
                  type: 'warning',
                  title: 'Warning',
                  text: `Addon price for types of ${suggest.suggestion.toLowerCase()} is required.`
                })

                return
              }

              if (
                this.editProductForm.suggestion[suggest.id].ids.length === 0
              ) {
                Swal.fire({
                  type: 'warning',
                  title: 'Warning',
                  text: `Please choose atleast one ${suggest.suggestion.toLowerCase()} and please input its corresponding price.`
                })

                return
              }
            }

            var thisArray = this.editProductForm.suggestion[suggest.id].default
            if (thisArray.indexOf('1') == -1) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: `Please choose atleast one default for ${suggest.suggestion.toLowerCase()}.`
              })

              return
            }
          }
        }

        var drinks = $('input#editdrinks')
        if (drinks.is(':checked')) {
          if (
            this.editProductForm.no_drinks === '' ||
            this.editProductForm.no_drinks === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'The field no of pieces under drinks is required.'
            })

            return
          }

          if (
            this.editProductForm.drinks_ids.length === 0 ||
            this.editProductForm.drinks_ids.length !=
              this.editProductForm.drinks_prices.length
          ) {
            if (
              this.editProductForm.drinks_ids.length !=
              this.editProductForm.drinks_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Price for drink is required.'
              })

              return
            }

            if (this.editProductForm.drinks_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one drink and please input its corresponding product price.'
              })

              return
            }
          }

          var thisArray = this.editProductForm.drinks_default
          if (thisArray.indexOf('1') == -1) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Please choose atleast one default for drinks.'
            })

            return
          }
        }

        var fries = $('input#editfries')
        if (fries.is(':checked')) {
          if (
            this.editProductForm.no_fries === '' ||
            this.editProductForm.no_fries === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'The field no of pieces under fries is required.'
            })

            return
          }

          if (
            this.editProductForm.fries_ids.length === 0 ||
            this.editProductForm.fries_ids.length !=
              this.editProductForm.fries_prices.length
          ) {
            if (
              this.editProductForm.fries_ids.length !=
              this.editProductForm.fries_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Price for drink is required.'
              })

              return
            }

            if (this.editProductForm.fries_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one fries and please input its corresponding product price.'
              })

              return
            }
          }

          var thisArray = this.editProductForm.fries_default
          if (thisArray.indexOf('1') == -1) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Please choose atleast one default for fries.'
            })

            return
          }
        }

        var choice_sides = $('input#editchoice_sides')
        if (choice_sides.is(':checked')) {
          if (
            this.editProductForm.no_choice_sides === '' ||
            this.editProductForm.no_choice_sides === null
          ) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'The field no of pieces under sides is required.'
            })

            return
          }

          if (
            this.editProductForm.choice_sides_ids.length === 0 ||
            this.editProductForm.choice_sides_ids.length !=
              this.editProductForm.choice_sides_prices.length
          ) {
            if (
              this.editProductForm.choice_sides_ids.length !=
              this.editProductForm.choice_sides_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Price for side is required.'
              })

              return
            }

            if (this.editProductForm.choice_sides_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one side and please input its corresponding product price.'
              })

              return
            }
          }

          var thisArray = this.editProductForm.choice_sides_default
          if (thisArray.indexOf('1') == -1) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Please choose atleast one default for choosen sides.'
            })

            return
          }
        }

        var addon_drinks = $('input#editaddon-drinks')
        if (addon_drinks.is(':checked')) {
          if (
            this.editProductForm.addon_drinks_ids.length === 0 ||
            this.editProductForm.addon_drinks_ids.length !=
              this.editProductForm.addon_drinks_prices.length
          ) {
            if (
              this.editProductForm.addon_drinks_ids.length !=
              this.editProductForm.addon_drinks_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon price for drinks is required.'
              })

              return
            }

            if (this.editProductForm.addon_drinks_ids.length === 0) {
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

        var sides = $('input#editsides')
        if (sides.is(':checked')) {
          if (
            this.editProductForm.sides_ids.length === 0 ||
            this.editProductForm.sides_ids.length !=
              this.editProductForm.sides_prices.length
          ) {
            if (
              this.editProductForm.sides_ids.length !=
              this.editProductForm.sides_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Price for dessert is required.'
              })

              return
            }

            if (this.editProductForm.sides_ids.length === 0) {
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

        var dessert = $('input#editdessert')
        if (dessert.is(':checked')) {
          if (
            this.editProductForm.dessert_ids.length === 0 ||
            this.editProductForm.dessert_ids.length !=
              this.editProductForm.dessert_prices.length
          ) {
            if (
              this.editProductForm.dessert_ids.length !=
              this.editProductForm.dessert_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Price for dessert is required.'
              })

              return
            }

            if (this.editProductForm.dessert_ids.length === 0) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text:
                  'Please choose atleast one dessert and please input its corresponding product price2.'
              })

              return
            }
          }
        }

        var upgradable_item = $('input#editupgradable-item')
        if (upgradable_item.is(':checked')) {
          if (
            this.editProductForm.upgrade_ids.length === 0 ||
            this.editProductForm.upgrade_ids.length !=
              this.editProductForm.upgrade_prices.length
          ) {
            if (
              this.editProductForm.upgrade_ids.length !=
              this.editProductForm.upgrade_prices.length
            ) {
              Swal.fire({
                type: 'warning',
                title: 'Warning',
                text: 'Addon price for upgradable item is required.'
              })

              return
            }

            if (this.editProductForm.upgrade_ids.length === 0) {
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
        this.editProductForm.image = this.$refs.image.files[0]
        this.editProductForm
          .submit('post', '/product/update_product_details', {
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
                this.editProductForm.clear()
                this.editProductForm.reset()
                this.$refs.image.value = null
                this.showPriceForm = true
                $('input.check-choice').prop('checked', false)
                $('input.check-option').prop('checked', false)
                $('input.check-option').prop('disabled', true)
                $('input.input-option').val('')
                $('input.input-option').prop('disabled', true)

                $('div#modal-edit-product').modal('hide')
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
  },
  watch: {
    product_info: function(details) {
      this.editProductForm.clear()
      this.editProductForm.reset()
      this.editProductForm.product_id = details.product_id
      this.$refs.image.value = null
      this.showPriceForm = true
      $('input.check-choice').prop('checked', false)
      $('input.check-option').prop('checked', false)
      $('input.check-option').prop('disabled', true)
      $('input.input-option').val('')
      $('input.input-option').prop('disabled', true)
      this.fetch_product_details(details.product_id)
    }
  }
}
</script>
